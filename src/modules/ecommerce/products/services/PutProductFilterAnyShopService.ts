import AnyShopV3 from '@shared/services/AnyShopV3';
import IProdutoFilterAnyShop from '../infra/http/entities/interfaces/IProdutoFilterAnyShop';
import IResponseAnyShop from '../infra/http/entities/interfaces/IResponseAnyShop';

export default class PutProductFilterAnyShopService {
  public async execute(
    productsRequest: IProdutoFilterAnyShop[],
  ): Promise<IResponseAnyShop> {
    const response = await AnyShopV3.put<IResponseAnyShop>(
      'produtos/editar',
      productsRequest,
    );

    return response.data;
  }
}
