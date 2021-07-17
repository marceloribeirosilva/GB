import IProdutoStockAnyShop from '../infra/http/entities/interfaces/IProdutoStockAnyShop';
import ProductAutcom from '../infra/http/entities/ProductAutcom';

export default class FormatPayloadProductStockService {
  public async execute(
    products: ProductAutcom[],
  ): Promise<IProdutoStockAnyShop[]> {
    const productsStockAnyShop: IProdutoStockAnyShop[] = [];

    for (let i = 0; i < products.length; i += 1) {
      const product = products[i];

      if (product.multiplo_venda > 0) {
        productsStockAnyShop.push({
          id_externo_24: product.codigo_citel,
          estoques: {
            qtde_estoque: product.estoque,
            qtde_minimo_pf: product.multiplo_venda,
            qtde_minimo_pj: product.multiplo_venda,
            qtde_multipla_pf: product.multiplo_venda,
            qtde_multipla_pj: product.multiplo_venda,
          },
        });
      }
    }

    return productsStockAnyShop;
  }
}
