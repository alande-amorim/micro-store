import { Inject, Injectable } from '@nestjs/common';
import { Sdk } from '../graphql';

@Injectable()
export class GraphqlOrdersRepository {
  constructor(@Inject('SHOPIFY_GRAPHQL_SDK') private sdk: Sdk) {}
}
