import {MigrationInterface, QueryRunner} from "typeorm";

export class ticketIdIncrementalToUuid1653777647204 implements MigrationInterface {
    name = 'ticketIdIncrementalToUuid1653777647204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_item" DROP CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "PK_d9a0835407701eb86f874474b7c"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ticket_item" DROP COLUMN "ticketId"`);
        await queryRunner.query(`ALTER TABLE "ticket_item" ADD "ticketId" uuid`);
        await queryRunner.query(`ALTER TABLE "ticket_item" ADD CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_item" DROP CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8"`);
        await queryRunner.query(`ALTER TABLE "ticket_item" DROP COLUMN "ticketId"`);
        await queryRunner.query(`ALTER TABLE "ticket_item" ADD "ticketId" integer`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "PK_d9a0835407701eb86f874474b7c"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ticket_item" ADD CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
