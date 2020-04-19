import { Test, TestingModule } from '@nestjs/testing';
import { DistritoService } from './distrito.service';

describe('DistritoService', () => {
  let service: DistritoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistritoService],
    }).compile();

    service = module.get<DistritoService>(DistritoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
