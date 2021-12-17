import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionCambioProdSolicitado31639600564457 implements MigrationInterface {
    name = 'MigracionCambioProdSolicitado31639600564457'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' DROP CONSTRAINT 'FK_133ccf8beccac7e3f3c1fe975e2'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' RENAME COLUMN 'productoId' TO 'producto_id'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' ADD CONSTRAINT 'FK_b1778e3734bc51cbc6d4d88644f' FOREIGN KEY ('producto_id') REFERENCES 'producto'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' DROP CONSTRAINT 'FK_b1778e3734bc51cbc6d4d88644f'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' RENAME COLUMN 'producto_id' TO 'productoId'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' ADD CONSTRAINT 'FK_133ccf8beccac7e3f3c1fe975e2' FOREIGN KEY ('productoId') REFERENCES 'producto'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
