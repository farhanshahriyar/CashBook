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

## 📁 Project Architecture

- `/artifacts/mobile/` - The entire frontend Expo ecosystem (Screens, Modals, Shared Contexts).
- `/artifacts/api-server/` - The backend Express server to handle complex data logic routines.
- `/supabase/` - SQL configuration schema, initial migrations, and seed data scripts.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) package manager
- Expo Go app on your physical device, or an iOS/Android simulator.
- A configured Supabase project (for both Auth & DB).

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/farhanshahriyar/CashBook.git
   cd CashBook
   \`\`\`

2. **Install global workspace dependencies:**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Configure Environment Variables:**
   - Navigate to `/artifacts/mobile/` and copy the example environment configuration into a new `.env` file.
   - Insert your `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

### Running Locally

**Start the Native Client:**
\`\`\`bash
cd artifacts/mobile
npx expo start
\`\`\`

**Start the API Server (optional, for custom Vercel routes):**
\`\`\`bash
cd artifacts/api-server
pnpm run dev
\`\`\`

## 🔒 Security

CashBook does not share any telemetry or financial data with third parties. All context is tethered directly to your connected Supabase authentication layer, and protected locally inside the device keychain and biometric hardware enclaves.
