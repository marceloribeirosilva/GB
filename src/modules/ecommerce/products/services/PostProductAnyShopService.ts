import AnyShopV3 from '@shared/services/AnyShopV3';
import IProdutoAnyShop from '../infra/http/entities/interfaces/IProdutoAnyShop';
import IResponseAnyShop from '../infra/http/entities/interfaces/IResponseAnyShop';

export default class PostProductAnyShopService {
  public async execute(
    productsRequest: IProdutoAnyShop[],
  ): Promise<IResponseAnyShop> {
    const response = await AnyShopV3.post<IResponseAnyShop>(
      'produtos/cadastrar',
      productsRequest,
    );

    return response.data;
  }
}
