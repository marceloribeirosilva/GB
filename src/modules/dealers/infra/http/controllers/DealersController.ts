import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateDealerService from '@modules/dealers/services/CreateDealerService';

export default class DealersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password } = request.body;

    const createDealer = container.resolve(CreateDealerService);

    const dealer = await createDealer.execute({
      name,
      cpf,
      email,
      password,
    });

    return response.json(classToClass(dealer));
  }
}
