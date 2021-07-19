import FakeOrdersRepository from '../../../../src/modules/orders/repositories/fake/FakeOrdersRepository';
import FakeDealersRepository from '../../../../src/modules/dealers/repositories/fake/FakeDealersRepository';
import FakeCashbacksRepository from '../../../../src/modules/cashbacks/repositories/fake/FakeCashbackRepository';
import CreateOrderService from '../../../../src/modules/orders/services/CreateOrderService';
import UpdateOrderService from '../../../../src/modules/orders/services/UpdateOrderService';
import OrderStatus from '../../../../src/modules/orders/enums/OrderStatus';
import AppError from '../../../../src/shared/errors/AppError';
import Dealer from '../../../../src/modules/dealers/infra/typeorm/entities/Dealer';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeDealersRepository: FakeDealersRepository;
let fakeCashbacksRepository : FakeCashbacksRepository;
let createOrder: CreateOrderService;
let updateOrder: UpdateOrderService;

describe('UpdateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeDealersRepository = new FakeDealersRepository();
    fakeCashbacksRepository = new FakeCashbacksRepository();    
    createOrder = new CreateOrderService(fakeOrdersRepository, fakeDealersRepository, fakeCashbacksRepository);
    updateOrder = new UpdateOrderService(fakeOrdersRepository);    
  });

  it('should be able to update a order', async () => {
    const dealer: Dealer = {
      id: 10,
      name: 'John Doe',
      cpf: '999.999.999-99',
      email: 'johndoe@example.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.spyOn(fakeDealersRepository, "findByCpf").mockImplementation(() => (Promise.resolve(dealer)));

    const {order: createdOrder} = await createOrder.execute({
      cpf: '999.999.999-99',
      valor: 990,
    });    

    const order = await updateOrder.execute({
        id: createdOrder.id,
        status: OrderStatus.approved,
        valor: 25
    })    

    expect(order?.status).toEqual(OrderStatus.approved);
    expect(order?.valor).toEqual(25);
  }); 
  
  it('should not be able to update a order with status to equal Aprovado', async () => {
    const dealer: Dealer = {
      id: 10,
      name: 'John Doe',
      cpf: '153.509.460-56',
      email: 'johndoe@example.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    };

    jest.spyOn(fakeDealersRepository, "findByCpf").mockImplementation(() => (Promise.resolve(dealer)));

    const {order: createdOrder} = await createOrder.execute({
      cpf: '153.509.460-56',
      valor: 990,
    });      
    
    await expect(
      updateOrder.execute({
        id: createdOrder.id,
        status: OrderStatus.approved,
        valor: 90,
      }),
    ).rejects.toBeInstanceOf(AppError);    
  });
  
  it('should not be able to update a order when order not exists', async () => {
    await expect(
      updateOrder.execute({
        id: 12,
        status: OrderStatus.approved,
        valor: 90,
      }),
    ).rejects.toBeInstanceOf(AppError);    
  });
});