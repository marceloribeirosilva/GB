import AnyShopV3 from '@shared/services/AnyShopV3';
import IFilterAnyShop from '../infra/http/entities/interfaces/IFilterAnyShop';
import IResponseAnyShop from '../infra/http/entities/interfaces/IResponseAnyShop';

export default class PostFilterAnyShopService {
  public async execute(
    filtersRequest: IFilterAnyShop[],
  ): Promise<IResponseAnyShop> {
    const response = await AnyShopV3.post<IResponseAnyShop>(
      'filtros-correlacionados/cadastrar',
      filtersRequest,
    );

    return response.data;
  }
}
