export type ProductBase = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
};

export type Product = ProductBase & {
  discountPercentage?: number;
  stock: number;
  brand: string;
  category: string;
  description: string;
  images: string[];
};

export type CartProduct = Product & {
  quantity: number;
  size: string;
  color: string;
  image: string;
};

export type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  discountPercentage?: number;
  image: string;
  size: string;
  color: string;
};

export const toOrderItem = (cartProduct: CartProduct): OrderItem => ({
  id: cartProduct.id,
  title: cartProduct.title,
  price: cartProduct.price,
  quantity: cartProduct.quantity,
  discountPercentage: cartProduct.discountPercentage,
  image: cartProduct.image,
  size: cartProduct.size,
  color: cartProduct.color,
});
