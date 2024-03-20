import { Address, Customer, Order, OrderItem, Shopify } from '@app/common';

export class CreateOrderDto implements Order.Create {
  externalGid: string;
  totalAmount: number;
  currency: string;

  customer: Customer.Create;
  shippingAddress: Address.Create;
  items: OrderItem.Create[];

  constructor({
    customer,
    shipping_address,
    line_items,
    ...data
  }: Shopify.Order.Created) {
    this.externalGid = data.admin_graphql_api_id;
    this.currency = data.currency;
    this.totalAmount = parseFloat(data.total_price);

    this.customer = {
      email: customer.email,
      firstName: customer.first_name,
      lastName: customer.last_name,
      state: customer.state,
      verifiedEmail: customer.verified_email,
      phone: customer.phone,
      currency: customer.currency,
    };
    this.shippingAddress = {
      addressType: Address.AddressType.SHIPPING,
      firstName: shipping_address.first_name,
      lastName: shipping_address.last_name,
      address1: shipping_address.address1,
      phone: shipping_address.phone,
      city: shipping_address.city,
      zip: shipping_address.zip,
      province: shipping_address.province,
      country: shipping_address.country,
      company: shipping_address.company,
      name: shipping_address.name,
      countryCode: shipping_address.country_code,
      provinceCode: shipping_address.province_code,
    };

    this.items = line_items.map(
      (item): OrderItem.Create => ({
        externalLineId: item.admin_graphql_api_id,
        title: item.title,
        sku: item.sku,
        quantity: item.quantity,
        price: parseFloat(item.price),
      }),
    );
  }
}
