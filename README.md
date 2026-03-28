# Student Finance Hub (CashBook) 🎓💸

A premium, full-stack personal finance mobile application meticulously crafted for university students. CashBook provides a stunning user interface to securely track spending, budget monthly income, manage ambitious financial goals, and seamlessly export categorized data across devices.

## ✨ Key Features

- **Biometric App Lock:** Enterprise-grade security integrating FaceID, TouchID, and Fingerprint OS-level APIs globally so your balances remain aggressively protected from the second you background the app.
- **Active Goal Tracking:** Visually track what you're saving for with dynamic, color-coded progress bars, customized emojis, and real-time database syncing straight to your Home Dashboard.
- **One-Tap PDF Export:** Compile your entire transaction history, complete with a beautiful HTML summary layout, and hand it off natively to the iOS/Android Share Sheet to send, print, or save.
- **Complete Profile Management:** Keep your university, major, and role info up-to-date, alongside powerful "Clear All Data" and "Sign Out" flows protected by premium frosted-glass warning modals.
- **Instant Insights:** Clear visual metrics for Total Balance, Monthly Income, and Monthly Expenses.

## 🛠 Tech Stack

**Client Application:**

- **Framework:** Expo (React Native)
- **Language:** TypeScript
- **State/Hooks:** Custom React Contexts (`AuthContext`, `FinanceContext`, `AppLockContext`)
- **Typography:** `Inter` Google Fonts Family
- **Native Modules:** `expo-local-authentication`, `expo-print`, `expo-sharing`, `expo-haptics`

**Server & Database:**

- **Backend API:** Custom Express.js Server
- **Database:** Supabase (PostgreSQL)
- **ORM:** Drizzle ORM
- **Authentication:** Supabase Auth
- **Deployment:** Optimized for Vercel Serverless Functions Edge routing

## 📁 Project Architecture (Monorepo)

The project leverages npm Workspaces for powerful local package separation:

- `/artifacts/mobile/` - The React Native (Expo) mobile application (Screens, Contexts, UI Components).
- `/artifacts/api-server/` - Express.js API handling advanced data routines and endpoints.
- `/artifacts/mockup-sandbox/` - A Vite-powered sandbox (React + Tailwind) for web component and UI mockup prototyping.
- `/lib/` - Shared internal libraries and utilities.
  - `/lib/api-client-react/` - Generated TanStack Query client for robust, typesafe API fetching.
  - `/lib/api-spec/` - OpenAPI schema definitions and Orval configurations.
  - `/lib/api-zod/` - Generated Zod validation schemas for end-to-end type safety.
  - `/lib/db/` - Drizzle ORM schema definitions and shared database logic.
- `/scripts/` - Custom automation or structural scripts.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- Local **npm** package manager
- Expo Go app on your physical device, or an iOS/Android simulator.
- A configured Supabase project (for both Auth & DB).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/farhanshahriyar/CashBook.git
   cd CashBook
   ```

2. **Install global workspace dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Navigate to `/artifacts/mobile/` and copy the example environment configuration into a new `.env` file.
   - Insert your `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

### Running Locally

**Start the Native Client:**
```bash
cd artifacts/mobile
npx expo start
```

**Start the API Server (optional, for custom routes):**
```bash
cd artifacts/api-server
npm run serve
```

## 🔒 Security

CashBook does not share any telemetry or financial data with third parties. All context is tethered directly to your connected Supabase authentication layer, and protected locally inside the device keychain and biometric hardware enclaves.

## 🗺️ Future Implementation Roadmap

As CashBook evolves, the following features are prioritized for development:

1. **Web Dashboard Expansion**
   - Transform the current `mockup-sandbox` into a fully fleshed out React web dashboard for desktop power users.
   - Synchronize layout functionality with the existing Supabase backend structure.

2. **Advanced AI Spending Analytics**
   - Intelligent trend forecasting based on historical expenses.
   - ML-driven automated transaction categorization.

3. **Push Notification Infrastructure**
   - Active alerts when approaching budget limits or missed/delayed saving goal milestones.
   - Daily/Weekly summary reports directly to the lock screen.

4. **Multi-Currency & Bank Syncing**
   - Real-time exchange limits and dual-currency balance views for international university students.
   - Initial scoping for Plaid/Tink integrations to automatically import live bank records.

5. **Gamification & Social Goals**
   - Achievement badges, contribution streaks, and the ability to share a "Savings Goal" seamlessly with roommates or peers.
