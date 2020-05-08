import { Test, TestingModule } from '@nestjs/testing';
import { ComentarioController } from './comentario.controller';
import { ComentarioModule } from './comentario.module';

describe('Comentario Controller', () => {
  let controller: ComentarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComentarioController],
      imports: [ComentarioModule]
    }).compile();

    controller = module.get<ComentarioController>(ComentarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
