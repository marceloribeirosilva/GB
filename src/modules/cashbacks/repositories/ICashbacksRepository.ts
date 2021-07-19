import Cashback from '../infra/typeorm/entities/Cashback';
import ICreateCashbackDTO from '../dtos/ICreateCashbackDTO';

export default interface ICashbacksRepository {
  create(data: ICreateCashbackDTO): Promise<Cashback>;
  save(cashback: Cashback): Promise<Cashback>;
}
