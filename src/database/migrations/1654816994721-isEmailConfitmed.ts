import {MigrationInterface, QueryRunner} from "typeorm";

export class isEmailConfitmed1654816994721 implements MigrationInterface {
    name = 'isEmailConfitmed1654816994721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isEmailConfirmed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isEmailConfirmed"`);
    }

}
