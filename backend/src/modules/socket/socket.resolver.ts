import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SocketService } from './socket.service';
import { Socket } from './entities/socket.entity';
import { CreateSocketInput } from './dto/create-socket.input';
import { UpdateSocketInput } from './dto/update-socket.input';

@Resolver(() => Socket)
export class SocketResolver {
  constructor(private readonly socketService: SocketService) {}

  @Mutation(() => Socket)
  createSocket(@Args('createSocketInput') createSocketInput: CreateSocketInput) {
    return this.socketService.create(createSocketInput);
  }

  @Query(() => [Socket], { name: 'socket' })
  findAll() {
    return this.socketService.findAll();
  }

  @Query(() => Socket, { name: 'socket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.socketService.findOne(id);
  }

  @Mutation(() => Socket)
  updateSocket(@Args('updateSocketInput') updateSocketInput: UpdateSocketInput) {
    return this.socketService.update(updateSocketInput.id, updateSocketInput);
  }

  @Mutation(() => Socket)
  removeSocket(@Args('id', { type: () => Int }) id: number) {
    return this.socketService.remove(id);
  }
}
