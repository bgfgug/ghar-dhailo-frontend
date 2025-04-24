
export const formatPrice = (price: number): string => {
  return `Rs. ${price.toLocaleString('ne-NP')}`;
};

export const formatPriceWithUnit = (price: number, unit: string): string => {
  return `Rs. ${price.toLocaleString('ne-NP')}/${unit}`;
};

export default formatPrice;
