import { UserRepository } from './user.repository'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/authCredentialsDto'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: UserRepository) {}

  async signUserUp(model: AuthCredentialsDto) {
    const hashedPassword = await bcrypt.hash(model.password, 10)
    const newUser = this.userRepository.create({
      username: model.username,
      password: hashedPassword
    })
    await this.userRepository.save(newUser)
  }

  async signUserIn(model: AuthCredentialsDto): Promise<string> {
    const errorMessage = 'Invalid user credentials'
    const user = await this.userRepository.findOne({
      where: { username: model.username }
    })

    if (!user) {
      return errorMessage
    }

    const loginSuccessful = await bcrypt.compare(model.password, user.password)
    return loginSuccessful ? 'Login successful' : errorMessage
  }
}
