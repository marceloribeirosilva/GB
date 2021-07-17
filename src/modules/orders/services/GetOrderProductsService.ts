import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '@modules/orders/infra/mysql2/entities/Product';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  company: string;
  order: string;
}

@injectable()
class GetOrderProductsService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ company, order }: IRequest): Promise<Product> {
    try {
      const products = await this.ordersRepository.getOrderProducts(
        company,
        order,
      );

      return products;
    } catch {
      throw new AppError('Error fetching order products', 500);
    }
  }
}
export default GetOrderProductsService;
