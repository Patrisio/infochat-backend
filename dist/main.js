"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const whitelist = ['https://thirsty-kirch-c8b82a.netlify.app', 'http://localhost:3001', 'https://infochat-production.herokuapp.com'];
    app.enableCors({
        origin: 'https://thirsty-kirch-c8b82a.netlify.app',
        methods: 'GET,POST',
    });
    await app.listen(process.env.PORT || 3005);
}
bootstrap();
//# sourceMappingURL=main.js.map