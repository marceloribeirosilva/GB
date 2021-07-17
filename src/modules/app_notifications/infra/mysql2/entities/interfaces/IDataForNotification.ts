import { RowDataPacket } from 'mysql2';

export default interface IDataForNotification extends RowDataPacket {
  company: string;

  customerCode: string;

  salesOrder: string;
}
