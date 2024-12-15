import { Injectable } from '@nestjs/common';
import { DataSource, ILike, Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsRepository extends Repository<Room> {
  constructor(private readonly dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }

  async getAllRooms(pageNo: number, perPage: number) {
    const query = await this.createQueryBuilder('rooms').leftJoinAndSelect(
      'rooms.users',
      'room_user_map',
    );

    const [rooms, totalCount] = await query
      .skip((pageNo - 1) * perPage)
      .take(perPage)
      .getManyAndCount();
    return {
      totalCount,
      rooms,
    };
  }
}
