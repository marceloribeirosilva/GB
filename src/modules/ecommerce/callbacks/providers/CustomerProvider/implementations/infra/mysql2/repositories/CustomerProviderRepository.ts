import promisePoolMySqlAutcom from '@shared/infra/mysql2/AutcomProvider';
import { RowDataPacket } from 'mysql2';

interface CADCID extends RowDataPacket {
  CID_CODCID: string;
}

interface ENTCLI extends RowDataPacket {
  ETC_SEQIND: number;
}

export default class CustomerProviderRepository {
  async getCityCodeByName(cityName: string): Promise<string> {
    const [rows] = await promisePoolMySqlAutcom.query<CADCID[]>(
      'SELECT CID_CODCID FROM CADCID where CID_NOMCID = ? limit 1;',
      [cityName],
    );

    let code = '0';
    if (rows && rows[0]) {
      code = rows[0].CID_CODCID;
    }

    return code;
  }

  async getShippingAddressIdByCustomer(
    customerCode: string,
    cep: string,
  ): Promise<number | null> {
    const [rows] = await promisePoolMySqlAutcom.query<ENTCLI[]>(
      'SELECT ETC_SEQIND FROM ENTCLI WHERE ETC_CODCLI = ? AND ETC_CEPENT = ? ORDER BY ETC_SEQIND ASC LIMIT 1',
      [customerCode, cep],
    );

    let seq = null;
    if (rows && rows[0]) {
      seq = rows[0].ETC_SEQIND;
    }

    return seq;
  }
}
