import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signIn(emailId: string) {
    const getUserDetails = await this.createQueryBuilder('user')
      .where('Lower(user.emailId) = :emailId', { emailId: emailId })
      .getOne();

    return getUserDetails;
  }
}
