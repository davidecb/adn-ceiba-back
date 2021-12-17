import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionPedido1639622931755 implements MigrationInterface {
    name = 'MigracionPedido1639622931755'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'FK_acc4053945aa84726bbbd5b8e81'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' DROP CONSTRAINT 'FK_8d30169917091c8238bbcdc61e7'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' ADD 'estado' character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'FK_acc4053945aa84726bbbd5b8e81' FOREIGN KEY ('producto_solicitado_id') REFERENCES 'producto_solicitado'('id') ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' ADD CONSTRAINT 'FK_8d30169917091c8238bbcdc61e7' FOREIGN KEY ('productosSolicitadosId') REFERENCES 'productos_por_pedido'('id') ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'pedido' DROP CONSTRAINT 'FK_8d30169917091c8238bbcdc61e7'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'FK_acc4053945aa84726bbbd5b8e81'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' DROP COLUMN 'estado'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' ADD CONSTRAINT 'FK_8d30169917091c8238bbcdc61e7' FOREIGN KEY ('productosSolicitadosId') REFERENCES 'productos_por_pedido'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'FK_acc4053945aa84726bbbd5b8e81' FOREIGN KEY ('producto_solicitado_id') REFERENCES 'producto_solicitado'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
