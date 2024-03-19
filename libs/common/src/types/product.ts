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
  };

  export type Entity = DbEntity & Required<Model, 'slug'>;
  export type Create = Optional<Model, 'slug'>;
  export type Update = Optional<Model>;
}
