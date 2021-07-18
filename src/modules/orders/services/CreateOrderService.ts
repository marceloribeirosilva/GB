import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../repositories/IOrdersRepository';
import IDealersRepository from '@modules/dealers/repositories/IDealersRepository';
import Order from '../infra/typeorm/entities/Order';
import OrderStatus from '../enums/OrderStatus';

interface IRequest {
  cpf: string;
  valor: number;
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('DealersRepository')
    private dealersRepository: IDealersRepository,
  ) {}

  public async execute({ cpf, valor }: IRequest): Promise<Order> {
    if (!cpf) throw new AppError('CPF field is empty');

    const dealer = await this.dealersRepository.findByCpf(cpf);

    if (!dealer) throw new AppError('Dealer not found');

    let status = OrderStatus.InValidation;
    if (cpf === '153.509.460-56') status = OrderStatus.approved; 

    const order = await this.ordersRepository.create({
      cpf,
      valor,
      status
    });

    return order;
  }
}

export default CreateOrderService;
