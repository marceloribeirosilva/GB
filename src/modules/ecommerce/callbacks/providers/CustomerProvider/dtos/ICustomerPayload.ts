import IShippingAddressesPayload from './IShippingAddressesPayload';

export default interface ICustomerPayload {
  codigoSite: string;
  nome: string;
  endereco: string;
  numero: string;
  cep: string;
  bairro: string;
  complemento: string;
  tipoDocumento: number;
  numeroDocumento: string;
  emailNfe: string;
  telefone1: string;
  telefoneCelular: string;
  codigoVendedor: string;
  codigoAtividade: string;
  codigoRepresentante: string;
  tabelaPreco: string;
  consumidorFinal: boolean;
  email: string;
  cidade: {
    nomeCidade: string;
    siglaEstado: string;
  };
  inscricaoEstadual: string;
  enderecosEntrega?: IShippingAddressesPayload[];
}
