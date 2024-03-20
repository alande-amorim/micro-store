import { Order } from '@app/common';

export class CreateOrderDto {
  userId: string;
  productIds: string[];
}
