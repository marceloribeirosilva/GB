import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import AutomotiveService from '@modules/orders/infra/mysql2/entities/AutomotiveService';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  company: string;
  order: string;
}

@injectable()
class GetOrderAutomotiveServicesService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    company,
    order,
  }: IRequest): Promise<AutomotiveService> {
    try {
      const services = await this.ordersRepository.getOrderAutomotiveServices(
        company,
        order,
      );

      return services;
    } catch {
      throw new AppError('Error fetching order products', 500);
    }
  }
}
export default GetOrderAutomotiveServicesService;
