import AppError from '../../../../src/shared/errors/AppError';
import FakeDealersRepository from '../../../../src/modules/dealers/repositories/fake/FakeDealersRepository';
import FakeHashProvider from '../../../../src/modules/dealers/providers/HashProvider/fake/FakeHashProvider';
import CreateDealerService from '../../../../src/modules/dealers/services/CreateDealerService';

let fakeDealersRepository: FakeDealersRepository;
let fakeHashProvider: FakeHashProvider;
let createDealer: CreateDealerService;

describe('CreateDealer', () => {
  beforeEach(() => {
    fakeDealersRepository = new FakeDealersRepository();
    fakeHashProvider = new FakeHashProvider();
    createDealer = new CreateDealerService(fakeDealersRepository, fakeHashProvider);
  });

  it('should be able to create a new dealer', async () => {
    const dealer = await createDealer.execute({
      name: 'John Doe',
      cpf: '999.999.999-99',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(dealer).toHaveProperty('id');
  });

  it('should not be able to create a new dealer with same email from another', async () => { 
    await createDealer.execute({
        name: 'John Doe',
        cpf: '999.999.999-99',
        email: 'johndoe@example.com',
        password: '123456',
      });

    await expect(
      createDealer.execute({
        name: 'John Doe',
        cpf: '999.999.999-99',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new dealer with same cpf from another', async () => { 
    await createDealer.execute({
        name: 'John Doe',
        cpf: '999.999.999-99',
        email: 'johndoe@example.com',
        password: '123456',
      });

    await expect(
      createDealer.execute({
        name: 'John Doe',
        cpf: '999.999.999-99',
        email: 'johndoe2@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new dealer if name field is empty', async () => {     
    await expect(
      createDealer.execute({
        name: '',
        cpf: '999.999.999-99',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new dealer if cpf field is empty', async () => {     
    await expect(
      createDealer.execute({
        name: 'John Doe',
        cpf: '',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new dealer if email field is empty', async () => {     
    await expect(
      createDealer.execute({
        name: 'John Doe',
        cpf: '999.999.999-99',
        email: '',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new dealer if password field is empty', async () => {     
    await expect(
      createDealer.execute({
        name: 'John Doe',
        cpf: '999.999.999-99',
        email: 'johndoe@example.com',
        password: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });  
});