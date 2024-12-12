import { Test, TestingModule } from '@nestjs/testing';
import { SocketResolver } from './socket.resolver';
import { SocketService } from './socket.service';

describe('SocketResolver', () => {
  let resolver: SocketResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketResolver, SocketService],
    }).compile();

    resolver = module.get<SocketResolver>(SocketResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
