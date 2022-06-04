import {MigrationInterface, QueryRunner} from "typeorm";

export class areasAndCoordinatesEntitiess1654322819755 implements MigrationInterface {
    name = 'areasAndCoordinatesEntitiess1654322819755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coordinate" ("id" SERIAL NOT NULL, "lat" double precision NOT NULL, "lon" double precision NOT NULL, "areaId" integer, CONSTRAINT "PK_c7f6c82f80f35a69eea93f36f8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "area" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL, "storeId" integer, CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coordinate" ADD CONSTRAINT "FK_1b57a9dbbfa9494ee5d5f8abdfb" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "area" ADD CONSTRAINT "FK_24a5ea44168d905e5deb91d4c56" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "area" DROP CONSTRAINT "FK_24a5ea44168d905e5deb91d4c56"`);
        await queryRunner.query(`ALTER TABLE "coordinate" DROP CONSTRAINT "FK_1b57a9dbbfa9494ee5d5f8abdfb"`);
        await queryRunner.query(`DROP TABLE "area"`);
        await queryRunner.query(`DROP TABLE "coordinate"`);
    }

}
