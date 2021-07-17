import { injectable, inject } from 'tsyringe';

import Keys from '../infra/typeorm/entities/Keys';
import IKeysRepository from '../repositories/IKeysRepository';

interface IRequest {
  id_anyshop: number;
  id_autcom: string;
  source: string;
}

@injectable()
export default class CreateKeysService {
  constructor(
    @inject('KeysRepository')
    private keysRepository: IKeysRepository,
  ) {}

  public async execute({
    id_anyshop,
    id_autcom,
    source,
  }: IRequest): Promise<Keys> {
    const existingKeys = await this.keysRepository.findByIdAutcom(
      id_autcom,
      source,
    );

    if (existingKeys) {
      existingKeys.id_anyshop = id_anyshop;

      await this.keysRepository.save(existingKeys);

      return existingKeys;
    }

    const newkeys = await this.keysRepository.create({
      id_anyshop,
      id_autcom,
      source,
    });

    return newkeys;
  }
}
