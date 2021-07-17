export default interface IShippingAddressesPayload {
  bairro: string;

  cep: string;

  endereco: string;

  statusAtivo: string;

  transportadora: string;

  cidade: {
    nomeCidade: string;
    siglaEstado: string;
  };
}
