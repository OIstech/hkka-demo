# 香港劍道協會 HKKA — 首頁排版草稿 (zh-HK)

Static mockup, no build step. Client-facing click guide (zh-HK): `CLIENT-GUIDE.md`. 開啟 `index.html` in a browser (or `python3 -m http.server` in this folder).

- `index.html` — homepage: floating header + hero slider, quick links, circulars grid + upcoming events, event types, member portal band, articles, dojos, related websites, footer.
- `circulars.html` — dummy inner page (1.1 HKKA Circulars) with filterable feed and section sub-nav.
- `circular.html` — circular detail (text only, no thumbnail): tag + number, memo header, body, attachments, info panel, prev/next. Linked from HKKA/2026/040 in the circulars feed (whole row clickable).
- `articles.html` — category page (1.5 劍道及居合道文章): topic cards, filter chips, lead story + side list, grid, pager.
- `post.html` — article detail: byline, share, cover, sticky table of contents, prose styles, tags, prev/next, related.
- `calendar.html` + `assets/calendar.js` — 綜合活動行事曆, Google Calendar-style: month / week / agenda views, mini month, category filters, event popover links to the event's post (`href` per event, defaults to `post.html?event=<id>`). `?d=YYYY-MM-DD&v=month|week|agenda` opens a date (homepage events link this way). Dummy events + weekly training in the JS.
- `org.html` + `assets/org.js` — 互動組織架構圖, 4 levels (會長 → 副會長/秘書長/司庫 → 委員會及部門 → 成員): always fully expanded; compact chart on desktop (≥1024px, columns sized by number of level-3 units, scrolls sideways only if a column would drop under 100px), list below 1024px; search + member detail drawer. Names are placeholders.
- `assets/app.js` — menu data (6 core menus, 2 levels) and header/footer rendering, mega-menu, mobile drawer, hero slider, filters.
- `assets/styles.css` — design tokens (blue & white), typography scale, components.

Layout references: westk.hk (floating header + hero), Lexington "Phanatik" (news grid, type scale, spacing).
Images are picsum.photos placeholders — swap for real photos.
- Primary language is zh-HK; English kept as small secondary labels (class .zh). Toggle EN is visual only.
