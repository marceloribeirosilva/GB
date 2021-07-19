import { uuid } from 'uuidv4';

import Cashback from '@modules/cashbacks/infra/typeorm/entities/Cashback';
import ICreateCashbackDTO from '@modules/cashbacks/dtos/ICreateCashbackDTO';
import ICashbacksRepository from '../ICashbacksRepository';

class FakeCashbacksRepository implements ICashbacksRepository {
  private cashbacks: Cashback[] = [];

  public async create(data: ICreateCashbackDTO): Promise<Cashback> {
    const cashback = new Cashback();

    Object.assign(cashback, { id: uuid() }, data);

    this.cashbacks.push(cashback);    

    return cashback;
  }

  public async save(cashback: Cashback): Promise<Cashback> {
    const findIndex = this.cashbacks.findIndex(cashbackFind => cashbackFind.id === cashback.id);

    this.cashbacks[findIndex] = cashback;

    return cashback;
  }
}

export default FakeCashbacksRepository;