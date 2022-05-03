import { MigrationInterface, QueryRunner } from 'typeorm';

export class storesInit1651566480591 implements MigrationInterface {
  name = 'storesInit1651566480591';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "alt_schedule" ("id" SERIAL NOT NULL, "overrideStartDate" date NOT NULL, "overrideEndDate" date NOT NULL, "dayOfWeek" integer NOT NULL, "AltOpenTime" TIME NOT NULL, "AltCloseTime" TIME NOT NULL, "storeId" integer, CONSTRAINT "PK_504dc9b4c076016566b09e8b43e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "addressLine1" character varying(255) NOT NULL, "addressLine2" character varying(255) NOT NULL, "addressReference" character varying(255) NOT NULL, "phoneNumber" character varying(255) NOT NULL, "isDeliveryEnabled" boolean NOT NULL, "isPickupEnabled" boolean NOT NULL, "isSchedulingEnabled" boolean NOT NULL, "productException" boolean NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "dayOfWeek" integer NOT NULL, "OpenTime" TIME NOT NULL, "CloseTime" TIME NOT NULL, "storeId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD CONSTRAINT "FK_fb20f1a443ed4e0995113dd7697" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_cf47e0d73277daf5c40be78aee7" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_cf47e0d73277daf5c40be78aee7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP CONSTRAINT "FK_fb20f1a443ed4e0995113dd7697"`,
    );
    await queryRunner.query(`DROP TABLE "schedule"`);
    await queryRunner.query(`DROP TABLE "store"`);
    await queryRunner.query(`DROP TABLE "alt_schedule"`);
  }
}
