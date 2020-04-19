import { Test, TestingModule } from '@nestjs/testing';
import { DistritoController } from './distrito.controller';

describe('Distrito Controller', () => {
  let controller: DistritoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistritoController],
    }).compile();

    controller = module.get<DistritoController>(DistritoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
