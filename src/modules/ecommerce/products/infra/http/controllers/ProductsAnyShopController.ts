import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import FormatPayloadProductService from '@modules/ecommerce/products/services/FormatPayloadProductService';
import FormatPayloadProductStockService from '@modules/ecommerce/products/services/FormatPayloadProductStockService';
import FormatPayloadProductPriceService from '@modules/ecommerce/products/services/FormatPayloadProductPriceService';
import FormatPayloadProductPriceStockService from '@modules/ecommerce/products/services/FormatPayloadProductPriceStockService';
import GetProductAnyShopService from '@modules/ecommerce/products/services/GetProductAnyShopService';
import PostProductAnyShopService from '@modules/ecommerce/products/services/PostProductAnyShopService';
import PutProductAnyShopService from '@modules/ecommerce/products/services/PutProductAnyShopService';
import PutProductStockAnyShopService from '@modules/ecommerce/products/services/PutProductStockAnyShopService';
import PutProductPriceAnyShopService from '@modules/ecommerce/products/services/PutProductPriceAnyShopService';
import PutProductPriceStockAnyShopService from '@modules/ecommerce/products/services/PutProductPriceStockAnyShopService';
import PutProductFilterAnyShopService from '@modules/ecommerce/products/services/PutProductFilterAnyShopService';
import CreateIntegrationLogsService from '@modules/ecommerce/logs/services/CreateIntegrationLogsService';
import CreateErrorProductLogsService from '@modules/ecommerce/logs/services/CreateErrorProductLogsService';
import CreateKeysService from '@modules/ecommerce/keys/services/CreateKeysService';
import DeleteKeyService from '@modules/ecommerce/keys/services/DeleteKeyService';
import IResponseAnyShop from '../entities/interfaces/IResponseAnyShop';

