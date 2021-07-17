import promisePoolMySqlAutcom from '@shared/infra/mysql2/AutcomProvider';
import { RowDataPacket } from 'mysql2';

interface CADTRA extends RowDataPacket {
  TRA_CODTRA: string;
}

export default class CarrierProviderRepository {
  async getCarrierCodeByNameAutcom(
    company: string,
    name: string,
  ): Promise<string> {
    const [rows] = await promisePoolMySqlAutcom.query<CADTRA[]>(
      ' SELECT TRA_CODTRA FROM CADTRA WHERE TRA_NOMFAN = ? LIMIT 1',
      [name],
    );

    let code = '0';
    if (rows && rows[0]) {
      code = rows[0].TRA_CODTRA;
    }

    return code;
  }
}
