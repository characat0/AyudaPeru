import { Test, TestingModule } from '@nestjs/testing';
import { VerifyService } from './verify.service';
import { AuthModule } from '../../auth/auth.module';

describe('VerifyService', () => {
  let service: VerifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerifyService],
      imports: [AuthModule]
    }).compile();

    service = module.get<VerifyService>(VerifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
