import {MigrationInterface, QueryRunner} from "typeorm";

export class addUidAndSubProviderToOrder1695480958626 implements MigrationInterface {
    name = 'addUidAndSubProviderToOrder1695480958626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "client_uid" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "sub_provider" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "sub_provider"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "client_uid"`);
    }

}
