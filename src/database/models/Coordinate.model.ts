import { ApiProperty } from '@nestjs/swagger';

export class Coordinate implements Coordinates{
  @ApiProperty()
  longitude: number
  @ApiProperty()
  latitude: number

  @ApiProperty({ required: false })
  readonly accuracy: number;

  @ApiProperty({ required: false })
  readonly altitude: number | null;
  @ApiProperty({ required: false })
  readonly altitudeAccuracy: number | null;
  @ApiProperty({ required: false })
  readonly heading: number | null;
  @ApiProperty({ required: false })
  readonly speed: number | null;
}