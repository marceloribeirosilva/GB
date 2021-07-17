import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GetCustomerByDocumentService from '@modules/customers/services/GetCustomerByDocumentService';
import GetOrdersService from '@modules/customers/services/GetOrdersService';
import GetOrderAutomotiveServicesService from '@modules/orders/services/GetOrderAutomotiveServicesService';
import GetOrderProductsService from '@modules/orders/services/GetOrderProductsService';

export default class CustomersController {
  public async getCustomerByDocument(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getCustomerByDocumentService = container.resolve(
      GetCustomerByDocumentService,
    );
    const { document } = request.params;
    try {
      const result = await getCustomerByDocumentService.execute({ document });

      return response.json(result);
    } catch (err) {
      return response.status(500).send(err);
    }
  }

  public async getOrdersByCustomer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { customerCode } = request.params;
    const getOrdersService = container.resolve(GetOrdersService);
    const getOrderAutomotiveServicesService = container.resolve(
      GetOrderAutomotiveServicesService,
    );
    const getOrderProductsService = container.resolve(GetOrderProductsService);
    try {
      const result = await getOrdersService.execute({
        company: '001',
        customer_code: customerCode,
      });

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
}
