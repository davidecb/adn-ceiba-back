import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionProductosPorPedido1639693464074 implements MigrationInterface {
    name = 'MigracionProductosPorPedido1639693464074'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'FK_acc4053945aa84726bbbd5b8e81'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' DROP CONSTRAINT 'FK_cd48c06d96f4d9acc027b1d1691'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'REL_acc4053945aa84726bbbd5b8e8'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP COLUMN 'producto_solicitado_id'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' DROP COLUMN 'producto'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD 'pedido' integer`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD 'producto' integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'UQ_badb89dce4578cb0dcddba3050f' UNIQUE ('producto')`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'FK_f60e1ef4a5c36192a514d5e2a5d' FOREIGN KEY ('pedido') REFERENCES 'pedido'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'FK_badb89dce4578cb0dcddba3050f' FOREIGN KEY ('producto') REFERENCES 'producto_solicitado'('id') ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'FK_badb89dce4578cb0dcddba3050f'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'FK_f60e1ef4a5c36192a514d5e2a5d'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'UQ_badb89dce4578cb0dcddba3050f'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP COLUMN 'producto'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP COLUMN 'pedido'`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' ADD 'producto' integer`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD 'producto_solicitado_id' integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'REL_acc4053945aa84726bbbd5b8e8' UNIQUE ('producto_solicitado_id')`, undefined);
        await queryRunner.query(`ALTER TABLE 'pedido' ADD CONSTRAINT 'FK_cd48c06d96f4d9acc027b1d1691' FOREIGN KEY ('producto') REFERENCES 'productos_por_pedido'('id') ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'FK_acc4053945aa84726bbbd5b8e81' FOREIGN KEY ('producto_solicitado_id') REFERENCES 'producto_solicitado'('id') ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
