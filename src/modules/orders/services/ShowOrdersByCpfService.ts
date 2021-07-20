import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';
import FormatCpf from '@shared/services/FormatCpf';

@injectable()
class ShowOrdersByCpfService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,    
  ) {}

  public async execute(cpf: string): Promise<Order[]> {
    if (!cpf) throw new AppError('CPF field is empty');

    const modifiedCpf = FormatCpf.RemoveDotsAndDash(cpf);
    const orders = this.ordersRepository.findAllByCpf(modifiedCpf);    

    return orders;
  }
}

export default ShowOrdersByCpfService;
