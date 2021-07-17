// index, show, create, update, delete
import { Request, Response } from 'express';

import AddCustomerCodeInClientAnyShopService from '@modules/ecommerce/clients/services/AddCustomerCodeInClientAnyShopService';

export default class ClientsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { customerCode } = request.body;
    const { idAnyShop } = request.params;
    const addCustomerCodeService = new AddCustomerCodeInClientAnyShopService();

    const client = await addCustomerCodeService.execute(
      Number(idAnyShop),
      customerCode,
    );

    return response.json(client);
  }
}
