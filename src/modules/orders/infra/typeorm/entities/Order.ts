import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
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
  }
  
  export default Order;
  