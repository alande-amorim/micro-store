import { Controller, Get } from '@nestjs/common';
import { createAdminApiClient } from '@shopify/admin-api-client';
import { GetProductsDocument, getSdk } from './graphql';
import { GraphQLClient } from 'graphql-request';
import { ConfigService } from '@nestjs/config';
import { print } from 'graphql';

@Controller()
export class ShopifyController {
  constructor(private conf: ConfigService) {}

  @Get('bye')
  async getBye(): Promise<unknown> {
    const client = createAdminApiClient({
      storeDomain: this.conf.get('SHOPIFY_STORE_URL'),
      apiVersion: this.conf.get('SHOPIFY_API_VERSION'),
      accessToken: this.conf.get('SHOPIFY_ACCESS_TOKEN'),
    });

    const { data, errors, extensions } = await client.request(
      print(GetProductsDocument),
      {
        variables: {
          id: 'gid://shopify/Product/7608002183224',
        },
      },
    );
    console.log({ data, errors, extensions });

    return data;
  }

  @Get('hello')
  async getHello(): Promise<unknown> {
    const apiUrl = `${this.conf.get('SHOPIFY_STORE_URL')}/admin/api/${this.conf.get('SHOPIFY_API_VERSION')}/graphql.json`;

    const client = new GraphQLClient(apiUrl, {
      headers: {
        'X-Shopify-Access-Token': this.conf.get('SHOPIFY_ACCESS_TOKEN'),
      },
    });

    const sdk = getSdk(client);
    const { data, extensions, headers, errors } = await sdk.GetProducts();
    console.log({ data, extensions, headers, errors });

    return data;
  }
}
