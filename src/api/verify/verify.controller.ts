import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { VerifyService } from './verify.service';

@Controller('verify')
export class VerifyController {
  constructor(private verifyService: VerifyService) {}

  @Get()
  start() {
    return 200;
  }
  @Get('email/:id')
  async verifyEmail(@Param('id') id: string) {
    try {
      await this.verifyService.verify(id);
      return 'ok';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('ayuda/:id')
  async verifyAyuda(@Param('id') id: string) {
    try {
      await this.verifyService.verifyAyuda(id);
      return 'ok';
    } catch (e) {
      let exception = new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === VerifyService.ayudaAlreadyVerified.message) {
        exception = new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }
}
