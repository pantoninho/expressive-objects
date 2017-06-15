module.exports = propertyProxy;

function propertyProxy(object, handler) {

    return new Proxy(object, {
        get: function(object, name) {
            return handler(object, name);
        }
    });
}