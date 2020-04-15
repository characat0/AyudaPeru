import { Test, TestingModule } from '@nestjs/testing';
import { CodigoPostalService } from './codigo-postal.service';

describe('CodigoPostalService', () => {
  let service: CodigoPostalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodigoPostalService],
    }).compile();

    service = module.get<CodigoPostalService>(CodigoPostalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
