/* eslint-disable @typescript-eslint/no-namespace */
import { Optional, Required } from 'utility-types';
import { DbEntity } from './db-entity';

export namespace Product {
  export type Model = {
    name: string;
    slug: string;
    sku: string;
    price: number;
    salePrice?: number;
    description?: string;
    externalId?: string;
  };

  export type Entity = DbEntity & Required<Model, 'slug'>;
  export type Create = Optional<Model, 'slug'>;
  export type Update = Optional<Model>;

  export type External = {
    productId: string;
    variantId: string;
    title: string;
    handle: string;
    sku: string;
    price: number;
    description: string;
  };
}
