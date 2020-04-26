import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { DistritoService } from './distrito.service';
import { Response } from 'express';
import { Distrito } from '../../database/schema/Distrito.model';
import { Graphicable } from '../../common/interfaces/graphicable.interface';
import { Graphic } from '../../database/models/Graphic.model';
import { Coordinate } from '../../database/models/Coordinate.model';

@Controller('distrito')
export class DistritoController {
  constructor(private readonly distritoService: DistritoService) {}

  @Get()
  findAll(): Promise<string[]> {
    return this.distritoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Graphic> {
    try {
      const distrito: Distrito = await this.distritoService.findById(id);
      const response: Graphicable = {
        type: "Feature",
        geometry: distrito.get('geometria'),
        properties: {
          code: distrito.get('id'),
          nombre: distrito.get('nombre'),
          provincia: distrito.get('provincia')
        }
      }
      return response;
    } catch (e) {
      let exception = new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === DistritoService.notFoundError.message) {
        exception = new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }

  @Post('find')
  async findByCoordinates(@Body() body: Coordinate, @Res() res: Response): Promise<Graphicable> {
    try {
      const { longitude, latitude } = body;
      const distrito: Distrito = await this.distritoService.findByLatLong(latitude, longitude);

      const response: Graphicable = {
        type: "Feature",
        geometry: distrito.get('geometria'),
        properties: {
          code: distrito.get('id'),
          nombre: distrito.get('nombre'),
          provincia: distrito.get('provincia')
        }
      }
      res.status(200).json(response);
      return response;
    } catch (e) {
      let exception = new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === DistritoService.notFoundError.message) {
        exception = new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }
}
