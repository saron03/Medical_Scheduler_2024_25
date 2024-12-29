import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1735440831782 implements MigrationInterface {
    name = 'NewMigration1735440831782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "roles" (
                "role_id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"),
                CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("role_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "roles"
        `);
    }

}
