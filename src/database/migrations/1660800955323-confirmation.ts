import {MigrationInterface, QueryRunner} from "typeorm";

export class confirmation1660800955323 implements MigrationInterface {
    name = 'confirmation1660800955323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "lastConfirmationEmailSent" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastConfirmationEmailSent"`);
    }

}
