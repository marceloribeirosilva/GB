import ICarrierProvider from '../interface/ICarrierProvider';
import CarrierProviderRepository from './infra/mysql2/repositories/CarrierProviderRepository';

export default class AutcomCarrierProvider implements ICarrierProvider {
  carrierProviderRepository = new CarrierProviderRepository();

  async getCarrierAutcom(company: string, name: string): Promise<string> {
    const code = await this.carrierProviderRepository.getCarrierCodeByNameAutcom(
      company,
      name,
    );

    return code;
  }
}
