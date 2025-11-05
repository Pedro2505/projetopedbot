export function getDaysUntil(date: string): number {
  const today = new Date();
  const expirationDate = new Date(date);
  const diffTime = expirationDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}