import { CreateSocketInput } from './create-socket.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSocketInput extends PartialType(CreateSocketInput) {
  @Field(() => Int)
  id: number;
}
