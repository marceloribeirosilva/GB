import { container } from 'tsyringe';

import { Request, Response } from 'express';

import CustomerResolveService from '@modules/ecommerce/callbacks/services/CustomerResolveService';
import FormOfPaymentResolveService from '@modules/ecommerce/callbacks/services/FormOfPaymentResolveService';
import OrderFormatPayloadService from '@modules/ecommerce/callbacks/services/OrderFormatPayloadService';
import SendOrderService from '@modules/ecommerce/callbacks/services/SendOrderService';
import CreateOrderKeysService from '@modules/ecommerce/orderKeys/services/CreateOrderKeysService';
import GetKeysByIdAnyshopService from '@modules/ecommerce/orderKeys/services/GetKeysByIDAnyshopService';
import CreateErrorAutcomLogsService from '@modules/ecommerce/logs/services/CreateErrorAutcomLogsService';
import CreateIntegrationLogsService from '@modules/ecommerce/logs/services/CreateIntegrationLogsService';

import IRoot from '@modules/ecommerce/callbacks/dtos/IRoot';
import IRootPayment from '@modules/ecommerce/callbacks/dtos/IRootPayment';
import IAdvancePayment from '@modules/ecommerce/callbacks/providers/OrderProvider/dtos/IAdvancePayment';
import SendAdvancePaymentService from '@modules/ecommerce/callbacks/services/SendAdvancePaymentService';
import SendReleasePaymentService from '@modules/ecommerce/callbacks/services/SendReleasePaymentService';
import GetCarrierCodeService from '@modules/ecommerce/callbacks/services/GetCarrierCodeService';
import AppError from '@shared/errors/AppError';

export default class CallbacksController {
  public async dispatchOrder(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const root: IRoot = request.body;

    const createIntegrationLogs = container.resolve(
      CreateIntegrationLogsService,
    );

    await createIntegrationLogs.execute({
      payload_request: JSON.stringify(root),
      response: '',
      method: 'dispatchOrder',
    });

    try {
      if (root.webhook !== 'pedido') return response.json({});

      const customerResolveService = new CustomerResolveService();
      const { cliente, enderecoEntrega } = await customerResolveService.execute(
        root.dados.cliente,
        root.dados.entrega,
      );

      if (!cliente.length) {
        throw new AppError('Erro ao criar/atualizar cliente', 500);
      }

      const formOfPaymentResolveService = new FormOfPaymentResolveService();
      const { condicao } = await formOfPaymentResolveService.execute(
        root.dados.forma_pagamento,
      );
      const objCondicaoPagamento = condicao;

      const { envio } = root.dados;
      const getCarrierCodeService = container.resolve(GetCarrierCodeService);
      let carrierCode = '00002';

      if (envio.tipo.length) {
        if (envio.tipo.includes('VAREJOCAR')) {
          carrierCode = '00208';
        } else {
          carrierCode = await getCarrierCodeService.execute('001', envio.tipo);

          if (!carrierCode || carrierCode === '0') {
            carrierCode = '00002';
          }
        }
      }

      const orderFormatPayloadService = container.resolve(
        OrderFormatPayloadService,
      );
      const payloadAutcom = await orderFormatPayloadService.execute({
        cliente,
        enderecoEntrega,
        objCondicaoPagamento,
        numeroPedidoSite: root.dados.id,
        produtos: root.dados.produtos,
        frete: {
          tipo: envio.tipo,
          transportadora: carrierCode,
          valor: Number(envio.valor),
        },
      });

      const sendOrder = container.resolve(SendOrderService);
      const order = await sendOrder.execute(payloadAutcom);

      const orderKeys = container.resolve(CreateOrderKeysService);
      await orderKeys.execute({
        id_anyshop: Number(root.dados.id),
        id_autcom: order,
        id_transacao: root.dados.referencia_transacao,
        payload_received_anyshop: JSON.stringify(root),
        payload_send_autcom: JSON.stringify(payloadAutcom),
      });
    } catch (err) {
      const createErrorAutcomLogsService = container.resolve(
        CreateErrorAutcomLogsService,
      );

      if (err instanceof AppError) {
        const { errorCitel, message } = err;

        if (errorCitel) {
          if (
            errorCitel.error &&
            errorCitel.error.length &&
            (!errorCitel.errors || !errorCitel.errors.length)
          ) {
            const messageObj = {
              message: errorCitel.error,
              payloadAnyShop: { dados: root.dados },
              payloadAutcom: { dados: JSON.parse(errorCitel.payloadAutcom) },
            };
            await createErrorAutcomLogsService.execute({
              id_anyshop: root.dados.id,
              message: JSON.stringify(messageObj),
              method: message,
            });
          }

          if (errorCitel.errors && errorCitel.errors.length) {
            errorCitel.errors.map(async error => {
              const messageObj = {
                message: error.defaultMessage,
                field: error.field,
                objectName: error.objectName,
                rejectedValue: error.rejectedValue,
                payloadAnyShop: { dados: root.dados },
                payloadAutcom: { dados: JSON.parse(errorCitel.payloadAutcom) },
              };

              await createErrorAutcomLogsService.execute({
                id_anyshop: root.dados.id,
                message: JSON.stringify(messageObj),
                method: message,
              });
            });
          }
        } else {
          const messageObj = {
            message: err.message,
            payloadAnyShop: { dados: root.dados },
            payloadAutcom: {},
          };
          await createErrorAutcomLogsService.execute({
            id_anyshop: root.dados.id,
            message: JSON.stringify(messageObj),
            method: '',
          });
        }
      } else {
        const messageObj = {
          message: err.message,
          payloadAnyShop: { dados: root.dados },
          payloadAutcom: {},
        };
        await createErrorAutcomLogsService.execute({
          id_anyshop: root.dados.id,
          message: JSON.stringify(messageObj),
          method: '',
        });
      }
    }

    return response.json({});
  }

