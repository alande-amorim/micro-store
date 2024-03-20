import { Order } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor() {}

  handleWebhook(data: Order.WithRelations) {
    console.log(data);
  }
}
