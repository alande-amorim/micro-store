import { Test, TestingModule } from '@nestjs/testing';
import { ShopifyController } from './shopify.controller';
import { ShopifyService } from './shopify.service';

describe('ShopifyController', () => {
  let shopifyController: ShopifyController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShopifyController],
      providers: [ShopifyService],
    }).compile();

    shopifyController = app.get<ShopifyController>(ShopifyController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shopifyController.getHello()).toBe('Hello World!');
    });
  });
});
