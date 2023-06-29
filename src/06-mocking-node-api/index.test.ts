// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsProm from 'fs/promises';
describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const time = 500;
    doStuffByTimeout(callback, time);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, time);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const time = 500;
    doStuffByTimeout(callback, time);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const time = 500;
    doStuffByInterval(callback, time);
    expect(setInterval).toHaveBeenLastCalledWith(callback, time);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const time = 500;
    doStuffByInterval(callback, time);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    const pathToFile = './somefile.txt';
    readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenLastCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    expect(await readFileAsynchronously('non-existing-file.md')).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = './somefile.txt';
    const fileContent = 'This is what file contains.';
    fs.existsSync = jest.fn(() => true);
    fsProm.readFile = jest.fn().mockResolvedValue(fileContent);
    expect(await readFileAsynchronously(pathToFile)).toBe(fileContent);
  });
});
