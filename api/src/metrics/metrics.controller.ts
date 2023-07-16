import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Metrics } from '../models/entities/metrics.entity';
import { CreateMetricsDto } from '../models/dto/create-metrics.dto';
import { UpdateMetricsDto } from '../models/dto/update-metrics.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly MetricsService: MetricsService) {}
  @Post()
  async create(@Body() createMetricsDto: CreateMetricsDto): Promise<Metrics> {
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
  async update(@Param('id') id: string, @Body() updateMetricsDto: UpdateMetricsDto): Promise<Metrics> {
    return this.MetricsService.update(id, updateMetricsDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Metrics> {
    return this.MetricsService.delete(id);
  }

  @Get('query')
  async findWithQuery(
    @Query('dimensions') queryDimensions: string,
    @Query('timeScale') timeScale: string
  ): Promise<Metrics[]> {
    return this.MetricsService.findWithQuery(queryDimensions, timeScale);
  }
}
