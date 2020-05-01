import { Test, TestingModule } from '@nestjs/testing';
import { AyudaController } from './ayuda.controller';
import { AyudaService } from './ayuda.service';

describe('Ayuda Controller', () => {
  let controller: AyudaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AyudaController],
      providers: [AyudaService]
    }).compile();

    controller = module.get<AyudaController>(AyudaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
