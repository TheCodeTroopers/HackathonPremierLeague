# HPL — Hackathon Premier League Premium Website Implementation Plan

Build a complete, production-grade, highly responsive, multi-page web platform for **HPL (Hackathon Premier League)** replicating the exact visual identity, editorial illustration language, color palette, and data structure from the reference design mockups and event specifications.

---

## 1. Visual Design System & Tokens (Replicated from Reference Mockups)

### Color Hierarchy
* **Canvas / Backgrounds:**
  * Primary Warm Paper: `#FDFBF7` / `#FAF6EE`
  * Card Surface: `#FFFFFF` with warm cream card accents (`#FFFDF9`, `#F5EFE6`)
  * Ink Borders & Sketch Lines: `#1E1B4B`, `#2A265F`, `#18182E`, `#334155` (1.5px – 2px hand-inked style)
* **Brand Accents & Highlights:**
  * **Championship Navy / Deep Indigo:** `#1E1B4B`, `#2A265F`, `#3730A3`
  * **Trophy Gold / Starburst Yellow:** `#F59E0B`, `#FBBF24`, `#FDE047`
  * **Energy Coral / Victory Orange:** `#E11D48`, `#EA580C`, `#F97316`, `#EF4444` (used in "CONQUER.", CTAs, badges)
  * **Week 1 / Emerald Green:** `#0D9488`, `#059669`, `#10B981`
  * **Week 2 / Electric Blue:** `#3B82F6`, `#2563EB`, `#6366F1`
  * **Playoffs / Royal Purple:** `#7C3AED`, `#8B5CF6`, `#9333EA`
* **Typography Hierarchy:**
  * **Display & Brand Headings:** Bold condensed display / editorial sans (`Cabinet Grotesk`, `Plus Jakarta Sans`, `Outfit`, `Impact`-inspired bold hand-sketched display accents).
  * **Body & UI Text:** Clean, highly legible sans-serif (`Inter`, `Plus Jakarta Sans`, `system-ui`).
  * **Badges & Numbers:** Monospace/tabular figures (`JetBrains Mono`, bold geometric sans).

### Illustration Language
* Custom handcrafted SVG vector illustrations featuring:
  1. **Signature Hero Trophy & Stadium Arena:** Golden HPL trophy over a tech arena with code tags `</>`, student developers collaborating, laptop screens, data streams, and Udupi coastal skyline.
  2. **About HPL / Collaboration:** Student builders celebrating, high-fiving, collaborating over laptops in purple, yellow, orange, and teal hoodies.
  3. **Theme: Build for Udupi:** Coastal Karnataka temple architecture, coconut palms, golden sun, and local technology integration.
  4. **The League Journey (3-Stage visual roadmap):**
     * Week 1 (Part 1): Terminal/laptop with problem release
     * Week 2 (Part 2): Rocket launch / iterative architecture
     * Playoffs (Part 3): Grand championship trophy & arena
  5. **Match Day Arena & Playoff Brackets:** Technology arena, head-to-head battle cards, live submission terminals.
  6. **Mentors & Judges Illustrated Portraits:** Individual stylized avatar portraits matching the reference cards.
  7. **Doodles & Micro-accents:** Starbursts, hand-drawn arrows, lightbulbs, rocket doodles, code brackets `</>`, sketch clouds.

---

## 2. Multi-Page Architecture & Route Map

