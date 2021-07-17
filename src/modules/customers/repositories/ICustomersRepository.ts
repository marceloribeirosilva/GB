import Customer from '../infra/mysql2/entities/Customer';
import ShippingAddresses from '../infra/mysql2/entities/ShippingAddresses';

export default interface ICustomersRepository {
  getCustomerByDocument(document: string): Promise<Customer | undefined>;
  getShippingAdressesByCode(code: string): Promise<ShippingAddresses[] | []>;
}
