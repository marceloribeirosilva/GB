import { injectable, inject } from 'tsyringe';
import IKeysRepository from '../repositories/IKeysRepository';
import Keys from '../infra/typeorm/entities/Keys';

interface IRequest {
  source: string;
}

@injectable()
export default class GetListKeysService {
  constructor(
    @inject('KeysRepository')
    private keysRepository: IKeysRepository,
  ) {}

  public async execute({ source }: IRequest): Promise<Keys[]> {
    const keys = await this.keysRepository.getList(source);

    return keys;
  }
}
