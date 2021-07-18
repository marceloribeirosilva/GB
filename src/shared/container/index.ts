import { container } from 'tsyringe';

import '@modules/dealers/providers';

import IDealersRepository from '@modules/dealers/repositories/IDealersRepository';
import DealersRepository from '@modules/dealers/infra/typeorm/repositories/DealersRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

container.registerSingleton<IDealersRepository>(
  'DealersRepository',
  DealersRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);
