export default interface IProduto {
  id: string;
  id_produto_variacao: string;
  produto_variacao: string;
  nome_produto: string;
  id_produto: string;
  id_pedido: string;
  referencia: string;
  preco_pago: string;
  qtde: string;
  id_externo_24?: string;
}
