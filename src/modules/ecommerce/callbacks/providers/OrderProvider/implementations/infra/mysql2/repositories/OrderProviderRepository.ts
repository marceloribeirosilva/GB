import promisePoolMySqlAutcom from '@shared/infra/mysql2/AutcomProvider';
import { RowDataPacket } from 'mysql2';
import ILoteAutcomPayload from '@modules/ecommerce/callbacks/providers/OrderProvider/dtos/ILoteAutcomPayload';

interface NUMLOT extends RowDataPacket {
  LOT_NUMLOT: string;
  LOT_LOCFIS: string;
  LOT_SALDOS: number;
  LOT_ARMPRI: string;
}

export default class OrderProviderRepository {
  async getLotes(
    empresa: string,
    produto: string,
  ): Promise<ILoteAutcomPayload[]> {
    const [rows] = await promisePoolMySqlAutcom.query<NUMLOT[]>(
      ' SELECT LOT_NUMLOT, LOT_LOCFIS, LOT_SALDOS, LOT_ARMPRI FROM CADLOT ' +
        ' WHERE LOT_CODEMP = ? AND LOT_CODITE = ? AND LOT_SALDOS > 0 ' +
        " AND LOT_NUMLOT NOT IN ('A DEFINIR', 108) ",
      [empresa, produto],
    );

    const lote: ILoteAutcomPayload[] = [];
    if (rows && rows.length) {
      for (let i = 0; i < rows.length; i += 1) {
        lote.push({
          numeroLote: rows[i].LOT_NUMLOT,
          armazemPrincipal: rows[i].LOT_ARMPRI,
          localizacaoFisica: rows[i].LOT_LOCFIS,
          saldo: rows[i].LOT_SALDOS,
        });
      }
    }

    return lote;
  }
}
