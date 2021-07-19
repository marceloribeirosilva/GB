import Order from "@modules/orders/infra/typeorm/entities/Order";

export default interface ICreateCashbackDTO {    
    valor: number;
    percentual: number;
    order: Order 
  }
  