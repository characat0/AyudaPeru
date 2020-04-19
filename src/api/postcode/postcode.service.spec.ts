import { Test, TestingModule } from '@nestjs/testing';
import { PostcodeService } from './postcode.service';

describe('PostcodeService', () => {
  let service: PostcodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostcodeService],
    }).compile();

    service = module.get<PostcodeService>(PostcodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
