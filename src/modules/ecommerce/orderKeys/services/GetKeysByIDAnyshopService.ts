import { injectable, inject } from 'tsyringe';

import OrderKeys from '../infra/typeorm/entities/OrderKeys';
import IOrderKeysRepository from '../repositories/IOrderKeysRepository';

interface IRequest {
  id_anyshop: number;
}

@injectable()
export default class GetOrderKeysByIDAnyshopService {
  constructor(
    @inject('OrderKeysRepository')
    private orderKeysRepository: IOrderKeysRepository,
  ) {}

  public async execute({
    id_anyshop,
  }: IRequest): Promise<OrderKeys | undefined> {
    const keys = await this.orderKeysRepository.findByIdAnyshop(id_anyshop);

    return keys;
  }
}
