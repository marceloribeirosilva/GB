import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Order from '@modules/orders/infra/mysql2/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  company: string;
  numberOrder: string;
}

@injectable()
class GetOrderByIdService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    company,
    numberOrder,
  }: IRequest): Promise<Order | undefined> {
    try {
      const order = await this.ordersRepository.getOrderById(
        company,
        numberOrder,
      );

      return order;
    } catch (err) {
      throw new AppError(`Error fetching order - ${err}`, 500);
    }
  }
}
export default GetOrderByIdService;
