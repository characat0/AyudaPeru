import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { CredencialModule } from '../../auth/credencial/credencial.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [CredencialModule, AuthModule],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
