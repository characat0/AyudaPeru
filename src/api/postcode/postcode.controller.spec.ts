import { Test, TestingModule } from '@nestjs/testing';
import { PostcodeController } from './postcode.controller';

describe('Postcode Controller', () => {
  let controller: PostcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostcodeController],
    }).compile();

    controller = module.get<PostcodeController>(PostcodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
