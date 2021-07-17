import IAdvancePayment from '../dtos/IAdvancePayment';
import ILoteAutcomPayload from '../dtos/ILoteAutcomPayload';
import IOrderAutcomPayload from '../dtos/IOrderAutcomPayload';

export default interface IOrderProvider {
  postOrder(payload: IOrderAutcomPayload): Promise<string>;
  getLotes(empresa: string, product: string): Promise<ILoteAutcomPayload[]>;
  postAdvancePayment(
    payload: IAdvancePayment,
    company: string,
    order: string,
  ): Promise<string>;
  putReleasePayment(order: string): Promise<void>;
}
