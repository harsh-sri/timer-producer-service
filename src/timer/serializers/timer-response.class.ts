import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { TimerStatus } from "src/common/enums/timer-status.enum";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class TimerResponse {
    @ApiProperty({
        type: 'string',
        title: 'timerId',
        description: 'unique identifier',
        example: 'c1f2ab7e-1836-42fd-aa27-6bf15b7e565a',
        required: true,
    })
    @Expose({
        toPlainOnly: true,
    })
    timerId: UUID;

    @ApiProperty({
        type: 'number',
        title: 'timeLeft',
        description: 'time left before the timer trigger in seconds',
        example: '10',
        required: true,
    })
    @Expose({
        toPlainOnly: true,
    })
    timeLeft: number;

    @ApiProperty({
        type: 'enum',
        title: 'timerStatus',
        enum: [TimerStatus.Scheduled, TimerStatus.Running, TimerStatus.Finished],
        example: TimerStatus.Scheduled,
        required: true,
    })
    @Expose({
        toPlainOnly: true,
    })
    timerStatus: TimerStatus
}
