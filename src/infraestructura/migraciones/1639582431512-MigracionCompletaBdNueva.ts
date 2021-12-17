import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionCompletaBdNueva1639582431512 implements MigrationInterface {
    name = 'MigracionCompletaBdNueva1639582431512'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE 'producto' ('id' SERIAL NOT NULL, 'nombre' character varying(25) NOT NULL, 'costo' integer NOT NULL, 'tiempo' integer NOT NULL, 'imagen' character varying NOT NULL, 'created_at' TIMESTAMP NOT NULL DEFAULT now(), 'updated_at' TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 'UQ_d86d179360134b4b74bda750664' UNIQUE ('nombre'), CONSTRAINT 'PK_5be023b11909fe103e24c740c7d' PRIMARY KEY ('id'))`, undefined);
        await queryRunner.query(`CREATE TABLE 'producto_solicitado' ('id' SERIAL NOT NULL, 'material' character varying NOT NULL, 'color' character varying NOT NULL, 'acabado' jsonb NOT NULL, 'urgencia' boolean NOT NULL, 'costo' real NOT NULL, 'tiempo' integer NOT NULL, 'created_at' TIMESTAMP NOT NULL DEFAULT now(), 'updated_at' TIMESTAMP NOT NULL DEFAULT now(), 'producto' integer NOT NULL, CONSTRAINT 'REL_f04839ac09e601ca45e8955e47' UNIQUE ('producto'), CONSTRAINT 'PK_cff76f8c8c3ea16224501c45e77' PRIMARY KEY ('id'))`, undefined);
        await queryRunner.query(`CREATE TABLE 'productos_por_pedido' ('id' SERIAL NOT NULL, 'cantidad' integer NOT NULL, 'created_at' TIMESTAMP NOT NULL DEFAULT now(), 'updated_at' TIMESTAMP NOT NULL DEFAULT now(), 'producto_solicitado_id' integer NOT NULL, CONSTRAINT 'REL_acc4053945aa84726bbbd5b8e8' UNIQUE ('producto_solicitado_id'), CONSTRAINT 'PK_42cb4b6d049db650826b7efdc8f' PRIMARY KEY ('id'))`, undefined);
        await queryRunner.query(`CREATE TABLE 'pedido' ('id' SERIAL NOT NULL, 'numeroPedido' character varying(20) NOT NULL, 'direccion' character varying NOT NULL, 'cliente' character varying NOT NULL, 'costo' real NOT NULL, 'tiempo' integer NOT NULL, 'created_at' TIMESTAMP NOT NULL DEFAULT now(), 'updated_at' TIMESTAMP NOT NULL DEFAULT now(), 'productosSolicitadosId' integer, CONSTRAINT 'PK_af8d8b3d07fae559c37f56b3f43' PRIMARY KEY ('id'))`, undefined);
        await queryRunner.query(`CREATE TABLE 'usuario' ('id' SERIAL NOT NULL, 'nombre' character varying NOT NULL, 'clave' character varying NOT NULL, 'created_at' TIMESTAMP NOT NULL DEFAULT now(), 'updated_at' TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 'PK_a56c58e5cabaa04fb2c98d2d7e2' PRIMARY KEY ('id'))`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' ADD CONSTRAINT 'FK_f04839ac09e601ca45e8955e47b' FOREIGN KEY ('producto') REFERENCES 'producto'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'FK_acc4053945aa84726bbbd5b8e81' FOREIGN KEY ('producto_solicitado_id') REFERENCES 'producto_solicitado'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' ADD CONSTRAINT 'FK_8d30169917091c8238bbcdc61e7' FOREIGN KEY ('productosSolicitadosId') REFERENCES 'productos_por_pedido'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'pedido' DROP CONSTRAINT 'FK_8d30169917091c8238bbcdc61e7'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'FK_acc4053945aa84726bbbd5b8e81'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' DROP CONSTRAINT 'FK_f04839ac09e601ca45e8955e47b'`, undefined);
        await queryRunner.query(`DROP TABLE 'usuario'`, undefined);
        await queryRunner.query(`DROP TABLE 'pedido'`, undefined);
        await queryRunner.query(`DROP TABLE 'productos_por_pedido'`, undefined);
        await queryRunner.query(`DROP TABLE 'producto_solicitado'`, undefined);
        await queryRunner.query(`DROP TABLE 'producto'`, undefined);
    }

}
