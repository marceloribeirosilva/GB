import IProdutoAnyShop from './IProdutoAnyShop';

export default interface IResponseAnyShop {
  erros?: IErro[];
  produtos: IProdutoAnyShop[];
}

interface IErro {
  id_externo_24: string;
  id_produto: string;
  titulo: string;
  erro: string;
  msg: string;
}
