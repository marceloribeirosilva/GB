import IPedidoAcrescrimoAnyShop from './IPedidoAcrescimoAnyShop';
import IPedidoClienteAnyShop from './IPedidoClienteAnyShop';
import IPedidoDescontoAnyShop from './IPedidoDescontoAnyShop';
import IPedidoEntregaAnyShop from './IPedidoEntregaAnyShop';
import IPedidoEnvioAnyShop from './IPedidoEnvioAnyShop';
import IPedidoFormaPagamentoAnyShop from './IPedidoFormaPagamentoAnyShop';
import IPedidoProdutoAnyShop from './IPedidoProdutoAnyShop';
import IPedidoStatusAnyShop from './IPedidoStatusAnyShop';

export default interface IPedidoDadosAnyShop {
  id: string;
  sub_total: string;
  total: string;
  data: string;
  referencia_transacao: string;
  ultima_alteracao: string;
  cliente: IPedidoClienteAnyShop;
  forma_pagamento: IPedidoFormaPagamentoAnyShop;
  status: IPedidoStatusAnyShop;
  entrega: IPedidoEntregaAnyShop;
  envio: IPedidoEnvioAnyShop;
  acrescimos: IPedidoAcrescrimoAnyShop[];
  descontos: IPedidoDescontoAnyShop[];
  produtos: IPedidoProdutoAnyShop[];
}
