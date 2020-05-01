import { Test, TestingModule } from '@nestjs/testing';
import { AyudaController } from './ayuda.controller';

describe('Ayuda Controller', () => {
  let controller: AyudaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AyudaController],
    }).compile();

    controller = module.get<AyudaController>(AyudaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
