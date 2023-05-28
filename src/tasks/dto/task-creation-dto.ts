import { IsNotEmpty } from 'class-validator'

export class TaskCreationDto {
  @IsNotEmpty()
  title!: string
}
