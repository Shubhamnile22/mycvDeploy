import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Controller } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersService>(UsersService);

    // service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
