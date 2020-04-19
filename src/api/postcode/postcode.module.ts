import { Module } from '@nestjs/common';
import { PostcodeService } from './postcode.service';
import { PostcodeController } from './postcode.controller';

@Module({
  providers: [PostcodeService],
  controllers: [PostcodeController]
})
export class PostcodeModule {}
