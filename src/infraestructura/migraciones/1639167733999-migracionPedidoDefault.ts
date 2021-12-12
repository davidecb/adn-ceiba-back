import {MigrationInterface, QueryRunner} from "typeorm";

export class migracionPedidoDefault1639167733999 implements MigrationInterface {
    name = 'migracionPedidoDefault1639167733999'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_faca54d93432c81490f23a08710"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" RENAME COLUMN "nombre" TO "producto"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" RENAME CONSTRAINT "REL_faca54d93432c81490f23a0871" TO "UQ_cd48c06d96f4d9acc027b1d1691"`, undefined);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "nombre"`, undefined);
        await queryRunner.query(`ALTER TABLE "producto" ADD "nombre" character varying(25) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "UQ_d86d179360134b4b74bda750664" UNIQUE ("nombre")`, undefined);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "imagen" SET DEFAULT 'noImage.jpg'`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "numeroPedido"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "numeroPedido" character varying(20) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "material" SET DEFAULT 'PLA'`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "color" SET DEFAULT 'blanco'`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "cantidad" SET DEFAULT 1`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "pulido" SET DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "pintado" SET DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "barnizado" SET DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "urgente" SET DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_cd48c06d96f4d9acc027b1d1691" FOREIGN KEY ("producto") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_cd48c06d96f4d9acc027b1d1691"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "urgente" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "barnizado" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "pintado" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "pulido" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "cantidad" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "color" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ALTER COLUMN "material" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "numeroPedido"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "numeroPedido" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "producto" ALTER COLUMN "imagen" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "UQ_d86d179360134b4b74bda750664"`, undefined);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "nombre"`, undefined);
        await queryRunner.query(`ALTER TABLE "producto" ADD "nombre" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" RENAME CONSTRAINT "UQ_cd48c06d96f4d9acc027b1d1691" TO "REL_faca54d93432c81490f23a0871"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" RENAME COLUMN "producto" TO "nombre"`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_faca54d93432c81490f23a08710" FOREIGN KEY ("nombre") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
