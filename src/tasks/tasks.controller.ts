import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task } from './task.model'

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
    const task = this.tasksService.getTask(Number(id))
    return task == null ? null : task
  }

  @Post()
  createTask(@Body() model: { title: string }) {
    console.log('model: ', model)
    if (model?.title?.length < 1) {
      throw Error('Bad request')
    }

    return this.tasksService.putTask(model.title)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: unknown) {
    const taskId = Number(id)
    if (isNaN(taskId)) {
      throw Error('Bad request')
    }
    return this.tasksService.deleteTask(taskId)
  }
}
