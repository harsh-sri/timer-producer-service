import { instanceToPlain, plainToClass } from 'class-transformer';
import { GetTimerDto } from './get-timer.dto';
import { validate } from 'class-validator';

describe('GetTimerDto', () => {
  let payload;

  beforeEach(async () => {
    payload = {
      timerId: '83f634df-1d8d-4468-969e-e1561e1d4980',
    };
  });

  it('should pass', async () => {
    const requestParam = plainToClass(GetTimerDto, payload);
    let error, result;
    try {
      result = await validate(requestParam);
    } catch (e) {
      error = e;
    } finally {
      expect(error).toBeUndefined();
      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    }
  });

  it('should throw an error if timer id is undefined', async () => {
    delete payload.timerId;
    const requestParam = plainToClass(GetTimerDto, payload);
    let error, result;
    try {
      result = await validate(requestParam);
    } catch (e) {
      error = e;
    } finally {
      expect(error).toBeUndefined();
      expect(result).toBeDefined();
      expect(instanceToPlain(result[0].constraints.isDefined)).toEqual(
        'timerId should not be null or undefined',
      );
      expect(instanceToPlain(result[0].constraints.isUuid)).toEqual(
        'timerId must be a UUID',
      );
    }
  });

  it('should throw an error if timer id is not uuid', async () => {
    payload.timerId = 'plain-text';
    const requestParam = plainToClass(GetTimerDto, payload);
    let error, result;
    try {
      result = await validate(requestParam);
    } catch (e) {
      error = e;
    } finally {
      expect(error).toBeUndefined();
      expect(result).toBeDefined();
      expect(instanceToPlain(result[0].constraints.isDefined)).toBeUndefined();
      expect(instanceToPlain(result[0].constraints.isUuid)).toEqual(
        'timerId must be a UUID',
      );
    }
  });
});
