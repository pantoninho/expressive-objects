const _ = require('lodash');
const expressive = {};
const args = [];

const api = [{
    path: ['daily', 'allowance', 'from', 'monthly', 'budget'],
    return: function() {
        console.log('daily allowance from monthly budget!');
    }
}, {
    path: ['daily', 'allowance', 'from', 'daily', 'budget'],
    return: function() {
        console.log('daily allowance from daily budget!');
    } 
}, {
    path: ['this', 'is', 'one', 'more', 'test'],
    return: 4
}];

const createExpressiveObject = (api) => {

    const paths = api.map(definition => definition.path);
    const expressive = {
        args: []
    };

    const handler = {
        get: function(target, name) {

            const path = [...target.args, name];

            if (!isValidPath(path, paths)) {
                return target[name];
            }

            const executor = function(...args) {
                const exec = getPathValue(path, api);

                if (!exec) {
                    return new Error(path.join('.') + ' is not a function.');
                }

                return exec(...args);
            };

            executor.args = path;

            return new Proxy(executor, handler);
        }
    };

    return new Proxy(expressive, handler);

};

const isValidPath = (partialPath, paths) => {

    return paths.some(path => {
        return partialPath.every((partial, i) => partial === path[i]);
    });

};

const getPathValue = (path, api) => {

    let value;

    api.some(definition => {

        if (!_.isEqual(definition.path, path)) {
            return;
        }

        value = definition.return;

    });

    return value;
};

const o = createExpressiveObject(api);
o.daily.allowance.from.monthly.budget('mada fakas');
o.daily.allowance.from.daily('mada fakas');
