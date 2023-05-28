import { Repository } from 'typeorm'
import { Task } from './task.entity'
import { Injectable } from '@nestjs/common'

// @EntityRepository(Task)
@Injectable()
export class TasksRepository extends Repository<Task> {}
