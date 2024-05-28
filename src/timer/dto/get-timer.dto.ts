import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsUUID } from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class GetTimerDto {
    @ApiProperty({
        name: 'timerId',
        type: 'uuid<string>',
        description: 'unique identifier to fetch timer details',
        required: true,
        example: 'c1f2ab7e-1836-42fd-aa27-6bf15b7e565a',
    })
    @IsDefined()
    @IsUUID()
    timerId: UUID;
}
