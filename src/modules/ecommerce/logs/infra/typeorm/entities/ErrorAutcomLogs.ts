import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('error_autcom_logs')
class ErrorAutcomLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_anyshop: string;

  @Column()
  message: string;

  @Column()
  method: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ErrorAutcomLogs;
