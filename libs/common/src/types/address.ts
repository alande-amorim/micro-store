/* eslint-disable @typescript-eslint/no-namespace */
import { DbEntity } from './db-entity';

export namespace Address {
  export type Model = {
    firstName: string;
    address1: string;
    phone: string;
    city: string;
    zip: string;
    province: string;
    country: string;
    lastName: string;
    company: string;
    name: string;
    countryCode: string;
    provinceCode: string;
    address_type: AddressType;
  };

  export type Entity = Model & DbEntity;

  export const AddressType = {
    SHIPPING: 'SHIPPING',
    BILLING: 'BILLING',
    DEFAULT: 'DEFAULT',
  } as const;
  export type AddressType = (typeof AddressType)[keyof typeof AddressType];
}
