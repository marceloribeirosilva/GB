import promisePoolMySqlAutcom from '@shared/infra/mysql2/AutcomProvider';
import AppError from '@shared/errors/AppError';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import Order from '../entities/Order';
import Product from '../entities/Product';
import AutomotiveService from '../entities/AutomotiveService';
import IAutomotiveService from '../entities/interfaces/IAutomotiveService';
import AutomotiveServiceRows from '../entities/AutomotiveServiceRows';
import IProduct from '../entities/interfaces/IProducts';
import IOrder from '../entities/interfaces/IOrder';

export default class OrdersRepository implements IOrdersRepository {
  async getOrderAutomotiveServices(
    company: string,
    order: string,
  ): Promise<AutomotiveService> {
    const services: AutomotiveService = new AutomotiveService();
    try {
      const [rows] = await promisePoolMySqlAutcom.query<IAutomotiveService[]>(
        'SELECT FGO_TOTSER AS service_total,' +
          'FGO_DESS01 AS service_description_01, FGO_QTDS01 AS service_quantity_01, FGO_VALS01 AS service_value_01, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS01) AS service_status_01, ' +
          'FGO_DESS02 AS service_description_02, FGO_QTDS02 AS service_quantity_02, FGO_VALS02 AS service_value_02, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS02) AS service_status_02, ' +
          'FGO_DESS03 AS service_description_03, FGO_QTDS03 AS service_quantity_03, FGO_VALS03 AS service_value_03, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS03) AS service_status_03, ' +
          'FGO_DESS04 AS service_description_04, FGO_QTDS04 AS service_quantity_04, FGO_VALS04 AS service_value_04, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS04) AS service_status_04, ' +
          'FGO_DESS05 AS service_description_05, FGO_QTDS05 AS service_quantity_05, FGO_VALS05 AS service_value_05, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS05) AS service_status_05, ' +
          'FGO_DESS06 AS service_description_06, FGO_QTDS06 AS service_quantity_06, FGO_VALS06 AS service_value_06, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS06) AS service_status_06, ' +
          'FGO_DESS07 AS service_description_07, FGO_QTDS07 AS service_quantity_07, FGO_VALS07 AS service_value_07, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS07) AS service_status_07, ' +
          'FGO_DESS08 AS service_description_08, FGO_QTDS08 AS service_quantity_08, FGO_VALS08 AS service_value_08, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS08) AS service_status_08, ' +
          'FGO_DESS09 AS service_description_09, FGO_QTDS09 AS service_quantity_09, FGO_VALS09 AS service_value_09, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS09) AS service_status_09, ' +
          'FGO_DESS10 AS service_description_10, FGO_QTDS10 AS service_quantity_10, FGO_VALS10 AS service_value_10, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS10) AS service_status_10, ' +
          'FGO_DESS11 AS service_description_11, FGO_QTDS11 AS service_quantity_11, FGO_VALS11 AS service_value_11, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS11) AS service_status_11, ' +
          'FGO_DESS12 AS service_description_12, FGO_QTDS12 AS service_quantity_12, FGO_VALS12 AS service_value_12, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS12) AS service_status_12, ' +
          'FGO_DESS13 AS service_description_13, FGO_QTDS13 AS service_quantity_13, FGO_VALS13 AS service_value_13, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS13) AS service_status_13, ' +
          'FGO_DESS14 AS service_description_14, FGO_QTDS14 AS service_quantity_14, FGO_VALS14 AS service_value_14, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS14) AS service_status_14, ' +
          'FGO_DESS15 AS service_description_15, FGO_QTDS15 AS service_quantity_15, FGO_VALS15 AS service_value_15, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS15) AS service_status_15, ' +
          'FGO_DESS16 AS service_description_16, FGO_QTDS16 AS service_quantity_16, FGO_VALS16 AS service_value_16, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS16) AS service_status_16, ' +
          'FGO_DESS17 AS service_description_17, FGO_QTDS17 AS service_quantity_17, FGO_VALS17 AS service_value_17, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS17) AS service_status_17, ' +
          'FGO_DESS18 AS service_description_18, FGO_QTDS18 AS service_quantity_18, FGO_VALS18 AS service_value_18, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS18) AS service_status_18, ' +
          'FGO_DESS19 AS service_description_19, FGO_QTDS19 AS service_quantity_19, FGO_VALS19 AS service_value_19, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS19) AS service_status_19, ' +
          'FGO_DESS20 AS service_description_20, FGO_QTDS20 AS service_quantity_20, FGO_VALS20 AS service_value_20, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS20) AS service_status_20, ' +
          'FGO_DESS21 AS service_description_21, FGO_QTDS21 AS service_quantity_21, FGO_VALS21 AS service_value_21, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS21) AS service_status_21, ' +
          'FGO_DESS22 AS service_description_22, FGO_QTDS22 AS service_quantity_22, FGO_VALS22 AS service_value_22, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS22) AS service_status_22, ' +
          'FGO_DESS23 AS service_description_23, FGO_QTDS23 AS service_quantity_23, FGO_VALS23 AS service_value_23, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS23) AS service_status_23, ' +
          'FGO_DESS24 AS service_description_24, FGO_QTDS24 AS service_quantity_24, FGO_VALS24 AS service_value_24, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS24) AS service_status_24, ' +
          'FGO_DESS25 AS service_description_25, FGO_QTDS25 AS service_quantity_25, FGO_VALS25 AS service_value_25, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS25) AS service_status_25, ' +
          'FGO_DESS26 AS service_description_26, FGO_QTDS26 AS service_quantity_26, FGO_VALS26 AS service_value_26, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS26) AS service_status_26, ' +
          'FGO_DESS27 AS service_description_27, FGO_QTDS27 AS service_quantity_27, FGO_VALS27 AS service_value_27, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS27) AS service_status_27, ' +
          'FGO_DESS28 AS service_description_28, FGO_QTDS28 AS service_quantity_28, FGO_VALS28 AS service_value_28, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS28) AS service_status_28, ' +
          'FGO_DESS29 AS service_description_29, FGO_QTDS29 AS service_quantity_29, FGO_VALS29 AS service_value_29, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS29) AS service_status_29, ' +
          'FGO_DESS30 AS service_description_30, FGO_QTDS30 AS service_quantity_30, FGO_VALS30 AS service_value_30, (SELECT STS_DESCRI FROM STASER WHERE STS_CODIGO = FGO_STAS30) AS service_status_30 ' +
          'FROM FATGOR ' +
          'INNER JOIN SERGOR ON SERGOR.FGO_SEQFGO = FATGOR.AUTOINCREM ' +
          'INNER JOIN EXTGOR ON EXTGOR.FGO_SEQFGO = FATGOR.AUTOINCREM ' +
          "WHERE FGO_NUMDOC = ? AND FGO_ESPDOC = 'PD' AND FGO_CODEMP = ? ",
        [order, company],
      );

      if (rows[0]) {
        services.service_total = Number(rows[0].service_total);
        services.rows = [];
        let ServiceDescriptionKey;
        let ServiceQuantityKey;
        let ServiceValueKey;
        let ServiceStatusKey;
        let rowsServices: AutomotiveServiceRows;
        for (let i = 1; i <= 30; i += 1) {
          ServiceDescriptionKey = `service_description_${String(i).padStart(
            2,
            '0',
          )}`;
          ServiceQuantityKey = `service_quantity_${String(i).padStart(2, '0')}`;
          ServiceValueKey = `service_value_${String(i).padStart(2, '0')}`;
          ServiceStatusKey = `service_status_${String(i).padStart(2, '0')}`;
          if (rows[0][ServiceQuantityKey] > 0) {
            rowsServices = {
              service_description: String(rows[0][ServiceDescriptionKey]),
              service_quantity: Number(rows[0][ServiceQuantityKey]),
              service_value: Number(rows[0][ServiceValueKey]),
              service_status: String(rows[0][ServiceStatusKey]),
            };
            services.rows.push(rowsServices);
          }
        }
      }
      return services;
    } catch {
      return services;
    }
  }

