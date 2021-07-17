export default interface IFilterAnyShop {
  id?: number;
  ativo: string;
  nivel_1: string;
  id_externo_24: string;
  nivel_2: [
    {
      ativo: string;
      nivel_2: string;
      id_externo_24: string;
      nivel_3: [
        {
          ativo: string;
          ano_inicial: string;
          ano_final: string;
        },
      ];
    },
  ];
}
