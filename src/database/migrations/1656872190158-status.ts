import {MigrationInterface, QueryRunner} from "typeorm";

export class status1656872190158 implements MigrationInterface {
    name = 'status1656872190158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "FK_8f51514ac41c017da2dffacd548"`);
        await queryRunner.query(`ALTER TABLE "status" DROP CONSTRAINT "UQ_8f51514ac41c017da2dffacd548"`);
        await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "ticketId"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "status" ADD "ticketId" uuid`);
        await queryRunner.query(`ALTER TABLE "status" ADD CONSTRAINT "UQ_8f51514ac41c017da2dffacd548" UNIQUE ("ticketId")`);
        await queryRunner.query(`ALTER TABLE "status" ADD CONSTRAINT "FK_8f51514ac41c017da2dffacd548" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
