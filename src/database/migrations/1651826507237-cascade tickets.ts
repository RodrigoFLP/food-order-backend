import {MigrationInterface, QueryRunner} from "typeorm";

export class cascadeTickets1651826507237 implements MigrationInterface {
    name = 'cascadeTickets1651826507237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "addressLine2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "addressReference" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "productException" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "productException" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "addressReference" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "addressLine2" SET NOT NULL`);
    }

}
