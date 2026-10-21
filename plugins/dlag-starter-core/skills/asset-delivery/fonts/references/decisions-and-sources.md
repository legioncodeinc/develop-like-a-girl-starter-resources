# Font decisions and official references

Reviewed 2026-10-21. The font procedure uses CSS and supplied local assets. Verify installed framework and optional tool versions before adapting API examples.

- [MDN font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display): policies use short/extremely small periods, not universal millisecond guarantees.
- [web.dev font practices](https://web.dev/articles/font-best-practices): discovery, payload and display policy interact; measure the actual page.
- [MDN size-adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/size-adjust): calibrate the real font pair and review compatibility for target browsers.
- [fontTools subset](https://fonttools.readthedocs.io/en/latest/subset/index.html): glyph and Unicode selection, layout feature options and the actual retain-gids meaning.
- [fontTools variable instancer](https://fonttools.readthedocs.io/en/latest/varLib/instancer.html): axis restriction is a distinct operation requiring a design decision.
- [React Router root convention](https://reactrouter.com/api/framework-conventions/root.tsx): use the consuming application's existing document structure.
- [fontpie maintainer repository](https://github.com/pixel-point/fontpie) and [Capsize](https://github.com/seek-oss/capsize): optional local metric calculation approaches; check existing installations and license before use.

## Decisions that need actual project evidence

Whether a cold visit may keep a system font; which scripts and dynamic characters must survive subsetting; which font is critical on each route; the exact fallback available on target platforms; and measured layout movement. No global rule or example percentage supplies those answers.

Browser compatibility, tool maintenance and API signatures can change. Consult official documentation when they affect an implementation. Do not import a remote font service, new calculator dependency or deployment integration simply because it appears in a reference. Preserve supplied notices and avoid sending private font files to external services.
