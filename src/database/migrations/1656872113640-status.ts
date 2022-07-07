import {MigrationInterface, QueryRunner} from "typeorm";

export class status1656872113640 implements MigrationInterface {
    name = 'status1656872113640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" RENAME COLUMN "status" TO "statusId"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "statusId" uuid`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "UQ_7312ac8aab89dd3586729d97ea0" UNIQUE ("statusId")`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_7312ac8aab89dd3586729d97ea0" FOREIGN KEY ("statusId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_7312ac8aab89dd3586729d97ea0"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "UQ_7312ac8aab89dd3586729d97ea0"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "statusId" character varying(255) NOT NULL DEFAULT 'unpaid'`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ticket" RENAME COLUMN "statusId" TO "status"`);
    }

}
