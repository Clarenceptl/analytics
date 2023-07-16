import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsDto } from '../models/dto/metrics.dto';
import { Metrics } from '../models/entities/metrics.entity';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly MetricsService: MetricsService) {}
  @Post()
  async create(@Body() createMetricsDto: MetricsDto): Promise<Metrics> {
    return this.MetricsService.create(createMetricsDto);
  }

  @Get()
  async findAll(): Promise<Metrics[]> {
    return this.MetricsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Metrics> {
    return this.MetricsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMetricsDto: MetricsDto): Promise<Metrics> {
    return this.MetricsService.update(id, updateMetricsDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Metrics> {
    return this.MetricsService.delete(id);
  }
}
