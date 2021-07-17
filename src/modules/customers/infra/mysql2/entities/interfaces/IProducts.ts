import { RowDataPacket } from 'mysql2';

export default interface IProduct extends RowDataPacket {
  internal_code: string;

  factory_code: string;

  item_description: string;

  brand_description: string;

  item_quantity: number;

  item_total: number;
}
