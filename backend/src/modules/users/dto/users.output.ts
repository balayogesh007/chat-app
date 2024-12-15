import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class SignInResponse {
  @Field()
  token: string;
}

@ObjectType()
export class GetAllUsersResponse {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [User])
  users: User[];
}
