import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { UpdateMessageInput } from './dto/update-message.input';
import { SendMessageInput } from '../socket/dto/create-socket.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { GetMessageByRoomAndUserIdInput } from './dto/create-message.input';
import { GetMessagesByRoomAndUserIdRespType } from './dto/messages.output';

@Resolver(() => Message)
@UseGuards(JwtAuthGuard)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  async sendMessage(
    @Args('sendMessageInput') sendMessageInput: SendMessageInput,
  ) {
    return this.messageService.saveMessage(sendMessageInput);
  }

  @Query(() => GetMessagesByRoomAndUserIdRespType)
  async getMessageByRoomIdAndUserId(
    @Args('getMessageByRoomAndUserIdInput')
    getMessageByRoomAndUserIdInput: GetMessageByRoomAndUserIdInput,
  ) {
    return this.messageService.getMessageByRoomIdAndUserId(
      getMessageByRoomAndUserIdInput?.roomId,
      getMessageByRoomAndUserIdInput?.userId,
      getMessageByRoomAndUserIdInput?.pageNo,
      getMessageByRoomAndUserIdInput?.perPage,
    );
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messageService.update(
      updateMessageInput.id,
      updateMessageInput,
    );
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messageService.remove(id);
  }
}
