import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1651808920503 implements MigrationInterface {
  name = 'init1651808920503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "alt_schedule" ("id" SERIAL NOT NULL, "overrideStartDate" date NOT NULL, "overrideEndDate" date NOT NULL, "dayOfWeek" integer NOT NULL, "AltOpenTime" TIME NOT NULL, "AltCloseTime" TIME NOT NULL, "storeId" integer, CONSTRAINT "PK_504dc9b4c076016566b09e8b43e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "dayOfWeek" integer NOT NULL, "OpenTime" TIME NOT NULL, "CloseTime" TIME NOT NULL, "storeId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "addressLine1" character varying(255) NOT NULL, "addressLine2" character varying(255) NOT NULL, "addressReference" character varying(255) NOT NULL, "phoneNumber" character varying(255) NOT NULL, "isDeliveryEnabled" boolean NOT NULL, "isPickupEnabled" boolean NOT NULL, "isSchedulingEnabled" boolean NOT NULL, "productException" boolean NOT NULL, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "passwordHash" character varying(255) NOT NULL, "salt" character varying(255) NOT NULL, "role" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastLogin" TIMESTAMP WITH TIME ZONE, "customerId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_6c687a8fa35b0ae35ce766b56c" UNIQUE ("customerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phoneNumber" character varying(255) NOT NULL, "birthDate" date NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastLogin" TIMESTAMP WITH TIME ZONE, "receiveAds" boolean NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "state" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "addressLine1" character varying(255) NOT NULL, "addressLine2" character varying(255), "addressReference" character varying(255) NOT NULL, "coordinates" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customerId" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "couponId" character varying(255) NOT NULL, "totalAmount" numeric(15,4) NOT NULL, "status" character varying(255) NOT NULL, "orderType" character varying(255) NOT NULL, "scheduledDate" date NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "addressId" integer, "storeId" integer, "customerId" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticket_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "portion" jsonb NOT NULL, "tags" jsonb NOT NULL, "totalAmount" numeric(15,4) NOT NULL, "productId" integer, "ticketId" integer, CONSTRAINT "PK_7443afebd911b9d34bf55a02382" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "price" numeric(15,4) NOT NULL, "portions" jsonb NOT NULL, "tags" jsonb NOT NULL, "image" character varying(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "image" character varying(255), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category_products_product" ("categoryId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_0b4e34a45516284987c6dbe91cd" PRIMARY KEY ("categoryId", "productId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_90d521137ff8c3e927187bcd27" ON "category_products_product" ("categoryId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee240b247f9f23e5d35854c186" ON "category_products_product" ("productId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD CONSTRAINT "FK_fb20f1a443ed4e0995113dd7697" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_cf47e0d73277daf5c40be78aee7" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_97c8e3bfa553db2db334030caa9" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_44a9ca9eddc5e54f1bda8c123fb" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" ADD CONSTRAINT "FK_8932781487db15d1393b206482e" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket_item" ADD CONSTRAINT "FK_f2b1c08f1ea28c8876b500b91d8" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket_item" ADD CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_products_product" ADD CONSTRAINT "FK_90d521137ff8c3e927187bcd27d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_products_product" ADD CONSTRAINT "FK_ee240b247f9f23e5d35854c186b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_products_product" DROP CONSTRAINT "FK_ee240b247f9f23e5d35854c186b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_products_product" DROP CONSTRAINT "FK_90d521137ff8c3e927187bcd27d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket_item" DROP CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket_item" DROP CONSTRAINT "FK_f2b1c08f1ea28c8876b500b91d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_8932781487db15d1393b206482e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_44a9ca9eddc5e54f1bda8c123fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticket" DROP CONSTRAINT "FK_97c8e3bfa553db2db334030caa9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_cf47e0d73277daf5c40be78aee7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP CONSTRAINT "FK_fb20f1a443ed4e0995113dd7697"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee240b247f9f23e5d35854c186"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_90d521137ff8c3e927187bcd27"`,
    );
    await queryRunner.query(`DROP TABLE "category_products_product"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "ticket_item"`);
    await queryRunner.query(`DROP TABLE "ticket"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "store"`);
    await queryRunner.query(`DROP TABLE "schedule"`);
    await queryRunner.query(`DROP TABLE "alt_schedule"`);
  }
}
