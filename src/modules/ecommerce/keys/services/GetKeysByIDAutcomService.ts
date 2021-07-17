import { injectable, inject } from 'tsyringe';

import Keys from '../infra/typeorm/entities/Keys';
import IKeysRepository from '../repositories/IKeysRepository';

interface IRequest {
  id_autcom: string;
  source: string;
}

@injectable()
export default class GetKeysByIDAutcomService {
  constructor(
    @inject('KeysRepository')
    private keysRepository: IKeysRepository,
  ) {}

  public async execute({
    id_autcom,
    source,
  }: IRequest): Promise<Keys | undefined> {
    const keys = await this.keysRepository.findByIdAutcom(id_autcom, source);

    return keys;
  }
}
