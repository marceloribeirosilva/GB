import { uuid } from 'uuidv4';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import IOrdersRepository from '../IOrdersRepository';

class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async create(data: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, { id: uuid() }, data);

    this.orders.push(order);

    return order;
  }

  public async save(order: Order): Promise<Order> {
    const findIndex = this.orders.findIndex(orderFind => orderFind.id === order.id);

    this.orders[findIndex] = order;

    return order;
  }
}

export default FakeOrdersRepository;