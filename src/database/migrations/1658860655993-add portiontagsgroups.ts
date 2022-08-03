import {MigrationInterface, QueryRunner} from "typeorm";

export class addPortiontagsgroups1658860655993 implements MigrationInterface {
    name = 'addPortiontagsgroups1658860655993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "portionsTagGroups" jsonb`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "portionsTagGroups"`);
    }

}
