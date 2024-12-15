import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { GetAllRoomsResponseType } from './dto/rooms.output';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room)
  async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.createRoom(createRoomInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => GetAllRoomsResponseType)
  async getAllRooms(
    @Args('pageNo', { type: () => Int }) pageNo: number,
    @Args('perPage', { type: () => Int }) perPage: number,
  ) {
    return this.roomsService.getAllRooms(pageNo, perPage);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Room)
  async getRoomByRoomId(@Args('id') id: string) {
    return this.roomsService.getRoomByRoomId(id);
  }

  @Mutation(() => Room)
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomsService.update(updateRoomInput.id, updateRoomInput);
  }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => Int }) id: number) {
    return this.roomsService.remove(id);
  }
}
