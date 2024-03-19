running the service:

```bash
% cp ./apps/shopify/.env.example ./apps/shopify/.env 
% npm install && npm run codegen
% npx dotenv -e ./apps/shopify/.env npm run start:dev shopify
```