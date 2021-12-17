import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionCambioProdSolicitado41639611188372 implements MigrationInterface {
    name = 'MigracionCambioProdSolicitado41639611188372'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' DROP COLUMN 'costo'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' ADD 'costo' integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' DROP COLUMN 'tiempo'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' ADD 'tiempo' real NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' DROP COLUMN 'tiempo'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' ADD 'tiempo' integer NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' DROP COLUMN 'costo'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' ADD 'costo' real NOT NULL`, undefined);
    }

}
