import {MigrationInterface, QueryRunner} from "typeorm";

export class createStatusForTicketss1656870310149 implements MigrationInterface {
    name = 'createStatusForTicketss1656870310149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "orderPaid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "orderConfirmed" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "orderPrepared" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "orderReceived" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "orderReceived" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "orderPrepared" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "orderConfirmed" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ALTER COLUMN "orderPaid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
    }

}
