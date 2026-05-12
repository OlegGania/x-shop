export const getDiscountPrice = (price: number, discount = 0): number => {
  return price - (price * discount) / 100;
};
