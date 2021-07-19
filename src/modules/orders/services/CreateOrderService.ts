import { injectable, inject, container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IOrdersRepository from '../repositories/IOrdersRepository';
import IDealersRepository from '@modules/dealers/repositories/IDealersRepository';
import ICashbacksRepository from '@modules/cashbacks/repositories/ICashbacksRepository';
import OrderStatus from '../enums/OrderStatus';
import CreateCashbackService from '@modules/cashbacks/services/CreateCashbackService';
import IResponseOrderDTO from '../dtos/IResponseOrderDTO';
import FormatCpf from '@shared/services/FormatCpf';

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

    const modifiedCpf = FormatCpf.RemoveDotsAndDash(cpf);
    const dealer = await this.dealersRepository.findByCpf(modifiedCpf);

    if (!dealer) throw new AppError('Dealer not found');

    let status = OrderStatus.InValidation;
    if (modifiedCpf === '15350946056') status = OrderStatus.approved; 

    const order = await this.ordersRepository.create({
      cpf: modifiedCpf,
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
