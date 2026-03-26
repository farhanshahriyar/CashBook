import { Platform } from "react-native";

// ── API Base URL ──────────────────────────────────────────────────
// In production set EXPO_PUBLIC_API_URL in your .env (or app.config)
// to your Vercel deployment URL, e.g. https://your-app.vercel.app
// For local development it falls back to localhost / LAN IP.
const PROD_API_URL = process.env.EXPO_PUBLIC_API_URL;

const DEV_API_URL = Platform.OS === "web"
  ? "http://localhost:3000/api"
  : "http://192.168.0.105:3000/api";

const API_BASE_URL = PROD_API_URL ?? DEV_API_URL;

type RequestOptions = {
  method?: string;
  body?: unknown;
};

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API error ${res.status}: ${errorBody}`);
  }

  // For 204 No Content (delete responses)
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

// ─── Transactions ──────────────────────────────────────────────

export type ApiTransaction = {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  note?: string | null;
};

export function fetchTransactions(): Promise<ApiTransaction[]> {
  return apiRequest<ApiTransaction[]>("/transactions");
}

export function createTransaction(
  data: Omit<ApiTransaction, "id">
): Promise<ApiTransaction> {
  return apiRequest<ApiTransaction>("/transactions", {
    method: "POST",
    body: data,
  });
}

export function deleteTransaction(id: string): Promise<void> {
  return apiRequest<void>(`/transactions/${id}`, { method: "DELETE" });
}

// ─── Budgets ───────────────────────────────────────────────────

export type ApiBudget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
};

export function fetchBudgets(): Promise<ApiBudget[]> {
  return apiRequest<ApiBudget[]>("/budgets");
}

export function createBudget(
  data: Omit<ApiBudget, "id">
): Promise<ApiBudget> {
  return apiRequest<ApiBudget>("/budgets", {
    method: "POST",
    body: data,
  });
}

export function updateBudget(
  id: string,
  spent: number
): Promise<ApiBudget> {
  return apiRequest<ApiBudget>(`/budgets/${id}`, {
    method: "PUT",
    body: { spent },
  });
}

// ─── Saving Goals ──────────────────────────────────────────────

export type ApiSavingGoal = {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
  emoji: string;
  color: string;
};

export function fetchGoals(): Promise<ApiSavingGoal[]> {
  return apiRequest<ApiSavingGoal[]>("/goals");
}

export function createGoal(
  data: Omit<ApiSavingGoal, "id">
): Promise<ApiSavingGoal> {
  return apiRequest<ApiSavingGoal>("/goals", {
    method: "POST",
    body: data,
  });
}

export function updateGoalSavedAmount(
  id: string,
  savedAmount: number
): Promise<ApiSavingGoal> {
  return apiRequest<ApiSavingGoal>(`/goals/${id}`, {
    method: "PUT",
    body: { savedAmount },
  });
}

export function updateGoal(
  id: string,
  data: Partial<Omit<ApiSavingGoal, "id">>
): Promise<ApiSavingGoal> {
  return apiRequest<ApiSavingGoal>(`/goals/${id}`, {
    method: "PUT",
    body: data,
  });
}

export function deleteGoal(id: string): Promise<void> {
  return apiRequest<void>(`/goals/${id}`, { method: "DELETE" });
}
