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
import { UsersService } from '../users/users.service';
import { SendMessageInput } from './dto/create-socket.input';
import { MessageService } from '../message/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayInit {
  constructor(
    private readonly userService: UsersService,
    private readonly messageService: MessageService,
  ) {}
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
  async sendMessage(@MessageBody() data: SendMessageInput) {
    try {
      console.log('SendMessage', data, data?.message, data?.roomId);
      const saveMessage = await this.messageService.saveMessage(data);
      await this.server
        .to(data?.roomId)
        .emit('sendMessage', saveMessage?.message);
    } catch (err) {
      Logger.error(`Socket Gateway: SendMessage -> ${err}`, SocketGateway.name);
      throw new Error(err);
    }
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      userId: string;
    },
  ) {
    Logger.log(
      `Join Room: user id->${payload.userId}, Client Id: ${client?.id}`,
      SocketGateway.name,
    );
    if (client.id && payload.userId) {
      const user = await this.userService.getUserById(payload.userId);
      if (user?.rooms?.length) {
        for (const room of user.rooms) {
          Logger.log(`${client.id} is joining room ->${room.rId}`);
          await this.server.in(client.id).socketsJoin(room.rId);
        }
      } else {
        Logger.error(`Error ----> ${'No rooms mapped to user.'}`);
      }
    }
  }

  @SubscribeMessage('leave_room')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: string },
  ) {
    Logger.log(
      `Leave Room: user id->${payload.userId}, Client Id: ${client?.id}`,
      SocketGateway.name,
    );
    if (client.id && payload.userId) {
      const user = await this.userService.getUserById(payload.userId);
      if (user.rooms?.length) {
        for (const room of user.rooms) {
          Logger.log(`${client.id} is leaving room -> ${room.rId}`);
          await this.server.in(client?.id).socketsLeave(room?.rId);
        }
      } else {
        Logger.error(`Error ----> ${'Rooms not Found'}`);
      }
    }
  }
}