  async getOrderProducts(company: string, order: string): Promise<Product> {
    const product = new Product();
    try {
      const [rows] = await promisePoolMySqlAutcom.query<IProduct[]>(
        "SELECT ITE_CODITE as 'internal_code', ITE_CODFAB AS 'factory_code', ITE_DESITE as 'item_description', " +
          "MAR_DESMAR as 'brand_description', FDO_QTDITE as 'item_quantity', FDO_VLRCON as 'item_total' " +
          'FROM FATDOR ' +
          'INNER JOIN CADITE ON ITE_CODITE = FDO_CODITE ' +
          'INNER JOIN CADMAR ON MAR_CODMAR = FDO_CODMAR ' +
          "WHERE FDO_NUMDOC = ? AND FDO_ESPDOC = 'PD' AND FDO_CODEMP = ? AND FDO_CODITE != '49594' ",
        [order, company],
      );

      if (rows) {
        product.product_total = rows.reduce((accumulator, currentValue) => {
          return accumulator + Number(currentValue.item_total);
        }, 0);

        const products = rows.map(productMap => {
          return {
            internal_code: productMap.internal_code,
            factory_code: productMap.factory_code,
            item_description: productMap.item_description,
            brand_description: productMap.brand_description,
            item_quantity: Number(productMap.item_quantity),
            item_total: Number(productMap.item_total),
          };
        });

        product.rows = products;
      }

      return product;
    } catch (err) {
      return product;
    }
  }

