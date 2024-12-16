import { Injectable } from '@nestjs/common';
import { DataSource, ILike, Repository } from 'typeorm';
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

  async getAllUsers(pageNo: number, perPage: number, searchText: string) {
    const query = await this.createQueryBuilder('user');

    if (searchText) {
      query.andWhere({ emailId: ILike(`%${searchText}%`) });
    }
    const [users, totalCount] = await query
      .skip((pageNo - 1) * perPage)
      .take(perPage)
      .getManyAndCount();
    return {
      totalCount,
      users,
    };
  }

  async checkUserExist(emailId: string) {
    const user = await this.createQueryBuilder('user')
      .where('Lower(user.emailId) = :emailId', { emailId: emailId })
      .getOne();
    if (user?.uId) {
      return true;
    } else {
      return false;
    }
  }
}
