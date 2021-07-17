import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import GetCustomerCodeService from '@modules/ecommerce/callbacks/services/GetCustomerCodeService';
import GetShippingAddressesService from '@modules/ecommerce/callbacks/services/GetShippingAddressesService';
import CustomerFormatPayloadService from '@modules/ecommerce/callbacks/services/CustomerFormatPayloadService';
import SendCustomerService from '@modules/ecommerce/callbacks/services/SendCustomerService';
import ShippingAddresses from '@modules/customers/infra/mysql2/entities/ShippingAddresses';
import ICliente from '../dtos/ICliente';
import IEntrega from '../dtos/IEntrega';
import IShippingAddressesPayload from '../providers/CustomerProvider/dtos/IShippingAddressesPayload';

class CustomerResolveService {
  public async execute(
    cliente: ICliente,
    entrega: IEntrega,
  ): Promise<{ cliente: string; enderecoEntrega: string }> {
    let response = { cliente: '', enderecoEntrega: '' };
    const { cpf, cnpj } = cliente;

    try {
      const getCustomerCodeService = container.resolve(GetCustomerCodeService);
      const customerFormatPayloadService = container.resolve(
        CustomerFormatPayloadService,
      );
      const sendCustomerService = container.resolve(SendCustomerService);

      const customerCodeAutcom = await getCustomerCodeService.execute(
        cpf || cnpj,
      );

      const getShippingAddressesService = container.resolve(
        GetShippingAddressesService,
      );
      let shippingAddressesAutcom: ShippingAddresses[] = [];
      let equalShippingAddress = null;

      if (customerCodeAutcom) {
        shippingAddressesAutcom = await getShippingAddressesService.execute(
          customerCodeAutcom,
        );

        if (shippingAddressesAutcom && shippingAddressesAutcom.length) {
          equalShippingAddress = shippingAddressesAutcom.find(
            address =>
              address.cep === entrega.cep &&
              address.endereco === `${entrega.endereco},${entrega.numero}`,
          );
        }
      }

      const payload = await customerFormatPayloadService.execute(cliente);

      if (!equalShippingAddress && entrega) {
        const anyShopShipping: ShippingAddresses = {
          bairro: entrega.bairro.substring(0, 30),
          cep: entrega.cep,
          endereco: `${entrega.endereco},${entrega.numero}`,
          enderecoFaturamento: true,
          statusAtivo: true,
          transportadora: '00002',
          cidade: {
            nomeCidade: entrega.cidade,
            siglaEstado: entrega.sigla,
          },
        };

        shippingAddressesAutcom.push(anyShopShipping);
      }

      if (shippingAddressesAutcom && shippingAddressesAutcom.length) {
        const enderecos: IShippingAddressesPayload[] = [];

        shippingAddressesAutcom.forEach(address => {
          if (
            address.cep !== entrega.cep &&
            address.endereco !== `${entrega.endereco},${entrega.numero}`
          ) {
            return;
          }
          enderecos.push({
            bairro: address.bairro,
            cep: address.cep,
            cidade: {
              nomeCidade: address.cidade.nomeCidade,
              siglaEstado: address.cidade.siglaEstado,
            },
            endereco: address.endereco,
            statusAtivo: address.statusAtivo ? 'true' : 'false',
            transportadora: address.transportadora,
          });
        });

        payload.enderecosEntrega = enderecos;
      }

      const {
        customerCode,
        shippingAddressId,
      } = await sendCustomerService.execute(
        payload,
        customerCodeAutcom,
        entrega.cep,
        `${entrega.endereco},${entrega.numero}`,
      );

      if (!customerCode) {
        console.log('Erro ao obter cliente =>', JSON.stringify(payload));
        throw new AppError(
          'Não foi possível gerar o pedido. Problema no cliente',
          400,
        );
      }

      response = { cliente: customerCode, enderecoEntrega: shippingAddressId };
    } catch (err) {
      console.log('Erro ao obter cliente =>', JSON.stringify(err));
    }

    return response;
  }
}

export default CustomerResolveService;
