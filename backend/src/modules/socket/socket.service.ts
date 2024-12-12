import { Injectable } from '@nestjs/common';
import { CreateSocketInput } from './dto/create-socket.input';
import { UpdateSocketInput } from './dto/update-socket.input';

@Injectable()
export class SocketService {
  create(createSocketInput: CreateSocketInput) {
    return 'This action adds a new socket';
  }

  findAll() {
    return `This action returns all socket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socket`;
  }

  update(id: number, updateSocketInput: UpdateSocketInput) {
    return `This action updates a #${id} socket`;
  }

  remove(id: number) {
    return `This action removes a #${id} socket`;
  }
}
