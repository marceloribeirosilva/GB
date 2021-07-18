import { uuid } from 'uuidv4';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import IOrdersRepository from '../IOrdersRepository';
import IUpdateOrderDTO from '@modules/orders/dtos/IUpdateOrderDTO';

class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async create(data: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, { id: uuid() }, data);

    this.orders.push(order);    

    return order;
  }

  public async update(data: IUpdateOrderDTO): Promise<Order | undefined> {
    const findIndex = this.orders.findIndex(orderFind => orderFind.id === data.id);
    let order = new Order();
    
    if (findIndex !== -1) {      
      Object.assign(order, this.orders[findIndex]);            

      order.status = data.status;
      order.valor = data.valor
    }
    
    return order;
  }

  public async save(order: Order): Promise<Order> {
    const findIndex = this.orders.findIndex(orderFind => orderFind.id === order.id);

    this.orders[findIndex] = order;

    return order;
  }

  public async findById(id: number): Promise<Order | undefined> {
    const findIndex = this.orders.findIndex(orderFind => orderFind.id === id);
    let order = new Order();
    
    if (findIndex !== -1) {      
      Object.assign(order, this.orders[findIndex]);
    }
    
    return order;
  }
}

export default FakeOrdersRepository;