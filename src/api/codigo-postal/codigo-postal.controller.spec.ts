import { Test, TestingModule } from '@nestjs/testing';
import { CodigoPostalController } from './codigo-postal.controller';

describe('CodigoPostal Controller', () => {
  let controller: CodigoPostalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodigoPostalController],
    }).compile();

    controller = module.get<CodigoPostalController>(CodigoPostalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
