import AppError from '../../../../src/shared/errors/AppError';
import FakeOrdersRepository from '../../../../src/modules/orders/repositories/fake/FakeOrdersRepository';
import FakeDealersRepository from '../../../../src/modules/dealers/repositories/fake/FakeDealersRepository';
import FakeCashbacksRepository from '../../../../src/modules/cashbacks/repositories/fake/FakeCashbackRepository';
import CreateOrderService from '../../../../src/modules/orders/services/CreateOrderService';
import Dealer from '../../../../src/modules/dealers/infra/typeorm/entities/Dealer';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeDealersRepository: FakeDealersRepository;
let fakeCashbacksRepository : FakeCashbacksRepository;
let createOrder: CreateOrderService;

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    fakeDealersRepository = new FakeDealersRepository();
    fakeCashbacksRepository = new FakeCashbacksRepository();    
    createOrder = new CreateOrderService(fakeOrdersRepository, fakeDealersRepository, fakeCashbacksRepository);    
  });

  it('should be able to create a new order', async () => {    
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

    
    const { order } = await createOrder.execute({
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
    
    const { order } = await createOrder.execute({
      cpf: '153.509.460-56',
      valor: 990,      
    });

    expect(order.status).toEqual('Aprovado');
  });
});