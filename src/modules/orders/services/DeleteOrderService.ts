import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../repositories/IOrdersRepository';
import OrderStatus from '../enums/OrderStatus';

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  public async execute(id: number): Promise<void> {  
    const savedOrder = await this.ordersRepository.findById(id);    

    if (!savedOrder || !Object.keys(savedOrder).length) throw new AppError('Order not found');

    if (savedOrder.status === OrderStatus.approved) {
      throw new AppError('Order is already approved');
    }
    
    await this.ordersRepository.delete(savedOrder.id);
  }
}

export default DeleteOrderService;
