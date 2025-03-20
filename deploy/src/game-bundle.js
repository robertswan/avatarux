(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
var Tween = require('@tweenjs/tween.js');
var Components = require('./src/components.js');
var Events = require('./src/events.js');
var FakeBackend = require('./src/backends/fake-backend.js');
var Gamestates = require('./src/gamestate-manager.js');
var Resizer = require('./src/resizer.js');
var Resources = require('./src/resources.js');
var Session = require('./src/session.js');

//------------------------------------------------------------------------------
function initPixi(onTick, payload) {
  PIXI.settings.RESOLUTION = window.devicePixelRatio || 1;
  var rendererOptions = {
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    clearBeforeRender: true,
    resizeTo: window,
    autoResize: true,
    transparent: false,
    roundPixels: false,
    view: window.document.getElementById('canvas')
  };
  PIXI.settings.CAN_UPLOAD_SAME_BUFFER = false;
  PIXI.utils.skipHello();
  var renderer = new PIXI.Application(rendererOptions);
  renderer.view.style.position = 'fixed';
  renderer.ticker.add(function () {
    onTick(payload);
  });
  return renderer;
}

//------------------------------------------------------------------------------
function initModules(onTick) {
  var modules = {
    backend: null,
    components: null,
    events: null,
    pixi: null,
    resizer: null,
    resources: null,
    session: null,
    states: null
  };
  modules.backend = new FakeBackend();
  modules.components = new Components(modules);
  modules.events = new Events();
  modules.pixi = initPixi(onTick, modules);
  modules.resizer = new Resizer(modules);
  modules.resources = new Resources();
  modules.session = new Session(modules);
  modules.states = new Gamestates(modules);
  return modules;
}

//------------------------------------------------------------------------------
function onTick(payload) {
  Tween.update();
  payload.states.tick();
}

//------------------------------------------------------------------------------
window.swan.game = {
  run: function run(unused_pageConfig) {
    var modules = initModules(onTick);
    modules.states.changeState('loading');
  }
};

},{"./src/backends/fake-backend.js":4,"./src/components.js":6,"./src/events.js":14,"./src/gamestate-manager.js":16,"./src/resizer.js":24,"./src/resources.js":26,"./src/session.js":27,"@tweenjs/tween.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 */
var Easing = Object.freeze({
    Linear: Object.freeze({
        None: function (amount) {
            return amount;
        },
        In: function (amount) {
            return amount;
        },
        Out: function (amount) {
            return amount;
        },
        InOut: function (amount) {
            return amount;
        },
    }),
    Quadratic: Object.freeze({
        In: function (amount) {
            return amount * amount;
        },
        Out: function (amount) {
            return amount * (2 - amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount;
            }
            return -0.5 * (--amount * (amount - 2) - 1);
        },
    }),
    Cubic: Object.freeze({
        In: function (amount) {
            return amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount + 2);
        },
    }),
    Quartic: Object.freeze({
        In: function (amount) {
            return amount * amount * amount * amount;
        },
        Out: function (amount) {
            return 1 - --amount * amount * amount * amount;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount;
            }
            return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
        },
    }),
    Quintic: Object.freeze({
        In: function (amount) {
            return amount * amount * amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        },
    }),
    Sinusoidal: Object.freeze({
        In: function (amount) {
            return 1 - Math.sin(((1.0 - amount) * Math.PI) / 2);
        },
        Out: function (amount) {
            return Math.sin((amount * Math.PI) / 2);
        },
        InOut: function (amount) {
            return 0.5 * (1 - Math.sin(Math.PI * (0.5 - amount)));
        },
    }),
    Exponential: Object.freeze({
        In: function (amount) {
            return amount === 0 ? 0 : Math.pow(1024, amount - 1);
        },
        Out: function (amount) {
            return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            if ((amount *= 2) < 1) {
                return 0.5 * Math.pow(1024, amount - 1);
            }
            return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
        },
    }),
    Circular: Object.freeze({
        In: function (amount) {
            return 1 - Math.sqrt(1 - amount * amount);
        },
        Out: function (amount) {
            return Math.sqrt(1 - --amount * amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        },
    }),
    Elastic: Object.freeze({
        In: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        Out: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            amount *= 2;
            if (amount < 1) {
                return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            }
            return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
        },
    }),
    Back: Object.freeze({
        In: function (amount) {
            var s = 1.70158;
            return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s);
        },
        Out: function (amount) {
            var s = 1.70158;
            return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1;
        },
        InOut: function (amount) {
            var s = 1.70158 * 1.525;
            if ((amount *= 2) < 1) {
                return 0.5 * (amount * amount * ((s + 1) * amount - s));
            }
            return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        },
    }),
    Bounce: Object.freeze({
        In: function (amount) {
            return 1 - Easing.Bounce.Out(1 - amount);
        },
        Out: function (amount) {
            if (amount < 1 / 2.75) {
                return 7.5625 * amount * amount;
            }
            else if (amount < 2 / 2.75) {
                return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
            }
            else if (amount < 2.5 / 2.75) {
                return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
            }
            else {
                return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
            }
        },
        InOut: function (amount) {
            if (amount < 0.5) {
                return Easing.Bounce.In(amount * 2) * 0.5;
            }
            return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
        },
    }),
    generatePow: function (power) {
        if (power === void 0) { power = 4; }
        power = power < Number.EPSILON ? Number.EPSILON : power;
        power = power > 10000 ? 10000 : power;
        return {
            In: function (amount) {
                return Math.pow(amount, power);
            },
            Out: function (amount) {
                return 1 - Math.pow((1 - amount), power);
            },
            InOut: function (amount) {
                if (amount < 0.5) {
                    return Math.pow((amount * 2), power) / 2;
                }
                return (1 - Math.pow((2 - amount * 2), power)) / 2 + 0.5;
            },
        };
    },
});

var now = function () { return performance.now(); };

/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tween
 */
var Group = /** @class */ (function () {
    function Group() {
        this._tweens = {};
        this._tweensAddedDuringUpdate = {};
    }
    Group.prototype.getAll = function () {
        var _this = this;
        return Object.keys(this._tweens).map(function (tweenId) {
            return _this._tweens[tweenId];
        });
    };
    Group.prototype.removeAll = function () {
        this._tweens = {};
    };
    Group.prototype.add = function (tween) {
        this._tweens[tween.getId()] = tween;
        this._tweensAddedDuringUpdate[tween.getId()] = tween;
    };
    Group.prototype.remove = function (tween) {
        delete this._tweens[tween.getId()];
        delete this._tweensAddedDuringUpdate[tween.getId()];
    };
    Group.prototype.update = function (time, preserve) {
        if (time === void 0) { time = now(); }
        if (preserve === void 0) { preserve = false; }
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) {
            return false;
        }
        // Tweens are updated in "batches". If you add a new tween during an
        // update, then the new tween will be updated in the next batch.
        // If you remove a tween during an update, it may or may not be updated.
        // However, if the removed tween was added during the current batch,
        // then it will not be updated.
        while (tweenIds.length > 0) {
            this._tweensAddedDuringUpdate = {};
            for (var i = 0; i < tweenIds.length; i++) {
                var tween = this._tweens[tweenIds[i]];
                var autoStart = !preserve;
                if (tween && tween.update(time, autoStart) === false && !preserve) {
                    delete this._tweens[tweenIds[i]];
                }
            }
            tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
        return true;
    };
    return Group;
}());

/**
 *
 */
var Interpolation = {
    Linear: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.Linear;
        if (k < 0) {
            return fn(v[0], v[1], f);
        }
        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function (v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = Interpolation.Utils.Bernstein;
        for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
    },
    CatmullRom: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor((f = m * (1 + k)));
            }
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        }
        else {
            if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            }
            if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },
    Utils: {
        Linear: function (p0, p1, t) {
            return (p1 - p0) * t + p0;
        },
        Bernstein: function (n, i) {
            var fc = Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: (function () {
            var a = [1];
            return function (n) {
                var s = 1;
                if (a[n]) {
                    return a[n];
                }
                for (var i = n; i > 1; i--) {
                    s *= i;
                }
                a[n] = s;
                return s;
            };
        })(),
        CatmullRom: function (p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        },
    },
};

/**
 * Utils
 */
var Sequence = /** @class */ (function () {
    function Sequence() {
    }
    Sequence.nextId = function () {
        return Sequence._nextId++;
    };
    Sequence._nextId = 0;
    return Sequence;
}());

var mainGroup = new Group();

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
var Tween = /** @class */ (function () {
    function Tween(_object, _group) {
        if (_group === void 0) { _group = mainGroup; }
        this._object = _object;
        this._group = _group;
        this._isPaused = false;
        this._pauseStart = 0;
        this._valuesStart = {};
        this._valuesEnd = {};
        this._valuesStartRepeat = {};
        this._duration = 1000;
        this._isDynamic = false;
        this._initialRepeat = 0;
        this._repeat = 0;
        this._yoyo = false;
        this._isPlaying = false;
        this._reversed = false;
        this._delayTime = 0;
        this._startTime = 0;
        this._easingFunction = Easing.Linear.None;
        this._interpolationFunction = Interpolation.Linear;
        // eslint-disable-next-line
        this._chainedTweens = [];
        this._onStartCallbackFired = false;
        this._onEveryStartCallbackFired = false;
        this._id = Sequence.nextId();
        this._isChainStopped = false;
        this._propertiesAreSetUp = false;
        this._goToEnd = false;
    }
    Tween.prototype.getId = function () {
        return this._id;
    };
    Tween.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    Tween.prototype.isPaused = function () {
        return this._isPaused;
    };
    Tween.prototype.getDuration = function () {
        return this._duration;
    };
    Tween.prototype.to = function (target, duration) {
        if (duration === void 0) { duration = 1000; }
        if (this._isPlaying)
            throw new Error('Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.');
        this._valuesEnd = target;
        this._propertiesAreSetUp = false;
        this._duration = duration < 0 ? 0 : duration;
        return this;
    };
    Tween.prototype.duration = function (duration) {
        if (duration === void 0) { duration = 1000; }
        this._duration = duration < 0 ? 0 : duration;
        return this;
    };
    Tween.prototype.dynamic = function (dynamic) {
        if (dynamic === void 0) { dynamic = false; }
        this._isDynamic = dynamic;
        return this;
    };
    Tween.prototype.start = function (time, overrideStartingValues) {
        if (time === void 0) { time = now(); }
        if (overrideStartingValues === void 0) { overrideStartingValues = false; }
        if (this._isPlaying) {
            return this;
        }
        // eslint-disable-next-line
        this._group && this._group.add(this);
        this._repeat = this._initialRepeat;
        if (this._reversed) {
            // If we were reversed (f.e. using the yoyo feature) then we need to
            // flip the tween direction back to forward.
            this._reversed = false;
            for (var property in this._valuesStartRepeat) {
                this._swapEndStartRepeatValues(property);
                this._valuesStart[property] = this._valuesStartRepeat[property];
            }
        }
        this._isPlaying = true;
        this._isPaused = false;
        this._onStartCallbackFired = false;
        this._onEveryStartCallbackFired = false;
        this._isChainStopped = false;
        this._startTime = time;
        this._startTime += this._delayTime;
        if (!this._propertiesAreSetUp || overrideStartingValues) {
            this._propertiesAreSetUp = true;
            // If dynamic is not enabled, clone the end values instead of using the passed-in end values.
            if (!this._isDynamic) {
                var tmp = {};
                for (var prop in this._valuesEnd)
                    tmp[prop] = this._valuesEnd[prop];
                this._valuesEnd = tmp;
            }
            this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, overrideStartingValues);
        }
        return this;
    };
    Tween.prototype.startFromCurrentValues = function (time) {
        return this.start(time, true);
    };
    Tween.prototype._setupProperties = function (_object, _valuesStart, _valuesEnd, _valuesStartRepeat, overrideStartingValues) {
        for (var property in _valuesEnd) {
            var startValue = _object[property];
            var startValueIsArray = Array.isArray(startValue);
            var propType = startValueIsArray ? 'array' : typeof startValue;
            var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
            // If `to()` specifies a property that doesn't exist in the source object,
            // we should not set that property in the object
            if (propType === 'undefined' || propType === 'function') {
                continue;
            }
            // Check if an Array was provided as property value
            if (isInterpolationList) {
                var endValues = _valuesEnd[property];
                if (endValues.length === 0) {
                    continue;
                }
                // Handle an array of relative values.
                // Creates a local copy of the Array with the start value at the front
                var temp = [startValue];
                for (var i = 0, l = endValues.length; i < l; i += 1) {
                    var value = this._handleRelativeValue(startValue, endValues[i]);
                    if (isNaN(value)) {
                        isInterpolationList = false;
                        console.warn('Found invalid interpolation list. Skipping.');
                        break;
                    }
                    temp.push(value);
                }
                if (isInterpolationList) {
                    // if (_valuesStart[property] === undefined) { // handle end values only the first time. NOT NEEDED? setupProperties is now guarded by _propertiesAreSetUp.
                    _valuesEnd[property] = temp;
                    // }
                }
            }
            // handle the deepness of the values
            if ((propType === 'object' || startValueIsArray) && startValue && !isInterpolationList) {
                _valuesStart[property] = startValueIsArray ? [] : {};
                var nestedObject = startValue;
                for (var prop in nestedObject) {
                    _valuesStart[property][prop] = nestedObject[prop];
                }
                // TODO? repeat nested values? And yoyo? And array values?
                _valuesStartRepeat[property] = startValueIsArray ? [] : {};
                var endValues = _valuesEnd[property];
                // If dynamic is not enabled, clone the end values instead of using the passed-in end values.
                if (!this._isDynamic) {
                    var tmp = {};
                    for (var prop in endValues)
                        tmp[prop] = endValues[prop];
                    _valuesEnd[property] = endValues = tmp;
                }
                this._setupProperties(nestedObject, _valuesStart[property], endValues, _valuesStartRepeat[property], overrideStartingValues);
            }
            else {
                // Save the starting value, but only once unless override is requested.
                if (typeof _valuesStart[property] === 'undefined' || overrideStartingValues) {
                    _valuesStart[property] = startValue;
                }
                if (!startValueIsArray) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }
                if (isInterpolationList) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
                }
                else {
                    _valuesStartRepeat[property] = _valuesStart[property] || 0;
                }
            }
        }
    };
    Tween.prototype.stop = function () {
        if (!this._isChainStopped) {
            this._isChainStopped = true;
            this.stopChainedTweens();
        }
        if (!this._isPlaying) {
            return this;
        }
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        this._isPlaying = false;
        this._isPaused = false;
        if (this._onStopCallback) {
            this._onStopCallback(this._object);
        }
        return this;
    };
    Tween.prototype.end = function () {
        this._goToEnd = true;
        this.update(Infinity);
        return this;
    };
    Tween.prototype.pause = function (time) {
        if (time === void 0) { time = now(); }
        if (this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = true;
        this._pauseStart = time;
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        return this;
    };
    Tween.prototype.resume = function (time) {
        if (time === void 0) { time = now(); }
        if (!this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = false;
        this._startTime += time - this._pauseStart;
        this._pauseStart = 0;
        // eslint-disable-next-line
        this._group && this._group.add(this);
        return this;
    };
    Tween.prototype.stopChainedTweens = function () {
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].stop();
        }
        return this;
    };
    Tween.prototype.group = function (group) {
        if (group === void 0) { group = mainGroup; }
        this._group = group;
        return this;
    };
    Tween.prototype.delay = function (amount) {
        if (amount === void 0) { amount = 0; }
        this._delayTime = amount;
        return this;
    };
    Tween.prototype.repeat = function (times) {
        if (times === void 0) { times = 0; }
        this._initialRepeat = times;
        this._repeat = times;
        return this;
    };
    Tween.prototype.repeatDelay = function (amount) {
        this._repeatDelayTime = amount;
        return this;
    };
    Tween.prototype.yoyo = function (yoyo) {
        if (yoyo === void 0) { yoyo = false; }
        this._yoyo = yoyo;
        return this;
    };
    Tween.prototype.easing = function (easingFunction) {
        if (easingFunction === void 0) { easingFunction = Easing.Linear.None; }
        this._easingFunction = easingFunction;
        return this;
    };
    Tween.prototype.interpolation = function (interpolationFunction) {
        if (interpolationFunction === void 0) { interpolationFunction = Interpolation.Linear; }
        this._interpolationFunction = interpolationFunction;
        return this;
    };
    // eslint-disable-next-line
    Tween.prototype.chain = function () {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tweens[_i] = arguments[_i];
        }
        this._chainedTweens = tweens;
        return this;
    };
    Tween.prototype.onStart = function (callback) {
        this._onStartCallback = callback;
        return this;
    };
    Tween.prototype.onEveryStart = function (callback) {
        this._onEveryStartCallback = callback;
        return this;
    };
    Tween.prototype.onUpdate = function (callback) {
        this._onUpdateCallback = callback;
        return this;
    };
    Tween.prototype.onRepeat = function (callback) {
        this._onRepeatCallback = callback;
        return this;
    };
    Tween.prototype.onComplete = function (callback) {
        this._onCompleteCallback = callback;
        return this;
    };
    Tween.prototype.onStop = function (callback) {
        this._onStopCallback = callback;
        return this;
    };
    /**
     * @returns true if the tween is still playing after the update, false
     * otherwise (calling update on a paused tween still returns true because
     * it is still playing, just paused).
     */
    Tween.prototype.update = function (time, autoStart) {
        var _this = this;
        var _a;
        if (time === void 0) { time = now(); }
        if (autoStart === void 0) { autoStart = true; }
        if (this._isPaused)
            return true;
        var property;
        var endTime = this._startTime + this._duration;
        if (!this._goToEnd && !this._isPlaying) {
            if (time > endTime)
                return false;
            if (autoStart)
                this.start(time, true);
        }
        this._goToEnd = false;
        if (time < this._startTime) {
            return true;
        }
        if (this._onStartCallbackFired === false) {
            if (this._onStartCallback) {
                this._onStartCallback(this._object);
            }
            this._onStartCallbackFired = true;
        }
        if (this._onEveryStartCallbackFired === false) {
            if (this._onEveryStartCallback) {
                this._onEveryStartCallback(this._object);
            }
            this._onEveryStartCallbackFired = true;
        }
        var elapsedTime = time - this._startTime;
        var durationAndDelay = this._duration + ((_a = this._repeatDelayTime) !== null && _a !== void 0 ? _a : this._delayTime);
        var totalTime = this._duration + this._repeat * durationAndDelay;
        var calculateElapsedPortion = function () {
            if (_this._duration === 0)
                return 1;
            if (elapsedTime > totalTime) {
                return 1;
            }
            var timesRepeated = Math.trunc(elapsedTime / durationAndDelay);
            var timeIntoCurrentRepeat = elapsedTime - timesRepeated * durationAndDelay;
            // TODO use %?
            // const timeIntoCurrentRepeat = elapsedTime % durationAndDelay
            var portion = Math.min(timeIntoCurrentRepeat / _this._duration, 1);
            if (portion === 0 && elapsedTime === _this._duration) {
                return 1;
            }
            return portion;
        };
        var elapsed = calculateElapsedPortion();
        var value = this._easingFunction(elapsed);
        // properties transformations
        this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
        if (this._onUpdateCallback) {
            this._onUpdateCallback(this._object, elapsed);
        }
        if (this._duration === 0 || elapsedTime >= this._duration) {
            if (this._repeat > 0) {
                var completeCount = Math.min(Math.trunc((elapsedTime - this._duration) / durationAndDelay) + 1, this._repeat);
                if (isFinite(this._repeat)) {
                    this._repeat -= completeCount;
                }
                // Reassign starting values, restart by making startTime = now
                for (property in this._valuesStartRepeat) {
                    if (!this._yoyo && typeof this._valuesEnd[property] === 'string') {
                        this._valuesStartRepeat[property] =
                            // eslint-disable-next-line
                            // @ts-ignore FIXME?
                            this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                    }
                    if (this._yoyo) {
                        this._swapEndStartRepeatValues(property);
                    }
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
                if (this._yoyo) {
                    this._reversed = !this._reversed;
                }
                this._startTime += durationAndDelay * completeCount;
                if (this._onRepeatCallback) {
                    this._onRepeatCallback(this._object);
                }
                this._onEveryStartCallbackFired = false;
                return true;
            }
            else {
                if (this._onCompleteCallback) {
                    this._onCompleteCallback(this._object);
                }
                for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                    // Make the chained tweens start exactly at the time they should,
                    // even if the `update()` method was called way past the duration of the tween
                    this._chainedTweens[i].start(this._startTime + this._duration, false);
                }
                this._isPlaying = false;
                return false;
            }
        }
        return true;
    };
    Tween.prototype._updateProperties = function (_object, _valuesStart, _valuesEnd, value) {
        for (var property in _valuesEnd) {
            // Don't update properties that do not exist in the source object
            if (_valuesStart[property] === undefined) {
                continue;
            }
            var start = _valuesStart[property] || 0;
            var end = _valuesEnd[property];
            var startIsArray = Array.isArray(_object[property]);
            var endIsArray = Array.isArray(end);
            var isInterpolationList = !startIsArray && endIsArray;
            if (isInterpolationList) {
                _object[property] = this._interpolationFunction(end, value);
            }
            else if (typeof end === 'object' && end) {
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._updateProperties(_object[property], start, end, value);
            }
            else {
                // Parses relative end values with start as base (e.g.: +10, -3)
                end = this._handleRelativeValue(start, end);
                // Protect against non numeric properties.
                if (typeof end === 'number') {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _object[property] = start + (end - start) * value;
                }
            }
        }
    };
    Tween.prototype._handleRelativeValue = function (start, end) {
        if (typeof end !== 'string') {
            return end;
        }
        if (end.charAt(0) === '+' || end.charAt(0) === '-') {
            return start + parseFloat(end);
        }
        return parseFloat(end);
    };
    Tween.prototype._swapEndStartRepeatValues = function (property) {
        var tmp = this._valuesStartRepeat[property];
        var endValue = this._valuesEnd[property];
        if (typeof endValue === 'string') {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
        }
        else {
            this._valuesStartRepeat[property] = this._valuesEnd[property];
        }
        this._valuesEnd[property] = tmp;
    };
    return Tween;
}());

var VERSION = '23.1.3';

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
var nextId = Sequence.nextId;
/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tweens.
 */
var TWEEN = mainGroup;
// This is the best way to export things in a way that's compatible with both ES
// Modules and CommonJS, without build hacks, and so as not to break the
// existing API.
// https://github.com/rollup/rollup/issues/1961#issuecomment-423037881
var getAll = TWEEN.getAll.bind(TWEEN);
var removeAll = TWEEN.removeAll.bind(TWEEN);
var add = TWEEN.add.bind(TWEEN);
var remove = TWEEN.remove.bind(TWEEN);
var update = TWEEN.update.bind(TWEEN);
var exports$1 = {
    Easing: Easing,
    Group: Group,
    Interpolation: Interpolation,
    now: now,
    Sequence: Sequence,
    nextId: nextId,
    Tween: Tween,
    VERSION: VERSION,
    getAll: getAll,
    removeAll: removeAll,
    add: add,
    remove: remove,
    update: update,
};

