const _ = require('lodash');
const propProxy = require('./property-proxy');

module.exports = createExpressiveObject;

function createExpressiveObject(api) {

    const obj = {};
    api = api.map(definition => {

        const path = typeof definition.path === 'string' ? definition.path.split(/[ .]/) : definition.path;

        if (typeof definition.resolver !== 'function') {
            throw new Error('Resolver for [' + definition.path + '] is not a function');
        }

        return {
            path: path,
            resolver: definition.resolver
        };
    });

    return propProxy(obj, pathFinder(api));
}

function pathFinder(api) {

    const paths = api.map(definition => definition.path);

    const propertyAccessHandler = function(path, object, propName) {
        path = path ? [...path] : [];
        path.push(propName);

        if (!isValidPath(path, paths)) {
            return object[propName];
        }

        const resolver = pathResolver.bind(null, api, path);
        const handler = propertyAccessHandler.bind(null, path);

        return propProxy(resolver, handler);
    };

    return propertyAccessHandler.bind(null, []);
}


function pathResolver(api, path, ...args) {

    const resolver = getPathResolution(api, path);

    if (!resolver) {
        throw new Error('Path ' + path.join('.') + ' not found in the API');
    }

    // TODO: should resolvers always be functions? hm..............
    return resolver(...args);

}

function isValidPath(partialPath, paths) {

    return paths.some(path => {
        return partialPath.every((partial, i) => partial === path[i]);
    });

}

function getPathResolution(api, path) {

    let resolver;

    api.some(definition => {

        if (!_.isEqual(definition.path, path)) {
            return;
        }

        resolver = definition.resolver;

    });

    return resolver;
} 