export default interface ICarrierProvider {
  getCarrierAutcom(company: string, name: string): Promise<string>;
}
