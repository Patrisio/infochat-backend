import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { TemplateRepository } from './template.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateRepository])
  ],
  providers: [TemplatesService],
  controllers: [TemplatesController],
})
export class TemplatesModule {}
