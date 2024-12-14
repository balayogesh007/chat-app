import { Module } from '@nestjs/common';
import { SocketGateway } from './socket-gateway';
import { UsersModule } from '../users/users.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [UsersModule, MessageModule],
  providers: [SocketGateway],
})
export class SocketModule {}
