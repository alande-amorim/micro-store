import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://hubii-case.myshopify.com/admin/api/2024-01/graphql.json': {
        headers: {
          'X-Shopify-Access-Token': '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',
        },
      },
    },
  ],
  documents: [
    'apps/shopify/src/graphql/queries/**/*.graphql',
    'apps/shopify/src/graphql/mutations/**/*.graphql',
  ],
  generates: {
    'apps/shopify/src/graphql/generated/sdk.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        rawRequest: true,
      },
    },
  },
};

export default config;
