# Store Microservices NestJS

## Tech
- NodeJS
- Typescript
- NestJS monorepo
- PostgreSQL
- Prisma
- RabbitMQ
- Docker

## Setting up
From the project root run:
```bash
% cp .env.example .env # 👈 customize accordingly
```

You need to provide the following screts:
```dotenv
SENTRY_DSN=https://SUBDOMAIN@o350869.ingest.us.sentry.io/PROJECT_KEY
SHOPIFY_ACCESS_TOKEN=shpat_ACCESSTOKEN
SHOPIFY_STORE_URL=https://STOREURL.myshopify.com
```

## Running
From the project root run:
```bash
% docker compose up
```

## Postman collection
Postman collection is provided: `./docs/postman_collection-v1.0.json`

## Services

1. Auth service (swagger: http://localhost:3000/api)
2. Products service (swagger: http://localhost:3001/api)
3. Orders service (swagger: http://localhost:3002/api)
4. Shopify service (swagger: http://localhost:3003/api)

## Known issues
 - no tests
 - there are a few untreated RPC timeouts between services
 - there is no Shopify GraphQL create order mutation
 - the staging Shopify store currently does not allow for order checkout
 - the only way to test the order synchronization is by manually trigging it's endpoint with the appropriate payload (ex: `% sh ./docs/webhook-example.sh`)
 - forgot to format a nice error response on webhook fail (it still responds 500 so Shopify can monitor)