import { uuid } from 'uuidv4';

import Dealer from '@modules/dealers/infra/typeorm/entities/Dealer';
import ICreateDealerDTO from '@modules/dealers/dtos/ICreateDealerDTO';
import IDealersRepository from '../IDealersRepository';

class FakeDealersRepository implements IDealersRepository {
  private dealers: Dealer[] = [];

  public async create(data: ICreateDealerDTO): Promise<Dealer> {
    const dealer = new Dealer();

    Object.assign(dealer, { id: uuid() }, data);

    this.dealers.push(dealer);

    return dealer;
  }

  public async findByEmail(email: string): Promise<Dealer | undefined> {
    const dealer = this.dealers.find(dealerFind => dealerFind.email === email);

    return dealer;
  }

  public async findByCpf(cpf: string): Promise<Dealer | undefined> {
    const dealer = this.dealers.find(dealerFind => dealerFind.cpf === cpf);

    return dealer;
  }

  public async findByID(id: number): Promise<Dealer | undefined> {
    const dealer = this.dealers.find(dealerFind => dealerFind.id === id);

    return dealer;
  }

  public async save(dealer: Dealer): Promise<Dealer> {
    const findIndex = this.dealers.findIndex(dealerFind => dealerFind.id === dealer.id);

    this.dealers[findIndex] = dealer;

    return dealer;
  }
}

export default FakeDealersRepository;