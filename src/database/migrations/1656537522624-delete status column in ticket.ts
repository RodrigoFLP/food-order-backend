import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteStatusColumnInTicket1656537522624 implements MigrationInterface {
    name = 'deleteStatusColumnInTicket1656537522624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_7312ac8aab89dd3586729d97ea0"`);
        await queryRunner.query(`ALTER TABLE "ticket" RENAME COLUMN "statusId" TO "status"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "status" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "status" integer`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ticket" RENAME COLUMN "status" TO "statusId"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_7312ac8aab89dd3586729d97ea0" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
