import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { AuthService } from './auth.service'
import { UserRepository } from './user.repository'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt-strategy'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'JwtSecretKey',
      signOptions: {
        expiresIn: 3600
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  exports: [JwtStrategy],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy]
})
export class AuthModule {}
