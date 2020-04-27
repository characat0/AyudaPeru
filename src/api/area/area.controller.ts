import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AreaService } from './area.service';
import { Response } from 'express';
import { Area } from '../../database/schema/Area.model';
import { Graphic } from '../../database/models/Graphic.model';
import { Coordinate } from '../../database/models/Coordinate.model';

@Controller('area')
export class AreaController {
  constructor(private areaService: AreaService) {}
  @Get()
  async findAll(): Promise<{type: string, features: Graphic[]}> {
    try {
      const areas: Graphic[] = (await this.areaService.findAll()).map(area => {
        const props = area.get('propiedades');
        return {
          type: "Feature",
          geometry: area.get('geometria'),
          properties: {
            code: area.get('id'),
            ...props
          }
        };
      });
      return {
        type: "FeatureCollection",
        features: areas
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
  // Todo: rehabilitar este metodo debido a la ineficiencia.
  //@Get()
  findAllIds(): Promise<string[]> {
    return this.areaService.findAllIds();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Graphic> {
    try {
      const area: Area = await this.areaService.findById(id);
      const props = area.get('propiedades');
      return {
        type: "Feature",
        geometry: area.get('geometria'),
        properties: {
          code: area.get('id'),
          ...props
        }
      };
    } catch (e) {
      let exception = new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === AreaService.notFoundError.message) {
        exception = new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }

  @Put(':id')
  async updateArea(@Param('id') id: string, @Body() body: Area, @Res() res: Response): Promise<void> {
    try {
      const { geometria } = body;
      await this.areaService.updateArea(id, geometria);
      res.status(HttpStatus.NO_CONTENT).send();
      return ;
    } catch (e) {
      let exception = new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === AreaService.notAffectedRowsError.message) {
        exception = new HttpException(e, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }

  @Post()
  async createArea(@Body() body: Area): Promise<any> {
    try {
      const { geometria, propiedades } = body;
      const area = await this.areaService.createArea(geometria, propiedades);
      return area.get('id');
      //res.status(HttpStatus.CREATED).send(area.get('id'));
      //return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('find')
  async findByCoordinates(@Body() body: Coordinate, @Res() res: Response): Promise<Graphic> {
    try {
      const { latitude, longitude } = body;
      const area = await this.areaService.findByLatLong(latitude, longitude);
      const props = area.get('propiedades');
      const response: Graphic = {
        type: "Feature",
        geometry: area.get('geometria'),
        properties: {
          code: area.get('id'),
          ...props
        }
      }
      res.status(HttpStatus.OK).json(response);
      return response;
    } catch (e) {
      let exception = new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === AreaService.notFoundError.message) {
        exception = new HttpException(e, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<number> {
    try {
      return await this.areaService.deleteArea(id);
    } catch (e) {
      let exception = new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === AreaService.notAffectedRowsError.message) {
        exception = new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }
}
