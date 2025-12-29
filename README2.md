# Groovy Builds Website — Master Reference

This document is the single source of truth for the Groovy Builds website.
Read this file before making changes to avoid confusion or regressions.

---

## PROJECT OVERVIEW

This is a **Next.js App Router** project using the `/app` directory.
The site is intentionally minimal, luxury-leaning, and design-driven.

The goal is:
- clean visuals
- restrained motion
- no unnecessary UI clutter
- high-end residential + trade credibility

---

## ROUTES

### Home
- **Path:** `/`
- **File:** `app/page.tsx`
- **Purpose:** Brand-forward landing page

Key elements:
- Full-screen background crossfade
- Minimal navbar (text only)
- Statement line above services
- Individual service bubbles at the bottom
- No review carousel on the home page

⚠️ Do NOT:
- re-add a large container around all service bubbles
- stack the statement text
- add buttons or bubbles to the navbar

---

### Shop (Coming Soon)
- **Path:** `/shop`
- **File:** `app/shop/page.tsx`
- **Purpose:** Placeholder for future merch + tools

Current state:
- Static, stable page (no JS-heavy effects)
- “Coming Soon” message
- Mentions:
  - Groovy merch
  - Small-batch 3D printed tools

⚠️ Intentional:
- No waitlist
- No email capture
- No checkout yet

---

### Contact
- **Path:** `/contact`
- **File:** `app/contact/page.tsx`
- **Purpose:** Client inquiries

---

## NAVIGATION

### Navbar
- **File:** `components/Navbar.tsx`
- **Style:** Text-only links (NO buttons, NO bubbles)

Current links:
- Home → `/`
- Shop → `/shop`
- Reviews → Google review link
- Contact → `/contact`
- Social → Instagram

⚠️ Do NOT:
- add background pills or borders to nav items
- add animations without intent

---

## BACKGROUND SYSTEM

### Background Crossfade
- **File:** `components/BackgroundCrossfade.tsx`
- **Client component**
- Used on:
  - Home page
  - (optionally) other pages if stable

Purpose:
- Smooth image crossfade
- No pagination dots
- No base-layer flashing

⚠️ If a page becomes unstable:
- Remove BackgroundCrossfade from THAT page only
- Do not delete the component globally

---

## DESIGN RULES (IMPORTANT)

These are intentional decisions.

### Typography
- Display font: **Monoton**
- Used sparingly (nav, statement, section labels)
- Body text stays simple and readable

### Statement Line
Text:
> thoughtful spaces. designed with intention. crafted with care.

Rules:
- Single line
- Lowercase
- Centered left-to-right
- Subtle opacity
- Positioned just above service bubbles

⚠️ Do NOT stack or bold this aggressively.

---

## SERVICES SECTION

- Individual “glass” bubbles ONLY
- No large wrapper/container behind them
- Fixed to bottom of viewport
- Subtle hover sheen is okay
- Should feel refined, not playful

---

## COMMON ISSUES & FIXES

### Site doesn’t load
- Check which port Next is running on
- Look for: `Local: http://localhost:XXXX`
- Clear cache:
```bash
rm -rf .next
npm run dev
