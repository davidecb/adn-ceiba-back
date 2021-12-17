import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionProdXPedCascade1639696764543 implements MigrationInterface {
    name = 'MigracionProdXPedCascade1639696764543'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'FK_f60e1ef4a5c36192a514d5e2a5d'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'FK_f60e1ef4a5c36192a514d5e2a5d' FOREIGN KEY ('pedido') REFERENCES 'pedido'('id') ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' DROP CONSTRAINT 'FK_f60e1ef4a5c36192a514d5e2a5d'`, undefined);
        await queryRunner.query(`ALTER TABLE 'productos_por_pedido' ADD CONSTRAINT 'FK_f60e1ef4a5c36192a514d5e2a5d' FOREIGN KEY ('pedido') REFERENCES 'pedido'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
