import ShippingAddresses from '@modules/customers/infra/mysql2/entities/ShippingAddresses';
import ICustomerPayload from '../dtos/ICustomerPayload';
import IShippingAddressAutcom from '../dtos/IShippingAddressAutcom';

export default interface ICustomerProvider {
  getCustomerByDocument(document: string): Promise<{ code: string }>;
  postCustomer(
    customerPayload: ICustomerPayload,
  ): Promise<{ code: string; shippingAddress: IShippingAddressAutcom[] }>;
  putCustomer(
    customerPayload: ICustomerPayload,
    customerCodeAutcom: string,
  ): Promise<{ code: string; shippingAddress: IShippingAddressAutcom[] }>;
  getCityCodeByName(cityName: string): Promise<string>;
  getShippingAddressIdByCustomer(
    customerCode: string,
    cep: string,
  ): Promise<number>;
  getShippingAddressesByCode(code: string): Promise<ShippingAddresses[] | []>;
}
