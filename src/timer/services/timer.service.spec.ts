import { MongoRepository } from 'typeorm';
import { v4 } from 'uuid';
import { TimerService } from './timer.service';
import { TimerEntity } from '../entities/timer.entity';
import { AppLogger } from 'src/core';
import { CreateTimerDto } from '../dto/create-timer.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProducerService } from 'src/kafka/producer.service';
import { TimerStatus } from 'src/common/enums/timer-status.enum';
import { HttpStatusCodes } from 'src/common/enums/http-status-codes.enum';

class timerRepositoryFake {
  // eslint-disable-next-line
  async findOne() {}
}

describe('TimerService', () => {
  let service: TimerService;
  let timerRepository: MongoRepository<TimerEntity>;
  let logger: AppLogger;
  let createTimerPayload: CreateTimerDto;
  let timerResponse;
  let timerId;

  // setting up mocks
  const mockLogger = {
    info: jest.fn(),
    setContext: jest.fn(),
  };

  const producerServiceMock = {
    produce: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AppLogger,
          useValue: mockLogger,
        },
        {
          provide: getRepositoryToken(TimerEntity),
          useClass: timerRepositoryFake,
        },
        {
          provide: ProducerService,
          useValue: producerServiceMock,
        },
        TimerService,
      ],
    }).compile();

    service = module.get<TimerService>(TimerService);
    timerRepository = module.get(getRepositoryToken(TimerEntity));
    logger = module.get<AppLogger>(AppLogger);
    jest.spyOn(logger, 'setContext').mockImplementationOnce(() => null);
    createTimerPayload = {
      webhookUrl: 'http://www.localhost:3000/v1/health',
      hours: 1,
      minutes: 2,
      seconds: 3,
    };
    timerId = v4();
    timerResponse = {
      timerId,
      timerStatus: TimerStatus.Scheduled,
      expiryTime: '2024-05-27T08:05:00.384Z',
    };
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('calculateExpiryTime', () => {
    it('should return the expiry time', () => {
      let error, result;
      try {
        // to enable private method tests
        const privateMethodProto = Object.getPrototypeOf(service);
        result = privateMethodProto.calculateExpiryTime(1232);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      }
    });
  });

  describe('calculateTimeLeft', () => {
    it('should return the time left in timer schedule', () => {
      let error, result;
      try {
        // to enable private method tests
        const privateMethodProto = Object.getPrototypeOf(service);
        result = privateMethodProto.calculateTimeLeft(10);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
      }
    });
  });

  describe('getSeconds', () => {
    it('should return the time left in timer schedule', () => {
      let error, result;
      try {
        // to enable private method tests
        const privateMethodProto = Object.getPrototypeOf(service);
        result = privateMethodProto.getSeconds(0, 0, 10);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(result).toEqual(10);
      }
    });
  });

  describe('publish', () => {
    it('should publish the timer message successfully', async () => {
      let error, result;
      producerServiceMock.produce.mockResolvedValueOnce(() => null);
      try {
        result = await service.publish(createTimerPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(result.timerId).toBeDefined();
        expect(result.timerStatus).toBeDefined();
        expect(result.timerStatus).toEqual(TimerStatus.Scheduled);
        expect(result.timeLeft).toBeDefined();
        expect(producerServiceMock.produce).toHaveBeenCalled();
        expect(producerServiceMock.produce).toHaveBeenCalledTimes(1);
      }
    });

    it('should throw an error if message can not be published due to broker', async () => {
      let error, result;
      producerServiceMock.produce.mockImplementationOnce(() => {
        throw new Error('message can not be published');
      });
      try {
        result = await service.publish(createTimerPayload);
      } catch (e) {
        error = e.response;
        error.status = e.status;
      } finally {
        expect(error).toBeDefined();
        expect(error.details.message).toEqual(
          'Oops! something went wrong. Please try again',
        );
        expect(error.status).toEqual(HttpStatusCodes.UNEXPECTED_ERROR);
        expect(result).toBeUndefined();
      }
    });
  });

  describe('getTimer', () => {
    it('should return the timer if it exists', async () => {
      jest
        .spyOn(timerRepository, 'findOne')
        .mockResolvedValueOnce(timerResponse);
      let error, result;
      try {
        result = await service.getTimer({ timerId });
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(result.timerId).toBeDefined();
        expect(result.timerId).toEqual(timerId);
        expect(result.timerStatus).toBeDefined();
        expect(result.timerStatus).toEqual(timerResponse.timerStatus);
        expect(result.timeLeft).toBeDefined();
      }
    });

    it('should return not found if timer does not exists', async () => {
      jest.spyOn(timerRepository, 'findOne').mockResolvedValueOnce(null);
      let error, result;
      try {
        result = await service.getTimer({ timerId });
      } catch (e) {
        error = e.response;
        error.status = e.status;
      } finally {
        expect(error).toBeDefined();
        expect(error.details.message).toEqual(
          `timer by timerId: ${timerId}, not found`,
        );
        expect(error.status).toEqual(HttpStatusCodes.NOT_FOUND);
        expect(result).toBeUndefined();
      }
    });
  });
});
