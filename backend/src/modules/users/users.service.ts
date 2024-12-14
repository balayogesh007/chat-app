import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { EMAIL_PWD_REQ, INCORRECT_PWD, USER_NOT_FOUND } from '../../common/error-constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) { }

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
      token: generateToken,
    };
  }

  async create(createUserInput: CreateUserInput) {
    createUserInput.password = await this.passwordHash(
      createUserInput?.password,
    );
    createUserInput.uniqueId = crypto.randomBytes(8).toString('hex');
    return this.userRepo.save(createUserInput);
  }

  findAll() {
    return `This action returns all users`;
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
      throw new NotFoundException(USER_NOT_FOUND)
    }
    await this.userRepo.update({ uId: id }, { ...updateUserInput });
    return this.getUserById(id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateUser(payload: any) {
    let user = null;
    if ('emailId' in payload) {
      user = await this.userRepo.findOneBy({ emailId: payload?.emailId });
    }
    return user;
  }
}
