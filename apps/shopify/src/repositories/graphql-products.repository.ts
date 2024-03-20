import { Product } from '@app/common';
import { ProductsRepositoryInterface } from './interfaces/products-repository.interface';
import { flatProduct } from '../utils/flatten-product';
import { Inject, Injectable } from '@nestjs/common';
import { Sdk, Product as GraphProduct } from '../graphql';

@Injectable()
export class GraphqlProductsRepository implements ProductsRepositoryInterface {
  constructor(@Inject('SHOPIFY_GRAPHQL_SDK') private sdk: Sdk) {}

  async list(): Promise<Product.External[]> {
    const { data } = await this.sdk.GetProducts();
    return data.products.nodes.map(flatProduct);
  }

  async get(ourProduct: Product.Entity): Promise<Product.External> {
    console.log(ourProduct);
    const {
      data: { product },
    } = await this.sdk.GetProductById({
      id: ourProduct.externalId,
    });

    return product ? flatProduct(product as GraphProduct) : null;
  }

  async create(ourProduct: Product.Entity): Promise<Product.External> {
    const {
      data: { productCreate },
    } = await this.sdk.ProductCreate({
      input: {
        title: ourProduct.name,
        handle: ourProduct.slug,
        descriptionHtml: ourProduct.description,
        // @ts-expect-error - note to reviewer: variants field will be deprecated as of version 2024-04 hence it's not exported by codegen gql schema introspection.
        variants: [
          {
            price: ourProduct.price,
            sku: ourProduct.sku,
          },
        ],
      },
    });

    const product = productCreate.product as GraphProduct;
    return product ? flatProduct(product) : null;
  }

  async update(ourProduct: Product.Entity): Promise<Product.External> {
    const matchingProduct = await this.get(ourProduct);
    console.log(matchingProduct);

    const {
      data: { productCreate },
    } = await this.sdk.ProductUpdate({
      id: ourProduct.id,
      input: {
        id: matchingProduct.productId,
        title: ourProduct.name,
        handle: ourProduct.slug,
        descriptionHtml: ourProduct.description,
        // @ts-expect-error - same as above
        variants: [
          {
            id: matchingProduct.variantId,
            price: ourProduct.price,
            sku: ourProduct.sku,
          },
        ],
      },
    });

    const product = productCreate.product as GraphProduct;
    return product ? flatProduct(product) : null;
  }

  async delete(ourProduct: Product.Entity): Promise<string> {
    const matchingProduct = await this.get(ourProduct);

    const {
      data: { productDelete },
    } = await this.sdk.ProductDelete({
      input: { id: matchingProduct.productId },
    });
    return productDelete.deletedProductId;
  }
}
