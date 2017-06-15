const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

const expressive = require('../');

describe('[Expressive Object]', () => {

    let api;

    beforeEach(() => {
        api = [{
            path: ['hello'],
            value: function() {
                return 'world';
            },
        }, {
            path: ['true'],
            value: true
        }, {
            path: 'this.is.a.pointy.path',
            value: 'indeed'
        }, {
            path: 'you may also add spaces',
            value: 'so cool'
        }];
    });

    it('should be able to create an expressive object', () => {

        const obj = expressive(api);
        obj.should.be.an('object');
        obj.should.have.all.keys('hello', 'true', 'this', 'you');
        Object.keys(obj).should.have.lengthOf(4);

        obj.hello.should.be.a('function');
        obj.hello().should.equal('world');

        obj.true.should.be.a('boolean');
        obj.true.should.be.ok;

        obj.this.is.a.pointy.path.should.equal('indeed');
        obj.you.may.also.add.spaces.should.equal('so cool');
    });

    it('should be able to extend an expressive object', () => {

        const obj = expressive(api);

        const plugin = [{
            path: 'i am a plugin',
            value: true
        }];

        obj.should.be.an('object');
        obj.should.have.all.keys('hello', 'true', 'this', 'you');
        Object.keys(obj).should.have.lengthOf(4);

        expressive.extend(obj, plugin);

        obj.should.be.an('object');
        obj.should.have.all.keys('hello', 'true', 'this', 'you', 'i');
        Object.keys(obj).should.have.lengthOf(5);

        obj.hello.should.be.a('function');
        obj.hello().should.equal('world');

        obj.true.should.be.a('boolean');
        obj.true.should.be.ok;

        obj.this.is.a.pointy.path.should.equal('indeed');
        obj.you.may.also.add.spaces.should.equal('so cool');

        obj.i.am.a.plugin.should.be.ok;

    });
});