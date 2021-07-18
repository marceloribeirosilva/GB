import FakeOrdersRepository from '../../../../src/modules/orders/repositories/fake/FakeOrdersRepository';
import FakeDealersRepository from '../../../../src/modules/dealers/repositories/fake/FakeDealersRepository';
import CreateOrderService from '../../../../src/modules/orders/services/CreateOrderService';
import UpdateOrderService from '../../../../src/modules/orders/services/UpdateOrderService';
import CreateDealerService from '../../../../src/modules/dealers/services/CreateDealerService';
import FakeHashProvider from '../../../../src/modules/dealers/providers/HashProvider/fake/FakeHashProvider';
import OrderStatus from '../../../../src/modules/orders/enums/OrderStatus';
import AppError from '../../../../src/shared/errors/AppError';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeDealersRepository: FakeDealersRepository;
let createOrder: CreateOrderService;
let updateOrder: UpdateOrderService;
let createDealer: CreateDealerService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeDealersRepository = new FakeDealersRepository();
    fakeHashProvider = new FakeHashProvider();
    createOrder = new CreateOrderService(fakeOrdersRepository, fakeDealersRepository);
    updateOrder = new UpdateOrderService(fakeOrdersRepository);
    createDealer = new CreateDealerService(fakeDealersRepository, fakeHashProvider);
  });

  it('should be able to update a order', async () => {
    await createDealer.execute({
      name: 'John Doe',
      cpf: '999.999.999-99',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const createdOrder = await createOrder.execute({
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
    await createDealer.execute({
      name: 'John Doe',
      cpf: '153.509.460-56',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const createdOrder = await createOrder.execute({
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