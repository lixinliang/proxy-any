'use strict';

/**
 * Save each $listener with $instance
 * @type {Map<$instance: $listener>} map
 */
const map = new Map;

/**
 * Noop
 */
const noop = () => {};

/**
 * Invoke method safely
 * @param {Function} method
 * @param {Arguments} args
 */
const safe = ( method, ...args ) => {
    try {
        method.apply(null, args);
    } catch (err) {
        ProxyAny.error({ err, args });
    }
};

/**
 * Return an instance of ProxyAny
 * @param  {Function} $listener
 * @return {Proxy} $instance
 */
function ProxyAny ( $listener = noop ) {

    /**
     * Proxy handler factory
     * @param  {Array} path
     * @return {Object} handler
     */
    const HandlerFactory = ( path = [] ) => (
        {
            /**
             * Handler of getter
             * @param  {Any} target
             * @param  {String} key property name
             * @return {Any|Proxy} anonymous proxy
             */
            get ( target, key ) {
                const type = 'getter';
                const $value = Object.freeze({ type, key });
                const $path = path.concat($value);
                return safe(map.get($instance), $value, $path) || ProxyFactory(key, $path);
            },
            /**
             * Handler of setter
             * @param  {Any} target
             * @param  {String} key property name
             * @param  {Any} receiver rightt-hand side in assignment
             * @return {Any} receiver
             */
            set ( target, key, receiver ) {
                const type = 'setter';
                const $value = Object.freeze({ type, key, receiver });
                const $path = path.concat($value);
                return safe(map.get($instance), $value, $path) || receiver;
            },
        }
    );

    /**
     * Anonymous proxy factory
     * @param  {String} key property name
     * @return {Any|Proxy} anonymous proxy
     */
    const ProxyFactory = ( key, path = [] ) =>
        new Proxy(
            function ( ...args ) {
                const self = this;
                const type = 'caller';
                const $value = Object.freeze({ type, key, self, args });
                const $path = path.concat($value);
                return safe(map.get($instance), $value, $path) || ProxyFactory(key, $path);
            },
            HandlerFactory(path)
        )
    ;

    const $instance = new Proxy({}, HandlerFactory());

    ProxyAny.listen($instance, $listener);

    return $instance;
}

/**
 * Setting $listener
 * @param {Proxy} $instance
 * @param {Function} $listener
 */
ProxyAny.listen = function listen ( $instance, $listener ) {
    map.set($instance, $listener);
};

/**
 * Setting error handler
 * @param {Object} err message
 */
ProxyAny.error = function error ({ err }) {
    console.error(err);
};

export default ProxyAny;