  public async dispatchPayment(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const root: IRootPayment = request.body;

      const createIntegrationLogs = container.resolve(
        CreateIntegrationLogsService,
      );

      await createIntegrationLogs.execute({
        payload_request: JSON.stringify(root),
        response: '',
        method: 'dispatchPayment',
      });

      if (root.webhook !== 'status_pedido') return response.json({});

      if (root.dados.titulo !== 'Pagamento confirmado')
        return response.json({});

      const getKeyByAnyshop = container.resolve(GetKeysByIdAnyshopService);
      const orderKey = await getKeyByAnyshop.execute({
        id_anyshop: root.dados.id_pedido,
      });

      if (!orderKey || !orderKey.id_autcom) {
        console.log(
          'Erro ao gerar adiantamento => Pedido Autcom não encontrado',
        );
        return response.json({});
      }

      const rootOrder = JSON.parse(orderKey.payload_received_anyshop);
      const { forma_pagamento, total } = rootOrder.dados;

      const formOfPaymentResolveService = new FormOfPaymentResolveService();
      const { cartao } = await formOfPaymentResolveService.execute(
        forma_pagamento,
      );

      const advancePaymentPayload: IAdvancePayment = {
        cartoes: [
          {
            codigoCartao: cartao,
            numeroCcd: orderKey.id_transacao,
            numeroNsu: orderKey.id_transacao,
            quantidadeParcelas: 1,
            valor: total,
            valorLiquido: total,
          },
        ],

        codigoEmpresa: '001',
        especieDocumento: 'PD',
        numeroDocumento: orderKey.id_autcom,
      };

      const sendAdvancePaymentService = container.resolve(
        SendAdvancePaymentService,
      );
      await sendAdvancePaymentService.execute(advancePaymentPayload);

      const sendReleasePaymentService = container.resolve(
        SendReleasePaymentService,
      );

      sendReleasePaymentService.execute(orderKey.id_autcom);

      return response.json({});
    } catch (err) {
      console.log('error =>', err);
    }

    return response.json({});
  }

  public async dispatchJson(
    request: Request,
    response: Response,
  ): Promise<Response> {
    console.log(JSON.stringify(request.body));

    return response.json({});
  }
}
