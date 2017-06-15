const expressive = require('./src/expressive');

module.exports = function(api) {

    api = sanitize(api);

    return expressive(api);
};

function sanitize(api) {

    return api.map(definition => {

        const path = typeof definition.path === 'string' ? definition.path.split(/[ .]/) : definition.path;

        return {
            path: path,
            value: definition.value
        };
    });
}