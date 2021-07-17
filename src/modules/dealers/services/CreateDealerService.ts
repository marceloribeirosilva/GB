import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IDealersRepository from '../repositories/IDealersRepository';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import Dealer from '../infra/typeorm/entities/Dealer';

interface IRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

@injectable()
class CreateDealerService {
  constructor(
    @inject('DealersRepository')
    private dealersRepository: IDealersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, cpf, email, password }: IRequest): Promise<Dealer> {
    const checkDealerExists = await this.dealersRepository.findByEmail(email);

    if (checkDealerExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const dealer = await this.dealersRepository.create({
      name,
      cpf,
      email,
      password: hashedPassword,
    });

    return dealer;
  }
}

export default CreateDealerService;
