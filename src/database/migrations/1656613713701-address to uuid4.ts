import {MigrationInterface, QueryRunner} from "typeorm";

export class addressToUuid41656613713701 implements MigrationInterface {
    name = 'addressToUuid41656613713701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_97c8e3bfa553db2db334030caa9"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_97c8e3bfa553db2db334030caa9" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_97c8e3bfa553db2db334030caa9"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_97c8e3bfa553db2db334030caa9" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
    }

}
