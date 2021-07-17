import IProductAutcomPayload from './IProductAutcomPayload';

export default interface IOrderAutcomPayload {
  cliente: string;
  enderecoEntrega: string;
  objCondicaoPagamento: string;
  codigoVendedor: string;
  codigoTransportadora: string;
  especieDocumento: string;
  itens: IProductAutcomPayload[];
  numeroPedidoSite: string;
  pedidoLiberado: boolean;
  motivoBloqueio: string;
  mensagemExpedicao1: string;
  tipoFrete: number;
  totalProdutos: number;
  valorContabil: number;
  valorTotalFrete: number;
}
