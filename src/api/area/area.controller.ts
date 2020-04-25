import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Next,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { NextFunction, Response } from 'express';
import { Area } from '../../database/schema/Area.model';
import { Graphic } from '../../database/models/Graphic.model';
import { Coordinate } from '../../database/models/Coordinate.model';
import { TokenInterceptor } from '../../common/interceptors/token.interceptor';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('area')
export class AreaController {
  constructor(private areaService: AreaService) {}

  @Get()
  findAll(): Promise<string[]> {
    return this.areaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Graphic> {
    try {
      const area: Area = await this.areaService.findById(id);
      return {
        type: "Feature",
        geometry: area.get('geometria'),
        properties: {
          code: area.get('id')
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

  @UseGuards(AuthGuard)
  @UseInterceptors(TokenInterceptor)
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

  @UseGuards(AuthGuard)
  @UseInterceptors(TokenInterceptor)
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
      res.status(HttpStatus.OK).json(response);
      return response;
    } catch (e) {
      let exception = new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === AreaService.notFoundError.message) {
        exception = new HttpException(e, HttpStatus.NOT_FOUND);
      }
      next(exception);
    }
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(TokenInterceptor)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<number> {
    try {
      return await this.areaService.deleteArea(parseInt(id));
    } catch (e) {
      let exception = new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      if (e.message === AreaService.notAffectedRowsError.message) {
        exception = new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
      throw exception;
    }
  }
}
