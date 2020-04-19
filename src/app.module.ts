import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PostcodeModule } from './api/postcode/postcode.module';
import { DistritoModule } from './api/distrito/distrito.module';
import { AreaModule } from './api/area/area.module';

@Module({
  imports: [DatabaseModule, PostcodeModule, DistritoModule, AreaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
