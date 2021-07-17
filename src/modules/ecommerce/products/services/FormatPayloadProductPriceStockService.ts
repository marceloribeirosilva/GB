import IProdutoPriceStockAnyShop from '../infra/http/entities/interfaces/IProdutoPriceStockAnyShop';
import ProductAutcom from '../infra/http/entities/ProductAutcom';

export default class FormatPayloadProductPriceStockService {
  public async execute(
    products: ProductAutcom[],
  ): Promise<IProdutoPriceStockAnyShop[]> {
    const productsPriceStockAnyShop: IProdutoPriceStockAnyShop[] = [];

    for (let i = 0; i < products.length; i += 1) {
      const product = products[i];

      if (product.multiplo_venda > 0) {
        productsPriceStockAnyShop.push({
          id_externo_24: product.codigo_citel,
          estoques: {
            qtde_estoque: product.estoque,
            qtde_minimo_pf: product.multiplo_venda,
            qtde_minimo_pj: product.multiplo_venda,
            qtde_multipla_pf: product.multiplo_venda,
            qtde_multipla_pj: product.multiplo_venda,
          },
          precos: {
            preco_pf: product.preco,
            preco_pf_de: 0,
            preco_pj: product.preco,
            preco_pj_de: 0,
          },
        });
      }
    }

    return productsPriceStockAnyShop;
  }
}
