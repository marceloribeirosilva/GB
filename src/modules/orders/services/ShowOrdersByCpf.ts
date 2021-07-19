import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';

@injectable()
class ShowOrdersByCpf {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,    
  ) {}

  public async execute(cpf: string): Promise<Order[]> {
    if (!cpf) throw new AppError('CPF field is empty');

    const orders = this.ordersRepository.findAllByCpf(cpf);

    return orders;
  }
}

export default ShowOrdersByCpf;
