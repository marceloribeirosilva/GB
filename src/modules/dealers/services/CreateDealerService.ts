import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IDealersRepository from '../repositories/IDealersRepository';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import Dealer from '../infra/typeorm/entities/Dealer';
import FormatCpf from '@shared/services/FormatCpf';

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
    if (!name) throw new AppError('Name field is empty');

    if (!cpf) throw new AppError('CPF field is empty');

    if (!email) throw new AppError('E-mail field is empty');

    if (!password) throw new AppError('Password field is empty');

    const checkDealerExists_email = await this.dealersRepository.findByEmail(email);

    if (checkDealerExists_email) {
      throw new AppError('Email address already used');
    }

    const modifiedCpf = FormatCpf.RemoveDotsAndDash(cpf);
    const checkDealerExists_cpf = await this.dealersRepository.findByCpf(modifiedCpf);

    if (checkDealerExists_cpf) {
      throw new AppError('Cpf already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const dealer = await this.dealersRepository.create({
      name,
      cpf: modifiedCpf,
      email,
      password: hashedPassword,
    });

    return dealer;
  }
}

export default CreateDealerService;
