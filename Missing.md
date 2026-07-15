# Missing Items (Req.md Audit)

## ✅ Completed
- Chart library (Recharts)
- Demo login buttons
- Google social login
- Dashboard sidebar responsive (mobile drawer)
- Navbar responsive (mobile hamburger menu)
- Explore page responsive (filter drawer on mobile)
- Explore page `any` type fixed to `Item` interface
- Home page sections (now 7: Hero, Stats, Features, Testimonials, Integrations, FAQ, CTA)
- API route protection on POST, PUT, DELETE `/api/items`
- Dashboard redirects unauthenticated users to `/login` (§8)
- Register button `type="submit"` fixed
- Multiple images on details page (gallery with thumbnails) (§5)
- "View" action on manage items table (§9)
- Add/manage forms updated to use `images[]` array instead of single `image`

## ❌ Still missing

- [ ] **1. Forgot password page** — Linked at `/forgot-password` but route doesn't exist (§7)
- [ ] **2. Inline validation** — Login/register use `alert()` instead of proper form validation UI with inline error messages (§7)
- [ ] **3. GitHub social login** — Button exists on login/register pages but no provider configured in `auth.ts` (§7)
- [ ] **4. Hero height** — Should be 60–70% of screen height; currently uses content-driven height only (§3)
