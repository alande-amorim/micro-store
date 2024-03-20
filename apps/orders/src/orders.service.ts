import { Order } from '@app/common';
import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './repositories/customers.repository';
import { AddressesRepository } from './repositories/addresses.repository';
import { OrdersRepository } from './repositories/orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private customerRepo: CustomersRepository,
    private addressRepo: AddressesRepository,
    private orderRepo: OrdersRepository,
  ) {}

  // async handleWebhook2({
  //   customer,
  //   shippingAddress,
  //   items,
  //   ...data
  // }: SyncOrderDto) {
  //   const customerEntity = await this.customerRepo.getOrCreate(customer);
  //   const shippingAddressEntity =
  //     await this.addressRepo.create(shippingAddress);
  // }

  // async handleWebhook(data: SyncOrderDto) {
  async handleWebhook(data: CreateOrderDto): Promise<Order.Entity> {
    const order = await this.orderRepo.create(data);
    console.log(order);
    return order;
  }
}
