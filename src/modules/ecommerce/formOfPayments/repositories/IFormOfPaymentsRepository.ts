import IFindFormOfPaymentsDTO from '../dtos/IFindFormOfPaymentsDTO';
import FormOfPayments from '../infra/typeorm/entities/FormOfPayments';

export default interface IFormOfPaymetntsRepository {
  find(data: IFindFormOfPaymentsDTO): Promise<FormOfPayments | undefined>;
}
