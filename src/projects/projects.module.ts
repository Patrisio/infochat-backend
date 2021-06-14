import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './projects.repository';
import { TariffRepository } from './tariff.repository';
import { ProjectsController } from './projects.controller';

@Module({
  providers: [ProjectsService],
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository,
      TariffRepository,
    ])
  ],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
