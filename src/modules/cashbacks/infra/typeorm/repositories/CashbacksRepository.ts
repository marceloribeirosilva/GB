import { getRepository, Repository } from 'typeorm';

import ICashbacksRepository from '@modules/cashbacks/repositories/ICashbacksRepository';
import ICreateCashbackDTO from '@modules/cashbacks/dtos/ICreateCashbackDTO';
import Cashback from '../entities/Cashback';

class CashbacksRepository implements ICashbacksRepository {
  private ormRepository: Repository<Cashback>;

  constructor() {
    this.ormRepository = getRepository(Cashback);
  }

  public async create(data: ICreateCashbackDTO): Promise<Cashback> {
    const cashback = this.ormRepository.create(data);

    await this.ormRepository.save(cashback);

    return cashback;
  }

  public async save(cashback: Cashback): Promise<Cashback> {
    const savedCashback = await this.ormRepository.save(cashback);

    return savedCashback;
  }
}

export default CashbacksRepository;
