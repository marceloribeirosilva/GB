import { injectable, inject } from 'tsyringe';
import ICreateOrderKeysDTO from '../dtos/ICreateOrderKeysDTO';

import OrderKeys from '../infra/typeorm/entities/OrderKeys';
import IOrderKeysRepository from '../repositories/IOrderKeysRepository';

@injectable()
export default class CreateOrderKeysService {
  constructor(
    @inject('OrderKeysRepository')
    private orderKeysRepository: IOrderKeysRepository,
  ) {}

  public async execute({
    id_anyshop,
    id_autcom,
    id_transacao,
    payload_received_anyshop,
    payload_send_autcom,
  }: ICreateOrderKeysDTO): Promise<OrderKeys> {
    const newkeys = await this.orderKeysRepository.create({
      id_anyshop,
      id_autcom,
      id_transacao,
      payload_received_anyshop,
      payload_send_autcom,
    });

    return newkeys;
  }
}
