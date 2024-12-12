import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketResolver } from './socket.resolver';
import { SocketGateway } from './socket-gateway';

@Module({
  imports: [SocketGateway],
  providers: [SocketResolver, SocketService],
})
export class SocketModule {}