exports.Easing = Easing;
exports.Group = Group;
exports.Interpolation = Interpolation;
exports.Sequence = Sequence;
exports.Tween = Tween;
exports.VERSION = VERSION;
exports.add = add;
exports.default = exports$1;
exports.getAll = getAll;
exports.nextId = nextId;
exports.now = now;
exports.remove = remove;
exports.removeAll = removeAll;
exports.update = update;

},{}],3:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
var MathConfig = require('./math-config.json');

//------------------------------------------------------------------------------
function findSymbolWin(symbol, slotface) {
  var allUsed = [];
  var allWays = 0;
  var maxLength = 0;
  var canWinLonger = true;
  slotface.forEach(function (columnface, x) {
    var ways = 0;
    var used = [];
    if (canWinLonger) {
      // check for more wins on the column
      columnface.forEach(function (symbolId) {
        used.push(symbolId === symbol);
        if (symbolId === symbol) {
          ++ways;
        }
      });
      if (ways === 0) {
        // win broken on this column
        maxLength = x;
        canWinLonger = false;
      } else {
        // win found on this column
        if (maxLength === 0) {
          allWays = ways;
        } else {
          allWays *= ways;
        }
        ++maxLength;
      }
    } else {
      // no checks needed - win conditions already broken by previous column
      used = Array(columnface.length).fill(false);
    }
    allUsed.push(used);
  });
  return {
    symbolId: symbol,
    ways: allWays,
    symbolsUsed: allUsed,
    length: maxLength,
    grossWinPerWay: 0,
    grossWin: 0
  };
}

//------------------------------------------------------------------------------
function EvaluateWinsAnyWaysLeftToRight(bet, slotface) {
  var wins = [];
  for (var key in MathConfig.symbols) {
    // sweep left to right, once for each symbol that has "anyWays" wins set in the config
    if (MathConfig.symbols[key].anyWays) {
      var symbolId = parseInt(key);
      var win = findSymbolWin(symbolId, slotface);
      if (win.ways > 0) {
        var paytable = MathConfig.paytable[key];
        var winPerLine = paytable[win.length - 1]; // no entry in paytable for zero matching symbols

        if (winPerLine > 0) {
          win.grossWinPerWay = winPerLine * bet;
          win.grossWin = winPerLine * win.ways * bet;
          wins.push(win);
        }
      }
    }
  }
  return wins;
}

//------------------------------------------------------------------------------
module.exports = EvaluateWinsAnyWaysLeftToRight;

},{"./math-config.json":5}],4:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
var MathConfig = require('./math-config.json');
var Evaluate = require('./evaluate-wins-any-ways-left-to-right.js');

//------------------------------------------------------------------------------
function FakeBackend() {
  //------------------------------------------------------------------------------
  var p = {
    balance: 10000,
    w: MathConfig.reels.w,
    h: MathConfig.reels.h,
    ways: Math.pow(MathConfig.reels.h, MathConfig.reels.w),
    roundId: Math.floor(Math.random() * 100000000) + 100000000
  };
  var config = {
    simulateServerDelay: 300
  };

  //------------------------------------------------------------------------------
  this.requestOpenGame = function (onResponse) {
    var response = {
      balance: p.balance,
      initialBet: 100,
      bets: [100],
      paytable: MathConfig.paytable,
      reels: MathConfig.reels,
      symbols: MathConfig.symbols,
      ways: p.ways
    };
    setTimeout(function () {
      return onResponse(response);
    }, config.simulateServerDelay);
  };

  //------------------------------------------------------------------------------
  function initRound(bet) {
    p.balance -= bet;
    p.roundId += Math.floor(Math.random() * 10000);
    if (p.balance < 0) {
      p.balance = 10000 - bet; // cycle now to avoid errors. Standard demo behaviour
    }
    return {
      postSpinBalance: p.balance,
      finalBalance: p.balance,
      bet: bet,
      roundId: p.roundId,
      grossWin: 0
    };
  }

  //------------------------------------------------------------------------------
  function randomiseReels() {
    var reels = [];
    for (var i = 0; i < p.w; ++i) {
      var col = [];
      for (var j = 0; j < p.h; ++j) {
        col.push(Math.floor(Math.random() * 4) + 1);
      }
      // chance to add a bonus symbols on reels 0, 2, 4
      if (i % 2 === 0 && Math.random() <= MathConfig.rules.chancePerColumnPerBonus) {
        col[Math.floor(Math.random() * 3)] = 0;
      }
      reels.push(col);
    }
    return reels;
  }

  //------------------------------------------------------------------------------
  function evaluateWins(round, reels) {
    var wins = Evaluate(round.bet, reels);
    return wins;
  }

  //------------------------------------------------------------------------------
  this.requestSpin = function (bet, onResponse) {
    var round = initRound(bet);
    var reels = randomiseReels();
    var wins = evaluateWins(round, reels);
    var response = {
      round: round,
      reels: reels,
      wins: wins
    };

    // sort wins and add them
    wins.sort(function (a, b) {
      return b - a;
    });
    round.grossWin = wins.reduce(function (total, win) {
      return total + win.grossWin;
    }, 0);
    response.round.finalBalance = p.balance += round.grossWin;
    setTimeout(function () {
      return onResponse(response);
    }, config.simulateServerDelay);
  };
}

//------------------------------------------------------------------------------
module.exports = FakeBackend;

},{"./evaluate-wins-any-ways-left-to-right.js":3,"./math-config.json":5}],5:[function(require,module,exports){
module.exports={
    "reels": {
        "w": 5,
        "h": 3,
        "slotface": [[1, 2, 3], [4, 5, 6], [1, 2, 3], [4, 5, 6], [1, 2, 3]]
    },

    "rules": {
        "chancePerColumnPerBonus": 0.2
    },

    "symbols": {
        "0": {"isBonus": true},
        "1": {"anyWays": true},
        "2": {"anyWays": true},
        "3": {"anyWays": true},
        "4": {"anyWays": true},
        "5": {"anyWays": true},
        "6": {"anyWays": true}
    },

    "paytable": {
        "0": [],
        "1": [0, 0, 10, 20, 40],
        "2": [0, 0, 5, 10, 20],
        "3": [0, 0, 4, 8, 16],
        "4": [0, 0, 3, 6, 12],
        "5": [0, 0, 2, 4, 8],
        "6": [0, 0, 1, 2, 4]
    }
}
},{}],6:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
var BalanceBar = require('./components/balance-bar-component.js');
var GameUi = require('./components/game-ui-component.js');
var Layout = require('./components/layout-component.js');
var LegalInfo = require('./components/legal-info-component.js');
var Reels = require('./components/reels-component.js');
var WinScoring = require('./components/win-scoring-component.js');

//------------------------------------------------------------------------------
function Components(modules) {
  var self = this;

  //------------------------------------------------------------------------------
  this.balanceBar = null;
  this.gameUi = null;
  this.layout = null;
  this.legalInfo = null;
  this.reels = null;
  this.winScoring = null;

  //------------------------------------------------------------------------------
  this.postLoadInit = function () {
    // must be instantiated first so visual components can use the layout
    self.layout = new Layout(modules);
    self.balanceBar = new BalanceBar(modules);
    self.gameUi = new GameUi(modules);
    self.legalInfo = new LegalInfo(modules);
    self.reels = new Reels(modules);
    self.winScoring = new WinScoring(modules);
  };
}

//------------------------------------------------------------------------------
module.exports = Components;

},{"./components/balance-bar-component.js":7,"./components/game-ui-component.js":8,"./components/layout-component.js":9,"./components/legal-info-component.js":10,"./components/reels-component.js":12,"./components/win-scoring-component.js":13}],7:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function BalanceBarComponent(modules) {
  var self = this;
  var p = {
    balance: null,
    win: null,
    bet: null,
    strings: {
      balance: 'Balance: ',
      win: 'Win: ',
      bet: 'Bet: '
    }
  };

  //------------------------------------------------------------------------------
  this.updateBalance = function (value) {
    p.balance.text = p.strings.balance + value;
  };

  //------------------------------------------------------------------------------
  this.updateWin = function (value) {
    if (typeof value === 'number') {
      p.win.visible = true;
      p.win.text = p.strings.win + value;
    } else {
      p.win.visible = false;
    }
  };

  //------------------------------------------------------------------------------
  this.updateBet = function (value) {
    p.bet.text = p.strings.bet + value;
  };

  //------------------------------------------------------------------------------
  function construct() {
    var style = {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff
    };
    p.balance = new PIXI.Text('', style);
    p.win = new PIXI.Text('', style);
    p.bet = new PIXI.Text('', style);
    p.balance.position.set(10, 490);
    p.balance.anchor.set(0, 1.0);
    p.win.position.set(300, 490);
    p.win.anchor.set(0.5, 1.0);
    p.bet.position.set(590, 490);
    p.bet.anchor.set(1.0, 1.0);
    modules.components.layout.ui.addChild(p.balance, p.win, p.bet);
    self.updateBalance(modules.session.balance);
    self.updateWin();
    self.updateBet(modules.session.bet);
  }
  construct();
}

//------------------------------------------------------------------------------
module.exports = BalanceBarComponent;

},{}],8:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function GameUiComponent(modules) {
  var self = this;

  //------------------------------------------------------------------------------
  var p = {
    spin: null
  };

  //------------------------------------------------------------------------------
  this.enable = function () {
    p.spin.interactive = true;
    p.spin.visible = true;
  };

  //------------------------------------------------------------------------------
  this.disable = function () {
    p.spin.interactive = false;
    p.spin.visible = false;
  };

  //------------------------------------------------------------------------------
  function onSpinClicked() {
    modules.events.push({
      id: 'SPIN_CLICKED'
    });
  }

  //------------------------------------------------------------------------------
  function construct() {
    var style = {
      fontFamily: 'Arial',
      fontSize: 30,
      fill: 0x000000
    };
    var text = new PIXI.Text('SPIN', style);
    text.anchor.set(0.5, 0.5);
    var spin = new PIXI.Graphics();
    spin.beginFill(0xa0f0a0, 1);
    spin.drawCircle(0, 0, 44);
    spin.endFill();
    spin.position.set(300, 410);
    spin.on('pointertap', onSpinClicked);
    spin.addChild(text);
    modules.components.layout.ui.addChild(spin);
    p.spin = spin;
    self.disable();
  }
  construct();
}

//------------------------------------------------------------------------------
module.exports = GameUiComponent;

},{}],9:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function LayoutComponent(modules) {
  var self = this;
  this.ui = new PIXI.Container();
  this.game = new PIXI.Container();

  //------------------------------------------------------------------------------
  var p = {
    parent: new PIXI.Container()
  };

  //------------------------------------------------------------------------------
  var config = {
    contentW: 600,
    contentH: 500
  };

  //------------------------------------------------------------------------------
  self.resize = function (w, h) {
    var scaleX = w / config.contentW;
    var scaleY = h / config.contentH;
    var scale = scaleX < scaleY ? scaleX : scaleY;
    p.parent.scale.set(scale);
    p.parent.position.set((w - config.contentW * scale) * 0.5, (h - config.contentH * scale) * 0.5);
  };

  //------------------------------------------------------------------------------
  function construct() {
    modules.pixi.stage.addChild(p.parent);
    p.parent.addChild(self.game);
    p.parent.addChild(self.ui);
    self.resize(modules.resizer.w, modules.resizer.h);
  }
  construct();
}

//------------------------------------------------------------------------------
module.exports = LayoutComponent;

},{}],10:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function LegalInfoComponent(modules) {
  var self = this;
  var p = {
    roundId: null,
    strings: {
      roundId: 'Round Id: '
    }
  };

  //------------------------------------------------------------------------------
  this.updateRoundId = function (value) {
    p.roundId.text = p.strings.roundId + value;
  };

  //------------------------------------------------------------------------------
  function construct() {
    var style = {
      fontFamily: 'Arial',
      fontSize: 14,
      fill: 0xffffff
    };
    p.roundId = new PIXI.Text('', style);
    p.roundId.position.set(10, 10);
    modules.components.layout.ui.addChild(p.roundId);
    self.updateRoundId('');
  }
  construct();
}

//------------------------------------------------------------------------------
module.exports = LegalInfoComponent;

},{}],11:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
var Tween = require('@tweenjs/tween.js');
var GameConfig = require('../game-config.json');

//------------------------------------------------------------------------------
function ReelColumnComponent(modules, colIdx, columnface, parent) {
  //------------------------------------------------------------------------------
  var p = {
    container: new PIXI.Container(),
    symbols: [],
    symbolIds: []
  };
  var config = {
    symbolH: 0,
    dropDuration: 300,
    dropHeight: 500,
    dropSymbolInterval: 50
  };

  //------------------------------------------------------------------------------
  function getSymbolTex(symbolId, isHighlight) {
    var texId = GameConfig.symbols[symbolId.toString()].resourcePrefix + (isHighlight ? 'Flash' : '');
    return modules.resources.getTexture(texId);
  }

  //------------------------------------------------------------------------------
  this.beginSpin = function (delay, onComplete) {
    var lastIdx = p.symbols.length - 1;
    p.symbols.forEach(function (symbol, idx) {
      var tween = new Tween.Tween(symbol).to({
        y: config.dropHeight + config.symbolH * idx,
        alpha: 0
      }, config.dropDuration).easing(Tween.Easing.Cubic.In).delay(delay + config.dropSymbolInterval * (lastIdx - idx)).start();
      if (onComplete && idx === 0) {
        tween.onComplete(onComplete);
      }
    });
  };

  //------------------------------------------------------------------------------
  this.endSpin = function (columnface, delay, onComplete) {
    console.assert(columnface.length === p.symbols.length);
    var lastIdx = p.symbols.length - 1;
    p.symbols.forEach(function (symbol, idx) {
      symbol.y = -config.dropHeight + config.symbolH * idx;
      symbol.alpha = 0;
      symbol.texture = getSymbolTex(columnface[idx], false);
      p.symbolIds[idx] = columnface[idx];
      var tween = new Tween.Tween(symbol).to({
        y: config.symbolH * idx,
        alpha: 1
      }, config.dropDuration).easing(Tween.Easing.Cubic.In).delay(delay + config.dropSymbolInterval * (lastIdx - idx)).start();
      if (onComplete && idx === 0) {
        tween.onComplete(onComplete);
      }
    });
  };

  //------------------------------------------------------------------------------
  this.flashSymbols = function (symbolsUsed) {
    console.assert(symbolsUsed.length === p.symbols.length);
    p.symbols.forEach(function (symbol, idx) {
      if (symbolsUsed[idx]) {
        symbol.texture = getSymbolTex(p.symbolIds[idx], true);
      } else {
        // symbol.alpha = 0.5;
      }
    });
  };

  //------------------------------------------------------------------------------
  this.reset = function () {
    p.symbols.forEach(function (symbol, idx) {
      symbol.texture = getSymbolTex(p.symbolIds[idx], false);
      // symbol.alpha = 1;
    });
  };

  //------------------------------------------------------------------------------
  function construct() {
    var refTex = getSymbolTex(0, false);
    config.symbolH = refTex.height;
    p.container.x = refTex.width * colIdx;
    parent.addChild(p.container);
    columnface.forEach(function (symbolId, idx) {
      var symbol = new PIXI.Sprite(getSymbolTex(symbolId, false));
      symbol.y = idx * config.symbolH;
      p.container.addChild(symbol);
      p.symbols.push(symbol);
      p.symbolIds.push(symbolId);
    });
  }
  construct();
}

//------------------------------------------------------------------------------
module.exports = ReelColumnComponent;

},{"../game-config.json":15,"@tweenjs/tween.js":2}],12:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
var ReelColumn = require('./reel-column-component.js');

//------------------------------------------------------------------------------
function ReelsComponent(modules) {
  var self = this;

  //------------------------------------------------------------------------------
  var p = {
    container: new PIXI.Container(),
    cols: []
  };
  var config = {
    appearDelayPerCol: 100,
    wins: null,
    winFlashDuration: 300,
    winFlashesPerWin: 3,
    winIdx: 0,
    winFlashIdx: 0,
    winInterval: null
  };

  //------------------------------------------------------------------------------
  this.beginSpin = function (onComplete) {
    p.cols.forEach(function (col, idx) {
      var cb = idx === p.cols.length - 1 ? onComplete : null;
      col.beginSpin(idx * config.appearDelayPerCol, cb);
    });
  };

  //------------------------------------------------------------------------------
  this.endSpin = function (slotface, onComplete) {
    p.cols.forEach(function (col, idx) {
      var cb = idx === p.cols.length - 1 ? onComplete : null;
      col.endSpin(slotface[idx], idx * config.appearDelayPerCol, cb);
    });
  };

  //------------------------------------------------------------------------------
  this.snapSymbols = function (slotface) {
    p.cols.forEach(function (col, idx) {
      col.snaSymbols(slotface[idx]);
    });
  };

  //------------------------------------------------------------------------------
  this.flashSymbols = function (symbolsUsed) {
    p.cols.forEach(function (col, idx) {
      col.flashSymbols(symbolsUsed[idx]);
    });
  };

  //------------------------------------------------------------------------------
  this.updateWinScoring = function (unused_win) {
    modules.components.winScoring.showWin(modules.session.spin.round.grossWin, p.wins[p.winIdx]);
  };

  //------------------------------------------------------------------------------
  this.onWinInterval = function () {
    p.cols.forEach(function (col) {
      return col.reset();
    });
    ++p.winFlashIdx;
    p.winFlashIdx = p.winFlashIdx % (config.winFlashesPerWin * 2);
    if (p.winFlashIdx === 0) {
      ++p.winIdx;
      p.winIdx = p.winIdx % p.wins.length;
      self.updateWinScoring();
    }
    if (p.winFlashIdx % 2 === 1) {
      self.flashSymbols(p.wins[p.winIdx].symbolsUsed);
    }
  };

  //------------------------------------------------------------------------------
  this.cycleWins = function (wins) {
    console.assert(!p.winInterval);
    p.wins = wins;
    p.winIdx = 0;
    p.winFlashIdx = 0;
    self.updateWinScoring();
    self.onWinInterval();
    p.winInterval = setInterval(self.onWinInterval.bind(self), config.winFlashDuration);
  };

  //------------------------------------------------------------------------------
  this.reset = function () {
    if (p.winInterval) {
      clearInterval(p.winInterval);
      p.winInterval = null;
    }
    p.cols.forEach(function (col) {
      return col.reset();
    });
    modules.components.winScoring.hide();
  };

  //------------------------------------------------------------------------------
  function construct() {
    modules.components.layout.game.addChild(p.container);
    p.container.position.set(50, 50);
    p.container.scale.set(0.5, 0.5);
    var s = modules.session.openGame;
    for (var i = 0; i < s.reels.w; ++i) {
      console.assert(s.reels.h === s.reels.slotface[i].length);
      p.cols.push(new ReelColumn(modules, i, s.reels.slotface[i], p.container));
    }
  }
  construct();
}

//------------------------------------------------------------------------------
module.exports = ReelsComponent;

},{"./reel-column-component.js":11}],13:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function WinScoringComponent(modules) {
  var self = this;
  var p = {
    winScore: null,
    totalScore: null,
    strings: {
      winScore: '{COUNT} ways with symbol {SYMBOL}\nEach way worth {SINGLE} for {TOTAL}',
      totalScore: 'Total win {TOTAL}'
    }
  };

  //------------------------------------------------------------------------------
  this.showWin = function (totalWin, win) {
    var text = p.strings.winScore;
    text = text.replace('{COUNT}', win.ways);
    text = text.replace('{SYMBOL}', win.symbolId);
    text = text.replace('{SINGLE}', win.grossWinPerWay);
    text = text.replace('{TOTAL}', win.grossWin);
    p.winScore.text = text;
    p.winScore.visible = true;
    text = p.strings.totalScore;
    text = text.replace('{TOTAL}', totalWin);
    p.totalScore.text = text;
    p.totalScore.visible = true;
  };

  //------------------------------------------------------------------------------
  this.hide = function () {
    p.winScore.visible = false;
    p.totalScore.visible = false;
  };

  //------------------------------------------------------------------------------
  function construct() {
    var style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fill: '#ffc080',
      stroke: '#000000',
      strokeThickness: 6,
      lineJoin: 'bevel',
      fontSize: 20,
      align: 'center'
    });
    p.winScore = new PIXI.Text('', style);
    p.winScore.rotation = 0.3;
    p.winScore.position.set(450, 60);
    p.winScore.anchor.set(0.5);
    modules.components.layout.game.addChild(p.winScore);
    var style2 = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fill: '#ffc080',
      stroke: '#000000',
      strokeThickness: 12,
      lineJoin: 'bevel',
      fontSize: 30,
      align: 'center'
    });
    p.totalScore = new PIXI.Text('', style2);
    p.totalScore.rotation = 0.3;
    p.totalScore.position.set(120, 350);
    p.totalScore.anchor.set(0.5);
    modules.components.layout.game.addChild(p.totalScore);
    self.hide();
  }
  construct();
}

//------------------------------------------------------------------------------
module.exports = WinScoringComponent;

},{}],14:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function Events() {
  var self = this;
  this.queue = [];

  //------------------------------------------------------------------------------
  this.push = function (event) {
    self.queue.push(event);
  };

  //------------------------------------------------------------------------------
  this.hasPending = function () {
    return self.queue.length > 0;
  };

  //------------------------------------------------------------------------------
  this.pop = function () {
    console.assert(self.hasPending());
    return self.queue.shift();
  };
}

//------------------------------------------------------------------------------
module.exports = Events;

},{}],15:[function(require,module,exports){
module.exports={
    "symbols": {
        "0": {"resourcePrefix": "symbolBonus"},
        "1": {"resourcePrefix": "symbolH1"},
        "2": {"resourcePrefix": "symbolH2"},
        "3": {"resourcePrefix": "symbolH3"},
        "4": {"resourcePrefix": "symbolH4"},
        "5": {"resourcePrefix": "symbolH5"},
        "6": {"resourcePrefix": "symbolH6"},
        "7": {"resourcePrefix": "symbolM1"},
        "8": {"resourcePrefix": "symbolM2"},
        "9": {"resourcePrefix": "symbolM3"},
        "10": {"resourcePrefix": "symbolM4"},
        "11": {"resourcePrefix": "symbolM5"},
        "12": {"resourcePrefix": "symbolM6"},
        "13": {"resourcePrefix": "symbolA"},
        "14": {"resourcePrefix": "symbolQ"},
        "15": {"resourcePrefix": "symbolK"},
        "16": {"resourcePrefix": "symbolJ"},
        "17": {"resourcePrefix": "symbol10"},
        "18": {"resourcePrefix": "symbol9"}
    }
}
},{}],16:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
var Idle = require('./gamestates/idle-gamestate.js');
var Handshake = require('./gamestates/handshake-gamestate.js');
var Loading = require('./gamestates/loading-gamestate.js');
var Loaded = require('./gamestates/loaded-gamestate.js');
var ShowBaseWins = require('./gamestates/show-base-wins-gamestate.js');
var SpinRequest = require('./gamestates/spin-request-gamestate.js');
var SpinResolve = require('./gamestates/spin-resolve-gamestate.js');

