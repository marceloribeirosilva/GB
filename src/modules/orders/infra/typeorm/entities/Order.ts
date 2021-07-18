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
    id: string;
   
    @Column()
    cpf: string;
  
    @Column()
    valor: number;
  
    @Column()    
    status: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  
  export default Order;
  