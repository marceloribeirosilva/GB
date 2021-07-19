import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICashbacksRepository from '../repositories/ICashbacksRepository';
import Cashback from '../infra/typeorm/entities/Cashback';
import Order from '@modules/orders/infra/typeorm/entities/Order';

@injectable()
class CreateCashbackService {
  constructor(
    @inject('CashbacksRepository')
    private cashbacksRepository: ICashbacksRepository
  ) {}

  public async execute(order: Order): Promise<Cashback> {
    if (!order || !Object.keys(order).length) throw new AppError('Order not found');

    let valor = 0;
    let percentual = 0;

    if (order.valor > 0 && order.valor <= 1000) {
        percentual = 10/100;        
    } else if (order.valor > 1000 && order.valor <= 1500) {
        percentual = 15/100;
    } else {
        percentual = 20/100;
    }

    valor = order.valor * percentual;

    const cashback = await this.cashbacksRepository.create({
        percentual,
        valor,
        order
    });

    return cashback;
  }
}

export default CreateCashbackService;
