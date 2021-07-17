import IAcrescimo from './IAcrescimo';
import ICliente from './ICliente';
import IEntrega from './IEntrega';
import IEnvio from './IEnvio';
import IFormaPagamento from './IFormaPagamento';
import IProduto from './IProduto';
import IStatus from './IStatus';

export default interface IDados {
  id: string;
  sub_total: string;
  total: string;
  data: string;
  referencia_transacao: string;
  ultima_alteracao: string;
  cliente: ICliente;
  forma_pagamento: IFormaPagamento;
  status: IStatus;
  entrega: IEntrega;
  envio: IEnvio;
  acrescimos: IAcrescimo[];
  produtos: IProduto[];
}
