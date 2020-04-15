import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CodigoPostalService } from './api/codigo-postal/codigo-postal.service';
import { CodigoPostalController } from './api/codigo-postal/codigo-postal.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, CodigoPostalController],
  providers: [AppService, CodigoPostalService],
})
export class AppModule {}
