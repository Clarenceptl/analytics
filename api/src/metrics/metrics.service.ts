import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metrics } from '../models/entities/metrics.entity';
import { CreateMetricsDto } from '../models/dto/create-metrics.dto';
import { UpdateMetricsDto } from '../models/dto/update-metrics.dto';

@Injectable()
export class MetricsService {
  constructor(@InjectModel('Metrics') private readonly metricsModels: Model<Metrics>) {}

  async create(createMetricsDto: CreateMetricsDto): Promise<Metrics> {
    const createdMetrics = new this.metricsModels(createMetricsDto);
    return createdMetrics.save();
  }

  async findAll(): Promise<Metrics[]> {
    return this.metricsModels.find().exec();
  }

  async findOne(id: string): Promise<Metrics> {
    return this.metricsModels.findById(id).exec();
  }

  async update(id: string, updateMetricsDto: UpdateMetricsDto): Promise<Metrics> {
    return this.metricsModels.findByIdAndUpdate(id, updateMetricsDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Metrics> {
    return this.metricsModels.findByIdAndRemove(id).exec();
  }

  async findWithQuery(queryDimensions: string, timeScale: string): Promise<Metrics[]> {
    const parsedDimensions = JSON.parse(queryDimensions);
    const parsedTimeScale = JSON.parse(timeScale);

    const query = {
      ...parsedDimensions, // Add conditions based on the parsed query dimensions
      createdAt: {
        $gte: new Date(parsedTimeScale.startTime),
        $lte: new Date(parsedTimeScale.endTime)
      }
    };

    return this.metricsModels.find(query).exec();
  }
}
