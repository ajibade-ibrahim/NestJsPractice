import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './auth-types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {
    super({
      secretOrKey: 'JwtSecretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload
    const user = await this.usersRepository.findOne({ where: { username } })

    if (user == null) {
      throw new UnauthorizedException()
    }

    return user
  }
}
