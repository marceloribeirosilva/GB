import AnyShopV3 from '@shared/services/AnyShopV3';
import IResponseAnyShopStock from '../infra/http/entities/interfaces/IResponseAnyShopStock';

export default class GetProductAnyShopService {
  public async execute(page: string): Promise<IResponseAnyShopStock> {
    const response = await AnyShopV3.get<IResponseAnyShopStock>(
      `produtos/estoques/${page}`,
    );

    return response.data;
  }
}
