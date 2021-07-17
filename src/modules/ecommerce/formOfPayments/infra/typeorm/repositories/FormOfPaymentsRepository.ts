import { getRepository, Repository } from 'typeorm';

import IFormOfPaymentsRepository from '@modules/ecommerce/formOfPayments/repositories/IFormOfPaymentsRepository';
import IFindFormOfPaymentsDTO from '@modules/ecommerce/formOfPayments/dtos/IFindFormOfPaymentsDTO';
import FormOfPayments from '@modules/ecommerce/formOfPayments/infra/typeorm/entities/FormOfPayments';

class FormOfPaymentsRepository implements IFormOfPaymentsRepository {
  private ormRepository: Repository<FormOfPayments>;

  constructor() {
    this.ormRepository = getRepository(FormOfPayments);
  }

  public async find(
    data: IFindFormOfPaymentsDTO,
  ): Promise<FormOfPayments | undefined> {
    let find;
    try {
      find = await this.ormRepository.findOne({
        where: data,
      });
    } catch (err) {
      console.log(err);
    }

    return find;
  }
}

export default FormOfPaymentsRepository;
