import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionProductosPorPedidoEstruc1639670534343 implements MigrationInterface {
    name = 'MigracionProductosPorPedidoEstruc1639670534343';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD 'pedido' integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP COLUMN 'pedido'`, undefined);
    }

}
