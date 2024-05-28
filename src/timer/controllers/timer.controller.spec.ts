import { faker } from '@faker-js/faker';
import { TimerController } from "./timer.controller"
import { Test, TestingModule } from "@nestjs/testing";
import { TimerService } from "../services/timer.service";
import { TimerStatus } from 'src/common/enums/timer-status.enum';
import { HttpStatusCodes } from 'src/common/enums/http-status-codes.enum';
import { AppLogger } from 'src/core';

describe('TimerController', () => {
    let controller: TimerController;
    let payload;
    let param;
    let logger: AppLogger;

    // setting up mocks
    const timerServiceMock = {
        publish: jest.fn().mockResolvedValue({
            timerId: faker.string.uuid(),
            timerStatus: TimerStatus.Scheduled,
            timeLeft: faker.number.int()
        })
    };
    const mockLogger = {
        error: jest.fn(),
        info: jest.fn(),
        setContext: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TimerController],
            providers: [
                {
                    provide: TimerService,
                    useValue: timerServiceMock,
                },
                {
                    provide: AppLogger,
                    useValue: mockLogger,
                },
            ]
        }).compile();

        controller = module.get<TimerController>(TimerController);
        logger = module.get<AppLogger>(AppLogger);
        jest.spyOn(logger, 'info').mockImplementationOnce(() => null);
        jest.spyOn(logger, 'error').mockImplementationOnce(() => null);
        jest.spyOn(logger, 'setContext').mockImplementationOnce(() => null);

        payload = {
            webhookUrl: "http://www.localhost:3000/v1/health",
            hours: 1,
            minutes: 2,
            seconds: 3
        }

    });

    it('should be defined', async () => {
        expect(controller).toBeDefined();
    });

    describe('Create Timer', () => {
        it('should return 201 created response', async () => {
            let result, error;
            try {
                result = await controller.addTimer(payload);
            } catch (e) {
                error = e;
            } finally {
                expect(error).toBeUndefined();
                expect(result).toBeDefined();
                expect(result.code).toEqual(HttpStatusCodes.SUCCESS_CODE_CREATED);
                expect(result.message).toEqual('Timer Created!');
                expect(result.timer).toBeDefined();
                expect(result.timer.timerId).toBeDefined();
                expect(result.timer.timerStatus).toBeDefined();
                expect(result.timer.timeLeft).toBeDefined();
            }
        });
    });
});
