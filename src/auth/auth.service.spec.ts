import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CredencialModule } from './credencial/credencial.module';
import { JwtModule } from './jwt/jwt.module';
import { RefreshtokenModule } from './refreshtoken/refreshtoken.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [CredencialModule, JwtModule, RefreshtokenModule]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
