import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateCashback1626650579677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cashbacks',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isGenerated: true,
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'orderId',
                        type: 'int',
                    },
                    {
                        name: 'valor',
                        type: 'decimal(10,2)',
                    },
                    {
                        name: 'percentual',
                        type: 'decimal(10,2)',
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

        await queryRunner.createForeignKey(
            'cashbacks',
            new TableForeignKey({
              columnNames: ['orderId'],
              referencedTableName: 'orders',
              referencedColumnNames: ['id']
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cashbacks');
    }

}
