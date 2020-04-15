import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoligonoController } from './api/poligono/poligono.controller';
import { PoligonoService } from './api/poligono/poligono.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, PoligonoController],
  providers: [AppService, PoligonoService],
})
export class AppModule {}
