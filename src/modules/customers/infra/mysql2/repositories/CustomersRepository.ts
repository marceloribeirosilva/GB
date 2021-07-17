import promisePoolMySqlAutcom from '@shared/infra/mysql2/AutcomProvider';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Customer from '../entities/Customer';
import ICustomer from '../entities/interfaces/ICustomer';
import ShippingAddresses from '../entities/ShippingAddresses';
import IShippingAddresses from '../entities/interfaces/IShippingAddresses';

export default class CustomersRepository implements ICustomersRepository {
  async getCustomerByDocument(document: string): Promise<Customer | undefined> {
    let customer: Customer = new Customer();
    const [rows] = await promisePoolMySqlAutcom.query<ICustomer[]>(
      " SELECT CLI_CODCLI AS 'code', CLI_NOMCLI AS 'name', " +
        " IF(CLI_CGCCPF = 1, 'CNPJ' , 'CPF') AS 'type_document', CLI_C_G_C_ AS 'document' " +
        ' FROM CADCLI WHERE CLI_C_G_C_ = ?; ',
      [document],
    );

    if (rows && rows[0]) {
      customer = {
        code: rows[0].code,
        document: rows[0].document,
        name: rows[0].name,
        type_document: rows[0].type_document,
      };

      return customer;
    }

    return undefined;
  }

  async getShippingAdressesByCode(
    code: string,
  ): Promise<ShippingAddresses[] | []> {
    let shippingAddresses: ShippingAddresses[] = [];
    const [rows] = await promisePoolMySqlAutcom.query<IShippingAddresses[]>(
      ' SELECT ENTCLI.AUTOINCREM AS id, ETC_BAIENT AS bairro, ETC_CEPENT AS cep, ETC_ENDENT AS endereco, ETC_SITUAC AS statusAtivo, ETC_ENDFAT AS enderecoFaturamento, ' +
        ' ETC_CODTRA AS transportadora, CID_NOMCID AS nomeCidade, CID_ESTADO AS siglaEstado ' +
        ' FROM ENTCLI ' +
        ' INNER JOIN CADCID ON CID_CODCID = ETC_CIDENT ' +
        ' WHERE ETC_CODCLI = ? ',
      [code],
    );

    if (rows && rows.length) {
      shippingAddresses = rows.map(address => {
        return {
          bairro: address.bairro,
          cep: address.cep,
          endereco: address.endereco,
          enderecoFaturamento: address.enderecoFaturamento,
          statusAtivo: address.statusAtivo,
          transportadora: address.transportadora,
          cidade: {
            nomeCidade: address.nomeCidade,
            siglaEstado: address.siglaEstado,
          },
        };
      });
    }

    return shippingAddresses;
  }
}
