import { injectable, inject } from 'tsyringe';
import IOrderProvider from '../providers/OrderProvider/interface/IOrderProvider';

@injectable()
class SendReleasePaymentService {
  constructor(
    @inject('OrderProvider')
    private orderProvider: IOrderProvider,
  ) {}

  public async execute(order: string): Promise<void> {
    if (!order) return;

    this.orderProvider.putReleasePayment(order);
  }
}

export default SendReleasePaymentService;
