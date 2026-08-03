// This file must live at:  /api/medium-articles.ts
// at the ROOT of your project (same level as package.json, NOT inside /src).
// Vercel auto-detects any file in a top-level /api folder as a serverless
// function, regardless of framework — this works for your Vite + react-router
// app exactly the same way it would for Next.js.
//
// Optional (not required): `npm i -D @vercel/node` gives you proper
// VercelRequest/VercelResponse types instead of the loose `any` below.

const MEDIUM_FEED_URL = 'https://medium.com/feed/@raghavjuneja386';

interface MediumArticle {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    thumbnail: string | null;
}

function decodeEntities(str: string) {
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

function stripTags(html: string) {
    return decodeEntities(
        html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    );
}

function extractTag(block: string, tag: string): string {
    const cdata = block.match(
        new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`)
    );
    if (cdata) return cdata[1];
    const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
    return plain ? plain[1] : '';
}

function parseFeed(xml: string): MediumArticle[] {
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    return items.map((item) => {
        const title = decodeEntities(extractTag(item, 'title')).trim();
        const link = extractTag(item, 'link').trim();
        const pubDate = extractTag(item, 'pubDate').trim();
        const content = extractTag(item, 'content:encoded');

        const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
        const thumbnail = imgMatch ? imgMatch[1] : null;

        const textOnly = stripTags(content);
        const description =
            textOnly.length > 160 ? textOnly.slice(0, 160).trim() + '…' : textOnly;

        return { title, link, pubDate, description, thumbnail };
    });
}

export default async function handler(req: any, res: any) {
    try {
        const feedRes = await fetch(MEDIUM_FEED_URL, {
            headers: {
                // Medium blocks/403s requests that don't look like they're
                // coming from a real client — this fixes that.
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                Accept: 'application/rss+xml, application/xml, text/xml, */*',
            },
        });

        if (!feedRes.ok) {
            res.status(502).json({ error: 'Medium feed unavailable', status: feedRes.status });
            return;
        }

        const xml = await feedRes.text();
        const articles = parseFeed(xml).slice(0, 5);

        if (articles.length === 0) {
            res.status(502).json({ error: 'No articles parsed' });
            return;
        }

        // CDN-level cache on Vercel's edge: re-fetch Medium at most once every
        // 6 hours, serve the cached response the rest of the time. Combined
        // with the 7-day localStorage cache on the client, this means Medium
        // sees a trickle of requests no matter how much traffic your site gets.
        res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=43200');
        res.status(200).json({ articles });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Medium feed' });
    }
}