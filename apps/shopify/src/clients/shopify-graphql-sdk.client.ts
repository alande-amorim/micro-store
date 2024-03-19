import { ConfigService } from '@nestjs/config';
import { GraphQLClient } from 'graphql-request';
import { Sdk, getSdk } from '../graphql';

export const createShopifyGraphqlSdkClient = (conf: ConfigService): Sdk => {
  const apiUrl = `${conf.get('SHOPIFY_STORE_URL')}/admin/api/${conf.get('SHOPIFY_API_VERSION')}/graphql.json`;

  const gqlClient = new GraphQLClient(apiUrl, {
    headers: {
      'X-Shopify-Access-Token': conf.get('SHOPIFY_ACCESS_TOKEN'),
    },
  });

  return getSdk(gqlClient);
};
