"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxModule = void 0;
const common_1 = require("@nestjs/common");
const inbox_service_1 = require("./inbox.service");
const inbox_controller_1 = require("./inbox.controller");
const typeorm_1 = require("@nestjs/typeorm");
const messagesHistory_repository_1 = require("./messagesHistory.repository");
const user_repository_1 = require("../auth/user.repository");
const channel_repository_1 = require("./channel.repository");
const client_repository_1 = require("./client.repository");
const changesHistory_repository_1 = require("./changesHistory.repository");
const note_repository_1 = require("./note.repository");
const auth_module_1 = require("../auth/auth.module");
let InboxModule = class InboxModule {
};
InboxModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([
                messagesHistory_repository_1.MessagesHistoryRepository,
                user_repository_1.UserRepository,
                channel_repository_1.ChannelRepository,
                client_repository_1.ClientRepository,
                changesHistory_repository_1.ChangesHistoryRepository,
                note_repository_1.NoteRepository,
            ])
        ],
        providers: [
            inbox_service_1.InboxService,
        ],
        controllers: [inbox_controller_1.InboxController],
    })
], InboxModule);
exports.InboxModule = InboxModule;
//# sourceMappingURL=inbox.module.js.map