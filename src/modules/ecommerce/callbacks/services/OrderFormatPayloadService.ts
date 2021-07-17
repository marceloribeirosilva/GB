import { injectable, inject } from 'tsyringe';
import IProduto from '../dtos/IProduto';
import ILoteAutcomPayload from '../providers/OrderProvider/dtos/ILoteAutcomPayload';
import IOrderAutcomPayload from '../providers/OrderProvider/dtos/IOrderAutcomPayload';
import IProductAutcomPayload from '../providers/OrderProvider/dtos/IProductAutcomPayload';
import IOrderProvider from '../providers/OrderProvider/interface/IOrderProvider';

enum TypeShipping {
  SEM_FRETE = 9,
  DESTINATARIO = 2,
  EMITENTE = 1,
}
interface IRequest {
  cliente: string;
  enderecoEntrega: string;
  objCondicaoPagamento: string;
  numeroPedidoSite: string;
  produtos: IProduto[];
  frete: IFrete;
}

interface IFrete {
  tipo: string;
  transportadora: string;
  valor: number;
}
@injectable()
class OrderFormatPayloadService {
  constructor(
    @inject('OrderProvider')
    private orderProvider: IOrderProvider,
  ) {}

  public async execute(data: IRequest): Promise<IOrderAutcomPayload> {
    const order: IOrderAutcomPayload = {
      cliente: data.cliente,
      enderecoEntrega: data.enderecoEntrega,
      objCondicaoPagamento: data.objCondicaoPagamento,
      codigoVendedor: '995',
      codigoTransportadora: data.frete.transportadora,
      especieDocumento: 'PD',
      numeroPedidoSite: `Ecommerce-${data.numeroPedidoSite}`,
      pedidoLiberado: false,
      motivoBloqueio: 'Aguardando Pagamento',
      mensagemExpedicao1: 'Pedido E-Commerce',
      tipoFrete: this.getTypeShipping(data.frete),
      valorTotalFrete: data.frete.valor,
      itens: await this.createPayloadProducts(data.produtos),
      totalProdutos: 0,
      valorContabil: 0,
    };

    if (order.itens && order.itens.length) {
      order.totalProdutos = order.itens.reduce((acumulator, current) => {
        return acumulator + current.totalItem;
      }, 0);
    }

    order.valorContabil = order.totalProdutos + order.valorTotalFrete;

    order.valorContabil = parseFloat(order.valorContabil.toFixed(2));
    return order;
  }

  private async createPayloadProducts(
    produtos: IProduto[],
  ): Promise<IProductAutcomPayload[]> {
    const products: IProductAutcomPayload[] = [];

    try {
      if (!produtos || !produtos.length) return products;

      await Promise.all(
        produtos.map(async item => {
          if (!item.id_externo_24 || !item.id_externo_24.length) return;

          const product: IProductAutcomPayload = {
            produto: item.id_externo_24,
            codigoTabelaPreco: '3',
            precoUnitario: Number(item.preco_pago),
            quantidade: Number(item.qtde),
            totalItem: Number(item.preco_pago) * Number(item.qtde),
            numeroLote: '',
          };

          const lotes = await this.getLote('001', item.id_externo_24);

          if (!lotes || !lotes.length) {
            products.push(product);
            return;
          }

          const lotePrincipal = lotes.find(
            lote => lote.armazemPrincipal === 'S',
          );

          if (lotePrincipal && lotePrincipal.saldo >= Number(item.qtde)) {
            product.numeroLote = lotePrincipal.numeroLote;
            products.push(product);
          } else if (lotePrincipal && lotePrincipal.saldo < Number(item.qtde)) {
            const repeatProduct: IProductAutcomPayload = { ...product };
            const totalQuantityItem = product.quantidade;

            product.quantidade = lotePrincipal.saldo;
            product.numeroLote = lotePrincipal.numeroLote;
            product.totalItem = Number(item.preco_pago) * lotePrincipal.saldo;

            products.push(product);

            const excessoLote = lotes.find(
              lote => lote.armazemPrincipal !== 'S',
            );
            if (excessoLote) {
              repeatProduct.quantidade =
                totalQuantityItem - lotePrincipal.saldo;
              repeatProduct.numeroLote = excessoLote.numeroLote;
              repeatProduct.totalItem =
                Number(item.preco_pago) * repeatProduct.quantidade;
              products.push(repeatProduct);
            } else {
              repeatProduct.quantidade =
                totalQuantityItem - lotePrincipal.saldo;
              repeatProduct.numeroLote = '';
              repeatProduct.totalItem =
                Number(item.preco_pago) * repeatProduct.quantidade;
              products.push(repeatProduct);
            }
          } else {
            // Não tem lote principal
            const excessoLote = lotes.find(
              lote => lote.armazemPrincipal !== 'S',
            );
            if (excessoLote) {
              product.numeroLote = excessoLote.numeroLote;
              products.push(product);
            } else {
              products.push(product);
            }
          }
        }),
      );
    } catch (err) {
      console.log(err);
    }

    return products;
  }

  private async getLote(
    empresa: string,
    produto: string,
  ): Promise<ILoteAutcomPayload[]> {
    const lotes = await this.orderProvider.getLotes(empresa, produto);
    return lotes;
  }

  private getTypeShipping(data: IFrete): number {
    let type = TypeShipping.SEM_FRETE;

    if (!data.tipo.includes('VAREJOCAR') && data.valor > 0) {
      type = TypeShipping.DESTINATARIO;
    } else if (!data.tipo.includes('VAREJOCAR') && data.valor === 0) {
      type = TypeShipping.EMITENTE;
    }

    return type;
  }
}

export default OrderFormatPayloadService;
