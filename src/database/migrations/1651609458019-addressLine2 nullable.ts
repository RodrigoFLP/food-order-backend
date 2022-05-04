import {MigrationInterface, QueryRunner} from "typeorm";

export class addressLine2Nullable1651609458019 implements MigrationInterface {
    name = 'addressLine2Nullable1651609458019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "lastLogin" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "addressLine2" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "addressLine2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "lastLogin" SET NOT NULL`);
    }

}
