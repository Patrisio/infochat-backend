"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const inbox_module_1 = require("./inbox/inbox.module");
const chat_gateway_1 = require("./chat.gateway");
const mailer_1 = require("@nestjs-modules/mailer");
const teammates_module_1 = require("./teammates/teammates.module");
const inbox_gateway_1 = require("./inbox.gateway");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const channels_module_1 = require("./channels/channels.module");
const templates_module_1 = require("./templates/templates.module");
const projects_module_1 = require("./projects/projects.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.ORMConfig),
            auth_module_1.AuthModule,
            inbox_module_1.InboxModule,
            teammates_module_1.TeammatesModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'localhost',
                    port: 1025,
                    auth: {
                        user: 'project.1',
                        pass: 'secret.1'
                    }
                },
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>',
                }
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'build'),
            }),
            channels_module_1.ChannelsModule,
            templates_module_1.TemplatesModule,
            projects_module_1.ProjectsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, chat_gateway_1.ChatGateway, inbox_gateway_1.InboxGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map