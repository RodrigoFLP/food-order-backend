import { MigrationInterface, QueryRunner } from 'typeorm';

export class changesScheduleEntities1657668927899
  implements MigrationInterface
{
  name = 'changesScheduleEntities1657668927899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP COLUMN "altOpenTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD "altOpenTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP COLUMN "altCloseTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD "altCloseTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "openTime"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "openTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "closeTime"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "closeTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "closeTime"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "closeTime" TIME WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "openTime"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "openTime" TIME WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP COLUMN "altCloseTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD "altCloseTime" TIME WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP COLUMN "altOpenTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD "altOpenTime" TIME WITH TIME ZONE NOT NULL`,
    );
  }
}
