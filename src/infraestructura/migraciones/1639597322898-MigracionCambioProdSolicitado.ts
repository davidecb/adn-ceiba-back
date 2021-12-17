import {MigrationInterface, QueryRunner} from 'typeorm';

export class MigracionCambioProdSolicitado1639597322898 implements MigrationInterface {
    name = 'MigracionCambioProdSolicitado1639597322898'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' DROP CONSTRAINT 'FK_f04839ac09e601ca45e8955e47b'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' RENAME COLUMN 'producto' TO 'producto_id'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' RENAME CONSTRAINT 'REL_f04839ac09e601ca45e8955e47' TO 'UQ_b1778e3734bc51cbc6d4d88644f'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' ADD CONSTRAINT 'FK_b1778e3734bc51cbc6d4d88644f' FOREIGN KEY ('producto_id') REFERENCES 'producto'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' DROP CONSTRAINT 'FK_b1778e3734bc51cbc6d4d88644f'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' RENAME CONSTRAINT 'UQ_b1778e3734bc51cbc6d4d88644f' TO 'REL_f04839ac09e601ca45e8955e47'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' RENAME COLUMN 'producto_id' TO 'producto'`, undefined);
        await queryRunner.query(`ALTER TABLE 'producto_solicitado' ADD CONSTRAINT 'FK_f04839ac09e601ca45e8955e47b' FOREIGN KEY ('producto') REFERENCES 'producto'('id') ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
