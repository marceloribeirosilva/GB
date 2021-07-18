import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import IUpdateOrderDTO from '../dtos/IUpdateOrderDTO';

export default interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  update(data: IUpdateOrderDTO): Promise<Order | undefined>;
  save(order: Order): Promise<Order>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Order | undefined>;
}
