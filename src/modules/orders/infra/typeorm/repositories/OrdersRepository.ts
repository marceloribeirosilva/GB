import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(data: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(data);

    await this.ormRepository.save(order);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    const savedOrder = await this.ormRepository.save(order);

    return savedOrder;
  }
}

export default OrdersRepository;
