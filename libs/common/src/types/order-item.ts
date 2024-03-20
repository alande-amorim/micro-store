/* eslint-disable @typescript-eslint/no-namespace */
import { DbEntity } from './db-entity';

export namespace OrderItem {
  export type Model = {
    orderId: string;
    externalLineId: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    currency: string;
  };

  export type Entity = Model & DbEntity;
}
