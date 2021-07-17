import { injectable, inject } from 'tsyringe';

import OrderKeys from '../infra/typeorm/entities/OrderKeys';
import IOrderKeysRepository from '../repositories/IOrderKeysRepository';

interface IRequest {
  id_autcom: string;
}

@injectable()
export default class GetOrderKeysByIDAutcomService {
  constructor(
    @inject('OrderKeysRepository')
    private orderKeysRepository: IOrderKeysRepository,
  ) {}

  public async execute({
    id_autcom,
  }: IRequest): Promise<OrderKeys | undefined> {
    const keys = await this.orderKeysRepository.findByIdAutcom(id_autcom);

    return keys;
  }
}
