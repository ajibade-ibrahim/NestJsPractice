import { IsNotEmpty, MinLength, MaxLength } from 'class-validator'

export class AuthCredentialsDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username!: string

  @IsNotEmpty()
  @MinLength(7)
  password!: string
}
