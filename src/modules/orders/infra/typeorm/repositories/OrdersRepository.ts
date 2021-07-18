import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';
import IUpdateOrderDTO from '@modules/orders/dtos/IUpdateOrderDTO';

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

  public async update(data: IUpdateOrderDTO): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(data.id);

    if (order) {
      order.valor = data.valor;
      order.status = data.status;

      await this.ormRepository.save(order);
    }

    return order;
  }

  public async save(order: Order): Promise<Order> {
    const savedOrder = await this.ormRepository.save(order);

    return savedOrder;
  }

  public async findById(id: number): Promise<Order | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async delete(id: number): Promise<void> {
    const order = await this.ormRepository.findOne(id);

    if (order) {
      await this.ormRepository.remove(order);
    }
  }
}

export default OrdersRepository;
