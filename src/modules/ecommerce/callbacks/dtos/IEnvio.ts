export default interface IEnvio {
  tipo: string;
  prazo_entrega: string;
  valor: string;
  link_rastreio: string;
  codigo_rastreio?: string;
}
