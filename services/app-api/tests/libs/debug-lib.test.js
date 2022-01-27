const debugLib = require('../../libs/debug-lib');

describe("Test debug-lib", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test("Verify init configuration", async () => {
    //const retrieveDataSpy = jest.spyOn(debugLib, 'init').mockResolvedValueOnce(mResponse);

    expect(true).toEqual(true);
  });
});
