import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsRepository extends Repository<Room> {
  constructor(private readonly dataSource: DataSource) {
    super(Room, dataSource.createEntityManager());
  }
}
