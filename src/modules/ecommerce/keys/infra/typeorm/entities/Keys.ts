import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('keys')
class Keys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_anyshop: number;

  @Column()
  id_autcom: string;

  @Column()
  source: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Keys;
