import { injectable, inject } from 'tsyringe';

import ICustomerProvider from '../providers/CustomerProvider/models/ICustomerProvider';

@injectable()
class GetCustomerCodeService {
  constructor(
    @inject('CustomerProvider')
    private customerProvider: ICustomerProvider,
  ) {}

  public async execute(document: string): Promise<string> {
    const { code } = await this.customerProvider.getCustomerByDocument(
      document,
    );

    return code;
  }
}

export default GetCustomerCodeService;
