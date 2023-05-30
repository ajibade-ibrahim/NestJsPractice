import { Controller, Post, Body, ConflictException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/authCredentialsDto'
import { QueryFailedError } from 'typeorm'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() model: AuthCredentialsDto) {
    try {
      return await this.authService.signUserUp(model)
    } catch (error) {
      console.log('error codecast: ', (error as { code: string }).code)
      const queryError = error as QueryFailedError
      if (queryError?.driverError?.code === '23505') {
        throw new ConflictException(
          `The username, ${model.username}, already exists.`
        )
      }
      throw error
    }
  }

  @Post('/signIn')
  async signIn(@Body() model: AuthCredentialsDto) {
    try {
      return await this.authService.signUserIn(model)
    } catch (error) {
      console.log('error codecast: ', (error as { code: string }).code)
      const queryError = error as QueryFailedError
      if (queryError?.driverError?.code === '23505') {
        throw new ConflictException(
          `The username, ${model.username}, already exists.`
        )
      }
      throw error
    }
  }
}
