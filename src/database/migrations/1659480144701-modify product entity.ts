import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyProductEntity1659480144701 implements MigrationInterface {
    name = 'modifyProductEntity1659480144701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "portionsTagGroups" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "portionsTagGroups" SET DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "portionsTagGroups" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "portionsTagGroups" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
    }

}
