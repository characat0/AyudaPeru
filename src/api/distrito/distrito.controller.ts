import { Body, Controller, Get, Next, Param, Post, Res } from '@nestjs/common';
import { DistritoService } from './distrito.service';
import { NextFunction, Response } from 'express';
import { Distrito } from '../../database/schema/Distrito.model';
import { Graphicable } from '../../interfaces/graphicable.interface';
import { Graphic } from '../../database/models/graphic.model';
import { Coordinate } from '../../database/models/coordinate.model';

@Controller('distrito')
export class DistritoController {
  constructor(private readonly distritoService: DistritoService) {}

  @Get()
  findAll(): Promise<string[]> {
    return this.distritoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response, @Next() next: NextFunction): Promise<Graphic> {
    try {
      const distrito: Distrito = await this.distritoService.findById(id);
      const response: Graphicable = {
        type: "Feature",
        geometry: distrito.get('geometria'),
        properties: {
          code: distrito.get('id')
        }
      }
      res.json(response);
      return response;
    } catch (e) {
      if (e.message === this.distritoService.notFoundError.message) {
        res.status(404).send(e.message);
        return ;
      }
      next(e);
      return;
    }
  }

  @Post('find')
  async findByCoordinates(@Body() body: Coordinate, @Res() res: Response, @Next() next: NextFunction): Promise<Graphicable> {
    try {
      const { longitude, latitude } = body;
      const distrito: Distrito = await this.distritoService.findByLatLong(latitude, longitude);
      const response: Graphicable = {
        type: "Feature",
        geometry: distrito.get('geometria'),
        properties: {
          code: distrito.get('id')
        }
      }
      res.json(response);
      return response;
    } catch (e) {
      if (e.message === this.distritoService.notFoundError.message) {
        res.status(404).send(e.message);
        return ;
      }
      next(e);
      return;
    }
  }
}
