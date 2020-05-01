import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { AyudaService } from './ayuda.service';
import { Ayuda } from '../../database/schema/Ayuda.model';

@Controller('ayuda')
export class AyudaController {
  constructor(private ayudaService: AyudaService) {}
  @Get()
  async getAllAyuda() {
    return this.ayudaService.getAll();
  }

  @Get('active')
  async getAllActive() {
    return this.ayudaService.findActive();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      return await this.ayudaService.findById(id);
    } catch (e) {
      let exception = new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === AyudaService.notFoundError.message) {
        exception = new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }

  @Post()
  async createLesson(@Body() body: Ayuda) {
    try {
      return await this.ayudaService.create(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateLesson(@Param('id') id: string, @Body() body: Ayuda) {
    try {
      return await this.ayudaService.updateById(id, body);
    } catch (e) {
      let exception = new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === AyudaService.notFoundError.message) {
        exception = new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }

  }
}
