import { RowDataPacket } from 'mysql2';

export default interface IShippingAddresses extends RowDataPacket {
  bairro: string;

  cep: string;

  endereco: string;

  statusAtivo: boolean;

  enderecoFaturamento: boolean;

  transportadora: string;

  nomeCidade: string;

  siglaEstado: string;
}
