import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ShippingAddresses from '../infra/mysql2/entities/ShippingAddresses';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  code: string;
}

@injectable()
class GetShippingAddressesByCodeService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ code }: IRequest): Promise<ShippingAddresses[] | []> {
    try {
      const addresses = await this.customersRepository.getShippingAdressesByCode(
        code,
      );

      return addresses;
    } catch {
      throw new AppError('Error fetching addresses client', 500);
    }
  }
}
export default GetShippingAddressesByCodeService;
