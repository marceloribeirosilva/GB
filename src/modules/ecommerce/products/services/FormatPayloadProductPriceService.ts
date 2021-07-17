import IProdutoPriceAnyShop from '../infra/http/entities/interfaces/IProdutoPriceAnyShop';
import ProductAutcom from '../infra/http/entities/ProductAutcom';

export default class FormatPayloadProductPriceService {
  public async execute(
    products: ProductAutcom[],
  ): Promise<IProdutoPriceAnyShop[]> {
    const productsAnyShop: IProdutoPriceAnyShop[] = await Promise.all(
      products.map(async product => {
        const productPriceAnyShop: IProdutoPriceAnyShop = {
          id_externo_24: product.codigo_citel,
          precos: {
            preco_pf: product.preco,
            preco_pf_de: 0,
            preco_pj: product.preco,
            preco_pj_de: 0,
          },
        };

        return productPriceAnyShop;
      }),
    );

    return productsAnyShop;
  }
}
