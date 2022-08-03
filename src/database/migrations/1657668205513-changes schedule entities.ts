import { MigrationInterface, QueryRunner } from 'typeorm';

export class changesScheduleEntities1657668205513
  implements MigrationInterface
{
  name = 'changesScheduleEntities1657668205513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP COLUMN "AltOpenTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP COLUMN "AltCloseTime"`,
    );
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "OpenTime"`);
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "CloseTime"`);
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD "altOpenTime" TIME WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD "altCloseTime" TIME WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "openTime" TIME WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "closeTime" TIME WITH TIME ZONE NOT NULL`,
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
    await queryRunner.query(`ALTER TABLE "schedule" DROP COLUMN "openTime"`);
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP COLUMN "altCloseTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" DROP COLUMN "altOpenTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "CloseTime" TIME NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD "OpenTime" TIME NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD "AltCloseTime" TIME NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "alt_schedule" ADD "AltOpenTime" TIME NOT NULL`,
    );
  }
}
