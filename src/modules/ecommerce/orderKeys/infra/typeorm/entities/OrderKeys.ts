import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order_keys')
class OrderKeys {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  id_anyshop: number;

  @Index()
  @Column()
  id_autcom: string;

  @Column()
  id_transacao: string;

  @Column()
  payload_received_anyshop: string;

  @Column()
  payload_send_autcom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderKeys;
