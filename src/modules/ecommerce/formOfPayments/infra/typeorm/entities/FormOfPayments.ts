import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('form_of_payments')
class FormOfPayments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  form: string;

  @Column()
  method: string;

  @Column()
  id_autcom_condicao: string;

  @Column()
  id_autcom_cartao: string;

  @Column()
  company_autcom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FormOfPayments;
