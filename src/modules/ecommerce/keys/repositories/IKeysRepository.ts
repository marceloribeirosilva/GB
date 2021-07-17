import Keys from '../infra/typeorm/entities/Keys';
import ICreateKeysDTO from '../dtos/ICreateKeysDTO';

export default interface IkeysRepository {
  create(data: ICreateKeysDTO): Promise<Keys>;
  save(keys: Keys): Promise<Keys>;
  delete(keys: Keys): Promise<void>;
  findByIdAutcom(id_autcom: string, source: string): Promise<Keys | undefined>;
  getList(source: string): Promise<Keys[]>;
}