  async getAllOpenOrders(company: string): Promise<Order[]> {
    let orders: Order[] = [];
    const [rows] = await promisePoolMySqlAutcom.query<IOrder[]>(
      "SELECT FGO_NUMDOC AS 'order', DATE_FORMAT(FGO_DTAENT, ' %d/%m/%Y') as 'date', FGO_CODCLI AS customer_code, CLI_NOMCLI AS customer_name, " +
        "CONCAT(LEFT(FGO_PLAVEI, 3),'-',RIGHT(FGO_PLAVEI, 4)) AS 'plate', FGO_VLRCON AS 'total', FGO_JAFATU as billed " +
        'FROM FATGOR ' +
        'INNER JOIN EXTGOR ON EXTGOR.FGO_SEQFGO = FATGOR.AUTOINCREM AND FGO_PLAVEI IS NOT NULL ' +
        'INNER JOIN CADCLI ON CLI_CODCLI = FGO_CODCLI ' +
        "WHERE FGO_CODEMP = ? AND FGO_DTAENT >= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND FGO_ESPDOC = 'PD' " +
        'AND FGO_JAFATU = 0 ',
      [company],
    );

    if (rows) {
      orders = rows.map(orderMap => {
        return {
          customer_code: orderMap.customer_code,
          customer_name: orderMap.customer_name,
          date: orderMap.date,
          order: orderMap.order,
          plate: orderMap.plate,
          total: Number(orderMap.total),
          services: new AutomotiveService(),
          products: new Product(),
          billed: orderMap.billed,
        };
      });
    }

    return orders;
  }

  async getOrderById(
    company: string,
    numberOrder: string,
  ): Promise<Order | undefined> {
    let order: Order = new Order();
    try {
      const [rows] = await promisePoolMySqlAutcom.query<IOrder[]>(
        "SELECT FGO_NUMDOC AS 'order', DATE_FORMAT(FGO_DTAENT, ' %d/%m/%Y') as 'date', FGO_CODCLI AS customer_code, CLI_NOMCLI AS customer_name, " +
          "CONCAT(LEFT(FGO_PLAVEI, 3),'-',RIGHT(FGO_PLAVEI, 4)) AS 'plate', FGO_VLRCON AS 'total', FGO_JAFATU as billed " +
          'FROM FATGOR ' +
          'INNER JOIN EXTGOR ON EXTGOR.FGO_SEQFGO = FATGOR.AUTOINCREM AND FGO_PLAVEI IS NOT NULL ' +
          'INNER JOIN CADCLI ON CLI_CODCLI = FGO_CODCLI ' +
          "WHERE FGO_CODEMP = ? AND FGO_DTAENT >= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND FGO_ESPDOC = 'PD' " +
          'AND FGO_NUMDOC = ?',
        [company, numberOrder],
      );

      if (rows && rows[0]) {
        order = {
          customer_code: rows[0].customer_code,
          customer_name: rows[0].customer_name,
          date: rows[0].date,
          order: rows[0].order,
          plate: rows[0].plate,
          total: Number(rows[0].total),
          services: new AutomotiveService(),
          products: new Product(),
          billed: rows[0].billed,
        };

        return order;
      }

      return undefined;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async getOrdersByCustomer(
    company: string,
    customer_code: string,
  ): Promise<Order[] | []> {
    let orders: Order[] = [];
    const [rows] = await promisePoolMySqlAutcom.query<IOrder[]>(
      "SELECT FGO_NUMDOC AS 'order', DATE_FORMAT(FGO_DTAENT, ' %d/%m/%Y') as 'date', FGO_CODCLI AS customer_code, CLI_NOMCLI AS customer_name, " +
        "CONCAT(LEFT(FGO_PLAVEI, 3),'-',RIGHT(FGO_PLAVEI, 4)) AS 'plate', FGO_VLRCON AS 'total', FGO_JAFATU as billed " +
        'FROM FATGOR ' +
        'INNER JOIN EXTGOR ON EXTGOR.FGO_SEQFGO = FATGOR.AUTOINCREM AND FGO_PLAVEI IS NOT NULL ' +
        'INNER JOIN CADCLI ON CLI_CODCLI = FGO_CODCLI ' +
        "WHERE FGO_CODEMP = ? AND FGO_DTAENT >= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND FGO_ESPDOC = 'PD' " +
        'AND FGO_CODCLI = ? ',
      [company, customer_code],
    );

    if (rows) {
      orders = rows.map(orderMap => {
        return {
          customer_code: orderMap.customer_code,
          customer_name: orderMap.customer_name,
          date: orderMap.date,
          order: orderMap.order,
          plate: orderMap.plate,
          total: Number(orderMap.total),
          services: new AutomotiveService(),
          products: new Product(),
          billed: orderMap.billed,
        };
      });
    }

    return orders;
  }
}
