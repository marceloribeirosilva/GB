import Product from './Product';
import AutomotiveService from './AutomotiveService';

export default class Order {
  order: string;

  date: Date;

  customer_code: string;

  customer_name: string;

  plate: string;

  services: AutomotiveService;

  products: Product;

  total: number;

  billed: boolean;
}
