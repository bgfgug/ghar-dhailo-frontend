
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateNepali = (dateString: string): string => {
  const date = new Date(dateString);
  // This is a simplified version - a real implementation would use a Nepali date converter
  return date.toLocaleDateString('ne-NP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const isActivePromo = (expiryDate?: string): boolean => {
  if (!expiryDate) return true;
  
  const now = new Date();
  const expiry = new Date(expiryDate);
  return expiry > now;
};
