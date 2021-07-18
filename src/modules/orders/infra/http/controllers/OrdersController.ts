import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, valor } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      cpf,
      valor,
    });

    return response.status(201).json(order);
  }
}
