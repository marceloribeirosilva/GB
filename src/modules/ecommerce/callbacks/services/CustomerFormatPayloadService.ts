import { injectable, inject } from 'tsyringe';
import DocumentType from '@modules/ecommerce/callbacks/providers/CustomerProvider/dtos/DocumentTypeEnun';

import ICustomerPayload from '../providers/CustomerProvider/dtos/ICustomerPayload';

import ICustomerProvider from '../providers/CustomerProvider/models/ICustomerProvider';
import ICliente from '../dtos/ICliente';

@injectable()
class CustomerFormatPayloadService {
  constructor(
    @inject('CustomerProvider')
    private customerProvider: ICustomerProvider,
  ) {}

  public async execute(customer: ICliente): Promise<ICustomerPayload> {
    const payload: ICustomerPayload = {
      codigoSite: customer.id,
      nome: customer.cpf ? customer.nome : customer.razao_social,
      email: customer.email,
      emailNfe: customer.email,
      bairro: customer.bairro.substring(0, 30),
      cep: customer.cep,
      complemento: customer.complemento,
      endereco: customer.endereco,
      numero: customer.numero,
      codigoAtividade: '001',
      codigoVendedor: '001',
      codigoRepresentante: '001',
      tabelaPreco: '1',
      consumidorFinal: customer.cpf !== undefined,
      numeroDocumento: (customer.cpf || customer.cnpj).replace(/[^0-9]/g, ''),
      tipoDocumento: customer.cpf ? DocumentType.CPF : DocumentType.CNPJ,
      inscricaoEstadual: customer.cpf ? '' : customer.insc_estadual,
      telefone1: customer.telefone,
      telefoneCelular: customer.telefone,
      cidade: {
        nomeCidade: customer.cidade,
        siglaEstado: customer.sigla,
      },
    };

    return payload;
  }
}

export default CustomerFormatPayloadService;
