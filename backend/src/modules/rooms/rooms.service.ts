import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { RoomsRepository } from './rooms.repository';
import { ROOM_NOT_FOUND } from '../../common/error-constants';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepo: RoomsRepository) {}
  async createRoom(createRoomInput: CreateRoomInput) {
    return this.roomsRepo.save(createRoomInput);
  }

  async getAllRooms(pageNo = 1, perPage = 20) {
    return this.roomsRepo.getAllRooms(pageNo, perPage);
  }

  async getRoomByRoomId(id: string) {
    const getRoomDetail = await this.roomsRepo.findOne({
      where: { rId: id },
      relations: ['users'],
    });
    if (!getRoomDetail?.rId) {
      throw new NotFoundException(ROOM_NOT_FOUND);
    }
    return getRoomDetail;
  }

  update(id: number, updateRoomInput: UpdateRoomInput) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
