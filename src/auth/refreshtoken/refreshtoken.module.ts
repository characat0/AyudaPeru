import { Module } from '@nestjs/common';
import { RefreshtokenService } from './refreshtoken.service';

@Module({
  providers: [RefreshtokenService],
  exports: [RefreshtokenService]
})
export class RefreshtokenModule {}
