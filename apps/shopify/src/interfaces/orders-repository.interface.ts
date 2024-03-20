import { Order } from '@app/common';

export interface OrdersRepositoryInterface {
  list(): Promise<Order.External[]>;
  get(p: Order.Entity): Promise<Order.External>;
  create(p: Order.Entity): Promise<Order.External>;
  update(p: Order.Entity): Promise<Order.External>;
  delete(p: Order.Entity): Promise<string>;
}
