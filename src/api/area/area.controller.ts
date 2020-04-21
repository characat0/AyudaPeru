import { Body, Controller, Delete, Get, Next, Param, Post, Put, Res } from '@nestjs/common';
import { AreaService } from './area.service';
import { NextFunction, Response } from 'express';
import { Area } from '../../database/schema/Area.model';
import { Graphic } from '../../database/models/Graphic.model';
import { Coordinate } from '../../database/models/Coordinate.model';

@Controller('area')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Get()
  findAll(): Promise<string[]> {
    return this.areaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response, @Next() next: NextFunction): Promise<Graphic> {
    try {
      const area: Area = await this.areaService.findById(id);
      const response: Graphic = {
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
    try {
      const { id, geometria, propiedades } = body;
      await this.areaService.createArea(id, geometria, propiedades);
      res.status(201).send();
      return;
    } catch (e) {
      next(e);
      return;
    }
  }

  @Post('find')
  async findByCoordinates(@Body() body: Coordinate, @Res() res: Response, @Next() next: NextFunction): Promise<Graphic> {
    try {
      const { latitude, longitude } = body;
      const area = await this.areaService.findByLatLong(latitude, longitude);
      const response: Graphic = {
        type: "Feature",
        geometry: area.get('geometria'),
        properties: {
          code: area.get('id')
        }
      }
      res.status(200).json(response);
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
