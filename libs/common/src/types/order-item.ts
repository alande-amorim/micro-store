/* eslint-disable @typescript-eslint/no-namespace */
import { DbEntity } from './db-entity';

export namespace OrderItem {
  export type Model = {
    orderId: string;
    externalLineId: string;
    title: string;
    sku: string;
    quantity: number;
    price: number;
  };

  export type Entity = Model & DbEntity;

  export type Create = {
    externalLineId: string;
    title: string;
    sku: string;
    quantity: number;
    price: number;
  };
}
