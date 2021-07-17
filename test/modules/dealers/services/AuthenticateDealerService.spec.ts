import AppError from '../../../../src/shared/errors/AppError';
import FakeDealersRepository from '../../../../src/modules/dealers/repositories/fake/FakeDealersRepository';
import FakeHashProvider from '../../../../src/modules/dealers/providers/HashProvider/fake/FakeHashProvider';

import AuthenticateDealerService from '../../../../src/modules/dealers/services/AuthenticateDealerService';
import CreateDealerService from '../../../../src/modules/dealers/services/CreateDealerService';

let fakeDealersRepository: FakeDealersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateDealer: AuthenticateDealerService;
let createDealer: CreateDealerService;

describe('AuthenticateDealer', () => {
  beforeEach(() => {
    fakeDealersRepository = new FakeDealersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateDealer = new AuthenticateDealerService(
      fakeDealersRepository,
      fakeHashProvider,
    );

    createDealer = new CreateDealerService(fakeDealersRepository, fakeHashProvider);    
  });

  it('should be able to authenticate', async () => {
    const dealer = await createDealer.execute({
      name: 'John Doe',
      cpf: '999.999.999-99',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateDealer.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing dealer', async () => {
    await expect(
      authenticateDealer.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createDealer.execute({
      name: 'John Doe',
      cpf: '999.999.999-99',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateDealer.execute({
        email: 'johndoe@example.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});