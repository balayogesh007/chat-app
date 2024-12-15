import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@InputType()
export class GetMessageByRoomAndUserIdInput {
  @Field()
  roomId: string;

  @Field()
  userId: string;

  @Field(() => Int)
  pageNo: number;

  @Field(() => Int)
  perPage: number;
}
