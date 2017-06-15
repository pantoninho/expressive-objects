[![Build Status](https://travis-ci.org/pantoninho/expressive-objects.svg?branch=master)](https://travis-ci.org/pantoninho/expressive-objects)
[![Test Coverage](https://codeclimate.com/github/pantoninho/expressive-objects/badges/coverage.svg)](https://codeclimate.com/github/pantoninho/expressive-objects/coverage)
[![Code Climate](https://codeclimate.com/github/pantoninho/expressive-objects/badges/gpa.svg)](https://codeclimate.com/github/pantoninho/expressive-objects)
[![Issue Count](https://codeclimate.com/github/pantoninho/expressive-objects/badges/issue_count.svg)](https://codeclimate.com/github/pantoninho/expressive-objects)
[![dependencies Status](https://david-dm.org/pantoninho/expressive-objects/status.svg)](https://david-dm.org/pantoninho/expressive-objects)
[![devDependencies Status](https://david-dm.org/pantoninho/expressive-objects/dev-status.svg)](https://david-dm.org/pantoninho/expressive-objects?type=dev)

# expressive-objects

Build expressive APIs with chained properties.

If you ever wanted to build something with an API *like* chai, you might be looking for this.

This does not create 'connectors' that keep returning the same object, instead this builds a real object with property chains (paths) defined by yourself.

```
const expressive = require('expressive-objects');

const api = [{
    path: 'increment.two.by',
    value: function(number) {
        return 2 + number;
    }
}, {
    path: 'increment.two',
    value: function() {
        return 3;
    }
}, {
    path: 'this is a potato',
    value: 'potato'
}, {
    path: ['this', 'also', 'works'],
    value: true
}];

const obj = expressive(api);

console.log(obj.increment.two.by(3)); // 5;
console.log(obj.increment.two()); // 3;
console.log(obj.this.is.a.potato); // 'potato';
console.log(obj.this.aslo.works); // true
```

