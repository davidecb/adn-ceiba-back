import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionColumnaPedido1639692023412 implements MigrationInterface {
    name = 'MigracionColumnaPedido1639692023412';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'pedido' DROP CONSTRAINT 'FK_8d30169917091c8238bbcdc61e7'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' RENAME COLUMN 'productosSolicitadosId' TO 'producto'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' ADD CONSTRAINT 'FK_cd48c06d96f4d9acc027b1d1691' FOREIGN KEY ('producto') REFERENCES 'productos_por_pedido'('id') ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'pedido' DROP CONSTRAINT 'FK_cd48c06d96f4d9acc027b1d1691'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' RENAME COLUMN 'producto' TO 'productosSolicitadosId'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' ADD CONSTRAINT 'FK_8d30169917091c8238bbcdc61e7' FOREIGN KEY ('productosSolicitadosId') REFERENCES 'productos_por_pedido'('id') ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
