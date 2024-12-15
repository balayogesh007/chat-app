import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(private readonly dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }

  async getMessageByRoomIdAndUserId(
    roomId: string,
    userId: string,
    pageNo: number,
    perPage: number,
  ) {
    const [messages, totalCount] = await this.findAndCount({
      where: {
        userId: userId,
        roomId: roomId,
      },
      skip: (pageNo - 1) * perPage,
      take: perPage,
    });
    return {
      totalCount,
      messages,
    };
  }
}
