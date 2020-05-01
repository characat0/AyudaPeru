import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { CredencialModule } from '../../auth/credencial/credencial.module';
import { UsersModule } from '../users/users.module';

describe('Signup Controller', () => {
  let controller: SignupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignupController],
      providers: [SignupService],
      imports: [CredencialModule, UsersModule]
    }).compile();

    controller = module.get<SignupController>(SignupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
