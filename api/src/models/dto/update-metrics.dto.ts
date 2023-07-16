import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMetricsDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsNumber()
  readonly value?: number;

  @IsOptional()
  @IsString()
  readonly queryDimensions?: string;

  @IsOptional()
  @IsString()
  readonly timeScale?: string;

  @IsOptional()
  @IsEnum(['absolute', 'rate'])
  readonly dataType?: string;

  @IsOptional()
  @IsEnum(['KPI', 'Graph', 'Heatmap'])
  readonly visualizationType?: string;
}
