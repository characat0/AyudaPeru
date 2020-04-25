import { Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { CredencialModule } from './credencial/credencial.module';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule, CredencialModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
