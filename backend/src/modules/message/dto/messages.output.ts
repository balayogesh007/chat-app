import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../entities/message.entity';

@ObjectType()
export class GetMessagesByRoomAndUserIdRespType {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [Message])
  messages: Message[];
}
