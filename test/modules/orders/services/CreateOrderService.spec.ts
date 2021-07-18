import AppError from '../../../../src/shared/errors/AppError';
import FakeOrdersRepository from '../../../../src/modules/orders/repositories/fake/FakeOrdersRepository';
import FakeDealersRepository from '../../../../src/modules/dealers/repositories/fake/FakeDealersRepository';
import CreateOrderService from '../../../../src/modules/orders/services/CreateOrderService';
import CreateDealerService from '../../../../src/modules/dealers/services/CreateDealerService';
import FakeHashProvider from '../../../../src/modules/dealers/providers/HashProvider/fake/FakeHashProvider';
import OrderStatus from '../../../../src/modules/orders/enums/OrderStatus';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeDealersRepository: FakeDealersRepository;
let createOrder: CreateOrderService;
let createDealer: CreateDealerService;
let fakeHashProvider: FakeHashProvider;

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeDealersRepository = new FakeDealersRepository();
    fakeHashProvider = new FakeHashProvider();
    createOrder = new CreateOrderService(fakeOrdersRepository, fakeDealersRepository);
    createDealer = new CreateDealerService(fakeDealersRepository, fakeHashProvider);
  });

  it('should be able to create a new order', async () => {
    await createDealer.execute({
      name: 'John Doe',
      cpf: '999.999.999-99',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const order = await createOrder.execute({
      cpf: '999.999.999-99',
      valor: 990,
    });

    expect(order).toHaveProperty('id');
  });

  it('should not be able to create a new Order if cpf field is empty', async () => {
    await expect(
      createOrder.execute({
        cpf: '',
        valor: 990,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Order if cpf is not from a dealer', async () => {
    await expect(
      createOrder.execute({
        cpf: '999.999.999-99',
        valor: 90,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new order with status Aprovado when cpf is equal 153.509.460-56', async () => {
    await createDealer.execute({
      name: 'John Doe',
      cpf: '153.509.460-56',
      email: 'johndoe@example.com',
      password: '123456',
    });
    
    const order = await createOrder.execute({
      cpf: '153.509.460-56',
      valor: 990,      
    });

    expect(order.status).toEqual('Aprovado');
  });

});