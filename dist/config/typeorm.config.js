"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORMConfig = void 0;
exports.ORMConfig = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: 5432,
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "Plotnikov1999",
    database: process.env.POSTGRES_DATABASE || "infochat",
    autoLoadEntities: true,
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map