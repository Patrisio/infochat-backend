import { Module } from '@nestjs/common';
import { TeammatesService } from './teammates.service';
import { TeammatesController } from './teammates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [TeammatesService],
  controllers: [TeammatesController],
})
export class TeammatesModule {}
