export interface Product {
  _id?: string;
  name: string;
  container: string;
  size: string;
  description: string;
  price: number;
  stock: number;
  provider: string
  imagePath: string;
}