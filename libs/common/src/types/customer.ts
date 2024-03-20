/* eslint-disable @typescript-eslint/no-namespace */

import { DbEntity } from './db-entity';

export namespace Customer {
  export type Model = {
    userId: string;
    addressId: string;
    email: string;
    firstName: string;
    lastName: string;
    state: string;
    verifiedEmail: boolean;
    phone: string;
    currency: string;
  };

  export type Entity = Model & DbEntity;
}
