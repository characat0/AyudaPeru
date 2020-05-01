import { Test, TestingModule } from '@nestjs/testing';
import { AyudaService } from './ayuda.service';

describe('AyudaService', () => {
  let service: AyudaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AyudaService],
    }).compile();

    service = module.get<AyudaService>(AyudaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
