import IPrecosAnyShop from './IPrecosAnyShop';
import IEstoquesAnyShop from './IEstoquesAnyShop';

export default interface IProdutoPriceStockAnyShop {
  id_externo_24: string;
  precos: IPrecosAnyShop;
  estoques: IEstoquesAnyShop;
}
