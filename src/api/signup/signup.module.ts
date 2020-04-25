import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { CredencialModule } from '../../auth/credencial/credencial.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CredencialModule, UsersModule],
  providers: [SignupService],
  controllers: [SignupController]
})
export class SignupModule {}
