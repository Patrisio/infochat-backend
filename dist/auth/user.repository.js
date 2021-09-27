"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const projects_entity_1 = require("../entities/projects.entity");
const bcrypt = require("bcrypt");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async signUp(authCredentialsDto) {
        console.log('CONTROLLER');
        const { username, phone, email, password, role, status } = authCredentialsDto;
        const user = new user_entity_1.User();
        const project = new projects_entity_1.Project();
        user.username = username;
        user.phone = phone;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.role = role;
        user.status = status;
        user.balance = 0;
        try {
            project.name = 'project_name333';
            await user.save();
            project.users = [user];
            const projectData = await project.save();
            user.projects = [project];
            await user.save();
            return {
                code: 200,
                status: 'success',
                projectId: projectData.id
            };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Пользователь с таким email уже существует');
            }
            else {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async validateUserPassword(password, user) {
        return await user.validatePassword(password);
    }
    async getTeammatesByProjectId(projectId) {
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
        const projects = await projectRepository.find({ relations: ["users"] });
        const project = projects.find((project) => project.id === parseInt(projectId));
        const teammates = project.users;
        const formattedTeammates = [];
        for (let { id, username, email, status, role, isOnline } of teammates) {
            const operator = {
                id, username, email, status, role, isOnline,
            };
            formattedTeammates.push(operator);
        }
        return formattedTeammates;
    }
    async updateTeammate(teammateDto, token) {
        const { password, oldEmail } = teammateDto, updatedTeammateData = __rest(teammateDto, ["password", "oldEmail"]);
        let teammateData = updatedTeammateData;
        if (password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await this.hashPassword(password, salt);
            teammateData = Object.assign(Object.assign({}, teammateData), { salt, password: hashedPassword });
        }
        try {
            await typeorm_1.getConnection()
                .createQueryBuilder()
                .update(user_entity_1.User)
                .set(teammateData)
                .where('email = :oldEmail', { oldEmail })
                .execute();
            return {
                code: 200,
                token: token ? token : null,
                status: 'success',
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async addTeammate(teammateDto) {
        const { projectId, email, role, status, username } = teammateDto;
        const user = new user_entity_1.User();
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
        const projects = await projectRepository.find({ relations: ["users"] });
        const project = projects.find((project) => project.id === parseInt(projectId));
        user.email = email;
        user.role = role;
        user.status = status;
        user.username = username;
        try {
            await user.save();
            const users = await this.find({ relations: ["projects"] });
            const foundUser = users.find((user) => user.email === email);
            project.users = [...project.users, user];
            project.save();
            foundUser.projects = [...foundUser.projects, project];
            await user.save();
            console.log(foundUser.projects, 'user.projects');
            return {
                code: 200,
                status: 'success'
            };
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Пользователь с таким email уже существует');
            }
            else {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async updateTeammateByInviteId(inviteDto, email) {
        const { username, password, projectId } = inviteDto;
        const projectRepository = await typeorm_1.getConnection().getRepository(projects_entity_1.Project);
        const projects = await projectRepository.find({ relations: ["users"] });
        const project = projects.find((project) => project.id === parseInt(projectId));
        const user = await this.findOne({ email });
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.username = username;
        user.status = 'active';
        try {
            await user.save();
            project.users = [...project.users, user];
            project.save();
            return {
                statusCode: 200,
                status: 'success',
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteTeammate(email) {
        const result = await this.delete({ email });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Teammate with email "${email}" not found`);
        }
        return {
            code: 200,
            status: 'success'
        };
    }
    async getCurrentUser(email) {
        const users = await this.find({ relations: ["projects"] });
        const { username, phone, role, status, timezone, projects, balance, isOnline, } = users.find((user) => user.email === email);
        const resultProjects = [];
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            project.users = await typeorm_1.getConnection()
                .createQueryBuilder()
                .relation(projects_entity_1.Project, 'users')
                .of(project)
                .loadMany();
            resultProjects.push({
                id: project.id,
                name: project.name,
                teammatesCount: project.users.length,
            });
        }
        return {
            username,
            phone,
            role,
            status,
            email,
            timezone,
            balance,
            isOnline,
            projects: resultProjects,
        };
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    between(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map