import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableScheduledDateTicket1656556340333 implements MigrationInterface {
    name = 'nullableScheduledDateTicket1656556340333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" SET DEFAULT 'unpaid'`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "scheduledDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "scheduledDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
    }

}
