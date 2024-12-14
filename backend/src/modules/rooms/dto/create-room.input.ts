import { InputType, Field } from '@nestjs/graphql';
import { UpdateUserInput } from '../../users/dto/update-user.input';

@InputType()
export class CreateRoomInput {
  @Field({ nullable: true })
  roomName?: string;

  @Field(() => [UpdateUserInput])
  users: UpdateUserInput[];
}
