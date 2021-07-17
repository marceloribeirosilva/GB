import AnyShopV3 from '@shared/services/AnyShopV3';
import IProdutoAnyShop from '../infra/http/entities/interfaces/IProdutoAnyShop';
import IResponseAnyShop from '../infra/http/entities/interfaces/IResponseAnyShop';

export default class PutProductAnyShopService {
  public async execute(
    productsRequest: IProdutoAnyShop[],
  ): Promise<IResponseAnyShop> {
    const response = await AnyShopV3.put<IResponseAnyShop>(
      'produtos/editar',
      productsRequest,
    );

    return response.data;
  }
}
