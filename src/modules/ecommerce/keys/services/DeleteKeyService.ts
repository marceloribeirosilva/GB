import { injectable, inject } from 'tsyringe';
import IKeysRepository from '../repositories/IKeysRepository';

interface IRequest {
  id_autcom: string;
  source: string;
}

@injectable()
export default class DeleteKeysService {
  constructor(
    @inject('KeysRepository')
    private keysRepository: IKeysRepository,
  ) {}

  public async execute({ id_autcom, source }: IRequest): Promise<void> {
    const existingKeys = await this.keysRepository.findByIdAutcom(
      id_autcom,
      source,
    );

    if (existingKeys) {
      await this.keysRepository.delete(existingKeys);
    }
  }
}
