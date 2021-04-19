import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1615202726329 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user
            ADD COLUMN role VARCHAR NOT NULL,
            ADD COLUMN status VARCHAR NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user
            DROP COLUMN role,
            DROP COLUMN status
        `);
    }

}
