import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1734259545001 implements MigrationInterface {
    name = 'UpdateUserTable1734259545001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_social_login" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "u_password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "u_password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_social_login"`);
    }

}
