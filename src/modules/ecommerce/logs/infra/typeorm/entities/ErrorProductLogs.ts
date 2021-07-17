import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('error_product_logs')
class ErrorProductLogs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_anyshop: string;

  @Column()
  id_autcom: string;

  @Column()
  message: string;

  @Column()
  method: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ErrorProductLogs;
