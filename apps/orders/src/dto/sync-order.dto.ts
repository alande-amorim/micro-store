import { Customer, Order, OrderItem, Address } from '@app/common';

export class SyncOrderDto implements Order.WithRelations {
  externalGid: string;
  customerId: string;
  totalAmount: number;
  currency: string;

  customer: Customer.Model;
  items: OrderItem.Model[];
  shippingAddress: Address.Model;
}
