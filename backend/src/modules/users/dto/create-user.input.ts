import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  emailId: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  isSocialLogin?: boolean;

  uniqueId?: string;
}
