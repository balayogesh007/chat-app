import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { MessageRepository } from './message.repository';
import { SendMessageInput } from '../socket/dto/create-socket.input';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepo: MessageRepository) {}
  async saveMessage(sendMessageInput: SendMessageInput) {
    return this.messageRepo.save(sendMessageInput);
  }

  async getMessageByRoomIdAndUserId(
    roomId: string,
    userId: string,
    pageNo = 1,
    perPage = 20,
  ) {
    return this.messageRepo.getMessageByRoomIdAndUserId(
      roomId,
      userId,
      pageNo,
      perPage,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageInput: UpdateMessageInput) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
