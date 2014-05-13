# js

Simple implementations of basic javascript constructs.

An excuse to try out `karma` and writing unit tests in javascript.

## Modules

- EventEmitter


## Examples

    // EventEmitter
    var ee = EventEmitter();

    var foo = 0;
    var handleFoo = function() {
        foo += 1;
    };

    ee.on('foo', handleFoo);
    ee.emit('foo');
    // foo = 1

    ee.off('foo', handleFoo);
    ee.emit('foo')
    // foo = 1

## Run tests

    $ npm install
    $ make tests
