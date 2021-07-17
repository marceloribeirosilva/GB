import { getRepository, Repository } from 'typeorm';

import IOrderKeysRepository from '@modules/ecommerce/orderKeys/repositories/IOrderKeysRepository';
import ICreateOrderKeysDTO from '@modules/ecommerce/orderKeys/dtos/ICreateOrderKeysDTO';
import OrderKeys from '../entities/OrderKeys';

class OrderKeysRepository implements IOrderKeysRepository {
  private ormRepository: Repository<OrderKeys>;

  constructor() {
    this.ormRepository = getRepository(OrderKeys);
  }

  public async create(data: ICreateOrderKeysDTO): Promise<OrderKeys> {
    const keys = this.ormRepository.create(data);

    await this.ormRepository.save(keys);

    return keys;
  }

  public async save(key: OrderKeys): Promise<OrderKeys> {
    const savedKeys = await this.ormRepository.save(key);

    return savedKeys;
  }

  public async delete(key: OrderKeys): Promise<void> {
    await this.ormRepository.delete(key);
  }

  public async findByIdAutcom(
    id_autcom: string,
  ): Promise<OrderKeys | undefined> {
    const findKeys = await this.ormRepository.findOne({
      where: {
        id_autcom,
      },
    });

    return findKeys;
  }

  public async findByIdAnyshop(
    id_anyshop: number,
  ): Promise<OrderKeys | undefined> {
    const findKeys = await this.ormRepository.findOne({
      where: {
        id_anyshop,
      },
    });

    return findKeys;
  }
}

export default OrderKeysRepository;