export default class ProductsController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { page } = request.params;

    const getProduct = new GetProductAnyShopService();

    const responseAnyShop = await getProduct.execute(page);

    return response.json(responseAnyShop);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const [...body] = request.body;

    const formatPayload = new FormatPayloadProductService();

    const payload = await formatPayload.execute(body);

    const postProduct = new PostProductAnyShopService();

    const createIntegrationLogs = container.resolve(
      CreateIntegrationLogsService,
    );

    const createErrorProductLogs = container.resolve(
      CreateErrorProductLogsService,
    );

    let responseAnyPOST: IResponseAnyShop = { erros: [], produtos: [] };

    if (payload && payload.length > 0) {
      try {
        responseAnyPOST = await postProduct.execute(payload);
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(responseAnyPOST),
          method: 'postProduct',
        });
      } catch (err) {
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(err),
          method: 'postProduct - catch',
        });
        throw new AppError(err, 500);
      }

      if (responseAnyPOST) {
        const indexCloseDiv = String(responseAnyPOST).lastIndexOf('</div>');

        if (indexCloseDiv !== -1) {
          let newReponseAnyPost = String(responseAnyPOST).substring(
            indexCloseDiv + 6,
          );
          newReponseAnyPost = newReponseAnyPost
            .replace(/\\n/g, '\\n')
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, '\\&')
            .replace(/\\r/g, '\\r')
            .replace(/\\t/g, '\\t')
            .replace(/\\b/g, '\\b')
            .replace(/\\f/g, '\\f');

          responseAnyPOST = JSON.parse(newReponseAnyPost);
        }

        const createKeys = container.resolve(CreateKeysService);

        if (responseAnyPOST.produtos) {
          responseAnyPOST.produtos.map(async product => {
            await createKeys.execute({
              id_anyshop: product.id,
              id_autcom: product.id_externo_24,
              source: 'produto',
            });
          });
        }

        if (responseAnyPOST.erros) {
          if (Array.isArray(responseAnyPOST.erros)) {
            responseAnyPOST.erros.map(async error => {
              await createErrorProductLogs.execute({
                id_anyshop: error.id_produto || '',
                id_autcom: error.id_externo_24 || '',
                message: error.msg || '',
                method: 'postProduct',
              });
            });
          } else {
            await createErrorProductLogs.execute({
              id_anyshop: '',
              id_autcom: '',
              message: JSON.stringify(responseAnyPOST.erros),
              method: 'postProduct - no array',
            });
          }
        }
      }
    }

    return response.json({});
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const [...body] = request.body;

    const formatPayload = new FormatPayloadProductService();

    const payload = await formatPayload.execute(body);

    const putProduct = new PutProductAnyShopService();

    let responseAnyPUT: IResponseAnyShop = { erros: [], produtos: [] };

    const createIntegrationLogs = container.resolve(
      CreateIntegrationLogsService,
    );

    const createErrorProductLogs = container.resolve(
      CreateErrorProductLogsService,
    );

    if (payload && payload.length > 0) {
      try {
        responseAnyPUT = await putProduct.execute(payload);
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(responseAnyPUT),
          method: 'putProduct',
        });
      } catch (err) {
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(err),
          method: 'putProduct - catch',
        });
        throw new AppError(err, 500);
      }

      if (responseAnyPUT) {
        const deleteKey = container.resolve(DeleteKeyService);
        const indexCloseDiv = String(responseAnyPUT).lastIndexOf('</div>');

        if (indexCloseDiv !== -1) {
          let newReponseAnyPut = String(responseAnyPUT).substring(
            indexCloseDiv + 6,
          );
          newReponseAnyPut = newReponseAnyPut
            .replace(/\\n/g, '\\n')
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, '\\&')
            .replace(/\\r/g, '\\r')
            .replace(/\\t/g, '\\t')
            .replace(/\\b/g, '\\b')
            .replace(/\\f/g, '\\f');

          responseAnyPUT = JSON.parse(newReponseAnyPut);
        }

        if (responseAnyPUT.erros) {
          responseAnyPUT.erros.map(async error => {
            if (error.msg.includes('NãO EXISTE')) {
              await deleteKey.execute({
                id_autcom: error.id_externo_24,
                source: 'produto',
              });
            }

            await createErrorProductLogs.execute({
              id_anyshop: error.id_produto || '',
              id_autcom: error.id_externo_24 || '',
              message: error.msg || '',
              method: 'putProduct',
            });
          });
        }
      }
    }

    return response.json({});
  }

  public async updateStock(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const [...body] = request.body;

    const formatPayload = new FormatPayloadProductStockService();

    const payload = await formatPayload.execute(body);

    const stockUpdate = new PutProductStockAnyShopService();

    const createIntegrationLogs = container.resolve(
      CreateIntegrationLogsService,
    );

    const createErrorProductLogs = container.resolve(
      CreateErrorProductLogsService,
    );

    let responseAnyPUT: IResponseAnyShop = { erros: [], produtos: [] };

    if (payload && payload.length > 0) {
      try {
        responseAnyPUT = await stockUpdate.execute(payload);
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(responseAnyPUT),
          method: 'updateStock',
        });
      } catch (err) {
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(err),
          method: 'updateStock - catch',
        });
        throw new AppError(err, 500);
      }

      if (responseAnyPUT) {
        const indexCloseDiv = String(responseAnyPUT).lastIndexOf('</div>');

        if (indexCloseDiv !== -1) {
          let newReponseAnyPost = String(responseAnyPUT).substring(
            indexCloseDiv + 6,
          );
          newReponseAnyPost = newReponseAnyPost
            .replace(/\\n/g, '\\n')
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, '\\&')
            .replace(/\\r/g, '\\r')
            .replace(/\\t/g, '\\t')
            .replace(/\\b/g, '\\b')
            .replace(/\\f/g, '\\f');

          responseAnyPUT = JSON.parse(newReponseAnyPost);
        }

        if (responseAnyPUT.erros) {
          responseAnyPUT.erros.map(async error => {
            await createErrorProductLogs.execute({
              id_anyshop: error.id_produto || '',
              id_autcom: error.id_externo_24 || '',
              message: error.msg || '',
              method: 'updateStock',
            });
          });
        }
      }
    }

    return response.json({});
  }

  public async updatePrice(
    request: Request,
    response: Response,
  ): Promise<Response> {
    console.log('Chegou aqui');
    const [...body] = request.body;

    const formatPayload = new FormatPayloadProductPriceService();

    const payload = await formatPayload.execute(body);

    const priceUpdate = new PutProductPriceAnyShopService();

    const createIntegrationLogs = container.resolve(
      CreateIntegrationLogsService,
    );

    const createErrorProductLogs = container.resolve(
      CreateErrorProductLogsService,
    );

    let responseAnyPUT: IResponseAnyShop = { erros: [], produtos: [] };

    if (payload && payload.length > 0) {
      try {
        responseAnyPUT = await priceUpdate.execute(payload);
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(responseAnyPUT),
          method: 'updatePrice',
        });
      } catch (err) {
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(err),
          method: 'updatePrice - catch',
        });
        throw new AppError(err, 500);
      }

      if (responseAnyPUT) {
        const indexCloseDiv = String(responseAnyPUT).lastIndexOf('</div>');

        if (indexCloseDiv !== -1) {
          let newReponseAnyPost = String(responseAnyPUT).substring(
            indexCloseDiv + 6,
          );
          newReponseAnyPost = newReponseAnyPost
            .replace(/\\n/g, '\\n')
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, '\\&')
            .replace(/\\r/g, '\\r')
            .replace(/\\t/g, '\\t')
            .replace(/\\b/g, '\\b')
            .replace(/\\f/g, '\\f');

          responseAnyPUT = JSON.parse(newReponseAnyPost);
        }

        if (responseAnyPUT.erros) {
          responseAnyPUT.erros.map(async error => {
            await createErrorProductLogs.execute({
              id_anyshop: error.id_produto || '',
              id_autcom: error.id_externo_24 || '',
              message: error.msg || '',
              method: 'updatePrice',
            });
          });
        }
      }
    }

    return response.json({});
  }

  public async updateFilter(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const filterUpdate = new PutProductFilterAnyShopService();

    const createIntegrationLogs = container.resolve(
      CreateIntegrationLogsService,
    );

    const createErrorProductLogs = container.resolve(
      CreateErrorProductLogsService,
    );

    let responseAnyPUT: IResponseAnyShop = { erros: [], produtos: [] };

    if (request.body && request.body.length > 0) {
      try {
        responseAnyPUT = await filterUpdate.execute(request.body);
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(request.body),
          response: JSON.stringify(responseAnyPUT),
          method: 'updateProductFilter',
        });
      } catch (err) {
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(request.body),
          response: JSON.stringify(err),
          method: 'updateProductFilter - catch',
        });
        throw new AppError(err, 500);
      }

      if (responseAnyPUT) {
        const indexCloseDiv = String(responseAnyPUT).lastIndexOf('</div>');

        if (indexCloseDiv !== -1) {
          let newReponseAnyPost = String(responseAnyPUT).substring(
            indexCloseDiv + 6,
          );
          newReponseAnyPost = newReponseAnyPost
            .replace(/\\n/g, '\\n')
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, '\\&')
            .replace(/\\r/g, '\\r')
            .replace(/\\t/g, '\\t')
            .replace(/\\b/g, '\\b')
            .replace(/\\f/g, '\\f');

          responseAnyPUT = JSON.parse(newReponseAnyPost);
        }

        if (responseAnyPUT.erros) {
          responseAnyPUT.erros.map(async error => {
            await createErrorProductLogs.execute({
              id_anyshop: error.id_produto || '',
              id_autcom: error.id_externo_24 || '',
              message: error.msg || '',
              method: 'updateProductFilter',
            });
          });
        }
      }
    }

    return response.json({});
  }

  public async updatePriceStock(
    request: Request,
    response: Response,
  ): Promise<Response> {
    console.log('aqui');
    const [...body] = request.body;

    const formatPayload = new FormatPayloadProductPriceStockService();

    const payload = await formatPayload.execute(body);

    const priceStockUpdate = new PutProductPriceStockAnyShopService();

    const createIntegrationLogs = container.resolve(
      CreateIntegrationLogsService,
    );

    const createErrorProductLogs = container.resolve(
      CreateErrorProductLogsService,
    );

    let responseAnyPUT: IResponseAnyShop = { erros: [], produtos: [] };

    if (payload && payload.length > 0) {
      try {
        responseAnyPUT = await priceStockUpdate.execute(payload);
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(responseAnyPUT),
          method: 'updatePriceStock',
        });
      } catch (err) {
        await createIntegrationLogs.execute({
          payload_request: JSON.stringify(payload),
          response: JSON.stringify(err),
          method: 'updatePriceStock - catch',
        });
        throw new AppError(err, 500);
      }

      if (responseAnyPUT) {
        const indexCloseDiv = String(responseAnyPUT).lastIndexOf('</div>');

        if (indexCloseDiv !== -1) {
          let newReponseAnyPost = String(responseAnyPUT).substring(
            indexCloseDiv + 6,
          );
          newReponseAnyPost = newReponseAnyPost
            .replace(/\\n/g, '\\n')
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, '\\&')
            .replace(/\\r/g, '\\r')
            .replace(/\\t/g, '\\t')
            .replace(/\\b/g, '\\b')
            .replace(/\\f/g, '\\f');

          responseAnyPUT = JSON.parse(newReponseAnyPost);
        }

        if (responseAnyPUT.erros) {
          responseAnyPUT.erros.map(async error => {
            await createErrorProductLogs.execute({
              id_anyshop: error.id_produto || '',
              id_autcom: error.id_externo_24 || '',
              message: error.msg || '',
              method: 'updatePriceStock',
            });
          });
        }
      }
    }

    return response.json({});
  }
}
