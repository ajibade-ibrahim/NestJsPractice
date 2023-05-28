import { TaskStatus } from './task.model'
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column()
  status!: TaskStatus
}
