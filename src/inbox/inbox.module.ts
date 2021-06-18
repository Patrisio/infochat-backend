import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxController } from './inbox.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesHistoryRepository } from './messagesHistory.repository';
import { UserRepository } from '../auth/user.repository';
import { ChannelRepository } from './channel.repository';
import { ClientRepository } from './client.repository';
import { ChangesHistoryRepository } from './changesHistory.repository';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
  //   PassportModule.register({ defaultStrategy: 'jwt' }),
  //   JwtModule.register({
  //     secret: 'topSecretqwer242',
  //     signOptions: {
  //       expiresIn: 3600,
  //     },
  //   }),
    AuthModule,
    TypeOrmModule.forFeature([
      MessagesHistoryRepository,
      UserRepository,
      ChannelRepository,
      ClientRepository,
      ChangesHistoryRepository,
    ])
  ],
  providers: [
    InboxService,
    // JwtStrategy
  ],
  controllers: [InboxController],
})
export class InboxModule {}
