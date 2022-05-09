import {MigrationInterface, QueryRunner} from "typeorm";

export class ticketItemCascadeDelete1651872812617 implements MigrationInterface {
    name = 'ticketItemCascadeDelete1651872812617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_item" DROP CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8"`);
        await queryRunner.query(`ALTER TABLE "ticket_item" ADD CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_item" DROP CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8"`);
        await queryRunner.query(`ALTER TABLE "ticket_item" ADD CONSTRAINT "FK_5ec69cdb2d87cb6eeee2b6cecf8" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
