import { Test, TestingModule } from '@nestjs/testing';
import { PostcodeController } from './postcode.controller';
import { PostcodeService } from './postcode.service';
import { DatabaseModule } from '../../database/database.module';

describe('Postcode Controller', () => {
  let controller: PostcodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostcodeController],
      providers: [PostcodeService],
      imports: [DatabaseModule]
    }).compile();

    controller = module.get<PostcodeController>(PostcodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
