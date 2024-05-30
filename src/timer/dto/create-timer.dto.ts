import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsUrl, Max, Min } from 'class-validator';

export class CreateTimerDto {
  @ApiProperty({
    name: 'hours',
    required: true,
    maximum: 59,
    type: 'number',
    description: 'hours',
  })
  @IsDefined()
  @IsInt()
  @Min(0)
  hours: number;

  @ApiProperty({
    name: 'minutes',
    required: true,
    maximum: 59,
    type: 'number',
    description: 'minutes',
  })
  @IsDefined()
  @IsInt()
  @Min(0)
  @Max(59)
  minutes: number;

  @ApiProperty({
    name: 'seconds',
    required: true,
    maximum: 59,
    type: 'number',
    description: 'seconds',
  })
  @IsDefined()
  @IsInt()
  @Min(0)
  @Max(59)
  seconds: number;

  @ApiProperty({
    name: 'webhookUrl',
    required: true,
    maxLength: 200,
    type: 'string',
    description: 'webhook url',
  })
  @IsDefined()
  @IsUrl()
  webhookUrl: string;
}
