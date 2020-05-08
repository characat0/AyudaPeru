import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ComentarioService } from './comentario.service';

@Controller('comentario')
export class ComentarioController {
  constructor(private comentarioService: ComentarioService) {}

  @Post()
  async createComentario(@Body() body: { areaId: string, usuarioId: string, texto: string }) {
    try {
      const { areaId, usuarioId, texto } = body;
      await this.comentarioService.createComentario({ areaId, usuarioId, texto });
      return 'ok';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
