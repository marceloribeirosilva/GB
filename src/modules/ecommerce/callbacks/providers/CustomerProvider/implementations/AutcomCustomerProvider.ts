import axios from 'axios';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import GetCustomerByDocumentService from '@modules/customers/services/GetCustomerByDocumentService';
import GetShippingAddressesByCodeService from '@modules/customers/services/GetShippingAddressesByCodeService';
import ShippingAddresses from '@modules/customers/infra/mysql2/entities/ShippingAddresses';
import IValidationErrorCitel from '@shared/errors/IValidationErrorCitel';
import ICustomerProvider from '../models/ICustomerProvider';
import CustomerProviderRepository from './infra/mysql2/repositories/CustomerProviderRepository';
import ICustomerPayload from '../dtos/ICustomerPayload';
import IShippingAddressAutcom from '../dtos/IShippingAddressAutcom';

export default class AutcomCustomerProvider implements ICustomerProvider {
  customerProviderRepository = new CustomerProviderRepository();

  async getCityCodeByName(cityName: string): Promise<string> {
    return this.customerProviderRepository.getCityCodeByName(cityName);
  }

  async getCustomerByDocument(document: string): Promise<{ code: string }> {
    const getCustomerByDocumentService = container.resolve(
      GetCustomerByDocumentService,
    );
    try {
      const customer = await getCustomerByDocumentService.execute({ document });

      const code = customer && customer.code ? customer.code : '';

      return {
        code,
      };
    } catch (err) {
      throw new AppError('Error fetching client', 500);
    }
  }

  async postCustomer(
    customerPayload: ICustomerPayload,
  ): Promise<{ code: string; shippingAddress: IShippingAddressAutcom[] }> {
    let code = '';
    const shippingAddress: IShippingAddressAutcom[] = [];
    try {
      const responseCitel = await axios.post(
        `${process.env.ENDPOINT_CITEL}/cliente`,
        customerPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.TOKEN_CITEL}`,
          },
        },
      );

      if (responseCitel && responseCitel.data) {
        code = responseCitel.data.codigoCliente || '';

        if (
          responseCitel.data.enderecosEntrega &&
          responseCitel.data.enderecosEntrega.length
        ) {
          for (
            let i = 0;
            i < responseCitel.data.enderecosEntrega.length;
            i += 1
          ) {
            shippingAddress.push({
              id: responseCitel.data.enderecosEntrega[i].autoIncrem,
              cep: responseCitel.data.enderecosEntrega[i].cep,
              endereco: responseCitel.data.enderecosEntrega[i].endereco,
            });
          }
        }
      }
    } catch (err) {
      const errorCitel: IValidationErrorCitel = {
        error: err.response.data.error,
        errors: err.response.data.errors,
        payloadAutcom: '',
      };
      throw new AppError('postCustomer', 400, errorCitel);
    }

    return {
      code,
      shippingAddress,
    };
  }

  async putCustomer(
    customerPayload: ICustomerPayload,
    customerCodeAutcom: string,
  ): Promise<{ code: string; shippingAddress: IShippingAddressAutcom[] }> {
    let code = '';
    const shippingAddress: IShippingAddressAutcom[] = [];
    try {
      const responseCitel = await axios.patch(
        `${process.env.ENDPOINT_CITEL}/cliente/${customerCodeAutcom}`,
        customerPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.TOKEN_CITEL}`,
          },
        },
      );

      if (responseCitel && responseCitel.data) {
        code = responseCitel.data.codigoCliente || '';

        if (
          responseCitel.data.enderecosEntrega &&
          responseCitel.data.enderecosEntrega.length
        ) {
          for (
            let i = 0;
            i < responseCitel.data.enderecosEntrega.length;
            i += 1
          ) {
            shippingAddress.push({
              id: responseCitel.data.enderecosEntrega[i].autoIncrem,
              cep: responseCitel.data.enderecosEntrega[i].cep,
              endereco: responseCitel.data.enderecosEntrega[i].endereco,
            });
          }
        }
      }
    } catch (err) {
      const errorCitel: IValidationErrorCitel = {
        error: err.response.data.error,
        errors: err.response.data.errors,
        payloadAutcom: '',
      };
      throw new AppError('putCustomer', 400, errorCitel);
    }

    return {
      code,
      shippingAddress,
    };
  }

  async getShippingAddressIdByCustomer(
    customerCode: string,
    cep: string,
  ): Promise<number> {
    return this.getShippingAddressIdByCustomer(customerCode, cep);
  }

  async getShippingAddressesByCode(
    code: string,
  ): Promise<ShippingAddresses[] | []> {
    const getShippingAddressesByCode = container.resolve(
      GetShippingAddressesByCodeService,
    );
    try {
      const addresses = await getShippingAddressesByCode.execute({ code });

      return addresses;
    } catch (err) {
      throw new AppError('Error fetching addresses client', 500);
    }
  }
}
