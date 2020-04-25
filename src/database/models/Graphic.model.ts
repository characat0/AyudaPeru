import { Graphicable } from '../../common/interfaces/graphicable.interface';
import { ApiResponseProperty } from '@nestjs/swagger';

export class Graphic implements Graphicable{
  @ApiResponseProperty()
  readonly type: 'Feature'
  @ApiResponseProperty()
  readonly geometry: object
  @ApiResponseProperty()
  readonly properties: {
    code?: string
  }
}
