import { Injectable } from '@nestjs/common'
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
    console.log('service: id', id)
    const task = this.tasks.find((task) => task.id === id)
    console.log(task)
    return task
  }

  deleteTask(id: number) {
    console.log(id)
    this.tasks.find((item, index, tasks) => {
      if (item.id === id) {
        tasks.splice(index, 1)
        return true
      }
      return false
    })
  }
}
