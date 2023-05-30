import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  @IsNotEmpty()
  username!: string

  @Column()
  password!: string
}
