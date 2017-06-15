const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

const expressive = require('../src/expressive');

describe('[Expressive Object Factory]', () => {

    describe('non valid paths', () => {

        let api;

        before(() => {
            api = [{
                path: ['i', 'am', 'just', 'a', 'dummy'],
                value: function() {
                    return 'i will never be returned';
                }
            }];
        });

        it('should go up the object prototype chain', () => {

            const obj = expressive(api);

            obj.should.be.an('object');
            obj.toString.should.be.a('function');
            Object.prototype.isPrototypeOf(obj).should.be.ok;

        });

        it('should throw an error if not found on prototype too', () => {

        });

    });

    describe('valid paths', () => {
        it('should be able to create expressive api with 1 depth level', () => {

            const api = [{
                path: ['hello'],
                value: function() {
                    return 'world';
                },
            }, {
                path: ['true'],
                value: true
            }];

            const obj = expressive(api);
            obj.should.be.an('object');
            obj.should.have.all.keys('hello', 'true');
            Object.keys(obj).should.have.lengthOf(2);

            obj.hello.should.be.a('function');
            obj.hello().should.equal('world');

            obj.true.should.be.a('boolean');
            obj.true.should.be.ok;
        });

        it('should be able to create expressive api with 2-or-more depth levels', () => {

            const api = [{
                path: ['increment', 'two'],
                value: function() {
                    return 3;
                }
            }, {
                path: ['am', 'i', 'your', 'father'],
                value: true
            }];

            const obj = expressive(api);
            obj.should.be.an('object');
            obj.should.have.all.keys('increment', 'am');
            Object.keys(obj).should.have.lengthOf(2);

            obj.increment.should.be.an('object');
            obj.increment.should.have.property('two');
            Object.keys(obj.increment).should.have.lengthOf(1);

            obj.increment.two.should.be.a('function');
            obj.increment.two().should.equal(3);

            obj.am.i.your.father.should.be.a('boolean');
            obj.am.i.your.father.should.be.ok;
        });

        it('should be able to merge functions with objects', () => {

            const api = [{
                path: ['increment', 'two'],
                value: function() {
                    return 3;
                }
            }, {
                path: ['increment', 'two', 'by'],
                value: function(number) {
                    return 2 + number;
                }
            }];


            const obj = expressive(api);
            obj.should.be.an('object');
            obj.should.have.property('increment');
            Object.keys(obj).should.have.lengthOf(1);

            obj.increment.should.be.an('object');
            obj.increment.should.have.property('two');
            Object.keys(obj.increment).should.have.lengthOf(1);

            obj.increment.two.should.be.a('function');
            obj.increment.two.should.have.property('by');
            Object.keys(obj.increment.two).should.have.lengthOf(1);

            obj.increment.two().should.equal(3);
            obj.increment.two.by(2).should.equal(4);

        });

        it('should be able to merge objects with functions', () => {

            const api = [{
                path: ['increment', 'two', 'with'],
                value: function(number) {
                    return 2 + number;
                }
            }, {
                path: ['increment', 'two', 'by'],
                value: function(number) {
                    return 2 + number;
                }
            }, {
                path: ['increment', 'two'],
                value: function() {
                    return 3;
                }
            }];


            const obj = expressive(api);
            obj.should.be.an('object');
            obj.should.have.property('increment');
            Object.keys(obj).should.have.lengthOf(1);

            obj.increment.should.be.an('object');
            obj.increment.should.have.property('two');
            Object.keys(obj.increment).should.have.lengthOf(1);

            obj.increment.two.should.be.a('function');
            obj.increment.two.should.have.all.keys('by', 'with');
            Object.keys(obj.increment.two).should.have.lengthOf(2);

            obj.increment.two().should.equal(3);
            obj.increment.two.by(2).should.equal(4);
            obj.increment.two.with(2).should.equal(4);

        });

        it('should override any existing property with a another value (as long as its not mergeable)', () => {

            const api = [{
                path: ['increment', 'two', 'with'],
                value: function(number) {
                    return 2 + number;
                }
            }, {
                path: ['increment', 'two'],
                value: function(number) {
                    return 2 + number;
                }
            }, {
                path: ['increment', 'two'],
                value: 3
            }];

            const obj = expressive(api);
            obj.should.be.an('object');
            obj.should.have.property('increment');
            Object.keys(obj).should.have.lengthOf(1);

            obj.increment.should.be.an('object');
            obj.increment.should.have.property('two');
            Object.keys(obj.increment).should.have.lengthOf(1);

            obj.increment.two.should.be.a('number');
            obj.increment.two.should.equal(3);

        });
    });
});