//------------------------------------------------------------------------------
function GamestateManager(modules) {
  var self = this;
  this.states = {};
  this.currentState = null;

  //------------------------------------------------------------------------------
  function construct() {
    var states = [new Idle(modules), new Handshake(modules), new Loading(modules), new Loaded(modules), new SpinRequest(modules), new SpinResolve(modules), new ShowBaseWins(modules)];
    states.forEach(function (state) {
      console.assert(typeof state.id === 'string');
      console.assert(!(state.id in self.states));
      self.states[state.id] = state;
    });
  }
  construct();

  //------------------------------------------------------------------------------
  this.tick = function () {
    while (modules.events.hasPending()) {
      var e = modules.events.pop();
      console.assert(typeof e.id === 'string');
      var t = self.currentState.transitions;
      if (t && t[e.id]) {
        console.assert(t && t[e.id] && typeof t[e.id].nextState === 'string');
        self.changeState(t[e.id].nextState);
      } else {
        console.warn('transition event ignored', e.id);
      }
    }
    if (self.currentState && self.currentState.onTick) {
      self.currentState.onTick();
    }
  };

  //------------------------------------------------------------------------------
  this.changeState = function (stateName) {
    console.assert(self.states[stateName]);
    console.log('change state', stateName);
    if (self.currentState && self.currentState.onExit) {
      self.currentState.onExit();
    }
    self.currentState = self.states[stateName];
    if (self.currentState && self.currentState.onEnter) {
      self.currentState.onEnter();
    }
  };
}

//------------------------------------------------------------------------------
module.exports = GamestateManager;

},{"./gamestates/handshake-gamestate.js":17,"./gamestates/idle-gamestate.js":18,"./gamestates/loaded-gamestate.js":19,"./gamestates/loading-gamestate.js":20,"./gamestates/show-base-wins-gamestate.js":21,"./gamestates/spin-request-gamestate.js":22,"./gamestates/spin-resolve-gamestate.js":23}],17:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function HandshakeGamestate(modules) {
  this.id = 'handshake';

  //------------------------------------------------------------------------------
  function onRequestResponse(response) {
    console.log(response);
    modules.session.recordOpenGame(response);
    modules.events.push({
      id: 'RESPONSE_SUCCESS'
    });
  }

  //------------------------------------------------------------------------------
  this.onEnter = function () {
    modules.backend.requestOpenGame(onRequestResponse);
  };

  //------------------------------------------------------------------------------
  this.transitions = {
    RESPONSE_SUCCESS: {
      nextState: 'loaded'
    }
  };
}

//------------------------------------------------------------------------------
module.exports = HandshakeGamestate;

},{}],18:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function IdleGamestate(modules) {
  this.id = 'idle';

  //------------------------------------------------------------------------------
  this.onEnter = function () {
    modules.components.gameUi.enable();
  };

  //------------------------------------------------------------------------------
  this.onExit = function () {
    modules.components.reels.reset();
    modules.components.gameUi.disable();
    modules.components.balanceBar.updateWin();
  };

  //------------------------------------------------------------------------------
  this.transitions = {
    SPIN_CLICKED: {
      nextState: 'spinRequest'
    }
  };
}

//------------------------------------------------------------------------------
module.exports = IdleGamestate;

},{}],19:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function LoadedGamestate(modules) {
  this.id = 'loaded';

  //------------------------------------------------------------------------------
  this.onEnter = function () {
    modules.components.postLoadInit();
    modules.events.push({
      id: 'SETUP_SUCCESS'
    });
  };

  //------------------------------------------------------------------------------
  this.transitions = {
    SETUP_SUCCESS: {
      nextState: 'idle'
    }
  };
}

//------------------------------------------------------------------------------
module.exports = LoadedGamestate;

},{}],20:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function LoadingGamestate(modules) {
  this.id = 'loading';

  //------------------------------------------------------------------------------
  this.onEnter = function () {
    modules.resources.loadTextures('textures', function () {
      modules.events.push({
        id: 'LOAD_SUCCESS'
      });
    });
  };

  //------------------------------------------------------------------------------
  this.transitions = {
    LOAD_SUCCESS: {
      nextState: 'handshake'
    }
  };
}

//------------------------------------------------------------------------------
module.exports = LoadingGamestate;

},{}],21:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function ShowBaseWinsGamestate(modules) {
  this.id = 'showBaseWins';

  //------------------------------------------------------------------------------
  this.onEnter = function () {
    modules.session.finaliseSpinResponse();
    modules.components.balanceBar.updateWin(modules.session.spin.round.grossWin);
    modules.components.reels.cycleWins(modules.session.spin.wins);
    modules.events.push({
      id: 'CYCLE_STARTED'
    });
  };

  //------------------------------------------------------------------------------
  this.transitions = {
    CYCLE_STARTED: {
      nextState: 'idle'
    }
  };
}

//------------------------------------------------------------------------------
module.exports = ShowBaseWinsGamestate;

},{}],22:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function SpinRequestGamestate(modules) {
  this.id = 'spinRequest';

  //------------------------------------------------------------------------------
  var p = {
    waitFor: 0
  };

  //------------------------------------------------------------------------------
  function checkComplete() {
    --p.waitFor;
    if (p.waitFor === 0) {
      modules.events.push({
        id: 'REQUEST_COMPLETE'
      });
    }
  }

  //------------------------------------------------------------------------------
  function onReelsAnimComplete() {
    checkComplete();
  }

  //------------------------------------------------------------------------------
  function onSpinResponse(response) {
    modules.session.recordSpinResponse(response);
    console.log(response);
    checkComplete();
  }

  //------------------------------------------------------------------------------
  this.onEnter = function () {
    p.waitFor = 2;
    modules.components.reels.beginSpin(onReelsAnimComplete);
    modules.backend.requestSpin(modules.session.bet, onSpinResponse);
  };

  //------------------------------------------------------------------------------
  this.transitions = {
    REQUEST_COMPLETE: {
      nextState: 'spinResolve'
    }
  };
}

//------------------------------------------------------------------------------
module.exports = SpinRequestGamestate;

},{}],23:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function SpinResolveGamestate(modules) {
  this.id = 'spinResolve';

  //------------------------------------------------------------------------------
  function onReelsAnimComplete() {
    var response = modules.session.spin;
    var id = response.wins && response.wins.length > 0 ? 'SPIN_WITH_WINS' : 'SPIN_NO_WINS';
    modules.events.push({
      id: id
    });
  }

  //------------------------------------------------------------------------------
  this.onEnter = function () {
    modules.components.reels.endSpin(modules.session.spin.reels, onReelsAnimComplete);
  };

  //------------------------------------------------------------------------------
  this.transitions = {
    SPIN_WITH_WINS: {
      nextState: 'showBaseWins'
    },
    SPIN_NO_WINS: {
      nextState: 'idle'
    }
  };
}

//------------------------------------------------------------------------------
module.exports = SpinResolveGamestate;

},{}],24:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function Resizer(modules) {
  var self = this;
  this.w = window.innerWidth;
  this.h = window.innerHeight;

  //------------------------------------------------------------------------------
  function onResize() {
    self.w = window.innerWidth;
    self.h = window.innerHeight;
    // modules.pixi.renderer.resize (self.w, self.h);

    if (modules.components.layout) {
      modules.components.layout.resize(self.w, self.h);
    }
  }

  //------------------------------------------------------------------------------
  function preventTouchMove(event) {
    event.preventDefault();
  }

  //------------------------------------------------------------------------------
  function construct() {
    window.addEventListener('resize', onResize);
    window.addEventListener('deviceOrientation', onResize);
    window.addEventListener('touchmove', preventTouchMove);
  }
  construct();
}

//------------------------------------------------------------------------------
module.exports = Resizer;

},{}],25:[function(require,module,exports){
module.exports={
    "textures": [
        {"name": "symbolH1", "url": "res/symbols/H1.png"},
        {"name": "symbolH1Flash", "url": "res/symbols/H1_connect.png"},
        {"name": "symbolH2", "url": "res/symbols/H2.png"},
        {"name": "symbolH2Flash", "url": "res/symbols/H2_connect.png"},
        {"name": "symbolH3", "url": "res/symbols/H3.png"},
        {"name": "symbolH3Flash", "url": "res/symbols/H3_connect.png"},
        {"name": "symbolH4", "url": "res/symbols/H4.png"},
        {"name": "symbolH4Flash", "url": "res/symbols/H4_connect.png"},
        {"name": "symbolH5", "url": "res/symbols/H5.png"},
        {"name": "symbolH6", "url": "res/symbols/H6.png"},
        {"name": "symbolBonus", "url": "res/symbols/BONUS.png"}
    ]
}
},{}],26:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
var manifest = require('./resource-manifest.json');

//------------------------------------------------------------------------------
function Resources() {
  var _this = this;
  var self = this;

  //------------------------------------------------------------------------------
  this.manifest = manifest;
  this.textures = {
    EMPTY: PIXI.Texture.EMPTY,
    WHITE: PIXI.Texture.WHITE
  };

  //------------------------------------------------------------------------------
  function construct() {
    PIXI.Loader.shared.on('error', function (a, b, c, unused_d) {
      console.log(a.message);
      console.log(c.url);
    });
  }
  construct();

  //------------------------------------------------------------------------------
  this.getTexture = function (resourceName) {
    console.assert(self.textures[resourceName]);
    return self.textures[resourceName];
  };

  //------------------------------------------------------------------------------
  this.loadTextures = function (bundleName, onLoaded) {
    var requests = _this.manifest[bundleName];
    PIXI.Loader.shared.reset();
    PIXI.Loader.shared.add(requests);
    PIXI.Loader.shared.load(function () {
      var r = PIXI.Loader.shared.resources;
      requests.forEach(function (request) {
        self.textures[request.name] = r[request.name].texture;
      });
      onLoaded(bundleName);
    });
  };
}

