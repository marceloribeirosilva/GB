import { RowDataPacket } from 'mysql2';

export default interface ICustomer extends RowDataPacket {
  code: string;

  name: string;

  type_document: string;

  document: string;
}
