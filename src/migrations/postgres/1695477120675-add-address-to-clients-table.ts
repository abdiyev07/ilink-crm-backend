import {MigrationInterface, QueryRunner} from "typeorm";

export class addAddressToClientsTable1695477120675 implements MigrationInterface {
    name = 'addAddressToClientsTable1695477120675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "potential_clients" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "csi" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "csi" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "potential_clients" DROP COLUMN "address"`);
    }

}
