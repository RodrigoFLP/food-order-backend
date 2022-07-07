import {MigrationInterface, QueryRunner} from "typeorm";

export class createStatusForTickets1656870033322 implements MigrationInterface {
    name = 'createStatusForTickets1656870033322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "status" ADD "orderPlaced" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "status" ADD "orderPaid" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ADD "orderConfirmed" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ADD "orderPrepared" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ADD "orderReceived" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "status" ADD "ticketId" uuid`);
        await queryRunner.query(`ALTER TABLE "status" ADD CONSTRAINT "UQ_8f51514ac41c017da2dffacd548" UNIQUE ("ticketId")`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "status" ADD CONSTRAINT "FK_8f51514ac41c017da2dffacd548" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "FK_8f51514ac41c017da2dffacd548"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "UQ_8f51514ac41c017da2dffacd548"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "ticketId"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "orderReceived"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "orderPrepared"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "orderConfirmed"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "orderPaid"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "orderPlaced"`);
        await queryRunner.query(`ALTER TABLE "status" ADD "title" character varying NOT NULL`);
    }

}
