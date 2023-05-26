import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import { v4 } from 'uuid'

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: v4(), title: 'Create Models', status: TaskStatus.OPEN },
    { id: v4(), title: 'Create Controllers', status: TaskStatus.OPEN },
    { id: v4(), title: 'Create Database', status: TaskStatus.OPEN }
  ]

  getTasks() {
    return this.tasks
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

  getTask(id: string): Task | undefined {
    const task = this.tasks.find((task) => task.id === id)
    if (task === undefined) {
      throw new NotFoundException(`Task with id:${id} was not found.`)
    }
    console.log(task)
    return task
  }

  deleteTask(id: string) {
    console.log(id)
    let foundItem = false

    this.tasks.find((item, index, tasks) => {
      if (item.id === id) {
        tasks.splice(index, 1)
        foundItem = true
        return true
      }
      return false
    })

    if (!foundItem) {
      throw new NotFoundException(`Task with id:${id} was not found.`)
    }
  }
}
