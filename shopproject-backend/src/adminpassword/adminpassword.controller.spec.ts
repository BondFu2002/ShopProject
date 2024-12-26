import { Test, TestingModule } from '@nestjs/testing';
import { AdminpasswordController } from './adminpassword.controller';
import { AdminpasswordService } from './adminpassword.service';

describe('AdminpasswordController', () => {
  let controller: AdminpasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminpasswordController],
      providers: [AdminpasswordService],
    }).compile();

    controller = module.get<AdminpasswordController>(AdminpasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
