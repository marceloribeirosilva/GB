// index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetKeysByIDAutcomService from '@modules/ecommerce/keys/services/GetKeysByIDAutcomService';
import GetListKeysService from '@modules/ecommerce/keys/services/GetListKeysService';

export default class KeysByIDAutcomController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id, source } = request.params;
    const getKeysById = container.resolve(GetKeysByIDAutcomService);

    const keys = await getKeysById.execute({ id_autcom: id, source });

    return response.json(keys);
  }

  public async showList(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { source } = request.params;
    const getList = container.resolve(GetListKeysService);

    const list = await getList.execute({ source });

    return response.json(list);
  }
}
