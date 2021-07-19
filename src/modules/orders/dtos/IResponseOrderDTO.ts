import Order from "../infra/typeorm/entities/Order";

export default interface IResponseOrderDTO {
    order: Order;
    cashback: {
        valor: number;
        percentual: number;
    };    
}
