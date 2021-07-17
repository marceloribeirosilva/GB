import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUser1597196438964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            isPrimary: true,
            isNullable: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: false,
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
    await queryRunner.dropTable('users');
  }
}

/*
ESSA VERSÃO DO MYSQL NÃO ACEITA UUID() EM DEFAULT VALOR.
POR ISSO QUE CRIEI A TRIGGER
TEM QUE SER CRIADO APÓS RODAR ESSA MIGRATION

DELIMITER ;;
CREATE TRIGGER `users_before_insert`
BEFORE INSERT ON `users` FOR EACH ROW
BEGIN
  SET new.id = uuid();
END;;
DELIMITER ;


*/
