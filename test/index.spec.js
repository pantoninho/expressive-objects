const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

const expressive = require('../');

describe('[Expressive Object]', () => {

    let api;

    beforeEach(() => {
        api = [{
            path: ['hello', 'from the world'],
            value: 'affirmative'
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
        obj.should.have.all.keys('hello', 'this', 'you');
        Object.keys(obj).should.have.lengthOf(3);

        obj.hello.should.be.a('object');
        obj.hello.from.the.world.should.equal('affirmative');

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
        obj.should.have.all.keys('hello', 'this', 'you');
        Object.keys(obj).should.have.lengthOf(3);

        expressive.extend(obj, plugin);

        obj.should.be.an('object');
        obj.should.have.all.keys('hello', 'this', 'you', 'i');
        Object.keys(obj).should.have.lengthOf(4);

        obj.hello.should.be.a('object');
        obj.hello.from.the.world.should.equal('affirmative');

        obj.this.is.a.pointy.path.should.equal('indeed');
        obj.you.may.also.add.spaces.should.equal('so cool');

        obj.i.am.a.plugin.should.be.ok;

    });
});