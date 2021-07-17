import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Order from '@modules/orders/infra/mysql2/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

interface IRequest {
  company: string;
  customer_code: string;
}

@injectable()
class GetCustomerByDocumentService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ company, customer_code }: IRequest): Promise<Order[]> {
    try {
      const orders = await this.ordersRepository.getOrdersByCustomer(
        company,
        customer_code,
      );

      return orders;
    } catch {
      throw new AppError('Error fetching client', 500);
    }
  }
}
export default GetCustomerByDocumentService;
