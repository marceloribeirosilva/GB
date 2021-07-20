import AppError from '../../../../src/shared/errors/AppError';
import FakeOrdersRepository from '../../../../src/modules/orders/repositories/fake/FakeOrdersRepository';
import ShowOrdersByCpfService from '../../../../src/modules/orders/services/ShowOrdersByCpfService';
import Order from '../../../../src/modules/orders/infra/typeorm/entities/Order';
import Cashback from '../../../../src/modules/cashbacks/infra/typeorm/entities/Cashback';

let fakeOrdersRepository: FakeOrdersRepository;
let showOrders: ShowOrdersByCpfService;

describe('showOrders', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository();
    showOrders = new ShowOrdersByCpfService(fakeOrdersRepository);    
  });

  it('should be able show orders', async () => {       
    const order: Order = {
      id: 10,      
      cpf: '999.999.999-99',      
      valor: 700,
      created_at: new Date(),
      updated_at: new Date(),
      status: '',
      cashback: new Cashback()
    };

    jest.spyOn(fakeOrdersRepository, "findAllByCpf").mockImplementation(() => (Promise.resolve([order])));

    const result = await showOrders.execute('999.999.999-99');

    
    expect(result).toEqual([order]);
  });

  it('should not be able show orders if cpf field is empty', async () => {
    await expect(
        showOrders.execute(''),
    ).rejects.toBeInstanceOf(AppError);
  });  
});