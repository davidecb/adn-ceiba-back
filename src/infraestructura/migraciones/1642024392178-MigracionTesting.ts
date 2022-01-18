import {MigrationInterface, QueryRunner} from "typeorm";

export class MigracionTesting1642024392178 implements MigrationInterface {
    name = 'MigracionTesting1642024392178'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "producto_solicitado" DROP CONSTRAINT "FK_b1778e3734bc51cbc6d4d88644f"`, undefined);
        await queryRunner.query(`ALTER TABLE "producto_solicitado" ADD CONSTRAINT "FK_b1778e3734bc51cbc6d4d88644f" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "producto_solicitado" DROP CONSTRAINT "FK_b1778e3734bc51cbc6d4d88644f"`, undefined);
        await queryRunner.query(`ALTER TABLE "producto_solicitado" ADD CONSTRAINT "FK_b1778e3734bc51cbc6d4d88644f" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
