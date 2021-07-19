import { injectable, inject, container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../repositories/IOrdersRepository';
import IDealersRepository from '@modules/dealers/repositories/IDealersRepository';
import ICashbacksRepository from '@modules/cashbacks/repositories/ICashbacksRepository';
import OrderStatus from '../enums/OrderStatus';
import CreateCashbackService from '@modules/cashbacks/services/CreateCashbackService';
import IResponseOrderDTO from '../dtos/IResponseOrderDTO';

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

    @inject('CashbacksRepository')
    private cashbacksRepository: ICashbacksRepository,
  ) {}

  public async execute({ cpf, valor }: IRequest): Promise<IResponseOrderDTO> {
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

    const cashbackService = new CreateCashbackService(this.cashbacksRepository);

    const cashback = await cashbackService.execute(order);    

    return {
      order,
      cashback: {
        valor: cashback.valor,
        percentual: cashback.percentual * 100
      }
    };
  }
}

export default CreateOrderService;
