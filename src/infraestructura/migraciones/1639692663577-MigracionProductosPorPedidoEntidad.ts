import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionProductosPorPedidoEntidad1639692663577 implements MigrationInterface {
    name = 'MigracionProductosPorPedidoEntidad1639692663577';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP COLUMN 'pedido'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD 'pedido' integer NOT NULL`, undefined);
    }

}
