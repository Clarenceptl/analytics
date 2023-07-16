import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricsSchema } from '../models/entities/metrics.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Metrics', schema: MetricsSchema }])],
  controllers: [MetricsController],
  providers: [MetricsService]
})
export class MetricsModule {}
