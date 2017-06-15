const expressive = require('./src/expressive');

module.exports = function(api) {

    api = sanitize(api);
    return expressive(api);
};

module.exports.extend = function(object, api) {

    api = sanitize(api);
    return expressive.extend(object, api);
};

function sanitize(api) {

    return api.map(definition => {

        const path = normalize(definition.path).reduce((path, partial) => {
            const normalized = normalize(partial);
            return [...path, ...normalized];
        }, []);

        return {
            path: path,
            value: definition.value
        };
    });
}


function normalize(path) {
    return typeof path === 'string' ? path.split(/[ .]/) : path;
}