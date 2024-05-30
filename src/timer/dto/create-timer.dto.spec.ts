import { instanceToPlain, plainToClass } from 'class-transformer';
import { CreateTimerDto } from './create-timer.dto';
import { validate } from 'class-validator';

describe('CreateTimerDto', () => {
  let payload;

  beforeEach(async () => {
    payload = {
      webhookUrl: 'http://www.localhost:3000/v1/health',
      hours: 1,
      minutes: 2,
      seconds: 3,
    };
  });

  it('should pass with valid input', async () => {
    const requestPayload = plainToClass(CreateTimerDto, payload);
    let error, result;
    try {
      result = await validate(requestPayload);
    } catch (e) {
      error = e;
    } finally {
      expect(error).toBeUndefined();
      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    }
  });

  describe('hours', () => {
    it('should throw an error if hours is not an integer', async () => {
      payload.hours = 'non-int';
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.min)).toEqual(
          'hours must not be less than 0',
        );
        expect(instanceToPlain(result[0].constraints.isInt)).toEqual(
          'hours must be an integer number',
        );
      }
    });

    it('should throw an error if hours is a float number', async () => {
      payload.hours = 2.2;
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.isInt)).toEqual(
          'hours must be an integer number',
        );
      }
    });

    it('should throw an error if hours is not defined', async () => {
      delete payload.hours;
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.isDefined)).toEqual(
          'hours should not be null or undefined',
        );
        expect(instanceToPlain(result[0].constraints.min)).toEqual(
          'hours must not be less than 0',
        );
        expect(instanceToPlain(result[0].constraints.isInt)).toEqual(
          'hours must be an integer number',
        );
      }
    });
  });

  describe('minutes', () => {
    it('should throw an error if minutes is not an integer', async () => {
      payload.minutes = 'non-int';
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.min)).toEqual(
          'minutes must not be less than 0',
        );
        expect(instanceToPlain(result[0].constraints.isInt)).toEqual(
          'minutes must be an integer number',
        );
      }
    });

    it('should throw an error if minutes is a float number', async () => {
      payload.minutes = 2.2;
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.isInt)).toEqual(
          'minutes must be an integer number',
        );
      }
    });

    it('should throw an error if minutes is not defined', async () => {
      delete payload.minutes;
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.isDefined)).toEqual(
          'minutes should not be null or undefined',
        );
        expect(instanceToPlain(result[0].constraints.min)).toEqual(
          'minutes must not be less than 0',
        );
        expect(instanceToPlain(result[0].constraints.isInt)).toEqual(
          'minutes must be an integer number',
        );
      }
    });
  });

  describe('seconds', () => {
    it('should throw an error if seconds is not an integer', async () => {
      payload.seconds = 'non-int';
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.min)).toEqual(
          'seconds must not be less than 0',
        );
        expect(instanceToPlain(result[0].constraints.isInt)).toEqual(
          'seconds must be an integer number',
        );
      }
    });

    it('should throw an error if seconds is a float number', async () => {
      payload.seconds = 2.2;
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.isInt)).toEqual(
          'seconds must be an integer number',
        );
      }
    });

    it('should throw an error if seconds is not defined', async () => {
      delete payload.seconds;
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.isDefined)).toEqual(
          'seconds should not be null or undefined',
        );
        expect(instanceToPlain(result[0].constraints.min)).toEqual(
          'seconds must not be less than 0',
        );
        expect(instanceToPlain(result[0].constraints.isInt)).toEqual(
          'seconds must be an integer number',
        );
      }
    });
  });

  describe('webhookUrl', () => {
    it('should throw an error if webhookUrl is not a valid url', async () => {
      payload.webhookUrl = 123;
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.isUrl)).toEqual(
          'webhookUrl must be a URL address',
        );
        expect(
          instanceToPlain(result[0].constraints.isDefined),
        ).toBeUndefined();
      }
    });
    it('should throw an error if webhookUrl is not defined', async () => {
      delete payload.webhookUrl;
      const requestPayload = plainToClass(CreateTimerDto, payload);
      let error, result;
      try {
        result = await validate(requestPayload);
      } catch (e) {
        error = e;
      } finally {
        expect(error).toBeUndefined();
        expect(result).toBeDefined();
        expect(instanceToPlain(result[0].constraints.isUrl)).toEqual(
          'webhookUrl must be a URL address',
        );
        expect(instanceToPlain(result[0].constraints.isDefined)).toEqual(
          'webhookUrl should not be null or undefined',
        );
      }
    });
  });
});
