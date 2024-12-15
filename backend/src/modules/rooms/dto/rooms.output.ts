import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Room } from '../entities/room.entity';

@ObjectType()
export class GetAllRoomsResponseType {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [Room])
  rooms: Room[];
}
