# VaultPay — Fintech UI/UX Prototype Plan

A portfolio-grade fintech web app prototype. **No real backend, no payment gateways, no auth.** Everything is mock data + simulated interactions with realistic loading/success/error states.

## Design System Foundation

Set up first in `src/styles.css` and shared primitives — every page consumes these tokens.

- **Palette (semantic, oklch)**: deep navy background, teal primary accents, success green, warning amber, destructive red, neutral surface ramp. Full light + dark mode.
- **Typography**: Inter (body) + Space Grotesk (display/numbers). Tabular numerals for all monetary values.
- **Effects**: glass surfaces (`backdrop-blur` + translucent borders), soft shadows, gradient meshes for hero/cards.
- **Motion**: subtle fade/slide/scale (200–400ms), success checkmark animation, skeleton loaders, number count-up on balances.
- **Reusable primitives**: `GlassCard`, `MoneyAmount`, `StatusBadge`, `TransactionRow`, `VirtualCard`, `StepIndicator`, `EmptyState`, `ErrorState`, `KPICard`.

## Routes (TanStack file-based, each with own SEO `head()`)

```
src/routes/
  __root.tsx          shared shell (marketing nav OR app sidebar based on path)
  index.tsx           Landing
  dashboard.tsx       User dashboard
  transfer.tsx        Money transfer wizard (4 steps via internal state)
  cards.tsx           Card management
  security.tsx        Security center
  notifications.tsx   Notifications center
  settings.tsx        Profile & settings
  design-system.tsx   Design system showcase
```

Marketing layout (landing) gets a top nav + footer. App routes get a collapsible sidebar (`AppSidebar` using shadcn sidebar) with: Dashboard, Transfer, Cards, Security, Notifications, Settings + a top bar with search, theme toggle, notifications bell, avatar.

## Page-by-Page

### 1. Landing (`/`)
Hero (headline, sub, dual CTA, floating glass card mockup with gradient mesh bg) → Trust strip (mock logos) → Features (6-card grid: instant transfers, virtual cards, insights, security, multi-currency, budgeting) → Card showcase (3D-tilted virtual card with feature callouts) → Security & trust (encryption, biometric, FDIC-style mock badges) → Testimonials (3 quotes) → Pricing-style CTA → FAQ accordion → Footer (4 columns + socials + legal).

### 2. Dashboard (`/dashboard`)
Grid layout:
- Balance card (large, gradient, animated count-up, eye-toggle to hide).
- KPI row: Income, Spending, Savings rate (with sparklines, Recharts).
- Income vs Spending area chart (last 30 days).
- Recent transactions list (8 rows, category icon, merchant, amount, status).
- Spending categories donut + legend.
- Insights cards ("You spent 23% less on dining", "Subscription renewing in 3 days").
- Quick actions row (5 icon buttons → Send, Request, Freeze, Add beneficiary, Pay bills).
- Notifications side panel (toggle).

### 3. Money Transfer (`/transfer`) — flagship flow
Single route, internal `step` state (1–4) with `StepIndicator` and back/next.
- **Step 1 Recipient**: tabs (Beneficiaries / Recent / Search). Beneficiary cards with avatar, name, masked account. Search filters live.
- **Step 2 Amount**: large amount input, currency selector, available balance, fee preview line, "you'll send / they receive", smart validation (min/max, insufficient funds warning inline).
- **Step 3 Review**: summary card (recipient, last-4, amount, fee, total, ETA, reference note field), security notice banner, "Hold to confirm" button or explicit confirm modal.
- **Step 4 Confirmation**: success checkmark animation, reference ID, Download receipt + Share buttons, "Send another" / "Back to dashboard".
- Includes loading state (processing spinner with reassurance copy), failed state (clear error + retry), session-expired modal demo.

### 4. Cards (`/cards`)
Virtual card preview (flippable, shows number/CVV with reveal), freeze toggle with confirmation, spending limits sliders (daily/monthly/online/ATM), replace card modal, security settings (contactless, online payments, international toggles), card analytics (spend by category for this card, last 6 months bar chart).

### 5. Security (`/security`)
Security score gauge (0–100, color-coded). 2FA settings (SMS / authenticator / biometric toggles). Login history table (device, location, time, status). Active devices list with revoke. Password change form. Fraud alerts feed.

### 6. Notifications (`/notifications`)
Tabs: All / Payments / Security / Account / Promotions. Grouped by date. Each item: icon, title, body, timestamp, mark-as-read. Bulk actions.

### 7. Settings (`/settings`)
Tabs: Profile, Notifications, Appearance (theme: light/dark/system, accent toggle), Privacy. Editable forms with mock save toasts.

### 8. Design System (`/design-system`)
Showcase: typography scale, color tokens (swatches with hex), buttons (all variants/sizes/states), inputs, cards, modals (trigger live), alerts, badges, status indicators, spacing scale visualization.

## Empty + Error States (built into respective pages)
- Empty: no transactions, no beneficiaries, no cards (each with illustration + primary CTA).
- Errors: insufficient balance (inline in transfer), transfer failed (step 4 variant), invalid account, session expired (modal), offline (top banner toast).

## Mock Data
Single `src/lib/mock-data.ts` exporting: user profile, balance, transactions (40+ realistic), beneficiaries, cards, notifications, login history, devices, spending categories, monthly series.

## Tech Notes
- Tailwind v4 tokens in `src/styles.css` (oklch only).
- shadcn components: sidebar, dialog, tabs, accordion, sheet, form, select, slider, switch, toast (sonner), tooltip, popover.
- Charts: Recharts (area, donut, bar, sparkline).
- Icons: lucide-react.
- Theme: `next-themes`-style toggle stored in localStorage; `dark` class on `html`.
- No backend, no Lovable Cloud, no auth — purely client-rendered mock.
- Every route file: own `head()` with unique title + description.

## Build Order
1. Tokens + theme + sidebar shell + mock data
2. Landing page
3. Dashboard
4. Transfer flow (highest fidelity)
5. Cards, Security, Notifications, Settings
6. Design System page
7. Polish: empty/error states, micro-interactions, responsive QA