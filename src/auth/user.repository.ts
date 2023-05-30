import { User } from './user.entity'
import { Repository, DataSource } from 'typeorm'
import { AuthCredentialsDto } from './dto/authCredentialsDto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager())
  }
  async createUser(model: AuthCredentialsDto) {
    const user = this.create(model)
    await this.save(user)
  }
}
