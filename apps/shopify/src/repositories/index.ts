import { Product } from '@app/common';

export interface ProductsRepositoryInterface {
  list(): Promise<Product.External[]>;
  get(p: Product.Entity): Promise<Product.External>;
  create(p: Product.Entity): Promise<Product.External>;
  update(p: Product.Entity): Promise<Product.External>;
  delete(p: Product.Entity): Promise<string>;
}
