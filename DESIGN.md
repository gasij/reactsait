Kind: product — вареники ручной лепки и домашние блюда.

Current revision: Next.js App Router + Feature-Sliced Design. The user requested migration and a new home composition. Retain the folk-book visual direction: linen, sage, ochre, small berry accents, Oranienbaum and Golos Text, botanical rosettes.

Composition: product-first hero with a real large photograph, short offer and one catalog action. The hero retains a real product photograph. The sculpture field is a page-wide decorative background. Sweet and savoury collections now precede the complete catalog; production story and the closing action follow. An optional composition preference was requested; no reply had arrived, so product-first was the stated working assumption.

Architecture: root app/ owns Next routing and metadata. src/_app is providers and global styling; src/_pages/home composes widgets and coordinates motion; widgets assemble sections; features own filtering and product-details interactions; entities/product holds the original eleven products and product card; shared holds generic visuals, motion context and assets. Public slice APIs and downward imports are enforced by check:architecture. _app/_pages naming follows the current FSD Next.js guide to avoid router conflicts.

Server/client split: home composition, hero text, story and closing section are Server Components. Filters, dialogs, menu, motion and the scroll-driven 3D background are client components. Providers take server-rendered content through children. Three.js is automatically mounted once with ssr:false as a fixed background behind all page content. GSAP lifecycle and system/user reduced-motion behavior remain intact.

Build: static Next export in out/, images unoptimized for static hosting. A local Node static preview handles 404s and safe path resolution. npm run dev is Next development; npm run build && npm start previews the export. NEXT_PUBLIC_SITE_URL optionally supplies the confirmed social-sharing domain.

Verification: Next production build passed; FSD architecture checks passed; 10 interaction and motion-lifecycle tests passed. HTTP checks verified the initial HTML, all 21 page resources and 404 behavior. Six product cards and the new section order are present before JavaScript runs. Connected browser discovery returned [], so visual timing, responsive appearance and live WebGL remain unverified. No browser pass is claimed.

No contact details or order backend were invented. Original photos and product data are retained; obsolete CRA entry points and dependencies were removed.

Background correction: the user clarified the requested animation belongs behind the whole website and must react to scrolling. A dedicated widgets/dumpling-background slice now owns the single fixed Canvas, merged geometry, 24/12 instances and DOF. Scene poses derive deterministically from viewport-relative scroll distance, with short demand-rendered smoothing and reversible motion. There is no autonomous flight loop or 3D activation control. The background is pointer-transparent and aria-hidden; translucent section grounds preserve readability and allow it to show through. The global motion setting, reduced-motion preference and page visibility are respected. Without WebGL, the ordinary linen background remains.

Current checks: Next production build, FSD boundaries and all 16 tests passed, including reversible scroll poses and automatic background composition. A real-browser/GPU visual pass remains unavailable.

Motion intensity revision: stronger individual scroll-driven tumbling, wider sinuous lateral paths, vertical bobbing and deeper camera-axis excursions make the field more animated. Desktop mouse movement adds gently damped depth-weighted parallax; pointer events remain on the window and do not block content. Demand rendering continues only while scroll/pointer interpolation is settling. Existing global/reduced-motion and visibility handling is retained. Production build, FSD checks and motion/interaction tests passed; path tests also cover lateral/depth range and safe camera distance. Visual GPU verification remains pending.

Identity implementation: reviewed all 20 rendered pages of the supplied “Семейное производство-2.pdf” and the provided Elements assets. The site's name/logotype is now Дивновкусье, using the original artwork; Minipax and Montserrat are bundled via next/font/local. Real embroidered birds, production imagery and scalloped napkin forms replace temporary branding. Main green #004824, accent cherry #a81e2e and ink #0c1922 are sampled from the supplied art; warm #ece5dd is the screen ground. The earlier request to avoid large red fields remains in force. The fixed, scroll-driven dumpling background remains behind all sections, with its ground retinted to the identity.

Source priority: the new PDF explicitly states 10 years and names founders Алексей and Мария; this replaces the old site's 15-year copy. Full provenance and asset policies: docs/brand-guidelines.md. Input uid files were not modified.

Validation: production build, all 17 tests, FSD import checks and diff checks passed. Local HTTP checks confirmed two actual brand logos, three local font preloads and all 29 image/script/style/font resources. Google Fonts requests have been removed. PDF visuals were inspected; browser discovery still returned [], so no actual site screenshot/GPU pass is claimed.

Colour-balance update: the user's latest instruction supersedes the earlier preference against large red areas. Collections and footer now use deep brand green, the closing section uses cherry, and card information panels alternate green/cherry with light text. The hero's baseline and featured-product strip also carry the two colours. The footer uses the supplied light logo variant. Paper hero/catalog/story surfaces preserve the visible scroll-driven background. Cream/body text contrast on both brand colours exceeds 4.5:1; peach is reserved for the green surfaces, and small text on cherry uses cream.

The experimental border-radius gallery was removed at the user’s request, including its navigation item, code and styles. The existing dumpling background and brand design remain.
