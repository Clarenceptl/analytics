import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller({ path: 'tags', version: '1' })
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  async createTag(@Req() req: any, @Body() data: { comment: string }) {
    return await this.tagService.createTag(req?.user, data?.comment);
  }

  @Post()
  async deleteTag(@Req() req: any, @Body() id: string) {
    return await this.tagService.desativate(req?.user, id);
  }

  @Get()
  async getTags(@Req() req: any) {
    return await this.tagService.getTags(req?.user?._id);
  }
}
