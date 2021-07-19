import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowOrdersByCpf from '@modules/orders/services/ShowOrdersByCpf';
import IResponseShowOrdersByCpf from '@modules/reports/dtos/IResponseShowOrdersByCpf';

export default class ReportsController {
  public async showOrders(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;

    const showOrdersCpf = container.resolve(ShowOrdersByCpf);

    const orders = await showOrdersCpf.execute(cpf);

    const formattedOrders: IResponseShowOrdersByCpf[] = [];
    
    for (let order of orders) {
      const formattedOrder: IResponseShowOrdersByCpf = {
        codigo: order.id,
        data: order.created_at.toString(),
        valor: order.valor,
        "%_cashback": order.cashback.percentual * 100,
        $_cashback: order.cashback.valor,
        status: order.status
      }

      formattedOrders.push(formattedOrder);
    }


    return response.json(formattedOrders);
  }
}
