"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const whitelist = ['https://thirsty-kirch-c8b82a.netlify.app', 'https://thirsty-kirch-c8b82a.netlify.app/', 'http://localhost:3001', 'https://infochat-production.herokuapp.com'];
    console.log(whitelist, 'whitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelistwhitelist');
    app.enableCors({
        origin: function (origin, callback) {
            console.log(origin, 'originoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginoriginorigin');
            if (!origin || whitelist.indexOf(origin) !== -1) {
                console.log("allowed cors for:", origin);
                callback(null, true);
            }
            else {
                console.log("blocked cors for:", origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,POST',
    });
    await app.listen(process.env.PORT || 3005);
}
bootstrap();
//# sourceMappingURL=main.js.map