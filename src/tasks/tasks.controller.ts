import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TaskCreationDto } from './dto/task-creation-dto'
import { Task } from './task.entity'
import { DeleteResult } from 'typeorm'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return await this.tasksService.getTasks()
  }

  @Get('/:id')
  async getTask(@Param('id') id: string): Promise<Task> {
    console.log('id: ', id)
    return await this.tasksService.getTaskFromDb(id)
  }

  @Post()
  createTask(@Body() model: TaskCreationDto): Promise<Task> {
    if (model.title === undefined) {
      throw new BadRequestException(model)
    }
    return this.tasksService.createTask(model.title)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<DeleteResult> {
    if (id?.trim().length === 0) {
      throw Error('Bad request')
    }
    return this.tasksService.deleteTask(id)
  }
}
