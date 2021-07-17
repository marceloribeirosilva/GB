import axios from 'axios';

export default class GetUrlImageService {
  public async execute(codigoERP: string, order: string): Promise<string> {
    try {
      let url = `http://imagens.carhill.com.br/${codigoERP}-${order}.jpg`;
      const { status } = await axios.head(url);

      if (status !== 200) url = '';

      return url;
    } catch {
      return '';
    }
  }
}
