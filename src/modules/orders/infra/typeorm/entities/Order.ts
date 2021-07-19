import Cashback from '@modules/cashbacks/infra/typeorm/entities/Cashback';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne
  } from 'typeorm';  
  
  @Entity('orders')
  class Order {
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    cpf: string;
  
    @Column("decimal", { precision: 5, scale: 2 })
    valor: number;
  
    @Column()    
    status: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Cashback, cashback => cashback.order)        
    cashback: Cashback;
  }
  
  export default Order;
  