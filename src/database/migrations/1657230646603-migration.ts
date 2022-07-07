import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1657230646603 implements MigrationInterface {
    name = 'migration1657230646603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`);
    }

}
