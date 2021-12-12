import {MigrationInterface, QueryRunner} from "typeorm";

export class migracionPedidoProducto1639143048814 implements MigrationInterface {
    name = 'migracionPedidoProducto1639143048814'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "costo" integer NOT NULL, "tiempo" integer NOT NULL, "imagen" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" SERIAL NOT NULL, "numeroPedido" character varying NOT NULL, "material" character varying NOT NULL, "color" character varying NOT NULL, "cantidad" integer NOT NULL, "pulido" boolean NOT NULL, "pintado" boolean NOT NULL, "barnizado" boolean NOT NULL, "urgente" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nombre" integer NOT NULL, CONSTRAINT "REL_faca54d93432c81490f23a0871" UNIQUE ("nombre"), CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_faca54d93432c81490f23a08710" FOREIGN KEY ("nombre") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_faca54d93432c81490f23a08710"`, undefined);
        await queryRunner.query(`DROP TABLE "pedido"`, undefined);
        await queryRunner.query(`DROP TABLE "producto"`, undefined);
    }

}
