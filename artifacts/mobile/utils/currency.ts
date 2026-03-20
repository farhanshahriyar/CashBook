export const CURRENCY_SYMBOL = "৳";
export const CURRENCY_CODE = "BDT";

export function formatAmount(amount: number, decimals = 0): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString("en-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}
