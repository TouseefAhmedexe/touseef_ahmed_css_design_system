# Bloomrix UI: CSS Design System

A reusable CSS design system and component library written in SCSS and compiled to one CSS
file. Task 19 of my Bloomrix internship. All names, prices and numbers on the documentation
page are sample content.

## Files
- src/scss - the SCSS source
- dist/bloomrix-ui.css - compiled CSS with a source map (bloomrix-ui.css.map)
- dist/bloomrix-ui.min.css - minified CSS
- index.html - the documentation page
- docs/docs.css - styles for the documentation page only, written with native CSS nesting
- js/early-init.js, js/theme.js - the theme switcher and its saved choice
- js/docs.js - the demos of the documentation page

## Build
- npm install
- npm run build - src/scss/main.scss to dist/bloomrix-ui.css and its source map
- npm run build:min - the minified file
- npm run build:all - both
- npm run watch - rebuilds when a file changes

Open index.html with Live Server to view the documentation.

## SCSS structure
- abstracts - maps, functions and mixins. They create no CSS on their own
- base - reset, tokens, typography and keyframes
- themes - the light and dark tokens
- layout - container, stack, cluster, grid-auto, cq and theme-scope
- components - one partial for each component
- utilities - helper classes created from the token maps
- overrides - the reduced motion rule

main.scss declares the layer order and loads each folder into its layer with meta.load-css:
reset, tokens, themes, base, layout, components, utilities, overrides.

## Design tokens
- Colors are semantic: background, surface, text, primary, secondary, accent, success,
  warning, danger and info, with strong, subtle and "on" variants. The light and dark values
  are two Sass maps with the same keys.
- Spacing, type, radius and container widths are one map each, written out as custom properties
  by one mixin.
- Shadows are written in the theme rule, so a nested data-theme area gets its own shadow color.
- Breakpoints are a Sass map because var() does not work in a media query.

## Sass variables and CSS custom properties
Sass variables and maps exist only while compiling. They drive loops, validation (a wrong token
name is a compile error) and the breakpoints. Custom properties exist in the browser, so they
carry the theme and can change at runtime, as the token playground shows.

## Themes
- Light values are on :root and [data-theme="light"].
- Dark values are on [data-theme="dark"], and on :root when no data-theme is set and the device
  prefers a dark scheme. The dark tokens are written once in a mixin.
- js/early-init.js applies a saved choice before the first draw. js/theme.js saves the choice in
  localStorage. "Use device theme" removes it.

## Naming
BEM: block, block__element, block--modifier. Layout primitives and utilities (u-) are separate
from components. One class is used in each rule, and nesting is one level deep.

## Components
Typography, buttons, form fields, checkbox, radio, switch, cards (basic, profile, statistics,
pricing), alerts, badges, notification badges, progress bars, tooltips and a modal. The
documentation page lists the classes, the variations, an example and the states of each.

## Container queries and media queries
The profile, statistics and pricing cards use @container, because the same card can sit in a
wide column or a narrow one. Media queries are used for what depends on the window or the
device: the documentation layout, prefers-color-scheme and prefers-reduced-motion.

## Limits
- Tooltips are CSS only. They are hints and are not announced by screen readers.
- The modal has an entry animation only (@starting-style), and none when it closes.
- The progress bar value is a data-value in steps of 10.
- The token playground changes only --color-primary.
- Colors were chosen for readable contrast and checked with DevTools.

## Tested
Phone 375px, tablet 768px and desktop 1280px, in both themes. Screenshots are in the
screenshots folder.