import { Body, Controller, Get, Next, Param, Post, Res } from '@nestjs/common';
import { PostcodeService } from './postcode.service';
import { NextFunction, Response } from 'express';
import { PostCode } from '../../database/schema/PostCode.model';
import { Graphicable } from '../../interfaces/graphicable.interface';
import { Coordinate } from '../../database/models/Coordinate.model';

@Controller('postcode')
export class PostcodeController {
  constructor(private postcodeService: PostcodeService) {}

  @Get()
  findAll(): Promise<string[]> {
    return this.postcodeService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response, @Next() next: NextFunction): Promise<Graphicable> {
    try {
      const postCode: PostCode = await this.postcodeService.findById(id);
      const response: Graphicable = {
        type: "Feature",
        geometry: postCode.get('geometria'),
        properties: {
          code: postCode.get('id')
        }
      }
      res.json(response);
      return response;
    } catch (e) {
      if (e.message === this.postcodeService.notFoundError.message) {
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
      const { latitude, longitude } = body;
      const postCode: PostCode = await this.postcodeService.findByLatLong(latitude, longitude);
      const response: Graphicable = {
        type: "Feature",
        geometry: postCode.get('geometria'),
        properties: {
          code: postCode.get('id')
        }
      }
      res.status(200).json(response);
      return response;
    } catch (e) {
      if (e.message === this.postcodeService.notFoundError.message) {
        res.status(404).send(e.message);
        return;
      }
      next(e);
      return;
    }
  }
}
