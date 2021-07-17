import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetAllOpenOrdersService from '@modules/orders/services/GetAllOpenOrdersService';
import GetOrderAutomotiveServicesService from '@modules/orders/services/GetOrderAutomotiveServicesService';
import GetOrderProductsService from '@modules/orders/services/GetOrderProductsService';
import GetOrderByIdService from '@modules/orders/services/GetOrderByIdService';

export default class OrdersController {
  public async getAllOpenOrders(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getAllOpenOrdersService = container.resolve(GetAllOpenOrdersService);
    const getOrderAutomotiveServicesService = container.resolve(
      GetOrderAutomotiveServicesService,
    );
    const getOrderProductsService = container.resolve(GetOrderProductsService);
    try {
      const result = await getAllOpenOrdersService.execute({ company: '001' });

      const orders = await Promise.all(
        result.map(async order => {
          const newOrder = order;

          const products = await getOrderProductsService.execute({
            company: '001',
            order: order.order,
          });

          const services = await getOrderAutomotiveServicesService.execute({
            company: '001',
            order: order.order,
          });

          newOrder.products = products;

          if (services) {
            newOrder.services = services;
          }

          return newOrder;
        }),
      );

      return response.json(orders);
    } catch (err) {
      return response.status(500).send(err);
    }
  }

  public async getOrderbyId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { numberOrder } = request.params;
    const getOrderByIdService = container.resolve(GetOrderByIdService);
    const getOrderAutomotiveServicesService = container.resolve(
      GetOrderAutomotiveServicesService,
    );
    const getOrderProductsService = container.resolve(GetOrderProductsService);

    try {
      const order = await getOrderByIdService.execute({
        company: '001',
        numberOrder,
      });

      if (order) {
        const products = await getOrderProductsService.execute({
          company: '001',
          order: order.order,
        });

        const services = await getOrderAutomotiveServicesService.execute({
          company: '001',
          order: order.order,
        });

        order.products = products;

        order.services = services;
      }

      return response.json(order);
    } catch (err) {
      return response.status(500).send(err);
    }
  }
}
