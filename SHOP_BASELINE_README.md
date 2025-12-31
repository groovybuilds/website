# Groovy Builds Website — SHOP BASELINE SNAPSHOT

This zip represents a **known-good, production-stable baseline** of the Groovy Builds website.
It is intentionally frozen before Shop development begins.

This document exists to prevent regressions and to guide future Shop implementation safely.

---

## 🔒 CURRENT STATE (CONFIRMED WORKING)

At the time this snapshot was created:

- ✅ Local production build passes (`npm run build`)
- ✅ Local production server works (`npm run start`)
- ✅ Deployed successfully to Vercel
- ✅ Contact page is fully functional
- ✅ Contact form inputs accept typing (desktop + mobile)
- ✅ Contact form submits without UI/runtime errors
- ✅ No visual regressions on home or contact pages

This snapshot is considered **safe to revert to at any time**.

---

## 🧠 CRITICAL LESSON LEARNED (DO NOT IGNORE)

A previous failure was caused by **background overlay layers intercepting pointer events**.

### Rule going forward:
- Any `absolute`, `fixed`, or full-screen background layers MUST use:




- All interactive UI (forms, buttons, inputs) MUST sit in a higher z-index layer.

If inputs ever appear “dead” again:
→ Check `z-index` and `pointer-events` FIRST.

---

## 📁 FILES THAT MUST BE TREATED AS STABLE

These files are confirmed working and should not be casually modified:

- `app/contact/page.tsx`
- `components/ContactForm.tsx`
- `app/api/contact/route.ts`

Any changes to these should be:
1. Intentional
2. Tested locally with `npm run build`
3. Committed separately from Shop work

---

## 🛍️ SHOP DEVELOPMENT PLAN (FUTURE)

When building the Shop, follow these constraints:

### Where the Shop should live
- Route: `/shop`
- Use **isolated components**
- Avoid touching:
- home page layout
- contact page layout
- global overlays

### What the Shop will likely include
- Drop-shipped apparel (Printful / similar)
- 3D-printed tools (Stripe payment links or Checkout)
- Simple product grid
- External fulfillment logic (NOT tied into core UI)

### Strong recommendation
- Keep Shop logic **self-contained**
- If testing UI effects, do it ONLY inside `/shop`
- Avoid global CSS or layout changes unless absolutely necessary

---

## 🔁 SAFE WORKFLOW FOR FUTURE CHANGES

Before starting Shop work:

1. Duplicate this zip
2. Work only from the copy
3. Commit Shop changes separately
4. Run:
