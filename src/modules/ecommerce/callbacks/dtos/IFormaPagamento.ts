export default interface IFormaPagamento {
  forma: string;
  reference_gateway: string;
  parcelamento: string;
  metodo: string;
  bandeira_cartao: string;
}
