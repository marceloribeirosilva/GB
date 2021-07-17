export default interface IResponseAnyShopStock {
  pagina_atual: string;
  qtde_paginas: number;
  qtde_por_pagina: number;
  produtos: [
    {
      id_variacao: string;
      id_produto: string;
      preco_pf: string;
      preco_pj: string;
      qtde_estoque: string;
      id_externo_25: string;
      id_externo_24: string;
      id_externo_8: string;
    },
  ];
}
