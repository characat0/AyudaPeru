import { Test, TestingModule } from '@nestjs/testing';
import { DistritoService } from './distrito.service';
import { DatabaseModule } from '../../database/database.module';

describe('DistritoService', () => {
  let service: DistritoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistritoService],
      imports: [DatabaseModule]
    }).compile();

    service = module.get<DistritoService>(DistritoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
