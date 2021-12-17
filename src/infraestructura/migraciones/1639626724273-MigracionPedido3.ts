import {MigrationInterface, QueryRunner} from "typeorm";

export class MigracionPedido31639626724273 implements MigrationInterface {
    name = 'MigracionPedido31639626724273'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "costo" SET DEFAULT 0`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "tiempo" SET DEFAULT 0`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "tiempo" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "costo" DROP DEFAULT`, undefined);
    }

}
