import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '@modules/orders/infra/mysql2/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  company: string;
}

@injectable()
class GetAllOpenOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ company }: IRequest): Promise<Order[]> {
    try {
      const orders = await this.ordersRepository.getAllOpenOrders(company);

      return orders;
    } catch {
      throw new AppError('Error fetching open orders', 500);
    }
  }
}
export default GetAllOpenOrdersService;
