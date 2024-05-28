import { Body, ClassSerializerInterceptor, Controller,Get,Param,Post, UseInterceptors } from "@nestjs/common";
import { HttpStatusCodes } from "src/common/enums/http-status-codes.enum";
import { ValidationPipe } from "src/common/pipes";
import { AppLogger } from "src/core";
import { TimerService } from "../services/timer.service";
import { CreateTimerDto } from "../dto/create-timer.dto";
import { BaseResponse } from "../serializers/base-response.class";
import { BaseController } from "src/common/controllers/base.controller";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { timerTags } from "src/common/docs/constants";
import { GetTimerDto } from "../dto/get-timer.dto";

@ApiTags(...timerTags)
@Controller('v1')
export class TimerController extends BaseController {
    constructor(
        private readonly logger: AppLogger,
        private readonly timerService: TimerService,
    ) {
        super();
        this.logger.setContext(TimerController.name);
    }
    
    @Post('/timer')
    @ApiOperation({
        operationId: 'createTimer',
        summary: 'CREATE',
        description: 'create a new timer',
    })
    @ApiCreatedResponse({
        description: BaseResponse._description,
        type: BaseResponse,
    })
    @UseInterceptors(ClassSerializerInterceptor)
    async addTimer(@Body(new ValidationPipe()) createTimerDto: CreateTimerDto):Promise<BaseResponse> {
        const { timerId, timerStatus, timeLeft } = await this.timerService.publish(createTimerDto);

        return new BaseResponse({
            code: HttpStatusCodes.SUCCESS_CODE_CREATED,
            message: 'Timer Created!',
            timer: {
                timerId,
                timeLeft,
                timerStatus,
            },
        });
    }


    @Get('/timer/:timerId')
    @ApiOperation({
        operationId: 'getTimer',
        summary: 'GET',
        description: 'get a timer details by timer id',
    })
    @ApiOkResponse({
        description: BaseResponse._description,
        type: BaseResponse,
    })
    @UseInterceptors(ClassSerializerInterceptor)
    async getTimer(@Param() timerId: GetTimerDto): Promise<BaseResponse> {
        try {
            const validationPipe = new ValidationPipe();
            const validatedTimerId: GetTimerDto = await validationPipe.transform(timerId, {
                type: 'custom',
                metatype: GetTimerDto,
            });
            const { timerStatus, timeLeft } = await this.timerService.getTimer(validatedTimerId);
            return new BaseResponse({
                code: HttpStatusCodes.SUCCESS_CODE_OK,
                message: 'fetched successfully!',
                timer: {
                    timerId: validatedTimerId.timerId,
                    timerStatus,
                    timeLeft
                }
            })
        } catch (e) {
            this.logger.error('Internal server error!!', e);
            throw e;
        }
    }
}
