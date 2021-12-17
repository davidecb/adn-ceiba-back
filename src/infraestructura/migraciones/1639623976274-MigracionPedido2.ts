import {MigrationInterface, QueryRunner} from "typeorm";

export class MigracionPedido21639623976274 implements MigrationInterface {
    name = 'MigracionPedido21639623976274'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "costo"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "costo" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "tiempo"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "tiempo" real NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "tiempo"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "tiempo" integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "costo"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "costo" real NOT NULL`, undefined);
    }

}
