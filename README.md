# KoinX — Tax Loss Harvesting Tool

A premium, dark-themed financial dashboard built with **React + Vite** that helps cryptocurrency investors simulate and optimize tax loss harvesting strategies.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18.x or higher
- **npm** v9.x or higher

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kshitij2212/koinx_frontend.git
   cd koinx_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The app will be live at 

---

## ✨ Features

- **Dual Card Comparison** — "Realized Status" vs "Harvesting Impact" cards update in real-time as holdings are selected
- **Interactive Holdings Table** — Select individual or all holdings with checkbox toggles
- **Savings Indicator** — 🎉 message appears dynamically when harvested losses reduce your tax liability
- **Collapsible Info Banner** — Disclaimers and regulatory notes with smooth expand/collapse
- **Responsive Dark UI** — Optimized for all screen sizes with a professional dark aesthetic

---

## 📂 Project Structure

```
src/
├── api/
│   ├── capitalGainsApi.js
│   └── holdingsApi.js
├── components/
│   ├── CapitalGainsCard.jsx    # Pre/After harvesting metric cards
│   ├── HoldingRow.jsx          # Individual holding row with selection
│   ├── HoldingsTable.jsx       # Full holdings table with select-all
│   └── InfoBanner.jsx          # Collapsible info/disclaimer banner
├── hooks/
│   └── useTaxHarvesting.js     # All business logic, state, and derived calculations
├── utils/
│   └── formatters.js           # fmtSmall & fmtCompact currency formatters
├── App.jsx                     
├── App.css                     
└── main.jsx                    
```

---

## ⚙️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Vanilla CSS3 (no Tailwind) |
| State | Custom hook with `useMemo` & `useCallback` |
| Data | Promise-based mock APIs (simulates real API latency) |

---

## 📊 Business Logic & Assumptions

### Calculation Model

- **Pre-Harvesting:** Displays current year's realized capital gains from the `capitalGainsApi` — fixed values not affected by selection.
- **After-Harvesting:** Recomputes projected gains by adding the unrealized gains/losses of selected holdings on top of the base realized gains.
  - Positive unrealized gains → added to Profits tally
  - Negative unrealized gains → added to Losses tally
- **Net Position:** `Profits − Losses` per term (STCG / LTCG separately)
- **Total Realized / Total Effective:** `Net STCG + Net LTCG`

---

## 🛠 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```