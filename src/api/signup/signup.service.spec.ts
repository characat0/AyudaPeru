import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from './signup.service';
import { AuthModule } from '../../auth/auth.module';
import { CredencialModule } from '../../auth/credencial/credencial.module';
import { UsersModule } from '../users/users.module';

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignupService],
      imports: [AuthModule, CredencialModule, UsersModule]
    }).compile();

    service = module.get<SignupService>(SignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
