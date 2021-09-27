"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const auth_credentials_dto_1 = require("./dto/auth-credentials.dto");
const login_credentials_dto_1 = require("./dto/login-credentials.dto");
const invite_dto_1 = require("../auth/dto/invite.dto");
const teammate_dto_1 = require("../teammates/dto/teammate.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(authCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }
    signIn(loginCredentialsDto) {
        return this.authService.signIn(loginCredentialsDto);
    }
    sendEmail(projectId, teammateDto) {
        return this.authService.sendEmail(Object.assign(Object.assign({}, teammateDto), { projectId }));
    }
    confirmInvite(inviteId, inviteDto) {
        return this.authService.confirmInvite(inviteDto, inviteId);
    }
    getCurrentUser(headers) {
        const { authorization } = headers;
        const accessToken = authorization.split(' ')[1];
        return this.authService.getCurrentUser(accessToken);
    }
    decodeJwt(token) {
        console.log(token, 'TOKEN');
        return this.authService.decodeJwt(token);
    }
};
__decorate([
    common_1.Post('/signup'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credentials_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post('/signin'),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_credentials_dto_1.LoginCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.Post('/project/:projectId/sendEmail'),
    __param(0, common_1.Param('projectId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, teammate_dto_1.TeammateDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sendEmail", null);
__decorate([
    common_1.Post('/invite/:inviteId'),
    __param(0, common_1.Param('inviteId')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, invite_dto_1.InviteDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "confirmInvite", null);
__decorate([
    common_1.Get('/getCurrentUser'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    common_1.Get('/:token/decodeJwt'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "decodeJwt", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map