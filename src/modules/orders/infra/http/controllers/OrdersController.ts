import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { valor, status } = request.body;

    const updateOrder = container.resolve(UpdateOrderService);

    const order = await updateOrder.execute({
      id: parseInt(id, 10),
      valor,
      status
    });

    return response.json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;    

    const deleteOrder = container.resolve(DeleteOrderService);

    await deleteOrder.execute(parseInt(id,10));

    return response.status(204).json();
  }
}
