import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusEntity1652990057324 implements MigrationInterface {
    name = 'addStatusEntity1652990057324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" RENAME COLUMN "status" TO "statusId"`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "statusId" integer`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_7312ac8aab89dd3586729d97ea0" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_7312ac8aab89dd3586729d97ea0"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "statusId" character varying(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`ALTER TABLE "ticket" RENAME COLUMN "statusId" TO "status"`);
    }

}
