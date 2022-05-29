import {MigrationInterface, QueryRunner} from "typeorm";

export class ticketitemsTagsNullable1653583963979 implements MigrationInterface {
    name = 'ticketitemsTagsNullable1653583963979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "couponId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket_item" ALTER COLUMN "tags" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_item" ALTER COLUMN "tags" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket" ALTER COLUMN "couponId" SET NOT NULL`);
    }

}
