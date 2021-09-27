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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_repository_1 = require("./user.repository");
const mailer_1 = require("@nestjs-modules/mailer");
const tariff_entity_1 = require("../entities/tariff.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, mailerService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async signUp(authCredentialsDto) {
        const signUpResponse = await this.userRepository.signUp(authCredentialsDto);
        if (signUpResponse.code === 200) {
            await typeorm_2.getConnection()
                .createQueryBuilder()
                .insert()
                .into(tariff_entity_1.Tariff)
                .values({
                project: signUpResponse.projectId,
            })
                .execute();
        }
        return signUpResponse;
    }
    async signIn(loginCredentialsDto) {
        const { email, password } = loginCredentialsDto;
        const user = await this.userRepository.findOne({ email });
        let users;
        if (user) {
            users = await this.userRepository.find({ relations: ['projects'] });
        }
        else {
            throw new common_1.UnauthorizedException('Такого пользователя не существует');
        }
        const foundUser = users.find((userItem) => userItem.id === user.id);
        let projectId;
        if (foundUser) {
            projectId = foundUser.projects[0].id;
        }
        const isCorrectPassword = await this.userRepository.validateUserPassword(password, user);
        if (isCorrectPassword) {
            const accessToken = await this.jwtService.sign({ email });
            return {
                accessToken,
                projectId,
            };
        }
        else {
            throw new common_1.UnauthorizedException('Неверный логин или пароль');
        }
    }
    async confirmInvite(inviteDto, inviteId) {
        const { email } = await this.jwtService.verify(inviteId);
        return this.userRepository.updateTeammateByInviteId(inviteDto, email);
    }
    async getCurrentUser(accessToken) {
        const { email } = await this.jwtService.verify(accessToken);
        return this.userRepository.getCurrentUser(email);
    }
    async sendEmail(teammateDto) {
        const { projectId, email } = teammateDto;
        const payload = { email };
        const accessToken = await this.jwtService.sign(payload);
        this
            .mailerService
            .sendMail({
            to: email,
            from: 'noreply@nestjs.com',
            subject: 'Testing Nest MailerModule ✔',
            text: 'welcome',
            html: `<b>Присоединяйтесь к команде infochat</b><br /><a href="http://localhost:3000/project/${projectId}/teammate/invite/${accessToken}">Присоединиться</a>`,
        })
            .then(() => {
            console.log('EMAIL HAVE SENT SUCCESSFULLY');
        })
            .catch((err) => {
            console.log('Erorr');
            console.log(err);
        });
        return {
            code: 200,
            status: 'success',
        };
    }
    async decodeJwt(token) {
        const decodeToken = await this.jwtService.decode(token);
        return decodeToken;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map