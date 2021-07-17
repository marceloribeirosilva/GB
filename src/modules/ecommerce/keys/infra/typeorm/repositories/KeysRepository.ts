import { getRepository, Repository } from 'typeorm';

import IKeysRepository from '@modules/ecommerce/keys/repositories/IKeysRepository';
import ICreateKeysDTO from '@modules/ecommerce/keys/dtos/ICreateKeysDTO';
import Keys from '../entities/Keys';

class KeysRepository implements IKeysRepository {
  private ormRepository: Repository<Keys>;

  constructor() {
    this.ormRepository = getRepository(Keys);
  }

  public async create(data: ICreateKeysDTO): Promise<Keys> {
    const keys = this.ormRepository.create(data);

    await this.ormRepository.save(keys);

    return keys;
  }

  public async save(key: Keys): Promise<Keys> {
    const savedKeys = await this.ormRepository.save(key);

    return savedKeys;
  }

  public async delete(key: Keys): Promise<void> {
    await this.ormRepository.delete(key);
  }

  public async findByIdAutcom(
    id_autcom: string,
    source: string,
  ): Promise<Keys | undefined> {
    const findKeys = await this.ormRepository.findOne({
      where: {
        id_autcom,
        source,
      },
    });

    return findKeys;
  }

  public async getList(source: string): Promise<Keys[]> {
    const findkeys = await this.ormRepository.find({
      where: {
        source,
      },
    });

    return findkeys;
  }
}

export default KeysRepository;
