import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePatientTable1736249405728 implements MigrationInterface {
    name = 'CreatePatientTable1736249405728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "patients" (
                "patient_id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "email" character varying,
                "phone_number" character varying,
                "date_of_birth" date,
                "gender" character varying,
                "address" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "registered_by" integer,
                CONSTRAINT "PK_1dc2db3a63a0bf2388fbfee86b1" PRIMARY KEY ("patient_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "patients"
            ADD CONSTRAINT "FK_560c0687cebe39c07901392b158" FOREIGN KEY ("registered_by") REFERENCES "user"("user_id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "patients" DROP CONSTRAINT "FK_560c0687cebe39c07901392b158"
        `);
        await queryRunner.query(`
            DROP TABLE "patients"
        `);
    }

}
