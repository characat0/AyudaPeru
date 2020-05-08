import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PostcodeModule } from './api/postcode/postcode.module';
import { DistritoModule } from './api/distrito/distrito.module';
import { AreaModule } from './api/area/area.module';
import { LoginModule } from './api/login/login.module';
import { SignupModule } from './api/signup/signup.module';
import { AuthModule } from './auth/auth.module';
import { BearerMiddleware } from './common/middleware/bearer.middleware';
import { JwtModule } from './auth/jwt/jwt.module';
import { CredencialModule } from './auth/credencial/credencial.module';
import { VerifyModule } from './api/verify/verify.module';
import { UsersModule } from './api/users/users.module';
import { TokenModule } from './api/token/token.module';
import { AyudaModule } from './api/ayuda/ayuda.module';
import { ComentarioModule } from './api/comentario/comentario.module';

@Module({
  imports: [DatabaseModule, PostcodeModule, DistritoModule, AreaModule, LoginModule, SignupModule, AuthModule, JwtModule, CredencialModule, VerifyModule, UsersModule, TokenModule, AyudaModule, ComentarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(BearerMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL
      });
  }
}
