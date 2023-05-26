import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: 1, title: 'Create Models', status: TaskStatus.OPEN },
    { id: 2, title: 'Create Controllers', status: TaskStatus.OPEN },
    { id: 3, title: 'Create Database', status: TaskStatus.OPEN }
  ]

  getTasks() {
    return this.tasks
  }

  putTask(title: string): Task {
    const task = {
      id: this.tasks.length + 1,
      title,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task
  }

  getTask(id: number): Task | undefined {
    const task = this.tasks.find((task) => task.id === id)
    if (task === undefined) {
      throw new NotFoundException(`Task with id:${id} was not found.`)
    }
    console.log(task)
    return task
  }

  deleteTask(id: number) {
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
