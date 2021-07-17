import ShippingAddresses from '@modules/customers/infra/mysql2/entities/ShippingAddresses';
import { injectable, inject } from 'tsyringe';

import ICustomerProvider from '../providers/CustomerProvider/models/ICustomerProvider';

@injectable()
class GetShippingAddressesService {
  constructor(
    @inject('CustomerProvider')
    private customerProvider: ICustomerProvider,
  ) {}

  public async execute(code: string): Promise<ShippingAddresses[] | []> {
    const addresses = await this.customerProvider.getShippingAddressesByCode(
      code,
    );

    return addresses;
  }
}

export default GetShippingAddressesService;
