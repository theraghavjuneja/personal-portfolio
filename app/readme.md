# Portfolio Design System & Aesthetic

This repository contains my personal portfolio website, built with React, TypeScript, and Tailwind CSS. The design system is highly stylized, combining technical precision with a bold, playful, and hand-drawn aesthetic.

## Design Format & Inspiration

The overarching visual language is heavily inspired by **Open Peeps** by Pablo Stanley and the **Neo-Brutalism** design trend. It blends clean, structured typography with quirky, illustrative elements. 

### Key Characteristics:

1. **"Open Peeps" Aesthetic**
   - **Illustrations:** Hand-drawn, character-driven illustrations (Open Peeps style) are used to add personality and a human touch.
   - **Playful & Approachable:** The visual tone is friendly and slightly informal, breaking away from standard corporate templates.

2. **Neo-Brutalism / Comic Style Layout**
   - **Hard Offset Shadows:** Elements frequently feature bold, unblurred offset shadows (e.g., `box-shadow: 4px 4px 0px #10141A`).
   - **Thick Borders:** Heavy, solid dark strokes (e.g., `border: 3px solid #10141A`) around cards, badges, and structural elements define crisp boundaries and give a comic-book feel.
   - **High Contrast:** Strong contrast between foreground elements (often deep charcoal or black) and background colors (warm creams, teals, and soft pastels).

3. **Color Palette**
   - **Base/Background:** Warm Cream (`#FAF8F4` / `40 33% 97%`).
   - **Foreground/Ink:** Deep Charcoal (`#10141A` or `#1E1E1E`).
   - **Accents:** 
     - **Terracotta/Rust Red:** `#C8563B` used for primary accents, labels, and interactive states.
     - **Sage/Teal Theme:** Soft teals (like `#CFE7E3`) used for highlight boxes and ticker strips.

4. **Typography**
   - **Headings & Display:** `DM Sans` (bold, tightly tracked) for primary headings and prominent UI elements.
   - **Body & Metadata:** `Inter` for clean, legible body copy, tags, and small utility text.
   - **Accents:** `Caveat` script for hand-written notes and organic accents.
   - **Styling Details:** Extensive use of uppercase, widely-tracked text (e.g., `letter-spacing: 0.18em`) for eyebrows, badges, and small labels to give an editorial finish.

5. **Motion & Interaction (Cinematic Feel)**
   - Powered by **GSAP (GreenSock)**.
   - **Scroll-Triggered Animations:** Cinematic, high-fidelity reveals. Elements scale, translate, and fade based on scroll position.
   - **Marquee Tickers:** Continuous, looping text strips (e.g., `<div className="ab-ticker-track">`) that add a dynamic, news-ticker style energy to the layout.
   - **Micro-interactions:** Custom cursors, pulsing dots (like a recording film badge indicator), and dynamic viewfinders.

## Conclusion

The result is a portfolio that feels both **technical** (through structured grids, GSAP animations, and technical metadata) and **editorial/artistic** (through Open Peeps illustrations, thick borders, and offset shadows). It is designed to be highly memorable, engaging, and reflective of a creative product designer and engineer.
