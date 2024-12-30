import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTokenTable1735578932280 implements MigrationInterface {
    name = 'CreateTokenTable1735578932280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "token" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "token" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "expired_at" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "token"
        `);
    }

}
