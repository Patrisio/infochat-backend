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
exports.TeammatesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_repository_1 = require("../auth/user.repository");
const jwt_1 = require("@nestjs/jwt");
let TeammatesService = class TeammatesService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async getTeammatesByProjectId(projectId) {
        return this.userRepository.getTeammatesByProjectId(projectId);
    }
    async addTeammate(teammateDto) {
        return this.userRepository.addTeammate(teammateDto);
    }
    async updateTeammate(teammateDto, projectId) {
        let token;
        if (teammateDto.role === 'owner') {
            token = await this.jwtService.sign({ email: teammateDto.email });
        }
        return this.userRepository.updateTeammate(teammateDto, token);
    }
    async confirmInvite(inviteDto, inviteId) {
        return this.userRepository.updateTeammateByInviteId(inviteDto, inviteId);
    }
    async deleteTeammate(emailObject) {
        const { email } = emailObject;
        return this.userRepository.deleteTeammate(email);
    }
};
TeammatesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], TeammatesService);
exports.TeammatesService = TeammatesService;
//# sourceMappingURL=teammates.service.js.map