import { useEffect, useState } from 'react';

export type MediumArticle = {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    thumbnail?: string | null;
}

const CACHE_KEY = 'medium_articles_cache_v1';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Loads the latest Medium articles for the "I love to write" section.
 *
 * Strategy:
 * 1. Always render `fallback` immediately (no loading spinner / empty state).
 * 2. Check localStorage — if we have a cached successful fetch < 7 days old,
 *    use it and stop. This means repeat visits within a week always show
 *    the exact same set, with zero network calls to our API or Medium.
 * 3. Otherwise, hit our own `/api/medium-articles` route (never Medium
 *    directly from the browser — avoids CORS and keeps our request volume
 *    to Medium tiny since our API route itself caches server-side).
 * 4. On success, swap in the real articles and cache them for 7 days.
 * 5. On any failure (Medium down/blocked, network issue, bad response),
 *    silently keep the hardcoded fallback already on screen. The failure
 *    itself is never cached, so the next visit tries again fresh.
 */
export function useMediumArticles(fallback: MediumArticle[]) {
    const [articles, setArticles] = useState<MediumArticle[]>(fallback);
    const [isFallback, setIsFallback] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            // 1. Try the cache first.
            try {
                const raw = window.localStorage.getItem(CACHE_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    const age = Date.now() - parsed.timestamp;
                    if (
                        age < CACHE_TTL_MS &&
                        Array.isArray(parsed.articles) &&
                        parsed.articles.length > 0
                    ) {
                        if (!cancelled) {
                            setArticles(parsed.articles);
                            setIsFallback(false);
                        }
                        return;
                    }
                }
            } catch {
                // Corrupt/unreadable cache entry — ignore, fall through to fetch.
            }

            // 2. No usable cache — fetch fresh from our own API route.
            try {
                const res = await fetch('/api/medium-articles');
                if (!res.ok) throw new Error('bad response');

                const data = await res.json();
                if (!Array.isArray(data.articles) || data.articles.length === 0) {
                    throw new Error('empty articles list');
                }

                if (!cancelled) {
                    setArticles(data.articles);
                    setIsFallback(false);
                }

                window.localStorage.setItem(
                    CACHE_KEY,
                    JSON.stringify({ timestamp: Date.now(), articles: data.articles })
                );
            } catch {
                // 3. Fetch failed — keep showing the fallback already in state.
                if (!cancelled) setIsFallback(true);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    return { articles, isFallback };
}