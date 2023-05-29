import { TaskStatus } from './task.model'
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity({ name: 'Tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  @IsNotEmpty()
  title!: string

  @Column()
  status!: TaskStatus
}
