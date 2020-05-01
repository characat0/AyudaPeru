import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { AuthModule } from '../../auth/auth.module';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
      imports: [AuthModule]
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
