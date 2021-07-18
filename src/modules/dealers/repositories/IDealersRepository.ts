import Dealer from '../infra/typeorm/entities/Dealer';
import ICreateDealerDTO from '../dtos/ICreateDealerDTO';

export default interface IDealersRepository {
  create(data: ICreateDealerDTO): Promise<Dealer>;
  findByEmail(email: string): Promise<Dealer | undefined>;
  findByCpf(cpf: string): Promise<Dealer | undefined>;
  findByID(id: string): Promise<Dealer | undefined>;
  save(user: Dealer): Promise<Dealer>;
}
