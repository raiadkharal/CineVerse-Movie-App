import { getImageUrl } from '../api/tmdb';

export { getImageUrl };

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRuntime = (minutes: number | null): string => {
  if (!minutes) return 'N/A';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export const formatCurrency = (amount: number): string => {
  if (!amount || amount === 0) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 7.5) return '#22c55e';
  if (rating >= 6) return '#f59e0b';
  return '#ef4444';
};

export const getYearFromDate = (dateStr: string): string => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).getFullYear().toString();
};
