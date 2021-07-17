import { container } from 'tsyringe';

import ICustomerProvider from './CustomerProvider/models/ICustomerProvider';
import AutcomCustomerProvider from './CustomerProvider/implementations/AutcomCustomerProvider';

import IOrderProvider from './OrderProvider/interface/IOrderProvider';
import AutcomOrderProvider from './OrderProvider/implementations/AutcomOrderProvider';

import ICarrierProvider from './CarrierProvider/interface/ICarrierProvider';
import AutcomCarrierProvider from './CarrierProvider/implementations/AutcomCarrierProvider';

container.registerSingleton<ICustomerProvider>(
  'CustomerProvider',
  AutcomCustomerProvider,
);

container.registerSingleton<IOrderProvider>(
  'OrderProvider',
  AutcomOrderProvider,
);

container.registerSingleton<ICarrierProvider>(
  'CarrierProvider',
  AutcomCarrierProvider,
);
