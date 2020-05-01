import { Test, TestingModule } from '@nestjs/testing';
import { DistritoController } from './distrito.controller';
import { DistritoService } from './distrito.service';
import { DatabaseModule } from '../../database/database.module';

describe('Distrito Controller', () => {
  let controller: DistritoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistritoController],
      providers: [DistritoService],
      imports: [DatabaseModule]
    }).compile();

    controller = module.get<DistritoController>(DistritoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
