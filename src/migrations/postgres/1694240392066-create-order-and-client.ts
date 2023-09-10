import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrderAndClient1694240392066 implements MigrationInterface {
    name = 'createOrderAndClient1694240392066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "fixed_at" TIMESTAMP, "contact_phone_number" character varying(12) NOT NULL, "activation_at" TIMESTAMP, "work_type" character varying NOT NULL, "breakdown_reason" text, "is_free" boolean NOT NULL DEFAULT true, "client_type" character varying NOT NULL, "status" character varying NOT NULL, "csi" character varying, "executors" text, "address" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "potential_clients" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "processed_employee_name" character varying NOT NULL, "tariff_name" character varying NOT NULL, "phone_number" character varying NOT NULL, "has_tv" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_0b06e600633ce7b92c07b4cf65b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "potential_clients"`);
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
