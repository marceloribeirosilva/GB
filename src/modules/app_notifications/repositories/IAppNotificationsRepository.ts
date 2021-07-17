import DataForNotifications from '@modules/app_notifications/infra/mysql2/entities/DataForNotifications';

export default interface IAppNotificationsRepository {
  getListNotificationsStart(): Promise<DataForNotifications[] | []>;
  getListNotificationsEnd(): Promise<DataForNotifications[] | []>;
}
