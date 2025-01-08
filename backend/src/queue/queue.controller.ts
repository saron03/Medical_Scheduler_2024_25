import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/createQueue.dto';
import { UpdateQueueDto } from './dto/updateQueue.dto';
import { Queue } from './queue.entity';

@Controller('v1/queues')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  async findAll(): Promise<Queue[]> {
    return this.queueService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Queue> {
    return this.queueService.findOne(id);
  }

  @Post()
  async create(@Body() createQueueDto: CreateQueueDto): Promise<Queue> {
    return this.queueService.create(createQueueDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQueueDto: UpdateQueueDto,
  ): Promise<Queue> {
    return this.queueService.update(id, updateQueueDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.queueService.remove(id);
  }
}
