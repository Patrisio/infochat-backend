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
import { ChannelsController } from './channels/channels.controller';
import { ChannelsModule } from './channels/channels.module';
import { TemplatesController } from './templates/templates.controller';
import { TemplatesModule } from './templates/templates.module';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsModule } from './projects/projects.module';

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
      // transport: {
      //   host: 'smtp-relay.sendinblue.com',
      //   port: 587,
      //   auth: {
      //     user: 'bugvfyctdx56c7v8@rambler.ru',
      //     pass: 'CvMtGHWUTK5NOxwj'
      //   }
      // },
      
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      }
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'build'),
    // }),
    ChannelsModule,
    TemplatesModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, InboxGateway],
})
export class AppModule {}
