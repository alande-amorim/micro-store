import { Product } from '@app/common';
import { Product as GraphProduct } from '../graphql';

export function flatProduct(product: GraphProduct): Product.External {
  return {
    productId: product.id,
    variantId: product.variants.nodes[0].id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    price: product.variants.nodes[0].price,
    sku: product.variants.nodes[0].sku,
  };
}
