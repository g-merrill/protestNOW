import protestService from './protestService';

beforeEach(() => {
  fetch.resetMocks();
})

describe('protestService', () => {
  describe('addProtest', () => {
    it('returns JSON', async () => {
      const protestInputs = {};
      const userService = { getUser: () => true };
      const expectedResponse = { protest: 'mockProtest' };

      fetch.mockResponseOnce(JSON.stringify(expectedResponse));
      const result = await protestService.addProtest(protestInputs, userService);

      expect(result).toEqual(expectedResponse);
    });

    it('returns undefined if no user is found', async () => {
      const protestInputs = {};
      const userService = { getUser: () => false };
      const expectedResponse = undefined;

      const result = await protestService.addProtest(protestInputs, userService);

      expect(result).toEqual(expectedResponse);
    });
    it('returns error message if res is not ok', async () => {
      const protestInputs = {};
      const userService = { getUser: () => true };

      fetch.mockRejectOnce();

      try {
        await protestService.addProtest(protestInputs, userService);
      } catch (error) {
        expect(error.message).toEqual('Error creating protest!');
      }
    });
  });
});
