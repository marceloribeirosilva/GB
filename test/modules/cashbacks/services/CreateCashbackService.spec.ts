import AppError from '../../../../src/shared/errors/AppError';
import FakeCashbackRepository from '../../../../src/modules/cashbacks/repositories/fake/FakeCashbackRepository';
import CreateCashbackService from '../../../../src/modules/cashbacks/services/CreateCashbackService';
import Order from '../../../../src/modules/orders/infra/typeorm/entities/Order';

let fakeCashbackRepository: FakeCashbackRepository;
let createCashback: CreateCashbackService;

describe('CreateCashback', () => {
    beforeEach(() => {
        fakeCashbackRepository = new FakeCashbackRepository();
        createCashback = new CreateCashbackService(fakeCashbackRepository);
    });

    it('should be able to create a new cashback', async () => {
        const order = new Order();
        order.id = 99;
        const cashback = await createCashback.execute(order);

        expect(cashback).toHaveProperty('id');
    });

    it('should not be able to create a new cashback if order not exists', async () => {        
        const order = new Order();
        await expect(createCashback.execute(order)).rejects.toBeInstanceOf(AppError);        
    });

    it('should be able to create a new cashback with 10%', async () => {
        const order = new Order();
        order.id = 99;
        order.valor = 1000
        const cashback = await createCashback.execute(order);

        expect(cashback.valor).toEqual(100);
    });

    it('should be able to create a new cashback with 15%', async () => {
        const order = new Order();
        order.id = 99;
        order.valor = 1500
        const cashback = await createCashback.execute(order);

        expect(cashback.valor).toEqual(225);
    });

    it('should be able to create a new cashback with 20%', async () => {
        const order = new Order();
        order.id = 99;
        order.valor = 1600
        const cashback = await createCashback.execute(order);

        expect(cashback.valor).toEqual(320);
    });
});
