import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GetAllUsersResponse, SignInResponse } from './dto/users.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => SignInResponse)
  async signIn(
    @Args('emailId') emailId: string,
    @Args('password') password: string,
  ) {
    return this.usersService.signIn(emailId, password);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => GetAllUsersResponse)
  async getAllUsers(
    @Args('pageNo', { type: () => Int }) pageNo: number,
    @Args('perPage', { type: () => Int }) perPage: number,
    @Args('searchText') searchText: string,
  ) {
    return this.usersService.getAllUsers(pageNo, perPage, searchText);
  }

  @Query(() => User)
  async getUserById(@Args('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput.uId, updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
