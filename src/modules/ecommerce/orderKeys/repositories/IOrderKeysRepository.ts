import OrderKeys from '../infra/typeorm/entities/OrderKeys';
import ICreateOrderKeysDTO from '../dtos/ICreateOrderKeysDTO';

export default interface IOrderkeysRepository {
  create(data: ICreateOrderKeysDTO): Promise<OrderKeys>;
  save(keys: OrderKeys): Promise<OrderKeys>;
  delete(keys: OrderKeys): Promise<void>;
  findByIdAutcom(id_autcom: string): Promise<OrderKeys | undefined>;
  findByIdAnyshop(id_anyshop: number): Promise<OrderKeys | undefined>;
}
