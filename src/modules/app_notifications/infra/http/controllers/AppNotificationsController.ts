import { container } from 'tsyringe';
import { Request, Response } from 'express';
import GetListNotificationsService from '@modules/app_notifications/services/GetListNotificationsService';
import VehicleServiceStatus from '@modules/app_notifications/enum/VehicleServiceStatus';
import SendNotificationService from '@modules/app_notifications/services/SendNotificationService';

export default class AppNotificationsController {
  public async postNotifications(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const getListNotifications = container.resolve(GetListNotificationsService);
    const sendNotification = new SendNotificationService();

    try {
      const notificationsStart = await getListNotifications.execute({
        status: VehicleServiceStatus.Start,
      });
      const notificationsEnd = await getListNotifications.execute({
        status: VehicleServiceStatus.End,
      });

      sendNotification.execute({
        notifications: notificationsStart,
        type: VehicleServiceStatus.Start,
      });

      sendNotification.execute({
        notifications: notificationsEnd,
        type: VehicleServiceStatus.End,
      });

      return response.json({
        notificationsStart,
        notificationsEnd,
      });
    } catch (err) {
      return response.status(500).send(err);
    }
  }
}
