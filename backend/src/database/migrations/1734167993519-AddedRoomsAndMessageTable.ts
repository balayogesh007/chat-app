import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRoomsAndMessageTable1734167993519 implements MigrationInterface {
    name = 'AddedRoomsAndMessageTable1734167993519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("m_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying, "user_id" uuid, "room_id" uuid, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_795574b64a13072721f0dee2dae" PRIMARY KEY ("m_id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("room_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "room_name" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a54158a6ef7c66aaa81e7aa2421" PRIMARY KEY ("room_id"))`);
        await queryRunner.query(`CREATE TABLE "user_room_mappings" ("room_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_d0b471864b379df4e6026e83a06" PRIMARY KEY ("room_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb81012924ac7f5913a6b7a2f2" ON "user_room_mappings" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_df20a7b758ce1e694ec14c2512" ON "user_room_mappings" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "unique_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_830a3c1d92614d1495418c46736" FOREIGN KEY ("user_id") REFERENCES "users"("u_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_1dda4fc8dbeeff2ee71f0088ba0" FOREIGN KEY ("room_id") REFERENCES "rooms"("room_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_room_mappings" ADD CONSTRAINT "FK_fb81012924ac7f5913a6b7a2f25" FOREIGN KEY ("room_id") REFERENCES "rooms"("room_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_room_mappings" ADD CONSTRAINT "FK_df20a7b758ce1e694ec14c2512e" FOREIGN KEY ("user_id") REFERENCES "users"("u_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_room_mappings" DROP CONSTRAINT "FK_df20a7b758ce1e694ec14c2512e"`);
        await queryRunner.query(`ALTER TABLE "user_room_mappings" DROP CONSTRAINT "FK_fb81012924ac7f5913a6b7a2f25"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_1dda4fc8dbeeff2ee71f0088ba0"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_830a3c1d92614d1495418c46736"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deleted_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "unique_id" SET NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df20a7b758ce1e694ec14c2512"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb81012924ac7f5913a6b7a2f2"`);
        await queryRunner.query(`DROP TABLE "user_room_mappings"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
