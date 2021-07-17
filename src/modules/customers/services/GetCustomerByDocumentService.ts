import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Customer from '../infra/mysql2/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  document: string;
}

@injectable()
class GetCustomerByDocumentService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ document }: IRequest): Promise<Customer | undefined> {
    try {
      const client = await this.customersRepository.getCustomerByDocument(
        document.replace(/[^\d]+/g, ''),
      );

      return client;
    } catch {
      throw new AppError('Error fetching client', 500);
    }
  }
}
export default GetCustomerByDocumentService;
