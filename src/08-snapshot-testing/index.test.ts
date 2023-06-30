// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const nums = [1, 2, 3, 4];
    const list1 = generateLinkedList(nums);
    expect(list1).toStrictEqual(generateLinkedList(nums));
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const nums = [1, 2, 3, 4];
    const list1 = JSON.stringify(generateLinkedList(nums));
    expect(list1).toMatchSnapshot();
  });
});
