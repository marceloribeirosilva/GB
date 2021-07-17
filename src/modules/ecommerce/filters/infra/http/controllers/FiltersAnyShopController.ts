import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import PostFilterAnyShopService from '@modules/ecommerce/filters/services/PostFilterAnyShopService';
import CreateIntegrationLogsService from '@modules/ecommerce/logs/services/CreateIntegrationLogsService';
import CreateKeysService from '@modules/ecommerce/keys/services/CreateKeysService';
import IResponseAnyShop from '../entities/interfaces/IResponseAnyShop';

export default class FiltersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const [...body] = request.body;

    const postFilter = new PostFilterAnyShopService();

    const createIntegrationLogs = container.resolve(
      CreateIntegrationLogsService,
    );

    let responseAnyPOST: IResponseAnyShop = { erros: [], filtros: [] };

    if (body && body.length > 0) {
      try {
        responseAnyPOST = await postFilter.execute(body);
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(body),
          response: JSON.stringify(responseAnyPOST),
          method: 'postFilter',
        });
      } catch (err) {
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(body),
          response: JSON.stringify(err),
          method: 'postFilter - catch',
        });
        throw new AppError(err, 500);
      }

      if (responseAnyPOST) {
        const createKeys = container.resolve(CreateKeysService);

        if (responseAnyPOST.filtros) {
          responseAnyPOST.filtros.map(async filter => {
            await createKeys.execute({
              id_anyshop: filter.id || 0,
              id_autcom: filter.id_externo_24,
              source: 'filter',
            });
          });
        }
      }
    }

    return response.json({});
  }
}
