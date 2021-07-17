import { RowDataPacket } from 'mysql2';

export default interface IOrder extends RowDataPacket {
  order: string;

  date: Date;

  customer_code: string;

  customer_name: string;

  plate: string;

  total: number;
}
