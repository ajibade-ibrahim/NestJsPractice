import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task } from './task.model'
import { TaskCreationDto } from './dto/task-creation-dto'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.tasksService.getTasks()
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Task {
    console.log('id: ', id)
    const task = this.tasksService.getTask(id)
    return task == null ? null : task
  }

  @Post()
  createTask(@Body() model: TaskCreationDto) {
    return this.tasksService.putTask(model.title)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    if (id?.trim().length === 0) {
      throw Error('Bad request')
    }
    return this.tasksService.deleteTask(id)
  }
}
