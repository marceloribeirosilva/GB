import AutomotiveService from '../infra/mysql2/entities/AutomotiveService';
import Order from '../infra/mysql2/entities/Order';
import Product from '../infra/mysql2/entities/Product';

export default interface IOrdersRepository {
  getAllOpenOrders(company: string): Promise<Order[] | []>;
  getOrderProducts(company: string, order: string): Promise<Product>;
  getOrderAutomotiveServices(
    company: string,
    order: string,
  ): Promise<AutomotiveService>;
  getOrderById(
    company: string,
    numberOrder: string,
  ): Promise<Order | undefined>;
  getOrdersByCustomer(
    company: string,
    customer_code: string,
  ): Promise<Order[] | []>;
}
