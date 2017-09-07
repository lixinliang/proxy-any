[![npm](https://img.shields.io/npm/l/proxy-any.svg)](https://www.npmjs.org/package/proxy-any)
[![npm](https://img.shields.io/npm/v/proxy-any.svg)](https://www.npmjs.org/package/proxy-any)
[![npm](https://img.shields.io/npm/dm/proxy-any.svg)](https://www.npmjs.org/package/proxy-any)
[![Travis CI](https://img.shields.io/travis/lixinliang/proxy-any.svg)](https://travis-ci.org/lixinliang/muse-vue)
[![Twitter](https://img.shields.io/badge/twitter-@qq393464140-blue.svg)](http://twitter.com/qq393464140)

# proxy-any
> Proxy all properties as anonymous function, including the properties and return value of this function.

## Getting started

```
$ npm install --save proxy-any
```

[→ online playground](https://fiddle.jshell.net/lixinliang/zkjvLqnb/)

## Usage

```js
import ProxyAny from 'proxy-any';

const sdk = new ProxyAny;
```

* What ever you type, always will work without error.
* No more to do any fallback in different environment.

```js
import ProxyAny from 'proxy-any';

window.sdk = window.sdk || new ProxyAny;

sdk.component.confirm();

sdk.widget.create('loading').show();
```

### Access unlimitedly

```js
sdk.api.www.github.com;

sdk.table.user.name = 'lixinliang';
```

### Invoke unlimitedly

```js
sdk.say('i')('like')('currify')('!');
```

### Chaining unlimitedly

```js
sdk.query('#app').addClass('active').on(() => {});
```

### Proxy handler

* Your fallback code could be written in handler.

```js
ProxyAny.listen(sdk, ({ type, key, receiver, self, args }) => {

    // getter
    // setter
    // caller

    if (type == 'getter') {
        return 'this is the correct value.';
    }
});
```

### Error handler

* Do some error report or debug.

```js
ProxyAny.error = ({ err }) => {
    console.error(err);
};
```

## License

MIT
