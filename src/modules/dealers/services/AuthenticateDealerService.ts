import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import Dealer from '@modules/dealers/infra/typeorm/entities/Dealer';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IDealersRepository from '../repositories/IDealersRepository';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateDealerService {
  constructor(
    @inject('DealersRepository')
    private dealersRepository: IDealersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ dealer: Dealer; token: string }> {
    const dealer = await this.dealersRepository.findByEmail(email);

    if (!dealer) {
      throw new AppError('Incorrect email or password', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      dealer.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      expiresIn,
    });

    return { dealer, token };
  }
}

export default AuthenticateDealerService;
