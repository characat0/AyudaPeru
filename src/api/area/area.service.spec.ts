import { Test, TestingModule } from '@nestjs/testing';
import { AreaService } from './area.service';
import { DatabaseModule } from '../../database/database.module';

describe('AreaService', () => {
  let service: AreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaService],
      imports: [DatabaseModule]
    }).compile();

    service = module.get<AreaService>(AreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
