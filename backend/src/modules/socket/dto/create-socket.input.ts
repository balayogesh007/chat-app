import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSocketInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@InputType()
export class SendMessageInput {
  @Field()
  userId: string;

  @Field()
  roomId: string;

  @Field()
  message: string;
}
