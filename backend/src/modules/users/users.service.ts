import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import {
  EMAIL_PWD_REQ,
  INCORRECT_PWD,
  USER_NOT_FOUND,
} from '../../common/error-constants';
import * as jwt from 'jsonwebtoken';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async passwordHash(password: string) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async verifyPassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }

  async signIn(emailId: string, password: string) {
    if (!emailId || !password) {
      throw new BadRequestException(EMAIL_PWD_REQ);
    }
    const getUser = await this.userRepo.signIn(emailId);
    if (!getUser?.uId) {
      throw new NotFoundException('User not found');
    }
    const verifyPassword = await this.verifyPassword(
      password,
      getUser?.password,
    );
    if (!verifyPassword) {
      throw new BadRequestException(INCORRECT_PWD);
    }
    const generateToken = jwt.sign(
      {
        emailId: getUser?.emailId,
        userId: getUser?.uId,
        userFullName: `${getUser?.firstName} ${getUser?.lastName}`,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      'rsa',
    );
    return {
      token: `Bearer ${generateToken}`,
    };
  }

  async create(createUserInput: CreateUserInput) {
    if (!createUserInput?.isSocialLogin) {
      createUserInput.password = await this.passwordHash(
        createUserInput?.password,
      );
    }
    createUserInput.uniqueId = crypto.randomBytes(8).toString('hex');
    return this.userRepo.save(createUserInput);
  }

  async getAllUsers(pageNo = 1, perPage = 20, searchText = '') {
    return this.userRepo.getAllUsers(pageNo, perPage, searchText);
  }

  async getUserById(id: string) {
    const getUserDetails = await this.userRepo.findOne({
      where: { uId: id },
      relations: ['rooms'],
    });
    if (!getUserDetails?.uId) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return getUserDetails;
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput) {
    const getuser = await this.getUserById(id);
    if (!getuser?.uId) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    await this.userRepo.update({ uId: id }, { ...updateUserInput });
    return this.getUserById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateUser(payload: any): Promise<User> {
    let user = null;
    if ('emailId' in payload) {
      user = await this.userRepo.findOneBy({ emailId: payload?.emailId });
    }
    return user;
  }
}
