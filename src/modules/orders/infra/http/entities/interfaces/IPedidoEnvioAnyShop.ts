export default interface IPedidoEnvioAnyShop {
  tipo: string;
  prazo_entrega: string;
  valor: string;
  link_rastreio: string;
  codigo_rastreio?: any;
}
