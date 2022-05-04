import {MigrationInterface, QueryRunner} from "typeorm";

export class categoriesNotNull1651624910751 implements MigrationInterface {
    name = 'categoriesNotNull1651624910751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "description" SET NOT NULL`);
    }

}
