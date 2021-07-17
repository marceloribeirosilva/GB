import AnyShopV3 from '@shared/services/AnyShopV3';
import IProdutoPriceStockAnyShop from '../infra/http/entities/interfaces/IProdutoPriceStockAnyShop';
import IResponseAnyShop from '../infra/http/entities/interfaces/IResponseAnyShop';

export default class PutProductPriceAnyShopService {
  public async execute(
    productsRequest: IProdutoPriceStockAnyShop[],
  ): Promise<IResponseAnyShop> {
    const response = await AnyShopV3.put<IResponseAnyShop>(
      'produtos/editar',
      productsRequest,
    );

    return response.data;
  }
}
