// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(2);
    const resultString = await resolveValue('someString');
    const resultNumber = await resolveValue(777);
    expect(resultString).toBe('someString');
    expect(resultNumber).toBe(777);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect.assertions(2);
    const msg = 'stringMessage';
    expect(() => throwError(msg)).toThrow(msg);
    expect(() => throwError(msg)).toThrow(Error);
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(2);
    expect(throwError).toThrow('Oops!');
    expect(throwError).toThrow(Error);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(2);
    expect(throwCustomError).toThrow(MyAwesomeError);
    expect(throwCustomError).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(2);
    await expect(rejectCustomError).rejects.toThrow(
      'This is my awesome custom error!',
    );
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
