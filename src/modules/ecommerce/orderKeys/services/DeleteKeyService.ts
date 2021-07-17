import { injectable, inject } from 'tsyringe';
import IOrderKeysRepository from '../repositories/IOrderKeysRepository';

@injectable()
export default class DeleteOrderKeysService {
  constructor(
    @inject('OrderKeysRepository')
    private orderKeysRepository: IOrderKeysRepository,
  ) {}

  public async execute(id_anyshop: number): Promise<void> {
    const existingKeys = await this.orderKeysRepository.findByIdAnyshop(
      id_anyshop,
    );

    if (existingKeys) {
      await this.orderKeysRepository.delete(existingKeys);
    }
  }
}
