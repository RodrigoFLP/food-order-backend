import {MigrationInterface, QueryRunner} from "typeorm";

export class all1660864933024 implements MigrationInterface {
    name = 'all1660864933024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_8932781487db15d1393b206482e"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_97c8e3bfa553db2db334030caa9"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "paymentType" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_97c8e3bfa553db2db334030caa9" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_8932781487db15d1393b206482e" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_8932781487db15d1393b206482e"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_97c8e3bfa553db2db334030caa9"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "paymentType"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_97c8e3bfa553db2db334030caa9" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_8932781487db15d1393b206482e" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
