/**
 * Formats a numeric amount into Philippine Peso currency format (e.g. ₱1,250.00).
 */
export function formatPeso(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(safeAmount);
}
