import IDadosPayment from './IDadosPayment';

export default interface IRootPayment {
  webhook: string;
  dados: IDadosPayment;
}
