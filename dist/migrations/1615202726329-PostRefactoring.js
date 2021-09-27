"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRefactoring1615202726329 = void 0;
class PostRefactoring1615202726329 {
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE user
            ADD COLUMN role VARCHAR NOT NULL,
            ADD COLUMN status VARCHAR NOT NULL
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE user
            DROP COLUMN role,
            DROP COLUMN status
        `);
    }
}
exports.PostRefactoring1615202726329 = PostRefactoring1615202726329;
//# sourceMappingURL=1615202726329-PostRefactoring.js.map