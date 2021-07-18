import Order from '@modules/orders/infra/typeorm/entities/Order';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
  } from 'typeorm';  
  
  @Entity('cashbacks')
  class Cashback {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(type => Order)
    @JoinColumn()
    order: Order;
  
    @Column("decimal", { precision: 5, scale: 2 })
    valor: number;
  
    @Column("decimal", { precision: 5, scale: 2 })
    percentual: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Cashback;
  