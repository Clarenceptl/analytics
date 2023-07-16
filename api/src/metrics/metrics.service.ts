import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metrics } from '../models/entities/metrics.entity';
import { MetricsDto } from '../models/dto/metrics.dto';

@Injectable()
export class MetricsService {
  constructor(@InjectModel('Metrics') private readonly metricsModels: Model<Metrics>) {}

  async create(createMetricsDto: MetricsDto): Promise<Metrics> {
    const createdMetrics = new this.metricsModels(createMetricsDto);
    return createdMetrics.save();
  }

  async findAll(): Promise<Metrics[]> {
    return this.metricsModels.find().exec();
  }

  async findOne(id: string): Promise<Metrics> {
    return this.metricsModels.findById(id).exec();
  }

  async update(id: string, updateMetricsDto: MetricsDto): Promise<Metrics> {
    return this.metricsModels.findByIdAndUpdate(id, updateMetricsDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Metrics> {
    return this.metricsModels.findByIdAndRemove(id).exec();
  }
}
