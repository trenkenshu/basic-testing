// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    expect(ba.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    expect(() => ba.withdraw(balance + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    const ba2 = getBankAccount(balance);
    expect(() => ba.transfer(balance + 1, ba2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    expect(() => ba.transfer(balance + 1, ba)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    ba.deposit(balance);
    expect(ba.getBalance()).toBe(balance * 2);
  });

  test('should withdraw money', () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    ba.withdraw(balance / 2);
    expect(ba.getBalance()).toBe(balance / 2);
  });

  test('should transfer money', () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    const ba2 = getBankAccount(balance);
    ba.transfer(balance, ba2);
    expect(ba.getBalance()).toBe(0);
    expect(ba2.getBalance()).toBe(balance * 2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    const fetched = await ba.fetchBalance();
    if (fetched) {
      expect(typeof fetched).toBe('number');
    } else {
      expect(fetched).toBe(null);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    ba.fetchBalance = jest.fn().mockResolvedValue(balance / 2);
    await ba.synchronizeBalance();
    expect(ba.getBalance()).toBe(balance / 2);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 100;
    const ba = getBankAccount(balance);
    ba.fetchBalance = jest.fn().mockResolvedValue(null);
    expect(() => ba.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
