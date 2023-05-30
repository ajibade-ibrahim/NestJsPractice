import { IsNotEmpty } from 'class-validator'
import { Transform, TransformFnParams } from 'class-transformer'

export class TaskCreationDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  title!: string
}
