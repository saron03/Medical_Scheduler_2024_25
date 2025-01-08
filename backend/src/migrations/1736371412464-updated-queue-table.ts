import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedQueueTable1736371412464 implements MigrationInterface {
    name = 'UpdatedQueueTable1736371412464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "queues" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "queues"
            ADD "status" integer NOT NULL DEFAULT '2'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "queues" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "queues"
            ADD "status" boolean NOT NULL DEFAULT true
        `);
    }

}
