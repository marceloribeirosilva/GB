import { injectable, inject } from 'tsyringe';

import ICarrierProvider from '../providers/CarrierProvider/interface/ICarrierProvider';

@injectable()
class GetCarrierCodeService {
  constructor(
    @inject('CarrierProvider')
    private carrierProvider: ICarrierProvider,
  ) {}

  public async execute(company: string, name: string): Promise<string> {
    const code = await this.carrierProvider.getCarrierAutcom(company, name);

    return code;
  }
}

export default GetCarrierCodeService;
