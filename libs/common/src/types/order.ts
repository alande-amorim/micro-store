/* eslint-disable @typescript-eslint/no-namespace */
import { DbEntity } from './db-entity';

export namespace Order {
  export type Model = {
    externalId: string;
  };

  export type Entity = DbEntity & Model;
  export type Create = Model;
  export type Update = Model;

  export type External = {
    id: string;
  };
}
