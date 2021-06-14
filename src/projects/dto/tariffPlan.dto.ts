import { IsNumber } from 'class-validator';

export class TariffPlanDto {
  @IsNumber()
  operatorsCount: number;

  @IsNumber()
  templatesCount: number;

  @IsNumber()
  infochatLinkCount: number;

  @IsNumber()
  chatCount: number;
}