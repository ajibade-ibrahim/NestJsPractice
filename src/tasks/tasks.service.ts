import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskStatus } from './task.model'
import { v4 } from 'uuid'
import { TasksRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { DeleteResult } from 'typeorm'

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: v4(), title: 'Create Models', status: TaskStatus.OPEN },
    { id: v4(), title: 'Create Controllers', status: TaskStatus.OPEN },
    { id: v4(), title: 'Create Database', status: TaskStatus.OPEN }
  ]

  constructor(
    @InjectRepository(Task) private taskRepository: TasksRepository
  ) {}

  async getTasks(): Promise<Task[]> {
    return (await this.taskRepository.query('select * from "Tasks"')) as Task[]
  }

  async getAllTasks(): Promise<Task[]> {
    const builder = this.taskRepository.createQueryBuilder()
    return builder.getMany()
  }

  putTask(title: string): Task {
    const task = {
      id: v4(),
      title,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task
  }

  getTask(id: string): Task {
    const task = this.tasks.find((task) => task.id === id)
    if (task === undefined) {
      throw new NotFoundException(`Task with id:${id} was not found.`)
    }
    console.log(task)
    return task
  }

  async getTaskFromDb(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id }
    })

    if (task === null) {
      throw new NotFoundException(`Task with id:${id} was not found.`)
    }

    return task
  }

  async deleteTask(id: string): Promise<DeleteResult> {
    return await this.taskRepository.delete(id)

    // this.tasks.find((item, index, tasks) => {
    //   if (item.id === id) {
    //     tasks.splice(index, 1)
    //     foundItem = true
    //     return true
    //   }
    //   return false
    // })
    //
    // if (!foundItem) {
    //   throw new NotFoundException(`Task with id:${id} was not found.`)
    // }
  }

  async createTask(title: string): Promise<Task> {
    const newTask = this.taskRepository.create({
      status: TaskStatus.OPEN,
      title
    })

    return this.taskRepository.save(newTask)
  }
}
