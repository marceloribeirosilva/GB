import promisePoolMySqlAutcom from '@shared/infra/mysql2/AutcomProvider';
import VehicleServiceStatus from '@modules/app_notifications/enum/VehicleServiceStatus';
import IAppNotificationsRepository from '@modules/app_notifications/repositories/IAppNotificationsRepository';
import IDataForNotification from '../entities/interfaces/IDataForNotification';
import DataForNotifications from '../entities/DataForNotifications';

export default class AppNotificationsRepository
  implements IAppNotificationsRepository {
  async getListNotificationsStart(): Promise<DataForNotifications[] | []> {
    let notifications: DataForNotifications[] = [];
    const [rows] = await promisePoolMySqlAutcom.query<IDataForNotification[]>(
      ' SELECT FGO_CODEMP AS company, FGO_CODCLI AS customerCode, FGO_NUMDOC AS salesOrder FROM FATGOR ' +
        ' INNER JOIN SERGOR ON SERGOR.FGO_SEQFGO = FATGOR.AUTOINCREM ' +
        ' INNER JOIN EXTGOR ON EXTGOR.FGO_SEQFGO = FATGOR.AUTOINCREM ' +
        ' WHERE ' +
        " FGO_PLAVEI <> '' AND FGO_PLAVEI IS NOT NULL AND " +
        " CONCAT_WS( ' ', FGO_STAS01, FGO_STAS02, FGO_STAS03, FGO_STAS04, FGO_STAS05, FGO_STAS06, FGO_STAS07, FGO_STAS08, FGO_STAS09, FGO_STAS10, " +
        ' FGO_STAS11, FGO_STAS12, FGO_STAS13, FGO_STAS14, FGO_STAS15, FGO_STAS16, FGO_STAS17, FGO_STAS18, FGO_STAS19, FGO_STAS20, ' +
        ' FGO_STAS21, FGO_STAS22, FGO_STAS23, FGO_STAS24, FGO_STAS25, FGO_STAS26, FGO_STAS27, FGO_STAS28, FGO_STAS29, FGO_STAS30 ) LIKE ? AND ' +
        " FGO_CODEMP = '001' AND FGO_DTAENT >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND FGO_ESPDOC = 'PD' AND FGO_JAFATU = 0 ",
      [`%${VehicleServiceStatus.Start}%`],
    );

    if (rows && rows.length) {
      notifications = rows.map(notification => {
        return {
          company: notification.company,
          customerCode: notification.customerCode,
          order: notification.salesOrder,
        };
      });
    }

    return notifications;
  }

  async getListNotificationsEnd(): Promise<DataForNotifications[] | []> {
    let notifications: DataForNotifications[] = [];
    const [rows] = await promisePoolMySqlAutcom.query<IDataForNotification[]>(
      ' SELECT FGO_CODEMP AS company, FGO_CODCLI AS customerCode, FGO_NUMDOC AS salesOrder FROM FATGOR ' +
        ' INNER JOIN SERGOR ON SERGOR.FGO_SEQFGO = FATGOR.AUTOINCREM ' +
        ' INNER JOIN EXTGOR ON EXTGOR.FGO_SEQFGO = FATGOR.AUTOINCREM ' +
        ' WHERE ' +
        " FGO_PLAVEI <> '' AND FGO_PLAVEI IS NOT NULL AND " +
        " CONCAT_WS( ' ', FGO_STAS01, FGO_STAS02, FGO_STAS03, FGO_STAS04, FGO_STAS05, FGO_STAS06, FGO_STAS07, FGO_STAS08, FGO_STAS09, FGO_STAS10, " +
        ' FGO_STAS11, FGO_STAS12, FGO_STAS13, FGO_STAS14, FGO_STAS15, FGO_STAS16, FGO_STAS17, FGO_STAS18, FGO_STAS19, FGO_STAS20, ' +
        ' FGO_STAS21, FGO_STAS22, FGO_STAS23, FGO_STAS24, FGO_STAS25, FGO_STAS26, FGO_STAS27, FGO_STAS28, FGO_STAS29, FGO_STAS30 ) LIKE ? AND ' +
        " CONCAT_WS( ' ', FGO_STAS01, FGO_STAS02, FGO_STAS03, FGO_STAS04, FGO_STAS05, FGO_STAS06, FGO_STAS07, FGO_STAS08, FGO_STAS09, FGO_STAS10, " +
        ' FGO_STAS11, FGO_STAS12, FGO_STAS13, FGO_STAS14, FGO_STAS15, FGO_STAS16, FGO_STAS17, FGO_STAS18, FGO_STAS19, FGO_STAS20, ' +
        ' FGO_STAS21, FGO_STAS22, FGO_STAS23, FGO_STAS24, FGO_STAS25, FGO_STAS26, FGO_STAS27, FGO_STAS28, FGO_STAS29, FGO_STAS30 ) NOT LIKE ? AND ' +
        " FGO_CODEMP = '001' AND FGO_DTAENT >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND FGO_ESPDOC = 'PD' AND FGO_JAFATU = 0 ",
      [`%${VehicleServiceStatus.End}%`, `%${VehicleServiceStatus.Start}%`],
    );

    if (rows && rows.length) {
      notifications = rows.map(notification => {
        return {
          company: notification.company,
          customerCode: notification.customerCode,
          order: notification.salesOrder,
        };
      });
    }

    return notifications;
  }
}
