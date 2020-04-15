import { Test, TestingModule } from '@nestjs/testing';
import { PoligonoController } from './poligono.controller';

describe('Poligono Controller', () => {
  let controller: PoligonoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoligonoController],
    }).compile();

    controller = module.get<PoligonoController>(PoligonoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
