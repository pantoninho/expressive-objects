const merge = require('deepmerge');

module.exports = createExpressiveObject;

/**
 * Create an expressive api using chained properties
 * @param {Array<Object>} api An array of definitions that consist of a path and a value
 */
function createExpressiveObject(api) {

    const obj = {};

    api.forEach(definition => {
        createBranch(definition.path, definition.value, obj);
    });

    return obj;
}

/**
 * Creates a branch of properties inside an object, pointing the final one to a value
 * @param {Array<String>} branch a chain of properties that will be put on the target
 * @param {Any} value the function that this branch will result into
 * @param {Object} target the object where this branch will be inserted
 */
function createBranch(branch, value, target) {

    return branch.reduce((container, partial, i, partials) => {

        if (i === partials.length - 1) {
            injectProperty(container, partial, value);
            return target;
        }

        container[partial] = container[partial] || {};
        return container[partial];

    }, target);
}

/**
 * Replaces a property inside an object but merges functions with objects
 * @param {Object} object the object where the property will be injected into
 * @param {String} property the property name
 * @param {Any} value the property value
 */
function injectProperty(object, property, value) {

    if (!object[property]) {
        object[property] = value;
        return;
    }

    if (typeof object[property] === 'object' && typeof value === 'function') {
        value = functionize(object[property], value);
    }

    object[property] = value;
}

/**
 * Transforms an object into a function, keeping all its properties intact
 * @param {Object} object The object that will be transformed into a function
 * @param {Function} fn the function this object will become
 */
function functionize(object, fn) {

    // wrap the original fn in order to keep it unmodified
    const executable = function(...args) {
        return fn(...args);
    };

    // clone the original object so the original one is not mutated
    const clone = merge({}, object, { clone: true });

    Object.keys(clone).forEach(key => {
        executable[key] = clone[key];
    });

    return executable;
}