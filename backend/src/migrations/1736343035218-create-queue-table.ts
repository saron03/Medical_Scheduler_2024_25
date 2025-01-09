import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQueueTable1736343035218 implements MigrationInterface {
    name = 'CreateQueueTable1736343035218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "queues" (
                "queue_id" SERIAL NOT NULL,
                "status" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "patient_id" integer NOT NULL,
                "doctor_id" integer NOT NULL,
                CONSTRAINT "PK_9c86e57455f479c205741ecb942" PRIMARY KEY ("queue_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "queues"
            ADD CONSTRAINT "FK_f7edfc4fe9f2a59335dde80ab6f" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "queues"
            ADD CONSTRAINT "FK_8b7361114408cbadbe6fc91ff40" FOREIGN KEY ("doctor_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "queues" DROP CONSTRAINT "FK_8b7361114408cbadbe6fc91ff40"
        `);
        await queryRunner.query(`
            ALTER TABLE "queues" DROP CONSTRAINT "FK_f7edfc4fe9f2a59335dde80ab6f"
        `);
        await queryRunner.query(`
            DROP TABLE "queues"
        `);
    }

}
