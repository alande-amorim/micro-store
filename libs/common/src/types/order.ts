/* eslint-disable @typescript-eslint/no-namespace */
import { Address } from './address';
import { Customer } from './customer';
import { DbEntity } from './db-entity';
import { OrderItem } from './order-item';

export namespace Order {
  export type Model = {
    externalGid: string;
    customerId: string;
    totalAmount: number;
    currency: string;
  };

  export type WithRelations = Model & {
    externalGid: string;
    customerId: string;
    totalAmount: number;
    currency: string;

    customer: Customer.Model;
    items: OrderItem.Model[];
    shippingAddress: Address.Model;
  };

  export type Entity = DbEntity & Model;
  export type Create = Model;
  export type Update = Model;

  export type External = Model;
}
