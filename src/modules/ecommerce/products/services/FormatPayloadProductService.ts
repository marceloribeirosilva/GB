import FormatTitles from '@shared/services/FormatTitles';
import IGaleriaAnyShop from '../infra/http/entities/interfaces/IGaleriaAnyShop';
import IProdutoAnyShop from '../infra/http/entities/interfaces/IProdutoAnyShop';
import ProductAutcom from '../infra/http/entities/ProductAutcom';
import GetUrlImageService from './GetUrlImageService';

export default class FormatPayloadProductService {
  public async execute(products: ProductAutcom[]): Promise<IProdutoAnyShop[]> {
    const productsAnyShop: IProdutoAnyShop[] = await Promise.all(
      products.map(async product => {
        const productAnyShop: IProdutoAnyShop = {
          id: 0,
          tipo_produto: '1',
          id_externo_24: product.codigo_citel,
          estoques: {
            qtde_estoque: product.estoque,
            qtde_minimo_pf: product.multiplo_venda,
            qtde_minimo_pj: product.multiplo_venda,
            qtde_multipla_pf: product.multiplo_venda,
            qtde_multipla_pj: product.multiplo_venda,
          },
          fabricante: {
            titulo: FormatTitles.FirstLetterWordUppercase(product.marca),
            id_externo_24: product.codigo_marca,
          },
          ativo: product.exporta_ecommerce,
          cod_referencia: product.codigo_fabrica,
          // textos: product.aplicacao
          //   ? [
          //       {
          //         titulo: 'Aplicação',
          //         texto: product.aplicacao,
          //         ativo: 1,
          //         id_externo_24: product.codigo_citel,
          //         posicao: 0,
          //       },
          //     ]
          //   : [],
          destaque: 0,
          formato_produto: 'S',
          frete: {
            forma_envio:
              product.forma_envio <= 0 || product.forma_envio > 3
                ? 1
                : product.forma_envio,
          },
          seo: {
            description: product.descricao,
            keyphrases: '',
            title: product.titulo_anyshop,
          },
          titulo: product.titulo_anyshop,
          titulo_externo_8: product.titulo_marketplace,
          precos: {
            preco_pf: product.preco,
            preco_pf_de: 0,
            preco_pj: product.preco,
            preco_pj_de: 0,
          },
          dimensoes: {
            altura: product.altura,
            comprimento: product.largura,
            largura: product.profundidade,
            peso: product.peso_bruto,
            cubagem: 0,
          },
          departamentos: [
            {
              titulo_categoria: FormatTitles.FirstLetterWordUppercase(
                product.descricao_grupo,
              ),
              id_externo_24_categoria: product.codigo_grupo,
              titulo_subcategoria: FormatTitles.FirstLetterWordUppercase(
                product.descricao_linha_grupo,
              ),
              id_externo_24_subcategoria: product.codigo_linha_grupo,
              titulo_departamento: FormatTitles.FirstLetterWordUppercase(
                product.departamento,
              ),
              id_externo_24_departamento: product.codigo_departamento,
            },
          ],
        };

        const getUrlMainImage = new GetUrlImageService();
        const urlMainImage = await getUrlMainImage.execute(
          product.codigo_citel,
          '1',
        );
        const urlSecondaryImage = await getUrlMainImage.execute(
          product.codigo_citel,
          '2',
        );

        let payload = { ...productAnyShop };
        if (urlMainImage !== '') {
          payload = {
            ...payload,
            imagem_principal: {
              link: urlMainImage,
              nome_imagem: `${product.codigo_citel}-1`,
            },
          };
        }

        if (urlSecondaryImage !== '') {
          payload = {
            ...payload,
            imagem_secundaria: {
              link: urlSecondaryImage,
              nome_imagem: `${product.codigo_citel}-2`,
            },
          };
        }

        const photos = ['3', '4', '5', '6', '7', '8', '9', '10'];
        const galeria: IGaleriaAnyShop[] = [];

        await Promise.all(
          photos.map(async photo => {
            const url = await getUrlMainImage.execute(
              product.codigo_citel,
              photo,
            );

            if (url && url !== '') {
              galeria.push({
                link: url,
                nome_imagem: `${product.codigo_citel}-${photo}`,
                ativo: 1,
                posicao: Number(photo),
              });
            }
          }),
        );

        if (galeria && galeria.length >= 1) {
          payload = {
            ...payload,
            galeria,
          };
        }
        return payload;
      }),
    );

    return productsAnyShop;
  }
}
