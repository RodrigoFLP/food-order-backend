import { MigrationInterface, QueryRunner } from 'typeorm';

export class coordinatesEntityUser21655331247230 implements MigrationInterface {
  name = 'coordinatesEntityUser21655331247230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "coordinates"`);
    await queryRunner.query(`ALTER TABLE "address" ADD "lat" double precision`);
    await queryRunner.query(`ALTER TABLE "address" ADD "lon" double precision`);
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT 'false'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "receiveAds" SET DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "lon"`);
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "lat"`);
    await queryRunner.query(
      `ALTER TABLE "address" ADD "coordinates" character varying(255) NOT NULL`,
    );
  }
}
