// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const timeout = 7500;
const relative = '/users/1';
//const data = { data: 'new test data' };

// jest.mock('axios', () => {
//   const originalModule = jest.requireActual('axios');
//   const get = jest.fn().mockResolvedValue({ data: 'new test data' });
//   const create = jest.fn(({ baseURL }) => {
//     return {
//       ...axios.create({ baseURL }),
//       get,
//     };
//   });

//   return {
//     ...originalModule,
//     create,
//   };
// });

//jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  afterAll(() => {
    jest.unmock('axios');
  });

  test(
    'should create instance with provided base url',
    async () => {
      mockedAxios.get = jest.fn().mockResolvedValue({ data: 'new test data' });
      mockedAxios.create = jest.fn().mockImplementation(() => {
        return {
          get: jest.fn().mockResolvedValue({ data: 'new test data' }),
        };
      });
      const tr = await throttledGetDataFromApi(relative);
      await tr;
      expect(mockedAxios.create).toHaveBeenLastCalledWith({
        baseURL: 'https://jsonplaceholder.typicode.com',
      });
    },
    timeout,
  );

  test(
    'should perform request to correct provided url',
    async () => {
      // mockedAxios.create = jest.fn().mockImplementation(() => {
      //   return mockedAxios;
      // });
      // mockedAxios.get = jest.fn().mockResolvedValue({ data: 'new test data' });
      // const tr = await throttledGetDataFromApi(relative);
      // await tr;
      // expect(mockedAxios.get).toHaveBeenCalled(); //With(relative);
    },
    timeout,
  );

  test(
    'should return response data',
    async () => {
      // const answer: { data: string } = await throttledGetDataFromApi(relative);
      // expect(answer.data).toBe('new test data');
    },
    timeout,
  );
});
