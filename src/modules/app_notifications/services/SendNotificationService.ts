import { Queue } from 'bullmq';
import { getRedis, setRedis } from '@shared/services/Redis';
import VehicleServiceStatus from '@modules/app_notifications/enum/VehicleServiceStatus';
import DataForNotifications from '../infra/mysql2/entities/DataForNotifications';

interface IRequest {
  notifications: DataForNotifications[];
  type: string;
}

class SendNotificationService {
  public async execute({ notifications, type }: IRequest): Promise<void> {
    if (!notifications || !notifications.length) {
      return;
    }

    const queue = new Queue('AtualizacaoERPNotificacao', {
      connection: {
        host: process.env.REDIS_HOST_NOTIFICATIONS,
        port: Number(process.env.REDIS_PORT_NOTIFICATIONS),
        password: process.env.REDIS_PASS_NOTIFICATIONS,
      },
    });

    try {
      await Promise.all(
        notifications.map(async notification => {
          const keyRedis = `${notification.company}-${notification.customerCode}-${notification.order}-${type}`;

          const responseRedis = await getRedis(keyRedis);

          if (!responseRedis) {
            await queue.add('AtualizacaoERPNotificacaoJob', {
              erpId: notification.customerCode,
              titulo: 'Atualização de Status',
              mensagem:
                type === VehicleServiceStatus.Start
                  ? 'Iniciamos o(s) serviço(s) no seu veículo'
                  : 'Finalizamos o(s) serviço(s) no seu veículo',
            });

            await setRedis(
              keyRedis,
              JSON.stringify({ customerCode: notification.customerCode, type }),
            );
          }
        }),
      );
    } catch (err) {
      console.log('error ===>', err);
    }
  }
}

export default SendNotificationService;
