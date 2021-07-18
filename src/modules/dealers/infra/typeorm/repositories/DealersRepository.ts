import { getRepository, Repository } from 'typeorm';

import IDealersRepository from '@modules/dealers/repositories/IDealersRepository';
import ICreateDealerDTO from '@modules/dealers/dtos/ICreateDealerDTO';
import Dealer from '../entities/Dealer';

class DealersRepository implements IDealersRepository {
  private ormRepository: Repository<Dealer>;

  constructor() {
    this.ormRepository = getRepository(Dealer);
  }

  public async create(data: ICreateDealerDTO): Promise<Dealer> {
    const dealer = this.ormRepository.create(data);

    await this.ormRepository.save(dealer);

    return dealer;
  }

  public async findByEmail(email: string): Promise<Dealer | undefined> {
    const dealer = await this.ormRepository.findOne({
      where: { email },
    });

    return dealer;
  }

  public async findByCpf(cpf: string): Promise<Dealer | undefined> {
    const dealer = await this.ormRepository.findOne({
      where: { cpf },
    });

    return dealer;
  }

  public async findByID(id: string): Promise<Dealer | undefined> {
    const dealer = await this.ormRepository.findOne(id);

    return dealer;
  }

  public async save(dealer: Dealer): Promise<Dealer> {
    const savedDealer = await this.ormRepository.save(dealer);

    return savedDealer;
  }
}

export default DealersRepository;
