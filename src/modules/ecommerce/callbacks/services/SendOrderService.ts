import { injectable, inject } from 'tsyringe';
import IOrderAutcomPayload from '@modules/ecommerce/callbacks/providers/OrderProvider/dtos/IOrderAutcomPayload';
import IOrderProvider from '@modules/ecommerce/callbacks/providers/OrderProvider/interface/IOrderProvider';

@injectable()
class SendOrderService {
  constructor(
    @inject('OrderProvider')
    private orderProvider: IOrderProvider,
  ) {}

  public async execute(payload: IOrderAutcomPayload): Promise<string> {
    if (!payload) return '';

    const response = await this.orderProvider.postOrder(payload);

    return response;
  }
}

export default SendOrderService;
