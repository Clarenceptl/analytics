import { IsNumber, IsString } from 'class-validator';

export class MetricsDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly value: number;
}
