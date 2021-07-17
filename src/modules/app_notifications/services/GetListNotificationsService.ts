import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import VehicleServiceStatus from '../enum/VehicleServiceStatus';

import DataForNotifications from '../infra/mysql2/entities/DataForNotifications';
import IAppNotificationsRepository from '../repositories/IAppNotificationsRepository';

interface IRequest {
  status: string;
}

@injectable()
class GetListNotificationsService {
  constructor(
    @inject('AppNotificationsRepository')
    private appNotificationsRepository: IAppNotificationsRepository,
  ) {}

  public async execute({ status }: IRequest): Promise<DataForNotifications[]> {
    try {
      let notifications: DataForNotifications[] = [];

      if (status === VehicleServiceStatus.Start) {
        notifications = await this.appNotificationsRepository.getListNotificationsStart();
      } else {
        notifications = await this.appNotificationsRepository.getListNotificationsEnd();
      }

      return notifications;
    } catch (err) {
      throw new AppError('Error fetching notifications', 500);
    }
  }
}

export default GetListNotificationsService;
