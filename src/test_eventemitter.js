describe("EventEmitter", function() {
    var ee;

    var x = 0;
    var y = 0;
    var z = 0;

    var handleX = function() { x += 1; };
    var handleY = function() { y += 1; };
    var handleZ = function() { z += 1; };

    beforeEach(function() {
        ee = new EventEmitter();

        x = 0;
        y = 0;
        z = 0;

        ee.on('x', handleX);
        ee.on('y', handleY);
        ee.on('z', handleZ);
    });

    afterEach(function() {});

    it('Fires the correct event listeners', function() {
        ee.emit('x');
        expect(x).toBe(1);
        expect(y).toBe(0);

        ee.emit('y');
        expect(x).toBe(1);
        expect(y).toBe(1);
    });

    it('Only fires callbacks once when registered with once', function() {
        var foo = 0;
        var handleFoo = function() { foo += 1; };
        ee.once('foo', handleFoo);

        ee.emit('foo');
        expect(foo).toBe(1);

        ee.emit('foo');
        expect(foo).toBe(1);
    });

    it('Does not fire callbacks that have been unbound.', function() {
        expect(x).toBe(0);
        ee.off('x', handleX);

        ee.emit('x');
        expect(x).toBe(0);

        ee.emit('y');
        expect(y).toBe(1);
    });

    it('Does not fire callbacks that have been unbound (once)', function() {
        var foo = 0;
        var handleFoo = function() { foo += 1; };
        ee.once('foo', handleFoo);
        ee.off('foo', handleFoo);

        ee.emit('foo');
        expect(foo).toBe(0);
    });

    it('Emit calls registered callbacks with specified arguments.', function() {
        var a, b;
        var foo = function(x, y) {
            a = x;
            b = y;
        };

        ee.on('bar', foo);
        ee.on('baz', foo);

        ee.emit('bar');
        expect(a).toBeUndefined();
        expect(b).toBeUndefined();

        ee.emit('bar', 1, 2);
        expect(a).toBe(1);
        expect(b).toBe(2);
    });

    it('emit has trigger alias', function() {
        ee.emit('x');
        expect(x).toBe(1);
        ee.trigger('x');
        expect(x).toBe(2);
        ee.trigger('x');
        expect(x).toBe(3);
    });

    it('on has listen alias', function() {
        var foo = 0;
        var handleFoo = function() { foo += 1; };
        ee.listen('foo', handleFoo);

        ee.emit('foo');
        expect(foo).toBe(1);
        ee.emit('foo');
        expect(foo).toBe(2);
    });

    it('once has listenOnce alias', function() {
        var foo = 0;
        var handleFoo = function() { foo += 1; };
        ee.listenOnce('foo', handleFoo);

        ee.emit('foo');
        expect(foo).toBe(1);
        ee.emit('foo');
        expect(foo).toBe(1);
    });

    it('off has unlisten alias', function() {
        expect(x).toBe(0);
        ee.unlisten('x', handleX);

        ee.emit('x');
        expect(x).toBe(0);

        ee.emit('y');
        expect(y).toBe(1);
    });
});
