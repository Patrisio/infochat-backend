import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMConfig } from './config/typeorm.config';
import { InboxModule } from './inbox/inbox.module';
import { ChatGateway } from './chat.gateway';
import { MailerModule } from '@nestjs-modules/mailer';
import { TeammatesModule } from './teammates/teammates.module';
import { InboxGateway } from './inbox.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    AuthModule,
    InboxModule,
    TeammatesModule,
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        auth: {
          user: 'project.1',
          pass: 'secret.1'
        }
      },
      
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, InboxGateway],
})
export class AppModule {}