| Page / Route | Key Features & Modules |
| :--- | :--- |
| **01. Home (`/`)** | Hero with `CODE. COLLABORATE. CONQUER.`, live countdown, 3-Week Journey summary, About HPL, Theme: Build For Udupi!, Live Leaderboard snapshot, Mentors preview, FAQ preview, Sponsor/Partner ribbon, and CTA footer banner. |
| **02. The League (`/league`)** | 7-Step Illustrated Storytelling sequence: The Idea $\rightarrow$ The Squads $\rightarrow$ The Matches $\rightarrow$ The Feedback $\rightarrow$ The Ranking $\rightarrow$ The Playoffs $\rightarrow$ The Champion. Interactive step explorer with custom illustrations. |
| **03. How It Works (`/how-it-works`)** | Detailed 6-Phase timeline (Release $\rightarrow$ Build $\rightarrow$ Evaluate $\rightarrow$ Feedback $\rightarrow$ Improve $\rightarrow$ Playoffs), Points scoring logic (+3 Win, +1 Tie, 0 Loss), and qualification thresholds. |
| **04. Match Day (`/match-day`)** | Live competition hub: Active round tracker, Live Countdown timer, Head-to-Head Squad fixtures, Problem statement briefing panel, Live Submission terminal with mock upload, and Mentor Review checkpoints. |
| **05. Squads (`/squads`)** | Squad directory with search, filtering (All, Top 4, Rising, Underdogs), squad detail modal, member roles (Lead, Frontend, Backend, AI/ML, Design), project abstracts, and match history. |
| **06. Leaderboard (`/leaderboard`)** | Real-time standings table with podium cards for `#01`, `#02`, `#03`, movement indicators (↑, →, ↓), match records (Matches, Wins, Ties, Losses, Points), qualification cutoff line, and round-by-round points graph. |
| **07. The Journey (`/journey`)** | Interactive visual season timeline (Discover $\rightarrow$ Build $\rightarrow$ Compete $\rightarrow$ Feedback $\rightarrow$ Iterate $\rightarrow$ Playoff $\rightarrow$ Grand Finale) with rich horizontal/vertical scrolling modes. |
| **08. Playoffs (`/playoffs`)** | Interactive tournament bracket (Semifinals $\rightarrow$ 3rd Place Match $\rightarrow$ Grand Championship Finale), qualification criteria, match rules, and prize pool breakdown. |
| **09. Mentors & Judges (`/mentors`)** | Dual-tab directory for Mentors (with office hours booking modal) and Judges (with judging rubric breakdown), styled with illustrated profile cards. |
| **10. Rulebook (`/rulebook`)** | Structured, searchable accordion rulebook covering Eligibility, Team Formations, Code Guidelines, Submission Deadlines, Fair Play, and Disqualification policies. |
| **11. FAQ (`/faq`)** | Categorized accordion FAQ (General, Participation, Submission, Evaluation, Playoffs, Event Day) with instant search filter. |
| **12. Register (`/register`)** | Multi-step interactive registration wizard (Step 1: Team & Track $\rightarrow$ Step 2: Team Leader & Members $\rightarrow$ Step 3: College & Contact $\rightarrow$ Step 4: Review & Submit) with live validation and league confirmation pass. |

---

## 3. Technology Stack & Component Structure

* **Framework:** React 18 + TypeScript + Vite / Next.js architecture
* **Styling:** Tailwind CSS + Custom CSS Variables for warm paper backgrounds, ink borders, and hand-drawn accents
* **Icons & Animation:** Lucide React + custom animated SVG micro-illustrations + smooth transitions
* **State Management:** Reactive client-side routing, active tabs, modals, multi-step forms, real-time leaderboard filters, and live search

---

## 4. Verification Plan

* **Visual & Layout Alignment:** Verify exact correspondence with the reference mockups (color palette, header layout, font sizing, doodle accents, leaderboard table styling, Udupi temple graphic).
* **Responsive Testing:** Verify rendering on Desktop (1440px/1280px), Tablet (768px/1024px), and Mobile (375px/430px) with dedicated mobile hamburger menu and collapsible tables.
* **Functional & Interactive Flows:**
  * Multi-step registration wizard completion with validation.
  * Leaderboard search, sorting, and tab switching.
  * Mentors/Judges tab switching and office-hour booking modal.
  * Match Day live submission simulation and countdown clock.
  * FAQ search and accordion expansion.
