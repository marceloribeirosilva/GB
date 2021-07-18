import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import OrderStatus from '../enums/OrderStatus';

interface IRequest {
  id: number;
  valor: number;
  status: string;
}

@injectable()
class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  public async execute({ id, valor, status }: IRequest): Promise<Order | undefined> {  
    const savedOrder = await this.ordersRepository.findById(id);    

    if (!savedOrder || !Object.keys(savedOrder).length) throw new AppError('Order not found');

    if (savedOrder.status === OrderStatus.approved) {
      throw new AppError('Order is already approved');
    }
    
    const order = await this.ordersRepository.update({
      id,
      valor,
      status
    });

    return order;
  }
}

export default UpdateOrderService;
