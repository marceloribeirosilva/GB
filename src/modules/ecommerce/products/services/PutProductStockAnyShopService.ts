import AnyShopV3 from '@shared/services/AnyShopV3';
import IProdutoStockAnyShop from '../infra/http/entities/interfaces/IProdutoStockAnyShop';
import IResponseAnyShop from '../infra/http/entities/interfaces/IResponseAnyShop';

export default class PutProductStockAnyShopService {
  public async execute(
    productsRequest: IProdutoStockAnyShop[],
  ): Promise<IResponseAnyShop> {
    const response = await AnyShopV3.put<IResponseAnyShop>(
      'produtos/editar',
      productsRequest,
    );

    return response.data;
  }
}
