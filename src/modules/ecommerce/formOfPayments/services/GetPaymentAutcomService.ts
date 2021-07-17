import { injectable, inject } from 'tsyringe';

import FormOfPayments from '@modules/ecommerce/formOfPayments/infra/typeorm/entities/FormOfPayments';
import IFormOfPaymentsRepository from '@modules/ecommerce/formOfPayments/repositories/IFormOfPaymentsRepository';
import IFindFormOfPaymentsDTO from '../dtos/IFindFormOfPaymentsDTO';

@injectable()
export default class GetPaymentAutcomService {
  constructor(
    @inject('FormOfPaymentsRepository')
    private formOfPaymentsRepository: IFormOfPaymentsRepository,
  ) {}

  public async execute(
    data: IFindFormOfPaymentsDTO,
  ): Promise<FormOfPayments | undefined> {
    try {
      const payment = this.formOfPaymentsRepository.find(data);
      return payment;
    } catch (err) {
      console.log(err);
    }

    return undefined;
  }
}
