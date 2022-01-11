import {MigrationInterface, QueryRunner} from "typeorm";

export class MigracionTesting1640715600437 implements MigrationInterface {
    name = 'MigracionTesting1640715600437'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "nombre" character varying(25) NOT NULL, "costo" integer NOT NULL, "tiempo" integer NOT NULL, "imagen" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d86d179360134b4b74bda750664" UNIQUE ("nombre"), CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "producto_solicitado" ("id" SERIAL NOT NULL, "material" character varying NOT NULL, "color" character varying NOT NULL, "acabado" jsonb NOT NULL, "urgencia" boolean NOT NULL, "costo" integer NOT NULL, "tiempo" real NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "producto_id" integer, CONSTRAINT "PK_cff76f8c8c3ea16224501c45e77" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "productos_por_pedido" ("id" SERIAL NOT NULL, "cantidad" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pedido" integer, "producto" integer NOT NULL, CONSTRAINT "REL_badb89dce4578cb0dcddba3050" UNIQUE ("producto"), CONSTRAINT "PK_42cb4b6d049db650826b7efdc8f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" SERIAL NOT NULL, "numeroPedido" character varying(20) NOT NULL, "direccion" character varying NOT NULL, "cliente" character varying NOT NULL, "estado" character varying NOT NULL, "costo" integer NOT NULL DEFAULT 0, "tiempo" real NOT NULL DEFAULT 0, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "clave" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "producto_solicitado" ADD CONSTRAINT "FK_b1778e3734bc51cbc6d4d88644f" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "productos_por_pedido" ADD CONSTRAINT "FK_f60e1ef4a5c36192a514d5e2a5d" FOREIGN KEY ("pedido") REFERENCES "pedido"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "productos_por_pedido" ADD CONSTRAINT "FK_badb89dce4578cb0dcddba3050f" FOREIGN KEY ("producto") REFERENCES "producto_solicitado"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "productos_por_pedido" DROP CONSTRAINT "FK_badb89dce4578cb0dcddba3050f"`, undefined);
        await queryRunner.query(`ALTER TABLE "productos_por_pedido" DROP CONSTRAINT "FK_f60e1ef4a5c36192a514d5e2a5d"`, undefined);
        await queryRunner.query(`ALTER TABLE "producto_solicitado" DROP CONSTRAINT "FK_b1778e3734bc51cbc6d4d88644f"`, undefined);
        await queryRunner.query(`DROP TABLE "usuario"`, undefined);
        await queryRunner.query(`DROP TABLE "pedido"`, undefined);
        await queryRunner.query(`DROP TABLE "productos_por_pedido"`, undefined);
        await queryRunner.query(`DROP TABLE "producto_solicitado"`, undefined);
        await queryRunner.query(`DROP TABLE "producto"`, undefined);
    }

}
