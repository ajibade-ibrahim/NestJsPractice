import { UserRepository } from './user.repository'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/authCredentialsDto'
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { WebToken } from './auth-types'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUserUp(model: AuthCredentialsDto) {
    const hashedPassword = await bcrypt.hash(model.password, 10)
    const newUser = this.userRepository.create({
      username: model.username,
      password: hashedPassword
    })
    await this.userRepository.save(newUser)
  }

  async signUserIn(model: AuthCredentialsDto): Promise<WebToken | string> {
    const errorMessage = 'Invalid user credentials'
    const { username } = model
    const user = await this.userRepository.findOne({
      where: { username }
    })

    if (!user) {
      return errorMessage
    }

    const passwordsMatch = await bcrypt.compare(model.password, user.password)
    if (!passwordsMatch) {
      return errorMessage
    }

    const accessToken = await this.jwtService.signAsync({ username })
    return { accessToken }
  }
}
