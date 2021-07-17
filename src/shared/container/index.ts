import { container } from 'tsyringe';

import '@modules/dealers/providers';

import IDealersRepository from '@modules/dealers/repositories/IDealersRepository';
import DealersRepository from '@modules/dealers/infra/typeorm/repositories/DealersRepository';

container.registerSingleton<IDealersRepository>(
  'DealersRepository',
  DealersRepository,
);
