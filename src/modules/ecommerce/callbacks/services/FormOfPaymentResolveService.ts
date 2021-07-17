import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import GetPaymentAutcomService from '@modules/ecommerce/formOfPayments/services/GetPaymentAutcomService';

import IFormaPagamento from '../dtos/IFormaPagamento';

class FormOfPaymentResolveService {
  public async execute(
    formOfPayment: IFormaPagamento,
  ): Promise<{ condicao: string; cartao: string }> {
    const getPaymentAutcomService = container.resolve(GetPaymentAutcomService);

    if (!formOfPayment) {
      throw new AppError(
        'Não foi possível gerar o pedido. Problema na forma de pagamento',
        400,
      );
    }

    const keyFormOfPayment = await getPaymentAutcomService.execute({
      company_autcom: '001',
      form: formOfPayment.forma,
      method: formOfPayment.metodo ? formOfPayment.metodo : '',
    });

    if (!keyFormOfPayment) {
      console.log(
        'Erro ao obter forma de pagamento =>',
        JSON.stringify(formOfPayment),
      );
      throw new AppError(
        'Não foi possível gerar o pedido. Problema na forma de pagamento',
        400,
      );
    }

    return {
      condicao: keyFormOfPayment.id_autcom_condicao,
      cartao: keyFormOfPayment.id_autcom_cartao,
    };
  }
}

export default FormOfPaymentResolveService;