//------------------------------------------------------------------------------
module.exports = Resources;

},{"./resource-manifest.json":25}],27:[function(require,module,exports){
"use strict";

//------------------------------------------------------------------------------
function Session(modules) {
  var self = this;
  this.balance = 0;
  this.bet = 0;
  this.openGame = null;
  this.spin = null;

  //------------------------------------------------------------------------------
  this.recordOpenGame = function (response) {
    self.openGame = response;
    self.balance = response.balance;
    self.bet = response.initialBet;
  };

  //------------------------------------------------------------------------------
  this.recordSpinResponse = function (response) {
    self.spin = response;
    self.balance = response.round.postSpinBalance;
    modules.components.balanceBar.updateBalance(self.balance);
    modules.components.legalInfo.updateRoundId(response.round.roundId);
  };

  //------------------------------------------------------------------------------
  this.finaliseSpinResponse = function () {
    self.balance = self.spin.round.finalBalance;
    modules.components.balanceBar.updateBalance(self.balance);
  };
}

//------------------------------------------------------------------------------
module.exports = Session;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJnYW1lLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL0B0d2VlbmpzL3R3ZWVuLmpzL2Rpc3QvdHdlZW4uY2pzIiwic3JjL2JhY2tlbmRzL2V2YWx1YXRlLXdpbnMtYW55LXdheXMtbGVmdC10by1yaWdodC5qcyIsInNyYy9iYWNrZW5kcy9mYWtlLWJhY2tlbmQuanMiLCJzcmMvYmFja2VuZHMvbWF0aC1jb25maWcuanNvbiIsInNyYy9jb21wb25lbnRzLmpzIiwic3JjL2NvbXBvbmVudHMvYmFsYW5jZS1iYXItY29tcG9uZW50LmpzIiwic3JjL2NvbXBvbmVudHMvZ2FtZS11aS1jb21wb25lbnQuanMiLCJzcmMvY29tcG9uZW50cy9sYXlvdXQtY29tcG9uZW50LmpzIiwic3JjL2NvbXBvbmVudHMvbGVnYWwtaW5mby1jb21wb25lbnQuanMiLCJzcmMvY29tcG9uZW50cy9yZWVsLWNvbHVtbi1jb21wb25lbnQuanMiLCJzcmMvY29tcG9uZW50cy9yZWVscy1jb21wb25lbnQuanMiLCJzcmMvY29tcG9uZW50cy93aW4tc2NvcmluZy1jb21wb25lbnQuanMiLCJzcmMvZXZlbnRzLmpzIiwic3JjL2dhbWUtY29uZmlnLmpzb24iLCJzcmMvZ2FtZXN0YXRlLW1hbmFnZXIuanMiLCJzcmMvZ2FtZXN0YXRlcy9oYW5kc2hha2UtZ2FtZXN0YXRlLmpzIiwic3JjL2dhbWVzdGF0ZXMvaWRsZS1nYW1lc3RhdGUuanMiLCJzcmMvZ2FtZXN0YXRlcy9sb2FkZWQtZ2FtZXN0YXRlLmpzIiwic3JjL2dhbWVzdGF0ZXMvbG9hZGluZy1nYW1lc3RhdGUuanMiLCJzcmMvZ2FtZXN0YXRlcy9zaG93LWJhc2Utd2lucy1nYW1lc3RhdGUuanMiLCJzcmMvZ2FtZXN0YXRlcy9zcGluLXJlcXVlc3QtZ2FtZXN0YXRlLmpzIiwic3JjL2dhbWVzdGF0ZXMvc3Bpbi1yZXNvbHZlLWdhbWVzdGF0ZS5qcyIsInNyYy9yZXNpemVyLmpzIiwic3JjL3Jlc291cmNlLW1hbmlmZXN0Lmpzb24iLCJzcmMvcmVzb3VyY2VzLmpzIiwic3JjL3Nlc3Npb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0EsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFFLG1CQUFtQixDQUFDO0FBRTNDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBRSxxQkFBcUIsQ0FBQztBQUNsRCxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUUsaUJBQWlCLENBQUM7QUFDMUMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFFLGdDQUFnQyxDQUFDO0FBQzlELElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBRSw0QkFBNEIsQ0FBQztBQUN6RCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUUsa0JBQWtCLENBQUM7QUFDNUMsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFFLG9CQUFvQixDQUFDO0FBQ2hELElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBRSxrQkFBa0IsQ0FBQzs7QUFFNUM7QUFDQSxTQUFTLFFBQVEsQ0FBRSxNQUFNLEVBQUUsT0FBTyxFQUFFO0VBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDO0VBRXZELElBQU0sZUFBZSxHQUFHO0lBQ3BCLEtBQUssRUFBYyxNQUFNLENBQUMsVUFBVTtJQUNwQyxNQUFNLEVBQWEsTUFBTSxDQUFDLFdBQVc7SUFDckMsVUFBVSxFQUFTLE1BQU0sQ0FBQyxnQkFBZ0I7SUFDMUMsaUJBQWlCLEVBQUUsSUFBSTtJQUN2QixRQUFRLEVBQVcsTUFBTTtJQUN6QixVQUFVLEVBQVMsSUFBSTtJQUN2QixXQUFXLEVBQVEsS0FBSztJQUN4QixXQUFXLEVBQVEsS0FBSztJQUN4QixJQUFJLEVBQWUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUUsUUFBUTtFQUMvRCxDQUFDO0VBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsR0FBRyxLQUFLO0VBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFFLENBQUM7RUFFdkIsSUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFFLGVBQWUsQ0FBQztFQUN2RCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTztFQUV0QyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBRSxZQUFNO0lBQUMsTUFBTSxDQUFFLE9BQU8sQ0FBQztFQUFDLENBQUMsQ0FBQztFQUUvQyxPQUFPLFFBQVE7QUFDbkI7O0FBRUE7QUFDQSxTQUFTLFdBQVcsQ0FBRSxNQUFNLEVBQUU7RUFDMUIsSUFBTSxPQUFPLEdBQUc7SUFDWixPQUFPLEVBQUssSUFBSTtJQUNoQixVQUFVLEVBQUUsSUFBSTtJQUNoQixNQUFNLEVBQU0sSUFBSTtJQUNoQixJQUFJLEVBQVEsSUFBSTtJQUNoQixPQUFPLEVBQUssSUFBSTtJQUNoQixTQUFTLEVBQUcsSUFBSTtJQUNoQixPQUFPLEVBQUssSUFBSTtJQUNoQixNQUFNLEVBQU07RUFDaEIsQ0FBQztFQUVELE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUUsQ0FBQztFQUNwQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFFLE9BQU8sQ0FBQztFQUM3QyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFFLENBQUM7RUFDOUIsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztFQUN6QyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFFLE9BQU8sQ0FBQztFQUN2QyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFFLENBQUM7RUFDcEMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBRSxPQUFPLENBQUM7RUFDdkMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBRSxPQUFPLENBQUM7RUFFekMsT0FBTyxPQUFPO0FBQ2xCOztBQUVBO0FBQ0EsU0FBUyxNQUFNLENBQUUsT0FBTyxFQUFFO0VBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUUsQ0FBQztFQUNmLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFFLENBQUM7QUFDMUI7O0FBRUE7QUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRztFQUNmLEdBQUcsRUFBRSxTQUFMLEdBQUcsQ0FBWSxpQkFBaUIsRUFBRTtJQUM5QixJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUUsTUFBTSxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFFLFNBQVMsQ0FBQztFQUMxQztBQUNKLENBQUM7OztBQzNFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDLFlBQVk7SUFDM0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7RUFDOUQsQ0FBQztBQUNMOztBQUVBO0FBQ0EsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3QgVHdlZW4gPSByZXF1aXJlICgnQHR3ZWVuanMvdHdlZW4uanMnKTtcclxuXHJcbmNvbnN0IENvbXBvbmVudHMgPSByZXF1aXJlICgnLi9zcmMvY29tcG9uZW50cy5qcycpO1xyXG5jb25zdCBFdmVudHMgPSByZXF1aXJlICgnLi9zcmMvZXZlbnRzLmpzJyk7XHJcbmNvbnN0IEZha2VCYWNrZW5kID0gcmVxdWlyZSAoJy4vc3JjL2JhY2tlbmRzL2Zha2UtYmFja2VuZC5qcycpO1xyXG5jb25zdCBHYW1lc3RhdGVzID0gcmVxdWlyZSAoJy4vc3JjL2dhbWVzdGF0ZS1tYW5hZ2VyLmpzJyk7XHJcbmNvbnN0IFJlc2l6ZXIgPSByZXF1aXJlICgnLi9zcmMvcmVzaXplci5qcycpO1xyXG5jb25zdCBSZXNvdXJjZXMgPSByZXF1aXJlICgnLi9zcmMvcmVzb3VyY2VzLmpzJyk7XHJcbmNvbnN0IFNlc3Npb24gPSByZXF1aXJlICgnLi9zcmMvc2Vzc2lvbi5qcycpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gaW5pdFBpeGkgKG9uVGljaywgcGF5bG9hZCkge1xyXG4gICAgUElYSS5zZXR0aW5ncy5SRVNPTFVUSU9OID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHJcbiAgICBjb25zdCByZW5kZXJlck9wdGlvbnMgPSB7XHJcbiAgICAgICAgd2lkdGg6ICAgICAgICAgICAgIHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICAgIGhlaWdodDogICAgICAgICAgICB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgICAgcmVzb2x1dGlvbjogICAgICAgIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLFxyXG4gICAgICAgIGNsZWFyQmVmb3JlUmVuZGVyOiB0cnVlLFxyXG4gICAgICAgIHJlc2l6ZVRvOiAgICAgICAgICB3aW5kb3csXHJcbiAgICAgICAgYXV0b1Jlc2l6ZTogICAgICAgIHRydWUsXHJcbiAgICAgICAgdHJhbnNwYXJlbnQ6ICAgICAgIGZhbHNlLFxyXG4gICAgICAgIHJvdW5kUGl4ZWxzOiAgICAgICBmYWxzZSxcclxuICAgICAgICB2aWV3OiAgICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkICgnY2FudmFzJylcclxuICAgIH07XHJcblxyXG4gICAgUElYSS5zZXR0aW5ncy5DQU5fVVBMT0FEX1NBTUVfQlVGRkVSID0gZmFsc2U7XHJcbiAgICBQSVhJLnV0aWxzLnNraXBIZWxsbyAoKTtcclxuXHJcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBQSVhJLkFwcGxpY2F0aW9uIChyZW5kZXJlck9wdGlvbnMpO1xyXG4gICAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCc7XHJcblxyXG4gICAgcmVuZGVyZXIudGlja2VyLmFkZCAoKCkgPT4ge29uVGljayAocGF5bG9hZCk7fSk7XHJcblxyXG4gICAgcmV0dXJuIHJlbmRlcmVyO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBpbml0TW9kdWxlcyAob25UaWNrKSB7XHJcbiAgICBjb25zdCBtb2R1bGVzID0ge1xyXG4gICAgICAgIGJhY2tlbmQ6ICAgIG51bGwsXHJcbiAgICAgICAgY29tcG9uZW50czogbnVsbCxcclxuICAgICAgICBldmVudHM6ICAgICBudWxsLFxyXG4gICAgICAgIHBpeGk6ICAgICAgIG51bGwsXHJcbiAgICAgICAgcmVzaXplcjogICAgbnVsbCxcclxuICAgICAgICByZXNvdXJjZXM6ICBudWxsLFxyXG4gICAgICAgIHNlc3Npb246ICAgIG51bGwsXHJcbiAgICAgICAgc3RhdGVzOiAgICAgbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGVzLmJhY2tlbmQgPSBuZXcgRmFrZUJhY2tlbmQgKCk7XHJcbiAgICBtb2R1bGVzLmNvbXBvbmVudHMgPSBuZXcgQ29tcG9uZW50cyAobW9kdWxlcyk7XHJcbiAgICBtb2R1bGVzLmV2ZW50cyA9IG5ldyBFdmVudHMgKCk7XHJcbiAgICBtb2R1bGVzLnBpeGkgPSBpbml0UGl4aSAob25UaWNrLCBtb2R1bGVzKTtcclxuICAgIG1vZHVsZXMucmVzaXplciA9IG5ldyBSZXNpemVyIChtb2R1bGVzKTtcclxuICAgIG1vZHVsZXMucmVzb3VyY2VzID0gbmV3IFJlc291cmNlcyAoKTtcclxuICAgIG1vZHVsZXMuc2Vzc2lvbiA9IG5ldyBTZXNzaW9uIChtb2R1bGVzKTtcclxuICAgIG1vZHVsZXMuc3RhdGVzID0gbmV3IEdhbWVzdGF0ZXMgKG1vZHVsZXMpO1xyXG5cclxuICAgIHJldHVybiBtb2R1bGVzO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBvblRpY2sgKHBheWxvYWQpIHtcclxuICAgIFR3ZWVuLnVwZGF0ZSAoKTtcclxuICAgIHBheWxvYWQuc3RhdGVzLnRpY2sgKCk7XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbndpbmRvdy5zd2FuLmdhbWUgPSB7XHJcbiAgICBydW46IGZ1bmN0aW9uICh1bnVzZWRfcGFnZUNvbmZpZykge1xyXG4gICAgICAgIGNvbnN0IG1vZHVsZXMgPSBpbml0TW9kdWxlcyAob25UaWNrKTtcclxuICAgICAgICBtb2R1bGVzLnN0YXRlcy5jaGFuZ2VTdGF0ZSAoJ2xvYWRpbmcnKTtcclxuICAgIH1cclxufTtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vKipcbiAqIFRoZSBFYXNlIGNsYXNzIHByb3ZpZGVzIGEgY29sbGVjdGlvbiBvZiBlYXNpbmcgZnVuY3Rpb25zIGZvciB1c2Ugd2l0aCB0d2Vlbi5qcy5cbiAqL1xudmFyIEVhc2luZyA9IE9iamVjdC5mcmVlemUoe1xuICAgIExpbmVhcjogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIE5vbmU6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIHJldHVybiBhbW91bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYW1vdW50O1xuICAgICAgICB9LFxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIHJldHVybiBhbW91bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYW1vdW50O1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIFF1YWRyYXRpYzogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYW1vdW50ICogYW1vdW50O1xuICAgICAgICB9LFxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIHJldHVybiBhbW91bnQgKiAoMiAtIGFtb3VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICBpZiAoKGFtb3VudCAqPSAyKSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogYW1vdW50ICogYW1vdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoLS1hbW91bnQgKiAoYW1vdW50IC0gMikgLSAxKTtcbiAgICAgICAgfSxcbiAgICB9KSxcbiAgICBDdWJpYzogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYW1vdW50ICogYW1vdW50ICogYW1vdW50O1xuICAgICAgICB9LFxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLWFtb3VudCAqIGFtb3VudCAqIGFtb3VudCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICBpZiAoKGFtb3VudCAqPSAyKSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogYW1vdW50ICogYW1vdW50ICogYW1vdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgoYW1vdW50IC09IDIpICogYW1vdW50ICogYW1vdW50ICsgMik7XG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgUXVhcnRpYzogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYW1vdW50ICogYW1vdW50ICogYW1vdW50ICogYW1vdW50O1xuICAgICAgICB9LFxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIHJldHVybiAxIC0gLS1hbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICBpZiAoKGFtb3VudCAqPSAyKSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogYW1vdW50ICogYW1vdW50ICogYW1vdW50ICogYW1vdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoKGFtb3VudCAtPSAyKSAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCAtIDIpO1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIFF1aW50aWM6IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBJbjogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudDtcbiAgICAgICAgfSxcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gLS1hbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKiBhbW91bnQgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICAgICAgaWYgKChhbW91bnQgKj0gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoKGFtb3VudCAtPSAyKSAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCAqIGFtb3VudCArIDIpO1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIFNpbnVzb2lkYWw6IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBJbjogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIDEgLSBNYXRoLnNpbigoKDEuMCAtIGFtb3VudCkgKiBNYXRoLlBJKSAvIDIpO1xuICAgICAgICB9LFxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNpbigoYW1vdW50ICogTWF0aC5QSSkgLyAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoMSAtIE1hdGguc2luKE1hdGguUEkgKiAoMC41IC0gYW1vdW50KSkpO1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIEV4cG9uZW50aWFsOiBPYmplY3QuZnJlZXplKHtcbiAgICAgICAgSW46IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIHJldHVybiBhbW91bnQgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgYW1vdW50IC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGFtb3VudCA9PT0gMSA/IDEgOiAxIC0gTWF0aC5wb3coMiwgLTEwICogYW1vdW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIGlmIChhbW91bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbW91bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoYW1vdW50ICo9IDIpIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBhbW91bnQgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqIChhbW91bnQgLSAxKSkgKyAyKTtcbiAgICAgICAgfSxcbiAgICB9KSxcbiAgICBDaXJjdWxhcjogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gMSAtIE1hdGguc3FydCgxIC0gYW1vdW50ICogYW1vdW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KDEgLSAtLWFtb3VudCAqIGFtb3VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICBpZiAoKGFtb3VudCAqPSAyKSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIGFtb3VudCAqIGFtb3VudCkgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoYW1vdW50IC09IDIpICogYW1vdW50KSArIDEpO1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIEVsYXN0aWM6IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBJbjogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICAgICAgaWYgKGFtb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFtb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChhbW91bnQgLSAxKSkgKiBNYXRoLnNpbigoYW1vdW50IC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcbiAgICAgICAgfSxcbiAgICAgICAgT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICBpZiAoYW1vdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYW1vdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5wb3coMiwgLTEwICogYW1vdW50KSAqIE1hdGguc2luKChhbW91bnQgLSAwLjEpICogNSAqIE1hdGguUEkpICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIGlmIChhbW91bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbW91bnQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFtb3VudCAqPSAyO1xuICAgICAgICAgICAgaWYgKGFtb3VudCA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIE1hdGgucG93KDIsIDEwICogKGFtb3VudCAtIDEpKSAqIE1hdGguc2luKChhbW91bnQgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChhbW91bnQgLSAxKSkgKiBNYXRoLnNpbigoYW1vdW50IC0gMS4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XG4gICAgICAgIH0sXG4gICAgfSksXG4gICAgQmFjazogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gYW1vdW50ID09PSAxID8gMSA6IGFtb3VudCAqIGFtb3VudCAqICgocyArIDEpICogYW1vdW50IC0gcyk7XG4gICAgICAgIH0sXG4gICAgICAgIE91dDogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgcmV0dXJuIGFtb3VudCA9PT0gMCA/IDAgOiAtLWFtb3VudCAqIGFtb3VudCAqICgocyArIDEpICogYW1vdW50ICsgcykgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBJbk91dDogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG4gICAgICAgICAgICBpZiAoKGFtb3VudCAqPSAyKSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKGFtb3VudCAqIGFtb3VudCAqICgocyArIDEpICogYW1vdW50IC0gcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgoYW1vdW50IC09IDIpICogYW1vdW50ICogKChzICsgMSkgKiBhbW91bnQgKyBzKSArIDIpO1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIEJvdW5jZTogT2JqZWN0LmZyZWV6ZSh7XG4gICAgICAgIEluOiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gMSAtIEVhc2luZy5Cb3VuY2UuT3V0KDEgLSBhbW91bnQpO1xuICAgICAgICB9LFxuICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgIGlmIChhbW91bnQgPCAxIC8gMi43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiBhbW91bnQgKiBhbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhbW91bnQgPCAyIC8gMi43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAoYW1vdW50IC09IDEuNSAvIDIuNzUpICogYW1vdW50ICsgMC43NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFtb3VudCA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKGFtb3VudCAtPSAyLjI1IC8gMi43NSkgKiBhbW91bnQgKyAwLjkzNzU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKGFtb3VudCAtPSAyLjYyNSAvIDIuNzUpICogYW1vdW50ICsgMC45ODQzNzU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICBpZiAoYW1vdW50IDwgMC41KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5Cb3VuY2UuSW4oYW1vdW50ICogMikgKiAwLjU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5nLkJvdW5jZS5PdXQoYW1vdW50ICogMiAtIDEpICogMC41ICsgMC41O1xuICAgICAgICB9LFxuICAgIH0pLFxuICAgIGdlbmVyYXRlUG93OiBmdW5jdGlvbiAocG93ZXIpIHtcbiAgICAgICAgaWYgKHBvd2VyID09PSB2b2lkIDApIHsgcG93ZXIgPSA0OyB9XG4gICAgICAgIHBvd2VyID0gcG93ZXIgPCBOdW1iZXIuRVBTSUxPTiA/IE51bWJlci5FUFNJTE9OIDogcG93ZXI7XG4gICAgICAgIHBvd2VyID0gcG93ZXIgPiAxMDAwMCA/IDEwMDAwIDogcG93ZXI7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBJbjogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdyhhbW91bnQsIHBvd2VyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBPdXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAtIE1hdGgucG93KCgxIC0gYW1vdW50KSwgcG93ZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEluT3V0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFtb3VudCA8IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5wb3coKGFtb3VudCAqIDIpLCBwb3dlcikgLyAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gKDEgLSBNYXRoLnBvdygoMiAtIGFtb3VudCAqIDIpLCBwb3dlcikpIC8gMiArIDAuNTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfSxcbn0pO1xuXG52YXIgbm93ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCk7IH07XG5cbi8qKlxuICogQ29udHJvbGxpbmcgZ3JvdXBzIG9mIHR3ZWVuc1xuICpcbiAqIFVzaW5nIHRoZSBUV0VFTiBzaW5nbGV0b24gdG8gbWFuYWdlIHlvdXIgdHdlZW5zIGNhbiBjYXVzZSBpc3N1ZXMgaW4gbGFyZ2UgYXBwcyB3aXRoIG1hbnkgY29tcG9uZW50cy5cbiAqIEluIHRoZXNlIGNhc2VzLCB5b3UgbWF5IHdhbnQgdG8gY3JlYXRlIHlvdXIgb3duIHNtYWxsZXIgZ3JvdXBzIG9mIHR3ZWVuXG4gKi9cbnZhciBHcm91cCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcm91cCgpIHtcbiAgICAgICAgdGhpcy5fdHdlZW5zID0ge307XG4gICAgICAgIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG4gICAgfVxuICAgIEdyb3VwLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpLm1hcChmdW5jdGlvbiAodHdlZW5JZCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLl90d2VlbnNbdHdlZW5JZF07XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgR3JvdXAucHJvdG90eXBlLnJlbW92ZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdHdlZW5zID0ge307XG4gICAgfTtcbiAgICBHcm91cC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHR3ZWVuKSB7XG4gICAgICAgIHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuICAgICAgICB0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVt0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuICAgIH07XG4gICAgR3JvdXAucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICh0d2Vlbikge1xuICAgICAgICBkZWxldGUgdGhpcy5fdHdlZW5zW3R3ZWVuLmdldElkKCldO1xuICAgICAgICBkZWxldGUgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV07XG4gICAgfTtcbiAgICBHcm91cC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHRpbWUsIHByZXNlcnZlKSB7XG4gICAgICAgIGlmICh0aW1lID09PSB2b2lkIDApIHsgdGltZSA9IG5vdygpOyB9XG4gICAgICAgIGlmIChwcmVzZXJ2ZSA9PT0gdm9pZCAwKSB7IHByZXNlcnZlID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcbiAgICAgICAgaWYgKHR3ZWVuSWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFR3ZWVucyBhcmUgdXBkYXRlZCBpbiBcImJhdGNoZXNcIi4gSWYgeW91IGFkZCBhIG5ldyB0d2VlbiBkdXJpbmcgYW5cbiAgICAgICAgLy8gdXBkYXRlLCB0aGVuIHRoZSBuZXcgdHdlZW4gd2lsbCBiZSB1cGRhdGVkIGluIHRoZSBuZXh0IGJhdGNoLlxuICAgICAgICAvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC5cbiAgICAgICAgLy8gSG93ZXZlciwgaWYgdGhlIHJlbW92ZWQgdHdlZW4gd2FzIGFkZGVkIGR1cmluZyB0aGUgY3VycmVudCBiYXRjaCxcbiAgICAgICAgLy8gdGhlbiBpdCB3aWxsIG5vdCBiZSB1cGRhdGVkLlxuICAgICAgICB3aGlsZSAodHdlZW5JZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuICAgICAgICAgICAgICAgIHZhciBhdXRvU3RhcnQgPSAhcHJlc2VydmU7XG4gICAgICAgICAgICAgICAgaWYgKHR3ZWVuICYmIHR3ZWVuLnVwZGF0ZSh0aW1lLCBhdXRvU3RhcnQpID09PSBmYWxzZSAmJiAhcHJlc2VydmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHdlZW5JZHMgPSBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICByZXR1cm4gR3JvdXA7XG59KCkpO1xuXG4vKipcbiAqXG4gKi9cbnZhciBJbnRlcnBvbGF0aW9uID0ge1xuICAgIExpbmVhcjogZnVuY3Rpb24gKHYsIGspIHtcbiAgICAgICAgdmFyIG0gPSB2Lmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBmID0gbSAqIGs7XG4gICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihmKTtcbiAgICAgICAgdmFyIGZuID0gSW50ZXJwb2xhdGlvbi5VdGlscy5MaW5lYXI7XG4gICAgICAgIGlmIChrIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xuICAgIH0sXG4gICAgQmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xuICAgICAgICB2YXIgYiA9IDA7XG4gICAgICAgIHZhciBuID0gdi5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgcHcgPSBNYXRoLnBvdztcbiAgICAgICAgdmFyIGJuID0gSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW47XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IG47IGkrKykge1xuICAgICAgICAgICAgYiArPSBwdygxIC0gaywgbiAtIGkpICogcHcoaywgaSkgKiB2W2ldICogYm4obiwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfSxcbiAgICBDYXRtdWxsUm9tOiBmdW5jdGlvbiAodiwgaykge1xuICAgICAgICB2YXIgbSA9IHYubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIGYgPSBtICogaztcbiAgICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuICAgICAgICB2YXIgZm4gPSBJbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG4gICAgICAgIGlmICh2WzBdID09PSB2W21dKSB7XG4gICAgICAgICAgICBpZiAoayA8IDApIHtcbiAgICAgICAgICAgICAgICBpID0gTWF0aC5mbG9vcigoZiA9IG0gKiAoMSArIGspKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChrIDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2WzBdIC0gKGZuKHZbMF0sIHZbMF0sIHZbMV0sIHZbMV0sIC1mKSAtIHZbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGsgPiAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZbbV0gLSAoZm4odlttXSwgdlttXSwgdlttIC0gMV0sIHZbbSAtIDFdLCBmIC0gbSkgLSB2W21dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBVdGlsczoge1xuICAgICAgICBMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcbiAgICAgICAgICAgIHJldHVybiAocDEgLSBwMCkgKiB0ICsgcDA7XG4gICAgICAgIH0sXG4gICAgICAgIEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcbiAgICAgICAgICAgIHZhciBmYyA9IEludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xuICAgICAgICAgICAgcmV0dXJuIGZjKG4pIC8gZmMoaSkgLyBmYyhuIC0gaSk7XG4gICAgICAgIH0sXG4gICAgICAgIEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhID0gWzFdO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSAxO1xuICAgICAgICAgICAgICAgIGlmIChhW25dKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhW25dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gbjsgaSA+IDE7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBzICo9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFbbl0gPSBzO1xuICAgICAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkoKSxcbiAgICAgICAgQ2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XG4gICAgICAgICAgICB2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG4gICAgICAgICAgICB2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XG4gICAgICAgICAgICB2YXIgdDIgPSB0ICogdDtcbiAgICAgICAgICAgIHZhciB0MyA9IHQgKiB0MjtcbiAgICAgICAgICAgIHJldHVybiAoMiAqIHAxIC0gMiAqIHAyICsgdjAgKyB2MSkgKiB0MyArICgtMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuLyoqXG4gKiBVdGlsc1xuICovXG52YXIgU2VxdWVuY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2VxdWVuY2UoKSB7XG4gICAgfVxuICAgIFNlcXVlbmNlLm5leHRJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFNlcXVlbmNlLl9uZXh0SWQrKztcbiAgICB9O1xuICAgIFNlcXVlbmNlLl9uZXh0SWQgPSAwO1xuICAgIHJldHVybiBTZXF1ZW5jZTtcbn0oKSk7XG5cbnZhciBtYWluR3JvdXAgPSBuZXcgR3JvdXAoKTtcblxuLyoqXG4gKiBUd2Vlbi5qcyAtIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cHM6Ly9naXRodWIuY29tL3R3ZWVuanMvdHdlZW4uanNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3ZWVuanMvdHdlZW4uanMvZ3JhcGhzL2NvbnRyaWJ1dG9ycyBmb3IgdGhlIGZ1bGwgbGlzdCBvZiBjb250cmlidXRvcnMuXG4gKiBUaGFuayB5b3UgYWxsLCB5b3UncmUgYXdlc29tZSFcbiAqL1xudmFyIFR3ZWVuID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFR3ZWVuKF9vYmplY3QsIF9ncm91cCkge1xuICAgICAgICBpZiAoX2dyb3VwID09PSB2b2lkIDApIHsgX2dyb3VwID0gbWFpbkdyb3VwOyB9XG4gICAgICAgIHRoaXMuX29iamVjdCA9IF9vYmplY3Q7XG4gICAgICAgIHRoaXMuX2dyb3VwID0gX2dyb3VwO1xuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXVzZVN0YXJ0ID0gMDtcbiAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcbiAgICAgICAgdGhpcy5fdmFsdWVzRW5kID0ge307XG4gICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XG4gICAgICAgIHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcbiAgICAgICAgdGhpcy5faXNEeW5hbWljID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXRpYWxSZXBlYXQgPSAwO1xuICAgICAgICB0aGlzLl9yZXBlYXQgPSAwO1xuICAgICAgICB0aGlzLl95b3lvID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9kZWxheVRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IEVhc2luZy5MaW5lYXIuTm9uZTtcbiAgICAgICAgdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gSW50ZXJwb2xhdGlvbi5MaW5lYXI7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICB0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XG4gICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX29uRXZlcnlTdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faWQgPSBTZXF1ZW5jZS5uZXh0SWQoKTtcbiAgICAgICAgdGhpcy5faXNDaGFpblN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcHJvcGVydGllc0FyZVNldFVwID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dvVG9FbmQgPSBmYWxzZTtcbiAgICB9XG4gICAgVHdlZW4ucHJvdG90eXBlLmdldElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuaXNQbGF5aW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLmlzUGF1c2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNQYXVzZWQ7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuZ2V0RHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kdXJhdGlvbjtcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS50byA9IGZ1bmN0aW9uICh0YXJnZXQsIGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChkdXJhdGlvbiA9PT0gdm9pZCAwKSB7IGR1cmF0aW9uID0gMTAwMDsgfVxuICAgICAgICBpZiAodGhpcy5faXNQbGF5aW5nKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGNhbGwgVHdlZW4udG8oKSB3aGlsZSBUd2VlbiBpcyBhbHJlYWR5IHN0YXJ0ZWQgb3IgcGF1c2VkLiBTdG9wIHRoZSBUd2VlbiBmaXJzdC4nKTtcbiAgICAgICAgdGhpcy5fdmFsdWVzRW5kID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzQXJlU2V0VXAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSBkdXJhdGlvbiA8IDAgPyAwIDogZHVyYXRpb247XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgIGlmIChkdXJhdGlvbiA9PT0gdm9pZCAwKSB7IGR1cmF0aW9uID0gMTAwMDsgfVxuICAgICAgICB0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uIDwgMCA/IDAgOiBkdXJhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuZHluYW1pYyA9IGZ1bmN0aW9uIChkeW5hbWljKSB7XG4gICAgICAgIGlmIChkeW5hbWljID09PSB2b2lkIDApIHsgZHluYW1pYyA9IGZhbHNlOyB9XG4gICAgICAgIHRoaXMuX2lzRHluYW1pYyA9IGR5bmFtaWM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKHRpbWUsIG92ZXJyaWRlU3RhcnRpbmdWYWx1ZXMpIHtcbiAgICAgICAgaWYgKHRpbWUgPT09IHZvaWQgMCkgeyB0aW1lID0gbm93KCk7IH1cbiAgICAgICAgaWYgKG92ZXJyaWRlU3RhcnRpbmdWYWx1ZXMgPT09IHZvaWQgMCkgeyBvdmVycmlkZVN0YXJ0aW5nVmFsdWVzID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHRoaXMuX2lzUGxheWluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIHRoaXMuX2dyb3VwICYmIHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fcmVwZWF0ID0gdGhpcy5faW5pdGlhbFJlcGVhdDtcbiAgICAgICAgaWYgKHRoaXMuX3JldmVyc2VkKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSB3ZXJlIHJldmVyc2VkIChmLmUuIHVzaW5nIHRoZSB5b3lvIGZlYXR1cmUpIHRoZW4gd2UgbmVlZCB0b1xuICAgICAgICAgICAgLy8gZmxpcCB0aGUgdHdlZW4gZGlyZWN0aW9uIGJhY2sgdG8gZm9yd2FyZC5cbiAgICAgICAgICAgIHRoaXMuX3JldmVyc2VkID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N3YXBFbmRTdGFydFJlcGVhdFZhbHVlcyhwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX29uRXZlcnlTdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNDaGFpblN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gdGltZTtcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lICs9IHRoaXMuX2RlbGF5VGltZTtcbiAgICAgICAgaWYgKCF0aGlzLl9wcm9wZXJ0aWVzQXJlU2V0VXAgfHwgb3ZlcnJpZGVTdGFydGluZ1ZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5fcHJvcGVydGllc0FyZVNldFVwID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIElmIGR5bmFtaWMgaXMgbm90IGVuYWJsZWQsIGNsb25lIHRoZSBlbmQgdmFsdWVzIGluc3RlYWQgb2YgdXNpbmcgdGhlIHBhc3NlZC1pbiBlbmQgdmFsdWVzLlxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0R5bmFtaWMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG1wID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLl92YWx1ZXNFbmQpXG4gICAgICAgICAgICAgICAgICAgIHRtcFtwcm9wXSA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wXTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNFbmQgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zZXR1cFByb3BlcnRpZXModGhpcy5fb2JqZWN0LCB0aGlzLl92YWx1ZXNTdGFydCwgdGhpcy5fdmFsdWVzRW5kLCB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCwgb3ZlcnJpZGVTdGFydGluZ1ZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuc3RhcnRGcm9tQ3VycmVudFZhbHVlcyA9IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0KHRpbWUsIHRydWUpO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLl9zZXR1cFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoX29iamVjdCwgX3ZhbHVlc1N0YXJ0LCBfdmFsdWVzRW5kLCBfdmFsdWVzU3RhcnRSZXBlYXQsIG92ZXJyaWRlU3RhcnRpbmdWYWx1ZXMpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gX3ZhbHVlc0VuZCkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0VmFsdWUgPSBfb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgICAgICAgIHZhciBzdGFydFZhbHVlSXNBcnJheSA9IEFycmF5LmlzQXJyYXkoc3RhcnRWYWx1ZSk7XG4gICAgICAgICAgICB2YXIgcHJvcFR5cGUgPSBzdGFydFZhbHVlSXNBcnJheSA/ICdhcnJheScgOiB0eXBlb2Ygc3RhcnRWYWx1ZTtcbiAgICAgICAgICAgIHZhciBpc0ludGVycG9sYXRpb25MaXN0ID0gIXN0YXJ0VmFsdWVJc0FycmF5ICYmIEFycmF5LmlzQXJyYXkoX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pO1xuICAgICAgICAgICAgLy8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxuICAgICAgICAgICAgaWYgKHByb3BUeXBlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXG4gICAgICAgICAgICBpZiAoaXNJbnRlcnBvbGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgIHZhciBlbmRWYWx1ZXMgPSBfdmFsdWVzRW5kW3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICBpZiAoZW5kVmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlIGFuIGFycmF5IG9mIHJlbGF0aXZlIHZhbHVlcy5cbiAgICAgICAgICAgICAgICAvLyBDcmVhdGVzIGEgbG9jYWwgY29weSBvZiB0aGUgQXJyYXkgd2l0aCB0aGUgc3RhcnQgdmFsdWUgYXQgdGhlIGZyb250XG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBbc3RhcnRWYWx1ZV07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbmRWYWx1ZXMubGVuZ3RoOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX2hhbmRsZVJlbGF0aXZlVmFsdWUoc3RhcnRWYWx1ZSwgZW5kVmFsdWVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNJbnRlcnBvbGF0aW9uTGlzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdGb3VuZCBpbnZhbGlkIGludGVycG9sYXRpb24gbGlzdC4gU2tpcHBpbmcuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZW1wLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNJbnRlcnBvbGF0aW9uTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7IC8vIGhhbmRsZSBlbmQgdmFsdWVzIG9ubHkgdGhlIGZpcnN0IHRpbWUuIE5PVCBORUVERUQ/IHNldHVwUHJvcGVydGllcyBpcyBub3cgZ3VhcmRlZCBieSBfcHJvcGVydGllc0FyZVNldFVwLlxuICAgICAgICAgICAgICAgICAgICBfdmFsdWVzRW5kW3Byb3BlcnR5XSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBoYW5kbGUgdGhlIGRlZXBuZXNzIG9mIHRoZSB2YWx1ZXNcbiAgICAgICAgICAgIGlmICgocHJvcFR5cGUgPT09ICdvYmplY3QnIHx8IHN0YXJ0VmFsdWVJc0FycmF5KSAmJiBzdGFydFZhbHVlICYmICFpc0ludGVycG9sYXRpb25MaXN0KSB7XG4gICAgICAgICAgICAgICAgX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHN0YXJ0VmFsdWVJc0FycmF5ID8gW10gOiB7fTtcbiAgICAgICAgICAgICAgICB2YXIgbmVzdGVkT2JqZWN0ID0gc3RhcnRWYWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIG5lc3RlZE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBfdmFsdWVzU3RhcnRbcHJvcGVydHldW3Byb3BdID0gbmVzdGVkT2JqZWN0W3Byb3BdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBUT0RPPyByZXBlYXQgbmVzdGVkIHZhbHVlcz8gQW5kIHlveW8/IEFuZCBhcnJheSB2YWx1ZXM/XG4gICAgICAgICAgICAgICAgX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHN0YXJ0VmFsdWVJc0FycmF5ID8gW10gOiB7fTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kVmFsdWVzID0gX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgLy8gSWYgZHluYW1pYyBpcyBub3QgZW5hYmxlZCwgY2xvbmUgdGhlIGVuZCB2YWx1ZXMgaW5zdGVhZCBvZiB1c2luZyB0aGUgcGFzc2VkLWluIGVuZCB2YWx1ZXMuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0R5bmFtaWMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGVuZFZhbHVlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcFtwcm9wXSA9IGVuZFZhbHVlc1twcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSBlbmRWYWx1ZXMgPSB0bXA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwUHJvcGVydGllcyhuZXN0ZWRPYmplY3QsIF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0sIGVuZFZhbHVlcywgX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSwgb3ZlcnJpZGVTdGFydGluZ1ZhbHVlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBzdGFydGluZyB2YWx1ZSwgYnV0IG9ubHkgb25jZSB1bmxlc3Mgb3ZlcnJpZGUgaXMgcmVxdWVzdGVkLlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gJ3VuZGVmaW5lZCcgfHwgb3ZlcnJpZGVTdGFydGluZ1ZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICBfdmFsdWVzU3RhcnRbcHJvcGVydHldID0gc3RhcnRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFydFZhbHVlSXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBGSVhNRT9cbiAgICAgICAgICAgICAgICAgICAgX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSAqPSAxLjA7IC8vIEVuc3VyZXMgd2UncmUgdXNpbmcgbnVtYmVycywgbm90IHN0cmluZ3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzSW50ZXJwb2xhdGlvbkxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgRklYTUU/XG4gICAgICAgICAgICAgICAgICAgIF92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSBfdmFsdWVzRW5kW3Byb3BlcnR5XS5zbGljZSgpLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSBfdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NoYWluU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5faXNDaGFpblN0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgdGhpcy5fZ3JvdXAgJiYgdGhpcy5fZ3JvdXAucmVtb3ZlKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX29uU3RvcENhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9vblN0b3BDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZ29Ub0VuZCA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlKEluZmluaXR5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAodGltZSkge1xuICAgICAgICBpZiAodGltZSA9PT0gdm9pZCAwKSB7IHRpbWUgPSBub3coKTsgfVxuICAgICAgICBpZiAodGhpcy5faXNQYXVzZWQgfHwgIXRoaXMuX2lzUGxheWluZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9wYXVzZVN0YXJ0ID0gdGltZTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIHRoaXMuX2dyb3VwICYmIHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgaWYgKHRpbWUgPT09IHZvaWQgMCkgeyB0aW1lID0gbm93KCk7IH1cbiAgICAgICAgaWYgKCF0aGlzLl9pc1BhdXNlZCB8fCAhdGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgKz0gdGltZSAtIHRoaXMuX3BhdXNlU3RhcnQ7XG4gICAgICAgIHRoaXMuX3BhdXNlU3RhcnQgPSAwO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgdGhpcy5fZ3JvdXAgJiYgdGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5zdG9wQ2hhaW5lZFR3ZWVucyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuZ3JvdXAgPSBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgaWYgKGdyb3VwID09PSB2b2lkIDApIHsgZ3JvdXAgPSBtYWluR3JvdXA7IH1cbiAgICAgICAgdGhpcy5fZ3JvdXAgPSBncm91cDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICAgIGlmIChhbW91bnQgPT09IHZvaWQgMCkgeyBhbW91bnQgPSAwOyB9XG4gICAgICAgIHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUucmVwZWF0ID0gZnVuY3Rpb24gKHRpbWVzKSB7XG4gICAgICAgIGlmICh0aW1lcyA9PT0gdm9pZCAwKSB7IHRpbWVzID0gMDsgfVxuICAgICAgICB0aGlzLl9pbml0aWFsUmVwZWF0ID0gdGltZXM7XG4gICAgICAgIHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5yZXBlYXREZWxheSA9IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgICAgdGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS55b3lvID0gZnVuY3Rpb24gKHlveW8pIHtcbiAgICAgICAgaWYgKHlveW8gPT09IHZvaWQgMCkgeyB5b3lvID0gZmFsc2U7IH1cbiAgICAgICAgdGhpcy5feW95byA9IHlveW87XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLmVhc2luZyA9IGZ1bmN0aW9uIChlYXNpbmdGdW5jdGlvbikge1xuICAgICAgICBpZiAoZWFzaW5nRnVuY3Rpb24gPT09IHZvaWQgMCkgeyBlYXNpbmdGdW5jdGlvbiA9IEVhc2luZy5MaW5lYXIuTm9uZTsgfVxuICAgICAgICB0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhc2luZ0Z1bmN0aW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5pbnRlcnBvbGF0aW9uID0gZnVuY3Rpb24gKGludGVycG9sYXRpb25GdW5jdGlvbikge1xuICAgICAgICBpZiAoaW50ZXJwb2xhdGlvbkZ1bmN0aW9uID09PSB2b2lkIDApIHsgaW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gSW50ZXJwb2xhdGlvbi5MaW5lYXI7IH1cbiAgICAgICAgdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gaW50ZXJwb2xhdGlvbkZ1bmN0aW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIFR3ZWVuLnByb3RvdHlwZS5jaGFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR3ZWVucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdHdlZW5zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hhaW5lZFR3ZWVucyA9IHR3ZWVucztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUub25TdGFydCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUub25FdmVyeVN0YXJ0ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX29uRXZlcnlTdGFydENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgVHdlZW4ucHJvdG90eXBlLm9uVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUub25SZXBlYXQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fb25SZXBlYXRDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5vbkNvbXBsZXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5vblN0b3AgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZSB0d2VlbiBpcyBzdGlsbCBwbGF5aW5nIGFmdGVyIHRoZSB1cGRhdGUsIGZhbHNlXG4gICAgICogb3RoZXJ3aXNlIChjYWxsaW5nIHVwZGF0ZSBvbiBhIHBhdXNlZCB0d2VlbiBzdGlsbCByZXR1cm5zIHRydWUgYmVjYXVzZVxuICAgICAqIGl0IGlzIHN0aWxsIHBsYXlpbmcsIGp1c3QgcGF1c2VkKS5cbiAgICAgKi9cbiAgICBUd2Vlbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHRpbWUsIGF1dG9TdGFydCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aW1lID09PSB2b2lkIDApIHsgdGltZSA9IG5vdygpOyB9XG4gICAgICAgIGlmIChhdXRvU3RhcnQgPT09IHZvaWQgMCkgeyBhdXRvU3RhcnQgPSB0cnVlOyB9XG4gICAgICAgIGlmICh0aGlzLl9pc1BhdXNlZClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB2YXIgcHJvcGVydHk7XG4gICAgICAgIHZhciBlbmRUaW1lID0gdGhpcy5fc3RhcnRUaW1lICsgdGhpcy5fZHVyYXRpb247XG4gICAgICAgIGlmICghdGhpcy5fZ29Ub0VuZCAmJiAhdGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICAgICAgICBpZiAodGltZSA+IGVuZFRpbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKGF1dG9TdGFydClcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0KHRpbWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2dvVG9FbmQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRpbWUgPCB0aGlzLl9zdGFydFRpbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vblN0YXJ0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb25FdmVyeVN0YXJ0Q2FsbGJhY2tGaXJlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vbkV2ZXJ5U3RhcnRDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uRXZlcnlTdGFydENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbkV2ZXJ5U3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxhcHNlZFRpbWUgPSB0aW1lIC0gdGhpcy5fc3RhcnRUaW1lO1xuICAgICAgICB2YXIgZHVyYXRpb25BbmREZWxheSA9IHRoaXMuX2R1cmF0aW9uICsgKChfYSA9IHRoaXMuX3JlcGVhdERlbGF5VGltZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fZGVsYXlUaW1lKTtcbiAgICAgICAgdmFyIHRvdGFsVGltZSA9IHRoaXMuX2R1cmF0aW9uICsgdGhpcy5fcmVwZWF0ICogZHVyYXRpb25BbmREZWxheTtcbiAgICAgICAgdmFyIGNhbGN1bGF0ZUVsYXBzZWRQb3J0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzLl9kdXJhdGlvbiA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmIChlbGFwc2VkVGltZSA+IHRvdGFsVGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRpbWVzUmVwZWF0ZWQgPSBNYXRoLnRydW5jKGVsYXBzZWRUaW1lIC8gZHVyYXRpb25BbmREZWxheSk7XG4gICAgICAgICAgICB2YXIgdGltZUludG9DdXJyZW50UmVwZWF0ID0gZWxhcHNlZFRpbWUgLSB0aW1lc1JlcGVhdGVkICogZHVyYXRpb25BbmREZWxheTtcbiAgICAgICAgICAgIC8vIFRPRE8gdXNlICU/XG4gICAgICAgICAgICAvLyBjb25zdCB0aW1lSW50b0N1cnJlbnRSZXBlYXQgPSBlbGFwc2VkVGltZSAlIGR1cmF0aW9uQW5kRGVsYXlcbiAgICAgICAgICAgIHZhciBwb3J0aW9uID0gTWF0aC5taW4odGltZUludG9DdXJyZW50UmVwZWF0IC8gX3RoaXMuX2R1cmF0aW9uLCAxKTtcbiAgICAgICAgICAgIGlmIChwb3J0aW9uID09PSAwICYmIGVsYXBzZWRUaW1lID09PSBfdGhpcy5fZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwb3J0aW9uO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZWxhcHNlZCA9IGNhbGN1bGF0ZUVsYXBzZWRQb3J0aW9uKCk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xuICAgICAgICAvLyBwcm9wZXJ0aWVzIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9wZXJ0aWVzKHRoaXMuX29iamVjdCwgdGhpcy5fdmFsdWVzU3RhcnQsIHRoaXMuX3ZhbHVlc0VuZCwgdmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fb25VcGRhdGVDYWxsYmFjayh0aGlzLl9vYmplY3QsIGVsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkVGltZSA+PSB0aGlzLl9kdXJhdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JlcGVhdCA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgY29tcGxldGVDb3VudCA9IE1hdGgubWluKE1hdGgudHJ1bmMoKGVsYXBzZWRUaW1lIC0gdGhpcy5fZHVyYXRpb24pIC8gZHVyYXRpb25BbmREZWxheSkgKyAxLCB0aGlzLl9yZXBlYXQpO1xuICAgICAgICAgICAgICAgIGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlcGVhdCAtPSBjb21wbGV0ZUNvdW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBSZWFzc2lnbiBzdGFydGluZyB2YWx1ZXMsIHJlc3RhcnQgYnkgbWFraW5nIHN0YXJ0VGltZSA9IG5vd1xuICAgICAgICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl95b3lvICYmIHR5cGVvZiB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIEZJWE1FP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3lveW8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N3YXBFbmRTdGFydFJlcGVhdFZhbHVlcyhwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feW95bykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXZlcnNlZCA9ICF0aGlzLl9yZXZlcnNlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRUaW1lICs9IGR1cmF0aW9uQW5kRGVsYXkgKiBjb21wbGV0ZUNvdW50O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vblJlcGVhdENhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uUmVwZWF0Q2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fb25FdmVyeVN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29uQ29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBNYWtlIHRoZSBjaGFpbmVkIHR3ZWVucyBzdGFydCBleGFjdGx5IGF0IHRoZSB0aW1lIHRoZXkgc2hvdWxkLFxuICAgICAgICAgICAgICAgICAgICAvLyBldmVuIGlmIHRoZSBgdXBkYXRlKClgIG1ldGhvZCB3YXMgY2FsbGVkIHdheSBwYXN0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuX3VwZGF0ZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAoX29iamVjdCwgX3ZhbHVlc1N0YXJ0LCBfdmFsdWVzRW5kLCB2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBfdmFsdWVzRW5kKSB7XG4gICAgICAgICAgICAvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxuICAgICAgICAgICAgaWYgKF92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xuICAgICAgICAgICAgdmFyIGVuZCA9IF92YWx1ZXNFbmRbcHJvcGVydHldO1xuICAgICAgICAgICAgdmFyIHN0YXJ0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX29iamVjdFtwcm9wZXJ0eV0pO1xuICAgICAgICAgICAgdmFyIGVuZElzQXJyYXkgPSBBcnJheS5pc0FycmF5KGVuZCk7XG4gICAgICAgICAgICB2YXIgaXNJbnRlcnBvbGF0aW9uTGlzdCA9ICFzdGFydElzQXJyYXkgJiYgZW5kSXNBcnJheTtcbiAgICAgICAgICAgIGlmIChpc0ludGVycG9sYXRpb25MaXN0KSB7XG4gICAgICAgICAgICAgICAgX29iamVjdFtwcm9wZXJ0eV0gPSB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24oZW5kLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnb2JqZWN0JyAmJiBlbmQpIHtcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIEZJWE1FP1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVByb3BlcnRpZXMoX29iamVjdFtwcm9wZXJ0eV0sIHN0YXJ0LCBlbmQsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFBhcnNlcyByZWxhdGl2ZSBlbmQgdmFsdWVzIHdpdGggc3RhcnQgYXMgYmFzZSAoZS5nLjogKzEwLCAtMylcbiAgICAgICAgICAgICAgICBlbmQgPSB0aGlzLl9oYW5kbGVSZWxhdGl2ZVZhbHVlKHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgICAgIC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZSBGSVhNRT9cbiAgICAgICAgICAgICAgICAgICAgX29iamVjdFtwcm9wZXJ0eV0gPSBzdGFydCArIChlbmQgLSBzdGFydCkgKiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFR3ZWVuLnByb3RvdHlwZS5faGFuZGxlUmVsYXRpdmVWYWx1ZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZW5kICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGVuZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXJ0ICsgcGFyc2VGbG9hdChlbmQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGVuZCk7XG4gICAgfTtcbiAgICBUd2Vlbi5wcm90b3R5cGUuX3N3YXBFbmRTdGFydFJlcGVhdFZhbHVlcyA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICB2YXIgdG1wID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuICAgICAgICB2YXIgZW5kVmFsdWUgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xuICAgICAgICBpZiAodHlwZW9mIGVuZFZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdChlbmRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSB0bXA7XG4gICAgfTtcbiAgICByZXR1cm4gVHdlZW47XG59KCkpO1xuXG52YXIgVkVSU0lPTiA9ICcyMy4xLjMnO1xuXG4vKipcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qcy9ncmFwaHMvY29udHJpYnV0b3JzIGZvciB0aGUgZnVsbCBsaXN0IG9mIGNvbnRyaWJ1dG9ycy5cbiAqIFRoYW5rIHlvdSBhbGwsIHlvdSdyZSBhd2Vzb21lIVxuICovXG52YXIgbmV4dElkID0gU2VxdWVuY2UubmV4dElkO1xuLyoqXG4gKiBDb250cm9sbGluZyBncm91cHMgb2YgdHdlZW5zXG4gKlxuICogVXNpbmcgdGhlIFRXRUVOIHNpbmdsZXRvbiB0byBtYW5hZ2UgeW91ciB0d2VlbnMgY2FuIGNhdXNlIGlzc3VlcyBpbiBsYXJnZSBhcHBzIHdpdGggbWFueSBjb21wb25lbnRzLlxuICogSW4gdGhlc2UgY2FzZXMsIHlvdSBtYXkgd2FudCB0byBjcmVhdGUgeW91ciBvd24gc21hbGxlciBncm91cHMgb2YgdHdlZW5zLlxuICovXG52YXIgVFdFRU4gPSBtYWluR3JvdXA7XG4vLyBUaGlzIGlzIHRoZSBiZXN0IHdheSB0byBleHBvcnQgdGhpbmdzIGluIGEgd2F5IHRoYXQncyBjb21wYXRpYmxlIHdpdGggYm90aCBFU1xuLy8gTW9kdWxlcyBhbmQgQ29tbW9uSlMsIHdpdGhvdXQgYnVpbGQgaGFja3MsIGFuZCBzbyBhcyBub3QgdG8gYnJlYWsgdGhlXG4vLyBleGlzdGluZyBBUEkuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvMTk2MSNpc3N1ZWNvbW1lbnQtNDIzMDM3ODgxXG52YXIgZ2V0QWxsID0gVFdFRU4uZ2V0QWxsLmJpbmQoVFdFRU4pO1xudmFyIHJlbW92ZUFsbCA9IFRXRUVOLnJlbW92ZUFsbC5iaW5kKFRXRUVOKTtcbnZhciBhZGQgPSBUV0VFTi5hZGQuYmluZChUV0VFTik7XG52YXIgcmVtb3ZlID0gVFdFRU4ucmVtb3ZlLmJpbmQoVFdFRU4pO1xudmFyIHVwZGF0ZSA9IFRXRUVOLnVwZGF0ZS5iaW5kKFRXRUVOKTtcbnZhciBleHBvcnRzJDEgPSB7XG4gICAgRWFzaW5nOiBFYXNpbmcsXG4gICAgR3JvdXA6IEdyb3VwLFxuICAgIEludGVycG9sYXRpb246IEludGVycG9sYXRpb24sXG4gICAgbm93OiBub3csXG4gICAgU2VxdWVuY2U6IFNlcXVlbmNlLFxuICAgIG5leHRJZDogbmV4dElkLFxuICAgIFR3ZWVuOiBUd2VlbixcbiAgICBWRVJTSU9OOiBWRVJTSU9OLFxuICAgIGdldEFsbDogZ2V0QWxsLFxuICAgIHJlbW92ZUFsbDogcmVtb3ZlQWxsLFxuICAgIGFkZDogYWRkLFxuICAgIHJlbW92ZTogcmVtb3ZlLFxuICAgIHVwZGF0ZTogdXBkYXRlLFxufTtcblxuZXhwb3J0cy5FYXNpbmcgPSBFYXNpbmc7XG5leHBvcnRzLkdyb3VwID0gR3JvdXA7XG5leHBvcnRzLkludGVycG9sYXRpb24gPSBJbnRlcnBvbGF0aW9uO1xuZXhwb3J0cy5TZXF1ZW5jZSA9IFNlcXVlbmNlO1xuZXhwb3J0cy5Ud2VlbiA9IFR3ZWVuO1xuZXhwb3J0cy5WRVJTSU9OID0gVkVSU0lPTjtcbmV4cG9ydHMuYWRkID0gYWRkO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cyQxO1xuZXhwb3J0cy5nZXRBbGwgPSBnZXRBbGw7XG5leHBvcnRzLm5leHRJZCA9IG5leHRJZDtcbmV4cG9ydHMubm93ID0gbm93O1xuZXhwb3J0cy5yZW1vdmUgPSByZW1vdmU7XG5leHBvcnRzLnJlbW92ZUFsbCA9IHJlbW92ZUFsbDtcbmV4cG9ydHMudXBkYXRlID0gdXBkYXRlO1xuIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3QgTWF0aENvbmZpZyA9IHJlcXVpcmUgKCcuL21hdGgtY29uZmlnLmpzb24nKTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIGZpbmRTeW1ib2xXaW4gKHN5bWJvbCwgc2xvdGZhY2UpIHtcclxuICAgIGNvbnN0IGFsbFVzZWQgPSBbXTtcclxuICAgIGxldCBhbGxXYXlzID0gMDtcclxuICAgIGxldCBtYXhMZW5ndGggPSAwO1xyXG4gICAgbGV0IGNhbldpbkxvbmdlciA9IHRydWU7XHJcblxyXG4gICAgc2xvdGZhY2UuZm9yRWFjaCAoKGNvbHVtbmZhY2UsIHgpID0+IHtcclxuICAgICAgICBsZXQgd2F5cyA9IDA7XHJcbiAgICAgICAgbGV0IHVzZWQgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGNhbldpbkxvbmdlcikge1xyXG4gICAgICAgICAgICAvLyBjaGVjayBmb3IgbW9yZSB3aW5zIG9uIHRoZSBjb2x1bW5cclxuICAgICAgICAgICAgY29sdW1uZmFjZS5mb3JFYWNoICgoc3ltYm9sSWQpID0+IHtcclxuICAgICAgICAgICAgICAgIHVzZWQucHVzaCAoc3ltYm9sSWQgPT09IHN5bWJvbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ltYm9sSWQgPT09IHN5bWJvbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICsrd2F5cztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAod2F5cyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gd2luIGJyb2tlbiBvbiB0aGlzIGNvbHVtblxyXG4gICAgICAgICAgICAgICAgbWF4TGVuZ3RoID0geDtcclxuICAgICAgICAgICAgICAgIGNhbldpbkxvbmdlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gd2luIGZvdW5kIG9uIHRoaXMgY29sdW1uXHJcbiAgICAgICAgICAgICAgICBpZiAobWF4TGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsV2F5cyA9IHdheXM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFdheXMgKj0gd2F5cztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICsrbWF4TGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbm8gY2hlY2tzIG5lZWRlZCAtIHdpbiBjb25kaXRpb25zIGFscmVhZHkgYnJva2VuIGJ5IHByZXZpb3VzIGNvbHVtblxyXG4gICAgICAgICAgICB1c2VkID0gQXJyYXkgKGNvbHVtbmZhY2UubGVuZ3RoKS5maWxsIChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFsbFVzZWQucHVzaCAodXNlZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN5bWJvbElkOiAgICAgICBzeW1ib2wsXHJcbiAgICAgICAgd2F5czogICAgICAgICAgIGFsbFdheXMsXHJcbiAgICAgICAgc3ltYm9sc1VzZWQ6ICAgIGFsbFVzZWQsXHJcbiAgICAgICAgbGVuZ3RoOiAgICAgICAgIG1heExlbmd0aCxcclxuICAgICAgICBncm9zc1dpblBlcldheTogMCxcclxuICAgICAgICBncm9zc1dpbjogICAgICAgMFxyXG4gICAgfTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gRXZhbHVhdGVXaW5zQW55V2F5c0xlZnRUb1JpZ2h0IChiZXQsIHNsb3RmYWNlKSB7XHJcbiAgICBjb25zdCB3aW5zID0gW107XHJcblxyXG4gICAgZm9yIChsZXQga2V5IGluIE1hdGhDb25maWcuc3ltYm9scykge1xuICAgICAgICAvLyBzd2VlcCBsZWZ0IHRvIHJpZ2h0LCBvbmNlIGZvciBlYWNoIHN5bWJvbCB0aGF0IGhhcyBcImFueVdheXNcIiB3aW5zIHNldCBpbiB0aGUgY29uZmlnXHJcbiAgICAgICAgaWYgKE1hdGhDb25maWcuc3ltYm9scyBba2V5XS5hbnlXYXlzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN5bWJvbElkID0gcGFyc2VJbnQgKGtleSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbiA9IGZpbmRTeW1ib2xXaW4gKHN5bWJvbElkLCBzbG90ZmFjZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAod2luLndheXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXl0YWJsZSA9IE1hdGhDb25maWcucGF5dGFibGUgW2tleV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3aW5QZXJMaW5lID0gcGF5dGFibGUgW3dpbi5sZW5ndGggLSAxXTsgLy8gbm8gZW50cnkgaW4gcGF5dGFibGUgZm9yIHplcm8gbWF0Y2hpbmcgc3ltYm9sc1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aW5QZXJMaW5lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbi5ncm9zc1dpblBlcldheSA9IHdpblBlckxpbmUgKiBiZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luLmdyb3NzV2luID0gd2luUGVyTGluZSAqIHdpbi53YXlzICogYmV0O1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbnMucHVzaCAod2luKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gd2lucztcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubW9kdWxlLmV4cG9ydHMgPSBFdmFsdWF0ZVdpbnNBbnlXYXlzTGVmdFRvUmlnaHQ7XHJcbiIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmNvbnN0IE1hdGhDb25maWcgPSByZXF1aXJlICgnLi9tYXRoLWNvbmZpZy5qc29uJyk7XHJcblxyXG5jb25zdCBFdmFsdWF0ZSA9IHJlcXVpcmUgKCcuL2V2YWx1YXRlLXdpbnMtYW55LXdheXMtbGVmdC10by1yaWdodC5qcycpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gRmFrZUJhY2tlbmQgKCkge1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGNvbnN0IHAgPSB7XHJcbiAgICAgICAgYmFsYW5jZTogMTAwMDAsXHJcbiAgICAgICAgdzogICAgICAgTWF0aENvbmZpZy5yZWVscy53LFxyXG4gICAgICAgIGg6ICAgICAgIE1hdGhDb25maWcucmVlbHMuaCxcclxuICAgICAgICB3YXlzOiAgICBNYXRoLnBvdyAoTWF0aENvbmZpZy5yZWVscy5oLCBNYXRoQ29uZmlnLnJlZWxzLncpLFxyXG4gICAgICAgIHJvdW5kSWQ6IE1hdGguZmxvb3IgKE1hdGgucmFuZG9tICgpICogMTAwMDAwMDAwKSArIDEwMDAwMDAwMFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgc2ltdWxhdGVTZXJ2ZXJEZWxheTogMzAwXHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLnJlcXVlc3RPcGVuR2FtZSA9IChvblJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgIGJhbGFuY2U6ICAgIHAuYmFsYW5jZSxcclxuICAgICAgICAgICAgaW5pdGlhbEJldDogMTAwLFxyXG4gICAgICAgICAgICBiZXRzOiAgICAgICBbMTAwXSxcclxuXHJcbiAgICAgICAgICAgIHBheXRhYmxlOiBNYXRoQ29uZmlnLnBheXRhYmxlLFxyXG4gICAgICAgICAgICByZWVsczogICAgTWF0aENvbmZpZy5yZWVscyxcclxuICAgICAgICAgICAgc3ltYm9sczogIE1hdGhDb25maWcuc3ltYm9scyxcclxuICAgICAgICAgICAgd2F5czogICAgIHAud2F5c1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQgKCgpID0+IG9uUmVzcG9uc2UgKHJlc3BvbnNlKSwgY29uZmlnLnNpbXVsYXRlU2VydmVyRGVsYXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gaW5pdFJvdW5kIChiZXQpIHtcclxuICAgICAgICBwLmJhbGFuY2UgLT0gYmV0O1xyXG4gICAgICAgIHAucm91bmRJZCArPSBNYXRoLmZsb29yIChNYXRoLnJhbmRvbSAoKSAqIDEwMDAwKTtcclxuXHJcbiAgICAgICAgaWYgKHAuYmFsYW5jZSA8IDApIHtcclxuICAgICAgICAgICAgcC5iYWxhbmNlID0gMTAwMDAgLSBiZXQ7IC8vIGN5Y2xlIG5vdyB0byBhdm9pZCBlcnJvcnMuIFN0YW5kYXJkIGRlbW8gYmVoYXZpb3VyXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwb3N0U3BpbkJhbGFuY2U6IHAuYmFsYW5jZSxcclxuICAgICAgICAgICAgZmluYWxCYWxhbmNlOiAgICBwLmJhbGFuY2UsXHJcbiAgICAgICAgICAgIGJldDogICAgICAgICAgICAgYmV0LFxyXG4gICAgICAgICAgICByb3VuZElkOiAgICAgICAgIHAucm91bmRJZCxcclxuICAgICAgICAgICAgZ3Jvc3NXaW46ICAgICAgICAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gcmFuZG9taXNlUmVlbHMgKCkge1xyXG4gICAgICAgIGNvbnN0IHJlZWxzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwLnc7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb2wgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwLmg7ICsraikge1xyXG4gICAgICAgICAgICAgICAgY29sLnB1c2ggKE1hdGguZmxvb3IgKE1hdGgucmFuZG9tICgpICogNCkgKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjaGFuY2UgdG8gYWRkIGEgYm9udXMgc3ltYm9scyBvbiByZWVscyAwLCAyLCA0XHJcbiAgICAgICAgICAgIGlmIChpICUgMiA9PT0gMCAmJiBNYXRoLnJhbmRvbSAoKSA8PSBNYXRoQ29uZmlnLnJ1bGVzLmNoYW5jZVBlckNvbHVtblBlckJvbnVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb2wgW01hdGguZmxvb3IgKE1hdGgucmFuZG9tICgpICogMyldID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWVscy5wdXNoIChjb2wpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVlbHM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRlV2lucyAocm91bmQsIHJlZWxzKSB7XHJcbiAgICAgICAgY29uc3Qgd2lucyA9IEV2YWx1YXRlIChyb3VuZC5iZXQsIHJlZWxzKTtcclxuICAgICAgICByZXR1cm4gd2lucztcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5yZXF1ZXN0U3BpbiA9IChiZXQsIG9uUmVzcG9uc2UpID0+IHtcclxuICAgICAgICBjb25zdCByb3VuZCA9IGluaXRSb3VuZCAoYmV0KTtcclxuICAgICAgICBjb25zdCByZWVscyA9IHJhbmRvbWlzZVJlZWxzICgpO1xyXG4gICAgICAgIGNvbnN0IHdpbnMgPSBldmFsdWF0ZVdpbnMgKHJvdW5kLCByZWVscyk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgIHJvdW5kLFxyXG4gICAgICAgICAgICByZWVscyxcclxuICAgICAgICAgICAgd2luc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHNvcnQgd2lucyBhbmQgYWRkIHRoZW1cclxuICAgICAgICB3aW5zLnNvcnQgKChhLCBiKSA9PiB7cmV0dXJuIGIgLSBhO30pO1xyXG4gICAgICAgIHJvdW5kLmdyb3NzV2luID0gd2lucy5yZWR1Y2UgKCh0b3RhbCwgd2luKSA9PiB7cmV0dXJuIHRvdGFsICsgd2luLmdyb3NzV2luO30sIDApO1xyXG5cclxuICAgICAgICByZXNwb25zZS5yb3VuZC5maW5hbEJhbGFuY2UgPSBwLmJhbGFuY2UgKz0gcm91bmQuZ3Jvc3NXaW47XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQgKCgpID0+IG9uUmVzcG9uc2UgKHJlc3BvbnNlKSwgY29uZmlnLnNpbXVsYXRlU2VydmVyRGVsYXkpO1xyXG4gICAgfTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubW9kdWxlLmV4cG9ydHMgPSBGYWtlQmFja2VuZDtcclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgXCJyZWVsc1wiOiB7XHJcbiAgICAgICAgXCJ3XCI6IDUsXHJcbiAgICAgICAgXCJoXCI6IDMsXHJcbiAgICAgICAgXCJzbG90ZmFjZVwiOiBbWzEsIDIsIDNdLCBbNCwgNSwgNl0sIFsxLCAyLCAzXSwgWzQsIDUsIDZdLCBbMSwgMiwgM11dXHJcbiAgICB9LFxyXG5cclxuICAgIFwicnVsZXNcIjoge1xyXG4gICAgICAgIFwiY2hhbmNlUGVyQ29sdW1uUGVyQm9udXNcIjogMC4yXHJcbiAgICB9LFxyXG5cclxuICAgIFwic3ltYm9sc1wiOiB7XHJcbiAgICAgICAgXCIwXCI6IHtcImlzQm9udXNcIjogdHJ1ZX0sXHJcbiAgICAgICAgXCIxXCI6IHtcImFueVdheXNcIjogdHJ1ZX0sXHJcbiAgICAgICAgXCIyXCI6IHtcImFueVdheXNcIjogdHJ1ZX0sXHJcbiAgICAgICAgXCIzXCI6IHtcImFueVdheXNcIjogdHJ1ZX0sXHJcbiAgICAgICAgXCI0XCI6IHtcImFueVdheXNcIjogdHJ1ZX0sXHJcbiAgICAgICAgXCI1XCI6IHtcImFueVdheXNcIjogdHJ1ZX0sXHJcbiAgICAgICAgXCI2XCI6IHtcImFueVdheXNcIjogdHJ1ZX1cclxuICAgIH0sXHJcblxyXG4gICAgXCJwYXl0YWJsZVwiOiB7XHJcbiAgICAgICAgXCIwXCI6IFtdLFxyXG4gICAgICAgIFwiMVwiOiBbMCwgMCwgMTAsIDIwLCA0MF0sXHJcbiAgICAgICAgXCIyXCI6IFswLCAwLCA1LCAxMCwgMjBdLFxyXG4gICAgICAgIFwiM1wiOiBbMCwgMCwgNCwgOCwgMTZdLFxyXG4gICAgICAgIFwiNFwiOiBbMCwgMCwgMywgNiwgMTJdLFxyXG4gICAgICAgIFwiNVwiOiBbMCwgMCwgMiwgNCwgOF0sXHJcbiAgICAgICAgXCI2XCI6IFswLCAwLCAxLCAyLCA0XVxyXG4gICAgfVxyXG59IiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3QgQmFsYW5jZUJhciA9IHJlcXVpcmUgKCcuL2NvbXBvbmVudHMvYmFsYW5jZS1iYXItY29tcG9uZW50LmpzJyk7XHJcbmNvbnN0IEdhbWVVaSA9IHJlcXVpcmUgKCcuL2NvbXBvbmVudHMvZ2FtZS11aS1jb21wb25lbnQuanMnKTtcclxuY29uc3QgTGF5b3V0ID0gcmVxdWlyZSAoJy4vY29tcG9uZW50cy9sYXlvdXQtY29tcG9uZW50LmpzJyk7XHJcbmNvbnN0IExlZ2FsSW5mbyA9IHJlcXVpcmUgKCcuL2NvbXBvbmVudHMvbGVnYWwtaW5mby1jb21wb25lbnQuanMnKTtcclxuY29uc3QgUmVlbHMgPSByZXF1aXJlICgnLi9jb21wb25lbnRzL3JlZWxzLWNvbXBvbmVudC5qcycpO1xyXG5jb25zdCBXaW5TY29yaW5nID0gcmVxdWlyZSAoJy4vY29tcG9uZW50cy93aW4tc2NvcmluZy1jb21wb25lbnQuanMnKTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIENvbXBvbmVudHMgKG1vZHVsZXMpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLmJhbGFuY2VCYXIgPSBudWxsO1xyXG4gICAgdGhpcy5nYW1lVWkgPSBudWxsO1xyXG4gICAgdGhpcy5sYXlvdXQgPSBudWxsO1xyXG4gICAgdGhpcy5sZWdhbEluZm8gPSBudWxsO1xyXG4gICAgdGhpcy5yZWVscyA9IG51bGw7XHJcbiAgICB0aGlzLndpblNjb3JpbmcgPSBudWxsO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLnBvc3RMb2FkSW5pdCA9ICgpID0+IHtcclxuICAgICAgICAvLyBtdXN0IGJlIGluc3RhbnRpYXRlZCBmaXJzdCBzbyB2aXN1YWwgY29tcG9uZW50cyBjYW4gdXNlIHRoZSBsYXlvdXRcclxuICAgICAgICBzZWxmLmxheW91dCA9IG5ldyBMYXlvdXQgKG1vZHVsZXMpO1xyXG5cclxuICAgICAgICBzZWxmLmJhbGFuY2VCYXIgPSBuZXcgQmFsYW5jZUJhciAobW9kdWxlcyk7XHJcbiAgICAgICAgc2VsZi5nYW1lVWkgPSBuZXcgR2FtZVVpIChtb2R1bGVzKTtcclxuICAgICAgICBzZWxmLmxlZ2FsSW5mbyA9IG5ldyBMZWdhbEluZm8gKG1vZHVsZXMpO1xyXG4gICAgICAgIHNlbGYucmVlbHMgPSBuZXcgUmVlbHMgKG1vZHVsZXMpO1xyXG4gICAgICAgIHNlbGYud2luU2NvcmluZyA9IG5ldyBXaW5TY29yaW5nIChtb2R1bGVzKTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50cztcclxuIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gQmFsYW5jZUJhckNvbXBvbmVudCAobW9kdWxlcykge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgcCA9IHtcclxuICAgICAgICBiYWxhbmNlOiBudWxsLFxyXG4gICAgICAgIHdpbjogICAgIG51bGwsXHJcbiAgICAgICAgYmV0OiAgICAgbnVsbCxcclxuXHJcbiAgICAgICAgc3RyaW5nczoge1xyXG4gICAgICAgICAgICBiYWxhbmNlOiAnQmFsYW5jZTogJyxcclxuICAgICAgICAgICAgd2luOiAgICAgJ1dpbjogJyxcclxuICAgICAgICAgICAgYmV0OiAgICAgJ0JldDogJ1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudXBkYXRlQmFsYW5jZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHAuYmFsYW5jZS50ZXh0ID0gcC5zdHJpbmdzLmJhbGFuY2UgKyB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudXBkYXRlV2luID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcC53aW4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHAud2luLnRleHQgPSBwLnN0cmluZ3Mud2luICsgdmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcC53aW4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudXBkYXRlQmV0ID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgcC5iZXQudGV4dCA9IHAuc3RyaW5ncy5iZXQgKyB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdCAoKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdBcmlhbCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAgIDIwLFxyXG4gICAgICAgICAgICBmaWxsOiAgICAgICAweGZmZmZmZlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcC5iYWxhbmNlID0gbmV3IFBJWEkuVGV4dCAoJycsIHN0eWxlKTtcclxuICAgICAgICBwLndpbiA9IG5ldyBQSVhJLlRleHQgKCcnLCBzdHlsZSk7XHJcbiAgICAgICAgcC5iZXQgPSBuZXcgUElYSS5UZXh0ICgnJywgc3R5bGUpO1xyXG5cclxuICAgICAgICBwLmJhbGFuY2UucG9zaXRpb24uc2V0ICgxMCwgNDkwKTtcclxuICAgICAgICBwLmJhbGFuY2UuYW5jaG9yLnNldCAoMCwgMS4wKTtcclxuXHJcbiAgICAgICAgcC53aW4ucG9zaXRpb24uc2V0ICgzMDAsIDQ5MCk7XHJcbiAgICAgICAgcC53aW4uYW5jaG9yLnNldCAoMC41LCAxLjApO1xyXG5cclxuICAgICAgICBwLmJldC5wb3NpdGlvbi5zZXQgKDU5MCwgNDkwKTtcclxuICAgICAgICBwLmJldC5hbmNob3Iuc2V0ICgxLjAsIDEuMCk7XHJcblxyXG4gICAgICAgIG1vZHVsZXMuY29tcG9uZW50cy5sYXlvdXQudWkuYWRkQ2hpbGQgKHAuYmFsYW5jZSwgcC53aW4sIHAuYmV0KTtcclxuXHJcbiAgICAgICAgc2VsZi51cGRhdGVCYWxhbmNlIChtb2R1bGVzLnNlc3Npb24uYmFsYW5jZSk7XHJcbiAgICAgICAgc2VsZi51cGRhdGVXaW4gKCk7XHJcbiAgICAgICAgc2VsZi51cGRhdGVCZXQgKG1vZHVsZXMuc2Vzc2lvbi5iZXQpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0ICgpO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5tb2R1bGUuZXhwb3J0cyA9IEJhbGFuY2VCYXJDb21wb25lbnQ7XHJcbiIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIEdhbWVVaUNvbXBvbmVudCAobW9kdWxlcykge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGNvbnN0IHAgPSB7XHJcbiAgICAgICAgc3BpbjogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5lbmFibGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcC5zcGluLmludGVyYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBwLnNwaW4udmlzaWJsZSA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLmRpc2FibGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcC5zcGluLmludGVyYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgcC5zcGluLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGZ1bmN0aW9uIG9uU3BpbkNsaWNrZWQgKCkge1xyXG4gICAgICAgIG1vZHVsZXMuZXZlbnRzLnB1c2ggKHtpZDogJ1NQSU5fQ0xJQ0tFRCd9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gY29uc3RydWN0ICgpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdBcmlhbCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAgIDMwLFxyXG4gICAgICAgICAgICBmaWxsOiAgICAgICAweDAwMDAwMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IG5ldyBQSVhJLlRleHQgKCdTUElOJywgc3R5bGUpO1xyXG4gICAgICAgIHRleHQuYW5jaG9yLnNldCAoMC41LCAwLjUpO1xyXG5cclxuICAgICAgICBjb25zdCBzcGluID0gbmV3IFBJWEkuR3JhcGhpY3MgKCk7XHJcbiAgICAgICAgc3Bpbi5iZWdpbkZpbGwgKDB4YTBmMGEwLCAxKTtcclxuICAgICAgICBzcGluLmRyYXdDaXJjbGUgKDAsIDAsIDQ0KTtcclxuICAgICAgICBzcGluLmVuZEZpbGwgKCk7XHJcblxyXG4gICAgICAgIHNwaW4ucG9zaXRpb24uc2V0ICgzMDAsIDQxMCk7XHJcbiAgICAgICAgc3Bpbi5vbiAoJ3BvaW50ZXJ0YXAnLCBvblNwaW5DbGlja2VkKTtcclxuICAgICAgICBzcGluLmFkZENoaWxkICh0ZXh0KTtcclxuICAgICAgICBtb2R1bGVzLmNvbXBvbmVudHMubGF5b3V0LnVpLmFkZENoaWxkIChzcGluKTtcclxuXHJcbiAgICAgICAgcC5zcGluID0gc3BpbjtcclxuXHJcbiAgICAgICAgc2VsZi5kaXNhYmxlICgpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0ICgpO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVVaUNvbXBvbmVudDtcclxuIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gTGF5b3V0Q29tcG9uZW50IChtb2R1bGVzKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLnVpID0gbmV3IFBJWEkuQ29udGFpbmVyICgpO1xyXG4gICAgdGhpcy5nYW1lID0gbmV3IFBJWEkuQ29udGFpbmVyICgpO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjb25zdCBwID0ge1xyXG4gICAgICAgIHBhcmVudDogbmV3IFBJWEkuQ29udGFpbmVyICgpXHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgY29udGVudFc6IDYwMCxcclxuICAgICAgICBjb250ZW50SDogNTAwXHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBzZWxmLnJlc2l6ZSA9ICh3LCBoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2NhbGVYID0gdyAvIGNvbmZpZy5jb250ZW50VztcclxuICAgICAgICBjb25zdCBzY2FsZVkgPSBoIC8gY29uZmlnLmNvbnRlbnRIO1xyXG4gICAgICAgIGNvbnN0IHNjYWxlID0gKHNjYWxlWCA8IHNjYWxlWSkgPyBzY2FsZVggOiBzY2FsZVk7XHJcblxyXG4gICAgICAgIHAucGFyZW50LnNjYWxlLnNldCAoc2NhbGUpO1xyXG4gICAgICAgIHAucGFyZW50LnBvc2l0aW9uLnNldCAoKHcgLSBjb25maWcuY29udGVudFcgKiBzY2FsZSkgKiAwLjUsIChoIC0gY29uZmlnLmNvbnRlbnRIICogc2NhbGUpICogMC41KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdCAoKSB7XHJcbiAgICAgICAgbW9kdWxlcy5waXhpLnN0YWdlLmFkZENoaWxkIChwLnBhcmVudCk7XHJcbiAgICAgICAgcC5wYXJlbnQuYWRkQ2hpbGQgKHNlbGYuZ2FtZSk7XHJcbiAgICAgICAgcC5wYXJlbnQuYWRkQ2hpbGQgKHNlbGYudWkpO1xyXG5cclxuICAgICAgICBzZWxmLnJlc2l6ZSAobW9kdWxlcy5yZXNpemVyLncsIG1vZHVsZXMucmVzaXplci5oKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdCAoKTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXRDb21wb25lbnQ7XHJcbiIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIExlZ2FsSW5mb0NvbXBvbmVudCAobW9kdWxlcykge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgcCA9IHtcclxuICAgICAgICByb3VuZElkOiBudWxsLFxyXG4gICAgICAgIHN0cmluZ3M6IHtcclxuICAgICAgICAgICAgcm91bmRJZDogJ1JvdW5kIElkOiAnXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy51cGRhdGVSb3VuZElkID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgcC5yb3VuZElkLnRleHQgPSBwLnN0cmluZ3Mucm91bmRJZCArIHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gY29uc3RydWN0ICgpIHtcclxuICAgICAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogJ0FyaWFsJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICAgMTQsXHJcbiAgICAgICAgICAgIGZpbGw6ICAgICAgIDB4ZmZmZmZmXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwLnJvdW5kSWQgPSBuZXcgUElYSS5UZXh0ICgnJywgc3R5bGUpO1xyXG4gICAgICAgIHAucm91bmRJZC5wb3NpdGlvbi5zZXQgKDEwLCAxMCk7XHJcbiAgICAgICAgbW9kdWxlcy5jb21wb25lbnRzLmxheW91dC51aS5hZGRDaGlsZCAocC5yb3VuZElkKTtcclxuXHJcbiAgICAgICAgc2VsZi51cGRhdGVSb3VuZElkICgnJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3QgKCk7XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gTGVnYWxJbmZvQ29tcG9uZW50O1xyXG4iLCIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5jb25zdCBUd2VlbiA9IHJlcXVpcmUgKCdAdHdlZW5qcy90d2Vlbi5qcycpO1xyXG5cclxuY29uc3QgR2FtZUNvbmZpZyA9IHJlcXVpcmUgKCcuLi9nYW1lLWNvbmZpZy5qc29uJyk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBSZWVsQ29sdW1uQ29tcG9uZW50IChtb2R1bGVzLCBjb2xJZHgsIGNvbHVtbmZhY2UsIHBhcmVudCkge1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGNvbnN0IHAgPSB7XHJcbiAgICAgICAgY29udGFpbmVyOiBuZXcgUElYSS5Db250YWluZXIgKCksXHJcbiAgICAgICAgc3ltYm9sczogICBbXSxcclxuICAgICAgICBzeW1ib2xJZHM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICBzeW1ib2xIOiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgZHJvcER1cmF0aW9uOiAgICAgICAzMDAsXHJcbiAgICAgICAgZHJvcEhlaWdodDogICAgICAgICA1MDAsXHJcbiAgICAgICAgZHJvcFN5bWJvbEludGVydmFsOiA1MFxyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gZ2V0U3ltYm9sVGV4IChzeW1ib2xJZCwgaXNIaWdobGlnaHQpIHtcclxuICAgICAgICBjb25zdCB0ZXhJZCA9IEdhbWVDb25maWcuc3ltYm9scyBbc3ltYm9sSWQudG9TdHJpbmcgKCldLnJlc291cmNlUHJlZml4ICsgKChpc0hpZ2hsaWdodCkgPyAnRmxhc2gnIDogJycpO1xyXG4gICAgICAgIHJldHVybiBtb2R1bGVzLnJlc291cmNlcy5nZXRUZXh0dXJlICh0ZXhJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMuYmVnaW5TcGluID0gKGRlbGF5LCBvbkNvbXBsZXRlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFzdElkeCA9IHAuc3ltYm9scy5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICBwLnN5bWJvbHMuZm9yRWFjaCAoKHN5bWJvbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR3ZWVuID0gbmV3IFR3ZWVuLlR3ZWVuIChzeW1ib2wpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRvICh7eTogY29uZmlnLmRyb3BIZWlnaHQgKyBjb25maWcuc3ltYm9sSCAqIGlkeCwgYWxwaGE6IDB9LCBjb25maWcuZHJvcER1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lYXNpbmcgKFR3ZWVuLkVhc2luZy5DdWJpYy5JbilcclxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkgKGRlbGF5ICsgY29uZmlnLmRyb3BTeW1ib2xJbnRlcnZhbCAqIChsYXN0SWR4IC0gaWR4KSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQgKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob25Db21wbGV0ZSAmJiBpZHggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHR3ZWVuLm9uQ29tcGxldGUgKG9uQ29tcGxldGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLmVuZFNwaW4gPSAoY29sdW1uZmFjZSwgZGVsYXksIG9uQ29tcGxldGUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmFzc2VydCAoY29sdW1uZmFjZS5sZW5ndGggPT09IHAuc3ltYm9scy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBjb25zdCBsYXN0SWR4ID0gcC5zeW1ib2xzLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgICAgIHAuc3ltYm9scy5mb3JFYWNoICgoc3ltYm9sLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgc3ltYm9sLnkgPSAtY29uZmlnLmRyb3BIZWlnaHQgKyBjb25maWcuc3ltYm9sSCAqIGlkeDtcclxuICAgICAgICAgICAgc3ltYm9sLmFscGhhID0gMDtcclxuICAgICAgICAgICAgc3ltYm9sLnRleHR1cmUgPSBnZXRTeW1ib2xUZXggKGNvbHVtbmZhY2UgW2lkeF0sIGZhbHNlKTtcclxuICAgICAgICAgICAgcC5zeW1ib2xJZHMgW2lkeF0gPSBjb2x1bW5mYWNlIFtpZHhdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdHdlZW4gPSBuZXcgVHdlZW4uVHdlZW4gKHN5bWJvbClcclxuICAgICAgICAgICAgICAgICAgICAudG8gKHt5OiBjb25maWcuc3ltYm9sSCAqIGlkeCwgYWxwaGE6IDF9LCBjb25maWcuZHJvcER1cmF0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lYXNpbmcgKFR3ZWVuLkVhc2luZy5DdWJpYy5JbilcclxuICAgICAgICAgICAgICAgICAgICAuZGVsYXkgKGRlbGF5ICsgY29uZmlnLmRyb3BTeW1ib2xJbnRlcnZhbCAqIChsYXN0SWR4IC0gaWR4KSlcclxuICAgICAgICAgICAgICAgICAgICAuc3RhcnQgKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob25Db21wbGV0ZSAmJiBpZHggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHR3ZWVuLm9uQ29tcGxldGUgKG9uQ29tcGxldGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLmZsYXNoU3ltYm9scyA9IChzeW1ib2xzVXNlZCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0IChzeW1ib2xzVXNlZC5sZW5ndGggPT09IHAuc3ltYm9scy5sZW5ndGgpO1xyXG5cclxuICAgICAgICBwLnN5bWJvbHMuZm9yRWFjaCAoKHN5bWJvbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzeW1ib2xzVXNlZCBbaWR4XSkge1xyXG4gICAgICAgICAgICAgICAgc3ltYm9sLnRleHR1cmUgPSBnZXRTeW1ib2xUZXggKHAuc3ltYm9sSWRzIFtpZHhdLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHN5bWJvbC5hbHBoYSA9IDAuNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5yZXNldCA9ICgpID0+IHtcclxuICAgICAgICBwLnN5bWJvbHMuZm9yRWFjaCAoKHN5bWJvbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIHN5bWJvbC50ZXh0dXJlID0gZ2V0U3ltYm9sVGV4IChwLnN5bWJvbElkcyBbaWR4XSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvLyBzeW1ib2wuYWxwaGEgPSAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gY29uc3RydWN0ICgpIHtcclxuICAgICAgICBjb25zdCByZWZUZXggPSBnZXRTeW1ib2xUZXggKDAsIGZhbHNlKTtcclxuICAgICAgICBjb25maWcuc3ltYm9sSCA9IHJlZlRleC5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHAuY29udGFpbmVyLnggPSByZWZUZXgud2lkdGggKiBjb2xJZHg7XHJcbiAgICAgICAgcGFyZW50LmFkZENoaWxkIChwLmNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIGNvbHVtbmZhY2UuZm9yRWFjaCAoKHN5bWJvbElkLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3ltYm9sID0gbmV3IFBJWEkuU3ByaXRlIChnZXRTeW1ib2xUZXggKHN5bWJvbElkLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICBzeW1ib2wueSA9IGlkeCAqIGNvbmZpZy5zeW1ib2xIO1xyXG4gICAgICAgICAgICBwLmNvbnRhaW5lci5hZGRDaGlsZCAoc3ltYm9sKTtcclxuICAgICAgICAgICAgcC5zeW1ib2xzLnB1c2ggKHN5bWJvbCk7XHJcbiAgICAgICAgICAgIHAuc3ltYm9sSWRzLnB1c2ggKHN5bWJvbElkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdCAoKTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubW9kdWxlLmV4cG9ydHMgPSBSZWVsQ29sdW1uQ29tcG9uZW50O1xyXG4iLCIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5jb25zdCBSZWVsQ29sdW1uID0gcmVxdWlyZSAoJy4vcmVlbC1jb2x1bW4tY29tcG9uZW50LmpzJyk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBSZWVsc0NvbXBvbmVudCAobW9kdWxlcykge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGNvbnN0IHAgPSB7XHJcbiAgICAgICAgY29udGFpbmVyOiBuZXcgUElYSS5Db250YWluZXIgKCksXHJcbiAgICAgICAgY29sczogICAgICBbXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgYXBwZWFyRGVsYXlQZXJDb2w6IDEwMCxcclxuXHJcbiAgICAgICAgd2luczogICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICB3aW5GbGFzaER1cmF0aW9uOiAzMDAsXHJcbiAgICAgICAgd2luRmxhc2hlc1BlcldpbjogMyxcclxuICAgICAgICB3aW5JZHg6ICAgICAgICAgICAwLFxyXG4gICAgICAgIHdpbkZsYXNoSWR4OiAgICAgIDAsXHJcbiAgICAgICAgd2luSW50ZXJ2YWw6ICAgICAgbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5iZWdpblNwaW4gPSAob25Db21wbGV0ZSkgPT4ge1xyXG4gICAgICAgIHAuY29scy5mb3JFYWNoICgoY29sLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2IgPSAoaWR4ID09PSBwLmNvbHMubGVuZ3RoIC0gMSkgPyBvbkNvbXBsZXRlIDogbnVsbDtcclxuICAgICAgICAgICAgY29sLmJlZ2luU3BpbiAoaWR4ICogY29uZmlnLmFwcGVhckRlbGF5UGVyQ29sLCBjYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLmVuZFNwaW4gPSAoc2xvdGZhY2UsIG9uQ29tcGxldGUpID0+IHtcclxuICAgICAgICBwLmNvbHMuZm9yRWFjaCAoKGNvbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNiID0gKGlkeCA9PT0gcC5jb2xzLmxlbmd0aCAtIDEpID8gb25Db21wbGV0ZSA6IG51bGw7XHJcbiAgICAgICAgICAgIGNvbC5lbmRTcGluIChzbG90ZmFjZSBbaWR4XSwgaWR4ICogY29uZmlnLmFwcGVhckRlbGF5UGVyQ29sLCBjYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLnNuYXBTeW1ib2xzID0gKHNsb3RmYWNlKSA9PiB7XHJcbiAgICAgICAgcC5jb2xzLmZvckVhY2ggKChjb2wsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb2wuc25hU3ltYm9scyAoc2xvdGZhY2UgW2lkeF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5mbGFzaFN5bWJvbHMgPSAoc3ltYm9sc1VzZWQpID0+IHtcclxuICAgICAgICBwLmNvbHMuZm9yRWFjaCAoKGNvbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbC5mbGFzaFN5bWJvbHMgKHN5bWJvbHNVc2VkIFtpZHhdKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudXBkYXRlV2luU2NvcmluZyA9ICh1bnVzZWRfd2luKSA9PiB7XHJcbiAgICAgICAgbW9kdWxlcy5jb21wb25lbnRzLndpblNjb3Jpbmcuc2hvd1dpbiAobW9kdWxlcy5zZXNzaW9uLnNwaW4ucm91bmQuZ3Jvc3NXaW4sIHAud2lucyBbcC53aW5JZHhdKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMub25XaW5JbnRlcnZhbCA9ICgpID0+IHtcclxuICAgICAgICBwLmNvbHMuZm9yRWFjaCAoY29sID0+IGNvbC5yZXNldCAoKSk7XHJcbiAgICAgICAgKytwLndpbkZsYXNoSWR4O1xyXG4gICAgICAgIHAud2luRmxhc2hJZHggPSAocC53aW5GbGFzaElkeCAlIChjb25maWcud2luRmxhc2hlc1BlcldpbiAqIDIpKTtcclxuICAgICAgICBpZiAocC53aW5GbGFzaElkeCA9PT0gMCkge1xyXG4gICAgICAgICAgICArK3Aud2luSWR4O1xyXG4gICAgICAgICAgICBwLndpbklkeCA9IChwLndpbklkeCAlIHAud2lucy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVdpblNjb3JpbmcgKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwLndpbkZsYXNoSWR4ICUgMiA9PT0gMSkge1xyXG4gICAgICAgICAgICBzZWxmLmZsYXNoU3ltYm9scyAocC53aW5zIFtwLndpbklkeF0uc3ltYm9sc1VzZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMuY3ljbGVXaW5zID0gKHdpbnMpID0+IHtcclxuICAgICAgICBjb25zb2xlLmFzc2VydCAoIXAud2luSW50ZXJ2YWwpO1xyXG5cclxuICAgICAgICBwLndpbnMgPSB3aW5zO1xyXG4gICAgICAgIHAud2luSWR4ID0gMDtcclxuICAgICAgICBwLndpbkZsYXNoSWR4ID0gMDtcclxuICAgICAgICBzZWxmLnVwZGF0ZVdpblNjb3JpbmcgKCk7XHJcbiAgICAgICAgc2VsZi5vbldpbkludGVydmFsICgpO1xyXG4gICAgICAgIHAud2luSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCAoc2VsZi5vbldpbkludGVydmFsLmJpbmQgKHNlbGYpLCBjb25maWcuIHdpbkZsYXNoRHVyYXRpb24pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5yZXNldCA9ICgpID0+IHtcclxuICAgICAgICBpZiAocC53aW5JbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsIChwLndpbkludGVydmFsKTtcclxuICAgICAgICAgICAgcC53aW5JbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHAuY29scy5mb3JFYWNoIChjb2wgPT4gY29sLnJlc2V0ICgpKTtcclxuICAgICAgICBtb2R1bGVzLmNvbXBvbmVudHMud2luU2NvcmluZy5oaWRlICgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gY29uc3RydWN0ICgpIHtcclxuICAgICAgICBtb2R1bGVzLmNvbXBvbmVudHMubGF5b3V0LmdhbWUuYWRkQ2hpbGQgKHAuY29udGFpbmVyKTtcclxuICAgICAgICBwLmNvbnRhaW5lci5wb3NpdGlvbi5zZXQgKDUwLCA1MCk7XHJcbiAgICAgICAgcC5jb250YWluZXIuc2NhbGUuc2V0ICgwLjUsIDAuNSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHMgPSBtb2R1bGVzLnNlc3Npb24ub3BlbkdhbWU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLnJlZWxzLnc7ICsraSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydCAocy5yZWVscy5oID09PSBzLnJlZWxzLnNsb3RmYWNlIFtpXS5sZW5ndGgpO1xyXG4gICAgICAgICAgICBwLmNvbHMucHVzaCAobmV3IFJlZWxDb2x1bW4gKG1vZHVsZXMsIGksIHMucmVlbHMuc2xvdGZhY2UgW2ldLCBwLmNvbnRhaW5lcikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdCAoKTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubW9kdWxlLmV4cG9ydHMgPSBSZWVsc0NvbXBvbmVudDtcclxuIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gV2luU2NvcmluZ0NvbXBvbmVudCAobW9kdWxlcykge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgY29uc3QgcCA9IHtcclxuICAgICAgICB3aW5TY29yZTogICBudWxsLFxyXG4gICAgICAgIHRvdGFsU2NvcmU6IG51bGwsXHJcbiAgICAgICAgc3RyaW5nczogICAge1xyXG4gICAgICAgICAgICB3aW5TY29yZTogICAne0NPVU5UfSB3YXlzIHdpdGggc3ltYm9sIHtTWU1CT0x9XFxuRWFjaCB3YXkgd29ydGgge1NJTkdMRX0gZm9yIHtUT1RBTH0nLFxyXG4gICAgICAgICAgICB0b3RhbFNjb3JlOiAnVG90YWwgd2luIHtUT1RBTH0nXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5zaG93V2luID0gKHRvdGFsV2luLCB3aW4pID0+IHtcclxuICAgICAgICBsZXQgdGV4dCA9IHAuc3RyaW5ncy53aW5TY29yZTtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlICgne0NPVU5UfScsIHdpbi53YXlzKTtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlICgne1NZTUJPTH0nLCB3aW4uc3ltYm9sSWQpO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UgKCd7U0lOR0xFfScsIHdpbi5ncm9zc1dpblBlcldheSk7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSAoJ3tUT1RBTH0nLCB3aW4uZ3Jvc3NXaW4pO1xyXG4gICAgICAgIHAud2luU2NvcmUudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgcC53aW5TY29yZS52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGV4dCA9IHAuc3RyaW5ncy50b3RhbFNjb3JlO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UgKCd7VE9UQUx9JywgdG90YWxXaW4pO1xyXG4gICAgICAgIHAudG90YWxTY29yZS50ZXh0ID0gdGV4dDtcclxuICAgICAgICBwLnRvdGFsU2NvcmUudmlzaWJsZSA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLmhpZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcC53aW5TY29yZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgcC50b3RhbFNjb3JlLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGZ1bmN0aW9uIGNvbnN0cnVjdCAoKSB7XHJcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBuZXcgUElYSS5UZXh0U3R5bGUgKHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogICAgICAnQXJpYWwnLFxyXG4gICAgICAgICAgICBmaWxsOiAgICAgICAgICAgICcjZmZjMDgwJyxcclxuICAgICAgICAgICAgc3Ryb2tlOiAgICAgICAgICAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNixcclxuICAgICAgICAgICAgbGluZUpvaW46ICAgICAgICAnYmV2ZWwnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogICAgICAgIDIwLFxyXG4gICAgICAgICAgICBhbGlnbjogICAgICAgICAgICdjZW50ZXInXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHAud2luU2NvcmUgPSBuZXcgUElYSS5UZXh0ICgnJywgc3R5bGUpO1xyXG4gICAgICAgIHAud2luU2NvcmUucm90YXRpb24gPSAwLjM7XHJcbiAgICAgICAgcC53aW5TY29yZS5wb3NpdGlvbi5zZXQgKDQ1MCwgNjApO1xyXG4gICAgICAgIHAud2luU2NvcmUuYW5jaG9yLnNldCAoMC41KTtcclxuICAgICAgICBtb2R1bGVzLmNvbXBvbmVudHMubGF5b3V0LmdhbWUuYWRkQ2hpbGQgKHAud2luU2NvcmUpO1xyXG5cclxuICAgICAgICBjb25zdCBzdHlsZTIgPSBuZXcgUElYSS5UZXh0U3R5bGUgKHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogICAgICAnQXJpYWwnLFxyXG4gICAgICAgICAgICBmaWxsOiAgICAgICAgICAgICcjZmZjMDgwJyxcclxuICAgICAgICAgICAgc3Ryb2tlOiAgICAgICAgICAnIzAwMDAwMCcsXHJcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogMTIsXHJcbiAgICAgICAgICAgIGxpbmVKb2luOiAgICAgICAgJ2JldmVsJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICAgICAgICAzMCxcclxuICAgICAgICAgICAgYWxpZ246ICAgICAgICAgICAnY2VudGVyJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwLnRvdGFsU2NvcmUgPSBuZXcgUElYSS5UZXh0ICgnJywgc3R5bGUyKTtcclxuICAgICAgICBwLnRvdGFsU2NvcmUucm90YXRpb24gPSAwLjM7XHJcbiAgICAgICAgcC50b3RhbFNjb3JlLnBvc2l0aW9uLnNldCAoMTIwLCAzNTApO1xyXG4gICAgICAgIHAudG90YWxTY29yZS5hbmNob3Iuc2V0ICgwLjUpO1xyXG4gICAgICAgIG1vZHVsZXMuY29tcG9uZW50cy5sYXlvdXQuZ2FtZS5hZGRDaGlsZCAocC50b3RhbFNjb3JlKTtcclxuXHJcbiAgICAgICAgc2VsZi5oaWRlICgpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0ICgpO1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5tb2R1bGUuZXhwb3J0cyA9IFdpblNjb3JpbmdDb21wb25lbnQ7XHJcbiIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIEV2ZW50cyAoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLnF1ZXVlID0gW107XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMucHVzaCA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIHNlbGYucXVldWUucHVzaCAoZXZlbnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5oYXNQZW5kaW5nID0gKCkgPT4gc2VsZi5xdWV1ZS5sZW5ndGggPiAwO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLnBvcCA9ICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmFzc2VydCAoc2VsZi5oYXNQZW5kaW5nICgpKTtcclxuICAgICAgICByZXR1cm4gc2VsZi5xdWV1ZS5zaGlmdCAoKTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRzO1xyXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgICBcInN5bWJvbHNcIjoge1xyXG4gICAgICAgIFwiMFwiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbEJvbnVzXCJ9LFxyXG4gICAgICAgIFwiMVwiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbEgxXCJ9LFxyXG4gICAgICAgIFwiMlwiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbEgyXCJ9LFxyXG4gICAgICAgIFwiM1wiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbEgzXCJ9LFxyXG4gICAgICAgIFwiNFwiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbEg0XCJ9LFxyXG4gICAgICAgIFwiNVwiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbEg1XCJ9LFxyXG4gICAgICAgIFwiNlwiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbEg2XCJ9LFxyXG4gICAgICAgIFwiN1wiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbE0xXCJ9LFxyXG4gICAgICAgIFwiOFwiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbE0yXCJ9LFxyXG4gICAgICAgIFwiOVwiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbE0zXCJ9LFxyXG4gICAgICAgIFwiMTBcIjoge1wicmVzb3VyY2VQcmVmaXhcIjogXCJzeW1ib2xNNFwifSxcclxuICAgICAgICBcIjExXCI6IHtcInJlc291cmNlUHJlZml4XCI6IFwic3ltYm9sTTVcIn0sXHJcbiAgICAgICAgXCIxMlwiOiB7XCJyZXNvdXJjZVByZWZpeFwiOiBcInN5bWJvbE02XCJ9LFxyXG4gICAgICAgIFwiMTNcIjoge1wicmVzb3VyY2VQcmVmaXhcIjogXCJzeW1ib2xBXCJ9LFxyXG4gICAgICAgIFwiMTRcIjoge1wicmVzb3VyY2VQcmVmaXhcIjogXCJzeW1ib2xRXCJ9LFxyXG4gICAgICAgIFwiMTVcIjoge1wicmVzb3VyY2VQcmVmaXhcIjogXCJzeW1ib2xLXCJ9LFxyXG4gICAgICAgIFwiMTZcIjoge1wicmVzb3VyY2VQcmVmaXhcIjogXCJzeW1ib2xKXCJ9LFxyXG4gICAgICAgIFwiMTdcIjoge1wicmVzb3VyY2VQcmVmaXhcIjogXCJzeW1ib2wxMFwifSxcclxuICAgICAgICBcIjE4XCI6IHtcInJlc291cmNlUHJlZml4XCI6IFwic3ltYm9sOVwifVxyXG4gICAgfVxyXG59IiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3QgSWRsZSA9IHJlcXVpcmUgKCcuL2dhbWVzdGF0ZXMvaWRsZS1nYW1lc3RhdGUuanMnKTtcclxuY29uc3QgSGFuZHNoYWtlID0gcmVxdWlyZSAoJy4vZ2FtZXN0YXRlcy9oYW5kc2hha2UtZ2FtZXN0YXRlLmpzJyk7XHJcbmNvbnN0IExvYWRpbmcgPSByZXF1aXJlICgnLi9nYW1lc3RhdGVzL2xvYWRpbmctZ2FtZXN0YXRlLmpzJyk7XHJcbmNvbnN0IExvYWRlZCA9IHJlcXVpcmUgKCcuL2dhbWVzdGF0ZXMvbG9hZGVkLWdhbWVzdGF0ZS5qcycpO1xyXG5jb25zdCBTaG93QmFzZVdpbnMgPSByZXF1aXJlICgnLi9nYW1lc3RhdGVzL3Nob3ctYmFzZS13aW5zLWdhbWVzdGF0ZS5qcycpO1xyXG5jb25zdCBTcGluUmVxdWVzdCA9IHJlcXVpcmUgKCcuL2dhbWVzdGF0ZXMvc3Bpbi1yZXF1ZXN0LWdhbWVzdGF0ZS5qcycpO1xyXG5jb25zdCBTcGluUmVzb2x2ZSA9IHJlcXVpcmUgKCcuL2dhbWVzdGF0ZXMvc3Bpbi1yZXNvbHZlLWdhbWVzdGF0ZS5qcycpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gR2FtZXN0YXRlTWFuYWdlciAobW9kdWxlcykge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5zdGF0ZXMgPSB7fTtcclxuICAgIHRoaXMuY3VycmVudFN0YXRlID0gbnVsbDtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gY29uc3RydWN0ICgpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZXMgPSBbXHJcbiAgICAgICAgICAgIG5ldyBJZGxlIChtb2R1bGVzKSxcclxuICAgICAgICAgICAgbmV3IEhhbmRzaGFrZSAobW9kdWxlcyksXHJcbiAgICAgICAgICAgIG5ldyBMb2FkaW5nIChtb2R1bGVzKSxcclxuICAgICAgICAgICAgbmV3IExvYWRlZCAobW9kdWxlcyksXHJcbiAgICAgICAgICAgIG5ldyBTcGluUmVxdWVzdCAobW9kdWxlcyksXHJcbiAgICAgICAgICAgIG5ldyBTcGluUmVzb2x2ZSAobW9kdWxlcyksXHJcbiAgICAgICAgICAgIG5ldyBTaG93QmFzZVdpbnMgKG1vZHVsZXMpXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgc3RhdGVzLmZvckVhY2ggKHN0YXRlID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5hc3NlcnQgKHR5cGVvZiBzdGF0ZS5pZCA9PT0gJ3N0cmluZycpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydCAoIShzdGF0ZS5pZCBpbiBzZWxmLnN0YXRlcykpO1xyXG4gICAgICAgICAgICBzZWxmLnN0YXRlcyBbc3RhdGUuaWRdID0gc3RhdGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3QgKCk7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudGljayA9ICgpID0+IHtcclxuICAgICAgICB3aGlsZSAobW9kdWxlcy5ldmVudHMuaGFzUGVuZGluZyAoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBlID0gbW9kdWxlcy5ldmVudHMucG9wICgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydCAodHlwZW9mIGUuaWQgPT09ICdzdHJpbmcnKTtcclxuICAgICAgICAgICAgY29uc3QgdCA9IHNlbGYuY3VycmVudFN0YXRlLnRyYW5zaXRpb25zO1xyXG4gICAgICAgICAgICBpZiAodCAmJiB0IFtlLmlkXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5hc3NlcnQgKHQgJiYgdCBbZS5pZF0gJiYgdHlwZW9mIHQgW2UuaWRdLm5leHRTdGF0ZSA9PT0gJ3N0cmluZycpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VTdGF0ZSAodCBbZS5pZF0ubmV4dFN0YXRlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybiAoJ3RyYW5zaXRpb24gZXZlbnQgaWdub3JlZCcsIGUuaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZi5jdXJyZW50U3RhdGUgJiYgc2VsZi5jdXJyZW50U3RhdGUub25UaWNrKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFN0YXRlLm9uVGljayAoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLmNoYW5nZVN0YXRlID0gKHN0YXRlTmFtZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0IChzZWxmLnN0YXRlcyBbc3RhdGVOYW1lXSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nICgnY2hhbmdlIHN0YXRlJywgc3RhdGVOYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuY3VycmVudFN0YXRlICYmIHNlbGYuY3VycmVudFN0YXRlLm9uRXhpdCkge1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRTdGF0ZS5vbkV4aXQgKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmN1cnJlbnRTdGF0ZSA9IHNlbGYuc3RhdGVzIFtzdGF0ZU5hbWVdO1xyXG5cclxuICAgICAgICBpZiAoc2VsZi5jdXJyZW50U3RhdGUgJiYgc2VsZi5jdXJyZW50U3RhdGUub25FbnRlcikge1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRTdGF0ZS5vbkVudGVyICgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZXN0YXRlTWFuYWdlcjtcclxuIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gSGFuZHNoYWtlR2FtZXN0YXRlIChtb2R1bGVzKSB7XHJcbiAgICB0aGlzLmlkID0gJ2hhbmRzaGFrZSc7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGZ1bmN0aW9uIG9uUmVxdWVzdFJlc3BvbnNlIChyZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nIChyZXNwb25zZSk7XHJcbiAgICAgICAgbW9kdWxlcy5zZXNzaW9uLnJlY29yZE9wZW5HYW1lIChyZXNwb25zZSk7XHJcbiAgICAgICAgbW9kdWxlcy5ldmVudHMucHVzaCAoe2lkOiAnUkVTUE9OU0VfU1VDQ0VTUyd9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5vbkVudGVyID0gKCkgPT4ge1xyXG4gICAgICAgIG1vZHVsZXMuYmFja2VuZC5yZXF1ZXN0T3BlbkdhbWUgKG9uUmVxdWVzdFJlc3BvbnNlKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudHJhbnNpdGlvbnMgPSB7XHJcbiAgICAgICAgUkVTUE9OU0VfU1VDQ0VTUzoge25leHRTdGF0ZTogJ2xvYWRlZCd9XHJcbiAgICB9O1xyXG59XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRzaGFrZUdhbWVzdGF0ZTtcclxuIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gSWRsZUdhbWVzdGF0ZSAobW9kdWxlcykge1xyXG4gICAgdGhpcy5pZCA9ICdpZGxlJztcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5vbkVudGVyID0gKCkgPT4ge1xyXG4gICAgICAgIG1vZHVsZXMuY29tcG9uZW50cy5nYW1lVWkuZW5hYmxlICgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5vbkV4aXQgPSAoKSA9PiB7XHJcbiAgICAgICAgbW9kdWxlcy5jb21wb25lbnRzLnJlZWxzLnJlc2V0ICgpO1xyXG4gICAgICAgIG1vZHVsZXMuY29tcG9uZW50cy5nYW1lVWkuZGlzYWJsZSAoKTtcclxuICAgICAgICBtb2R1bGVzLmNvbXBvbmVudHMuYmFsYW5jZUJhci51cGRhdGVXaW4gKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLnRyYW5zaXRpb25zID0ge1xyXG4gICAgICAgIFNQSU5fQ0xJQ0tFRDoge25leHRTdGF0ZTogJ3NwaW5SZXF1ZXN0J31cclxuICAgIH07XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gSWRsZUdhbWVzdGF0ZTtcclxuIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gTG9hZGVkR2FtZXN0YXRlIChtb2R1bGVzKSB7XHJcbiAgICB0aGlzLmlkID0gJ2xvYWRlZCc7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMub25FbnRlciA9ICgpID0+IHtcclxuICAgICAgICBtb2R1bGVzLmNvbXBvbmVudHMucG9zdExvYWRJbml0ICgpO1xyXG4gICAgICAgIG1vZHVsZXMuZXZlbnRzLnB1c2ggKHtpZDogJ1NFVFVQX1NVQ0NFU1MnfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLnRyYW5zaXRpb25zID0ge1xyXG4gICAgICAgIFNFVFVQX1NVQ0NFU1M6IHtuZXh0U3RhdGU6ICdpZGxlJ31cclxuICAgIH07XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gTG9hZGVkR2FtZXN0YXRlO1xyXG4iLCIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBMb2FkaW5nR2FtZXN0YXRlIChtb2R1bGVzKSB7XHJcbiAgICB0aGlzLmlkID0gJ2xvYWRpbmcnO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLm9uRW50ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgbW9kdWxlcy5yZXNvdXJjZXMubG9hZFRleHR1cmVzICgndGV4dHVyZXMnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1vZHVsZXMuZXZlbnRzLnB1c2ggKHtpZDogJ0xPQURfU1VDQ0VTUyd9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudHJhbnNpdGlvbnMgPSB7XHJcbiAgICAgICAgTE9BRF9TVUNDRVNTOiB7bmV4dFN0YXRlOiAnaGFuZHNoYWtlJ31cclxuICAgIH07XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gTG9hZGluZ0dhbWVzdGF0ZTtcclxuIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gU2hvd0Jhc2VXaW5zR2FtZXN0YXRlIChtb2R1bGVzKSB7XHJcbiAgICB0aGlzLmlkID0gJ3Nob3dCYXNlV2lucyc7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMub25FbnRlciA9ICgpID0+IHtcclxuICAgICAgICBtb2R1bGVzLnNlc3Npb24uZmluYWxpc2VTcGluUmVzcG9uc2UgKCk7XHJcbiAgICAgICAgbW9kdWxlcy5jb21wb25lbnRzLmJhbGFuY2VCYXIudXBkYXRlV2luIChtb2R1bGVzLnNlc3Npb24uc3Bpbi5yb3VuZC5ncm9zc1dpbik7XHJcbiAgICAgICAgbW9kdWxlcy5jb21wb25lbnRzLnJlZWxzLmN5Y2xlV2lucyAobW9kdWxlcy5zZXNzaW9uLnNwaW4ud2lucyk7XHJcbiAgICAgICAgbW9kdWxlcy5ldmVudHMucHVzaCAoe2lkOiAnQ1lDTEVfU1RBUlRFRCd9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudHJhbnNpdGlvbnMgPSB7XHJcbiAgICAgICAgQ1lDTEVfU1RBUlRFRDoge25leHRTdGF0ZTogJ2lkbGUnfVxyXG4gICAgfTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubW9kdWxlLmV4cG9ydHMgPSBTaG93QmFzZVdpbnNHYW1lc3RhdGU7XHJcbiIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIFNwaW5SZXF1ZXN0R2FtZXN0YXRlIChtb2R1bGVzKSB7XHJcbiAgICB0aGlzLmlkID0gJ3NwaW5SZXF1ZXN0JztcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgY29uc3QgcCA9IHtcclxuICAgICAgICB3YWl0Rm9yOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbXBsZXRlICgpIHtcclxuICAgICAgICAtLXAud2FpdEZvcjtcclxuICAgICAgICBpZiAocC53YWl0Rm9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIG1vZHVsZXMuZXZlbnRzLnB1c2ggKHtpZDogJ1JFUVVFU1RfQ09NUExFVEUnfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBmdW5jdGlvbiBvblJlZWxzQW5pbUNvbXBsZXRlICgpIHtcclxuICAgICAgICBjaGVja0NvbXBsZXRlICgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBmdW5jdGlvbiBvblNwaW5SZXNwb25zZSAocmVzcG9uc2UpIHtcclxuICAgICAgICBtb2R1bGVzLnNlc3Npb24ucmVjb3JkU3BpblJlc3BvbnNlIChyZXNwb25zZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cgKHJlc3BvbnNlKTtcclxuICAgICAgICBjaGVja0NvbXBsZXRlICgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLm9uRW50ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcC53YWl0Rm9yID0gMjtcclxuICAgICAgICBtb2R1bGVzLmNvbXBvbmVudHMucmVlbHMuYmVnaW5TcGluIChvblJlZWxzQW5pbUNvbXBsZXRlKTtcclxuICAgICAgICBtb2R1bGVzLmJhY2tlbmQucmVxdWVzdFNwaW4gKG1vZHVsZXMuc2Vzc2lvbi5iZXQsIG9uU3BpblJlc3BvbnNlKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudHJhbnNpdGlvbnMgPSB7XHJcbiAgICAgICAgUkVRVUVTVF9DT01QTEVURToge25leHRTdGF0ZTogJ3NwaW5SZXNvbHZlJ31cclxuICAgIH07XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gU3BpblJlcXVlc3RHYW1lc3RhdGU7XHJcbiIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmZ1bmN0aW9uIFNwaW5SZXNvbHZlR2FtZXN0YXRlIChtb2R1bGVzKSB7XHJcbiAgICB0aGlzLmlkID0gJ3NwaW5SZXNvbHZlJztcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gb25SZWVsc0FuaW1Db21wbGV0ZSAoKSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBtb2R1bGVzLnNlc3Npb24uc3BpbjtcclxuICAgICAgICBjb25zdCBpZCA9IChyZXNwb25zZS53aW5zICYmIHJlc3BvbnNlLndpbnMubGVuZ3RoID4gMCkgPyAnU1BJTl9XSVRIX1dJTlMnIDogJ1NQSU5fTk9fV0lOUyc7XHJcbiAgICAgICAgbW9kdWxlcy5ldmVudHMucHVzaCAoe2lkOiBpZH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLm9uRW50ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgbW9kdWxlcy5jb21wb25lbnRzLnJlZWxzLmVuZFNwaW4gKG1vZHVsZXMuc2Vzc2lvbi5zcGluLnJlZWxzLCBvblJlZWxzQW5pbUNvbXBsZXRlKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMudHJhbnNpdGlvbnMgPSB7XHJcbiAgICAgICAgU1BJTl9XSVRIX1dJTlM6IHtuZXh0U3RhdGU6ICdzaG93QmFzZVdpbnMnfSxcclxuICAgICAgICBTUElOX05PX1dJTlM6ICAge25leHRTdGF0ZTogJ2lkbGUnfVxyXG4gICAgfTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubW9kdWxlLmV4cG9ydHMgPSBTcGluUmVzb2x2ZUdhbWVzdGF0ZTtcclxuIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gUmVzaXplciAobW9kdWxlcykge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy53ID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLmggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIGZ1bmN0aW9uIG9uUmVzaXplICgpIHtcclxuICAgICAgICBzZWxmLncgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBzZWxmLmggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgLy8gbW9kdWxlcy5waXhpLnJlbmRlcmVyLnJlc2l6ZSAoc2VsZi53LCBzZWxmLmgpO1xyXG5cclxuICAgICAgICBpZiAobW9kdWxlcy5jb21wb25lbnRzLmxheW91dCkge1xyXG4gICAgICAgICAgICBtb2R1bGVzLmNvbXBvbmVudHMubGF5b3V0LnJlc2l6ZSAoc2VsZi53LCBzZWxmLmgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gcHJldmVudFRvdWNoTW92ZSAoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCAoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gY29uc3RydWN0ICgpIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAoJ2RldmljZU9yaWVudGF0aW9uJywgb25SZXNpemUpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyICgndG91Y2htb3ZlJywgcHJldmVudFRvdWNoTW92ZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3QgKCk7XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gUmVzaXplcjtcclxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgXCJ0ZXh0dXJlc1wiOiBbXHJcbiAgICAgICAge1wibmFtZVwiOiBcInN5bWJvbEgxXCIsIFwidXJsXCI6IFwicmVzL3N5bWJvbHMvSDEucG5nXCJ9LFxyXG4gICAgICAgIHtcIm5hbWVcIjogXCJzeW1ib2xIMUZsYXNoXCIsIFwidXJsXCI6IFwicmVzL3N5bWJvbHMvSDFfY29ubmVjdC5wbmdcIn0sXHJcbiAgICAgICAge1wibmFtZVwiOiBcInN5bWJvbEgyXCIsIFwidXJsXCI6IFwicmVzL3N5bWJvbHMvSDIucG5nXCJ9LFxyXG4gICAgICAgIHtcIm5hbWVcIjogXCJzeW1ib2xIMkZsYXNoXCIsIFwidXJsXCI6IFwicmVzL3N5bWJvbHMvSDJfY29ubmVjdC5wbmdcIn0sXHJcbiAgICAgICAge1wibmFtZVwiOiBcInN5bWJvbEgzXCIsIFwidXJsXCI6IFwicmVzL3N5bWJvbHMvSDMucG5nXCJ9LFxyXG4gICAgICAgIHtcIm5hbWVcIjogXCJzeW1ib2xIM0ZsYXNoXCIsIFwidXJsXCI6IFwicmVzL3N5bWJvbHMvSDNfY29ubmVjdC5wbmdcIn0sXHJcbiAgICAgICAge1wibmFtZVwiOiBcInN5bWJvbEg0XCIsIFwidXJsXCI6IFwicmVzL3N5bWJvbHMvSDQucG5nXCJ9LFxyXG4gICAgICAgIHtcIm5hbWVcIjogXCJzeW1ib2xINEZsYXNoXCIsIFwidXJsXCI6IFwicmVzL3N5bWJvbHMvSDRfY29ubmVjdC5wbmdcIn0sXHJcbiAgICAgICAge1wibmFtZVwiOiBcInN5bWJvbEg1XCIsIFwidXJsXCI6IFwicmVzL3N5bWJvbHMvSDUucG5nXCJ9LFxyXG4gICAgICAgIHtcIm5hbWVcIjogXCJzeW1ib2xINlwiLCBcInVybFwiOiBcInJlcy9zeW1ib2xzL0g2LnBuZ1wifSxcclxuICAgICAgICB7XCJuYW1lXCI6IFwic3ltYm9sQm9udXNcIiwgXCJ1cmxcIjogXCJyZXMvc3ltYm9scy9CT05VUy5wbmdcIn1cclxuICAgIF1cclxufSIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmNvbnN0IG1hbmlmZXN0ID0gcmVxdWlyZSAoJy4vcmVzb3VyY2UtbWFuaWZlc3QuanNvbicpO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZnVuY3Rpb24gUmVzb3VyY2VzICgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XHJcbiAgICB0aGlzLnRleHR1cmVzID0ge1xyXG4gICAgICAgIEVNUFRZOiBQSVhJLlRleHR1cmUuRU1QVFksXHJcbiAgICAgICAgV0hJVEU6IFBJWEkuVGV4dHVyZS5XSElURVxyXG4gICAgfTtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgZnVuY3Rpb24gY29uc3RydWN0ICgpIHtcclxuICAgICAgICBQSVhJLkxvYWRlci5zaGFyZWQub24gKCdlcnJvcicsIChhLCBiLCBjLCB1bnVzZWRfZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAoYS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cgKGMudXJsKTtcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3QgKCk7XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMuZ2V0VGV4dHVyZSA9IChyZXNvdXJjZU5hbWUpID0+IHtcclxuICAgICAgICBjb25zb2xlLmFzc2VydCAoc2VsZi50ZXh0dXJlcyBbcmVzb3VyY2VOYW1lXSk7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYudGV4dHVyZXMgW3Jlc291cmNlTmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICB0aGlzLmxvYWRUZXh0dXJlcyA9IChidW5kbGVOYW1lLCBvbkxvYWRlZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RzID0gdGhpcy5tYW5pZmVzdCBbYnVuZGxlTmFtZV07XHJcblxyXG4gICAgICAgIFBJWEkuTG9hZGVyLnNoYXJlZC5yZXNldCAoKTtcclxuICAgICAgICBQSVhJLkxvYWRlci5zaGFyZWQuYWRkIChyZXF1ZXN0cyk7XHJcbiAgICAgICAgUElYSS5Mb2FkZXIuc2hhcmVkLmxvYWQgKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgciA9IFBJWEkuTG9hZGVyLnNoYXJlZC5yZXNvdXJjZXM7XHJcbiAgICAgICAgICAgIHJlcXVlc3RzLmZvckVhY2ggKHJlcXVlc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi50ZXh0dXJlcyBbcmVxdWVzdC5uYW1lXSA9IHIgW3JlcXVlc3QubmFtZV0udGV4dHVyZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG9uTG9hZGVkIChidW5kbGVOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbm1vZHVsZS5leHBvcnRzID0gUmVzb3VyY2VzO1xyXG4iLCIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5mdW5jdGlvbiBTZXNzaW9uIChtb2R1bGVzKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmJhbGFuY2UgPSAwO1xyXG4gICAgdGhpcy5iZXQgPSAwO1xyXG5cclxuICAgIHRoaXMub3BlbkdhbWUgPSBudWxsO1xyXG4gICAgdGhpcy5zcGluID0gbnVsbDtcclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdGhpcy5yZWNvcmRPcGVuR2FtZSA9IChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIHNlbGYub3BlbkdhbWUgPSByZXNwb25zZTtcclxuICAgICAgICBzZWxmLmJhbGFuY2UgPSByZXNwb25zZS5iYWxhbmNlO1xyXG4gICAgICAgIHNlbGYuYmV0ID0gcmVzcG9uc2UuaW5pdGlhbEJldDtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMucmVjb3JkU3BpblJlc3BvbnNlID0gKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgc2VsZi5zcGluID0gcmVzcG9uc2U7XHJcbiAgICAgICAgc2VsZi5iYWxhbmNlID0gcmVzcG9uc2Uucm91bmQucG9zdFNwaW5CYWxhbmNlO1xyXG4gICAgICAgIG1vZHVsZXMuY29tcG9uZW50cy5iYWxhbmNlQmFyLnVwZGF0ZUJhbGFuY2UgKHNlbGYuYmFsYW5jZSk7XHJcbiAgICAgICAgbW9kdWxlcy5jb21wb25lbnRzLmxlZ2FsSW5mby51cGRhdGVSb3VuZElkIChyZXNwb25zZS5yb3VuZC5yb3VuZElkKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHRoaXMuZmluYWxpc2VTcGluUmVzcG9uc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgc2VsZi5iYWxhbmNlID0gc2VsZi5zcGluLnJvdW5kLmZpbmFsQmFsYW5jZTtcclxuICAgICAgICBtb2R1bGVzLmNvbXBvbmVudHMuYmFsYW5jZUJhci51cGRhdGVCYWxhbmNlIChzZWxmLmJhbGFuY2UpO1xyXG4gICAgfTtcclxufVxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxubW9kdWxlLmV4cG9ydHMgPSBTZXNzaW9uO1xuIl19
