import IFilterAnyShop from './IFilterAnyShop';

export default interface IResponseAnyShop {
  erros?: IErro[];
  filtros: IFilterAnyShop[];
}

interface IErro {
  id_externo_24: string;
  id: string;
  titulo: string;
  erro: string;
  msg: string;
}
