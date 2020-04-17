import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CodigoPostalService } from './codigo-postal.service';
import { Response } from 'express';
import { stringify } from 'wkt';

@Controller('postcodes')
export class CodigoPostalController {
  constructor(private codigoPostalService: CodigoPostalService) {}

  @Get()
  async findAllCodigoPostal(): Promise<number[]> {
    return this.codigoPostalService.findAll();
  }

  @Get(':id')
  async findCodigoPostalById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    try {
      const codigo: { id: number, poligono: object } = await this.codigoPostalService.findPoligonoById(parseInt(id));
      const response = {
        type: "Feature",
        geometry: codigo.poligono,
        properties: {
          code: codigo.id
        }
      }
      return res.json(response);
    } catch (e) {
      return res.status(404).send(e.message);
    }
  }

  @Put(':id')
  async modifyCodigoPostal(@Param('id') id: string, @Body() body, @Res() res: Response): Promise<Response> {
    let { geometria } = body;
    if (!geometria) {
      return res.status(400).send('Property geometria is not defined.');
    }
    try {
      if (typeof geometria === 'object') {
        geometria = stringify(geometria);
      }
      const results: number[] = await this.codigoPostalService.updateCodigoPostal(parseInt(id), geometria);
      if (results[1] > 0) {
        return res.status(204).send();
      } else {
        return res.status(200).json({
          statusCode: 200,
          message: 'No rows were modified'
        });
      }
    } catch (e) {
      return res.status(400).send(e.message);
    }
  }

  @Post()
  async createCodigoPostal(@Body() body, @Res() res: Response): Promise<Response> {
    let { id, geometria } = body;
    try {
      if (typeof geometria === 'object') {
        geometria = stringify(geometria);
      }
      await this.codigoPostalService.createCodigoPostal(parseInt(id), geometria);
      return res.status(201).send();
    } catch (e) {
      return res.status(400).send(e.message);
    }
  }

  @Post('find')
  async findCodigoPostal(@Body() body, @Res() res: Response) {
    const { longitud, latitud } = body;
    try {
      const codigo: object = (await this.codigoPostalService.findCodigoPostal(parseFloat(longitud), parseFloat(latitud)))[0];
      if (!codigo) {
        return res.status(400).send("Codigo postal no encontrado");
      }
      return res.status(200).json(codigo);
    } catch (e) {
      return res.status(400).send(e.message)
    }
  }

  @Delete(':id')
  async deleteCodigoPostal(@Param('id') id: string, @Res() res: Response) {
    console.log("AQUI")
    if (id === undefined) return res.status(400).send();
    const rows: number = await this.codigoPostalService.deleteCodigoPostal(parseInt(id));
    if (rows === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: `Cannot DELETE /postcodes/${id}`,
        error: "Not Found"
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        message: `${rows} rows were deleted.`
      });
    }
  }
}
