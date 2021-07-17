import { injectable, inject } from 'tsyringe';
import ICustomerPayload from '../providers/CustomerProvider/dtos/ICustomerPayload';

import ICustomerProvider from '../providers/CustomerProvider/models/ICustomerProvider';

@injectable()
class SendCustomerService {
  constructor(
    @inject('CustomerProvider')
    private customerProvider: ICustomerProvider,
  ) {}

  public async execute(
    payload: ICustomerPayload,
    customerCodeAutcom: string,
    cepEntrega: string,
    enderecoEntrega: string,
  ): Promise<{ customerCode: string; shippingAddressId: string }> {
    if (!payload) return { customerCode: '', shippingAddressId: '' };

    let customerCode = '';
    let shippingAddressId = '';
    let response;

    if (customerCodeAutcom.length) {
      try {
        response = await this.customerProvider.putCustomer(
          payload,
          customerCodeAutcom,
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      response = await this.customerProvider.postCustomer(payload);
    }

    if (!response) return { customerCode: '', shippingAddressId: '' };

    const { code, shippingAddress } = response;

    if (code && code.length) customerCode = code;

    if (shippingAddress && shippingAddress.length) {
      const shippingFound = shippingAddress.find(
        shipping =>
          shipping.cep === cepEntrega &&
          shipping.endereco === enderecoEntrega.toUpperCase(),
      );

      if (shippingFound) {
        shippingAddressId = shippingFound.id;
      }
    }

    return {
      customerCode,
      shippingAddressId,
    };
  }
}

export default SendCustomerService;
