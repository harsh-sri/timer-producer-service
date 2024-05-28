import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { TimerResponse } from "./timer-response.class";
import { Exclude } from "class-transformer";
import { HttpStatusCodes } from "src/common/enums/http-status-codes.enum";
import { HttpResponseMessage } from "src/common/enums/response-message.enum";
import { TimerStatus } from "src/common/enums/timer-status.enum";


export class BaseResponse {
    @ApiHideProperty()
    @Exclude()
    static readonly _description = 'Timer API Response';

    constructor(partial: Partial<BaseResponse>) {
        Object.assign(this, partial);
    }

    @ApiProperty({
        type: 'number',
        title: 'Http Response Code',
        enum: [
            HttpStatusCodes.SUCCESS_CODE_CREATED,
            HttpStatusCodes.FAILED,
            HttpStatusCodes.SUCCESS_CODE_OK,
        ],
        required: false,
    })
    code: number;

    @ApiProperty({
        type: 'string',
        title: 'Response Message',
        enum: [HttpResponseMessage.SUCCESS, HttpResponseMessage.FAILED],
        example: 'Success',
        required: false,
    })
    message: string;


    @ApiProperty({
        type: TimerResponse,
        title: 'Timer',
        example: `{timerId: 'c1f2ab7e-1836-42fd-aa27-6bf15b7e565a', timeLeft: 100, timerStatus: ${TimerStatus.Scheduled}}`,
        required: false,
    })
    timer: TimerResponse

}