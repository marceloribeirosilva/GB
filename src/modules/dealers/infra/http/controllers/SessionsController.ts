// index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateDealerService from '@modules/dealers/services/AuthenticateDealerService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateDealer = container.resolve(AuthenticateDealerService);

    const { dealer, token } = await authenticateDealer.execute({ email, password });

    return response.json({ dealer: classToClass(dealer), token });
  }
}
