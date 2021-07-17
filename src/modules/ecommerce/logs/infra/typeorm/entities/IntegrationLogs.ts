import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('integration_logs')
class IntegrationLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payload_request: string;

  @Column()
  response: string;

  @Column()
  method: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default IntegrationLogs;
