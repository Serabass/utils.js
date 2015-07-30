export class Timer {
    /**
     *
     * @param delay {Number}
     * @param cb
     * @param args
     * @returns {Function}
     */
    static timeout(delay, cb, ...args) {
        clear.id = setTimeout(cb, delay, ...args);
        return clear;

        function clear() {
            clearTimeout(clear.id);
        }
    }

    /**
     *
     * @param time
     * @param cb
     * @param args
     * @returns {Function}
     */
    static interval(time, cb, ...args) {
        clear.id = setInterval(cb, time, ...args);
        return clear;

        function clear() {
            clearInterval(clear.id);
        }
    }
}

export class Async {
    static invoke(cb, ...args) {
        Timer.timeout(0, () => cb(...args) );
    }

    static confirm(message, cb) {
        Async.invoke(() => cb(confirm(message)));
    }
}

export class Random {

    static number(from, to, asInteger = false) {
        if (typeof to === 'boolean') {
            asInteger = to;
            to = from;
            from = 0;
        } else if (typeof to === 'undefined') {
            to = from;
            from = 0;
        }

        var result =  from + (to - from) * Math.random();
        return !asInteger ? result : Math.round(result);
    }

    static string(length, charset = String.defCharset) {
        var result = '';
        length.times(i => result += charset.randomChar());
        return result;
    }
}

class Generate {
    static array(length, value = null) {
        var result = [];

        function handle(value) {
            if (typeof value === 'function')
                return value();

            return value;
        }

        length.times(i => result.push(handle(value)));
        return result;
    }

    static range(from, to, step = 1) {
        var result = [];
        from.to(to, (i) => result.push(i), step);
        return result;
    }
}

export class Func {

    static get numbers() {
        return {
            increment: (val) => (x) => x + val,
            decrement: (val) => (x) => x - val,
            multiply: (val) => (x) => x * val,
            divide: (val) => (x) => x / val,
            index: () => (x, index) => index
        }
    };

    static noop(val) {
        return val;
    }

    static random(from, to, asInteger = false) {
        var fn = asInteger ? parseInt : Func.noop;
        return () => fn(from + (to - from) * Math.random(), 10)
    }

    static increment(from = 0, step = 1) {
        var i = from;
        return () => {
            var oldVal = i;
            i += step;
            return oldVal;
        }
            ;
    }

    static sortBy(...fields) {
        return (a, b) => {

            function handle(obj, field) {
                if (typeof field === 'function')
                    return field(obj);

                return obj[field];
            }

            for (var i = 0; i < fields.length; i++) {
                let field = fields[i];

                if (handle(a, field) === handle(b, field))
                    continue;

                if (handle(a, field) > handle(b, field))
                    return 1;

                if (handle(a, field) < handle(b, field))
                    return -1;
            }

            return 0;
        }
    }

    static log(...args) {
        console.log.apply(console, args);
    }

    static coin(trueVal, falseVal) {
        return () => [falseVal, trueVal][+Boolean.coin()];
    }
}

String.defCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

String.prototype.randomChar = function () {
    return this[this.length.random(true)];
};

String.prototype.randomRange = function () {
    var l = this.length,
        v1 = l.random(true),
        v2 = l.random(true),
        start = Math.min(v1, v2),
        end = Math.max(v1, v2)
        ;

    return this.substring(start, end);
};

Number.prototype.random = function (asInteger = false) {
    return Random.number(0, this, asInteger);
};

Number.prototype.times = function (cb, step = 1) {
    for (var i = 0; i < this; i+=step) {
        cb(i);
    }
};

Number.prototype.to = function (to, cb, step = 1) {
    var i;
    if (this > to) {
        for (i = this; i >= to; i-=step) {
            cb(i);
        }
    } else {
        for (i = this; i <= to; i+=step) {
            cb(i);
        }
    }
};

Number.prototype.from = function (from, cb, step = 1) {
    var i;
    if (this < from) {
        for (i = from; i >= this; i-=step) {
            cb(i);
        }
    } else {
        for (i = from; i <= this; i+=step) {
            cb(i);
        }
    }
};

Boolean.coin = function () {
    return Random.number(-1, 1) > 0;
};

Array.prototype.shuffle = function () {
    return this.sort(Func.coin(1, -1));
};

Array.prototype.random = function () {
    return this[this.length.random(true)];
};

Array.prototype.countValues = function (cb = (el)=>el) {
    var result = {};

    this.forEach((el) => {
        el = cb(el);
        if (typeof result[el] === 'undefined') {
            result[el] = 1;
        } else {
            result[el]++;
        }
    });

    return result;
};

var x = Generate
        .array(10)
    ;

console.log(x);