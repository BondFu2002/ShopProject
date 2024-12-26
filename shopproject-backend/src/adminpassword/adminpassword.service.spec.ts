import { Test, TestingModule } from '@nestjs/testing';
import { AdminpasswordService } from './adminpassword.service';

describe('AdminpasswordService', () => {
  let service: AdminpasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminpasswordService],
    }).compile();

    service = module.get<AdminpasswordService>(AdminpasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
