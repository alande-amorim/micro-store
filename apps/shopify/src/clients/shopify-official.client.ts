import { ConfigService } from '@nestjs/config';
import { createAdminApiClient } from '@shopify/admin-api-client';

export const createShopifyOfficialClient = (conf: ConfigService) => {
  return createAdminApiClient({
    storeDomain: conf.get('SHOPIFY_STORE_URL'),
    apiVersion: conf.get('SHOPIFY_API_VERSION'),
    accessToken: conf.get('SHOPIFY_ACCESS_TOKEN'),
  });
};
