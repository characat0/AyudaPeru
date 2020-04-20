import { Body, Controller, Delete, Get, Next, Param, Post, Put, Res } from '@nestjs/common';
import { AreaService } from './area.service';
import { NextFunction, Response } from 'express';
import { Graphicable } from '../../interfaces/graphicable.interface';
import { Area } from '../../database/schema/Area.model';

type Coordenadas = { latitude: number, longitude: number }

@Controller('area')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Get()
  findAll(): Promise<string[]> {
    return this.areaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response, @Next() next: NextFunction): Promise<Graphicable> {
    try {
      const area: Area = await this.areaService.findById(id);
      const response: Graphicable = {
        type: "Feature",
        geometry: area.get('geometria'),
        properties: {
          code: area.get('id')
        }
      }
      res.json(response);
      return response;
    } catch (e) {
      if (e.message === this.areaService.notFoundError.message) {
        res.status(404).send(e.message);
        return ;
      }
      next(e);
      return;
    }
  }

  @Put(':id')
  async updateArea(@Param('id') id: string, @Body() body: Area, @Res() res: Response, @Next() next: NextFunction): Promise<void> {
    try {
      const { geometria } = body;
      const number = await this.areaService.updateArea(id, geometria);
      res.status(204).send(number);
      return ;
    } catch (e) {
      if (e.message === this.areaService.notAffectedRowsError.message) {
        res.status(404).send(e.message);
        return ;
      }
      next(e);
      return;
    }
  }

  @Post()
  async createArea(@Body() body: Area, @Res() res: Response, @Next() next: NextFunction): Promise<void> {
    const { id, geometria, propiedades } = body;
    try {
      await this.areaService.createArea(id, geometria, propiedades);
      res.status(201).send();
      return;
    } catch (e) {
      next(e);
      return;
    }
  }

  @Post('find')
  async findByCoordinates(@Body() body: Coordenadas, @Res() res: Response, @Next() next: NextFunction): Promise<Graphicable> {
    const { latitude, longitude } = body;
    try {
      const area = await this.areaService.findByLatLong(latitude, longitude);
      const response: Graphicable = {
        type: "Feature",
        geometry: area.get('geometria'),
        properties: {
          code: area.get('id')
        }
      }
      res.json(response);
      return response;
    } catch (e) {
      if (e.message === this.areaService.notFoundError.message) {
        res.status(404).send(e.message);
        return ;
      }
      next(e);
      return;
    }
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string, @Res() res: Response, @Next() next: NextFunction): Promise<void> {
    try {
      const number = await this.areaService.deleteArea(parseInt(id));
      res.status(200).send(number);
      return ;
    } catch (e) {
      if (e.message === this.areaService.notAffectedRowsError.message) {
        res.status(404).send(e.message);
        return ;
      }
      next(e);
      return ;
    }
  }
}
