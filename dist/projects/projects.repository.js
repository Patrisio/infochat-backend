"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const projects_entity_1 = require("../entities/projects.entity");
const user_entity_1 = require("../entities/user.entity");
let ProjectRepository = class ProjectRepository extends typeorm_1.Repository {
    async addProject(projectDto) {
        const { name, timezone, email } = projectDto;
        const users = await user_entity_1.User.find({ relations: ['projects'] });
        const foundUser = users.find((user) => user.email === email);
        if (foundUser) {
            try {
                const project = await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(projects_entity_1.Project)
                    .values({ name, timezone })
                    .execute();
                const projectId = project.raw[0].id;
                await typeorm_1.getConnection()
                    .createQueryBuilder()
                    .relation(user_entity_1.User, 'projects')
                    .of(foundUser.id)
                    .add({ id: projectId, name, timezone });
                return { id: projectId };
            }
            catch (error) {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
};
ProjectRepository = __decorate([
    typeorm_1.EntityRepository(projects_entity_1.Project)
], ProjectRepository);
exports.ProjectRepository = ProjectRepository;
//# sourceMappingURL=projects.repository.js.map