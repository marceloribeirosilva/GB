import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateOrders1626574604506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'orders',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isGenerated: true,
                  isPrimary: true,            
                  generationStrategy: 'increment',
                },                
                {
                  name: 'cpf',
                  type: 'varchar',                  
                },
                {
                  name: 'valor',
                  type: 'decimal',                  
                },
                {
                  name: 'status',
                  type: 'varchar',
                },          
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }

}
