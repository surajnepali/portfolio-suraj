# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for a QA engineer. It is a static site based on a FreeHTML5 (`fh5co-`) template, so there is no package manager, build step, linter or test suite. All content is in `index.html`, plus `cv.pdf` at the repo root.

## Running locally

Serve the repo root with any static server, for example `python3 -m http.server 8000`, then open http://localhost:8000. The favicon uses an absolute path (`/images/suraj.jpg`), so open the site through a server rather than as a `file://` URL.

`.github/workflows/main.yml` exists but is empty, so there is no CI or deploy pipeline in the repo.

## Architecture

- **`index.html`** holds all page content and inline scripts. Sections are top-level `div`s with `fh5co-*` ids (`fh5co-header`, `-about`, `-resume`, `-features`, `-work`, `-started`, `-consult`, `-footer`). Most content edits happen here.
- **Contact form** (`#contact-form`, in `#fh5co-consult`) has no backend. It submits through EmailJS: the CDN script and `emailjs.init(...)` / `emailjs.sendForm(serviceId, templateId, this)` live in inline `<script>` blocks in the `<head>` of `index.html`. Form field `name` attributes (`fname`, `lname`, `email`, `subject`, `message`) must match the variables in the EmailJS template.
- **`js/main.js`** is an IIFE that wires up the template's jQuery behaviour on DOM ready. Elements with `.animate-box` fade in on scroll through Waypoints, and the `data-animate-effect` attribute picks the animation. `.js-fullheight` sets the hero height, Stellar handles parallax, and `.js-gotop` is the back-to-top button. Links with `.js-scroll` smooth-scroll to the element named in their `href`, offset by the height of the fixed nav. `siteNav` adds `.scrolled` to the fixed top nav (`.js-site-nav`) once the page scrolls past the hero, opens and closes the mobile menu, and highlights the link for the section in view. When you add a section, add a matching nav link.
- **Vendored libraries**: jQuery, Bootstrap 3, Waypoints, Stellar, easing, Modernizr and Respond are committed minified under `js/`. Treat them as third-party code.
- **Work section** (`#fh5co-work`): `.case-study` cards for recent client work, then `.case-study-project` cards (screenshot plus link) under "Earlier Projects". Card styles are at the end of `css/style.css`.

## Styles

`index.html` loads `css/style.css`. `sass/style.scss` is the source, using Bootstrap 3 Sass with brand variables such as `$brand-primary` at the top. No Sass compiler is configured in the repo, so if you edit the SCSS, compile it to `css/style.css` yourself (for example `npx sass sass/style.scss css/style.css`). The compiled CSS may have been hand-edited since it was generated, so diff before overwriting it. For small changes, editing `css/style.css` directly is the safer option.
