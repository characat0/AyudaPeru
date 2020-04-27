import { Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { CredencialModule } from './credencial/credencial.module';
import { AuthService } from './auth.service';
import { RefreshtokenModule } from './refreshtoken/refreshtoken.module';

@Module({
  imports: [JwtModule, CredencialModule, RefreshtokenModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
