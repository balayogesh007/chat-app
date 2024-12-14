import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageRepository } from './message.repository';

@Module({
  providers: [MessageResolver, MessageService, MessageRepository],
  exports: [MessageService, MessageRepository],
})
export class MessageModule {}
