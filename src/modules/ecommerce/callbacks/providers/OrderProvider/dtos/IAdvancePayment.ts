export default interface IAdvancePayment {
  cartoes: [
    {
      codigoCartao: string;
      numeroCcd: string;
      numeroNsu: string;
      quantidadeParcelas: number;
      valor: number;
      valorLiquido: number;
    },
  ];
  codigoEmpresa: string;
  especieDocumento: string;
  numeroDocumento: string;
}
