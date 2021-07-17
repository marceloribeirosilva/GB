export default class ShippingAddresses {
  bairro: string;

  cep: string;

  endereco: string;

  statusAtivo: boolean;

  enderecoFaturamento: boolean;

  transportadora: string;

  cidade: {
    nomeCidade: string;
    siglaEstado: string;
  };
}
