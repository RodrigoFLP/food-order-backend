import { MigrationInterface, QueryRunner } from 'typeorm';

export class ticketsInit1651567577132 implements MigrationInterface {
  name = 'ticketsInit1651567577132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "couponId" character varying(255) NOT NULL, "totalAmount" numeric(15,4) NOT NULL, "status" character varying(255) NOT NULL, "orderType" character varying(255) NOT NULL, "scheduledDate" date NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "addressId" integer, "storeId" integer, "customerId" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticket_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "portion" jsonb NOT NULL, "tags" jsonb NOT NULL, "totalAmount" numeric(15,4) NOT NULL, "productId" integer, "ticketId" integer, CONSTRAINT "PK_7443afebd911b9d34bf55a02382" PRIMARY KEY ("id"))`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP TABLE "ticket_item"`);
    await queryRunner.query(`DROP TABLE "ticket"`);
  }
}
