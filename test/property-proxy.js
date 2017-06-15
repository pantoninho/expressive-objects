const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

const propProxy = require('../src/property-proxy');

describe('[Property Proxy]', () => {
    it('handler should be able to intercept a property access on an object', () => {

        const spy = sinon.spy();
        const dummy = {};

        const proxied = propProxy(dummy, spy);

        proxied.something;

        spy.should.have.been.calledOnce;
        spy.should.have.been.calledWithExactly(dummy, 'something');
    });
});