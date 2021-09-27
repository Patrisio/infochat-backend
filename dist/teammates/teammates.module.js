"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeammatesModule = void 0;
const common_1 = require("@nestjs/common");
const teammates_service_1 = require("./teammates.service");
const teammates_controller_1 = require("./teammates.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../auth/user.repository");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
let TeammatesModule = class TeammatesModule {
};
TeammatesModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: 'topSecretqwer242',
                signOptions: {
                    expiresIn: 36000,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_repository_1.UserRepository])
        ],
        providers: [teammates_service_1.TeammatesService, jwt_strategy_1.JwtStrategy],
        controllers: [teammates_controller_1.TeammatesController],
        exports: [
            jwt_strategy_1.JwtStrategy,
            passport_1.PassportModule
        ],
    })
], TeammatesModule);
exports.TeammatesModule = TeammatesModule;
//# sourceMappingURL=teammates.module.js.map