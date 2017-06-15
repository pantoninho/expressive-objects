const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

const expressive = require('../src/expressive');

describe('[Expressive Object Factory]', () => {

    it('Resolvers that are not functions should throw an error on creation', () => {

        const api = [{
            path: 'i am just a dummy',
            resolver: 4
        }];

        expressive.bind(null, api).should.throw('Resolver for [i am just a dummy] is not a function');

    });


    describe('Non declared paths', () => {

        let api;

        before(() => {
            api = [{
                path: 'i am just a dummy',
                resolver: function() {
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

    });

    describe('String paths', () => {
        it('should be able to create expressive api with 1 depth level', () => {

            const api = [{
                path: 'hello',
                resolver: function() {
                    return 'world';
                }
            }, {
                path: 'luke',
                resolver: function() {
                    return 'skywalker';
                }
            }];

            const obj = expressive(api);

            obj.should.be.an('object');
            obj.hello.should.be.a('function');
            obj.hello().should.equal('world');

            obj.should.be.an('object');
            obj.luke.should.be.a('function');
            obj.luke().should.equal('skywalker');

        });

        it('should be able to create expressive api with 2-or-more depth levels', () => {

            const api = [{
                path: 'increment.two',
                resolver: function() {
                    return 3;
                }
            }, {
                path: 'am i your father',
                resolver: function() {
                    return true;
                }
            }];

            const obj = expressive(api);
            obj.should.be.an('object');

            obj.increment.should.be.a('function');
            obj.increment.two.should.be.a('function');
            obj.increment.two().should.equal(3);

            obj.should.be.an('object');
            obj.am.i.your.father.should.be.a('function');
            obj.am.i.your.father.should.be.ok;

        });
    });

    describe('Array paths', () => {
        it('should be able to create expressive api with 1 depth level', () => {

            const api = [{
                path: ['hello'],
                resolver: function() {
                    return 'world';
                }
            }];

            const obj = expressive(api);

            obj.should.be.an('object');
            obj.hello.should.be.a('function');
            obj.hello().should.equal('world');

        });

        it('should be able to create expressive api with 2-or-more depth levels', () => {

            const api = [{
                path: ['increment', 'two'],
                resolver: function() {
                    return 3;
                }
            }, {
                path: ['am', 'i', 'your', 'father'],
                resolver: function() {
                    return true;
                }
            }];

            const obj = expressive(api);
            obj.should.be.an('object');

            obj.increment.should.be.a('function');
            obj.increment.two.should.be.a('function');
            obj.increment.two().should.equal(3);

            obj.should.be.an('object');
            obj.am.i.your.father.should.be.a('function');
            obj.am.i.your.father.should.be.ok;
        });
    });
});