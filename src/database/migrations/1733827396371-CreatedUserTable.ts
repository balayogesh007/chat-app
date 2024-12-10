import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedUserTable1733827396371 implements MigrationInterface {
    name = 'CreatedUserTable1733827396371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("u_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "u_firstname" character varying NOT NULL, "u_lastname" character varying NOT NULL, "u_email_id" character varying NOT NULL, "u_password" character varying NOT NULL, "unique_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_21c9407cca25946ca7ee536abc1" UNIQUE ("u_email_id"), CONSTRAINT "PK_ed9eff0c241ae28139f2e55d3e5" PRIMARY KEY ("u_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
