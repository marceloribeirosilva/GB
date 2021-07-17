import { injectable, inject } from 'tsyringe';
import IAdvancePayment from '../providers/OrderProvider/dtos/IAdvancePayment';
import IOrderProvider from '../providers/OrderProvider/interface/IOrderProvider';

@injectable()
class SendAdvancePaymentService {
  constructor(
    @inject('OrderProvider')
    private orderProvider: IOrderProvider,
  ) {}

  public async execute(payload: IAdvancePayment): Promise<string> {
    if (!payload) return '';

    const response = await this.orderProvider.postAdvancePayment(
      payload,
      payload.codigoEmpresa,
      payload.numeroDocumento,
    );

    return response;
  }
}

export default SendAdvancePaymentService;
