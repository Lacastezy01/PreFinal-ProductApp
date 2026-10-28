# POPSTOCK — Product Management Playground

An expressive, hand-drawn, illustration-driven **Product Management Application** built with **React, TypeScript, and Vite**. 

This project adheres strictly to the functional specifications established in the **CCDI Pre-Final Examination (`PRE Final Exam.pdf`)** while recreating the joyful, neo-brutalist visual design language inspired by the supplied **`Al Murphy.jpg`** reference artwork.

---

## 1. Project Objectives

1. **Component Hierarchy & Props Sharing:** Modular structure with typed props across functional React components.
2. **State Management with React Hooks:** Dynamic UI reactivity utilizing `useState`, `useMemo`, and `useEffect`.
3. **Product Intake & Validation:** Comprehensive 8-field form ensuring complete validation, whitespace rejection, and immediate catalog updates.
4. **Declarative Computation:** Array methods (`.map()`, `.reduce()`, and `.filter()`) to dynamically compute subtotals, unit sums, and overall inventory/cart valuation.
5. **Philippine Peso Currency Formatting:** Strict formatting using the official currency symbol (`₱`) with commas and two decimal places (e.g., `₱1,250.00`).
6. **Conditional Formatting & Stock Status:** Visual highlights for **Low Stock** (quantity < 5), **In Stock** (quantity ≥ 5), and **Out of Stock** (quantity = 0), safeguarding inventory integrity.

---

## 2. Key Features

- **Playful Design Language:** Saturated lemon yellow foundation (`#FFF16A`), bold hot-pink headline bubbles (`#FF168B`), thick black outlines (3.5–4.5px), and tactile sticker offset shadows (`box-shadow: 4px 4px 0px #111111`).
- **Original Cartoon Mascot Suite:** Hand-drawn vector illustrations including *RoboStock*, *Cauldron Creature*, *Offline Cat*, *Sun Dude*, *Delivery Box Dude*, *Cartoon Hotdog*, *Cartoon Glasses*, and *Cartoon Train*.
- **Comprehensive Product Catalog:** Displays 8 diverse preloaded products across *Electronics*, *Fashion*, *Home & Living*, *Collectibles*, and *Stationery*.
- **Category Filtering & Live Search:** Filter items seamlessly by category and search keyword (name, description, specifications) with dynamic count badges and empty-state recovery.
- **Dedicated Product Detail Pages (`/products/:productId`):** Editorial layout featuring large imagery, rating breakdowns, technical specifications, live subtotal preview, and stock-capped quantity selectors.
- **Eight-Field Intake Form:** Complete validated form for Feature Image, Name, Category, Description, Specifications, Rating, Price, and Quantity, with one-click sample asset presets and live image preview.
- **Interactive Shopping Cart:** Full cart management with real-time quantity adjustments, item removal, entire cart clearing, and stock limit constraints.
- **Persistent State:** Saves newly created products and cart contents to `localStorage` safely with fallback defaults.

---

## 3. Technology Stack

- **Framework:** React 19 (TypeScript)
- **Bundler & Dev Server:** Vite 6
- **Routing:** React Router v7 (`BrowserRouter`, `Routes`, `Route`, `useParams`, `useLocation`)
- **Icons:** Lucide React
- **Typography:** Bowlby One, Bowlby One SC, DM Sans, Space Mono (Google Fonts)
- **Styling:** Modular CSS3 with Custom Properties (Variables, Flexbox, CSS Grid, Neo-Brutalist Sticker Shadows, CSS Keyframes)
- **Type Checking:** TypeScript 5.7+ (Strict Mode)

---

## 4. Getting Started & Installation

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm (Node Package Manager)

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd d:/ABC-AA-CLone/Lacaste-Prefinal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server locally:
```bash
npm run dev
```
Open your browser and visit `http://localhost:5173`.

### Production Build & Type Checking

To verify TypeScript types and build the production bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 5. Project Architecture

