const expect = require('chai').expect;

describe('provided auth-helper', () => {
  let authProvider;
  beforeEach(() => {
    authProvider = require('../../muir-node-server-utils/auth-helper');
  });

  describe('isAuthenticated', () => {
    it('calls next() if true', () => {
      let nextWasCalled = false;
      const req = { isAuthenticated: () => true };
      const next = () => (nextWasCalled = true);
      authProvider.isAuthenticated(req, null, next);
      expect(nextWasCalled).to.equal(true);
    });

    it('returns 401 if not true', () => {
      const req = { isAuthenticated: () => false };
      let resStatus, resJson;
      const res = {
        status: function(code) {
          resStatus = code;
          return this;
        },
        json: json => (resJson = json)
      };
      authProvider.isAuthenticated(req, res);
      expect(resStatus).to.equal(401);
      expect(resJson).to.include({ message: 'Unauthorized' });
    });
  });
});
