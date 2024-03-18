/* eslint-disable @typescript-eslint/no-namespace */
import { DbEntity } from './db-entity';

export namespace User {
  export type Model = {
    name: string;
    email: string;
    password: string;
  };

  export type Entity = DbEntity & Model;
  export type Create = Model;
}
