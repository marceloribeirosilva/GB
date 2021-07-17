import AnyShopV3 from '@shared/services/AnyShopV3';
import AppError from '@shared/errors/AppError';
import ClientAnyShop from '../infra/http/entities/ClientAnyShop';

export default class AddCustomerCodeInClientAnyShopService {
  public async execute(
    idAnyShop: number,
    customerCode: string,
  ): Promise<ClientAnyShop> {
    try {
      const data = [
        {
          id: idAnyShop,
          id_externo_24: customerCode,
        },
      ];
      const clientAnyShop = await AnyShopV3.put<ClientAnyShop>(
        '/clientes/editar',
        data,
      );

      return clientAnyShop.data;
    } catch {
      throw new AppError('AnyShop api error', 500);
    }
  }
}
