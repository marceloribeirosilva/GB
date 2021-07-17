import { container } from 'tsyringe';

import '@modules/dealers/providers';
import '@modules/ecommerce/callbacks/providers';

import IDealersRepository from '@modules/dealers/repositories/IDealersRepository';
import DealersRepository from '@modules/dealers/infra/typeorm/repositories/DealersRepository';

import IKeysRepository from '@modules/ecommerce/keys/repositories/IKeysRepository';
import KeysRepository from '@modules/ecommerce/keys/infra/typeorm/repositories/KeysRepository';

import IIntegrationLogsRepository from '@modules/ecommerce/logs/repositories/IIntegrationLogsRepository';
import IntegrationLogsRepository from '@modules/ecommerce/logs/infra/typeorm/repositories/IntegrationLogsRepository';

import IErrorProductLogsRepository from '@modules/ecommerce/logs/repositories/IErrorProductLogsRepository';
import ErrorProductLogsRepository from '@modules/ecommerce/logs/infra/typeorm/repositories/ErrorProductLogsRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/mysql2/repositories/OrdersRepository';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/mysql2/repositories/CustomersRepository';

import IFormOfPaymentsRepository from '@modules/ecommerce/formOfPayments/repositories/IFormOfPaymentsRepository';
import FormOfPaymentsRepository from '@modules/ecommerce/formOfPayments/infra/typeorm/repositories/FormOfPaymentsRepository';

import IOrderKeysRepository from '@modules/ecommerce/orderKeys/repositories/IOrderKeysRepository';
import OrderKeysRepository from '@modules/ecommerce/orderKeys/infra/typeorm/repositories/OrderKeysRepository';

import IErrorAutcomLogsRepository from '@modules/ecommerce/logs/repositories/IErrorAutcomLogsRepository';
import ErrorAutcomLogsRepository from '@modules/ecommerce/logs/infra/typeorm/repositories/ErrorAutcomLogsRepository';

import IAppNotificationsRepository from '@modules/app_notifications/repositories/IAppNotificationsRepository';
import AppNotificationsRepository from '@modules/app_notifications/infra/mysql2/repositories/AppNotificationsRepository';

container.registerSingleton<IDealersRepository>(
  'DealersRepository',
  DealersRepository,
);

container.registerSingleton<IKeysRepository>('KeysRepository', KeysRepository);

container.registerSingleton<IIntegrationLogsRepository>(
  'IntegrationLogsRepository',
  IntegrationLogsRepository,
);

container.registerSingleton<IErrorProductLogsRepository>(
  'ErrorProductLogsRepository',
  ErrorProductLogsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IFormOfPaymentsRepository>(
  'FormOfPaymentsRepository',
  FormOfPaymentsRepository,
);

container.registerSingleton<IOrderKeysRepository>(
  'OrderKeysRepository',
  OrderKeysRepository,
);

container.registerSingleton<IErrorAutcomLogsRepository>(
  'ErrorAutcomLogsRepository',
  ErrorAutcomLogsRepository,
);

container.registerSingleton<IAppNotificationsRepository>(
  'AppNotificationsRepository',
  AppNotificationsRepository,
);