```text
Lacaste-Prefinal/
├── public/
│   └── images/
│       └── products/
│           ├── backpack.svg
│           ├── camera.svg
│           ├── deskmat.svg
│           ├── glowbot.svg
│           ├── headphones.svg
│           ├── keyboard.svg
│           ├── mug.svg
│           └── sneakers.svg
├── src/
│   ├── components/
│   │   ├── CartSummary.tsx
│   │   ├── CartoonIllustrations.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── QuantityControl.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StockBadge.tsx
│   │   └── Toast.tsx
│   ├── data/
│   │   └── initialProducts.ts
│   ├── pages/
│   │   ├── AddProductPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── HomePage.tsx
│   │   └── ProductDetailsPage.tsx
│   ├── styles/
│   │   ├── animations.css
│   │   ├── components.css
│   │   ├── global.css
│   │   ├── index.css
│   │   ├── layout.css
│   │   └── variables.css
│   ├── types/
│   │   └── product.ts
│   ├── utils/
│   │   ├── calculations.ts
│   │   ├── currency.ts
│   │   └── validation.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 6. Mathematical Formulas & Computation Logic

### Product Subtotal

The subtotal represents the monetary value of a product line based on the selected or inventory quantity:

$$\text{Subtotal} = \text{Unit Price} \times \text{Quantity}$$

Implemented in `src/utils/calculations.ts`:
```typescript
export function calculateSubtotal(price: number, quantity: number): number {
  if (price < 0 || quantity < 0) return 0;
  return price * quantity;
}
```

### Overall Cart Total

The overall cart total is derived by computing the aggregate sum of every item's subtotal via JavaScript's `.reduce()` method:

$$\text{Overall Total} = \sum_{i=1}^{n} (\text{Price}_i \times \text{Quantity}_i)$$

Implemented in `src/utils/calculations.ts`:
```typescript
export function calculateCartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => {
    return total + calculateSubtotal(item.product.price, item.quantity);
  }, 0);
}
```

### Currency Formatting

Currency is formatted through the native `Intl.NumberFormat` API configured for the Philippines locale (`en-PH`, `PHP`):
```typescript
export function formatPeso(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(safeAmount);
}
```
*Example Output:* `₱3,850.00`

---

## 7. Low-Stock Conditional Formatting Rules

As specified in the exam rubric, visual cues reflect product availability:

| Quantity Range | Status Indicator | Badge Styling | Interaction Rule |
| :--- | :--- | :--- | :--- |
| **`Quantity === 0`** | `Out of Stock` | Hot-pink badge with `XCircle` icon | Add to cart disabled; quantity controls locked |
| **`0 < Quantity < 5`** | `⚠️ Low Stock: Only X left!` | Bright orange badge with pulsing animation & `AlertTriangle` icon | Active purchases allowed up to remaining stock |
| **`Quantity ≥ 5`** | `✓ In Stock (X units)` | Fresh green badge with `CheckCircle2` icon | Fully available for cart additions |

---

## 8. Summary of the 12 Sequential Git Commits

| Commit # | Exact Commit Message | Description of Work |
| :---: | :--- | :--- |
| **1** | `initialize react typescript vite project` | Set up Vite React TypeScript project, entry points, dependencies, and `.gitignore`. |
| **2** | `organize product components and application types` | Defined TypeScript interfaces, currency/calculation utilities, and component scaffolds. |
| **3** | `create yellow pink and black design system` | Established CSS variables, Google Fonts, thick black outlines, and sticker shadows. |
| **4** | `build illustrated hero and main page layout` | Constructed the header, navigation, illustrated hero bubble stack, and footer strip. |
| **5** | `add sample products and responsive catalog` | Created 8 custom SVG product images and seeded realistic sample products with inventory. |
| **6** | `implement category filtering and product search` | Integrated category filter pills, keyword search bar, and empty search state handling. |
| **7** | `create dedicated product detail pages` | Built `/products/:productId` route with detailed specs, live subtotal, and stock-capped controls. |
| **8** | `implement product creation form and validation` | Created the 8-field Add Product form with live preview, preset loaders, and validation rules. |
| **9** | `add shopping cart quantity and removal controls` | Implemented cart increments, decrements, item deletion, empty cart view, and stock constraints. |
| **10** | `calculate cart totals and display stock status` | Connected automatic subtotals, overall cart summation, peso formatting, and low-stock badges. |
| **11** | `polish cartoon illustrations animations and responsiveness` | Added hero mascot animations, sparkle effects, mobile menu collapse, and focus accessibility. |
| **12** | `test application and finalize project documentation` | Verified full build, ran zero-error TypeScript validation, and finalized comprehensive documentation. |

---

## 9. Git Author & Repository Details

- **Author Name:** `Lacastezy01`
- **Author Email:** `lacastezyrene0@gmail.com`
- **Institution:** Computer Communication Development Institute (CCDI) Sorsogon
- **Subject:** Pre-Final Examination — Web Development / React

### Repository URL
- GitHub Repository: *(Destination repository URL to be linked upon assignment)*

### Live Deployment
- Live Application URL: *(Deployment URL to be linked upon deployment)*

---

*Crafted with precision, clean code conventions, and high creative fidelity.*
