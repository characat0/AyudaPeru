import { Test, TestingModule } from '@nestjs/testing';
import { PoligonoService } from './poligono.service';

describe('PoligonoService', () => {
  let service: PoligonoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoligonoService],
    }).compile();

    service = module.get<PoligonoService>(PoligonoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
