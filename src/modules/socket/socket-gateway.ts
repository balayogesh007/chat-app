import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayInit {
  public connectedClients: Set<Socket> = new Set<Socket>();

  @WebSocketServer()
  private readonly server: Server;

  afterInit(server: Server) {
    Logger.log('Websocket Connected');
  }

  handleConnection(client: any) {
    this.connectedClients.add(client);
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('events', data);
    return data;
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() data: string) {
    console.log('SendMessage', JSON.stringify(data));
    this.server.to('Room1').emit('sendMessage', data);
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ) {
    Logger.debug(client?.id);
    this.server.in(client?.id).socketsJoin('Room1');
    Logger.log('Client->', client, 'Message Body ->', payload);
  }

  @SubscribeMessage('leave_room')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string,
  ) {
    Logger.debug(`Leave Room Client -> ${client?.id}`);
    this.server.in(client?.id).socketsLeave('Room1');
    Logger.log('Client->', client, 'Message Body ->', payload);
  }
}
