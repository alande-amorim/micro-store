import { Product as GraphProduct } from '../graphql';
import { flatProduct } from './flatten-product';

describe('Shopify product flatten', () => {
  it('Should flatten a product from query product', () => {
    const data = {
      id: 'gid://shopify/Product/7739358740665',
      title: 'My product',
      handle: 'my-product-2',
      description: 'My product description',
      publishedAt: null,
      updatedAt: '2024-03-19T18:43:26Z',
      createdAt: '2024-03-19T18:43:25Z',
      variants: {
        nodes: [
          {
            id: 'gid://shopify/ProductVariant/43793618239673',
            price: '10.00',
            sku: 'SKU123',
          },
        ],
      },
    };

    expect(flatProduct(data as GraphProduct)).toEqual({
      productId: 'gid://shopify/Product/7739358740665',
      variantId: 'gid://shopify/ProductVariant/43793618239673',
      title: 'My product',
      handle: 'my-product-2',
      description: 'My product description',
      price: '10.00',
      sku: 'SKU123',
    });
  });
});
