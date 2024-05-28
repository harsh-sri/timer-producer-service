import { Injectable } from "@nestjs/common";
import { CreateTimerDto } from "../dto/create-timer.dto";
import { ProducerService } from "src/kafka/producer.service";
import {v4} from 'uuid';
import { TimerStatus } from "src/common/enums/timer-status.enum";
import { ITimerRequestPayload, ITimerResponse } from "../interfaces/timer.interface";
import { TimerEntity } from "../entities/timer.entity";
import { MongoRepository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AppLogger } from "src/core";
import { UnExpectedErrorException } from "src/common/exceptions/unexpected-error.exception";
import { GetTimerDto } from "../dto/get-timer.dto";
import { NotFoundException } from "src/common/exceptions/not-found.exception";

@Injectable()
export class TimerService {
    constructor(
        @InjectRepository(TimerEntity)
        private readonly timerRepository: MongoRepository<TimerEntity>,
        private readonly producerService: ProducerService,
        private readonly logger: AppLogger
    ) {
        this.logger.setContext(TimerService.name)
    }

    private calculateExpiryTime(timeLeft: number): Date {
        return new Date(Date.now() + timeLeft * 1000)
    }

    private getSeconds(hours: number, minutes: number, seconds: number): number {
        return hours * 3600 + minutes * 60 + seconds;
    }

    private calculateTimeLeft(expiryTime: Date): number {
        return Math.max(0, Math.floor((new Date(expiryTime).getTime() - Date.now()) / 1000))
    }

    async publish(createTimerDto: CreateTimerDto): Promise<ITimerResponse> {
       try {
           const timerId = v4();
           const { hours, minutes, seconds, webhookUrl } = createTimerDto;
           const expiryTime = this.calculateExpiryTime(this.getSeconds(hours, minutes, seconds));
           const timerStatus = TimerStatus.Scheduled;
           const timerPayload: ITimerRequestPayload = {
               timerId,
               expiryTime,
               timerStatus,
               webhookUrl,
           }
           await this.producerService.produce('test', {
               value: JSON.stringify(timerPayload),
           });
           return {
               timerId,
               timeLeft: this.calculateTimeLeft(expiryTime),
               timerStatus,
           };
       } catch (e) {
            throw new UnExpectedErrorException({
                details: {
                    message: 'Oops! something went wrong. Please try again',
                    stack: e.stack
                }
            })
       }
    }

    async getTimer(getTimerDto: GetTimerDto): Promise<ITimerResponse> {
        const timer = await this.timerRepository.findOne({
            where: {
                timerId: getTimerDto.timerId
            },
        });
        if (!timer) {
            throw new NotFoundException({
                details: {
                    message: `timer by timerId: ${getTimerDto.timerId}, not found`,
                },
            });
        }
        return {
            timerId: timer.timerId,
            timerStatus: timer.timerStatus,
            timeLeft: this.calculateTimeLeft(timer.expiryTime)
        };
    }
}
