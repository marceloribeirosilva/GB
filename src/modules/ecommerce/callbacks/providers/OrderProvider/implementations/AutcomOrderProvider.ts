import axios from 'axios';
import { container } from 'tsyringe';

import IValidationErrorCitel from '@shared/errors/IValidationErrorCitel';
import AppError from '@shared/errors/AppError';
import CreateErrorAutcomLogsService from '@modules/ecommerce/logs/services/CreateErrorAutcomLogsService';
import OrderProviderRepository from './infra/mysql2/repositories/OrderProviderRepository';
import IOrderAutcomPayload from '../dtos/IOrderAutcomPayload';
import IOrderProvider from '../interface/IOrderProvider';
import ILoteAutcomPayload from '../dtos/ILoteAutcomPayload';
import IAdvancePayment from '../dtos/IAdvancePayment';

export default class AutcomOrderProvider implements IOrderProvider {
  orderProviderRepository = new OrderProviderRepository();

  createErrorAutcomLogsService = container.resolve(
    CreateErrorAutcomLogsService,
  );

  async postOrder(payload: IOrderAutcomPayload): Promise<string> {
    try {
      const responseCitel = await axios.post(
        `${process.env.ENDPOINT_CITEL}/pedidovenda`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.TOKEN_CITEL}`,
          },
        },
      );

      let orderId = '';
      if (responseCitel && responseCitel.data) {
        orderId = responseCitel.data.numeroDocumento;
      }

      return orderId;
    } catch (err) {
      const errorCitel: IValidationErrorCitel = {
        error: err.response.data.error,
        errors: err.response.data.errors,
        payloadAutcom: JSON.stringify(payload),
      };
      throw new AppError('postOrder', 400, errorCitel);
    }
  }

  async getLotes(
    empresa: string,
    product: string,
  ): Promise<ILoteAutcomPayload[]> {
    try {
      const lotes = await this.orderProviderRepository.getLotes(
        empresa,
        product,
      );
      return lotes;
    } catch (err) {
      const errorCitel: IValidationErrorCitel = {
        error: err.response.data.error,
        errors: err.response.data.errors,
        payloadAutcom: '',
      };
      throw new AppError('getLotes', 400, errorCitel);
    }
  }

  async postAdvancePayment(
    payload: IAdvancePayment,
    company: string,
    order: string,
  ): Promise<string> {
    try {
      const responseCitel = await axios.post(
        `${process.env.ENDPOINT_CITEL}/adiantamento/${order}/PD/${company}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.TOKEN_CITEL}`,
          },
        },
      );

      let id = '';
      if (responseCitel && responseCitel.data) {
        id = responseCitel.data.autoincrem;
      }

      return id;
    } catch (err) {
      const errorCitel: IValidationErrorCitel = {
        error: err.response.data.error,
        errors: err.response.data.errors,
        payloadAutcom: JSON.stringify(payload),
      };
      throw new AppError('postAdvancePayment', 400, errorCitel);
    }
  }

  async putReleasePayment(order: string): Promise<void> {
    try {
      await axios.put(
        `${process.env.ENDPOINT_CITEL}/liberacaoFinanceira/${order}/PD/001`,
        {
          codigoOperador: '091',
          observacao1: 'Pagamento Aprovado',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.TOKEN_CITEL}`,
          },
        },
      );
    } catch (err) {
      const errorCitel: IValidationErrorCitel = {
        error: err.response.data.error,
        errors: err.response.data.errors,
        payloadAutcom: JSON.stringify({
          codigoOperador: '091',
          observacao1: 'Pagamento Aprovado',
        }),
      };
      throw new AppError('putReleasePayment', 400, errorCitel);
    }
  }
}
