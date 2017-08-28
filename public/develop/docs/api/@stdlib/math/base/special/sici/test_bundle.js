// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;

    function findProxyquireifyName() {
        var deps = Object.keys(modules)
            .map(function (k) { return modules[k][1]; });

        for (var i = 0; i < deps.length; i++) {
            var pq = deps[i]['proxyquireify'];
            if (pq) return pq;
        }
    }

    var proxyquireifyName = findProxyquireifyName();

    function newRequire(name, jumped){
        // Find the proxyquireify module, if present
        var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];

        // Proxyquireify provides a separate cache that is used when inside
        // a proxyquire call, and is set to null outside a proxyquire call.
        // This allows the regular caching semantics to work correctly both
        // inside and outside proxyquire calls while keeping the cached
        // modules isolated.
        // When switching from one proxyquire call to another, it clears
        // the cache to prevent contamination between different sets
        // of stubs.
        var currentCache = (pqify && pqify.exports._cache) || cache;

        if(!currentCache[name]) {
            if(!modules[name]) {
                // if we cannot find the the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof require == "function" && require;
                if (!jumped && currentRequire) return currentRequire(name, true);

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
            var m = currentCache[name] = {exports:{}};

            // The normal browserify require function
            var req = function(x){
                var id = modules[name][1][x];
                return newRequire(id ? id : x);
            };

            // The require function substituted for proxyquireify
            var moduleRequire = function(x){
                var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];
                // Only try to use the proxyquireify version if it has been `require`d
                if (pqify && pqify.exports._proxy) {
                    return pqify.exports._proxy(req, x);
                } else {
                    return req(x);
                }
            };

            modules[name][0].call(m.exports,moduleRequire,m,m.exports,outer,modules,currentCache,entry);
        }
        return currentCache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
})
({1:[function(require,module,exports){
'use strict';

// FUNCTIONS //

var has = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Tests if an object has a specified property.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'bap' );
* // returns false
*/
function hasOwnProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return has.call( value, property );
} // end FUNCTION hasOwnProp()


// EXPORTS //

module.exports = hasOwnProp;

},{}],2:[function(require,module,exports){
'use strict';

/**
* Test whether an object has a specified property.
*
* @module @stdlib/assert/has-own-property
*
* @example
* var hasOwnProp = require( '@stdlib/assert/has-own-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* bool = hasOwnProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasOwnProp = require( './has_own_property.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./has_own_property.js":1}],3:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array.
*
* @module @stdlib/assert/is-array
*
* @example
* var isArray = require( '@stdlib/assert/is-array' );
*
* var bool = isArray( [] );
* // returns true
*
* bool = isArray( {} );
* // returns false
*/

// MODULES //

var isArray = require( './is_array.js' );


// EXPORTS //

module.exports = isArray;

},{"./is_array.js":4}],4:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an array
*
* @example
* var bool = isArray( [] );
* // returns true
*
* @example
* var bool = isArray( {} );
* // returns false
*/
function isArray( value ) {
	return ( nativeClass( value ) === '[object Array]' );
} // end FUNCTION isArray()


// EXPORTS //

module.exports = Array.isArray || isArray;

},{"@stdlib/utils/native-class":85}],5:[function(require,module,exports){
'use strict';

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],6:[function(require,module,exports){
'use strict';

/**
* Returns a boolean indicating if an environment is little endian.
*
* @module @stdlib/assert/is-little-endian
*
* @example
* var IS_LITTLE_ENDIAN = require( '@stdlib/assert/is-little-endian' );
*
* var bool = IS_LITTLE_ENDIAN;
* // returns <boolean>
*/

// MODULES //

var IS_LITTLE_ENDIAN = require( './is_little_endian.js' );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;

},{"./is_little_endian.js":7}],7:[function(require,module,exports){
'use strict';

// MODULES //

var ctors = require( './ctors.js' );


// MAIN //

/**
* Returns a boolean indicating if an environment is little endian.
*
* @returns {boolean} boolean indicating if an environment is little endian
*
* @example
* var bool = isLittleEndian();
* // returns <boolean>
*/
function isLittleEndian() {
	var uint16view;
	var uint8view;

	uint16view = new ctors[ 'uint16' ]( 1 );

	// Set the uint16 view to a value having distinguishable lower and higher order words.
	// 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
} // end FUNCTION isLittleEndian()


// EXPORTS //

module.exports = isLittleEndian();

},{"./ctors.js":5}],8:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is infinite.
*
* @module @stdlib/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Number.POSITIVE_INFINITY );
* // returns true
*
* bool = isInfinite( Number.NEGATIVE_INFINITY );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( NaN );
* // returns false
*/

// MODULES //

var isInfinite = require( './is_infinite.js' );


// EXPORTS //

module.exports = isInfinite;

},{"./is_infinite.js":9}],9:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Number.POSITIVE_INFINITY );
* // returns true
*
* @example
* var bool = isInfinite( Number.NEGATIVE_INFINITY );
* // returns true
*
* @example
* var bool = isInfinite( 5.0 );
* // returns false
*
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
} // end FUNCTION isInfinite()


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/math/constants/float64-ninf":76,"@stdlib/math/constants/float64-pinf":77}],10:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/math/base/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 7.0 );
* // returns false
*/

// MODULES //

var isnan = require( './is_nan.js' );


// EXPORTS //

module.exports = isnan;

},{"./is_nan.js":11}],11:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 7.0 );
* // returns false
*/
function isnan( x ) {
	return (x !== x);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{}],12:[function(require,module,exports){
'use strict';

/**
* Computes the absolute value of `x`.
*
* @param {number} x - input value
* @returns {number} absolute value
*
* @example
* var v = abs( -1.0 );
* // returns 1.0
*
* @example
* var v = abs( 2.0 );
* // returns 2.0
*
* @example
* var v = abs( 0.0 );
* // returns 0.0
*
* @example
* var v = abs( -0.0 );
* // returns 0.0
*
* @example
* var v = abs( NaN );
* // returns NaN
*/
function abs( x ) {
	if ( x < 0.0 ) {
		return -x;
	}
	if ( x === 0.0 ) {
		return 0.0; // handle negative zero
	}
	return x;
} // end FUNCTION abs()


// EXPORTS //

module.exports = abs;

},{}],13:[function(require,module,exports){
'use strict';

/**
* Compute an absolute value.
*
* @module @stdlib/math/base/special/abs
*
* @example
* var abs = require( '@stdlib/math/base/special/abs' );
*
* var v = abs( -1.0 );
* // returns 1.0
*
* v = abs( 2.0 );
* // returns 2.0
*
* v = abs( 0.0 );
* // returns 0.0
*
* v = abs( -0.0 );
* // returns 0.0
*
* v = abs( NaN );
* // returns NaN
*/

// MODULES //

var abs = require( './abs.js' );


// EXPORTS //

module.exports = abs;

},{"./abs.js":12}],14:[function(require,module,exports){
'use strict';

// MODULES //

var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000;

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff;


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* @example
* var z = copysign( -0.0, 1.0 );
* // returns 0.0
*/
function copysign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	x = toWords( x );
	hx = x[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, x[ 1 ] );
} // end FUNCTION copysign()


// EXPORTS //

module.exports = copysign;

},{"@stdlib/math/base/utils/float64-from-words":52,"@stdlib/math/base/utils/float64-get-high-word":56,"@stdlib/math/base/utils/float64-to-words":65}],15:[function(require,module,exports){
'use strict';

/**
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math/base/special/copysign
*
* @example
* var copysign = require( '@stdlib/math/base/special/copysign' );
*
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* z = copysign( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var copysign = require( './copysign.js' );


// EXPORTS //

module.exports = copysign;

},{"./copysign.js":14}],16:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cos.c?view=log}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// MAIN //

/**
* Computes the cosine of a number.
*
* @param {number} x - input value
* @returns {number} cosine (in radians)
*
* @example
* var v = cos( 0.0 );
* // returns 1.0
*
* @example
* var v = cos( Math.PI/4.0 );
* // returns ~0.707
*
* @example
* var v = cos( -Math.PI/6.0 );
* // returns ~0.866
*
* @example
* var v = cos( NaN );
* // returns NaN
*/
function cos( x ) {
	var ix;
	var n;
	var y;
	var z;

	y = new Array( 2 );
	z = 0.0;
	ix = getHighWord( x );

	// Case: |x| ~< pi/4
	ix &= 0x7fffffff;
	if ( ix <= 0x3fe921fb ) {
		// Case: x < 2**-27
		if ( ix<0x3e400000 ) {
			if ( (x|0) === 0 ) {
				// Generate inexact...
				return 1.0;
			}
		}
		return kernelCos( x, z );
	}
	// Case: cos(Inf or NaN) is NaN */
	else if ( ix >= 0x7ff00000 ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	n = rempio2( x, y );
	switch ( n & 3 ) {
	case 0:
		return kernelCos( y[0], y[1] );
	case 1:
		return -kernelSin( y[0], y[1] );
	case 2:
		return -kernelCos( y[0], y[1] );
	default:
		return kernelSin( y[0], y[1] );
	}
} // end FUNCTION cos()


// EXPORTS //

module.exports = cos;

},{"@stdlib/math/base/special/kernel-cos":20,"@stdlib/math/base/special/kernel-sin":22,"@stdlib/math/base/special/rempio2":28,"@stdlib/math/base/utils/float64-get-high-word":56}],17:[function(require,module,exports){
'use strict';

/**
* Compute the cosine of a number.
*
* @module @stdlib/math/base/special/cos
*
* @example
* var cos = require( '@stdlib/math/base/special/cos' );
*
* var v = cos( 0.0 );
* // returns 1.0
*
* v = cos( Math.PI/4.0 );
* // returns ~0.707
*
* v = cos( -Math.PI/6.0 );
* // returns ~0.866
*/

// MODULES //

var cos = require( './cos.js' );


// EXPORTS //

module.exports = cos;

},{"./cos.js":16}],18:[function(require,module,exports){
'use strict';

// TODO: implementation (?)

/**
* Rounds a numeric value toward negative infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = floor( -4.2 );
* // returns -5.0
*
* @example
* var v = floor( 9.99999 );
* // returns 9.0
*
* @example
* var v = floor( 0.0 );
* // returns 0.0
*
* @example
* var v = floor( NaN );
* // returns NaN
*/
var floor = Math.floor;


// EXPORTS //

module.exports = floor;

},{}],19:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward negative infinity.
*
* @module @stdlib/math/base/special/floor
*
* @example
* var floor = require( '@stdlib/math/base/special/floor' );
*
* var v = floor( -4.2 );
* // returns -5.0
*
* v = floor( 9.99999 );
* // returns 9.0
*
* v = floor( 0.0 );
* // returns 0.0
*
* v = floor( NaN );
* // returns NaN
*/

// MODULES //

var floor = require( './floor.js' );


// EXPORTS //

module.exports = floor;

},{"./floor.js":18}],20:[function(require,module,exports){
'use strict';

/**
* Compute the cosine of a number on `[-pi/4, pi/4]`.
*
* @module @stdlib/math/base/special/kernel-cos
*
* @example
* var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
*
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* v = kernelCos( Math.PI/6.0, 0.0 );
* // returns ~0.866
*
* v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* v = kernelCos( NaN, 0.0 );
* // returns NaN
*/

// MODULES //

var kernelCos = require( './kernel_cos.js' );


// EXPORTS //

module.exports = kernelCos;

},{"./kernel_cos.js":21}],21:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_cos.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;


// VARIABLES //

var C13 = [
	4.16666666666666019037e-02,  // 0x3FA55555, 0x5555554C
	-1.38888888888741095749e-03, // 0xBF56C16C, 0x16C15177
	2.48015872894767294178e-05  // 0x3EFA01A0, 0x19CB1590
];
var C46 = [
	-2.75573143513906633035e-07, // 0xBE927E4F, 0x809C52AD
	2.08757232129817482790e-09, // 0x3E21EE9E, 0xBDB4B1C4
	-1.13596475577881948265e-11 // 0xBDA8FAE9, 0xBE8838D4
];


// FUNCTIONS //

// Create polynomial functions based on above coefficients...
var polyval13 = evalpoly( C13 );
var polyval46 = evalpoly( C46 );


// MAIN //

/**
* Computes the cosine on \\( [-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* * Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
* * If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
* * \\( cos(x) \\) is approximated by a polynomial of degree \\(14\\) on \\( [0,\pi/4] \\).
*
*   ``` tex
*   \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*   ```
*
*   where the Remez error is
*
*   ``` tex
*   \left| \cos(x) - \left( 1 - \frac{x^2}{2} + C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{15} \right) \right| \le 2^{-58}
*   ```
*
* * Let \\( C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{14} \\), then
*
*   ``` tex
*   \cos(x) \approx 1 - \frac{x \cdot x}{2} + r
*   ```
*
*   Since
*
*   ``` tex
*   \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y
*   ```

*   a correction term is necessary in \\( \cos(x) \\). Hence,
*
*   ``` tex
*   \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*   ```
*
*   For better accuracy, rearrange to
*
*   ``` tex
*   \cos(x+y) \approx w + \left( t + ( r - x \cdot y ) \right)
*   ```
*
*   where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( t \\) is a tiny correction term (\\( 1 - \frac{x \cdot x}{2} = w + t \\) exactly in infinite precision). The exactness of \\(w + t\\) in infinite precision depends on \\(w\\) and \\(t\\) having the same precision as \\(x\\).
*
*
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine (in radians)
*
* @example
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* @example
* var v = kernelCos( Math.PI/6.0, 0.0 );
* // returns ~0.866
*
* @example
* var v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* @example
* var v = kernelCos( NaN, 0.0 );
* // returns NaN
*/
function kernelCos( x, y ) {
	var hz;
	var r;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = z * polyval13( z );
	r += w * w * polyval46( z );
	hz = 0.5 * z;
	w = 1.0 - hz;
	return w + ( ((1.0-w) - hz) + ((z*r) - (x*y)) );
} // end FUNCTION kernelCos()


// EXPORTS //

module.exports = kernelCos;

},{"@stdlib/math/base/tools/evalpoly":48}],22:[function(require,module,exports){
'use strict';

/**
* Compute the sine of a number on `[-pi/4, pi/4]`.
*
* @module @stdlib/math/base/special/kernel-sin
*
* @example
* var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
*
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* v = kernelSin( Math.PI/6.0, 0.0 );
* // returns ~0.5
*
* v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.581
*
* v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* v = kernelSin( 3.0, NaN );
* // returns NaN
*
* v = kernelSin( NaN, NaN );
* // returns NaN
*/

// MODULES //

var kernelSin = require( './kernel_sin.js' );


// EXPORTS //

module.exports = kernelSin;

},{"./kernel_sin.js":23}],23:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// VARIABLES //

var S1 = -1.66666666666666324348e-01; // 0xBFC55555, 0x55555549
var S2 = 8.33333333332248946124e-03;  // 0x3F811111, 0x1110F8A6
var S3 = -1.98412698298579493134e-04; // 0xBF2A01A0, 0x19C161D5
var S4 = 2.75573137070700676789e-06;  // 0x3EC71DE3, 0x57B1FE7D
var S5 = -2.50507602534068634195e-08; // 0xBE5AE5E6, 0x8A2B9CEB
var S6 = 1.58969099521155010221e-10;  // 0x3DE5D93A, 0x5ACFD57C


// MAIN //

/**
* Computes the sine on \\( \approx [-\pi/4, \pi/4] \\) (except on \\(-0\\)), where \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* * Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive \\(x\\).
* * Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
* * \\( \sin(x) \\) is approximated by a polynomial of degree \\(13\\) on \\( \left[0,\tfrac{pi}{4}\right] \\)
*
*   ``` tex
*   \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*   ```
*
*   where
*
*   ``` tex
*   \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*   ```
*
* * We have
*
*   ``` tex
*   \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y
*   ```
*
*   For better accuracy, let
*
*   ``` tex
*   r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*   ```
*
*   then
*
*   ``` tex
*   \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*   ```
*
*
* @param {number} x - input value (assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @returns {number} sine (in radians)
*
* @example
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* @example
* var v = kernelSin( Math.PI/6.0, 0.0 );
* // returns ~0.5
*
* @example
* var v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.581
*
* @example
* var v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* @example
* var v = kernelSin( 3.0, NaN );
* // returns NaN
*
* @example
* var v = kernelSin( NaN, NaN );
* // returns NaN
*/
function kernelSin( x, y ) {
	var r;
	var v;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = S2 + (z * (S3 + (z*S4))) + (z * w * (S5 + (z*S6)));
	v = z * x;
	if ( y === 0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
} // end FUNCTION kernelSin()


// EXPORTS //

module.exports = kernelSin;

},{}],24:[function(require,module,exports){
'use strict';

/**
* Multiply a double-precision floating-point number by an integer power of two.
*
* @module @stdlib/math/base/special/ldexp
*
* @example
* var ldexp = require( '@stdlib/math/base/special/ldexp' );
*
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* x = ldexp( 0.0, 20 );
* // returns 0.0
*
* x = ldexp( -0.0, 39 );
* // returns -0.0
*
* x = ldexp( NaN, -101 );
* // returns NaN
*
* x = ldexp( Number.POSITIVE_INFINITY, 11 );
* // returns Number.POSITIVE_INFINITY
*
* x = ldexp( Number.NEGATIVE_INFINITY, -118 );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":25}],25:[function(require,module,exports){
'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/math/constants/float64-max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/math/constants/float64-max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/math/constants/float64-min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/math/base/utils/float64-normalize' );
var floatExp = require( '@stdlib/math/base/utils/float64-exponent' );
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111
var CLEAR_EXP_MASK = 0x800fffff; // 2148532223


// MAIN //

/**
* Multiplies a double-precision floating-point number by an integer power of two.
*
* @param {number} frac - fraction
* @param {integer} exp - exponent
* @returns {number} double-precision floating-point number
*
* @example
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
*
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
*
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
*
* @example
* var x = ldexp( Number.POSITIVE_INFINITY, 11 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var x = ldexp( Number.NEGATIVE_INFINITY, -118 );
* // returns Number.NEGATIVE_INFINITY
*/
function ldexp( frac, exp ) {
	var high;
	var tmp;
	var w;
	var m;
	if (
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	tmp = normalize( frac );
	frac = tmp[ 0 ];
	exp += tmp[ 1 ];

	// Extract the exponent from `frac` and add it to `exp`:
	exp += floatExp( frac );

	// Check for underflow/overflow...
	if ( exp < MIN_SUBNORMAL_EXPONENT ) {
		return copysign( 0.0, frac );
	}
	if ( exp > MAX_EXPONENT ) {
		if ( frac < 0.0 ) {
			return NINF;
		}
		return PINF;
	}
	// Check for a subnormal and scale accordingly to retain precision...
	if ( exp <= MAX_SUBNORMAL_EXPONENT ) {
		exp += 52;
		m = TWO52_INV;
	} else {
		m = 1.0;
	}
	// Split the fraction into higher and lower order words:
	w = toWords( frac );
	high = w[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, w[ 1 ] );
} // end FUNCTION ldexp()


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/math/base/assert/is-infinite":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":15,"@stdlib/math/base/utils/float64-exponent":50,"@stdlib/math/base/utils/float64-from-words":52,"@stdlib/math/base/utils/float64-normalize":60,"@stdlib/math/base/utils/float64-to-words":65,"@stdlib/math/constants/float64-exponent-bias":70,"@stdlib/math/constants/float64-max-base2-exponent":74,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":73,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":75,"@stdlib/math/constants/float64-ninf":76,"@stdlib/math/constants/float64-pinf":77}],26:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm.
*
* @module @stdlib/math/base/special/ln
*
* @example
* var ln = require( '@stdlib/math/base/special/ln' );
*
* var v = ln( 4.0 );
* // returns ~1.386
*
* v = ln( 0.0 );
* // returns Number.NEGATIVE_INFINITY
*
* v = ln( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* v = ln( NaN );
* // returns NaN
*
* v = ln( -4.0 );
* // returns NaN
*/

// MODULES //

var ln = require( './ln.js' );


// EXPORTS //

module.exports = ln;

},{"./ln.js":27}],27:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3fe62e42 fee00000
var LN2_LO = 1.90821492927058770002e-10; // 3dea39ef 35793c76
var TWO54 = 1.80143985094819840000e+16; // 0x43500000, 0x00000000
var P = [
	3.999999999940941908e-01,  // 3FD99999 9997FA04
	2.222219843214978396e-01,  // 3FCC71C5 1D8E78AF
	1.531383769920937332e-01  // 3FC39A09 D078C69F
];
var Q = [
	6.666666666666735130e-01, // 3FE55555 55555593
	2.857142874366239149e-01, // 3FD24924 94229359
	1.818357216161805012e-01, // 3FC74664 96CB03DE
	1.479819860511658591e-01 // 3FC2F112 DF3E5244
];

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff;

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000;

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000;

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000;


// FUNCTIONS //

// Compile functions to evaluate polynomial functions based on the above coefficients...
var polyvalP = evalpoly( P );
var polyvalQ = evalpoly( Q );


// MAIN //

/**
* Evaluates the natural logarithm.
*
* @param {NonNegativeNumber} x - input value
* @returns {number} function value
*
* @example
* var v = ln( 4.0 );
* // returns ~1.386
*
* @example
* var v = ln( 0.0 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = ln( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = ln( NaN );
* // returns NaN
*
* @example
* var v = ln( -4.0 );
* // returns NaN
*/
function ln( x ) {
	var words;
	var hfsq;
	var hx;
	var k;
	var t2;
	var t1;
	var R;
	var f;
	var i;
	var j;
	var s;
	var w;
	var z;

	if ( x === 0.0 ) {
		return NINF;
	}
	if ( isnan( x ) || x < 0.0 ) {
		return NaN;
	}

	words = toWords( x );
	hx = words[ 0 ];

	k = 0;
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54;
		// Subnormal number, scale up x:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( hx>>20 ) - BIAS;
	hx &= HIGH_SIGNIFICAND_MASK;
	i = (hx+0x95f64) & 0x100000;
	// Normalize x or x/2...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 );
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0.0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (0.33333333333333333*f) );
		if ( k === 0.0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f );
	z = s * s;
	i = hx - 0x6147a;
	w = z * z;
	j = 0x6b851 - hx;
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0.0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - ( s * ( f - R ) );
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
} // end FUNCTION ln()


// EXPORTS //

module.exports = ln;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":48,"@stdlib/math/base/utils/float64-get-high-word":56,"@stdlib/math/base/utils/float64-set-high-word":63,"@stdlib/math/base/utils/float64-to-words":65,"@stdlib/math/constants/float64-exponent-bias":70,"@stdlib/math/constants/float64-ninf":76}],28:[function(require,module,exports){
'use strict';

/**
* Compute `x - n*pi/2 = r`.
*
* @module @stdlib/math/base/special/rempio2
*
* @example
* var rempio2 = require( '@stdlib/math/base/special/rempio2' );
*
* var x = 128.0;
* var y = new Array( 2 );
* var n = rempio2( x, y );
* // returns 81.0
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*/

// MODULES //

var rempio2 = require( './rempio2.js' );


// EXPORTS //

module.exports = rempio2;

},{"./rempio2.js":30}],29:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );


// VARIABLES //

/*
* Table of constants for `2/pi` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (24*i)-th to (24*i+23)-th bit of `2/pi` after binary point. The corresponding floating value is
*
* ``` tex
* \operatorname{ipio2}[i] \cdot 2^{-24(i+1)}
* ```
*
* This table must have at least `(e0-3)/24 + jk` terms. For quad precision (e0 <= 16360, jk = 6), this is `686`.
*/
var IPIO2 = [
	0xA2F983, 0x6E4E44, 0x1529FC, 0x2757D1, 0xF534DD, 0xC0DB62,
	0x95993C, 0x439041, 0xFE5163, 0xABDEBB, 0xC561B7, 0x246E3A,
	0x424DD2, 0xE00649, 0x2EEA09, 0xD1921C, 0xFE1DEB, 0x1CB129,
	0xA73EE8, 0x8235F5, 0x2EBB44, 0x84E99C, 0x7026B4, 0x5F7E41,
	0x3991D6, 0x398353, 0x39F49C, 0x845F8B, 0xBDF928, 0x3B1FF8,
	0x97FFDE, 0x05980F, 0xEF2F11, 0x8B5A0A, 0x6D1F6D, 0x367ECF,
	0x27CB09, 0xB74F46, 0x3F669E, 0x5FEA2D, 0x7527BA, 0xC7EBE5,
	0xF17B3D, 0x0739F7, 0x8A5292, 0xEA6BFB, 0x5FB11F, 0x8D5D08,
	0x560330, 0x46FC7B, 0x6BABF0, 0xCFBC20, 0x9AF436, 0x1DA9E3,
	0x91615E, 0xE61B08, 0x659985, 0x5F14A0, 0x68408D, 0xFFD880,
	0x4D7327, 0x310606, 0x1556CA, 0x73A8C9, 0x60E27B, 0xC08C6B
];

// Double precision array, obtained by cutting `pi/2` into `24` bits chunks...
var PIO2 = [
	1.57079625129699707031e+00, // 0x3FF921FB, 0x40000000
	7.54978941586159635335e-08, // 0x3E74442D, 0x00000000
	5.39030252995776476554e-15, // 0x3CF84698, 0x80000000
	3.28200341580791294123e-22, // 0x3B78CC51, 0x60000000
	1.27065575308067607349e-29, // 0x39F01B83, 0x80000000
	1.22933308981111328932e-36, // 0x387A2520, 0x40000000
	2.73370053816464559624e-44, // 0x36E38222, 0x80000000
	2.16741683877804819444e-51  // 0x3569F31D, 0x00000000
];
var TWO24 = 1.67772160000000000000e+07;  // 0x41700000, 0x00000000
var TWON24 = 5.96046447753906250000e-08; // 0x3E700000, 0x00000000

// Arrays for storing temporary values (note that, in C, this is not thread safe):
var F = zero( new Array( 20 ) );
var Q = zero( new Array( 20 ) );
var FQ = zero( new Array( 20 ) );
var IQ = zero( new Array( 20 ) );


// FUNCTIONS //

/**
* Zeros an array.
*
* @private
* @param {Array<number>} arr - array to zero
* @returns {Array<number>} input array
*/
function zero( arr ) {
	var len = arr.length;
	var i;
	for ( i = 0; i < len; i++ ) {
		arr[ i ] = 0.0;
	}
	return arr;
} // end FUNCTION zero()

/**
* Performs the computation for `kernelRempio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {Collection} y - output result in an array of double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/pi`
* @param {integer} q0 - the corresponding exponent of `q[0]` (the exponent for `q[i]` would be `q0-24*i`)
* @param {integer} jk - `jk+1` is the initial number of terms of `IPIO2[]` needed in the computation
* @param {integer} jv - index for pointing to the suitable `ipio2[]` for the computation
* @param {integer} jx - `nx - 1`
* @param {Array<number>} f - `IPIO2[]` in floating point
* @returns {number} last three binary digits of `N`
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f ) {
	var carry;
	var fw;
	var ih;
	var jp;
	var i;
	var k;
	var n;
	var j;
	var z;

	// `jp+1` is the number of terms in `PIO2[]` needed:
	jp = jk;

	// Distill `q[]` into `IQ[]` in reverse order...
	z = q[ jz ];
	j = jz;
	// eslint-disable-next-line no-plusplus
	for ( i = 0; j > 0; i++, j-- ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
	}
	// Compute `n`...
	z = ldexp( z, q0 );
	z -= 8.0 * floor( z*0.125 ); // Trim off integer >= 8
	n = z|0;
	z -= n;
	ih = 0;
	if ( q0 > 0 ) {
		// Need `IQ[jz-1]` to determine `n`...
		i = ( IQ[ jz-1 ] >> (24-q0) );
		n += i;
		IQ[ jz-1 ] -= ( i << (24-q0) );
		ih = ( IQ[ jz-1 ] >> (23-q0) );
	}
	else if ( q0 === 0 ) {
		ih = ( IQ[ jz-1 ] >> 23 );
	}
	else if ( z >= 0.5 ) {
		ih = 2;
	}
	// Case: q > 0.5
	if ( ih > 0 ) {
		n += 1;
		carry = 0;

		// Compute `1-q`:
		for ( i = 0; i < jz; i++ ) {
			j = IQ[ i ];
			if ( carry === 0 ) {
				if ( j !== 0 ) {
					carry = 1;
					IQ[ i ] = 0x1000000 - j;
				}
			} else {
				IQ[ i ] = 0xffffff - j;
			}
		}
		if ( q0 > 0 ) {
			// Rare case: chance is 1 in 12...
			switch ( q0 ) { // eslint-disable-line default-case
			case 1:
				IQ[ jz-1 ] &= 0x7fffff;
				break;
			case 2:
				IQ[ jz-1 ] &= 0x3fffff;
				break;
			}
		}
		if ( ih === 2 ) {
			z = 1.0 - z;
			if ( carry !== 0 ) {
				z -= ldexp( 1.0, q0 );
			}
		}
	}
	// Check if re-computation is needed...
	if ( z === 0.0 ) {
		j = 0;
		for ( i = jz-1; i >= jk; i-- ) {
			j |= IQ[ i ];
		}
		if ( j === 0 ) {
			// Need re-computation...
			for ( k = 1; IQ[ jk-k ] === 0; k++ ) {
				// `k` is the number of terms needed...
			}
			for ( i = jz+1; i <= jz+k; i++ ) {
				// Add `q[jz+1]` to `q[jz+k]`...
				f[ jx+i ] = IPIO2[ jv+i ];
				fw = 0.0;
				for ( j = 0; j <= jx; j++ ) {
					fw += x[ j ] * f[ jx + (i-j) ];
				}
				q[ i ] = fw;
			}
			jz += k;
			return compute( x, y, jz, q, q0, jk, jv, jx, f );
		}
	}
	// Chop off zero terms...
	if ( z === 0.0 ) {
		jz -= 1;
		q0 -= 24;
		while ( IQ[ jz ] === 0 ) {
			jz -= 1;
			q0 -= 24;
		}
	} else {
		// Break `z` into 24-bit if necessary...
		z = ldexp( z, -q0 );
		if ( z >= TWO24 ) {
			fw = (TWON24*z)|0;
			IQ[ jz ] = ( z - (TWO24*fw) )|0;
			jz += 1;
			q0 += 24;
			IQ[ jz ] = fw;
		} else {
			IQ[ jz ] = z|0;
		}
	}
	// Convert integer "bit" chunk to floating-point value...
	fw = ldexp( 1.0, q0 );
	for ( i = jz; i >= 0; i-- ) {
		q[ i ] = fw * IQ[i];
		fw *= TWON24;
	}
	// Compute `PIO2[0,...,jp]*q[jz,...,0]`...
	for ( i = jz; i >= 0; i-- ) {
		fw = 0.0;
		for ( k = 0; k <= jp && k <= jz-i; k++ ) {
			fw += PIO2[ k ] * q[ i+k ];
		}
		FQ[ jz-i ] = fw;
	}
	// Compress `FQ[]` into `y[]`...
	fw = 0.0;
	for ( i = jz; i >= 0; i-- ) {
		fw += FQ[ i ];
	}
	if ( ih === 0 ) {
		y[ 0 ] = fw;
	} else {
		y[ 0 ] = -fw;
	}
	fw = FQ[ 0 ] - fw;
	for ( i = 1; i <= jz; i++ ) {
		fw += FQ[i];
	}
	if ( ih === 0 ) {
		y[ 1 ] = fw;
	} else {
		y[ 1 ] = -fw;
	}
	return ( n & 7 );
} // end FUNCTION compute()


// MAIN //

/**
* Returns the last three binary digits of `N` with `y = x - N*pi/2` so that `|y| < pi/2`.
*
* ## Method
*
* * The method is to compute the integer (mod 8) and fraction parts of `(2/pi)*x` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals 0 mod 8 ). Thus, the number of operations is independent of the exponent of the input.
*
* @private
* @param {PositiveNumber} x - input value
* @param {Collection} y - output result in an array of double precision numbers
* @param {PositiveInteger} e0 - the exponent of `x[0]` (must be <= 16360)
* @param {PositiveInteger} nx - dimension of `x[]`
* @returns {number} last three binary digits of `N`
*/
function kernelRempio2( x, y, e0, nx ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var m;

	// Initialize `jk` for double-precision floating-point numbers:
	jk = 4;

	// Determine `jx`, `jv`, `q0` (note that `q0 < 3`):
	jx = nx - 1;
	jv = ( (e0 - 3) / 24 )|0;
	if ( jv < 0 ) {
		jv = 0;
	}
	q0 = e0 - (24 * (jv + 1));

	// Set up `F[0]` to `F[jx+jk]` where `F[jx+jk] = IPIO2[jv+jk]`:
	j = jv - jx;
	m = jx + jk;
	// eslint-disable-next-line no-plusplus
	for ( i = 0; i <= m; i++, j++ ) {
		if ( j < 0 ) {
			F[ i ] = 0.0;
		} else {
			F[ i ] = IPIO2[ j ];
		}
	}
	// Compute `Q[0],Q[1],...,Q[jk]`:
	for ( i = 0; i <= jk; i++ ) {
		fw = 0.0;
		for ( j = 0; j <= jx; j++ ) {
			fw += x[ j ] * F[ jx + (i-j) ];
		}
		Q[ i ] = fw;
	}
	jz = jk;
	return compute( x, y, jz, Q, q0, jk, jv, jx, F );
} // end FUNCTION kernelRempio2()


// EXPORTS //

module.exports = kernelRempio2;

},{"@stdlib/math/base/special/floor":19,"@stdlib/math/base/special/ldexp":24}],30:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*
* Optimized by Bruce D. Evans.
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
var rempio2Kernel = require( './kernel_rempio2.js' );
var rempio2Medium = require( './rempio2_medium.js' );


// VARIABLES //

var ZERO = 0.00000000000000000000e+00;    // 0x00000000, 0x00000000
var TWO24 = 1.67772160000000000000e+07;   // 0x41700000, 0x00000000

// 33 bits of PI/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = PI/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331
var TWO_PIO2_1T = 2.0 * PIO2_1T;
var THREE_PIO2_1T = 3.0 * PIO2_1T;
var FOUR_PIO2_1T = 4.0 * PIO2_1T;

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff;

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000;

// High word significand mask: 0xfffff = 1048575 => 00000000000011111111111111111111
var SIGNIFICAND_MASK = 0xfffff;

// High word significand for PI and PI/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb;

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb;

// High word for 3*PI/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c;

// High word for 5*PI/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a;

// High word for 6*PI/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c;

// High word for 7*PI/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc;

// High word for 8*PI/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb;

// High word for 9*PI/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b;

// 2^20*pi/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb;

// Arrays for storing temporary values (note that, in C, this would not be thread-safe):
var TX = new Array( 3 );
var TY = new Array( 2 );


// MAIN //

/**
* Computes `x - n*pi/2 = r`.
*
* ## Notes
*
* * Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
* * The function does not perform input validation for `y` due to performance considerations. You should ensure to only supply an array, typed array, or an array-like object for `y`.
*
*
* @param {number} x - input value
* @param {Collection} y - remainder elements
* @returns {integer} factor of `pi/2`
*
* @example
* var x = 128.0;
* var y = new Array( 2 );
* var n = rempio2( x, y );
* // returns 81.0
*
* var y1 = y[ 0 ];
* // returns ~0.765
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*
* @example
* var y = new Array( 2 );
* var n = rempio2( NaN, y );
* // returns 0.0
*
* var y1 = y[ 0 ];
* // returns NaN
* var y2 = y[ 1 ];
* // returns NaN
*/
function rempio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var i;
	var n;
	var z;

	hx = getHighWord( x );
	ix = hx & ABS_MASK;

	// Case: |x| ~<= pi/4 (no need for reduction)
	if ( ix <= PIO4_HIGH_WORD ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}
	// Case: |x| ~<= 5pi/4
	if ( ix <= FIVE_PIO4_HIGH_WORD ) {
		// Case: |x| ~= pi/2 or pi
		if ( (ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND ) {
			// Cancellation => use medium case
			return rempio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3pi/4
		if ( ix <= THREE_PIO4_HIGH_WORD ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = (z - y[0]) - PIO2_1T;
				return 1;
			}
			z = x + PIO2_1;
			y[ 0 ] = z + PIO2_1T;
			y[ 1 ] = (z - y[0]) + PIO2_1T;
			return -1;
		}
		if ( x > 0.0 ) {
			z = x - ( 2.0*PIO2_1 );
			y[ 0 ] = z - TWO_PIO2_1T;
			y[ 1 ] = (z - y[0]) - TWO_PIO2_1T;
			return 2;
		}
		z = x + ( 2.0*PIO2_1 );
		y[ 0 ] = z + TWO_PIO2_1T;
		y[ 1 ] = (z - y[0]) + TWO_PIO2_1T;
		return -2;
	}
	// Case: |x| ~<= 9pi/4
	if ( ix <= NINE_PIO4_HIGH_WORD ) {
		// Case: |x| ~<= 7pi/4
		if ( ix <= SEVEN_PIO4_HIGH_WORD ) {
			// Case: |x| ~= 3pi/2
			if ( ix === THREE_PIO2_HIGH_WORD ) {
				return rempio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - ( 3.0*PIO2_1 );
				y[ 0 ] = z - THREE_PIO2_1T;
				y[ 1 ] = (z - y[0]) - THREE_PIO2_1T;
				return 3;
			}
			z = x + ( 3.0*PIO2_1 );
			y[ 0 ] = z + THREE_PIO2_1T;
			y[ 1 ] = (z - y[0]) + THREE_PIO2_1T;
			return -3;
		}
		// Case: |x| ~= 4pi/2
		if ( ix === TWO_PI_HIGH_WORD ) {
			return rempio2Medium( x, ix, y );
		}
		if ( x > 0.0 ) {
			z = x - ( 4.0*PIO2_1 );
			y[ 0 ] = z - FOUR_PIO2_1T;
			y[ 1 ] = (z - y[0]) - FOUR_PIO2_1T;
			return 4;
		}
		z = x + ( 4.0*PIO2_1 );
		y[ 0 ] = z + FOUR_PIO2_1T;
		y[ 1 ] = (z - y[0]) + FOUR_PIO2_1T;
		return -4;
	}
	// Case: |x| ~< 2^20*pi/2 (medium size)
	if ( ix < MEDIUM ) {
		return rempio2Medium( x, ix, y );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		y[ 0 ] = NaN;
		y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|, ilogb(x)-23)...
	low = getLowWord( x );
	e0 = (ix >> 20) - 1046; // `e0 = ilogb(z) - 23` => unbiased exponent minus 23
	z = fromWords( ix - ((e0 << 20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		TX[ i ] = z|0;
		z = (z - TX[i]) * TWO24;
	}
	TX[ 2 ] = z;
	nx = 3;
	while ( TX[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx -= 1;
	}
	n = rempio2Kernel( TX, TY, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -TY[ 0 ];
		y[ 1 ] = -TY[ 1 ];
		return -n;
	}
	y[ 0 ] = TY[ 0 ];
	y[ 1 ] = TY[ 1 ];
	return n;
} // end FUNCTION rempio2()


// EXPORTS //

module.exports = rempio2;

},{"./kernel_rempio2.js":29,"./rempio2_medium.js":31,"@stdlib/math/base/utils/float64-from-words":52,"@stdlib/math/base/utils/float64-get-high-word":56,"@stdlib/math/base/utils/float64-get-low-word":58}],31:[function(require,module,exports){
'use strict';

/*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var round = require( '@stdlib/math/base/special/round' );
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );


// VARIABLES //

// 53 bits of 2/PI:
var INVPIO2 = 6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883

// First 33 bits of PI/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = PI/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331

// Another 33 bits of PI/2:
var PIO2_2 = 6.07710050630396597660e-11;  // 0x3DD0B461, 0x1A600000

// PIO2_2T = PI/2 - ( PIO2_1 + PIO2_2 ):
var PIO2_2T = 2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073

// Another 33 bits of PI/2:
var PIO2_3 = 2.02226624871116645580e-21;  // 0x3BA3198A, 0x2E000000

// PIO2_3T = PI/2 - ( PIO2_1 + PIO2_2 + PIO2_3 ):
var PIO2_3T = 8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Exponent mask (2047 => 0x7ff):
var EXPONENT_MASK = 0x7ff;


// MAIN //

/**
* Computes `x - n*pi/2 = r` for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {uint32} ix - high word of `x`
* @param {Collection} y - remainder elements
* @returns {integer} factor of `pi/2`
*/
function rempio2Medium( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - ( n * PIO2_1 );
	w = n * PIO2_1T;

	// First rounding (good to 85 bits)...
	j = ix >> 20;
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high >> 20) & EXPONENT_MASK );

	// Check if a second iteration is needed (good to 118 bits)...
	if ( i > 16 ) {
		t = r;
		w = n * PIO2_2;
		r = t - w;
		w = (n * PIO2_2T) - ((t-r) - w);
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high >> 20) & EXPONENT_MASK );

		// Check if a third iteration is needed (151 bits accumulated)...
		if ( i > 49 ) {
			t = r;
			w = n * PIO2_3;
			r = t - w;
			w = (n * PIO2_3T) - ((t-r) - w);
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = (r - y[0]) - w;
	return n;
} // end FUNCTION rempio2Medium()


// EXPORTS //

module.exports = rempio2Medium;

},{"@stdlib/math/base/special/round":32,"@stdlib/math/base/utils/float64-get-high-word":56}],32:[function(require,module,exports){
'use strict';

// TODO: implementation

/**
* Round a numeric value to the nearest integer.
*
* @module @stdlib/math/base/special/round
*
* @example
* var round = require( '@stdlib/math/base/special/round' );
*
* var v = round( -4.2 );
* // returns -4.0
*
* v = round( -4.5 );
* // returns -4.0
*
* v = round( -4.6 );
* // returns -5.0
*
* v = round( 9.99999 );
* // returns 10.0
*
* v = round( 9.5 );
* // returns 10.0
*
* v = round( 9.2 );
* // returns 9.0
*
* v = round( 0.0 );
* // returns 0.0
*
* v = round( -0.0 );
* // returns -0.0
*
* v = round( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* v = round( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":33}],33:[function(require,module,exports){
'use strict';

// TODO: implementation

/**
* Rounds a numeric value to the nearest integer.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = round( -4.2 );
* // returns -4.0
*
* @example
* var v = round( -4.5 );
* // returns -4.0
*
* @example
* var v = round( -4.6 );
* // returns -5.0
*
* @example
* var v = round( 9.99999 );
* // returns 10.0
*
* @example
* var v = round( 9.5 );
* // returns 10.0
*
* @example
* var v = round( 9.2 );
* // returns 9.0
*
* @example
* var v = round( 0.0 );
* // returns 0.0
*
* @example
* var v = round( -0.0 );
* // returns -0.0
*
* @example
* var v = round( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = round( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round;


// EXPORTS //

module.exports = round;

},{}],34:[function(require,module,exports){
'use strict';

/**
* Compute the sine and cosine integrals.
*
* @module @stdlib/math/base/special/sici
*
* @example
* var sici = require( '@stdlib/math/base/special/sici' );
*
* var v = sici( 3.0 );
* // returns [ ~1.849, ~0.12 ]
*
* v = sici( 0.0 );
* // returns [ 0.0, Number.NEGATIVE_INFINITY ]
*
* v = sici( -9.0 );
* // returns [ ~-1.665, ~0.055 ]
*
* v = sici( NaN );
* // returns [ NaN, NaN ]
*/

// MODULES //

var sici = require( './sici.js' );


// EXPORTS //

module.exports = sici;

},{"./sici.js":35}],35:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes/}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* COPYRIGHT
*
* Cephes Math Library Release 2.1:  January, 1989
* Copyright 1984, 1987, 1989 by Stephen L. Moshier
*
*
* LICENSE
*
* The README [file]{@link http://netlib.sandia.gov/cephes/} reads:
*   > Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*   > The two known misprints in the book are repaired here in the source listings for the gamma function and the incomplete beta integral.
*   > Stephen L. Moshier
*   > moshier@na-net.ornl.gov
*/

// MODULES //

var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var ln = require( '@stdlib/math/base/special/ln' );
var HALF_PI = require( '@stdlib/math/constants/float64-half-pi' );
var GAMMA = require( '@stdlib/math/constants/float64-eulergamma' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// VARIABLES //

var SN = [
	1.00000000000000000302e0,
	-4.13470316229406538752e-2,
	9.76945438170435310816e-4,
	-9.75759303843632795789e-6,
	4.62591714427012837309e-8,
	-8.39167827910303881427e-11
];
var SD = [
	9.99999999999999996984e-1,
	1.42085239326149893930e-2,
	9.96412122043875552487e-5,
	4.41827842801218905784e-7,
	1.27997891179943299903e-9,
	2.03269266195951942049e-12
];
var CN = [
	-1.00000000000000000080e0,
	2.89159652607555242092e-2,
	-4.74007206873407909465e-4,
	3.59325051419993077021e-6,
	-1.35249504915790756375e-8,
	2.02524002389102268789e-11
];
var CD = [
	4.00000000000000000080e0,
	5.10028056236446052392e-2,
	3.17442024775032769882e-4,
	1.23210355685883423679e-6,
	3.06780997581887812692e-9,
	4.07746040061880559506e-12
];
var FN4 = [
	5.48900223421373614008e-7,
	1.08936580650328664411e-4,
	6.81020132472518137426e-3,
	1.67006611831323023771e-1,
	1.62083287701538329132e0,
	5.45937717161812843388e0,
	4.23612862892216586994e0
];
var FD4 = [
	5.48900252756255700982e-7,
	1.10034357153915731354e-4,
	7.01710668322789753610e-3,
	1.78792052963149907262e-1,
	1.86792257950184183883e0,
	7.30828822505564552187e0,
	8.16496634205391016773e0,
	1.00000000000000000000e0
];
var FN8 = [
	9.70507110881952024631e-14,
	9.41779576128512936592e-11,
	3.20092790091004902806e-8,
	4.86215430826454749482e-6,
	3.49556442447859055605e-4,
	1.16064229408124407915e-2,
	1.60300158222319456320e-1,
	7.13715274100146711374e-1,
	4.55880873470465315206e-1
];
var FD8 = [
	9.70507110881952025725e-14,
	9.43720590350276732376e-11,
	3.21956939101046018377e-8,
	4.92435064317881464393e-6,
	3.58696481881851580297e-4,
	1.22253594771971293032e-2,
	1.78685545332074536321e-1,
	9.17463611873684053703e-1,
	1.00000000000000000000e0
];
var GN4 = [
	7.82579040744090311069e-9,
	1.97963874140963632189e-6,
	1.61999794598934024525e-4,
	5.38868681462177273157e-3,
	7.48527737628469092119e-2,
	3.97180296392337498885e-1,
	6.11379109952219284151e-1,
	8.71001698973114191777e-2
];
var GD4 = [
	7.82579218933534490868e-9,
	2.02659182086343991969e-6,
	1.73221081474177119497e-4,
	6.22396345441768420760e-3,
	9.88771761277688796203e-2,
	6.66296701268987968381e-1,
	1.64402202413355338886e0,
	1.00000000000000000000e0
];
var GN8 = [
	3.14040098946363334640e-15,
	3.85945925430276600453e-12,
	1.70404452782044526189e-9,
	3.47131167084116673800e-7,
	3.48941165502279436777e-5,
	1.71718239052347903558e-3,
	3.84878767649974295920e-2,
	3.30410979305632063225e-1,
	6.97359953443276214934e-1
];
var GD8 = [
	3.14040098946363335242e-15,
	3.87830166023954706752e-12,
	1.72693748966316146736e-9,
	3.57043223443740838771e-7,
	3.68475504442561108162e-5,
	1.90284426674399523638e-3,
	4.67913194259625806320e-2,
	4.87852258695304967486e-1,
	1.68548898811011640017e0,
	1.00000000000000000000e0
];


// FUNCTIONS //

// Compile functions to evaluate polynomials based on the above coefficients...
var polyvalFN4 = evalpoly( FN4 );
var polyvalFD4 = evalpoly( FD4 );
var polyvalFN8 = evalpoly( FN8 );
var polyvalFD8 = evalpoly( FD8 );
var polyvalGN4 = evalpoly( GN4 );
var polyvalGD4 = evalpoly( GD4 );
var polyvalGN8 = evalpoly( GN8 );
var polyvalGD8 = evalpoly( GD8 );
var polyvalSN = evalpoly( SN );
var polyvalSD = evalpoly( SD );
var polyvalCN = evalpoly( CN );
var polyvalCD = evalpoly( CD );


// MAIN //

/**
* Computes the sine and cosine integrals.
*
* ## Method
*
* * The integrals are approximated by rational functions.
* * For \\( x > 8 \\), auxiliary functions \\( f(x) \\) and \\( g(x) \\) are employed such that
*
* ``` tex
* \operatorname{Ci}(x) = f(x) \sin(x) - g(x) \cos(x) \\
* \operatorname{Si}(x) = \pi/2 - f(x) \cos(x) - g(x) \sin(x)
* ```
*
* ## Notes
*
* * Absolute error on test interval \\( \[0,50\] \\), except relative when greater than \\( 1 \\):
*
*   | arithmetic | function    | # trials | peak    | rms     |
*   |:----------:|:-----------:|:--------:|:-------:|:-------:|
*   | IEEE       | Si          | 30000    | 4.4e-16 | 7.3e-17 |
*   | IEEE       | Ci          | 30000    | 6.9e-16 | 5.1e-17 |
*
*
* @param {number} x - input value
* @returns {NumberArray} two element array containing the sine and cosine integrals
*
* @example
* var v = sici( 3.0 );
* // returns [ ~1.849, ~0.12 ]
*
* @example
* var v = sici( 0.0 );
* // returns [ 0.0, Number.NEGATIVE_INFINITY ]
*
* @example
* var v = sici( -9.0 );
* // returns [ ~-1.665, ~0.055 ]
*
* @example
* var v = sici( NaN );
* // returns [ NaN, NaN ]
*/
function sici( x ) {
	var sgn;
	var si;
	var ci;
	var c;
	var f;
	var g;
	var s;
	var z;

	if ( isnan( x ) ) {
		return [ NaN, NaN ];
	}
	if ( x < 0.0 ) {
		sgn = -1;
		x = -x;
	} else {
		sgn = 0;
	}
	if ( x === 0.0 ) {
		return [ 0.0, NINF ];
	}
	if ( x > 1.0e9 ) {
		if ( isInfinite( x ) ) {
			if ( sgn === -1 ) {
				si = -HALF_PI;
				ci = NaN;
			} else {
				si = HALF_PI;
				ci = 0.0;
			}
			return [ si, ci ];
		}
		si = HALF_PI - ( cos( x ) / x );
		ci = sin( x ) / x;
	}
	if ( x > 4.0 ) {
		s = sin( x );
		c = cos( x );
		z = 1.0 / ( x*x );
		if ( x < 8.0 ) {
			f = polyvalFN4( z ) / ( x * polyvalFD4( z ) );
			g = z * polyvalGN4( z ) / polyvalGD4( z );
		} else {
			f = polyvalFN8( z ) / ( x * polyvalFD8( z ) );
			g = z * polyvalGN8( z ) / polyvalGD8( z );
		}
		si = HALF_PI - ( f*c ) - ( g*s );
		if ( sgn ) {
			si = -si;
		}
		ci = ( f*s ) - ( g*c );
		return [ si, ci ];
	}
	z = x * x;
	s = x * polyvalSN( z ) / polyvalSD( z );
	c = z * polyvalCN( z ) / polyvalCD( z );
	if ( sgn ) {
		s = -s;
	}
	si = s;
	ci = GAMMA + ln( x ) + c; // real part if x < 0
	return [ si, ci ];
} // end FUNCTION sici()


// EXPORTS //

module.exports = sici;

},{"@stdlib/math/base/assert/is-infinite":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/cos":17,"@stdlib/math/base/special/ln":26,"@stdlib/math/base/special/sin":44,"@stdlib/math/base/tools/evalpoly":48,"@stdlib/math/constants/float64-eulergamma":69,"@stdlib/math/constants/float64-half-pi":71,"@stdlib/math/constants/float64-ninf":76}],36:[function(require,module,exports){
module.exports={"x": [-5.0, -5.190380761523046, -5.380761523046092, -5.571142284569138, -5.761523046092185, -5.95190380761523, -6.142284569138276, -6.332665330661323, -6.5230460921843685, -6.713426853707415, -6.903807615230461, -7.094188376753507, -7.284569138276553, -7.474949899799599, -7.6653306613226455, -7.855711422845691, -8.046092184368737, -8.236472945891784, -8.42685370741483, -8.617234468937875, -8.807615230460922, -8.997995991983968, -9.188376753507015, -9.37875751503006, -9.569138276553106, -9.759519038076153, -9.949899799599198, -10.140280561122244, -10.330661322645291, -10.521042084168336, -10.711422845691382, -10.901803607214429, -11.092184368737474, -11.28256513026052, -11.472945891783567, -11.663326653306612, -11.85370741482966, -12.044088176352705, -12.23446893787575, -12.424849699398798, -12.615230460921843, -12.80561122244489, -12.995991983967937, -13.186372745490981, -13.376753507014028, -13.567134268537075, -13.75751503006012, -13.947895791583166, -14.138276553106213, -14.328657314629258, -14.519038076152304, -14.70941883767535, -14.899799599198397, -15.090180360721442, -15.280561122244489, -15.470941883767535, -15.66132264529058, -15.851703406813627, -16.04208416833667, -16.232464929859717, -16.422845691382765, -16.613226452905813, -16.803607214428858, -16.993987975951903, -17.184368737474948, -17.374749498997996, -17.56513026052104, -17.75551102204409, -17.945891783567134, -18.13627254509018, -18.326653306613224, -18.517034068136272, -18.70741482965932, -18.897795591182366, -19.08817635270541, -19.278557114228455, -19.4689378757515, -19.65931863727455, -19.849699398797597, -20.04008016032064, -20.230460921843687, -20.42084168336673, -20.61122244488978, -20.801603206412825, -20.991983967935873, -21.182364729458918, -21.372745490981963, -21.56312625250501, -21.753507014028056, -21.9438877755511, -22.13426853707415, -22.324649298597194, -22.51503006012024, -22.705410821643287, -22.895791583166332, -23.086172344689377, -23.276553106212425, -23.46693386773547, -23.657314629258515, -23.847695390781563, -24.03807615230461, -24.228456913827657, -24.4188376753507, -24.609218436873746, -24.799599198396795, -24.98997995991984, -25.180360721442884, -25.370741482965933, -25.561122244488978, -25.751503006012022, -25.94188376753507, -26.132264529058116, -26.32264529058116, -26.51302605210421, -26.703406813627254, -26.8937875751503, -27.084168336673347, -27.274549098196392, -27.464929859719437, -27.655310621242485, -27.84569138276553, -28.03607214428858, -28.226452905811623, -28.416833667334668, -28.607214428857716, -28.79759519038076, -28.987975951903806, -29.178356713426854, -29.3687374749499, -29.559118236472944, -29.749498997995993, -29.939879759519037, -30.130260521042082, -30.32064128256513, -30.511022044088175, -30.70140280561122, -30.89178356713427, -31.082164328657313, -31.272545090180362, -31.462925851703407, -31.65330661322645, -31.8436873747495, -32.034068136272545, -32.22444889779559, -32.41482965931864, -32.605210420841686, -32.79559118236473, -32.985971943887776, -33.17635270541082, -33.366733466933866, -33.55711422845691, -33.747494989979955, -33.937875751503, -34.12825651302605, -34.3186372745491, -34.50901803607214, -34.699398797595194, -34.88977955911824, -35.08016032064128, -35.27054108216433, -35.46092184368737, -35.65130260521042, -35.84168336673346, -36.03206412825651, -36.22244488977956, -36.412825651302605, -36.60320641282565, -36.7935871743487, -36.983967935871746, -37.17434869739479, -37.364729458917836, -37.55511022044088, -37.745490981963925, -37.93587174348697, -38.12625250501002, -38.31663326653307, -38.50701402805611, -38.69739478957916, -38.8877755511022, -39.07815631262525, -39.2685370741483, -39.45891783567134, -39.64929859719439, -39.83967935871743, -40.03006012024048, -40.22044088176353, -40.410821643286575, -40.60120240480962, -40.791583166332664, -40.98196392785571, -41.172344689378754, -41.362725450901806, -41.55310621242485, -41.743486973947896, -41.93386773547094, -42.124248496993985, -42.31462925851703, -42.50501002004008, -42.69539078156313, -42.88577154308617, -43.07615230460922, -43.26653306613226, -43.45691382765531, -43.64729458917836, -43.8376753507014, -44.02805611222445, -44.21843687374749, -44.40881763527054, -44.59919839679359, -44.789579158316634, -44.97995991983968, -45.170340681362724, -45.36072144288577, -45.551102204408814, -45.741482965931866, -45.93186372745491, -46.122244488977955, -46.312625250501, -46.503006012024045, -46.69338677354709, -46.88376753507014, -47.07414829659319, -47.26452905811623, -47.454909819639276, -47.64529058116232, -47.83567134268537, -48.02605210420842, -48.21643286573146, -48.40681362725451, -48.59719438877755, -48.7875751503006, -48.97795591182365, -49.168336673346694, -49.35871743486974, -49.549098196392784, -49.73947895791583, -49.92985971943887, -50.120240480961925, -50.31062124248497, -50.501002004008015, -50.69138276553106, -50.881763527054105, -51.07214428857716, -51.2625250501002, -51.452905811623246, -51.64328657314629, -51.833667334669336, -52.02404809619238, -52.21442885771543, -52.40480961923848, -52.59519038076152, -52.78557114228457, -52.97595190380761, -53.16633266533066, -53.35671342685371, -53.547094188376754, -53.7374749498998, -53.92785571142284, -54.11823647294589, -54.30861723446894, -54.498997995991985, -54.68937875751503, -54.879759519038075, -55.07014028056112, -55.260521042084164, -55.450901803607216, -55.64128256513026, -55.831663326653306, -56.02204408817635, -56.212424849699396, -56.40280561122244, -56.59318637274549, -56.78356713426854, -56.97394789579158, -57.16432865731463, -57.35470941883767, -57.545090180360724, -57.73547094188377, -57.92585170340681, -58.11623246492986, -58.3066132264529, -58.49699398797595, -58.687374749499, -58.877755511022045, -59.06813627254509, -59.258517034068134, -59.44889779559118, -59.639278557114224, -59.829659318637276, -60.02004008016032, -60.210420841683366, -60.40080160320641, -60.591182364729455, -60.78156312625251, -60.97194388777555, -61.1623246492986, -61.35270541082164, -61.54308617234469, -61.73346693386773, -61.92384769539078, -62.11422845691383, -62.30460921843687, -62.49498997995992, -62.68537074148296, -62.87575150300601, -63.06613226452906, -63.256513026052104, -63.44689378757515, -63.637274549098194, -63.82765531062124, -64.01803607214428, -64.20841683366734, -64.39879759519039, -64.58917835671343, -64.77955911823648, -64.96993987975952, -65.16032064128257, -65.35070140280561, -65.54108216432866, -65.7314629258517, -65.92184368737475, -66.11222444889779, -66.30260521042084, -66.49298597194388, -66.68336673346693, -66.87374749498997, -67.06412825651302, -67.25450901803606, -67.44488977955912, -67.63527054108216, -67.82565130260521, -68.01603206412825, -68.2064128256513, -68.39679358717436, -68.5871743486974, -68.77755511022045, -68.96793587174349, -69.15831663326654, -69.34869739478958, -69.53907815631263, -69.72945891783567, -69.91983967935872, -70.11022044088176, -70.3006012024048, -70.49098196392785, -70.6813627254509, -70.87174348697394, -71.06212424849699, -71.25250501002004, -71.44288577154309, -71.63326653306613, -71.82364729458918, -72.01402805611222, -72.20440881763527, -72.39478957915831, -72.58517034068136, -72.7755511022044, -72.96593186372745, -73.1563126252505, -73.34669338677355, -73.5370741482966, -73.72745490981964, -73.91783567134269, -74.10821643286573, -74.29859719438878, -74.48897795591182, -74.67935871743487, -74.86973947895791, -75.06012024048096, -75.250501002004, -75.44088176352706, -75.6312625250501, -75.82164328657315, -76.0120240480962, -76.20240480961924, -76.39278557114228, -76.58316633266533, -76.77354709418837, -76.96392785571142, -77.15430861723446, -77.34468937875751, -77.53507014028055, -77.72545090180361, -77.91583166332666, -78.1062124248497, -78.29659318637275, -78.48697394789579, -78.67735470941884, -78.86773547094188, -79.05811623246493, -79.24849699398797, -79.43887775551102, -79.62925851703406, -79.81963927855712, -80.01002004008016, -80.20040080160321, -80.39078156312625, -80.5811623246493, -80.77154308617234, -80.96192384769539, -81.15230460921843, -81.34268537074148, -81.53306613226452, -81.72344689378757, -81.91382765531063, -82.10420841683367, -82.29458917835672, -82.48496993987976, -82.6753507014028, -82.86573146292585, -83.0561122244489, -83.24649298597194, -83.43687374749499, -83.62725450901803, -83.81763527054107, -84.00801603206412, -84.19839679358718, -84.38877755511022, -84.57915831663327, -84.76953907815631, -84.95991983967936, -85.1503006012024, -85.34068136272545, -85.53106212424849, -85.72144288577154, -85.91182364729458, -86.10220440881763, -86.29258517034069, -86.48296593186373, -86.67334669338678, -86.86372745490982, -87.05410821643287, -87.24448897795591, -87.43486973947896, -87.625250501002, -87.81563126252505, -88.00601202404809, -88.19639278557113, -88.38677354709418, -88.57715430861724, -88.76753507014028, -88.95791583166333, -89.14829659318637, -89.33867735470942, -89.52905811623246, -89.71943887775551, -89.90981963927855, -90.1002004008016, -90.29058116232464, -90.48096192384769, -90.67134268537075, -90.86172344689379, -91.05210420841684, -91.24248496993988, -91.43286573146293, -91.62324649298597, -91.81362725450902, -92.00400801603206, -92.1943887775551, -92.38476953907815, -92.5751503006012, -92.76553106212425, -92.9559118236473, -93.14629258517034, -93.33667334669339, -93.52705410821643, -93.71743486973948, -93.90781563126252, -94.09819639278557, -94.28857715430861, -94.47895791583166, -94.6693386773547, -94.85971943887775, -95.0501002004008, -95.24048096192385, -95.4308617234469, -95.62124248496994, -95.81162324649299, -96.00200400801603, -96.19238476953907, -96.38276553106212, -96.57314629258516, -96.76352705410821, -96.95390781563125, -97.14428857715431, -97.33466933867736, -97.5250501002004, -97.71543086172345, -97.90581162324649, -98.09619238476954, -98.28657314629258, -98.47695390781563, -98.66733466933867, -98.85771543086172, -99.04809619238476, -99.23847695390782, -99.42885771543087, -99.61923847695391, -99.80961923847696, -100.0], "si": [-1.549931244944674, -1.5153108702529772, -1.4850797438003784, -1.4599872237264009, -1.4405643427676107, -1.4271215631851475, -1.4197527927038536, -1.418345347149439, -1.4225953806203733, -1.4320281568490687, -1.4460224100049486, -1.4638379429558177, -1.484645538497189, -1.5075582159555305, -1.5316628526148013, -1.5560512064106455, -1.579849422167846, -1.6022451763368937, -1.6225117119310617, -1.6400281326946353, -1.6542954593865427, -1.6649480969406505, -1.6717605143702674, -1.6746490946883694, -1.6736692649053726, -1.6690081616067163, -1.6609732212890784, -1.649977202589475, -1.6365202463934316, -1.6211696568471476, -1.6045381395620761, -1.5872612616238058, -1.5699749010566038, -1.5532934316237261, -1.5377893435226075, -1.5239749336573185, -1.5122866133878334, -1.503072280174477, -1.4965820860083554, -1.4929628139143238, -1.4922559482845057, -1.494399399544296, -1.4992327227723323, -1.5065055572683155, -1.5158889132161801, -1.5269888455951546, -1.5393619868669954, -1.552532360609909, -1.5660088693991578, -1.5793028423691073, -1.5919450408422136, -1.6035015532997827, -1.613588062273312, -1.621882033345657, -1.628132457756552, -1.6321668720880784, -1.6338954778442114, -1.6333122869333292, -1.6304933225496634, -1.6255920052234207, -1.6188319475386432, -1.6104974651554005, -1.6009221836523062, -1.590476178124769, -1.5795521237623176, -1.5685509596912557, -1.5578675747178603, -1.547877012364455, -1.5389216644743482, -1.5312998789519696, -1.525256349690606, -1.520974587650193, -1.5185716939662361, -1.518095571744744, -1.5195246258344643, -1.5227699124295566, -1.5276796158557728, -1.5340456511916383, -1.541612121085566, -1.5500852955296858, -1.5591447363146689, -1.568455154826463, -1.5776785736602073, -1.5864863595953045, -1.5945707076426832, -1.60165518246576, -1.6075039633279726, -1.6119294902293968, -1.6147982700824037, -1.616034670357114, -1.6156226010969097, -1.613605061927327, -1.610081605985819, -1.6052038449684354, -1.5991691862511481, -1.592213052056154, -1.584599879958104, -1.5766132420891985, -1.5685454460482284, -1.5606869930394935, -1.5533162679233534, -1.5466898218808627, -1.5410335819651313, -1.5365352840410977, -1.5333383779926308, -1.5315375984135529, -1.5311763323648064, -1.5322458504207137, -1.53468640048904, -1.5383900981339669, -1.543205484652454, -1.548943567101062, -1.5553851047706928, -1.5622888659056764, -1.5694005480681383, -1.576462036386647, -1.583220666521142, -1.5894381636260484, -1.594898944584492, -1.5994174976016453, -1.6028445897964931, -1.6050720983026205, -1.6060363118895704, -1.6057196063450587, -1.6041504557707928, -1.6014018014282574, -1.597587857719469, -1.5928594892757009, -1.5873983420794076, -1.5814099534007333, -1.5751160987001998, -1.5687466574597941, -1.5625312934321656, -1.5566912476900077, -1.5514315351422883, -1.5469338172623133, -1.543350196401555, -1.5407981413244087, -1.539356710856986, -1.5390641943935466, -1.5399172362155595, -1.5418714570271792, -1.5448435327142458, -1.548714638981605, -1.55333512301145, -1.5585302212533056, -1.5641066073315393, -1.569859527005807, -1.5755802590117773, -1.5810636319856433, -1.586115328736472, -1.5905587197301982, -1.5942409873066061, -1.5970383300688502, -1.5988600719826773, -1.5996515416754755, -1.5993956327160985, -1.5981130036300246, -1.5958609253280476, -1.592730831752292, -1.5888446751693563, -1.584350229071856, -1.5794155176533429, -1.5742225800754426, -1.5689607992800734, -1.5638200382278515, -1.558983830785796, -1.5546228699786127, -1.5508890232086592, -1.5479100828936037, -1.5457854326016909, -1.544582774264273, -1.5443360227029217, -1.5450444309725446, -1.5466729654473552, -1.5491539047684686, -1.5523895933281044, -1.5562562394197714, -1.560608611952335, -1.5652854589575453, -1.570115447054478, -1.5749234043647788, -1.5795366406231388, -1.5837911176348254, -1.5875372507405283, -1.590645137214539, -1.5930090299286161, -1.594550903295558, -1.595222992382612, -1.5950092238995446, -1.59392549813464, -1.5920188223709566, -1.5893653373760146, -1.5860673177595277, -1.582249262953971, -1.5780532270377037, -1.5736335615074173, -1.5691512645416938, -1.5647681426439162, -1.560640995432612, -1.5569160316518849, -1.5537237143664697, -1.5511742162105933, -1.549353642148301, -1.5483211483658084, -1.5481070527303022, -1.5487119959369675, -1.5501071743506016, -1.5522356270068294, -1.5550145216511546, -1.5583383493967025, -1.5620829058154708, -1.566109909148836, -1.5702720847617857, -1.5744185296963067, -1.5784001626963136, -1.5820750636268694, -1.5853135117884198, -1.5880025449756392, -1.5900498797536986, -1.5913870576057434, -1.5919717104346305, -1.5917888713113169, -1.590851291164078, -1.5891987580332403, -1.5868964512813104, -1.5840323974702812, -1.5807141262801727, -1.5770646527336776, -1.573217935142845, -1.569313975813618, -1.565493743045217, -1.5618940979795617, -1.5586429082614737, -1.5558545223710645, -1.553625764225041, -1.5520325877711239, -1.5511275065731784, -1.5509378847257784, -1.5514651439012164, -1.552684908070019, -1.5545480736514774, -1.556982759757068, -1.559897061966718, -1.5631825048298151, -1.5667180639993274, -1.5703746094288922, -1.5740196070517243, -1.5775219082786542, -1.5807564547469517, -1.583608730045407, -1.5859788004359805, -1.5877848024762726, -1.5889657563111426, -1.5894836084630104, -1.5893244362810228, -1.588498776771156, -1.587041074211653, -1.5850082726178307, -1.582477609622902, -1.579543696602042, -1.5763149948883017, -1.5729098188368669, -1.5694520125676379, -1.5660664579123889, -1.562874576065348, -1.559989984545846, -1.5575144644006156, -1.5555343803802244, -1.5541176795934735, -1.5533115725271214, -1.5531409751205536, -1.5536077627334535, -1.5546908573555485, -1.556347139349398, -1.558513145471605, -1.5611074869408674, -1.5640338959059281, -1.567184786707335, -1.570445200588897, -1.57369698960644, -1.5768230878344447, -1.5797117158255274, -1.5822603676748859, -1.58437943882412, -1.5859953665566362, -1.5870531734621347, -1.5875183262942556, -1.5873778477944434, -1.5866406462851141, -1.5853370561561126, -1.5835176107571916, -1.5812510966467612, -1.578621963654861, -1.575727187892964, -1.5726727038887771, -1.5695695367797358, -1.5665297754614265, -1.5636625324287596, -1.5610700356261187, -1.5588439919853636, -1.5570623517117188, -1.5557865871887637, -1.5550595811879715, -1.5549041965984127, -1.5553225749648347, -1.5562961846469905, -1.5577866123495632, -1.559737065095436, -1.5620745243808116, -1.5647124711603315, -1.5675540802796148, -1.570495766702571, -1.5734309539334492, -1.5762539278124026, -1.5788636365998974, -1.5811673010119027, -1.583083705496509, -1.5845460542511454, -1.5855042918028583, -1.5859268078021596, -1.5858014682814305, -1.585135940174166, -1.5839573014886872, -1.5823109552540124, -1.5802588902816592, -1.577877355024468, -1.5752540315370502, -1.5724848140219296, -1.5696703100713367, -1.5669121920190914, -1.5643095304900971, -1.5619552421346732, -1.5599327786915245, -1.558313175136967, -1.5571525611115096, -1.5564902225785893, -1.5563472804036718, -1.5567260299899206, -1.557609962092024, -1.558964460323452, -1.5607381465617312, -1.5628648223132795, -1.5652659329491363, -1.5678534633148433, -1.5705331581984456, -1.5732079500315803, -1.5757814693781154, -1.5781615114549643, -1.5802633341894055, -1.5820126700409667, -1.5833483447382746, -1.5842244107874577, -1.5846117215501112, -1.5844988922036136, -1.5838926162337974, -1.582817329457203, -1.5813142370828632, -1.579439742155781, -1.5772633350587297, -1.5748650228266585, -1.5723323931746491, -1.5697574207907827, -1.5672331321626498, -1.5648502496974024, -1.5626939360204084, -1.560840755114521, -1.5593559585647598, -1.5582911929248984, -1.5576827085830034, -1.5575501320518372, -1.557895843024773, -1.5587049755694466, -1.559946040276555, -1.5615721418539832, -1.5635227453585026, -1.565725924749274, -1.5681010104219706, -1.5705615384393394, -1.5730183937996507, -1.5753830336341221, -1.5775706739107693, -1.5795033251080242, -1.5811125683185479, -1.5823419731161301, -1.5831490718924637, -1.5835068217479216, -1.5834045037976234, -1.582848030244112, -1.5818596510256757, -1.5804770734982694, -1.5787520296695725, -1.5767483452212685, -1.5745395822273545, -1.5722063424763058, -1.5698333301064316, -1.5675062804574074, -1.5653088663491714, -1.5633196932854783, -1.561609491352131, -1.5602386039921998, -1.5592548626834821, -1.5586919222351312, -1.5585681144902526, -1.5588858592906034, -1.5596316513187032, -1.5607766206159093, -1.562277643933934, -1.5640789643536765, -1.5661142585044545, -1.5683090748825996, -1.5705835537601174, -1.5728553294468917, -1.5750425095586764, -1.5770666236512874, -1.5788554351740949, -1.580345516098176, -1.58148449257469, -1.582232882237122, -1.582565458821191, -1.5824720970839763, -1.5819580699262632, -1.5810437894711216, -1.5797640039089034, -1.5781664814614877, -1.5763102311457389, -1.5742633264736459, -1.5721004122304958, -1.5698999855295825, -1.5677415500674157, -1.5657027466338291, -1.5638565633338644, -1.5622687256547205, -1.5609953595972692, -1.5600810108521228, -1.55955708981801, -1.5594407966224781, -1.5597345627851378, -1.5604260274005424, -1.5614885463920012, -1.5628822141971987, -1.5645553588815795, -1.566446454793515, -1.5684863820776542, -1.5706009501732607, -1.572713593270461, -1.574748139895748, -1.5766315565434277, -1.57829656662811, -1.5796840509407029, -1.5807451440550166, -1.5814429524424587, -1.5817538339884256, -1.5816681946532218, -1.5811907755960808, -1.580340422544024, -1.579149347869553, -1.5776619140690065, -1.5759329844525358, -1.5740259022553273, -1.5720101725106475, -1.5699589314251206, -1.5679462953021874, -1.5660446850205587, -1.5643222225618507, -1.5628402930919925, -1.5616513597563602, -1.5607971088908943, -1.5603069911339316, -1.56019720939716, -1.5604701883513505, -1.5611145425975173, -1.5621055426611854, -1.5634060600180604, -1.5649679551787217, -1.5667338570436378, -1.5686392678518972, -1.5706149165799255, -1.572589275003402, -1.5744911451166232, -1.576252224394985, -1.5778095565545793, -1.579107779952633, -1.5801010934089763, -1.5807548697244787, -1.581046860138304, -1.5809679479252887, -1.5805224257412265, -1.5797277885809347, -1.5786140516968064, -1.5772226199037476, -1.5756047507564244, -1.5738196685521966, -1.5719323984731366, -1.5700113999960976, -1.5681260856272268, -1.5663443148182, -1.56472995347092, -1.5633405867280965, -1.5622254668890563], "ci": [-0.1900297496566439, -0.1761132088998822, -0.15662448700257026, -0.13263104744022836, -0.1052737270421524, -0.07572788710100596, -0.04516557896078838, -0.014719711429420024, 0.014548865083133203, 0.0416805431698791, 0.06584172145483987, 0.08634459917744722, 0.10266161315325278, 0.1144342945631242, 0.12147649318157047, 0.12377208494384244, 0.12146743995536226, 0.11485907728236913, 0.1043770657196301, 0.0905648423999146, 0.07405621048777625, 0.05555034097486501, 0.03578564030229997, 0.015513354594425731, -0.004528237002618521, -0.0236382318666052, -0.04117537702780445, -0.056577556820667854, -0.0693779544458781, -0.07921746964110045, -0.0858531076093665, -0.0891621929785419, -0.0891424023044073, -0.08590774497851915, -0.07968075105358373, -0.07078124148059908, -0.05961215804652174, -0.04664301395335911, -0.032391589181322365, -0.01740453593256397, -0.00223757771028973, 0.012564019133303048, 0.026484049579097398, 0.03905244600948211, 0.04986028915770902, 0.05857230002766899, 0.06493645511822171, 0.06879047320189129, 0.0700650337654414, 0.06878370116795252, 0.06505964076596152, 0.059089319984715054, 0.0511434851243263, 0.04155579048952385, 0.03070952759312301, 0.01902295661851673, 0.0069337785483330125, -0.00511669647234304, -0.016699131059729113, -0.02741096020395763, -0.03688991455787207, -0.044825828017827044, -0.05097035871084521, -0.05514433226943713, -0.0572425043757162, -0.05723563282658731, -0.05516984453063764, -0.05116337660933652, -0.045400859961649595, -0.038125395296577894, -0.029628743086958082, -0.020240007889774616, -0.010313242218402583, -0.00021442436461058083, 0.00969172246943194, 0.01905460580948669, 0.027549889829728186, 0.034890461535598764, 0.04083587524036979, 0.04519997310384816, 0.04785644865777804, 0.048742196264035406, 0.04785836959078141, 0.045269153603588304, 0.041098334410978876, 0.03552382683495233, 0.02877038824823881, 0.021100806760655524, 0.012805900328569701, 0.004193699298630829, -0.004421792767148349, -0.012731856962037949, -0.02044393862110318, -0.027291771470003272, -0.033044401884204225, -0.037513813042345044, -0.04056090280468527, -0.04209963096847259, -0.04209921886860582, -0.040584354668406056, -0.037633428615170425, -0.0333748915293748, -0.027981894469573936, -0.021665425667140893, -0.014666210515238986, -0.0072456800073429795, 0.0003236586900408193, 0.007768099706979413, 0.01482251056255857, 0.021239654355412703, 0.02679873842442972, 0.03131289784847401, 0.034635363971839514, 0.03666411817552049, 0.03734488749129916, 0.036672399306745734, 0.034689875142820445, 0.03148680606614682, 0.027195112524341546, 0.021983847175738713, 0.01605264871848188, 0.009624196150191474, 0.002935944953064427, -0.0037685516082300997, -0.010248422197935342, -0.01627404479900792, -0.02163510007222039, -0.02614783112103067, -0.02966126185340836, -0.03206216625371776, -0.033278627845292834, -0.03328208069322549, -0.03208777856416136, -0.029753695332816504, -0.026377915392176314, -0.022094625727093684, -0.017068869611341023, -0.011490263932405993, -0.0055659165231820434, 0.00048719454061077233, 0.006450101735884156, 0.012109705107153592, 0.01726632583924666, 0.0217406908143503, 0.02538010593215444, 0.028063607654025567, 0.029705921026373726, 0.030260096888673618, 0.029718749438033855, 0.02811386604083442, 0.025515212328579014, 0.022027405370399437, 0.017785774328443985, 0.0129511698548403, 0.007703919146459512, 0.0022371518377187287, -0.0032502581415043545, -0.008560878605058398, -0.01350577512988741, -0.01791118655603016, -0.021624585720633936, -0.024519915597169553, -0.02650182264027035, -0.02750874677773458, -0.027514769743615018, -0.026530168759981265, -0.02460066930697508, -0.021805437194571353, -0.01825389471448091, -0.014081486740743141, -0.009444558835745305, -0.004514539466026722, 0.0005283586688325237, 0.005501688184770984, 0.010227330772579988, 0.014537840347978448, 0.018282340973862016, 0.021331773047717894, 0.023583306547061495, 0.02496377164329146, 0.025431993547020873, 0.024979958685208678, 0.023632781763418736, 0.02144748640136133, 0.018510654302712957, 0.01493503783233617, 0.0108552670246767, 0.0064228131824299005, 0.001800396280840345, -0.002843958467234098, -0.007342998890513081, -0.011536240158780027, -0.015275661290423466, -0.018430902658390935, -0.020893782960273496, -0.02258198010082393, -0.02344175174142868, -0.023449606736270574, -0.022612876996470903, -0.02096917910831442, -0.018584794846661316, -0.015552038148148921, -0.011985711781045329, -0.00801878861976524, -0.003797479005689533, 0.0005241337531074596, 0.004789693805619498, 0.008846206407410268, 0.012549502643771382, 0.015769340844605365, 0.018393964965261377, 0.02033396116824646, 0.021525280304300707, 0.021931324966242956, 0.02154403413088056, 0.02038393485791089, 0.018499167759770157, 0.015963529654952405, 0.0128736116619523, 0.009345142750998946, 0.005508676335562634, 0.0015047799034332127, -0.0025210958023247692, -0.006423881482216324, -0.010064097987514327, -0.013312822686553023, -0.016056237306438025, -0.018199597459518345, -0.0196704860491432, -0.020421239496340147, -0.020430466244064874, -0.01970361015754986, -0.018272546040961967, -0.016194229282786295, -0.013548455378535277, -0.010434816560227654, -0.006968970878034877, -0.003278362849711694, 0.000502446600110771, 0.004236670373186193, 0.0077902284566855814, 0.011036546848591278, 0.013861050933970996, 0.016165194330018767, 0.017869882057518553, 0.01891816966244776, 0.019277146752392636, 0.01893894333724857, 0.017920829278127274, 0.0162644098949849, 0.014033953183273643, 0.011313914984843538, 0.00820575675246622, 0.004824175245732497, 0.0012928837394950846, -0.0022599005791213113, -0.005706098907220705, -0.008922375207687903, -0.011794537611399822, -0.014221580220908822, -0.016119222698914113, -0.017422824044149753, -0.018089570277005272, -0.01809986251175298, -0.017457861099069306, -0.01619117211789458, -0.014349693373371622, -0.012003667108840474, -0.009241014792974313, -0.006164054601681803, -0.00288572369236315, 0.0004745556791246737, 0.003795215298347181, 0.006956928131950138, 0.009846885538204125, 0.012362811618869226, 0.014416572236459363, 0.015937251718093518, 0.016873590218746893, 0.017195698378100685, 0.01689599240346669, 0.015989321077525858, 0.014512285394286761, 0.012521780516740744, 0.010092817486633753, 0.007315707613653824, 0.0042927148278217985, 0.0011342997129974225, -0.0020449071852038756, -0.005130256336018512, -0.00801120450907917, -0.010585266265319427, -0.01276165072704259, -0.014464454892881569, -0.015635301501008097, -0.016235330098322766, -0.016246473778920374, -0.015671980138039405, -0.014536162397811676, -0.012883394406511473, -0.010776390295785835, -0.008293835032514664, -0.005527455019883997, -0.0025786374787311523, 0.00044527710720885545, 0.00343489420382719, 0.006282714748992388, 0.008886992680555542, 0.011155362326670436, 0.013008106613052252, 0.014380950720827823, 0.015227283570403101, 0.015519730650216062, 0.01525102547510591, 0.014434152478515391, 0.013101760489221409, 0.01130487216584272, 0.009110939920087482, 0.006601322055340094, 0.0038682732591371672, 0.0010115604994045241, -0.0018651718021297716, -0.004658155147203015, -0.007267233215005199, -0.009599446712350634, -0.011572338750193775, -0.01311686345413317, -0.014179795447794174, -0.014725556373158514, -0.014737396045296133, -0.014217889394259072, -0.013188735166032745, -0.011689867538738146, -0.009777916452952824, -0.007524075673777697, -0.0050114585708404685, -0.0023320395799058687, 0.0004167063332601263, 0.0031353436455480977, 0.005726067345653413, 0.008096215625861642, 0.01016157824917276, 0.01184938267931166, 0.013100852291116547, 0.013873246941651563, 0.014141315284372175, 0.013898109746427759, 0.013155138275635352, 0.011941850956704098, 0.010304483529350757, 0.008304302854202653, 0.006015320643635044, 0.0035215605486490476, 0.0009139793080116005, -0.0017128454224474997, -0.0042641401429189835, -0.006648349638934353, -0.008780417363361988, -0.010584814720558453, -0.01199821154668366, -0.012971693547757781, -0.013472449243730023, -0.013484868452041134, -0.013011015813531255, -0.012070465535044868, -0.010699506575512443, -0.008949750104930179, -0.006886192408200968, -0.0045848057273313635, -0.0021297461515798477, 0.0003897190079015241, 0.002882452347159694, 0.00525873849237649, 0.0074335084629475415, 0.00932938055493529, 0.01087940920630405, 0.012029444354886511, 0.012740018301365378, 0.012987694504099926, 0.012765832419741692, 0.012084743744086105, 0.010971237430011879, 0.009467572867858893, 0.007629861816774684, 0.005525979314818971, 0.0032330611722886367, 0.0008346801528636334, -0.0015821959367462552, -0.0039303536793744934, -0.0061254770978932255, -0.008089171198508062, -0.009751757727294544, -0.011054743578588619, -0.011952874552510076, -0.012415702500227227, -0.012428611753062393, -0.011993270450890797, -0.011127493248361146, -0.00986452312836932, -0.008251760924684203, -0.006348990900594771, -0.004226168642923303, -0.00196085297493329, 0.00036462397650800207, 0.0026661454378641585, 0.004860849014825579, 0.0068701064222144205, 0.008622336895742185, 0.010055553745554325, 0.011119553581954659, 0.011777671023725008, 0.012008037696512604, 0.01180430245485111, 0.011175789354614307, 0.010147090251417707, 0.008757109269084877, 0.0070575960378010845, 0.005111222839974676, 0.002989276973249491, 0.0007690531719901142, -0.0014689586541772584, -0.003643988164408206, -0.005677896380865041, -0.007497979678146477, -0.009039565462087224, -0.01024830697967439, -0.011082095945881183, -0.011512525794514622, -0.011525854837817467, -0.011123436850177802, -0.010321605911084135, -0.009151022051349732, -0.007655503633602483, -0.005890390766774864, -0.003920500748176456, -0.00181775095215376, 0.00034146376800158374, 0.002479043635530234, 0.004518005946773812, 0.006385254645890298, 0.00801419794120358, 0.00934712032668465, 0.010337224617962755, 0.01095027185696846, 0.011165761729261104, 0.010977612930099979, 0.010394321096434157, 0.009438590831876054, 0.008146457306617826, 0.006565931231642997, 0.00475521802978871, 0.002780577147874864, 0.0007139001378576596, -0.001369904065589421, -0.003395621669249799, -0.005290446219303019, -0.006986592765312864, -0.008423720219408543, -0.009551075436950555, -0.01032928292580809, -0.010731717169448806, -0.01074540984241405, -0.010371461145725017, -0.009624942477342155, -0.008534296027125727, -0.007140254983704511, -0.005494325211784335, -0.003656884888260876, -0.0016949721175543067, 0.0003201584978612304, 0.002315621360742135, 0.004219533726619187, 0.005963602802239651, 0.007485573067958143, 0.008731446205591017, 0.009657394555647326, 0.010231300384061524, 0.010433866988460598, 0.010259263312952176, 0.009715280697791269, 0.008822998050225411, 0.0076159694466310926, 0.006138965325258723, 0.004446314388220614, 0.0025999075307663287, 0.0006669370509704496, -0.0012825463572191324, -0.0031781700826475096, -0.0049517777813421595, -0.006539877796710979, -0.007885913935309566, -0.008942277459154584, -0.009671988793343446, -0.01004998962380647, -0.010064000326069966, -0.009714913500121096, -0.009016711212553347, -0.007995910755341304, -0.0066905606996320345, -0.005148825142610493]}
},{}],37:[function(require,module,exports){
module.exports={"x": [5.0, 5.190380761523046, 5.380761523046092, 5.571142284569138, 5.761523046092185, 5.95190380761523, 6.142284569138276, 6.332665330661323, 6.5230460921843685, 6.713426853707415, 6.903807615230461, 7.094188376753507, 7.284569138276553, 7.474949899799599, 7.6653306613226455, 7.855711422845691, 8.046092184368737, 8.236472945891784, 8.42685370741483, 8.617234468937875, 8.807615230460922, 8.997995991983968, 9.188376753507015, 9.37875751503006, 9.569138276553106, 9.759519038076153, 9.949899799599198, 10.140280561122244, 10.330661322645291, 10.521042084168336, 10.711422845691382, 10.901803607214429, 11.092184368737474, 11.28256513026052, 11.472945891783567, 11.663326653306612, 11.85370741482966, 12.044088176352705, 12.23446893787575, 12.424849699398798, 12.615230460921843, 12.80561122244489, 12.995991983967937, 13.186372745490981, 13.376753507014028, 13.567134268537075, 13.75751503006012, 13.947895791583166, 14.138276553106213, 14.328657314629258, 14.519038076152304, 14.70941883767535, 14.899799599198397, 15.090180360721442, 15.280561122244489, 15.470941883767535, 15.66132264529058, 15.851703406813627, 16.04208416833667, 16.232464929859717, 16.422845691382765, 16.613226452905813, 16.803607214428858, 16.993987975951903, 17.184368737474948, 17.374749498997996, 17.56513026052104, 17.75551102204409, 17.945891783567134, 18.13627254509018, 18.326653306613224, 18.517034068136272, 18.70741482965932, 18.897795591182366, 19.08817635270541, 19.278557114228455, 19.4689378757515, 19.65931863727455, 19.849699398797597, 20.04008016032064, 20.230460921843687, 20.42084168336673, 20.61122244488978, 20.801603206412825, 20.991983967935873, 21.182364729458918, 21.372745490981963, 21.56312625250501, 21.753507014028056, 21.9438877755511, 22.13426853707415, 22.324649298597194, 22.51503006012024, 22.705410821643287, 22.895791583166332, 23.086172344689377, 23.276553106212425, 23.46693386773547, 23.657314629258515, 23.847695390781563, 24.03807615230461, 24.228456913827657, 24.4188376753507, 24.609218436873746, 24.799599198396795, 24.98997995991984, 25.180360721442884, 25.370741482965933, 25.561122244488978, 25.751503006012022, 25.94188376753507, 26.132264529058116, 26.32264529058116, 26.51302605210421, 26.703406813627254, 26.8937875751503, 27.084168336673347, 27.274549098196392, 27.464929859719437, 27.655310621242485, 27.84569138276553, 28.03607214428858, 28.226452905811623, 28.416833667334668, 28.607214428857716, 28.79759519038076, 28.987975951903806, 29.178356713426854, 29.3687374749499, 29.559118236472944, 29.749498997995993, 29.939879759519037, 30.130260521042082, 30.32064128256513, 30.511022044088175, 30.70140280561122, 30.89178356713427, 31.082164328657313, 31.272545090180362, 31.462925851703407, 31.65330661322645, 31.8436873747495, 32.034068136272545, 32.22444889779559, 32.41482965931864, 32.605210420841686, 32.79559118236473, 32.985971943887776, 33.17635270541082, 33.366733466933866, 33.55711422845691, 33.747494989979955, 33.937875751503, 34.12825651302605, 34.3186372745491, 34.50901803607214, 34.699398797595194, 34.88977955911824, 35.08016032064128, 35.27054108216433, 35.46092184368737, 35.65130260521042, 35.84168336673346, 36.03206412825651, 36.22244488977956, 36.412825651302605, 36.60320641282565, 36.7935871743487, 36.983967935871746, 37.17434869739479, 37.364729458917836, 37.55511022044088, 37.745490981963925, 37.93587174348697, 38.12625250501002, 38.31663326653307, 38.50701402805611, 38.69739478957916, 38.8877755511022, 39.07815631262525, 39.2685370741483, 39.45891783567134, 39.64929859719439, 39.83967935871743, 40.03006012024048, 40.22044088176353, 40.410821643286575, 40.60120240480962, 40.791583166332664, 40.98196392785571, 41.172344689378754, 41.362725450901806, 41.55310621242485, 41.743486973947896, 41.93386773547094, 42.124248496993985, 42.31462925851703, 42.50501002004008, 42.69539078156313, 42.88577154308617, 43.07615230460922, 43.26653306613226, 43.45691382765531, 43.64729458917836, 43.8376753507014, 44.02805611222445, 44.21843687374749, 44.40881763527054, 44.59919839679359, 44.789579158316634, 44.97995991983968, 45.170340681362724, 45.36072144288577, 45.551102204408814, 45.741482965931866, 45.93186372745491, 46.122244488977955, 46.312625250501, 46.503006012024045, 46.69338677354709, 46.88376753507014, 47.07414829659319, 47.26452905811623, 47.454909819639276, 47.64529058116232, 47.83567134268537, 48.02605210420842, 48.21643286573146, 48.40681362725451, 48.59719438877755, 48.7875751503006, 48.97795591182365, 49.168336673346694, 49.35871743486974, 49.549098196392784, 49.73947895791583, 49.92985971943887, 50.120240480961925, 50.31062124248497, 50.501002004008015, 50.69138276553106, 50.881763527054105, 51.07214428857716, 51.2625250501002, 51.452905811623246, 51.64328657314629, 51.833667334669336, 52.02404809619238, 52.21442885771543, 52.40480961923848, 52.59519038076152, 52.78557114228457, 52.97595190380761, 53.16633266533066, 53.35671342685371, 53.547094188376754, 53.7374749498998, 53.92785571142284, 54.11823647294589, 54.30861723446894, 54.498997995991985, 54.68937875751503, 54.879759519038075, 55.07014028056112, 55.260521042084164, 55.450901803607216, 55.64128256513026, 55.831663326653306, 56.02204408817635, 56.212424849699396, 56.40280561122244, 56.59318637274549, 56.78356713426854, 56.97394789579158, 57.16432865731463, 57.35470941883767, 57.545090180360724, 57.73547094188377, 57.92585170340681, 58.11623246492986, 58.3066132264529, 58.49699398797595, 58.687374749499, 58.877755511022045, 59.06813627254509, 59.258517034068134, 59.44889779559118, 59.639278557114224, 59.829659318637276, 60.02004008016032, 60.210420841683366, 60.40080160320641, 60.591182364729455, 60.78156312625251, 60.97194388777555, 61.1623246492986, 61.35270541082164, 61.54308617234469, 61.73346693386773, 61.92384769539078, 62.11422845691383, 62.30460921843687, 62.49498997995992, 62.68537074148296, 62.87575150300601, 63.06613226452906, 63.256513026052104, 63.44689378757515, 63.637274549098194, 63.82765531062124, 64.01803607214428, 64.20841683366734, 64.39879759519039, 64.58917835671343, 64.77955911823648, 64.96993987975952, 65.16032064128257, 65.35070140280561, 65.54108216432866, 65.7314629258517, 65.92184368737475, 66.11222444889779, 66.30260521042084, 66.49298597194388, 66.68336673346693, 66.87374749498997, 67.06412825651302, 67.25450901803606, 67.44488977955912, 67.63527054108216, 67.82565130260521, 68.01603206412825, 68.2064128256513, 68.39679358717436, 68.5871743486974, 68.77755511022045, 68.96793587174349, 69.15831663326654, 69.34869739478958, 69.53907815631263, 69.72945891783567, 69.91983967935872, 70.11022044088176, 70.3006012024048, 70.49098196392785, 70.6813627254509, 70.87174348697394, 71.06212424849699, 71.25250501002004, 71.44288577154309, 71.63326653306613, 71.82364729458918, 72.01402805611222, 72.20440881763527, 72.39478957915831, 72.58517034068136, 72.7755511022044, 72.96593186372745, 73.1563126252505, 73.34669338677355, 73.5370741482966, 73.72745490981964, 73.91783567134269, 74.10821643286573, 74.29859719438878, 74.48897795591182, 74.67935871743487, 74.86973947895791, 75.06012024048096, 75.250501002004, 75.44088176352706, 75.6312625250501, 75.82164328657315, 76.0120240480962, 76.20240480961924, 76.39278557114228, 76.58316633266533, 76.77354709418837, 76.96392785571142, 77.15430861723446, 77.34468937875751, 77.53507014028055, 77.72545090180361, 77.91583166332666, 78.1062124248497, 78.29659318637275, 78.48697394789579, 78.67735470941884, 78.86773547094188, 79.05811623246493, 79.24849699398797, 79.43887775551102, 79.62925851703406, 79.81963927855712, 80.01002004008016, 80.20040080160321, 80.39078156312625, 80.5811623246493, 80.77154308617234, 80.96192384769539, 81.15230460921843, 81.34268537074148, 81.53306613226452, 81.72344689378757, 81.91382765531063, 82.10420841683367, 82.29458917835672, 82.48496993987976, 82.6753507014028, 82.86573146292585, 83.0561122244489, 83.24649298597194, 83.43687374749499, 83.62725450901803, 83.81763527054107, 84.00801603206412, 84.19839679358718, 84.38877755511022, 84.57915831663327, 84.76953907815631, 84.95991983967936, 85.1503006012024, 85.34068136272545, 85.53106212424849, 85.72144288577154, 85.91182364729458, 86.10220440881763, 86.29258517034069, 86.48296593186373, 86.67334669338678, 86.86372745490982, 87.05410821643287, 87.24448897795591, 87.43486973947896, 87.625250501002, 87.81563126252505, 88.00601202404809, 88.19639278557113, 88.38677354709418, 88.57715430861724, 88.76753507014028, 88.95791583166333, 89.14829659318637, 89.33867735470942, 89.52905811623246, 89.71943887775551, 89.90981963927855, 90.1002004008016, 90.29058116232464, 90.48096192384769, 90.67134268537075, 90.86172344689379, 91.05210420841684, 91.24248496993988, 91.43286573146293, 91.62324649298597, 91.81362725450902, 92.00400801603206, 92.1943887775551, 92.38476953907815, 92.5751503006012, 92.76553106212425, 92.9559118236473, 93.14629258517034, 93.33667334669339, 93.52705410821643, 93.71743486973948, 93.90781563126252, 94.09819639278557, 94.28857715430861, 94.47895791583166, 94.6693386773547, 94.85971943887775, 95.0501002004008, 95.24048096192385, 95.4308617234469, 95.62124248496994, 95.81162324649299, 96.00200400801603, 96.19238476953907, 96.38276553106212, 96.57314629258516, 96.76352705410821, 96.95390781563125, 97.14428857715431, 97.33466933867736, 97.5250501002004, 97.71543086172345, 97.90581162324649, 98.09619238476954, 98.28657314629258, 98.47695390781563, 98.66733466933867, 98.85771543086172, 99.04809619238476, 99.23847695390782, 99.42885771543087, 99.61923847695391, 99.80961923847696, 100.0], "si": [1.549931244944674, 1.5153108702529772, 1.4850797438003784, 1.4599872237264009, 1.4405643427676107, 1.4271215631851475, 1.4197527927038536, 1.418345347149439, 1.4225953806203733, 1.4320281568490687, 1.4460224100049486, 1.4638379429558177, 1.484645538497189, 1.5075582159555305, 1.5316628526148013, 1.5560512064106455, 1.579849422167846, 1.6022451763368937, 1.6225117119310617, 1.6400281326946353, 1.6542954593865427, 1.6649480969406505, 1.6717605143702674, 1.6746490946883694, 1.6736692649053726, 1.6690081616067163, 1.6609732212890784, 1.649977202589475, 1.6365202463934316, 1.6211696568471476, 1.6045381395620761, 1.5872612616238058, 1.5699749010566038, 1.5532934316237261, 1.5377893435226075, 1.5239749336573185, 1.5122866133878334, 1.503072280174477, 1.4965820860083554, 1.4929628139143238, 1.4922559482845057, 1.494399399544296, 1.4992327227723323, 1.5065055572683155, 1.5158889132161801, 1.5269888455951546, 1.5393619868669954, 1.552532360609909, 1.5660088693991578, 1.5793028423691073, 1.5919450408422136, 1.6035015532997827, 1.613588062273312, 1.621882033345657, 1.628132457756552, 1.6321668720880784, 1.6338954778442114, 1.6333122869333292, 1.6304933225496634, 1.6255920052234207, 1.6188319475386432, 1.6104974651554005, 1.6009221836523062, 1.590476178124769, 1.5795521237623176, 1.5685509596912557, 1.5578675747178603, 1.547877012364455, 1.5389216644743482, 1.5312998789519696, 1.525256349690606, 1.520974587650193, 1.5185716939662361, 1.518095571744744, 1.5195246258344643, 1.5227699124295566, 1.5276796158557728, 1.5340456511916383, 1.541612121085566, 1.5500852955296858, 1.5591447363146689, 1.568455154826463, 1.5776785736602073, 1.5864863595953045, 1.5945707076426832, 1.60165518246576, 1.6075039633279726, 1.6119294902293968, 1.6147982700824037, 1.616034670357114, 1.6156226010969097, 1.613605061927327, 1.610081605985819, 1.6052038449684354, 1.5991691862511481, 1.592213052056154, 1.584599879958104, 1.5766132420891985, 1.5685454460482284, 1.5606869930394935, 1.5533162679233534, 1.5466898218808627, 1.5410335819651313, 1.5365352840410977, 1.5333383779926308, 1.5315375984135529, 1.5311763323648064, 1.5322458504207137, 1.53468640048904, 1.5383900981339669, 1.543205484652454, 1.548943567101062, 1.5553851047706928, 1.5622888659056764, 1.5694005480681383, 1.576462036386647, 1.583220666521142, 1.5894381636260484, 1.594898944584492, 1.5994174976016453, 1.6028445897964931, 1.6050720983026205, 1.6060363118895704, 1.6057196063450587, 1.6041504557707928, 1.6014018014282574, 1.597587857719469, 1.5928594892757009, 1.5873983420794076, 1.5814099534007333, 1.5751160987001998, 1.5687466574597941, 1.5625312934321656, 1.5566912476900077, 1.5514315351422883, 1.5469338172623133, 1.543350196401555, 1.5407981413244087, 1.539356710856986, 1.5390641943935466, 1.5399172362155595, 1.5418714570271792, 1.5448435327142458, 1.548714638981605, 1.55333512301145, 1.5585302212533056, 1.5641066073315393, 1.569859527005807, 1.5755802590117773, 1.5810636319856433, 1.586115328736472, 1.5905587197301982, 1.5942409873066061, 1.5970383300688502, 1.5988600719826773, 1.5996515416754755, 1.5993956327160985, 1.5981130036300246, 1.5958609253280476, 1.592730831752292, 1.5888446751693563, 1.584350229071856, 1.5794155176533429, 1.5742225800754426, 1.5689607992800734, 1.5638200382278515, 1.558983830785796, 1.5546228699786127, 1.5508890232086592, 1.5479100828936037, 1.5457854326016909, 1.544582774264273, 1.5443360227029217, 1.5450444309725446, 1.5466729654473552, 1.5491539047684686, 1.5523895933281044, 1.5562562394197714, 1.560608611952335, 1.5652854589575453, 1.570115447054478, 1.5749234043647788, 1.5795366406231388, 1.5837911176348254, 1.5875372507405283, 1.590645137214539, 1.5930090299286161, 1.594550903295558, 1.595222992382612, 1.5950092238995446, 1.59392549813464, 1.5920188223709566, 1.5893653373760146, 1.5860673177595277, 1.582249262953971, 1.5780532270377037, 1.5736335615074173, 1.5691512645416938, 1.5647681426439162, 1.560640995432612, 1.5569160316518849, 1.5537237143664697, 1.5511742162105933, 1.549353642148301, 1.5483211483658084, 1.5481070527303022, 1.5487119959369675, 1.5501071743506016, 1.5522356270068294, 1.5550145216511546, 1.5583383493967025, 1.5620829058154708, 1.566109909148836, 1.5702720847617857, 1.5744185296963067, 1.5784001626963136, 1.5820750636268694, 1.5853135117884198, 1.5880025449756392, 1.5900498797536986, 1.5913870576057434, 1.5919717104346305, 1.5917888713113169, 1.590851291164078, 1.5891987580332403, 1.5868964512813104, 1.5840323974702812, 1.5807141262801727, 1.5770646527336776, 1.573217935142845, 1.569313975813618, 1.565493743045217, 1.5618940979795617, 1.5586429082614737, 1.5558545223710645, 1.553625764225041, 1.5520325877711239, 1.5511275065731784, 1.5509378847257784, 1.5514651439012164, 1.552684908070019, 1.5545480736514774, 1.556982759757068, 1.559897061966718, 1.5631825048298151, 1.5667180639993274, 1.5703746094288922, 1.5740196070517243, 1.5775219082786542, 1.5807564547469517, 1.583608730045407, 1.5859788004359805, 1.5877848024762726, 1.5889657563111426, 1.5894836084630104, 1.5893244362810228, 1.588498776771156, 1.587041074211653, 1.5850082726178307, 1.582477609622902, 1.579543696602042, 1.5763149948883017, 1.5729098188368669, 1.5694520125676379, 1.5660664579123889, 1.562874576065348, 1.559989984545846, 1.5575144644006156, 1.5555343803802244, 1.5541176795934735, 1.5533115725271214, 1.5531409751205536, 1.5536077627334535, 1.5546908573555485, 1.556347139349398, 1.558513145471605, 1.5611074869408674, 1.5640338959059281, 1.567184786707335, 1.570445200588897, 1.57369698960644, 1.5768230878344447, 1.5797117158255274, 1.5822603676748859, 1.58437943882412, 1.5859953665566362, 1.5870531734621347, 1.5875183262942556, 1.5873778477944434, 1.5866406462851141, 1.5853370561561126, 1.5835176107571916, 1.5812510966467612, 1.578621963654861, 1.575727187892964, 1.5726727038887771, 1.5695695367797358, 1.5665297754614265, 1.5636625324287596, 1.5610700356261187, 1.5588439919853636, 1.5570623517117188, 1.5557865871887637, 1.5550595811879715, 1.5549041965984127, 1.5553225749648347, 1.5562961846469905, 1.5577866123495632, 1.559737065095436, 1.5620745243808116, 1.5647124711603315, 1.5675540802796148, 1.570495766702571, 1.5734309539334492, 1.5762539278124026, 1.5788636365998974, 1.5811673010119027, 1.583083705496509, 1.5845460542511454, 1.5855042918028583, 1.5859268078021596, 1.5858014682814305, 1.585135940174166, 1.5839573014886872, 1.5823109552540124, 1.5802588902816592, 1.577877355024468, 1.5752540315370502, 1.5724848140219296, 1.5696703100713367, 1.5669121920190914, 1.5643095304900971, 1.5619552421346732, 1.5599327786915245, 1.558313175136967, 1.5571525611115096, 1.5564902225785893, 1.5563472804036718, 1.5567260299899206, 1.557609962092024, 1.558964460323452, 1.5607381465617312, 1.5628648223132795, 1.5652659329491363, 1.5678534633148433, 1.5705331581984456, 1.5732079500315803, 1.5757814693781154, 1.5781615114549643, 1.5802633341894055, 1.5820126700409667, 1.5833483447382746, 1.5842244107874577, 1.5846117215501112, 1.5844988922036136, 1.5838926162337974, 1.582817329457203, 1.5813142370828632, 1.579439742155781, 1.5772633350587297, 1.5748650228266585, 1.5723323931746491, 1.5697574207907827, 1.5672331321626498, 1.5648502496974024, 1.5626939360204084, 1.560840755114521, 1.5593559585647598, 1.5582911929248984, 1.5576827085830034, 1.5575501320518372, 1.557895843024773, 1.5587049755694466, 1.559946040276555, 1.5615721418539832, 1.5635227453585026, 1.565725924749274, 1.5681010104219706, 1.5705615384393394, 1.5730183937996507, 1.5753830336341221, 1.5775706739107693, 1.5795033251080242, 1.5811125683185479, 1.5823419731161301, 1.5831490718924637, 1.5835068217479216, 1.5834045037976234, 1.582848030244112, 1.5818596510256757, 1.5804770734982694, 1.5787520296695725, 1.5767483452212685, 1.5745395822273545, 1.5722063424763058, 1.5698333301064316, 1.5675062804574074, 1.5653088663491714, 1.5633196932854783, 1.561609491352131, 1.5602386039921998, 1.5592548626834821, 1.5586919222351312, 1.5585681144902526, 1.5588858592906034, 1.5596316513187032, 1.5607766206159093, 1.562277643933934, 1.5640789643536765, 1.5661142585044545, 1.5683090748825996, 1.5705835537601174, 1.5728553294468917, 1.5750425095586764, 1.5770666236512874, 1.5788554351740949, 1.580345516098176, 1.58148449257469, 1.582232882237122, 1.582565458821191, 1.5824720970839763, 1.5819580699262632, 1.5810437894711216, 1.5797640039089034, 1.5781664814614877, 1.5763102311457389, 1.5742633264736459, 1.5721004122304958, 1.5698999855295825, 1.5677415500674157, 1.5657027466338291, 1.5638565633338644, 1.5622687256547205, 1.5609953595972692, 1.5600810108521228, 1.55955708981801, 1.5594407966224781, 1.5597345627851378, 1.5604260274005424, 1.5614885463920012, 1.5628822141971987, 1.5645553588815795, 1.566446454793515, 1.5684863820776542, 1.5706009501732607, 1.572713593270461, 1.574748139895748, 1.5766315565434277, 1.57829656662811, 1.5796840509407029, 1.5807451440550166, 1.5814429524424587, 1.5817538339884256, 1.5816681946532218, 1.5811907755960808, 1.580340422544024, 1.579149347869553, 1.5776619140690065, 1.5759329844525358, 1.5740259022553273, 1.5720101725106475, 1.5699589314251206, 1.5679462953021874, 1.5660446850205587, 1.5643222225618507, 1.5628402930919925, 1.5616513597563602, 1.5607971088908943, 1.5603069911339316, 1.56019720939716, 1.5604701883513505, 1.5611145425975173, 1.5621055426611854, 1.5634060600180604, 1.5649679551787217, 1.5667338570436378, 1.5686392678518972, 1.5706149165799255, 1.572589275003402, 1.5744911451166232, 1.576252224394985, 1.5778095565545793, 1.579107779952633, 1.5801010934089763, 1.5807548697244787, 1.581046860138304, 1.5809679479252887, 1.5805224257412265, 1.5797277885809347, 1.5786140516968064, 1.5772226199037476, 1.5756047507564244, 1.5738196685521966, 1.5719323984731366, 1.5700113999960976, 1.5681260856272268, 1.5663443148182, 1.56472995347092, 1.5633405867280965, 1.5622254668890563], "ci": [-0.1900297496566439, -0.1761132088998822, -0.15662448700257026, -0.13263104744022836, -0.1052737270421524, -0.07572788710100596, -0.04516557896078838, -0.014719711429420024, 0.014548865083133203, 0.0416805431698791, 0.06584172145483987, 0.08634459917744722, 0.10266161315325278, 0.1144342945631242, 0.12147649318157047, 0.12377208494384244, 0.12146743995536226, 0.11485907728236913, 0.1043770657196301, 0.0905648423999146, 0.07405621048777625, 0.05555034097486501, 0.03578564030229997, 0.015513354594425731, -0.004528237002618521, -0.0236382318666052, -0.04117537702780445, -0.056577556820667854, -0.0693779544458781, -0.07921746964110045, -0.0858531076093665, -0.0891621929785419, -0.0891424023044073, -0.08590774497851915, -0.07968075105358373, -0.07078124148059908, -0.05961215804652174, -0.04664301395335911, -0.032391589181322365, -0.01740453593256397, -0.00223757771028973, 0.012564019133303048, 0.026484049579097398, 0.03905244600948211, 0.04986028915770902, 0.05857230002766899, 0.06493645511822171, 0.06879047320189129, 0.0700650337654414, 0.06878370116795252, 0.06505964076596152, 0.059089319984715054, 0.0511434851243263, 0.04155579048952385, 0.03070952759312301, 0.01902295661851673, 0.0069337785483330125, -0.00511669647234304, -0.016699131059729113, -0.02741096020395763, -0.03688991455787207, -0.044825828017827044, -0.05097035871084521, -0.05514433226943713, -0.0572425043757162, -0.05723563282658731, -0.05516984453063764, -0.05116337660933652, -0.045400859961649595, -0.038125395296577894, -0.029628743086958082, -0.020240007889774616, -0.010313242218402583, -0.00021442436461058083, 0.00969172246943194, 0.01905460580948669, 0.027549889829728186, 0.034890461535598764, 0.04083587524036979, 0.04519997310384816, 0.04785644865777804, 0.048742196264035406, 0.04785836959078141, 0.045269153603588304, 0.041098334410978876, 0.03552382683495233, 0.02877038824823881, 0.021100806760655524, 0.012805900328569701, 0.004193699298630829, -0.004421792767148349, -0.012731856962037949, -0.02044393862110318, -0.027291771470003272, -0.033044401884204225, -0.037513813042345044, -0.04056090280468527, -0.04209963096847259, -0.04209921886860582, -0.040584354668406056, -0.037633428615170425, -0.0333748915293748, -0.027981894469573936, -0.021665425667140893, -0.014666210515238986, -0.0072456800073429795, 0.0003236586900408193, 0.007768099706979413, 0.01482251056255857, 0.021239654355412703, 0.02679873842442972, 0.03131289784847401, 0.034635363971839514, 0.03666411817552049, 0.03734488749129916, 0.036672399306745734, 0.034689875142820445, 0.03148680606614682, 0.027195112524341546, 0.021983847175738713, 0.01605264871848188, 0.009624196150191474, 0.002935944953064427, -0.0037685516082300997, -0.010248422197935342, -0.01627404479900792, -0.02163510007222039, -0.02614783112103067, -0.02966126185340836, -0.03206216625371776, -0.033278627845292834, -0.03328208069322549, -0.03208777856416136, -0.029753695332816504, -0.026377915392176314, -0.022094625727093684, -0.017068869611341023, -0.011490263932405993, -0.0055659165231820434, 0.00048719454061077233, 0.006450101735884156, 0.012109705107153592, 0.01726632583924666, 0.0217406908143503, 0.02538010593215444, 0.028063607654025567, 0.029705921026373726, 0.030260096888673618, 0.029718749438033855, 0.02811386604083442, 0.025515212328579014, 0.022027405370399437, 0.017785774328443985, 0.0129511698548403, 0.007703919146459512, 0.0022371518377187287, -0.0032502581415043545, -0.008560878605058398, -0.01350577512988741, -0.01791118655603016, -0.021624585720633936, -0.024519915597169553, -0.02650182264027035, -0.02750874677773458, -0.027514769743615018, -0.026530168759981265, -0.02460066930697508, -0.021805437194571353, -0.01825389471448091, -0.014081486740743141, -0.009444558835745305, -0.004514539466026722, 0.0005283586688325237, 0.005501688184770984, 0.010227330772579988, 0.014537840347978448, 0.018282340973862016, 0.021331773047717894, 0.023583306547061495, 0.02496377164329146, 0.025431993547020873, 0.024979958685208678, 0.023632781763418736, 0.02144748640136133, 0.018510654302712957, 0.01493503783233617, 0.0108552670246767, 0.0064228131824299005, 0.001800396280840345, -0.002843958467234098, -0.007342998890513081, -0.011536240158780027, -0.015275661290423466, -0.018430902658390935, -0.020893782960273496, -0.02258198010082393, -0.02344175174142868, -0.023449606736270574, -0.022612876996470903, -0.02096917910831442, -0.018584794846661316, -0.015552038148148921, -0.011985711781045329, -0.00801878861976524, -0.003797479005689533, 0.0005241337531074596, 0.004789693805619498, 0.008846206407410268, 0.012549502643771382, 0.015769340844605365, 0.018393964965261377, 0.02033396116824646, 0.021525280304300707, 0.021931324966242956, 0.02154403413088056, 0.02038393485791089, 0.018499167759770157, 0.015963529654952405, 0.0128736116619523, 0.009345142750998946, 0.005508676335562634, 0.0015047799034332127, -0.0025210958023247692, -0.006423881482216324, -0.010064097987514327, -0.013312822686553023, -0.016056237306438025, -0.018199597459518345, -0.0196704860491432, -0.020421239496340147, -0.020430466244064874, -0.01970361015754986, -0.018272546040961967, -0.016194229282786295, -0.013548455378535277, -0.010434816560227654, -0.006968970878034877, -0.003278362849711694, 0.000502446600110771, 0.004236670373186193, 0.0077902284566855814, 0.011036546848591278, 0.013861050933970996, 0.016165194330018767, 0.017869882057518553, 0.01891816966244776, 0.019277146752392636, 0.01893894333724857, 0.017920829278127274, 0.0162644098949849, 0.014033953183273643, 0.011313914984843538, 0.00820575675246622, 0.004824175245732497, 0.0012928837394950846, -0.0022599005791213113, -0.005706098907220705, -0.008922375207687903, -0.011794537611399822, -0.014221580220908822, -0.016119222698914113, -0.017422824044149753, -0.018089570277005272, -0.01809986251175298, -0.017457861099069306, -0.01619117211789458, -0.014349693373371622, -0.012003667108840474, -0.009241014792974313, -0.006164054601681803, -0.00288572369236315, 0.0004745556791246737, 0.003795215298347181, 0.006956928131950138, 0.009846885538204125, 0.012362811618869226, 0.014416572236459363, 0.015937251718093518, 0.016873590218746893, 0.017195698378100685, 0.01689599240346669, 0.015989321077525858, 0.014512285394286761, 0.012521780516740744, 0.010092817486633753, 0.007315707613653824, 0.0042927148278217985, 0.0011342997129974225, -0.0020449071852038756, -0.005130256336018512, -0.00801120450907917, -0.010585266265319427, -0.01276165072704259, -0.014464454892881569, -0.015635301501008097, -0.016235330098322766, -0.016246473778920374, -0.015671980138039405, -0.014536162397811676, -0.012883394406511473, -0.010776390295785835, -0.008293835032514664, -0.005527455019883997, -0.0025786374787311523, 0.00044527710720885545, 0.00343489420382719, 0.006282714748992388, 0.008886992680555542, 0.011155362326670436, 0.013008106613052252, 0.014380950720827823, 0.015227283570403101, 0.015519730650216062, 0.01525102547510591, 0.014434152478515391, 0.013101760489221409, 0.01130487216584272, 0.009110939920087482, 0.006601322055340094, 0.0038682732591371672, 0.0010115604994045241, -0.0018651718021297716, -0.004658155147203015, -0.007267233215005199, -0.009599446712350634, -0.011572338750193775, -0.01311686345413317, -0.014179795447794174, -0.014725556373158514, -0.014737396045296133, -0.014217889394259072, -0.013188735166032745, -0.011689867538738146, -0.009777916452952824, -0.007524075673777697, -0.0050114585708404685, -0.0023320395799058687, 0.0004167063332601263, 0.0031353436455480977, 0.005726067345653413, 0.008096215625861642, 0.01016157824917276, 0.01184938267931166, 0.013100852291116547, 0.013873246941651563, 0.014141315284372175, 0.013898109746427759, 0.013155138275635352, 0.011941850956704098, 0.010304483529350757, 0.008304302854202653, 0.006015320643635044, 0.0035215605486490476, 0.0009139793080116005, -0.0017128454224474997, -0.0042641401429189835, -0.006648349638934353, -0.008780417363361988, -0.010584814720558453, -0.01199821154668366, -0.012971693547757781, -0.013472449243730023, -0.013484868452041134, -0.013011015813531255, -0.012070465535044868, -0.010699506575512443, -0.008949750104930179, -0.006886192408200968, -0.0045848057273313635, -0.0021297461515798477, 0.0003897190079015241, 0.002882452347159694, 0.00525873849237649, 0.0074335084629475415, 0.00932938055493529, 0.01087940920630405, 0.012029444354886511, 0.012740018301365378, 0.012987694504099926, 0.012765832419741692, 0.012084743744086105, 0.010971237430011879, 0.009467572867858893, 0.007629861816774684, 0.005525979314818971, 0.0032330611722886367, 0.0008346801528636334, -0.0015821959367462552, -0.0039303536793744934, -0.0061254770978932255, -0.008089171198508062, -0.009751757727294544, -0.011054743578588619, -0.011952874552510076, -0.012415702500227227, -0.012428611753062393, -0.011993270450890797, -0.011127493248361146, -0.00986452312836932, -0.008251760924684203, -0.006348990900594771, -0.004226168642923303, -0.00196085297493329, 0.00036462397650800207, 0.0026661454378641585, 0.004860849014825579, 0.0068701064222144205, 0.008622336895742185, 0.010055553745554325, 0.011119553581954659, 0.011777671023725008, 0.012008037696512604, 0.01180430245485111, 0.011175789354614307, 0.010147090251417707, 0.008757109269084877, 0.0070575960378010845, 0.005111222839974676, 0.002989276973249491, 0.0007690531719901142, -0.0014689586541772584, -0.003643988164408206, -0.005677896380865041, -0.007497979678146477, -0.009039565462087224, -0.01024830697967439, -0.011082095945881183, -0.011512525794514622, -0.011525854837817467, -0.011123436850177802, -0.010321605911084135, -0.009151022051349732, -0.007655503633602483, -0.005890390766774864, -0.003920500748176456, -0.00181775095215376, 0.00034146376800158374, 0.002479043635530234, 0.004518005946773812, 0.006385254645890298, 0.00801419794120358, 0.00934712032668465, 0.010337224617962755, 0.01095027185696846, 0.011165761729261104, 0.010977612930099979, 0.010394321096434157, 0.009438590831876054, 0.008146457306617826, 0.006565931231642997, 0.00475521802978871, 0.002780577147874864, 0.0007139001378576596, -0.001369904065589421, -0.003395621669249799, -0.005290446219303019, -0.006986592765312864, -0.008423720219408543, -0.009551075436950555, -0.01032928292580809, -0.010731717169448806, -0.01074540984241405, -0.010371461145725017, -0.009624942477342155, -0.008534296027125727, -0.007140254983704511, -0.005494325211784335, -0.003656884888260876, -0.0016949721175543067, 0.0003201584978612304, 0.002315621360742135, 0.004219533726619187, 0.005963602802239651, 0.007485573067958143, 0.008731446205591017, 0.009657394555647326, 0.010231300384061524, 0.010433866988460598, 0.010259263312952176, 0.009715280697791269, 0.008822998050225411, 0.0076159694466310926, 0.006138965325258723, 0.004446314388220614, 0.0025999075307663287, 0.0006669370509704496, -0.0012825463572191324, -0.0031781700826475096, -0.0049517777813421595, -0.006539877796710979, -0.007885913935309566, -0.008942277459154584, -0.009671988793343446, -0.01004998962380647, -0.010064000326069966, -0.009714913500121096, -0.009016711212553347, -0.007995910755341304, -0.0066905606996320345, -0.005148825142610493]}
},{}],38:[function(require,module,exports){
module.exports={"x": [-0.25, -0.2595190380761523, -0.26903807615230463, -0.2785571142284569, -0.2880761523046092, -0.29759519038076154, -0.30711422845691383, -0.3166332665330661, -0.32615230460921846, -0.33567134268537074, -0.3451903807615231, -0.35470941883767537, -0.36422845691382766, -0.37374749498997994, -0.3832665330661323, -0.3927855711422846, -0.4023046092184369, -0.4118236472945892, -0.4213426853707415, -0.4308617234468938, -0.4403807615230461, -0.4498997995991984, -0.45941883767535074, -0.46893787575150303, -0.4784569138276553, -0.4879759519038076, -0.49749498997995995, -0.5070140280561122, -0.5165330661322646, -0.5260521042084169, -0.5355711422845691, -0.5450901803607215, -0.5546092184368738, -0.5641282565130261, -0.5736472945891784, -0.5831663326653307, -0.592685370741483, -0.6022044088176353, -0.6117234468937875, -0.6212424849699398, -0.6307615230460922, -0.6402805611222445, -0.6497995991983968, -0.6593186372745492, -0.6688376753507015, -0.6783567134268538, -0.6878757515030061, -0.6973947895791583, -0.7069138276553106, -0.7164328657314629, -0.7259519038076152, -0.7354709418837676, -0.7449899799599199, -0.7545090180360722, -0.7640280561122245, -0.7735470941883767, -0.7830661322645291, -0.7925851703406814, -0.8021042084168337, -0.811623246492986, -0.8211422845691383, -0.8306613226452906, -0.840180360721443, -0.8496993987975953, -0.8592184368737475, -0.8687374749498998, -0.8782565130260521, -0.8877755511022045, -0.8972945891783568, -0.9068136272545091, -0.9163326653306614, -0.9258517034068137, -0.935370741482966, -0.9448897795591183, -0.9544088176352706, -0.9639278557114229, -0.9734468937875752, -0.9829659318637275, -0.9924849699398798, -1.0020040080160322, -1.0115230460921845, -1.0210420841683367, -1.030561122244489, -1.0400801603206413, -1.0495991983967936, -1.059118236472946, -1.0686372745490984, -1.0781563126252505, -1.087675350701403, -1.097194388777555, -1.1067134268537075, -1.1162324649298598, -1.1257515030060121, -1.1352705410821644, -1.1447895791583167, -1.154308617234469, -1.1638276553106213, -1.1733466933867738, -1.1828657314629258, -1.1923847695390783, -1.2019038076152304, -1.211422845691383, -1.2209418837675352, -1.2304609218436875, -1.2399799599198398, -1.249498997995992, -1.2590180360721444, -1.2685370741482966, -1.278056112224449, -1.2875751503006012, -1.2970941883767535, -1.306613226452906, -1.3161322645290583, -1.3256513026052106, -1.3351703406813629, -1.3446893787575152, -1.3542084168336674, -1.3637274549098197, -1.373246492985972, -1.3827655310621243, -1.3922845691382766, -1.4018036072144289, -1.4113226452905812, -1.4208416833667337, -1.430360721442886, -1.4398797595190382, -1.4493987975951905, -1.4589178356713428, -1.468436873747495, -1.4779559118236474, -1.4874749498997997, -1.496993987975952, -1.5065130260521042, -1.5160320641282565, -1.525551102204409, -1.5350701402805613, -1.5445891783567136, -1.554108216432866, -1.5636272545090182, -1.5731462925851705, -1.5826653306613228, -1.592184368737475, -1.6017034068136273, -1.6112224448897796, -1.620741482965932, -1.6302605210420842, -1.6397795591182367, -1.649298597194389, -1.6588176352705413, -1.6683366733466936, -1.6778557114228458, -1.6873747494989981, -1.6968937875751504, -1.7064128256513027, -1.715931863727455, -1.7254509018036073, -1.7349699398797596, -1.7444889779559118, -1.7540080160320644, -1.7635270541082166, -1.773046092184369, -1.7825651302605212, -1.7920841683366735, -1.8016032064128258, -1.811122244488978, -1.8206412825651304, -1.8301603206412826, -1.839679358717435, -1.8491983967935872, -1.8587174348697397, -1.868236472945892, -1.8777555110220443, -1.8872745490981966, -1.8967935871743489, -1.9063126252505012, -1.9158316633266534, -1.9253507014028057, -1.934869739478958, -1.9443887775551103, -1.9539078156312626, -1.9634268537074149, -1.9729458917835674, -1.9824649298597197, -1.991983967935872, -2.0015030060120242, -2.0110220440881763, -2.020541082164329, -2.0300601202404813, -2.0395791583166334, -2.0490981963927855, -2.058617234468938, -2.0681362725450905, -2.0776553106212425, -2.087174348697395, -2.0966933867735476, -2.1062124248496996, -2.1157314629258517, -2.125250501002004, -2.1347695390781567, -2.1442885771543088, -2.153807615230461, -2.1633266533066133, -2.172845691382766, -2.182364729458918, -2.1918837675350704, -2.201402805611223, -2.210921843687375, -2.220440881763527, -2.2299599198396796, -2.239478957915832, -2.248997995991984, -2.2585170340681366, -2.2680360721442887, -2.277555110220441, -2.2870741482965933, -2.296593186372746, -2.306112224448898, -2.3156312625250504, -2.3251503006012024, -2.334669338677355, -2.344188376753507, -2.3537074148296595, -2.363226452905812, -2.372745490981964, -2.3822645290581166, -2.3917835671342687, -2.401302605210421, -2.4108216432865732, -2.4203406813627257, -2.429859719438878, -2.4393787575150303, -2.4488977955911824, -2.458416833667335, -2.4679358717434874, -2.4774549098196395, -2.486973947895792, -2.496492985971944, -2.5060120240480965, -2.5155310621242486, -2.525050100200401, -2.534569138276553, -2.5440881763527057, -2.5536072144288577, -2.5631262525050102, -2.5726452905811623, -2.582164328657315, -2.5916833667334673, -2.6012024048096194, -2.610721442885772, -2.620240480961924, -2.6297595190380765, -2.6392785571142285, -2.648797595190381, -2.658316633266533, -2.6678356713426856, -2.6773547094188377, -2.68687374749499, -2.6963927855711427, -2.7059118236472948, -2.7154308617234473, -2.7249498997995993, -2.734468937875752, -2.743987975951904, -2.7535070140280564, -2.7630260521042085, -2.772545090180361, -2.782064128256513, -2.7915831663326656, -2.801102204408818, -2.81062124248497, -2.8201402805611226, -2.8296593186372747, -2.839178356713427, -2.8486973947895793, -2.858216432865732, -2.867735470941884, -2.8772545090180364, -2.8867735470941884, -2.896292585170341, -2.905811623246493, -2.9153306613226455, -2.924849699398798, -2.93436873747495, -2.9438877755511026, -2.9534068136272547, -2.962925851703407, -2.9724448897795592, -2.9819639278557117, -2.991482965931864, -3.0010020040080163, -3.0105210420841684, -3.020040080160321, -3.0295591182364734, -3.0390781563126255, -3.048597194388778, -3.05811623246493, -3.0676352705410825, -3.0771543086172346, -3.086673346693387, -3.096192384769539, -3.1057114228456917, -3.1152304609218437, -3.1247494989979963, -3.1342685370741488, -3.143787575150301, -3.1533066132264533, -3.1628256513026054, -3.172344689378758, -3.18186372745491, -3.1913827655310625, -3.2009018036072145, -3.210420841683367, -3.219939879759519, -3.2294589178356716, -3.2389779559118237, -3.248496993987976, -3.2580160320641287, -3.2675350701402808, -3.2770541082164333, -3.2865731462925853, -3.296092184368738, -3.30561122244489, -3.3151302605210424, -3.3246492985971945, -3.334168336673347, -3.343687374749499, -3.3532064128256516, -3.362725450901804, -3.372244488977956, -3.3817635270541087, -3.3912825651302607, -3.4008016032064132, -3.4103206412825653, -3.419839679358718, -3.42935871743487, -3.4388777555110224, -3.4483967935871744, -3.457915831663327, -3.4674348697394795, -3.4769539078156315, -3.486472945891784, -3.495991983967936, -3.5055110220440886, -3.5150300601202407, -3.524549098196393, -3.5340681362725452, -3.5435871743486977, -3.55310621242485, -3.5626252505010023, -3.5721442885771544, -3.581663326653307, -3.5911823647294594, -3.6007014028056115, -3.610220440881764, -3.619739478957916, -3.6292585170340685, -3.6387775551102206, -3.648296593186373, -3.657815631262525, -3.6673346693386777, -3.6768537074148298, -3.6863727454909823, -3.6958917835671348, -3.705410821643287, -3.7149298597194393, -3.7244488977955914, -3.733967935871744, -3.743486973947896, -3.7530060120240485, -3.7625250501002006, -3.772044088176353, -3.781563126252505, -3.7910821643286576, -3.80060120240481, -3.810120240480962, -3.8196392785571147, -3.829158316633267, -3.8386773547094193, -3.8481963927855714, -3.857715430861724, -3.867234468937876, -3.8767535070140284, -3.8862725450901805, -3.895791583166333, -3.905310621242485, -3.9148296593186376, -3.92434869739479, -3.933867735470942, -3.9433867735470947, -3.9529058116232467, -3.9624248496993992, -3.9719438877755513, -3.981462925851704, -3.990981963927856, -4.000501002004008, -4.01002004008016, -4.019539078156313, -4.0290581162324655, -4.0385771543086175, -4.0480961923847705, -4.057615230460922, -4.067134268537075, -4.076653306613227, -4.086172344689379, -4.095691382765532, -4.105210420841684, -4.114729458917836, -4.124248496993989, -4.133767535070141, -4.143286573146293, -4.152805611222446, -4.162324649298597, -4.17184368737475, -4.181362725450902, -4.190881763527054, -4.200400801603207, -4.209919839679359, -4.219438877755511, -4.228957915831664, -4.238476953907816, -4.247995991983968, -4.25751503006012, -4.267034068136273, -4.276553106212425, -4.286072144288577, -4.2955911823647295, -4.305110220440882, -4.3146292585170345, -4.324148296593187, -4.333667334669339, -4.343186372745492, -4.352705410821644, -4.362224448897796, -4.371743486973949, -4.381262525050101, -4.390781563126253, -4.400300601202405, -4.409819639278558, -4.41933867735471, -4.428857715430862, -4.438376753507014, -4.447895791583167, -4.457414829659319, -4.466933867735471, -4.476452905811624, -4.485971943887776, -4.495490981963928, -4.50501002004008, -4.514529058116233, -4.524048096192385, -4.533567134268537, -4.543086172344689, -4.552605210420842, -4.562124248496994, -4.5716432865731464, -4.581162324649299, -4.5906813627254515, -4.6002004008016035, -4.609719438877756, -4.6192384769539085, -4.628757515030061, -4.638276553106213, -4.647795591182365, -4.657314629258518, -4.66683366733467, -4.676352705410822, -4.685871743486975, -4.695390781563127, -4.704909819639279, -4.714428857715431, -4.723947895791584, -4.733466933867736, -4.742985971943888, -4.75250501002004, -4.762024048096193, -4.771543086172345, -4.781062124248497, -4.790581162324649, -4.800100200400802, -4.809619238476954, -4.819138276553106, -4.828657314629259, -4.838176352705411, -4.847695390781563, -4.8572144288577155, -4.866733466933868, -4.8762525050100205, -4.885771543086173, -4.895290581162325, -4.904809619238478, -4.91432865731463, -4.923847695390782, -4.933366733466935, -4.942885771543087, -4.952404809619239, -4.961923847695391, -4.971442885771544, -4.980961923847696, -4.990480961923848, -5.0], "si": [-0.24913357031975716, -0.25854996218716786, -0.26795856823506237, -0.2773591069512988, -0.28675129726172444, -0.2961348585453907, -0.305509510649738, -0.3148749739057512, -0.32423096914308297, -0.33357721770514553, -0.3429134414641693, -0.3522393628362262, -0.3615547047962195, -0.3708591908928359, -0.380152545263462, -0.38943449264906127, -0.39870475840901354, -0.4079630685359129, -0.4172091496703261, -0.4264427291155085, -0.43566353485207704, -0.44487129555263927, -0.4540657405963789, -0.4632466000835939, -0.47241360485019007, -0.4815664864821247, -0.4907049773298042, -0.4998288105224308, -0.5089377199822998, -0.5180314404390441, -0.5271097074438301, -0.536172257383496, -0.5452188274946398, -0.5542491558776504, -0.5632629815106848, -0.5722600442635857, -0.5812400849117456, -0.5902028451499086, -0.5991480676059163, -0.6080754958543902, -0.6169848744303564, -0.6258759488428054, -0.6347484655881916, -0.6436021721638676, -0.6524368170814537, -0.6612521498801447, -0.6700479211399468, -0.6788238824948502, -0.6875797866459328, -0.696315387374395, -0.705030439554526, -0.7137246991665983, -0.7223979233096917, -0.7310498702144456, -0.7396802992557386, -0.7482889709652933, -0.7568756470442087, -0.7654400903754144, -0.773982065036052, -0.7825013363097787, -0.7909976706989913, -0.7994708359369752, -0.8079206009999721, -0.8163467361191676, -0.8247490127926008, -0.8331272037969891, -0.8414810831994737, -0.8498104263692802, -0.8581150099892972, -0.86639461206757, -0.8746490119487088, -0.8828779903252119, -0.891081329248702, -0.8992588121410756, -0.9074102238055647, -0.915535350437709, -0.9236339796362408, -0.9317059004138777, -0.9397509032080267, -0.9477687798913954, -0.9557593237825127, -0.9637223296561568, -0.971657593753688, -0.9795649137932918, -0.987444088980122, -0.9952949200163546, -1.0031172091111407, -1.010910759990467, -1.0186753779069178, -1.026410869649338, -1.0341170435524019, -1.0417937095060785, -1.049440678965002, -1.057057764957738, -1.0646447820959544, -1.072201546583486, -1.0797278762253018, -1.0872235904363678, -1.0946885102504078, -1.1021224583285616, -1.109525258967938, -1.1168967381100672, -1.1242367233492432, -1.1315450439407653, -1.138821530809072, -1.1460660165557697, -1.1532783354675535, -1.1604583235240222, -1.1676058184053848, -1.1747206595000594, -1.1818026879121635, -1.1888517464688948, -1.1958676797278043, -1.2028503339839576, -1.2097995572769868, -1.216715199398033, -1.2235971118965756, -1.2304451480871514, -1.2372591630559617, -1.244039013667368, -1.250784558570273, -1.2574956582043917, -1.2641721748064054, -1.2708139724160072, -1.277420916881828, -1.2839928758672519, -1.2905297188561156, -1.2970313171582943, -1.3034975439151684, -1.309928274104981, -1.3163233845480724, -1.322682753912006, -1.3290062627165693, -1.3352937933386668, -1.3415452300170905, -1.3477604588571728, -1.3539393678353275, -1.360081846803466, -1.3661877874933017, -1.3722570835205314, -1.3782896303889036, -1.3842853254941612, -1.3902440681278732, -1.3961657594811425, -1.4020503026481956, -1.407897602629854, -1.4137075663368857, -1.419480102593236, -1.4252151221391411, -1.4309125376341194, -1.4365722636598428, -1.442194216722891, -1.4477783152573829, -1.4533244796274858, -1.4588326321298093, -1.464302696995675, -1.4697346003932659, -1.4751282704296567, -1.4804836371527221, -1.485800632552924, -1.4910791905649798, -1.496319247069407, -1.5015207398939505, -1.5066836088148845, -1.5118077955581977, -1.5168932438006546, -1.5219398991707382, -1.52694770924947, -1.531916623571109, -1.5368465936237317, -1.5417375728496885, -1.5465895166459434, -1.551402382364288, -1.556176129311438, -1.560910718749008, -1.5656061138933686, -1.5702622799153765, -1.5748791839399905, -1.5794567950457659, -1.583995084264226, -1.5884940245791161, -1.5929535909255377, -1.5973737601889615, -1.6017545112041214, -1.6060958247537893, -1.6103976835674314, -1.6146600723197424, -1.618882977629064, -1.623066388055683, -1.627210294100012, -1.6313146882006488, -1.635379564732322, -1.6394049200037144, -1.6433907522551714, -1.6473370616562915, -1.6512438503033982, -1.6551111222168964, -1.6589388833385101, -1.6627271415284075, -1.6664759065622043, -1.670185190127855, -1.6738550058224295, -1.677485369148769, -1.681076297512031, -1.6846278102161236, -1.6881399284600118, -1.691612675333924, -1.6950460758154409, -1.6984401567654628, -1.7017949469240758, -1.705110476906296, -1.708386779197708, -1.7116238881499848, -1.7148218399763036, -1.7179806727466422, -1.7211004263829728, -1.7241811426543383, -1.7272228651718227, -1.7302256393834112, -1.7331895125687398, -1.7361145338337374, -1.7390007541051595, -1.7418482261250132, -1.7446570044448746, -1.7474271454201022, -1.750158707203939, -1.7528517497415126, -1.7555063347637279, -1.758122525781054, -1.7607003880772092, -1.7632399887027408, -1.7657413964684971, -1.7682046819390054, -1.7706299174257378, -1.773017176980282, -1.775366536387408, -1.7776780731580322, -1.7799518665220844, -1.7821879974212729, -1.784386548501752, -1.7865476041066872, -1.7886712502687285, -1.790757574702379, -1.7928066667962728, -1.7948186176053516, -1.7967935198429503, -1.7987314678727828, -1.8006325577008355, -1.8024968869671691, -1.8043245549376228, -1.8061156624954278, -1.80787031213273, -1.8095886079420198, -1.811270655607472, -1.812916562396195, -1.814526437149388, -1.8161003902734187, -1.8176385337307999, -1.8191409810310903, -1.8206078472216989, -1.8220392488786123, -1.823435304097031, -1.824796132481921, -1.826121855138486, -1.8274125946625484, -1.8286684751308608, -1.8298896220913188, -1.831076162553107, -1.8322282249767596, -1.833345939264138, -1.8344294367483347, -1.8354788501834967, -1.836494313734572, -1.8374759629669797, -1.8384239348362033, -1.83933836767731, -1.8402194011943958, -1.841067176449956, -1.8418818358541833, -1.8426635231541955, -1.8434123834231888, -1.844128563049525, -1.8448122097257442, -1.845463472437514, -1.8460825014525053, -1.8466694483092048, -1.8472244658056605, -1.8477477079881606, -1.848239330139848, -1.8486994887692714, -1.8491283415988724, -1.8495260475534123, -1.8498927667483336, -1.8502286604780669, -1.8505338912042726, -1.8508086225440252, -1.8510530192579429, -1.8512672472382543, -1.8514514734968137, -1.8516058661530583, -1.8517305944219122, -1.8518258286016351, -1.851891740061621, -1.8519285012301394, -1.8519362855820338, -1.8519152676263617, -1.851865622893989, -1.851787527925138, -1.8516811602568832, -1.8515466984106042, -1.8513843218793893, -1.8511942111154005, -1.8509765475171844, -1.8507315134169502, -1.8504592920678007, -1.8501600676309216, -1.8498340251627292, -1.8494813506019856, -1.8491022307568654, -1.8486968532919925, -1.8482654067154385, -1.84780808036568, -1.84732506439853, -1.8468165497740265, -1.846282728243294, -1.8457237923353715, -1.845139935344006, -1.8445313513144208, -1.843898235030051, -1.8432407819992513, -1.8425591884419759, -1.8418536512764339, -1.841124368105716, -1.8403715372043987, -1.8395953575051247, -1.8387960285851572, -1.8379737506529175, -1.837128724534498, -1.8362611516601546, -1.8353712340507826, -1.8344591743043757, -1.8335251755824584, -1.832569441596517, -1.8315921765944028, -1.8305935853467237, -1.8295738731332292, -1.8285332457291716, -1.8274719093916678, -1.826390070846037, -1.8252879372721416, -1.8241657162907108, -1.82302361594966, -1.8218618447104011, -1.8206806114341494, -1.8194801253682233, -1.8182605961323415, -1.8170222337049151, -1.815765248409339, -1.8144898509002818, -1.8131962521499745, -1.8118846634345023, -1.8105552963200935, -1.8092083626494133, -1.8078440745278637, -1.8064626443098835, -1.8050642845852523, -1.8036492081654083, -1.802217628069764, -1.8007697575120367, -1.7993058098865846, -1.7978259987547522, -1.7963305378312289, -1.794819640970419, -1.793293522152821, -1.791752395471426, -1.790196475118125, -1.7886259753701317, -1.7870411105764308, -1.7854420951442296, -1.783829143525437, -1.782202470203159, -1.7805622896782147, -1.778908816455671, -1.7772422650314008, -1.7755628498786624, -1.7738707854347053, -1.7721662860873968, -1.7704495661618744, -1.7687208399072278, -1.7669803214832027, -1.7652282249469373, -1.7634647642397219, -1.7616901531737947, -1.7599046054191652, -1.7581083344904647, -1.7563015537338371, -1.7544844763138567, -1.7526573152004816, -1.7508202831560433, -1.7489735927222692, -1.7471174562073453, -1.7452520856730112, -1.7433776929216995, -1.741494489483708, -1.7396026866044163, -1.7377024952315405, -1.7357941260024312, -1.7338777892314112, -1.7319536948971606, -1.7300220526301406, -1.7280830717000664, -1.726136961003424, -1.7241839290510317, -1.7222241839556534, -1.720257933419654, -1.718285384722708, -1.7163067447095561, -1.7143222197778116, -1.712332015865819, -1.7103363384405637, -1.708335392485634, -1.7063293824892376, -1.7043185124322724, -1.70230298577645, -1.7002830054524778, -1.6982587738482948, -1.696230492797368, -1.6941983635670417, -1.692162586846951, -1.6901233627374894, -1.688080890738342, -1.6860353697370734, -1.6839869979977822, -1.681935973149815, -1.6798824921765436, -1.6778267514042073, -1.675768946490817, -1.673709272415126, -1.671647923465667, -1.6695850932298535, -1.6675209745831487, -1.6654557596783044, -1.6633896399346637, -1.6613228060275378, -1.6592554478776482, -1.6571877546406415, -1.6551199146966742, -1.653052115640069, -1.650984544269044, -1.6489173865755142, -1.646850827734965, -1.644785052096402, -1.6427202431723744, -1.640656583629072, -1.6385942552765018, -1.6365334390587356, -1.63447431504424, -1.6324170624162797, -1.6303618594634006, -1.6283088835699917, -1.6262583112069258, -1.6242103179222789, -1.6221650783321322, -1.6201227661114512, -1.6180835539850515, -1.6160476137186397, -1.614015116109942, -1.6119862309799133, -1.6099611271640306, -1.607939972503668, -1.6059229338375587, -1.603910176993341, -1.6019018667791889, -1.5998981669755272, -1.5978992403268368, -1.5959052485335423, -1.5939163522439896, -1.5919327110465085, -1.5899544834615658, -1.5879818269340056, -1.5860148978253772, -1.584053851406355, -1.5820988418492448, -1.5801500222205824, -1.578207544473822, -1.5762715594421146, -1.5743422168311796, -1.572419665212264, -1.5705040520151985, -1.5685955235215412, -1.5666942248578184, -1.5648002999888537, -1.562913891711193, -1.5610351416466248, -1.5591641902357887, -1.5573011767318852, -1.5554462391944734, -1.5535995144833707, -1.5517611382526388, -1.549931244944674], "ci": [-0.8246630625809456, -0.7884999027275412, -0.7537275830159593, -0.7202524051490965, -0.6879901112647359, -0.6568646556001156, -0.6268071696200747, -0.5977550851580332, -0.5696513874737703, -0.5424439757929368, -0.516085113287058, -0.49053095188985757, -0.4657411200542503, -0.44167836370356606, -0.4183082323471476, -0.39559880370999295, -0.3735204413412472, -0.352045580572787, -0.33114853893979157, -0.3108053477834373, -0.2909936022577151, -0.2716923273783501, -0.2528818580980789, -0.23454373168199275, -0.21666059089955422, -0.1992160967545049, -0.18219484964686086, -0.16558231800793327, -0.1493647735742129, -0.1335292325726129, -0.11806340218089877, -0.1029556317056166, -0.0881948679874192, -0.07377061460208573, -0.05967289447610953, -0.04589221557963662, -0.03241953939776997, -0.01924625191460018, -0.006364136873497336, 0.006234648897245718, 0.018557598281868745, 0.030611874966389632, 0.04240433297090444, 0.05394153476080049, 0.06522976805911185, 0.07627506147015321, 0.08708319901382043, 0.09765973366038751, 0.10800999994710167, 0.11813912575026525, 0.1280520432796853, 0.1377534993562711, 0.1472480650280872, 0.15654014457525753, 0.16563398394968692, 0.17453367869158815, 0.1832431813612025, 0.19176630852085857, 0.2001067472995751, 0.20826806156975233, 0.21625369776308823, 0.22406699035066382, 0.23171116701015212, 0.23918935350129705, 0.2465045782691576, 0.2536597767931084, 0.2606577956982184, 0.26750139664437145, 0.27419326000734706, 0.28073598836503166, 0.28713210980096204, 0.2933840810365268, 0.2994942904023362, 0.3054650606585263, 0.31129865167308035, 0.3169972629666182, 0.32256303613152, 0.32799805713272234, 0.3333043584970206, 0.33848392139726236, 0.3435386776373902, 0.3484705115439025, 0.35328126176893837, 0.35797272300986105, 0.36254664764989764, 0.3670047473241111, 0.37134869441470786, 0.3755801234794389, 0.3797006326166208, 0.38371178477008355, 0.38761510897716206, 0.39141210156264844, 0.3951042272814616, 0.3986929204126176, 0.4021795858069406, 0.4055655998908096, 0.4088523116281039, 0.41204104344238923, 0.41513309210126886, 0.4181297295647169, 0.4210322037991101, 0.42384173955857984, 0.42655953913521627, 0.4291867830795737, 0.43172463089285074, 0.4341742216920392, 0.4365366748492734, 0.43881309060654483, 0.44100455066688204, 0.4431121187630448, 0.4451368412047238, 0.4470797474051879, 0.4489418503882695, 0.4507241472765422, 0.45242761976149254, 0.4540532345564516, 0.45560194383301905, 0.4570746856416679, 0.4584723843171913, 0.4597959508696174, 0.4610462833611906, 0.4622242672699866, 0.4633307758407044, 0.46436667042314916, 0.4653328007989009, 0.466230005496638, 0.4670591120965605, 0.4678209375243445, 0.46851628833503345, 0.4691459609872546, 0.4697107421081371, 0.4702114087492817, 0.47064872863412577, 0.47102346039702736, 0.47133635381437833, 0.47158815002804455, 0.471779581761416, 0.4719113735283422, 0.4719842418352095, 0.47199889537641304, 0.4719560352234595, 0.4718563550079331, 0.47170054109854087, 0.4714892727724507, 0.47122322238112224, 0.47090305551082334, 0.4705294311380219, 0.4701030017798261, 0.46962441363964746, 0.46909430674825014, 0.4685133151003459, 0.46788206678688204, 0.46720118412317313, 0.4664712837730123, 0.4656929768689003, 0.4648668691285195, 0.4639935609675766, 0.46307364760913605, 0.46210771918955884, 0.4610963608611556, 0.4600401528916641, 0.4589396707606501, 0.457795485252934, 0.4566081625491356, 0.4553782643134334, 0.45410634777862013, 0.4527929658285458, 0.45143866707802904, 0.4500439959503154, 0.4486094927521559, 0.4471356937465887, 0.44562313122348407, 0.4440723335679314, 0.4424838253265253, 0.4408581272716239, 0.43919575646363407, 0.43749722631138643, 0.43576304663066, 0.4339937237009056, 0.43218976032023027, 0.4303516558586876, 0.4284799063099297, 0.4265750043412656, 0.4246374393421749, 0.4226676974713248, 0.42066626170212684, 0.41863361186688575, 0.41657022469957516, 0.41447657387728243, 0.4123531300603591, 0.41020036093131895, 0.4080187312325161, 0.4058087028026377, 0.4035707346120495, 0.4013052827970237, 0.3990128006928805, 0.39669373886607884, 0.39434854514528117, 0.3919776646514248, 0.38958153982682564, 0.3871606104633454, 0.38471531372964274, 0.3822460841975436, 0.37975335386754283, 0.37723755219347466, 0.3746991061063665, 0.37213844003750296, 0.3695559759407203, 0.36695213331395626, 0.3643273292200706, 0.361681978306964, 0.35901649282700787, 0.3563312826558085, 0.3536267553103245, 0.3509033159663537, 0.3481613674754078, 0.34540131038099364, 0.3426235429343125, 0.3398284611094027, 0.3370164586177329, 0.33418792692226584, 0.33134325525100405, 0.3284828306100376, 0.3256070377961042, 0.3227162594086732, 0.319810875861573, 0.3168912653941709, 0.31395780408211715, 0.3110108658476711, 0.3080508224696126, 0.30507804359276114, 0.30209289673710393, 0.299095747306553, 0.29608695859733425, 0.2930668918060264, 0.2900359060372526, 0.2869943583110435, 0.2839426035698718, 0.28088099468537897, 0.2778098824647903, 0.2747296156570431, 0.27164054095861845, 0.26854300301910605, 0.26543734444649036, 0.2623239058121811, 0.25920302565578934, 0.25607504048965835, 0.25294028480315744, 0.24979909106674514, 0.2466517897358098, 0.24349870925429573, 0.2403401760581214, 0.23717651457839173, 0.23400804724442192, 0.23083509448656714, 0.22765797473887361, 0.22447700444155205, 0.22129249804328177, 0.21810476800334988, 0.2149141247936357, 0.21172087690043795, 0.2085253308261581, 0.20532779109084243, 0.20212856023358539, 0.19892793881380544, 0.19572622541239038, 0.19252371663272605, 0.18932070710160698, 0.1861174894700346, 0.18291435441391113, 0.17971159063462672, 0.1765094848595543, 0.17330832184244693, 0.17010838436374875, 0.16690995323081514, 0.16371330727805944, 0.16051872336701734, 0.15732647638634067, 0.1541368392517164, 0.15095008290572975, 0.14776647631765538, 0.14458628648319527, 0.14140977842416036, 0.13823721518809973, 0.13506885784788558, 0.13190496550124542, 0.12874579527026087, 0.12559160230082012, 0.12244263976204195, 0.11929915884566245, 0.11616140876539283, 0.11302963675625222, 0.10990408807387397, 0.10678500599379426, 0.1036726318107164, 0.10056720483776815, 0.09746896240573522, 0.09437813986229404, 0.09129497057122915, 0.08821968591164842, 0.08515251527719281, 0.08209368607524814, 0.07904342372615458, 0.07600195166242085, 0.07296949132794728, 0.06994626217724953, 0.0669324816746999, 0.06392836529377521, 0.060934126516321685, 0.057949976831835004, 0.05497612573675559, 0.052012780733790454, 0.04906014733124753, 0.046118429042400155, 0.043187827384877586, 0.04026854188007323, 0.037360770052595305, 0.03446470742973351, 0.03158054754096917, 0.02870848191751363, 0.02584870009187945, 0.023001389597494093, 0.020166735968347282, 0.017344922738678825, 0.0145361314427086, 0.011740541614409405, 0.008958330787316005, 0.006189674494395225, 0.003434746267943156, 0.000693717639544067, -0.0020332418599275925, -0.004745964700253902, -0.007444285351769997, -0.010128040285208195, -0.01279706797148461, -0.015451208881438916, -0.01809030548551127, -0.020714202253365288, -0.023322745653454158, -0.025915784152527488, -0.028493168215075082, -0.031054750302716982, -0.03360038487352557, -0.03612992838128615, -0.038643239274700036, -0.04114017799651415, -0.0436206069825924, -0.046084390660920294, -0.04853139545053797, -0.05096148976041448, -0.05337454398824559, -0.055770430519187064, -0.058149023724517024, -0.06051019996023088, -0.06285383756555762, -0.06517981686141683, -0.06748802014879085, -0.06977833170703307, -0.0720506377920993, -0.07430482663470284, -0.07654078843840417, -0.07875841537761175, -0.08095760159552179, -0.0831382432019705, -0.08530023827121735, -0.08744348683964853, -0.08956789090340256, -0.09167335441591895, -0.09375978328541046, -0.09582708537225404, -0.09787517048630345, -0.0999039503841237, -0.10191333876614772, -0.103903251273747, -0.1058736054862286, -0.10782432091775052, -0.10975531901415136, -0.11166652314970538, -0.11355785862379264, -0.11542925265748849, -0.11728063439007386, -0.11911193487545768, -0.12092308707852517, -0.12271402587139502, -0.12448468802960644, -0.12623501222820943, -0.12796493903778305, -0.1296744109203667, -0.13136337222531003, -0.13303176918503912, -0.13467954991073894, -0.13630666438795602, -0.13791306447211538, -0.1394987038839508, -0.14106353820486545, -0.14260752487219136, -0.1441306231743794, -0.14563279424610012, -0.1471140010632639, -0.14857420843795688, -0.1500133830132941, -0.1514314932581915, -0.15282850946205212, -0.15420440372937305, -0.15555914997426726, -0.15689272391490414, -0.15820510306786797, -0.1594962667424338, -0.16076619603476072, -0.1620148738220053, -0.16324228475635105, -0.16444841525895745, -0.16563325351382857, -0.16679678946159862, -0.16793901479323853, -0.1690599229436808, -0.1701595090853642, -0.17123777012169863, -0.17229470468044975, -0.1733303131070435, -0.1743445974577929, -0.1753375614930438, -0.17630921067024305, -0.17725955213692787, -0.17818859472363713, -0.17909634893674464, -0.17998282695121512, -0.18084804260328274, -0.18169201138305324, -0.18251475042702925, -0.18331627851055948, -0.1840966160402126, -0.1848557850460751, -0.18559380917397553, -0.1863107136776321, -0.18700652541072837, -0.1876812728189135, -0.18833498593173048, -0.1889676963544705, -0.18957943725995585, -0.19017024338024974, -0.19074015099829592, -0.19128919793948618, -0.19181742356315776, -0.1923248687540206, -0.19281157591351528, -0.19327758895110111, -0.19372295327547662, -0.19414771578573084, -0.19455192486242806, -0.1949356303586248, -0.1952988835908208, -0.1956417373298434, -0.19596424579166696, -0.1962664646281674, -0.19654845091781195, -0.19681026315628575, -0.19705196124705462, -0.19727360649186565, -0.19747526158118572, -0.19765699058457806, -0.1978188589410187, -0.19796093344915194, -0.19808328225748678, -0.19818597485453363, -0.19826908205888347, -0.19833267600922824, -0.19837683015432456, -0.198401619242901, -0.19840711931350927, -0.19839340768431984, -0.1983605629428636, -0.19830866493571925, -0.19823779475814654, -0.19814803474366904, -0.1980394684536022, -0.19791218066653246, -0.197766257367744, -0.1976017857385971, -0.19741885414585572, -0.1972175521309678, -0.19699797039929678, -0.19676020080930676, -0.19650433636170045, -0.19623047118851197, -0.19593870054215418, -0.19562912078442174, -0.19530182937545146, -0.19495692486263827, -0.19459450686951, -0.19421467608456086, -0.19381753425004383, -0.19340318415072322, -0.19297172960258796, -0.1925232754415269, -0.1920579275119658, -0.19157579265546773, -0.19107697869929752, -0.19056159444494983, -0.1900297496566439]}
},{}],39:[function(require,module,exports){
module.exports={"x": [0.25, 0.2595190380761523, 0.26903807615230463, 0.2785571142284569, 0.2880761523046092, 0.29759519038076154, 0.30711422845691383, 0.3166332665330661, 0.32615230460921846, 0.33567134268537074, 0.3451903807615231, 0.35470941883767537, 0.36422845691382766, 0.37374749498997994, 0.3832665330661323, 0.3927855711422846, 0.4023046092184369, 0.4118236472945892, 0.4213426853707415, 0.4308617234468938, 0.4403807615230461, 0.4498997995991984, 0.45941883767535074, 0.46893787575150303, 0.4784569138276553, 0.4879759519038076, 0.49749498997995995, 0.5070140280561122, 0.5165330661322646, 0.5260521042084169, 0.5355711422845691, 0.5450901803607215, 0.5546092184368738, 0.5641282565130261, 0.5736472945891784, 0.5831663326653307, 0.592685370741483, 0.6022044088176353, 0.6117234468937875, 0.6212424849699398, 0.6307615230460922, 0.6402805611222445, 0.6497995991983968, 0.6593186372745492, 0.6688376753507015, 0.6783567134268538, 0.6878757515030061, 0.6973947895791583, 0.7069138276553106, 0.7164328657314629, 0.7259519038076152, 0.7354709418837676, 0.7449899799599199, 0.7545090180360722, 0.7640280561122245, 0.7735470941883767, 0.7830661322645291, 0.7925851703406814, 0.8021042084168337, 0.811623246492986, 0.8211422845691383, 0.8306613226452906, 0.840180360721443, 0.8496993987975953, 0.8592184368737475, 0.8687374749498998, 0.8782565130260521, 0.8877755511022045, 0.8972945891783568, 0.9068136272545091, 0.9163326653306614, 0.9258517034068137, 0.935370741482966, 0.9448897795591183, 0.9544088176352706, 0.9639278557114229, 0.9734468937875752, 0.9829659318637275, 0.9924849699398798, 1.0020040080160322, 1.0115230460921845, 1.0210420841683367, 1.030561122244489, 1.0400801603206413, 1.0495991983967936, 1.059118236472946, 1.0686372745490984, 1.0781563126252505, 1.087675350701403, 1.097194388777555, 1.1067134268537075, 1.1162324649298598, 1.1257515030060121, 1.1352705410821644, 1.1447895791583167, 1.154308617234469, 1.1638276553106213, 1.1733466933867738, 1.1828657314629258, 1.1923847695390783, 1.2019038076152304, 1.211422845691383, 1.2209418837675352, 1.2304609218436875, 1.2399799599198398, 1.249498997995992, 1.2590180360721444, 1.2685370741482966, 1.278056112224449, 1.2875751503006012, 1.2970941883767535, 1.306613226452906, 1.3161322645290583, 1.3256513026052106, 1.3351703406813629, 1.3446893787575152, 1.3542084168336674, 1.3637274549098197, 1.373246492985972, 1.3827655310621243, 1.3922845691382766, 1.4018036072144289, 1.4113226452905812, 1.4208416833667337, 1.430360721442886, 1.4398797595190382, 1.4493987975951905, 1.4589178356713428, 1.468436873747495, 1.4779559118236474, 1.4874749498997997, 1.496993987975952, 1.5065130260521042, 1.5160320641282565, 1.525551102204409, 1.5350701402805613, 1.5445891783567136, 1.554108216432866, 1.5636272545090182, 1.5731462925851705, 1.5826653306613228, 1.592184368737475, 1.6017034068136273, 1.6112224448897796, 1.620741482965932, 1.6302605210420842, 1.6397795591182367, 1.649298597194389, 1.6588176352705413, 1.6683366733466936, 1.6778557114228458, 1.6873747494989981, 1.6968937875751504, 1.7064128256513027, 1.715931863727455, 1.7254509018036073, 1.7349699398797596, 1.7444889779559118, 1.7540080160320644, 1.7635270541082166, 1.773046092184369, 1.7825651302605212, 1.7920841683366735, 1.8016032064128258, 1.811122244488978, 1.8206412825651304, 1.8301603206412826, 1.839679358717435, 1.8491983967935872, 1.8587174348697397, 1.868236472945892, 1.8777555110220443, 1.8872745490981966, 1.8967935871743489, 1.9063126252505012, 1.9158316633266534, 1.9253507014028057, 1.934869739478958, 1.9443887775551103, 1.9539078156312626, 1.9634268537074149, 1.9729458917835674, 1.9824649298597197, 1.991983967935872, 2.0015030060120242, 2.0110220440881763, 2.020541082164329, 2.0300601202404813, 2.0395791583166334, 2.0490981963927855, 2.058617234468938, 2.0681362725450905, 2.0776553106212425, 2.087174348697395, 2.0966933867735476, 2.1062124248496996, 2.1157314629258517, 2.125250501002004, 2.1347695390781567, 2.1442885771543088, 2.153807615230461, 2.1633266533066133, 2.172845691382766, 2.182364729458918, 2.1918837675350704, 2.201402805611223, 2.210921843687375, 2.220440881763527, 2.2299599198396796, 2.239478957915832, 2.248997995991984, 2.2585170340681366, 2.2680360721442887, 2.277555110220441, 2.2870741482965933, 2.296593186372746, 2.306112224448898, 2.3156312625250504, 2.3251503006012024, 2.334669338677355, 2.344188376753507, 2.3537074148296595, 2.363226452905812, 2.372745490981964, 2.3822645290581166, 2.3917835671342687, 2.401302605210421, 2.4108216432865732, 2.4203406813627257, 2.429859719438878, 2.4393787575150303, 2.4488977955911824, 2.458416833667335, 2.4679358717434874, 2.4774549098196395, 2.486973947895792, 2.496492985971944, 2.5060120240480965, 2.5155310621242486, 2.525050100200401, 2.534569138276553, 2.5440881763527057, 2.5536072144288577, 2.5631262525050102, 2.5726452905811623, 2.582164328657315, 2.5916833667334673, 2.6012024048096194, 2.610721442885772, 2.620240480961924, 2.6297595190380765, 2.6392785571142285, 2.648797595190381, 2.658316633266533, 2.6678356713426856, 2.6773547094188377, 2.68687374749499, 2.6963927855711427, 2.7059118236472948, 2.7154308617234473, 2.7249498997995993, 2.734468937875752, 2.743987975951904, 2.7535070140280564, 2.7630260521042085, 2.772545090180361, 2.782064128256513, 2.7915831663326656, 2.801102204408818, 2.81062124248497, 2.8201402805611226, 2.8296593186372747, 2.839178356713427, 2.8486973947895793, 2.858216432865732, 2.867735470941884, 2.8772545090180364, 2.8867735470941884, 2.896292585170341, 2.905811623246493, 2.9153306613226455, 2.924849699398798, 2.93436873747495, 2.9438877755511026, 2.9534068136272547, 2.962925851703407, 2.9724448897795592, 2.9819639278557117, 2.991482965931864, 3.0010020040080163, 3.0105210420841684, 3.020040080160321, 3.0295591182364734, 3.0390781563126255, 3.048597194388778, 3.05811623246493, 3.0676352705410825, 3.0771543086172346, 3.086673346693387, 3.096192384769539, 3.1057114228456917, 3.1152304609218437, 3.1247494989979963, 3.1342685370741488, 3.143787575150301, 3.1533066132264533, 3.1628256513026054, 3.172344689378758, 3.18186372745491, 3.1913827655310625, 3.2009018036072145, 3.210420841683367, 3.219939879759519, 3.2294589178356716, 3.2389779559118237, 3.248496993987976, 3.2580160320641287, 3.2675350701402808, 3.2770541082164333, 3.2865731462925853, 3.296092184368738, 3.30561122244489, 3.3151302605210424, 3.3246492985971945, 3.334168336673347, 3.343687374749499, 3.3532064128256516, 3.362725450901804, 3.372244488977956, 3.3817635270541087, 3.3912825651302607, 3.4008016032064132, 3.4103206412825653, 3.419839679358718, 3.42935871743487, 3.4388777555110224, 3.4483967935871744, 3.457915831663327, 3.4674348697394795, 3.4769539078156315, 3.486472945891784, 3.495991983967936, 3.5055110220440886, 3.5150300601202407, 3.524549098196393, 3.5340681362725452, 3.5435871743486977, 3.55310621242485, 3.5626252505010023, 3.5721442885771544, 3.581663326653307, 3.5911823647294594, 3.6007014028056115, 3.610220440881764, 3.619739478957916, 3.6292585170340685, 3.6387775551102206, 3.648296593186373, 3.657815631262525, 3.6673346693386777, 3.6768537074148298, 3.6863727454909823, 3.6958917835671348, 3.705410821643287, 3.7149298597194393, 3.7244488977955914, 3.733967935871744, 3.743486973947896, 3.7530060120240485, 3.7625250501002006, 3.772044088176353, 3.781563126252505, 3.7910821643286576, 3.80060120240481, 3.810120240480962, 3.8196392785571147, 3.829158316633267, 3.8386773547094193, 3.8481963927855714, 3.857715430861724, 3.867234468937876, 3.8767535070140284, 3.8862725450901805, 3.895791583166333, 3.905310621242485, 3.9148296593186376, 3.92434869739479, 3.933867735470942, 3.9433867735470947, 3.9529058116232467, 3.9624248496993992, 3.9719438877755513, 3.981462925851704, 3.990981963927856, 4.000501002004008, 4.01002004008016, 4.019539078156313, 4.0290581162324655, 4.0385771543086175, 4.0480961923847705, 4.057615230460922, 4.067134268537075, 4.076653306613227, 4.086172344689379, 4.095691382765532, 4.105210420841684, 4.114729458917836, 4.124248496993989, 4.133767535070141, 4.143286573146293, 4.152805611222446, 4.162324649298597, 4.17184368737475, 4.181362725450902, 4.190881763527054, 4.200400801603207, 4.209919839679359, 4.219438877755511, 4.228957915831664, 4.238476953907816, 4.247995991983968, 4.25751503006012, 4.267034068136273, 4.276553106212425, 4.286072144288577, 4.2955911823647295, 4.305110220440882, 4.3146292585170345, 4.324148296593187, 4.333667334669339, 4.343186372745492, 4.352705410821644, 4.362224448897796, 4.371743486973949, 4.381262525050101, 4.390781563126253, 4.400300601202405, 4.409819639278558, 4.41933867735471, 4.428857715430862, 4.438376753507014, 4.447895791583167, 4.457414829659319, 4.466933867735471, 4.476452905811624, 4.485971943887776, 4.495490981963928, 4.50501002004008, 4.514529058116233, 4.524048096192385, 4.533567134268537, 4.543086172344689, 4.552605210420842, 4.562124248496994, 4.5716432865731464, 4.581162324649299, 4.5906813627254515, 4.6002004008016035, 4.609719438877756, 4.6192384769539085, 4.628757515030061, 4.638276553106213, 4.647795591182365, 4.657314629258518, 4.66683366733467, 4.676352705410822, 4.685871743486975, 4.695390781563127, 4.704909819639279, 4.714428857715431, 4.723947895791584, 4.733466933867736, 4.742985971943888, 4.75250501002004, 4.762024048096193, 4.771543086172345, 4.781062124248497, 4.790581162324649, 4.800100200400802, 4.809619238476954, 4.819138276553106, 4.828657314629259, 4.838176352705411, 4.847695390781563, 4.8572144288577155, 4.866733466933868, 4.8762525050100205, 4.885771543086173, 4.895290581162325, 4.904809619238478, 4.91432865731463, 4.923847695390782, 4.933366733466935, 4.942885771543087, 4.952404809619239, 4.961923847695391, 4.971442885771544, 4.980961923847696, 4.990480961923848, 5.0], "si": [0.24913357031975716, 0.25854996218716786, 0.26795856823506237, 0.2773591069512988, 0.28675129726172444, 0.2961348585453907, 0.305509510649738, 0.3148749739057512, 0.32423096914308297, 0.33357721770514553, 0.3429134414641693, 0.3522393628362262, 0.3615547047962195, 0.3708591908928359, 0.380152545263462, 0.38943449264906127, 0.39870475840901354, 0.4079630685359129, 0.4172091496703261, 0.4264427291155085, 0.43566353485207704, 0.44487129555263927, 0.4540657405963789, 0.4632466000835939, 0.47241360485019007, 0.4815664864821247, 0.4907049773298042, 0.4998288105224308, 0.5089377199822998, 0.5180314404390441, 0.5271097074438301, 0.536172257383496, 0.5452188274946398, 0.5542491558776504, 0.5632629815106848, 0.5722600442635857, 0.5812400849117456, 0.5902028451499086, 0.5991480676059163, 0.6080754958543902, 0.6169848744303564, 0.6258759488428054, 0.6347484655881916, 0.6436021721638676, 0.6524368170814537, 0.6612521498801447, 0.6700479211399468, 0.6788238824948502, 0.6875797866459328, 0.696315387374395, 0.705030439554526, 0.7137246991665983, 0.7223979233096917, 0.7310498702144456, 0.7396802992557386, 0.7482889709652933, 0.7568756470442087, 0.7654400903754144, 0.773982065036052, 0.7825013363097787, 0.7909976706989913, 0.7994708359369752, 0.8079206009999721, 0.8163467361191676, 0.8247490127926008, 0.8331272037969891, 0.8414810831994737, 0.8498104263692802, 0.8581150099892972, 0.86639461206757, 0.8746490119487088, 0.8828779903252119, 0.891081329248702, 0.8992588121410756, 0.9074102238055647, 0.915535350437709, 0.9236339796362408, 0.9317059004138777, 0.9397509032080267, 0.9477687798913954, 0.9557593237825127, 0.9637223296561568, 0.971657593753688, 0.9795649137932918, 0.987444088980122, 0.9952949200163546, 1.0031172091111407, 1.010910759990467, 1.0186753779069178, 1.026410869649338, 1.0341170435524019, 1.0417937095060785, 1.049440678965002, 1.057057764957738, 1.0646447820959544, 1.072201546583486, 1.0797278762253018, 1.0872235904363678, 1.0946885102504078, 1.1021224583285616, 1.109525258967938, 1.1168967381100672, 1.1242367233492432, 1.1315450439407653, 1.138821530809072, 1.1460660165557697, 1.1532783354675535, 1.1604583235240222, 1.1676058184053848, 1.1747206595000594, 1.1818026879121635, 1.1888517464688948, 1.1958676797278043, 1.2028503339839576, 1.2097995572769868, 1.216715199398033, 1.2235971118965756, 1.2304451480871514, 1.2372591630559617, 1.244039013667368, 1.250784558570273, 1.2574956582043917, 1.2641721748064054, 1.2708139724160072, 1.277420916881828, 1.2839928758672519, 1.2905297188561156, 1.2970313171582943, 1.3034975439151684, 1.309928274104981, 1.3163233845480724, 1.322682753912006, 1.3290062627165693, 1.3352937933386668, 1.3415452300170905, 1.3477604588571728, 1.3539393678353275, 1.360081846803466, 1.3661877874933017, 1.3722570835205314, 1.3782896303889036, 1.3842853254941612, 1.3902440681278732, 1.3961657594811425, 1.4020503026481956, 1.407897602629854, 1.4137075663368857, 1.419480102593236, 1.4252151221391411, 1.4309125376341194, 1.4365722636598428, 1.442194216722891, 1.4477783152573829, 1.4533244796274858, 1.4588326321298093, 1.464302696995675, 1.4697346003932659, 1.4751282704296567, 1.4804836371527221, 1.485800632552924, 1.4910791905649798, 1.496319247069407, 1.5015207398939505, 1.5066836088148845, 1.5118077955581977, 1.5168932438006546, 1.5219398991707382, 1.52694770924947, 1.531916623571109, 1.5368465936237317, 1.5417375728496885, 1.5465895166459434, 1.551402382364288, 1.556176129311438, 1.560910718749008, 1.5656061138933686, 1.5702622799153765, 1.5748791839399905, 1.5794567950457659, 1.583995084264226, 1.5884940245791161, 1.5929535909255377, 1.5973737601889615, 1.6017545112041214, 1.6060958247537893, 1.6103976835674314, 1.6146600723197424, 1.618882977629064, 1.623066388055683, 1.627210294100012, 1.6313146882006488, 1.635379564732322, 1.6394049200037144, 1.6433907522551714, 1.6473370616562915, 1.6512438503033982, 1.6551111222168964, 1.6589388833385101, 1.6627271415284075, 1.6664759065622043, 1.670185190127855, 1.6738550058224295, 1.677485369148769, 1.681076297512031, 1.6846278102161236, 1.6881399284600118, 1.691612675333924, 1.6950460758154409, 1.6984401567654628, 1.7017949469240758, 1.705110476906296, 1.708386779197708, 1.7116238881499848, 1.7148218399763036, 1.7179806727466422, 1.7211004263829728, 1.7241811426543383, 1.7272228651718227, 1.7302256393834112, 1.7331895125687398, 1.7361145338337374, 1.7390007541051595, 1.7418482261250132, 1.7446570044448746, 1.7474271454201022, 1.750158707203939, 1.7528517497415126, 1.7555063347637279, 1.758122525781054, 1.7607003880772092, 1.7632399887027408, 1.7657413964684971, 1.7682046819390054, 1.7706299174257378, 1.773017176980282, 1.775366536387408, 1.7776780731580322, 1.7799518665220844, 1.7821879974212729, 1.784386548501752, 1.7865476041066872, 1.7886712502687285, 1.790757574702379, 1.7928066667962728, 1.7948186176053516, 1.7967935198429503, 1.7987314678727828, 1.8006325577008355, 1.8024968869671691, 1.8043245549376228, 1.8061156624954278, 1.80787031213273, 1.8095886079420198, 1.811270655607472, 1.812916562396195, 1.814526437149388, 1.8161003902734187, 1.8176385337307999, 1.8191409810310903, 1.8206078472216989, 1.8220392488786123, 1.823435304097031, 1.824796132481921, 1.826121855138486, 1.8274125946625484, 1.8286684751308608, 1.8298896220913188, 1.831076162553107, 1.8322282249767596, 1.833345939264138, 1.8344294367483347, 1.8354788501834967, 1.836494313734572, 1.8374759629669797, 1.8384239348362033, 1.83933836767731, 1.8402194011943958, 1.841067176449956, 1.8418818358541833, 1.8426635231541955, 1.8434123834231888, 1.844128563049525, 1.8448122097257442, 1.845463472437514, 1.8460825014525053, 1.8466694483092048, 1.8472244658056605, 1.8477477079881606, 1.848239330139848, 1.8486994887692714, 1.8491283415988724, 1.8495260475534123, 1.8498927667483336, 1.8502286604780669, 1.8505338912042726, 1.8508086225440252, 1.8510530192579429, 1.8512672472382543, 1.8514514734968137, 1.8516058661530583, 1.8517305944219122, 1.8518258286016351, 1.851891740061621, 1.8519285012301394, 1.8519362855820338, 1.8519152676263617, 1.851865622893989, 1.851787527925138, 1.8516811602568832, 1.8515466984106042, 1.8513843218793893, 1.8511942111154005, 1.8509765475171844, 1.8507315134169502, 1.8504592920678007, 1.8501600676309216, 1.8498340251627292, 1.8494813506019856, 1.8491022307568654, 1.8486968532919925, 1.8482654067154385, 1.84780808036568, 1.84732506439853, 1.8468165497740265, 1.846282728243294, 1.8457237923353715, 1.845139935344006, 1.8445313513144208, 1.843898235030051, 1.8432407819992513, 1.8425591884419759, 1.8418536512764339, 1.841124368105716, 1.8403715372043987, 1.8395953575051247, 1.8387960285851572, 1.8379737506529175, 1.837128724534498, 1.8362611516601546, 1.8353712340507826, 1.8344591743043757, 1.8335251755824584, 1.832569441596517, 1.8315921765944028, 1.8305935853467237, 1.8295738731332292, 1.8285332457291716, 1.8274719093916678, 1.826390070846037, 1.8252879372721416, 1.8241657162907108, 1.82302361594966, 1.8218618447104011, 1.8206806114341494, 1.8194801253682233, 1.8182605961323415, 1.8170222337049151, 1.815765248409339, 1.8144898509002818, 1.8131962521499745, 1.8118846634345023, 1.8105552963200935, 1.8092083626494133, 1.8078440745278637, 1.8064626443098835, 1.8050642845852523, 1.8036492081654083, 1.802217628069764, 1.8007697575120367, 1.7993058098865846, 1.7978259987547522, 1.7963305378312289, 1.794819640970419, 1.793293522152821, 1.791752395471426, 1.790196475118125, 1.7886259753701317, 1.7870411105764308, 1.7854420951442296, 1.783829143525437, 1.782202470203159, 1.7805622896782147, 1.778908816455671, 1.7772422650314008, 1.7755628498786624, 1.7738707854347053, 1.7721662860873968, 1.7704495661618744, 1.7687208399072278, 1.7669803214832027, 1.7652282249469373, 1.7634647642397219, 1.7616901531737947, 1.7599046054191652, 1.7581083344904647, 1.7563015537338371, 1.7544844763138567, 1.7526573152004816, 1.7508202831560433, 1.7489735927222692, 1.7471174562073453, 1.7452520856730112, 1.7433776929216995, 1.741494489483708, 1.7396026866044163, 1.7377024952315405, 1.7357941260024312, 1.7338777892314112, 1.7319536948971606, 1.7300220526301406, 1.7280830717000664, 1.726136961003424, 1.7241839290510317, 1.7222241839556534, 1.720257933419654, 1.718285384722708, 1.7163067447095561, 1.7143222197778116, 1.712332015865819, 1.7103363384405637, 1.708335392485634, 1.7063293824892376, 1.7043185124322724, 1.70230298577645, 1.7002830054524778, 1.6982587738482948, 1.696230492797368, 1.6941983635670417, 1.692162586846951, 1.6901233627374894, 1.688080890738342, 1.6860353697370734, 1.6839869979977822, 1.681935973149815, 1.6798824921765436, 1.6778267514042073, 1.675768946490817, 1.673709272415126, 1.671647923465667, 1.6695850932298535, 1.6675209745831487, 1.6654557596783044, 1.6633896399346637, 1.6613228060275378, 1.6592554478776482, 1.6571877546406415, 1.6551199146966742, 1.653052115640069, 1.650984544269044, 1.6489173865755142, 1.646850827734965, 1.644785052096402, 1.6427202431723744, 1.640656583629072, 1.6385942552765018, 1.6365334390587356, 1.63447431504424, 1.6324170624162797, 1.6303618594634006, 1.6283088835699917, 1.6262583112069258, 1.6242103179222789, 1.6221650783321322, 1.6201227661114512, 1.6180835539850515, 1.6160476137186397, 1.614015116109942, 1.6119862309799133, 1.6099611271640306, 1.607939972503668, 1.6059229338375587, 1.603910176993341, 1.6019018667791889, 1.5998981669755272, 1.5978992403268368, 1.5959052485335423, 1.5939163522439896, 1.5919327110465085, 1.5899544834615658, 1.5879818269340056, 1.5860148978253772, 1.584053851406355, 1.5820988418492448, 1.5801500222205824, 1.578207544473822, 1.5762715594421146, 1.5743422168311796, 1.572419665212264, 1.5705040520151985, 1.5685955235215412, 1.5666942248578184, 1.5648002999888537, 1.562913891711193, 1.5610351416466248, 1.5591641902357887, 1.5573011767318852, 1.5554462391944734, 1.5535995144833707, 1.5517611382526388, 1.549931244944674], "ci": [-0.8246630625809456, -0.7884999027275412, -0.7537275830159593, -0.7202524051490965, -0.6879901112647359, -0.6568646556001156, -0.6268071696200747, -0.5977550851580332, -0.5696513874737703, -0.5424439757929368, -0.516085113287058, -0.49053095188985757, -0.4657411200542503, -0.44167836370356606, -0.4183082323471476, -0.39559880370999295, -0.3735204413412472, -0.352045580572787, -0.33114853893979157, -0.3108053477834373, -0.2909936022577151, -0.2716923273783501, -0.2528818580980789, -0.23454373168199275, -0.21666059089955422, -0.1992160967545049, -0.18219484964686086, -0.16558231800793327, -0.1493647735742129, -0.1335292325726129, -0.11806340218089877, -0.1029556317056166, -0.0881948679874192, -0.07377061460208573, -0.05967289447610953, -0.04589221557963662, -0.03241953939776997, -0.01924625191460018, -0.006364136873497336, 0.006234648897245718, 0.018557598281868745, 0.030611874966389632, 0.04240433297090444, 0.05394153476080049, 0.06522976805911185, 0.07627506147015321, 0.08708319901382043, 0.09765973366038751, 0.10800999994710167, 0.11813912575026525, 0.1280520432796853, 0.1377534993562711, 0.1472480650280872, 0.15654014457525753, 0.16563398394968692, 0.17453367869158815, 0.1832431813612025, 0.19176630852085857, 0.2001067472995751, 0.20826806156975233, 0.21625369776308823, 0.22406699035066382, 0.23171116701015212, 0.23918935350129705, 0.2465045782691576, 0.2536597767931084, 0.2606577956982184, 0.26750139664437145, 0.27419326000734706, 0.28073598836503166, 0.28713210980096204, 0.2933840810365268, 0.2994942904023362, 0.3054650606585263, 0.31129865167308035, 0.3169972629666182, 0.32256303613152, 0.32799805713272234, 0.3333043584970206, 0.33848392139726236, 0.3435386776373902, 0.3484705115439025, 0.35328126176893837, 0.35797272300986105, 0.36254664764989764, 0.3670047473241111, 0.37134869441470786, 0.3755801234794389, 0.3797006326166208, 0.38371178477008355, 0.38761510897716206, 0.39141210156264844, 0.3951042272814616, 0.3986929204126176, 0.4021795858069406, 0.4055655998908096, 0.4088523116281039, 0.41204104344238923, 0.41513309210126886, 0.4181297295647169, 0.4210322037991101, 0.42384173955857984, 0.42655953913521627, 0.4291867830795737, 0.43172463089285074, 0.4341742216920392, 0.4365366748492734, 0.43881309060654483, 0.44100455066688204, 0.4431121187630448, 0.4451368412047238, 0.4470797474051879, 0.4489418503882695, 0.4507241472765422, 0.45242761976149254, 0.4540532345564516, 0.45560194383301905, 0.4570746856416679, 0.4584723843171913, 0.4597959508696174, 0.4610462833611906, 0.4622242672699866, 0.4633307758407044, 0.46436667042314916, 0.4653328007989009, 0.466230005496638, 0.4670591120965605, 0.4678209375243445, 0.46851628833503345, 0.4691459609872546, 0.4697107421081371, 0.4702114087492817, 0.47064872863412577, 0.47102346039702736, 0.47133635381437833, 0.47158815002804455, 0.471779581761416, 0.4719113735283422, 0.4719842418352095, 0.47199889537641304, 0.4719560352234595, 0.4718563550079331, 0.47170054109854087, 0.4714892727724507, 0.47122322238112224, 0.47090305551082334, 0.4705294311380219, 0.4701030017798261, 0.46962441363964746, 0.46909430674825014, 0.4685133151003459, 0.46788206678688204, 0.46720118412317313, 0.4664712837730123, 0.4656929768689003, 0.4648668691285195, 0.4639935609675766, 0.46307364760913605, 0.46210771918955884, 0.4610963608611556, 0.4600401528916641, 0.4589396707606501, 0.457795485252934, 0.4566081625491356, 0.4553782643134334, 0.45410634777862013, 0.4527929658285458, 0.45143866707802904, 0.4500439959503154, 0.4486094927521559, 0.4471356937465887, 0.44562313122348407, 0.4440723335679314, 0.4424838253265253, 0.4408581272716239, 0.43919575646363407, 0.43749722631138643, 0.43576304663066, 0.4339937237009056, 0.43218976032023027, 0.4303516558586876, 0.4284799063099297, 0.4265750043412656, 0.4246374393421749, 0.4226676974713248, 0.42066626170212684, 0.41863361186688575, 0.41657022469957516, 0.41447657387728243, 0.4123531300603591, 0.41020036093131895, 0.4080187312325161, 0.4058087028026377, 0.4035707346120495, 0.4013052827970237, 0.3990128006928805, 0.39669373886607884, 0.39434854514528117, 0.3919776646514248, 0.38958153982682564, 0.3871606104633454, 0.38471531372964274, 0.3822460841975436, 0.37975335386754283, 0.37723755219347466, 0.3746991061063665, 0.37213844003750296, 0.3695559759407203, 0.36695213331395626, 0.3643273292200706, 0.361681978306964, 0.35901649282700787, 0.3563312826558085, 0.3536267553103245, 0.3509033159663537, 0.3481613674754078, 0.34540131038099364, 0.3426235429343125, 0.3398284611094027, 0.3370164586177329, 0.33418792692226584, 0.33134325525100405, 0.3284828306100376, 0.3256070377961042, 0.3227162594086732, 0.319810875861573, 0.3168912653941709, 0.31395780408211715, 0.3110108658476711, 0.3080508224696126, 0.30507804359276114, 0.30209289673710393, 0.299095747306553, 0.29608695859733425, 0.2930668918060264, 0.2900359060372526, 0.2869943583110435, 0.2839426035698718, 0.28088099468537897, 0.2778098824647903, 0.2747296156570431, 0.27164054095861845, 0.26854300301910605, 0.26543734444649036, 0.2623239058121811, 0.25920302565578934, 0.25607504048965835, 0.25294028480315744, 0.24979909106674514, 0.2466517897358098, 0.24349870925429573, 0.2403401760581214, 0.23717651457839173, 0.23400804724442192, 0.23083509448656714, 0.22765797473887361, 0.22447700444155205, 0.22129249804328177, 0.21810476800334988, 0.2149141247936357, 0.21172087690043795, 0.2085253308261581, 0.20532779109084243, 0.20212856023358539, 0.19892793881380544, 0.19572622541239038, 0.19252371663272605, 0.18932070710160698, 0.1861174894700346, 0.18291435441391113, 0.17971159063462672, 0.1765094848595543, 0.17330832184244693, 0.17010838436374875, 0.16690995323081514, 0.16371330727805944, 0.16051872336701734, 0.15732647638634067, 0.1541368392517164, 0.15095008290572975, 0.14776647631765538, 0.14458628648319527, 0.14140977842416036, 0.13823721518809973, 0.13506885784788558, 0.13190496550124542, 0.12874579527026087, 0.12559160230082012, 0.12244263976204195, 0.11929915884566245, 0.11616140876539283, 0.11302963675625222, 0.10990408807387397, 0.10678500599379426, 0.1036726318107164, 0.10056720483776815, 0.09746896240573522, 0.09437813986229404, 0.09129497057122915, 0.08821968591164842, 0.08515251527719281, 0.08209368607524814, 0.07904342372615458, 0.07600195166242085, 0.07296949132794728, 0.06994626217724953, 0.0669324816746999, 0.06392836529377521, 0.060934126516321685, 0.057949976831835004, 0.05497612573675559, 0.052012780733790454, 0.04906014733124753, 0.046118429042400155, 0.043187827384877586, 0.04026854188007323, 0.037360770052595305, 0.03446470742973351, 0.03158054754096917, 0.02870848191751363, 0.02584870009187945, 0.023001389597494093, 0.020166735968347282, 0.017344922738678825, 0.0145361314427086, 0.011740541614409405, 0.008958330787316005, 0.006189674494395225, 0.003434746267943156, 0.000693717639544067, -0.0020332418599275925, -0.004745964700253902, -0.007444285351769997, -0.010128040285208195, -0.01279706797148461, -0.015451208881438916, -0.01809030548551127, -0.020714202253365288, -0.023322745653454158, -0.025915784152527488, -0.028493168215075082, -0.031054750302716982, -0.03360038487352557, -0.03612992838128615, -0.038643239274700036, -0.04114017799651415, -0.0436206069825924, -0.046084390660920294, -0.04853139545053797, -0.05096148976041448, -0.05337454398824559, -0.055770430519187064, -0.058149023724517024, -0.06051019996023088, -0.06285383756555762, -0.06517981686141683, -0.06748802014879085, -0.06977833170703307, -0.0720506377920993, -0.07430482663470284, -0.07654078843840417, -0.07875841537761175, -0.08095760159552179, -0.0831382432019705, -0.08530023827121735, -0.08744348683964853, -0.08956789090340256, -0.09167335441591895, -0.09375978328541046, -0.09582708537225404, -0.09787517048630345, -0.0999039503841237, -0.10191333876614772, -0.103903251273747, -0.1058736054862286, -0.10782432091775052, -0.10975531901415136, -0.11166652314970538, -0.11355785862379264, -0.11542925265748849, -0.11728063439007386, -0.11911193487545768, -0.12092308707852517, -0.12271402587139502, -0.12448468802960644, -0.12623501222820943, -0.12796493903778305, -0.1296744109203667, -0.13136337222531003, -0.13303176918503912, -0.13467954991073894, -0.13630666438795602, -0.13791306447211538, -0.1394987038839508, -0.14106353820486545, -0.14260752487219136, -0.1441306231743794, -0.14563279424610012, -0.1471140010632639, -0.14857420843795688, -0.1500133830132941, -0.1514314932581915, -0.15282850946205212, -0.15420440372937305, -0.15555914997426726, -0.15689272391490414, -0.15820510306786797, -0.1594962667424338, -0.16076619603476072, -0.1620148738220053, -0.16324228475635105, -0.16444841525895745, -0.16563325351382857, -0.16679678946159862, -0.16793901479323853, -0.1690599229436808, -0.1701595090853642, -0.17123777012169863, -0.17229470468044975, -0.1733303131070435, -0.1743445974577929, -0.1753375614930438, -0.17630921067024305, -0.17725955213692787, -0.17818859472363713, -0.17909634893674464, -0.17998282695121512, -0.18084804260328274, -0.18169201138305324, -0.18251475042702925, -0.18331627851055948, -0.1840966160402126, -0.1848557850460751, -0.18559380917397553, -0.1863107136776321, -0.18700652541072837, -0.1876812728189135, -0.18833498593173048, -0.1889676963544705, -0.18957943725995585, -0.19017024338024974, -0.19074015099829592, -0.19128919793948618, -0.19181742356315776, -0.1923248687540206, -0.19281157591351528, -0.19327758895110111, -0.19372295327547662, -0.19414771578573084, -0.19455192486242806, -0.1949356303586248, -0.1952988835908208, -0.1956417373298434, -0.19596424579166696, -0.1962664646281674, -0.19654845091781195, -0.19681026315628575, -0.19705196124705462, -0.19727360649186565, -0.19747526158118572, -0.19765699058457806, -0.1978188589410187, -0.19796093344915194, -0.19808328225748678, -0.19818597485453363, -0.19826908205888347, -0.19833267600922824, -0.19837683015432456, -0.198401619242901, -0.19840711931350927, -0.19839340768431984, -0.1983605629428636, -0.19830866493571925, -0.19823779475814654, -0.19814803474366904, -0.1980394684536022, -0.19791218066653246, -0.197766257367744, -0.1976017857385971, -0.19741885414585572, -0.1972175521309678, -0.19699797039929678, -0.19676020080930676, -0.19650433636170045, -0.19623047118851197, -0.19593870054215418, -0.19562912078442174, -0.19530182937545146, -0.19495692486263827, -0.19459450686951, -0.19421467608456086, -0.19381753425004383, -0.19340318415072322, -0.19297172960258796, -0.1925232754415269, -0.1920579275119658, -0.19157579265546773, -0.19107697869929752, -0.19056159444494983, -0.1900297496566439]}
},{}],40:[function(require,module,exports){
module.exports={"x": [-0.0001, -0.0006008016032064129, -0.0011016032064128257, -0.0016024048096192386, -0.002103206412825651, -0.002604008016032064, -0.003104809619238477, -0.0036056112224448897, -0.004106412825651303, -0.004607214428857716, -0.005108016032064128, -0.005608817635270541, -0.0061096192384769545, -0.006610420841683367, -0.00711122244488978, -0.007612024048096192, -0.008112825651302604, -0.008613627254509017, -0.00911442885771543, -0.009615230460921843, -0.010116032064128255, -0.01061683366733467, -0.011117635270541082, -0.011618436873747494, -0.012119238476953908, -0.01262004008016032, -0.013120841683366732, -0.013621643286573145, -0.014122444889779559, -0.014623246492985971, -0.015124048096192383, -0.015624849699398797, -0.01612565130260521, -0.016626452905811624, -0.017127254509018034, -0.017628056112224448, -0.018128857715430862, -0.018629659318637273, -0.019130460921843687, -0.0196312625250501, -0.02013206412825651, -0.020632865731462925, -0.02113366733466934, -0.02163446893787575, -0.022135270541082164, -0.022636072144288578, -0.02313687374749499, -0.023637675350701402, -0.024138476953907816, -0.024639278557114227, -0.02514008016032064, -0.02564088176352705, -0.026141683366733465, -0.02664248496993988, -0.02714328657314629, -0.027644088176352704, -0.028144889779559118, -0.02864569138276553, -0.029146492985971943, -0.029647294589178357, -0.030148096192384767, -0.03064889779559118, -0.031149699398797595, -0.03165050100200401, -0.03215130260521042, -0.032652104208416834, -0.03315290581162325, -0.03365370741482966, -0.03415450901803607, -0.03465531062124249, -0.0351561122244489, -0.03565691382765531, -0.03615771543086173, -0.03665851703406814, -0.03715931863727455, -0.03766012024048097, -0.03816092184368738, -0.03866172344689379, -0.039162525050100205, -0.039663326653306616, -0.040164128256513026, -0.040664929859719444, -0.041165731462925854, -0.041666533066132265, -0.04216733466933868, -0.04266813627254509, -0.043168937875751504, -0.04366973947895792, -0.04417054108216433, -0.04467134268537074, -0.04517214428857716, -0.04567294589178357, -0.04617374749498998, -0.0466745490981964, -0.04717535070140281, -0.04767615230460922, -0.04817695390781564, -0.04867775551102205, -0.04917855711422846, -0.04967935871743487, -0.050180160320641286, -0.050680961923847696, -0.05118176352705411, -0.051682565130260524, -0.052183366733466935, -0.052684168336673345, -0.05318496993987976, -0.05368577154308617, -0.054186573146292584, -0.054687374749499, -0.05518817635270541, -0.05568897795591182, -0.05618977955911824, -0.05669058116232465, -0.05719138276553106, -0.05769218436873748, -0.05819298597194389, -0.0586937875751503, -0.05919458917835672, -0.05969539078156313, -0.06019619238476954, -0.060696993987975956, -0.061197795591182366, -0.06169859719438878, -0.062199398797595194, -0.06270020040080161, -0.06320100200400802, -0.06370180360721443, -0.06420260521042084, -0.06470340681362725, -0.06520420841683366, -0.06570501002004007, -0.0662058116232465, -0.06670661322645291, -0.06720741482965932, -0.06770821643286573, -0.06820901803607214, -0.06870981963927855, -0.06921062124248498, -0.06971142284569139, -0.0702122244488978, -0.07071302605210421, -0.07121382765531062, -0.07171462925851703, -0.07221543086172345, -0.07271623246492986, -0.07321703406813627, -0.07371783567134269, -0.0742186372745491, -0.0747194388777555, -0.07522024048096193, -0.07572104208416834, -0.07622184368737475, -0.07672264529058116, -0.07722344689378757, -0.07772424849699398, -0.07822505010020041, -0.07872585170340682, -0.07922665330661323, -0.07972745490981964, -0.08022825651302605, -0.08072905811623246, -0.08122985971943888, -0.0817306613226453, -0.0822314629258517, -0.08273226452905812, -0.08323306613226453, -0.08373386773547094, -0.08423466933867736, -0.08473547094188377, -0.08523627254509018, -0.0857370741482966, -0.086237875751503, -0.08673867735470941, -0.08723947895791584, -0.08774028056112225, -0.08824108216432866, -0.08874188376753507, -0.08924268537074148, -0.08974348697394789, -0.09024428857715432, -0.09074509018036073, -0.09124589178356714, -0.09174669338677355, -0.09224749498997996, -0.09274829659318637, -0.0932490981963928, -0.0937498997995992, -0.09425070140280561, -0.09475150300601203, -0.09525230460921844, -0.09575310621242485, -0.09625390781563127, -0.09675470941883768, -0.09725551102204409, -0.0977563126252505, -0.09825711422845691, -0.09875791583166332, -0.09925871743486973, -0.09975951903807616, -0.10026032064128257, -0.10076112224448898, -0.10126192384769539, -0.1017627254509018, -0.10226352705410821, -0.10276432865731464, -0.10326513026052105, -0.10376593186372746, -0.10426673346693387, -0.10476753507014028, -0.10526833667334669, -0.10576913827655311, -0.10626993987975952, -0.10677074148296593, -0.10727154308617234, -0.10777234468937875, -0.10827314629258517, -0.10877394789579159, -0.109274749498998, -0.10977555110220441, -0.11027635270541082, -0.11077715430861723, -0.11127795591182364, -0.11177875751503007, -0.11227955911823648, -0.11278036072144289, -0.1132811623246493, -0.11378196392785571, -0.11428276553106212, -0.11478356713426854, -0.11528436873747495, -0.11578517034068136, -0.11628597194388778, -0.11678677354709419, -0.1172875751503006, -0.11778837675350702, -0.11828917835671343, -0.11878997995991984, -0.11929078156312625, -0.11979158316633266, -0.12029238476953907, -0.1207931863727455, -0.12129398797595191, -0.12179478957915832, -0.12229559118236473, -0.12279639278557114, -0.12329719438877755, -0.12379799599198398, -0.12429879759519039, -0.1247995991983968, -0.1253004008016032, -0.1258012024048096, -0.12630200400801603, -0.12680280561122242, -0.12730360721442885, -0.12780440881763525, -0.12830521042084167, -0.1288060120240481, -0.1293068136272545, -0.12980761523046092, -0.1303084168336673, -0.13080921843687374, -0.13131002004008013, -0.13181082164328656, -0.13231162324649298, -0.13281242484969938, -0.1333132264529058, -0.1338140280561122, -0.13431482965931862, -0.13481563126252505, -0.13531643286573145, -0.13581723446893787, -0.13631803607214427, -0.1368188376753507, -0.1373196392785571, -0.1378204408817635, -0.13832124248496994, -0.13882204408817633, -0.13932284569138276, -0.13982364729458915, -0.14032444889779558, -0.140825250501002, -0.1413260521042084, -0.14182685370741482, -0.14232765531062122, -0.14282845691382764, -0.14332925851703404, -0.14383006012024047, -0.1443308617234469, -0.1448316633266533, -0.1453324649298597, -0.1458332665330661, -0.14633406813627253, -0.14683486973947896, -0.14733567134268535, -0.14783647294589178, -0.14833727454909817, -0.1488380761523046, -0.149338877755511, -0.14983967935871742, -0.15034048096192384, -0.15084128256513024, -0.15134208416833667, -0.15184288577154306, -0.1523436873747495, -0.1528444889779559, -0.1533452905811623, -0.15384609218436873, -0.15434689378757513, -0.15484769539078155, -0.15534849699398795, -0.15584929859719437, -0.1563501002004008, -0.1568509018036072, -0.15735170340681362, -0.15785250501002002, -0.15835330661322644, -0.15885410821643287, -0.15935490981963926, -0.1598557114228457, -0.16035651302605208, -0.1608573146292585, -0.1613581162324649, -0.16185891783567133, -0.16235971943887775, -0.16286052104208415, -0.16336132264529057, -0.16386212424849697, -0.1643629258517034, -0.1648637274549098, -0.16536452905811622, -0.16586533066132264, -0.16636613226452904, -0.16686693386773546, -0.16736773547094186, -0.16786853707414828, -0.1683693386773547, -0.1688701402805611, -0.16937094188376753, -0.16987174348697393, -0.17037254509018035, -0.17087334669338675, -0.17137414829659317, -0.1718749498997996, -0.172375751503006, -0.17287655310621242, -0.1733773547094188, -0.17387815631262524, -0.17437895791583166, -0.17487975951903806, -0.17538056112224448, -0.17588136272545088, -0.1763821643286573, -0.1768829659318637, -0.17738376753507012, -0.17788456913827655, -0.17838537074148295, -0.17888617234468937, -0.17938697394789577, -0.1798877755511022, -0.18038857715430862, -0.180889378757515, -0.18139018036072144, -0.18189098196392783, -0.18239178356713426, -0.18289258517034065, -0.18339338677354708, -0.1838941883767535, -0.1843949899799599, -0.18489579158316632, -0.18539659318637272, -0.18589739478957915, -0.18639819639278557, -0.18689899799599197, -0.1873997995991984, -0.1879006012024048, -0.1884014028056112, -0.1889022044088176, -0.18940300601202403, -0.18990380761523046, -0.19040460921843685, -0.19090541082164328, -0.19140621242484968, -0.1919070140280561, -0.19240781563126252, -0.19290861723446892, -0.19340941883767535, -0.19391022044088174, -0.19441102204408817, -0.19491182364729456, -0.195412625250501, -0.1959134268537074, -0.1964142284569138, -0.19691503006012023, -0.19741583166332663, -0.19791663326653305, -0.19841743486973945, -0.19891823647294588, -0.1994190380761523, -0.1999198396793587, -0.20042064128256512, -0.20092144288577152, -0.20142224448897794, -0.20192304609218437, -0.20242384769539076, -0.2029246492985972, -0.20342545090180358, -0.20392625250501, -0.2044270541082164, -0.20492785571142283, -0.20542865731462925, -0.20592945891783565, -0.20643026052104207, -0.20693106212424847, -0.2074318637274549, -0.20793266533066132, -0.20843346693386772, -0.20893426853707414, -0.20943507014028054, -0.20993587174348696, -0.21043667334669336, -0.21093747494989978, -0.2114382765531062, -0.2119390781563126, -0.21243987975951903, -0.21294068136272543, -0.21344148296593185, -0.21394228456913827, -0.21444308617234467, -0.2149438877755511, -0.2154446893787575, -0.21594549098196392, -0.2164462925851703, -0.21694709418837674, -0.21744789579158316, -0.21794869739478956, -0.21844949899799598, -0.21895030060120238, -0.2194511022044088, -0.21995190380761523, -0.22045270541082163, -0.22095350701402805, -0.22145430861723445, -0.22195511022044087, -0.22245591182364727, -0.2229567134268537, -0.22345751503006012, -0.2239583166332665, -0.22445911823647294, -0.22495991983967933, -0.22546072144288576, -0.22596152304609216, -0.22646232464929858, -0.226963126252505, -0.2274639278557114, -0.22796472945891783, -0.22846553106212422, -0.22896633266533065, -0.22946713426853707, -0.22996793587174347, -0.2304687374749499, -0.2309695390781563, -0.2314703406813627, -0.2319711422845691, -0.23247194388777553, -0.23297274549098196, -0.23347354709418836, -0.23397434869739478, -0.23447515030060118, -0.2349759519038076, -0.23547675350701402, -0.23597755511022042, -0.23647835671342685, -0.23697915831663324, -0.23747995991983967, -0.23798076152304606, -0.2384815631262525, -0.2389823647294589, -0.2394831663326653, -0.23998396793587173, -0.24048476953907813, -0.24098557114228455, -0.24148637274549098, -0.24198717434869738, -0.2424879759519038, -0.2429887775551102, -0.24348957915831662, -0.24399038076152302, -0.24449118236472944, -0.24499198396793587, -0.24549278557114226, -0.2459935871743487, -0.24649438877755508, -0.2469951903807615, -0.24749599198396793, -0.24799679358717433, -0.24849759519038075, -0.24899839679358715, -0.24949919839679358, -0.25], "si": [-9.999999994444444e-05, -0.0006008015911582525, -0.0011016031321445993, -0.0016024045810361055, -0.002103205895965406, -0.0026040070350651563, -0.003104807956468037, -0.0036056086183067636, -0.004106408978714088, -0.00460720899582281, -0.005108008627765778, -0.005608807832675903, -0.006109606568686155, -0.006610404793929578, -0.007111202466539293, -0.007611999544648499, -0.008112795986390493, -0.008613591749898663, -0.009114386793306497, -0.009615181074747596, -0.01011597455235567, -0.010616767184264561, -0.011117558928608221, -0.01161834974352075, -0.012119139587136382, -0.012619928417589502, -0.013120716193014638, -0.013621502871546487, -0.014122288411319904, -0.014623072770469913, -0.015123855907131731, -0.015624637779440741, -0.016125418345532525, -0.016626197563542864, -0.017126975391607728, -0.01762775178786332, -0.01812852671044604, -0.018629300117492507, -0.01913007196713959, -0.019630842217524366, -0.020131610826784163, -0.020632377753056565, -0.021133142954479406, -0.021633906389190757, -0.022134668015328995, -0.02263542779103273, -0.023136185674440875, -0.023636941623692627, -0.02413769559692746, -0.02463844755228515, -0.025139197447905787, -0.025639945241929762, -0.026140690892497778, -0.026641434357750876, -0.02714217559583041, -0.027642914564878072, -0.028143651223035904, -0.02864438552844629, -0.029145117439251973, -0.029645846913596043, -0.03014657390962197, -0.030647298385473594, -0.03114802029929514, -0.031648739609231195, -0.03214945627342676, -0.03265017025002722, -0.0331508814971784, -0.033651589973026474, -0.03415229563571808, -0.0346529984434003, -0.03515369835422057, -0.035654395326326804, -0.03615508931786737, -0.03665578028699109, -0.03715646819184721, -0.03765715299058544, -0.03815783464135598, -0.038658513102309486, -0.039159188331597115, -0.039659860287370466, -0.040160528927781686, -0.04066119421098339, -0.04116185609512869, -0.04166251453837124, -0.042163169498865186, -0.0426638209347652, -0.043164468804226495, -0.043665113065404826, -0.04416575367645647, -0.04466639059553826, -0.045167023780807614, -0.04566765319042245, -0.04616827878254132, -0.04666890051532331, -0.0471695183469281, -0.04767013223551595, -0.048170742139247734, -0.04867134801628489, -0.049171949824789486, -0.049672547522924215, -0.05017314106885237, -0.05067373042073785, -0.051174315536745216, -0.05167489637503967, -0.052175472893787024, -0.052676045051153746, -0.05317661280530703, -0.053677176114414624, -0.05417773493664502, -0.05467828923016735, -0.055178838953151454, -0.055679384063767816, -0.056179924520187705, -0.056680460280582975, -0.05718099130312625, -0.05768151754599088, -0.05818203896735088, -0.05868255552538105, -0.05918306717825688, -0.059683573884154614, -0.06018407560125123, -0.060684572287724496, -0.06118506390175287, -0.06168555040151563, -0.06218603174519281, -0.06268650789096522, -0.06318697879701438, -0.06368744442152273, -0.06418790472267343, -0.0646883596586504, -0.06518880918763847, -0.06568925326782324, -0.06618969185739108, -0.06669012491452922, -0.06719055239742577, -0.06769097426426961, -0.06819139047325048, -0.06869180098255902, -0.0691922057503867, -0.06969260473492578, -0.07019299789436952, -0.07069338518691194, -0.07119376657074802, -0.07169414200407362, -0.07219451144508546, -0.07269487485198117, -0.07319523218295933, -0.07369558339621939, -0.07419592844996173, -0.07469626730238763, -0.07519659991169939, -0.07569692623610015, -0.07619724623379406, -0.0766975598629862, -0.07719786708188259, -0.07769816784869024, -0.07819846212161714, -0.07869874985887225, -0.07919903101866545, -0.0796993055592077, -0.08019957343871094, -0.08069983461538806, -0.081200089047453, -0.08170033669312073, -0.08220057751060715, -0.08270081145812931, -0.08320103849390523, -0.08370125857615397, -0.08420147166309568, -0.08470167771295145, -0.08520187668394358, -0.08570206853429531, -0.08620225322223099, -0.08670243070597614, -0.08720260094375722, -0.08770276389380184, -0.08820291951433873, -0.0887030677635977, -0.08920320859980964, -0.08970334198120666, -0.09020346786602186, -0.09070358621248954, -0.09120369697884516, -0.0917038001233252, -0.09220389560416742, -0.09270398337961068, -0.09320406340789501, -0.0937041356472616, -0.09420420005595274, -0.09470425659221206, -0.09520430521428418, -0.09570434588041511, -0.09620437854885194, -0.09670440317784293, -0.09720441972563763, -0.09770442815048676, -0.09820442841064232, -0.09870442046435747, -0.09920440426988662, -0.09970437978548549, -0.10020434696941093, -0.10070430577992111, -0.10120425617527548, -0.10170419811373473, -0.10220413155356078, -0.10270405645301695, -0.10320397277036769, -0.10370388046387886, -0.10420377949181753, -0.10470366981245217, -0.10520355138405248, -0.10570342416488952, -0.10620328811323565, -0.10670314318736455, -0.1072029893455513, -0.10770282654607219, -0.10820265474720502, -0.10870247390722883, -0.10920228398442407, -0.10970208493707251, -0.11020187672345733, -0.1107016593018631, -0.11120143263057577, -0.11170119666788267, -0.11220095137207246, -0.11270069670143534, -0.11320043261426284, -0.1137001590688479, -0.11419987602348491, -0.11469958343646973, -0.11519928126609953, -0.11569896947067304, -0.11619864800849036, -0.11669831683785309, -0.11719797591706432, -0.11769762520442856, -0.11819726465825175, -0.11869689423684143, -0.11919651389850648, -0.11969612360155739, -0.12019572330430615, -0.12069531296506614, -0.12119489254215234, -0.12169446199388123, -0.1221940212785708, -0.12269357035454063, -0.12319310918011174, -0.12369263771360675, -0.1241921559133498, -0.12469166373766664, -0.12519116114488452, -0.12569064809333225, -0.12619012454134032, -0.12668959044724065, -0.12718904576936688, -0.12768849046605407, -0.12818792449563915, -0.12868734781646038, -0.12918676038685772, -0.1296861621651729, -0.13018555310974902, -0.130684933178931, -0.13118430233106532, -0.13168366052450015, -0.1321830077175852, -0.1326823438686719, -0.13318166893611344, -0.1336809828782645, -0.13418028565348158, -0.13467957722012278, -0.13517885753654788, -0.13567812656111838, -0.13617738425219747, -0.13667663056815013, -0.1371758654673428, -0.13767508890814403, -0.13817430084892374, -0.1386735012480537, -0.13917269006390748, -0.1396718672548603, -0.14017103277928925, -0.14067018659557298, -0.14116932866209211, -0.1416684589372289, -0.14216757737936742, -0.14266668394689352, -0.1431657785981948, -0.14366486129166073, -0.14416393198568253, -0.14466299063865318, -0.1451620372089676, -0.14566107165502237, -0.146160093935216, -0.14665910400794885, -0.14715810183162298, -0.1476570873646425, -0.1481560605654131, -0.14865502139234263, -0.14915396980384055, -0.1496529057583183, -0.15015182921418915, -0.15065074012986832, -0.15114963846377286, -0.15164852417432176, -0.15214739721993584, -0.15264625755903782, -0.15314510515005242, -0.15364393995140624, -0.15414276192152776, -0.15464157101884746, -0.15514036720179764, -0.1556391504288127, -0.15613792065832893, -0.15663667784878443, -0.1571354219586195, -0.15763415294627625, -0.15813287077019883, -0.15863157538883335, -0.1591302667606278, -0.15962894484403242, -0.1601276095974992, -0.1606262609794822, -0.16112489894843762, -0.16162352346282355, -0.1621221344811001, -0.16262073196172944, -0.1631193158631758, -0.1636178861439054, -0.16411644276238663, -0.16461498567708968, -0.16511351484648706, -0.16561203022905333, -0.16611053178326488, -0.16660901946760048, -0.16710749324054072, -0.16760595306056858, -0.16810439888616885, -0.16860283067582857, -0.1691012483880369, -0.16959965198128502, -0.17009804141406637, -0.1705964166448764, -0.17109477763221279, -0.17159312433457533, -0.17209145671046586, -0.1725897747183885, -0.17308807831684947, -0.1735863674643572, -0.17408464211942237, -0.17458290224055756, -0.17508114778627784, -0.17557937871510024, -0.17607759498554423, -0.17657579655613123, -0.1770739833853851, -0.17757215543183175, -0.17807031265399934, -0.17856845501041835, -0.1790665824596214, -0.17956469496014346, -0.1800627924705216, -0.18056087494929518, -0.18105894235500597, -0.18155699464619784, -0.18205503178141702, -0.18255305371921196, -0.18305106041813343, -0.18354905183673453, -0.1840470279335706, -0.18454498866719926, -0.1850429339961805, -0.18554086387907662, -0.18603877827445225, -0.18653667714087424, -0.18703456043691197, -0.18753242812113702, -0.18803028015212334, -0.18852811648844725, -0.18902593708868742, -0.18952374191142496, -0.19002153091524318, -0.19051930405872797, -0.19101706130046742, -0.1915148025990522, -0.1920125279130752, -0.19251023720113183, -0.19300793042181982, -0.1935056075337395, -0.19400326849549332, -0.19450091326568647, -0.19499854180292636, -0.19549615406582294, -0.19599375001298858, -0.19649132960303808, -0.19698889279458878, -0.1974864395462604, -0.19798396981667515, -0.19848148356445777, -0.19897898074823542, -0.19947646132663777, -0.199973925258297, -0.20047137250184777, -0.20096880301592734, -0.20146621675917536, -0.20196361369023402, -0.2024609937677481, -0.20295835695036488, -0.20345570319673426, -0.20395303246550853, -0.2044503447153426, -0.2049476399048941, -0.20544491799282283, -0.2059421789377916, -0.20643942269846555, -0.20693664923351252, -0.2074338585016028, -0.20793105046140936, -0.2084282250716079, -0.20892538229087645, -0.20942252207789588, -0.20991964439134952, -0.21041674918992356, -0.2109138364323066, -0.21141090607718988, -0.2119079580832675, -0.21240499240923594, -0.21290200901379458, -0.21339900785564533, -0.2138959888934928, -0.21439295208604423, -0.2148898973920096, -0.21538682477010154, -0.2158837341790355, -0.2163806255775295, -0.21687749892430427, -0.21737435417808326, -0.21787119129759272, -0.21836801024156155, -0.2188648109687214, -0.21936159343780665, -0.21985835760755446, -0.2203551034367047, -0.22085183088400004, -0.22134853990818593, -0.2218452304680104, -0.2223419025222246, -0.22283855602958216, -0.22333519094883963, -0.22383180723875626, -0.22432840485809427, -0.22482498376561855, -0.22532154392009687, -0.22581808528029973, -0.22631460780500054, -0.22681111145297558, -0.2273075961830038, -0.22780406195386718, -0.22830050872435043, -0.22879693645324123, -0.2292933450993299, -0.2297897346214099, -0.2302861049782774, -0.2307824561287315, -0.23127878803157415, -0.23177510064561027, -0.23227139392964766, -0.23276766784249694, -0.2332639223429717, -0.23376015738988845, -0.23425637294206667, -0.23475256895832874, -0.23524874539749988, -0.23574490221840833, -0.23624103937988533, -0.23673715684076502, -0.23723325455988453, -0.2377293324960839, -0.23822539060820627, -0.23872142885509753, -0.23921744719560684, -0.239713445588586, -0.24020942399289028, -0.24070538236737754, -0.24120132067090883, -0.24169723886234812, -0.24219313690056263, -0.2426890147444223, -0.24318487235280034, -0.24368070968457292, -0.24417652669861928, -0.2446723233538215, -0.2451680996090652, -0.2456638554232386, -0.24615959075523322, -0.24665530556394358, -0.24715099980826727, -0.24764667344710514, -0.2481423264393609, -0.24863795874394162, -0.24913357031975716], "ci": [-8.633124709574648, -6.8400302144042655, -6.233773338347898, -5.859034749131103, -5.587077676440535, -5.37348950659965, -5.197589624789602, -5.048051559293328, -4.917993974142948, -4.802921491670446, -4.699735060246429, -4.606207541658889, -4.520684492447774, -4.441903219214107, -4.368878094211612, -4.300824991109329, -4.237109845378832, -4.177212649027295, -4.120701635647991, -4.067214379507651, -4.016443699050059, -3.968126969963971, -3.9220379036938042, -3.877980138866089, -3.8357821861085433, -3.7952933971373084, -3.756380718739616, -3.718926055105001, -3.682824106618205, -3.6479805854246785, -3.6143107315958733, -3.5817380711040587, -3.550193369808342, -3.5196137474644793, -3.4899419232512057, -3.4611255700601307, -3.4331167592603, -3.4058714811387856, -3.37934922896788, -3.353512636830048, -3.328327163072713, -3.303760812663497, -3.279783892846658, -3.256368797419755, -3.233489815699655, -3.2111229628628353, -3.189245828852844, -3.1678374434687306, -3.146878155598535, -3.126349524854636, -3.106234224113377, -3.086515951668199, -3.0671793518803248, -3.048209943359311, -3.0295940538319632, -3.0113187609657994, -2.99337183850553, -2.975741707160201, -2.9584173897469093, -2.9413884701559323, -2.9246450557531287, -2.9081777428798015, -2.8919775851487515, -2.8760360642689067, -2.8603450631603202, -2.8448968411470954, -2.829684011038461, -2.814699517928112, -2.799936619559514, -2.7853888681203913, -2.77105009334335, -2.7569143868017782, -2.7429760873009843, -2.72922976727418, -2.7156702201014786, -2.7022924482777815, -2.689091652362242, -2.6760632206481763, -2.663202719497772, -2.650505884290914, -2.6379686109418805, -2.625586947941693, -2.613357088887515, -2.6012753654637457, -2.589338240842443, -2.5775423034733613, -2.5658842612363166, -2.554360935930821, -2.5429692580798893, -2.531706262026781, -2.5205690813050725, -2.5095549442639777, -2.498661169932218, -2.487885164104999, -2.4772244156398044, -2.4666764929477814, -2.456239040668442, -2.445909776516324, -2.435686488289031, -2.425567031026855, -2.415549324314848, -2.4056313497188646, -2.395811148347664, -2.386086818533706, -2.376456513625779, -2.366918439887047, -2.357470854492528, -2.3481120636204214, -2.3388404206320454, -2.3296543243355003, -2.3205522173284736, -2.311532584415903, -2.3025939510984665, -2.293734882128142, -2.28495398012728, -2.2762498842678847, -2.2676212690079693, -2.259066842882051, -2.2505853473430353, -2.242175555652879, -2.233836271819599, -2.2255663295783137, -2.217364591414148, -2.209229947624964, -2.201161315421964, -2.1931576380663733, -2.185217884040453, -2.1773410462512337, -2.169526141265423, -2.1617722085740465, -2.1540783098854255, -2.146443528445217, -2.1388669683822585, -2.1313477540790653, -2.123885029565874, -2.1164779579371698, -2.109125720789725, -2.101827517681182, -2.0945825656083037, -2.0873900985040303, -2.0802493667525352, -2.0731596367215186, -2.066120190311001, -2.0591303245179327, -2.052189351015944, -2.045296595749628, -2.038451398542736, -2.0316531127197357, -2.0249011047401764, -2.0181947538453495, -2.0115334517167534, -2.004916602145885, -1.9983436207149219, -1.991813934487854, -1.9853269817116697, -1.9788822115271916, -1.972479083689208, -1.966117068295529, -1.959795645524632, -1.9535143053815782, -1.9472725474518795, -1.941069880663028, -1.9349058230533944, -1.9287799015482348, -1.9226916517425334, -1.9166406176904416, -1.9106263517010684, -1.9046484141403999, -1.898706373239118, -1.8927998049061245, -1.8869282925475497, -1.8810914268910692, -1.875288805815335, -1.8695200341843439, -1.863784723686575, -1.858082492678732, -1.8524129660339286, -1.8467757749941753, -1.8411705570270112, -1.8355969556861527, -1.8300546204760137, -1.824543206719983, -1.8190623754323143, -1.8136117931935367, -1.8081911320292436, -1.8028000692921708, -1.7974382875474462, -1.7921054744609162, -1.7868013226904402, -1.7815255297800738, -1.7762777980570357, -1.771057834531376, -1.7658653507982658, -1.760700062942817, -1.7555616914473626, -1.7504499611011155, -1.745364600912138, -1.740305344021548, -1.7352719276198938, -1.7302640928656352, -1.7252815848056635, -1.7203241522978057, -1.7153915479352435, -1.710483527972802, -1.7055998522550457, -1.700740284146131, -1.6959045904613645, -1.6910925414004139, -1.6863039104821318, -1.6815384744809379, -1.6767960133647157, -1.6720763102341891, -1.6673791512637277, -1.6627043256435396, -1.658051625523224, -1.6534208459566333, -1.648811784848017, -1.644224242899403, -1.6396580235591938, -1.6351129329719325, -1.6305887799292165, -1.6260853758217182, -1.621602534592294, -1.61714007269014, -1.6126978090259776, -1.6082755649282325, -1.6038731641001844, -1.599490432578068, -1.595127198690084, -1.5907832930163148, -1.5864585483495088, -1.5821527996567155, -1.5778658840417483, -1.5735976407084538, -1.5693479109247666, -1.5651165379875311, -1.5609033671880705, -1.5567082457784778, -1.5525310229386218, -1.5483715497438428, -1.544229679133319, -1.5401052658790941, -1.5359981665557434, -1.5319082395106645, -1.5278353448349806, -1.5237793443350331, -1.5197401015044605, -1.5157174814968366, -1.5117113510988671, -1.5077215787041225, -1.5037480342872944, -1.4997905893789705, -1.4958491170409063, -1.4919234918417885, -1.4880135898334754, -1.484119288527703, -1.4802404668732467, -1.4763770052335308, -1.4725287853646674, -1.4686956903939234, -1.4648776047986019, -1.4610744143853258, -1.4572860062697213, -1.4535122688564839, -1.4497530918198267, -1.4460083660842944, -1.442277983805939, -1.4385618383538517, -1.4348598242920338, -1.4311718373616111, -1.4274977744633748, -1.4238375336406432, -1.4201910140624445, -1.4165581160070007, -1.4129387408455198, -1.4093327910262785, -1.4057401700589955, -1.402160782499488, -1.3985945339346009, -1.395041330967412, -1.3915010812026944, -1.3879736932326472, -1.38445907662287, -1.3809571418985898, -1.3774678005311343, -1.3739909649246338, -1.3705265484029663, -1.3670744651969204, -1.3636346304315883, -1.3602069601139748, -1.3567913711208197, -1.3533877811866295, -1.349996108891915, -1.346616273651631, -1.3432481957038092, -1.3398917960983878, -1.3365469966862278, -1.333213720108316, -1.329891889785146, -1.3265814299062815, -1.3232822654200906, -1.3199943220236523, -1.3167175261528279, -1.3134518049725012, -1.310197086366973, -1.306953298930519, -1.303720371958099, -1.3004982354362173, -1.2972868200339356, -1.294086057094024, -1.2908958786242624, -1.287716217288879, -1.2845470064001239, -1.2813881799099816, -1.2782396724020113, -1.275101419083322, -1.2719733557766681, -1.2688554189126764, -1.2657475455221912, -1.26264967322874, -1.2595617402411203, -1.2564836853460961, -1.2534154479012145, -1.250356967827727, -1.2473081856036268, -1.2442690422567886, -1.2412394793582142, -1.2382194390153842, -1.235208863865708, -1.2322076970700764, -1.2292158823065071, -1.2262333637638945, -1.2232600861358436, -1.2202959946146057, -1.217341034885099, -1.2143951531190205, -1.2114582959690472, -1.2085304105631198, -1.205611444498814, -1.2027013458377949, -1.1998000631003505, -1.1969075452600073, -1.1940237417382258, -1.1911486023991702, -1.1882820775445577, -1.185424117908578, -1.182574674652894, -1.1797336993617036, -1.1769011440368837, -1.1740769610931956, -1.1712611033535636, -1.1684535240444192, -1.1656541767911106, -1.1628630156133801, -1.1600799949209022, -1.157305069508887, -1.1545381945537438, -1.1517793256088067, -1.1490284186001203, -1.1462854298222802, -1.143550315934338, -1.1408230339557577, -1.1381035412624292, -1.1353917955827388, -1.1326877549936911, -1.1299913779170858, -1.1273026231157461, -1.1246214496897973, -1.1219478170730004, -1.119281685029129, -1.1166230136483999, -1.113971763343951, -1.1113278948483656, -1.1086913692102427, -1.1060621477908166, -1.1034401922606174, -1.1008254645961775, -1.098217927076784, -1.0956175422812706, -1.093024273084855, -1.0904380826560147, -1.0878589344534062, -1.0852867922228244, -1.0827216199942007, -1.0801633820786418, -1.0776120430655045, -1.07506756781951, -1.0725299214778967, -1.069999069447607, -1.067474977402513, -1.064957611280674, -1.0624469372816363, -1.059942921863757, -1.0574455317415712, -1.054954733883189, -1.0524704955077242, -1.0499927840827572, -1.0475215673218297, -1.0450568131819715, -1.042598489861256, -1.0401465657963878, -1.0377010096603236, -1.0352617903599142, -1.0328288770335852, -1.030402239049041, -1.0279818460009988, -1.0255676677089491, -1.0231596742149462, -1.020757835781423, -1.018362122889037, -1.0159725062345346, -1.0135889567286516, -1.0112114454940297, -1.0088399438631657, -1.0064744233763794, -1.0041148557798123, -1.0017612130234435, -0.9994134672591347, -0.9970715908386975, -0.9947355563119806, -0.9924053364249847, -0.9900809041179959, -0.9877622325237428, -0.9854492949655762, -0.9831420649556685, -0.9808405161932349, -0.9785446225627765, -0.9762543581323431, -0.9739696971518164, -0.9716906140512122, -0.9694170834390052, -0.9671490801004707, -0.9648865789960456, -0.9626295552597097, -0.9603779841973851, -0.9581318412853541, -0.9558911021686931, -0.9536557426597299, -0.951425738736511, -0.9492010665412941, -0.9469817023790519, -0.9447676227159953, -0.9425588041781146, -0.9403552235497329, -0.9381568577720822, -0.9359636839418883, -0.9337756793099781, -0.9315928212798971, -0.9294150874065463, -0.9272424553948332, -0.9250749030983352, -0.922912408517983, -0.9207549498007521, -0.9186025052383757, -0.9164550532660662, -0.914312572461253, -0.912175041542335, -0.9100424393674447, -0.9079147449332277, -0.9057919373736344, -0.9036739959587249, -0.9015609000934877, -0.8994526293166694, -0.89734916329962, -0.8952504818451471, -0.8931565648863855, -0.8910673924856772, -0.8889829448334637, -0.8869032022471907, -0.8848281451702232, -0.8827577541707744, -0.8806920099408436, -0.8786308932951665, -0.8765743851701772, -0.8745224666229783, -0.8724751188303276, -0.870432323087628, -0.8683940608079344, -0.8663603135209679, -0.8643310628721392, -0.8623062906215865, -0.860285978643218, -0.8582701089237694, -0.8562586635618672, -0.8542516247671033, -0.8522489748591205, -0.8502506962667048, -0.848256771526888, -0.8462671832840616, -0.8442819142890957, -0.8423009473984705, -0.8403242655734149, -0.8383518518790545, -0.836383689483567, -0.8344197616573489, -0.8324600517721876, -0.8305045433004427, -0.828553219814237, -0.8266060649846545, -0.8246630625809456]}
},{}],41:[function(require,module,exports){
module.exports={"x": [0.0001, 0.0006008016032064129, 0.0011016032064128257, 0.0016024048096192386, 0.002103206412825651, 0.002604008016032064, 0.003104809619238477, 0.0036056112224448897, 0.004106412825651303, 0.004607214428857716, 0.005108016032064128, 0.005608817635270541, 0.0061096192384769545, 0.006610420841683367, 0.00711122244488978, 0.007612024048096192, 0.008112825651302604, 0.008613627254509017, 0.00911442885771543, 0.009615230460921843, 0.010116032064128255, 0.01061683366733467, 0.011117635270541082, 0.011618436873747494, 0.012119238476953908, 0.01262004008016032, 0.013120841683366732, 0.013621643286573145, 0.014122444889779559, 0.014623246492985971, 0.015124048096192383, 0.015624849699398797, 0.01612565130260521, 0.016626452905811624, 0.017127254509018034, 0.017628056112224448, 0.018128857715430862, 0.018629659318637273, 0.019130460921843687, 0.0196312625250501, 0.02013206412825651, 0.020632865731462925, 0.02113366733466934, 0.02163446893787575, 0.022135270541082164, 0.022636072144288578, 0.02313687374749499, 0.023637675350701402, 0.024138476953907816, 0.024639278557114227, 0.02514008016032064, 0.02564088176352705, 0.026141683366733465, 0.02664248496993988, 0.02714328657314629, 0.027644088176352704, 0.028144889779559118, 0.02864569138276553, 0.029146492985971943, 0.029647294589178357, 0.030148096192384767, 0.03064889779559118, 0.031149699398797595, 0.03165050100200401, 0.03215130260521042, 0.032652104208416834, 0.03315290581162325, 0.03365370741482966, 0.03415450901803607, 0.03465531062124249, 0.0351561122244489, 0.03565691382765531, 0.03615771543086173, 0.03665851703406814, 0.03715931863727455, 0.03766012024048097, 0.03816092184368738, 0.03866172344689379, 0.039162525050100205, 0.039663326653306616, 0.040164128256513026, 0.040664929859719444, 0.041165731462925854, 0.041666533066132265, 0.04216733466933868, 0.04266813627254509, 0.043168937875751504, 0.04366973947895792, 0.04417054108216433, 0.04467134268537074, 0.04517214428857716, 0.04567294589178357, 0.04617374749498998, 0.0466745490981964, 0.04717535070140281, 0.04767615230460922, 0.04817695390781564, 0.04867775551102205, 0.04917855711422846, 0.04967935871743487, 0.050180160320641286, 0.050680961923847696, 0.05118176352705411, 0.051682565130260524, 0.052183366733466935, 0.052684168336673345, 0.05318496993987976, 0.05368577154308617, 0.054186573146292584, 0.054687374749499, 0.05518817635270541, 0.05568897795591182, 0.05618977955911824, 0.05669058116232465, 0.05719138276553106, 0.05769218436873748, 0.05819298597194389, 0.0586937875751503, 0.05919458917835672, 0.05969539078156313, 0.06019619238476954, 0.060696993987975956, 0.061197795591182366, 0.06169859719438878, 0.062199398797595194, 0.06270020040080161, 0.06320100200400802, 0.06370180360721443, 0.06420260521042084, 0.06470340681362725, 0.06520420841683366, 0.06570501002004007, 0.0662058116232465, 0.06670661322645291, 0.06720741482965932, 0.06770821643286573, 0.06820901803607214, 0.06870981963927855, 0.06921062124248498, 0.06971142284569139, 0.0702122244488978, 0.07071302605210421, 0.07121382765531062, 0.07171462925851703, 0.07221543086172345, 0.07271623246492986, 0.07321703406813627, 0.07371783567134269, 0.0742186372745491, 0.0747194388777555, 0.07522024048096193, 0.07572104208416834, 0.07622184368737475, 0.07672264529058116, 0.07722344689378757, 0.07772424849699398, 0.07822505010020041, 0.07872585170340682, 0.07922665330661323, 0.07972745490981964, 0.08022825651302605, 0.08072905811623246, 0.08122985971943888, 0.0817306613226453, 0.0822314629258517, 0.08273226452905812, 0.08323306613226453, 0.08373386773547094, 0.08423466933867736, 0.08473547094188377, 0.08523627254509018, 0.0857370741482966, 0.086237875751503, 0.08673867735470941, 0.08723947895791584, 0.08774028056112225, 0.08824108216432866, 0.08874188376753507, 0.08924268537074148, 0.08974348697394789, 0.09024428857715432, 0.09074509018036073, 0.09124589178356714, 0.09174669338677355, 0.09224749498997996, 0.09274829659318637, 0.0932490981963928, 0.0937498997995992, 0.09425070140280561, 0.09475150300601203, 0.09525230460921844, 0.09575310621242485, 0.09625390781563127, 0.09675470941883768, 0.09725551102204409, 0.0977563126252505, 0.09825711422845691, 0.09875791583166332, 0.09925871743486973, 0.09975951903807616, 0.10026032064128257, 0.10076112224448898, 0.10126192384769539, 0.1017627254509018, 0.10226352705410821, 0.10276432865731464, 0.10326513026052105, 0.10376593186372746, 0.10426673346693387, 0.10476753507014028, 0.10526833667334669, 0.10576913827655311, 0.10626993987975952, 0.10677074148296593, 0.10727154308617234, 0.10777234468937875, 0.10827314629258517, 0.10877394789579159, 0.109274749498998, 0.10977555110220441, 0.11027635270541082, 0.11077715430861723, 0.11127795591182364, 0.11177875751503007, 0.11227955911823648, 0.11278036072144289, 0.1132811623246493, 0.11378196392785571, 0.11428276553106212, 0.11478356713426854, 0.11528436873747495, 0.11578517034068136, 0.11628597194388778, 0.11678677354709419, 0.1172875751503006, 0.11778837675350702, 0.11828917835671343, 0.11878997995991984, 0.11929078156312625, 0.11979158316633266, 0.12029238476953907, 0.1207931863727455, 0.12129398797595191, 0.12179478957915832, 0.12229559118236473, 0.12279639278557114, 0.12329719438877755, 0.12379799599198398, 0.12429879759519039, 0.1247995991983968, 0.1253004008016032, 0.1258012024048096, 0.12630200400801603, 0.12680280561122242, 0.12730360721442885, 0.12780440881763525, 0.12830521042084167, 0.1288060120240481, 0.1293068136272545, 0.12980761523046092, 0.1303084168336673, 0.13080921843687374, 0.13131002004008013, 0.13181082164328656, 0.13231162324649298, 0.13281242484969938, 0.1333132264529058, 0.1338140280561122, 0.13431482965931862, 0.13481563126252505, 0.13531643286573145, 0.13581723446893787, 0.13631803607214427, 0.1368188376753507, 0.1373196392785571, 0.1378204408817635, 0.13832124248496994, 0.13882204408817633, 0.13932284569138276, 0.13982364729458915, 0.14032444889779558, 0.140825250501002, 0.1413260521042084, 0.14182685370741482, 0.14232765531062122, 0.14282845691382764, 0.14332925851703404, 0.14383006012024047, 0.1443308617234469, 0.1448316633266533, 0.1453324649298597, 0.1458332665330661, 0.14633406813627253, 0.14683486973947896, 0.14733567134268535, 0.14783647294589178, 0.14833727454909817, 0.1488380761523046, 0.149338877755511, 0.14983967935871742, 0.15034048096192384, 0.15084128256513024, 0.15134208416833667, 0.15184288577154306, 0.1523436873747495, 0.1528444889779559, 0.1533452905811623, 0.15384609218436873, 0.15434689378757513, 0.15484769539078155, 0.15534849699398795, 0.15584929859719437, 0.1563501002004008, 0.1568509018036072, 0.15735170340681362, 0.15785250501002002, 0.15835330661322644, 0.15885410821643287, 0.15935490981963926, 0.1598557114228457, 0.16035651302605208, 0.1608573146292585, 0.1613581162324649, 0.16185891783567133, 0.16235971943887775, 0.16286052104208415, 0.16336132264529057, 0.16386212424849697, 0.1643629258517034, 0.1648637274549098, 0.16536452905811622, 0.16586533066132264, 0.16636613226452904, 0.16686693386773546, 0.16736773547094186, 0.16786853707414828, 0.1683693386773547, 0.1688701402805611, 0.16937094188376753, 0.16987174348697393, 0.17037254509018035, 0.17087334669338675, 0.17137414829659317, 0.1718749498997996, 0.172375751503006, 0.17287655310621242, 0.1733773547094188, 0.17387815631262524, 0.17437895791583166, 0.17487975951903806, 0.17538056112224448, 0.17588136272545088, 0.1763821643286573, 0.1768829659318637, 0.17738376753507012, 0.17788456913827655, 0.17838537074148295, 0.17888617234468937, 0.17938697394789577, 0.1798877755511022, 0.18038857715430862, 0.180889378757515, 0.18139018036072144, 0.18189098196392783, 0.18239178356713426, 0.18289258517034065, 0.18339338677354708, 0.1838941883767535, 0.1843949899799599, 0.18489579158316632, 0.18539659318637272, 0.18589739478957915, 0.18639819639278557, 0.18689899799599197, 0.1873997995991984, 0.1879006012024048, 0.1884014028056112, 0.1889022044088176, 0.18940300601202403, 0.18990380761523046, 0.19040460921843685, 0.19090541082164328, 0.19140621242484968, 0.1919070140280561, 0.19240781563126252, 0.19290861723446892, 0.19340941883767535, 0.19391022044088174, 0.19441102204408817, 0.19491182364729456, 0.195412625250501, 0.1959134268537074, 0.1964142284569138, 0.19691503006012023, 0.19741583166332663, 0.19791663326653305, 0.19841743486973945, 0.19891823647294588, 0.1994190380761523, 0.1999198396793587, 0.20042064128256512, 0.20092144288577152, 0.20142224448897794, 0.20192304609218437, 0.20242384769539076, 0.2029246492985972, 0.20342545090180358, 0.20392625250501, 0.2044270541082164, 0.20492785571142283, 0.20542865731462925, 0.20592945891783565, 0.20643026052104207, 0.20693106212424847, 0.2074318637274549, 0.20793266533066132, 0.20843346693386772, 0.20893426853707414, 0.20943507014028054, 0.20993587174348696, 0.21043667334669336, 0.21093747494989978, 0.2114382765531062, 0.2119390781563126, 0.21243987975951903, 0.21294068136272543, 0.21344148296593185, 0.21394228456913827, 0.21444308617234467, 0.2149438877755511, 0.2154446893787575, 0.21594549098196392, 0.2164462925851703, 0.21694709418837674, 0.21744789579158316, 0.21794869739478956, 0.21844949899799598, 0.21895030060120238, 0.2194511022044088, 0.21995190380761523, 0.22045270541082163, 0.22095350701402805, 0.22145430861723445, 0.22195511022044087, 0.22245591182364727, 0.2229567134268537, 0.22345751503006012, 0.2239583166332665, 0.22445911823647294, 0.22495991983967933, 0.22546072144288576, 0.22596152304609216, 0.22646232464929858, 0.226963126252505, 0.2274639278557114, 0.22796472945891783, 0.22846553106212422, 0.22896633266533065, 0.22946713426853707, 0.22996793587174347, 0.2304687374749499, 0.2309695390781563, 0.2314703406813627, 0.2319711422845691, 0.23247194388777553, 0.23297274549098196, 0.23347354709418836, 0.23397434869739478, 0.23447515030060118, 0.2349759519038076, 0.23547675350701402, 0.23597755511022042, 0.23647835671342685, 0.23697915831663324, 0.23747995991983967, 0.23798076152304606, 0.2384815631262525, 0.2389823647294589, 0.2394831663326653, 0.23998396793587173, 0.24048476953907813, 0.24098557114228455, 0.24148637274549098, 0.24198717434869738, 0.2424879759519038, 0.2429887775551102, 0.24348957915831662, 0.24399038076152302, 0.24449118236472944, 0.24499198396793587, 0.24549278557114226, 0.2459935871743487, 0.24649438877755508, 0.2469951903807615, 0.24749599198396793, 0.24799679358717433, 0.24849759519038075, 0.24899839679358715, 0.24949919839679358, 0.25], "si": [9.999999994444444e-05, 0.0006008015911582525, 0.0011016031321445993, 0.0016024045810361055, 0.002103205895965406, 0.0026040070350651563, 0.003104807956468037, 0.0036056086183067636, 0.004106408978714088, 0.00460720899582281, 0.005108008627765778, 0.005608807832675903, 0.006109606568686155, 0.006610404793929578, 0.007111202466539293, 0.007611999544648499, 0.008112795986390493, 0.008613591749898663, 0.009114386793306497, 0.009615181074747596, 0.01011597455235567, 0.010616767184264561, 0.011117558928608221, 0.01161834974352075, 0.012119139587136382, 0.012619928417589502, 0.013120716193014638, 0.013621502871546487, 0.014122288411319904, 0.014623072770469913, 0.015123855907131731, 0.015624637779440741, 0.016125418345532525, 0.016626197563542864, 0.017126975391607728, 0.01762775178786332, 0.01812852671044604, 0.018629300117492507, 0.01913007196713959, 0.019630842217524366, 0.020131610826784163, 0.020632377753056565, 0.021133142954479406, 0.021633906389190757, 0.022134668015328995, 0.02263542779103273, 0.023136185674440875, 0.023636941623692627, 0.02413769559692746, 0.02463844755228515, 0.025139197447905787, 0.025639945241929762, 0.026140690892497778, 0.026641434357750876, 0.02714217559583041, 0.027642914564878072, 0.028143651223035904, 0.02864438552844629, 0.029145117439251973, 0.029645846913596043, 0.03014657390962197, 0.030647298385473594, 0.03114802029929514, 0.031648739609231195, 0.03214945627342676, 0.03265017025002722, 0.0331508814971784, 0.033651589973026474, 0.03415229563571808, 0.0346529984434003, 0.03515369835422057, 0.035654395326326804, 0.03615508931786737, 0.03665578028699109, 0.03715646819184721, 0.03765715299058544, 0.03815783464135598, 0.038658513102309486, 0.039159188331597115, 0.039659860287370466, 0.040160528927781686, 0.04066119421098339, 0.04116185609512869, 0.04166251453837124, 0.042163169498865186, 0.0426638209347652, 0.043164468804226495, 0.043665113065404826, 0.04416575367645647, 0.04466639059553826, 0.045167023780807614, 0.04566765319042245, 0.04616827878254132, 0.04666890051532331, 0.0471695183469281, 0.04767013223551595, 0.048170742139247734, 0.04867134801628489, 0.049171949824789486, 0.049672547522924215, 0.05017314106885237, 0.05067373042073785, 0.051174315536745216, 0.05167489637503967, 0.052175472893787024, 0.052676045051153746, 0.05317661280530703, 0.053677176114414624, 0.05417773493664502, 0.05467828923016735, 0.055178838953151454, 0.055679384063767816, 0.056179924520187705, 0.056680460280582975, 0.05718099130312625, 0.05768151754599088, 0.05818203896735088, 0.05868255552538105, 0.05918306717825688, 0.059683573884154614, 0.06018407560125123, 0.060684572287724496, 0.06118506390175287, 0.06168555040151563, 0.06218603174519281, 0.06268650789096522, 0.06318697879701438, 0.06368744442152273, 0.06418790472267343, 0.0646883596586504, 0.06518880918763847, 0.06568925326782324, 0.06618969185739108, 0.06669012491452922, 0.06719055239742577, 0.06769097426426961, 0.06819139047325048, 0.06869180098255902, 0.0691922057503867, 0.06969260473492578, 0.07019299789436952, 0.07069338518691194, 0.07119376657074802, 0.07169414200407362, 0.07219451144508546, 0.07269487485198117, 0.07319523218295933, 0.07369558339621939, 0.07419592844996173, 0.07469626730238763, 0.07519659991169939, 0.07569692623610015, 0.07619724623379406, 0.0766975598629862, 0.07719786708188259, 0.07769816784869024, 0.07819846212161714, 0.07869874985887225, 0.07919903101866545, 0.0796993055592077, 0.08019957343871094, 0.08069983461538806, 0.081200089047453, 0.08170033669312073, 0.08220057751060715, 0.08270081145812931, 0.08320103849390523, 0.08370125857615397, 0.08420147166309568, 0.08470167771295145, 0.08520187668394358, 0.08570206853429531, 0.08620225322223099, 0.08670243070597614, 0.08720260094375722, 0.08770276389380184, 0.08820291951433873, 0.0887030677635977, 0.08920320859980964, 0.08970334198120666, 0.09020346786602186, 0.09070358621248954, 0.09120369697884516, 0.0917038001233252, 0.09220389560416742, 0.09270398337961068, 0.09320406340789501, 0.0937041356472616, 0.09420420005595274, 0.09470425659221206, 0.09520430521428418, 0.09570434588041511, 0.09620437854885194, 0.09670440317784293, 0.09720441972563763, 0.09770442815048676, 0.09820442841064232, 0.09870442046435747, 0.09920440426988662, 0.09970437978548549, 0.10020434696941093, 0.10070430577992111, 0.10120425617527548, 0.10170419811373473, 0.10220413155356078, 0.10270405645301695, 0.10320397277036769, 0.10370388046387886, 0.10420377949181753, 0.10470366981245217, 0.10520355138405248, 0.10570342416488952, 0.10620328811323565, 0.10670314318736455, 0.1072029893455513, 0.10770282654607219, 0.10820265474720502, 0.10870247390722883, 0.10920228398442407, 0.10970208493707251, 0.11020187672345733, 0.1107016593018631, 0.11120143263057577, 0.11170119666788267, 0.11220095137207246, 0.11270069670143534, 0.11320043261426284, 0.1137001590688479, 0.11419987602348491, 0.11469958343646973, 0.11519928126609953, 0.11569896947067304, 0.11619864800849036, 0.11669831683785309, 0.11719797591706432, 0.11769762520442856, 0.11819726465825175, 0.11869689423684143, 0.11919651389850648, 0.11969612360155739, 0.12019572330430615, 0.12069531296506614, 0.12119489254215234, 0.12169446199388123, 0.1221940212785708, 0.12269357035454063, 0.12319310918011174, 0.12369263771360675, 0.1241921559133498, 0.12469166373766664, 0.12519116114488452, 0.12569064809333225, 0.12619012454134032, 0.12668959044724065, 0.12718904576936688, 0.12768849046605407, 0.12818792449563915, 0.12868734781646038, 0.12918676038685772, 0.1296861621651729, 0.13018555310974902, 0.130684933178931, 0.13118430233106532, 0.13168366052450015, 0.1321830077175852, 0.1326823438686719, 0.13318166893611344, 0.1336809828782645, 0.13418028565348158, 0.13467957722012278, 0.13517885753654788, 0.13567812656111838, 0.13617738425219747, 0.13667663056815013, 0.1371758654673428, 0.13767508890814403, 0.13817430084892374, 0.1386735012480537, 0.13917269006390748, 0.1396718672548603, 0.14017103277928925, 0.14067018659557298, 0.14116932866209211, 0.1416684589372289, 0.14216757737936742, 0.14266668394689352, 0.1431657785981948, 0.14366486129166073, 0.14416393198568253, 0.14466299063865318, 0.1451620372089676, 0.14566107165502237, 0.146160093935216, 0.14665910400794885, 0.14715810183162298, 0.1476570873646425, 0.1481560605654131, 0.14865502139234263, 0.14915396980384055, 0.1496529057583183, 0.15015182921418915, 0.15065074012986832, 0.15114963846377286, 0.15164852417432176, 0.15214739721993584, 0.15264625755903782, 0.15314510515005242, 0.15364393995140624, 0.15414276192152776, 0.15464157101884746, 0.15514036720179764, 0.1556391504288127, 0.15613792065832893, 0.15663667784878443, 0.1571354219586195, 0.15763415294627625, 0.15813287077019883, 0.15863157538883335, 0.1591302667606278, 0.15962894484403242, 0.1601276095974992, 0.1606262609794822, 0.16112489894843762, 0.16162352346282355, 0.1621221344811001, 0.16262073196172944, 0.1631193158631758, 0.1636178861439054, 0.16411644276238663, 0.16461498567708968, 0.16511351484648706, 0.16561203022905333, 0.16611053178326488, 0.16660901946760048, 0.16710749324054072, 0.16760595306056858, 0.16810439888616885, 0.16860283067582857, 0.1691012483880369, 0.16959965198128502, 0.17009804141406637, 0.1705964166448764, 0.17109477763221279, 0.17159312433457533, 0.17209145671046586, 0.1725897747183885, 0.17308807831684947, 0.1735863674643572, 0.17408464211942237, 0.17458290224055756, 0.17508114778627784, 0.17557937871510024, 0.17607759498554423, 0.17657579655613123, 0.1770739833853851, 0.17757215543183175, 0.17807031265399934, 0.17856845501041835, 0.1790665824596214, 0.17956469496014346, 0.1800627924705216, 0.18056087494929518, 0.18105894235500597, 0.18155699464619784, 0.18205503178141702, 0.18255305371921196, 0.18305106041813343, 0.18354905183673453, 0.1840470279335706, 0.18454498866719926, 0.1850429339961805, 0.18554086387907662, 0.18603877827445225, 0.18653667714087424, 0.18703456043691197, 0.18753242812113702, 0.18803028015212334, 0.18852811648844725, 0.18902593708868742, 0.18952374191142496, 0.19002153091524318, 0.19051930405872797, 0.19101706130046742, 0.1915148025990522, 0.1920125279130752, 0.19251023720113183, 0.19300793042181982, 0.1935056075337395, 0.19400326849549332, 0.19450091326568647, 0.19499854180292636, 0.19549615406582294, 0.19599375001298858, 0.19649132960303808, 0.19698889279458878, 0.1974864395462604, 0.19798396981667515, 0.19848148356445777, 0.19897898074823542, 0.19947646132663777, 0.199973925258297, 0.20047137250184777, 0.20096880301592734, 0.20146621675917536, 0.20196361369023402, 0.2024609937677481, 0.20295835695036488, 0.20345570319673426, 0.20395303246550853, 0.2044503447153426, 0.2049476399048941, 0.20544491799282283, 0.2059421789377916, 0.20643942269846555, 0.20693664923351252, 0.2074338585016028, 0.20793105046140936, 0.2084282250716079, 0.20892538229087645, 0.20942252207789588, 0.20991964439134952, 0.21041674918992356, 0.2109138364323066, 0.21141090607718988, 0.2119079580832675, 0.21240499240923594, 0.21290200901379458, 0.21339900785564533, 0.2138959888934928, 0.21439295208604423, 0.2148898973920096, 0.21538682477010154, 0.2158837341790355, 0.2163806255775295, 0.21687749892430427, 0.21737435417808326, 0.21787119129759272, 0.21836801024156155, 0.2188648109687214, 0.21936159343780665, 0.21985835760755446, 0.2203551034367047, 0.22085183088400004, 0.22134853990818593, 0.2218452304680104, 0.2223419025222246, 0.22283855602958216, 0.22333519094883963, 0.22383180723875626, 0.22432840485809427, 0.22482498376561855, 0.22532154392009687, 0.22581808528029973, 0.22631460780500054, 0.22681111145297558, 0.2273075961830038, 0.22780406195386718, 0.22830050872435043, 0.22879693645324123, 0.2292933450993299, 0.2297897346214099, 0.2302861049782774, 0.2307824561287315, 0.23127878803157415, 0.23177510064561027, 0.23227139392964766, 0.23276766784249694, 0.2332639223429717, 0.23376015738988845, 0.23425637294206667, 0.23475256895832874, 0.23524874539749988, 0.23574490221840833, 0.23624103937988533, 0.23673715684076502, 0.23723325455988453, 0.2377293324960839, 0.23822539060820627, 0.23872142885509753, 0.23921744719560684, 0.239713445588586, 0.24020942399289028, 0.24070538236737754, 0.24120132067090883, 0.24169723886234812, 0.24219313690056263, 0.2426890147444223, 0.24318487235280034, 0.24368070968457292, 0.24417652669861928, 0.2446723233538215, 0.2451680996090652, 0.2456638554232386, 0.24615959075523322, 0.24665530556394358, 0.24715099980826727, 0.24764667344710514, 0.2481423264393609, 0.24863795874394162, 0.24913357031975716], "ci": [-8.633124709574648, -6.8400302144042655, -6.233773338347898, -5.859034749131103, -5.587077676440535, -5.37348950659965, -5.197589624789602, -5.048051559293328, -4.917993974142948, -4.802921491670446, -4.699735060246429, -4.606207541658889, -4.520684492447774, -4.441903219214107, -4.368878094211612, -4.300824991109329, -4.237109845378832, -4.177212649027295, -4.120701635647991, -4.067214379507651, -4.016443699050059, -3.968126969963971, -3.9220379036938042, -3.877980138866089, -3.8357821861085433, -3.7952933971373084, -3.756380718739616, -3.718926055105001, -3.682824106618205, -3.6479805854246785, -3.6143107315958733, -3.5817380711040587, -3.550193369808342, -3.5196137474644793, -3.4899419232512057, -3.4611255700601307, -3.4331167592603, -3.4058714811387856, -3.37934922896788, -3.353512636830048, -3.328327163072713, -3.303760812663497, -3.279783892846658, -3.256368797419755, -3.233489815699655, -3.2111229628628353, -3.189245828852844, -3.1678374434687306, -3.146878155598535, -3.126349524854636, -3.106234224113377, -3.086515951668199, -3.0671793518803248, -3.048209943359311, -3.0295940538319632, -3.0113187609657994, -2.99337183850553, -2.975741707160201, -2.9584173897469093, -2.9413884701559323, -2.9246450557531287, -2.9081777428798015, -2.8919775851487515, -2.8760360642689067, -2.8603450631603202, -2.8448968411470954, -2.829684011038461, -2.814699517928112, -2.799936619559514, -2.7853888681203913, -2.77105009334335, -2.7569143868017782, -2.7429760873009843, -2.72922976727418, -2.7156702201014786, -2.7022924482777815, -2.689091652362242, -2.6760632206481763, -2.663202719497772, -2.650505884290914, -2.6379686109418805, -2.625586947941693, -2.613357088887515, -2.6012753654637457, -2.589338240842443, -2.5775423034733613, -2.5658842612363166, -2.554360935930821, -2.5429692580798893, -2.531706262026781, -2.5205690813050725, -2.5095549442639777, -2.498661169932218, -2.487885164104999, -2.4772244156398044, -2.4666764929477814, -2.456239040668442, -2.445909776516324, -2.435686488289031, -2.425567031026855, -2.415549324314848, -2.4056313497188646, -2.395811148347664, -2.386086818533706, -2.376456513625779, -2.366918439887047, -2.357470854492528, -2.3481120636204214, -2.3388404206320454, -2.3296543243355003, -2.3205522173284736, -2.311532584415903, -2.3025939510984665, -2.293734882128142, -2.28495398012728, -2.2762498842678847, -2.2676212690079693, -2.259066842882051, -2.2505853473430353, -2.242175555652879, -2.233836271819599, -2.2255663295783137, -2.217364591414148, -2.209229947624964, -2.201161315421964, -2.1931576380663733, -2.185217884040453, -2.1773410462512337, -2.169526141265423, -2.1617722085740465, -2.1540783098854255, -2.146443528445217, -2.1388669683822585, -2.1313477540790653, -2.123885029565874, -2.1164779579371698, -2.109125720789725, -2.101827517681182, -2.0945825656083037, -2.0873900985040303, -2.0802493667525352, -2.0731596367215186, -2.066120190311001, -2.0591303245179327, -2.052189351015944, -2.045296595749628, -2.038451398542736, -2.0316531127197357, -2.0249011047401764, -2.0181947538453495, -2.0115334517167534, -2.004916602145885, -1.9983436207149219, -1.991813934487854, -1.9853269817116697, -1.9788822115271916, -1.972479083689208, -1.966117068295529, -1.959795645524632, -1.9535143053815782, -1.9472725474518795, -1.941069880663028, -1.9349058230533944, -1.9287799015482348, -1.9226916517425334, -1.9166406176904416, -1.9106263517010684, -1.9046484141403999, -1.898706373239118, -1.8927998049061245, -1.8869282925475497, -1.8810914268910692, -1.875288805815335, -1.8695200341843439, -1.863784723686575, -1.858082492678732, -1.8524129660339286, -1.8467757749941753, -1.8411705570270112, -1.8355969556861527, -1.8300546204760137, -1.824543206719983, -1.8190623754323143, -1.8136117931935367, -1.8081911320292436, -1.8028000692921708, -1.7974382875474462, -1.7921054744609162, -1.7868013226904402, -1.7815255297800738, -1.7762777980570357, -1.771057834531376, -1.7658653507982658, -1.760700062942817, -1.7555616914473626, -1.7504499611011155, -1.745364600912138, -1.740305344021548, -1.7352719276198938, -1.7302640928656352, -1.7252815848056635, -1.7203241522978057, -1.7153915479352435, -1.710483527972802, -1.7055998522550457, -1.700740284146131, -1.6959045904613645, -1.6910925414004139, -1.6863039104821318, -1.6815384744809379, -1.6767960133647157, -1.6720763102341891, -1.6673791512637277, -1.6627043256435396, -1.658051625523224, -1.6534208459566333, -1.648811784848017, -1.644224242899403, -1.6396580235591938, -1.6351129329719325, -1.6305887799292165, -1.6260853758217182, -1.621602534592294, -1.61714007269014, -1.6126978090259776, -1.6082755649282325, -1.6038731641001844, -1.599490432578068, -1.595127198690084, -1.5907832930163148, -1.5864585483495088, -1.5821527996567155, -1.5778658840417483, -1.5735976407084538, -1.5693479109247666, -1.5651165379875311, -1.5609033671880705, -1.5567082457784778, -1.5525310229386218, -1.5483715497438428, -1.544229679133319, -1.5401052658790941, -1.5359981665557434, -1.5319082395106645, -1.5278353448349806, -1.5237793443350331, -1.5197401015044605, -1.5157174814968366, -1.5117113510988671, -1.5077215787041225, -1.5037480342872944, -1.4997905893789705, -1.4958491170409063, -1.4919234918417885, -1.4880135898334754, -1.484119288527703, -1.4802404668732467, -1.4763770052335308, -1.4725287853646674, -1.4686956903939234, -1.4648776047986019, -1.4610744143853258, -1.4572860062697213, -1.4535122688564839, -1.4497530918198267, -1.4460083660842944, -1.442277983805939, -1.4385618383538517, -1.4348598242920338, -1.4311718373616111, -1.4274977744633748, -1.4238375336406432, -1.4201910140624445, -1.4165581160070007, -1.4129387408455198, -1.4093327910262785, -1.4057401700589955, -1.402160782499488, -1.3985945339346009, -1.395041330967412, -1.3915010812026944, -1.3879736932326472, -1.38445907662287, -1.3809571418985898, -1.3774678005311343, -1.3739909649246338, -1.3705265484029663, -1.3670744651969204, -1.3636346304315883, -1.3602069601139748, -1.3567913711208197, -1.3533877811866295, -1.349996108891915, -1.346616273651631, -1.3432481957038092, -1.3398917960983878, -1.3365469966862278, -1.333213720108316, -1.329891889785146, -1.3265814299062815, -1.3232822654200906, -1.3199943220236523, -1.3167175261528279, -1.3134518049725012, -1.310197086366973, -1.306953298930519, -1.303720371958099, -1.3004982354362173, -1.2972868200339356, -1.294086057094024, -1.2908958786242624, -1.287716217288879, -1.2845470064001239, -1.2813881799099816, -1.2782396724020113, -1.275101419083322, -1.2719733557766681, -1.2688554189126764, -1.2657475455221912, -1.26264967322874, -1.2595617402411203, -1.2564836853460961, -1.2534154479012145, -1.250356967827727, -1.2473081856036268, -1.2442690422567886, -1.2412394793582142, -1.2382194390153842, -1.235208863865708, -1.2322076970700764, -1.2292158823065071, -1.2262333637638945, -1.2232600861358436, -1.2202959946146057, -1.217341034885099, -1.2143951531190205, -1.2114582959690472, -1.2085304105631198, -1.205611444498814, -1.2027013458377949, -1.1998000631003505, -1.1969075452600073, -1.1940237417382258, -1.1911486023991702, -1.1882820775445577, -1.185424117908578, -1.182574674652894, -1.1797336993617036, -1.1769011440368837, -1.1740769610931956, -1.1712611033535636, -1.1684535240444192, -1.1656541767911106, -1.1628630156133801, -1.1600799949209022, -1.157305069508887, -1.1545381945537438, -1.1517793256088067, -1.1490284186001203, -1.1462854298222802, -1.143550315934338, -1.1408230339557577, -1.1381035412624292, -1.1353917955827388, -1.1326877549936911, -1.1299913779170858, -1.1273026231157461, -1.1246214496897973, -1.1219478170730004, -1.119281685029129, -1.1166230136483999, -1.113971763343951, -1.1113278948483656, -1.1086913692102427, -1.1060621477908166, -1.1034401922606174, -1.1008254645961775, -1.098217927076784, -1.0956175422812706, -1.093024273084855, -1.0904380826560147, -1.0878589344534062, -1.0852867922228244, -1.0827216199942007, -1.0801633820786418, -1.0776120430655045, -1.07506756781951, -1.0725299214778967, -1.069999069447607, -1.067474977402513, -1.064957611280674, -1.0624469372816363, -1.059942921863757, -1.0574455317415712, -1.054954733883189, -1.0524704955077242, -1.0499927840827572, -1.0475215673218297, -1.0450568131819715, -1.042598489861256, -1.0401465657963878, -1.0377010096603236, -1.0352617903599142, -1.0328288770335852, -1.030402239049041, -1.0279818460009988, -1.0255676677089491, -1.0231596742149462, -1.020757835781423, -1.018362122889037, -1.0159725062345346, -1.0135889567286516, -1.0112114454940297, -1.0088399438631657, -1.0064744233763794, -1.0041148557798123, -1.0017612130234435, -0.9994134672591347, -0.9970715908386975, -0.9947355563119806, -0.9924053364249847, -0.9900809041179959, -0.9877622325237428, -0.9854492949655762, -0.9831420649556685, -0.9808405161932349, -0.9785446225627765, -0.9762543581323431, -0.9739696971518164, -0.9716906140512122, -0.9694170834390052, -0.9671490801004707, -0.9648865789960456, -0.9626295552597097, -0.9603779841973851, -0.9581318412853541, -0.9558911021686931, -0.9536557426597299, -0.951425738736511, -0.9492010665412941, -0.9469817023790519, -0.9447676227159953, -0.9425588041781146, -0.9403552235497329, -0.9381568577720822, -0.9359636839418883, -0.9337756793099781, -0.9315928212798971, -0.9294150874065463, -0.9272424553948332, -0.9250749030983352, -0.922912408517983, -0.9207549498007521, -0.9186025052383757, -0.9164550532660662, -0.914312572461253, -0.912175041542335, -0.9100424393674447, -0.9079147449332277, -0.9057919373736344, -0.9036739959587249, -0.9015609000934877, -0.8994526293166694, -0.89734916329962, -0.8952504818451471, -0.8931565648863855, -0.8910673924856772, -0.8889829448334637, -0.8869032022471907, -0.8848281451702232, -0.8827577541707744, -0.8806920099408436, -0.8786308932951665, -0.8765743851701772, -0.8745224666229783, -0.8724751188303276, -0.870432323087628, -0.8683940608079344, -0.8663603135209679, -0.8643310628721392, -0.8623062906215865, -0.860285978643218, -0.8582701089237694, -0.8562586635618672, -0.8542516247671033, -0.8522489748591205, -0.8502506962667048, -0.848256771526888, -0.8462671832840616, -0.8442819142890957, -0.8423009473984705, -0.8403242655734149, -0.8383518518790545, -0.836383689483567, -0.8344197616573489, -0.8324600517721876, -0.8305045433004427, -0.828553219814237, -0.8266060649846545, -0.8246630625809456]}
},{}],42:[function(require,module,exports){
module.exports={"x": [1000000000.0, 3002004008.016032, 5004008016.032064, 7006012024.048096, 9008016032.064129, 11010020040.08016, 13012024048.096191, 15014028056.112225, 17016032064.128256, 19018036072.144287, 21020040080.16032, 23022044088.176353, 25024048096.192383, 27026052104.208416, 29028056112.22445, 31030060120.24048, 33032064128.25651, 35034068136.272545, 37036072144.288574, 39038076152.30461, 41040080160.32064, 43042084168.33667, 45044088176.35271, 47046092184.36874, 49048096192.384766, 51050100200.4008, 53052104208.41683, 55054108216.43286, 57056112224.4489, 59058116232.46493, 61060120240.48096, 63062124248.496994, 65064128256.51302, 67066132264.52905, 69068136272.54509, 71070140280.56113, 73072144288.57715, 75074148296.59319, 77076152304.60922, 79078156312.62524, 81080160320.64128, 83082164328.65732, 85084168336.67334, 87086172344.68938, 89088176352.70541, 91090180360.72144, 93092184368.73747, 95094188376.75351, 97096192384.76953, 99098196392.78557, 101100200400.8016, 103102204408.81763, 105104208416.83366, 107106212424.8497, 109108216432.86572, 111110220440.88176, 113112224448.8978, 115114228456.91382, 117116232464.92986, 119118236472.94589, 121120240480.96191, 123122244488.97795, 125124248496.99399, 127126252505.01001, 129128256513.02605, 131130260521.04208, 133132264529.0581, 135134268537.07414, 137136272545.09018, 139138276553.1062, 141140280561.12225, 143142284569.13828, 145144288577.1543, 147146292585.17035, 149148296593.18637, 151150300601.2024, 153152304609.21844, 155154308617.23447, 157156312625.2505, 159158316633.26654, 161160320641.28256, 163162324649.29858, 165164328657.31464, 167166332665.33066, 169168336673.34668, 171170340681.36273, 173172344689.37875, 175174348697.39478, 177176352705.41083, 179178356713.42685, 181180360721.44287, 183182364729.45892, 185184368737.47495, 187186372745.49097, 189188376753.50702, 191190380761.52304, 193192384769.53906, 195194388777.5551, 197196392785.57114, 199198396793.58716, 201200400801.6032, 203202404809.61923, 205204408817.63525, 207206412825.6513, 209208416833.66733, 211210420841.68335, 213212424849.6994, 215214428857.71542, 217216432865.73145, 219218436873.7475, 221220440881.76352, 223222444889.77954, 225224448897.7956, 227226452905.8116, 229228456913.82764, 231230460921.8437, 233232464929.8597, 235234468937.87573, 237236472945.89178, 239238476953.9078, 241240480961.92383, 243242484969.93988, 245244488977.9559, 247246492985.97192, 249248496993.98798, 251250501002.004, 253252505010.02002, 255254509018.03607, 257256513026.0521, 259258517034.0681, 261260521042.08417, 263262525050.1002, 265264529058.1162, 267266533066.13226, 269268537074.1483, 271270541082.1643, 273272545090.18036, 275274549098.1964, 277276553106.2124, 279278557114.22845, 281280561122.2445, 283282565130.2605, 285284569138.27655, 287286573146.2926, 289288577154.3086, 291290581162.32465, 293292585170.3407, 295294589178.3567, 297296593186.37274, 299298597194.3888, 301300601202.4048, 303302605210.42084, 305304609218.4369, 307306613226.4529, 309308617234.46893, 311310621242.485, 313312625250.501, 315314629258.517, 317316633266.5331, 319318637274.5491, 321320641282.5651, 323322645290.5812, 325324649298.59717, 327326653306.6132, 329328657314.6293, 331330661322.64526, 333332665330.6613, 335334669338.67737, 337336673346.69336, 339338677354.7094, 341340681362.72546, 343342685370.74146, 345344689378.7575, 347346693386.77356, 349348697394.78955, 351350701402.8056, 353352705410.82166, 355354709418.83765, 357356713426.8537, 359358717434.86975, 361360721442.88574, 363362725450.9018, 365364729458.91785, 367366733466.93384, 369368737474.9499, 371370741482.96594, 373372745490.98193, 375374749498.998, 377376753507.01404, 379378757515.03, 381380761523.0461, 383382765531.06213, 385384769539.0781, 387386773547.0942, 389388777555.1102, 391390781563.1262, 393392785571.1423, 395394789579.1583, 397396793587.1743, 399398797595.19037, 401400801603.2064, 403402805611.2224, 405404809619.23846, 407406813627.2545, 409408817635.2705, 411410821643.28656, 413412825651.3026, 415414829659.3186, 417416833667.33466, 419418837675.3507, 421420841683.3667, 423422845691.38275, 425424849699.3988, 427426853707.4148, 429428857715.43085, 431430861723.4469, 433432865731.4629, 435434869739.47894, 437436873747.495, 439438877755.511, 441440881763.52704, 443442885771.5431, 445444889779.5591, 447446893787.57513, 449448897795.5912, 451450901803.6072, 453452905811.6232, 455454909819.6393, 457456913827.6553, 459458917835.6713, 461460921843.6874, 463462925851.70337, 465464929859.7194, 467466933867.7355, 469468937875.75146, 471470941883.7675, 473472945891.78357, 475474949899.79956, 477476953907.8156, 479478957915.83167, 481480961923.84766, 483482965931.8637, 485484969939.87976, 487486973947.89575, 489488977955.9118, 491490981963.92786, 493492985971.94385, 495494989979.9599, 497496993987.97595, 499498997995.99194, 501501002004.008, 503503006012.02405, 505505010020.04004, 507507014028.0561, 509509018036.07214, 511511022044.08813, 513513026052.1042, 515515030060.12024, 517517034068.1362, 519519038076.1523, 521521042084.16833, 523523046092.1843, 525525050100.2004, 527527054108.21643, 529529058116.2324, 531531062124.2485, 533533066132.2645, 535535070140.2805, 537537074148.2966, 539539078156.3126, 541541082164.3286, 543543086172.34467, 545545090180.3607, 547547094188.3767, 549549098196.39276, 551551102204.4088, 553553106212.4248, 555555110220.4409, 557557114228.4569, 559559118236.4729, 561561122244.489, 563563126252.505, 565565130260.521, 567567134268.5371, 569569138276.5531, 571571142284.5691, 573573146292.5852, 575575150300.6012, 577577154308.6172, 579579158316.6333, 581581162324.6493, 583583166332.6653, 585585170340.6814, 587587174348.6974, 589589178356.7134, 591591182364.7295, 593593186372.7455, 595595190380.7615, 597597194388.7776, 599599198396.7936, 601601202404.8096, 603603206412.8257, 605605210420.8417, 607607214428.8577, 609609218436.8738, 611611222444.8898, 613613226452.9058, 615615230460.9219, 617617234468.9379, 619619238476.9539, 621621242484.97, 623623246492.986, 625625250501.002, 627627254509.0181, 629629258517.034, 631631262525.05, 633633266533.0662, 635635270541.0822, 637637274549.0981, 639639278557.1143, 641641282565.1302, 643643286573.1462, 645645290581.1624, 647647294589.1783, 649649298597.1943, 651651302605.2104, 653653306613.2264, 655655310621.2424, 657657314629.2585, 659659318637.2745, 661661322645.2905, 663663326653.3066, 665665330661.3226, 667667334669.3386, 669669338677.3547, 671671342685.3707, 673673346693.3867, 675675350701.4028, 677677354709.4188, 679679358717.4348, 681681362725.4509, 683683366733.4669, 685685370741.4829, 687687374749.499, 689689378757.515, 691691382765.531, 693693386773.5471, 695695390781.5631, 697697394789.5791, 699699398797.5952, 701701402805.6112, 703703406813.6272, 705705410821.6433, 707707414829.6593, 709709418837.6753, 711711422845.6914, 713713426853.7074, 715715430861.7234, 717717434869.7395, 719719438877.7555, 721721442885.7715, 723723446893.7876, 725725450901.8036, 727727454909.8196, 729729458917.8357, 731731462925.8517, 733733466933.8677, 735735470941.8838, 737737474949.8998, 739739478957.9158, 741741482965.9319, 743743486973.9479, 745745490981.9639, 747747494989.98, 749749498997.996, 751751503006.012, 753753507014.0281, 755755511022.0441, 757757515030.06, 759759519038.0762, 761761523046.0922, 763763527054.1082, 765765531062.1243, 767767535070.1403, 769769539078.1562, 771771543086.1724, 773773547094.1884, 775775551102.2043, 777777555110.2205, 779779559118.2365, 781781563126.2524, 783783567134.2686, 785785571142.2845, 787787575150.3005, 789789579158.3167, 791791583166.3326, 793793587174.3486, 795795591182.3647, 797797595190.3807, 799799599198.3967, 801801603206.4128, 803803607214.4288, 805805611222.4448, 807807615230.4609, 809809619238.4769, 811811623246.4929, 813813627254.509, 815815631262.525, 817817635270.541, 819819639278.5571, 821821643286.5731, 823823647294.5891, 825825651302.6052, 827827655310.6212, 829829659318.6372, 831831663326.6533, 833833667334.6693, 835835671342.6853, 837837675350.7014, 839839679358.7174, 841841683366.7334, 843843687374.7495, 845845691382.7655, 847847695390.7815, 849849699398.7976, 851851703406.8136, 853853707414.8296, 855855711422.8457, 857857715430.8617, 859859719438.8777, 861861723446.8938, 863863727454.9098, 865865731462.9258, 867867735470.9419, 869869739478.9579, 871871743486.9739, 873873747494.99, 875875751503.006, 877877755511.022, 879879759519.0381, 881881763527.0541, 883883767535.0701, 885885771543.0862, 887887775551.1022, 889889779559.1182, 891891783567.1343, 893893787575.1503, 895895791583.1663, 897897795591.1824, 899899799599.1984, 901901803607.2144, 903903807615.2305, 905905811623.2465, 907907815631.2625, 909909819639.2786, 911911823647.2946, 913913827655.3105, 915915831663.3267, 917917835671.3427, 919919839679.3586, 921921843687.3748, 923923847695.3907, 925925851703.4067, 927927855711.4229, 929929859719.4388, 931931863727.4548, 933933867735.471, 935935871743.4869, 937937875751.5029, 939939879759.519, 941941883767.535, 943943887775.551, 945945891783.5671, 947947895791.5831, 949949899799.5991, 951951903807.6152, 953953907815.6312, 955955911823.6472, 957957915831.6633, 959959919839.6793, 961961923847.6953, 963963927855.7114, 965965931863.7274, 967967935871.7434, 969969939879.7595, 971971943887.7755, 973973947895.7915, 975975951903.8076, 977977955911.8236, 979979959919.8396, 981981963927.8557, 983983967935.8717, 985985971943.8877, 987987975951.9038, 989989979959.9198, 991991983967.9358, 993993987975.9519, 995995991983.9679, 997997995991.9839, 1000000000000.0], "si": [1.5707963259570095, 1.5707963264832407, 1.5707963265971348, 1.5707963266525338, 1.5707963266884795, 1.5707963267154192, 1.5707963267372098, 1.570796326755524, 1.5707963267711513, 1.5707963267844807, 1.570796326795711, 1.5707963268049536, 1.570796326812285, 1.5707963268177785, 1.5707963268215193, 1.570796326823614, 1.5707963268241951, 1.5707963268234197, 1.570796326821468, 1.570796326818539, 1.5707963268148455, 1.5707963268106073, 1.5707963268060448, 1.5707963268013718, 1.5707963267967904, 1.5707963267924836, 1.57079632678861, 1.570796326785301, 1.5707963267826568, 1.570796326780744, 1.570796326779596, 1.5707963267792129, 1.570796326779563, 1.5707963267805871, 1.570796326782201, 1.5707963267842997, 1.5707963267867653, 1.5707963267894687, 1.5707963267922784, 1.5707963267950655, 1.570796326797707, 1.5707963268000928, 1.5707963268021299, 1.570796326803743, 1.5707963268048797, 1.5707963268055107, 1.5707963268056293, 1.5707963268052523, 1.570796326804417, 1.57079632680318, 1.5707963268016127, 1.5707963267997986, 1.570796326797829, 1.570796326795799, 1.5707963267938019, 1.570796326791927, 1.5707963267902545, 1.5707963267888534, 1.5707963267877776, 1.5707963267870648, 1.5707963267867353, 1.5707963267867915, 1.5707963267872183, 1.5707963267879848, 1.570796326789045, 1.5707963267903422, 1.57079632679181, 1.570796326793376, 1.5707963267949663, 1.570796326796508, 1.5707963267979312, 1.5707963267991751, 1.5707963268001879, 1.570796326800929, 1.5707963268013725, 1.5707963268015057, 1.5707963268013307, 1.5707963268008638, 1.5707963268001335, 1.5707963267991802, 1.570796326798053, 1.5707963267968077, 1.5707963267955045, 1.5707963267942044, 1.570796326792967, 1.5707963267918479, 1.570796326790895, 1.570796326790149, 1.570796326789639, 1.570796326789383, 1.5707963267893874, 1.5707963267896463, 1.570796326790142, 1.570796326790847, 1.5707963267917238, 1.5707963267927292, 1.5707963267938139, 1.5707963267949263, 1.5707963267960148, 1.5707963267970297, 1.5707963267979257, 1.570796326798664, 1.5707963267992138, 1.5707963267995533, 1.5707963267996707, 1.570796326799565, 1.5707963267992455, 1.5707963267987306, 1.5707963267980478, 1.5707963267972318, 1.5707963267963223, 1.570796326795363, 1.5707963267943996, 1.570796326793476, 1.570796326792634, 1.5707963267919116, 1.5707963267913398, 1.5707963267909424, 1.5707963267907348, 1.5707963267907235, 1.5707963267909055, 1.5707963267912695, 1.5707963267917955, 1.5707963267924567, 1.5707963267932203, 1.5707963267940495, 1.5707963267949046, 1.5707963267957459, 1.570796326796535, 1.5707963267972358, 1.5707963267978176, 1.570796326798255, 1.5707963267985303, 1.570796326798633, 1.5707963267985607, 1.5707963267983198, 1.570796326797924, 1.5707963267973932, 1.5707963267967544, 1.5707963267960388, 1.5707963267952803, 1.5707963267945146, 1.5707963267937775, 1.5707963267931027, 1.57079632679252, 1.570796326792056, 1.57079632679173, 1.570796326791555, 1.5707963267915377, 1.5707963267916762, 1.5707963267919625, 1.570796326792381, 1.5707963267929108, 1.5707963267935259, 1.5707963267941965, 1.5707963267948908, 1.570796326795577, 1.5707963267962224, 1.5707963267967984, 1.5707963267972789, 1.5707963267976426, 1.5707963267978746, 1.5707963267979654, 1.5707963267979128, 1.5707963267977207, 1.5707963267973997, 1.5707963267969665, 1.5707963267964424, 1.5707963267958527, 1.5707963267952256, 1.5707963267945906, 1.570796326793977, 1.5707963267934135, 1.5707963267929252, 1.570796326792534, 1.5707963267922571, 1.570796326792106, 1.570796326792086, 1.5707963267921967, 1.5707963267924316, 1.5707963267927785, 1.57079632679322, 1.5707963267937342, 1.570796326794297, 1.5707963267948817, 1.5707963267954606, 1.5707963267960072, 1.5707963267964962, 1.5707963267969058, 1.5707963267972178, 1.5707963267974185, 1.5707963267975, 1.5707963267974598, 1.5707963267973009, 1.570796326797032, 1.5707963267966665, 1.5707963267962224, 1.5707963267957215, 1.570796326795187, 1.5707963267946445, 1.5707963267941192, 1.570796326793635, 1.5707963267932143, 1.570796326792876, 1.5707963267926348, 1.5707963267925011, 1.5707963267924803, 1.5707963267925718, 1.5707963267927703, 1.5707963267930658, 1.5707963267934437, 1.5707963267938856, 1.5707963267943703, 1.5707963267948748, 1.5707963267953757, 1.5707963267958496, 1.570796326796275, 1.5707963267966323, 1.5707963267969056, 1.570796326797083, 1.5707963267971572, 1.5707963267971257, 1.5707963267969907, 1.5707963267967595, 1.570796326796444, 1.570796326796059, 1.5707963267956235, 1.5707963267951581, 1.5707963267946845, 1.570796326794225, 1.5707963267938008, 1.570796326793431, 1.5707963267931326, 1.5707963267929188, 1.570796326792799, 1.5707963267927774, 1.5707963267928546, 1.5707963267930263, 1.5707963267932834, 1.5707963267936134, 1.5707963267940004, 1.5707963267944258, 1.5707963267948697, 1.5707963267953111, 1.5707963267957297, 1.570796326796106, 1.5707963267964231, 1.5707963267966665, 1.5707963267968257, 1.5707963267968938, 1.5707963267968688, 1.570796326796752, 1.5707963267965497, 1.5707963267962721, 1.5707963267959328, 1.570796326795548, 1.570796326795136, 1.5707963267947158, 1.5707963267943073, 1.5707963267939296, 1.5707963267935996, 1.5707963267933325, 1.5707963267931402, 1.570796326793031, 1.5707963267930094, 1.570796326793076, 1.5707963267932266, 1.570796326793454, 1.5707963267937466, 1.5707963267940905, 1.5707963267944696, 1.5707963267948657, 1.5707963267952603, 1.570796326795635, 1.5707963267959726, 1.570796326796258, 1.5707963267964775, 1.570796326796622, 1.5707963267966853, 1.570796326796665, 1.5707963267965626, 1.5707963267963831, 1.5707963267961358, 1.5707963267958327, 1.5707963267954879, 1.5707963267951182, 1.5707963267947407, 1.570796326794373, 1.5707963267940324, 1.5707963267937344, 1.5707963267934923, 1.5707963267933174, 1.570796326793217, 1.5707963267931957, 1.5707963267932536, 1.5707963267933875, 1.570796326793591, 1.5707963267938536, 1.5707963267941631, 1.5707963267945046, 1.5707963267948624, 1.570796326795219, 1.5707963267955585, 1.570796326795865, 1.570796326796124, 1.5707963267963245, 1.570796326796457, 1.5707963267965164, 1.5707963267964997, 1.5707963267964085, 1.5707963267962475, 1.5707963267960248, 1.5707963267957508, 1.570796326795439, 1.5707963267951037, 1.5707963267947609, 1.5707963267944267, 1.5707963267941165, 1.5707963267938445, 1.5707963267936231, 1.5707963267934626, 1.5707963267933696, 1.5707963267933485, 1.5707963267933995, 1.5707963267935199, 1.5707963267937035, 1.5707963267939418, 1.570796326794223, 1.5707963267945337, 1.5707963267948597, 1.5707963267951852, 1.5707963267954952, 1.5707963267957759, 1.5707963267960137, 1.570796326796198, 1.5707963267963205, 1.5707963267963763, 1.5707963267963627, 1.5707963267962808, 1.5707963267961351, 1.5707963267959326, 1.5707963267956828, 1.570796326795398, 1.5707963267950917, 1.5707963267947778, 1.5707963267944713, 1.5707963267941865, 1.5707963267939362, 1.5707963267937322, 1.5707963267935836, 1.570796326793497, 1.570796326793476, 1.5707963267935212, 1.5707963267936305, 1.5707963267937979, 1.5707963267940155, 1.570796326794273, 1.5707963267945582, 1.5707963267948573, 1.5707963267951568, 1.5707963267954423, 1.570796326795701, 1.5707963267959208, 1.5707963267960916, 1.5707963267962057, 1.5707963267962584, 1.5707963267962473, 1.5707963267961735, 1.5707963267960403, 1.570796326795855, 1.5707963267956258, 1.5707963267953637, 1.5707963267950813, 1.5707963267947922, 1.570796326794509, 1.5707963267942455, 1.570796326794014, 1.5707963267938245, 1.5707963267936862, 1.570796326793605, 1.570796326793584, 1.5707963267936247, 1.5707963267937242, 1.5707963267938778, 1.570796326794078, 1.5707963267943155, 1.5707963267945788, 1.5707963267948555, 1.5707963267951326, 1.5707963267953973, 1.5707963267956373, 1.5707963267958416, 1.570796326796001, 1.570796326796108, 1.570796326796158, 1.570796326796149, 1.5707963267960816, 1.5707963267959595, 1.5707963267957885, 1.5707963267955767, 1.5707963267953344, 1.5707963267950726, 1.5707963267948042, 1.5707963267945415, 1.5707963267942964, 1.5707963267940805, 1.5707963267939038, 1.5707963267937741, 1.5707963267936975, 1.570796326793677, 1.5707963267937135, 1.5707963267938048, 1.5707963267939467, 1.570796326794132, 1.570796326794352, 1.5707963267945966, 1.5707963267948537, 1.5707963267951117, 1.5707963267953584, 1.5707963267955825, 1.5707963267957734, 1.5707963267959226, 1.5707963267960234, 1.5707963267960712, 1.5707963267960638, 1.5707963267960023, 1.5707963267958895, 1.570796326795731, 1.5707963267955343, 1.570796326795309, 1.5707963267950653, 1.5707963267948148, 1.5707963267945693, 1.5707963267943403, 1.5707963267941383, 1.5707963267939724, 1.5707963267938505, 1.570796326793778, 1.5707963267937577, 1.5707963267937906, 1.570796326793875, 1.5707963267940064, 1.570796326794179, 1.5707963267943839, 1.5707963267946121, 1.5707963267948524, 1.5707963267950935, 1.5707963267953247, 1.5707963267955347, 1.5707963267957141, 1.5707963267958547, 1.5707963267959497, 1.5707963267959955, 1.57079632679599, 1.5707963267959333, 1.5707963267958285, 1.5707963267956808, 1.5707963267954974, 1.5707963267952867, 1.5707963267950587, 1.5707963267948242, 1.570796326794594, 1.5707963267943787, 1.570796326794189, 1.5707963267940326, 1.5707963267939173, 1.5707963267938483, 1.570796326793828, 1.570796326793858, 1.5707963267939362, 1.5707963267940588, 1.57079632679422, 1.5707963267944118, 1.5707963267946257, 1.570796326794851, 1.5707963267950777, 1.570796326795295, 1.5707963267954927, 1.5707963267956617, 1.5707963267957947, 1.570796326795885, 1.5707963267959288, 1.5707963267959246, 1.5707963267958722, 1.5707963267957747, 1.5707963267956366, 1.5707963267954648, 1.570796326795267, 1.5707963267950529, 1.5707963267948322, 1.5707963267946154, 1.5707963267944127, 1.5707963267942333, 1.5707963267940857, 1.5707963267939764, 1.5707963267939102, 1.5707963267938905, 1.5707963267939178, 1.5707963267939904, 1.5707963267941052], "ci": [5.458434486108123e-10, 1.1761572560471417e-10, 2.874342390513626e-11, -1.0296380721836884e-11, -3.1609026190621596e-11, -4.396327347160451e-11, -5.077859753194619e-11, -5.372100276236306e-11, -5.3757360935266395e-11, -5.153971124930439e-11, -4.756667481503086e-11, -4.225633086943719e-11, -3.5980019010411405e-11, -2.9077717995614423e-11, -2.1863148648917562e-11, -1.462422614122432e-11, -7.621271627190954e-12, -1.0830850301692521e-12, 4.796201289649377e-12, 9.859773321702283e-12, 1.3991480866000523e-11, 1.711576912832691e-11, 1.9198403572011712e-11, 2.0245410005162943e-11, 2.0299995388924902e-11, 1.9439405581478782e-11, 1.7770141475696097e-11, 1.542252214372137e-11, 1.2544723130040509e-11, 9.295935121590166e-12, 5.840262469576844e-12, 2.340015823268647e-12, -1.0508628424608964e-12, -4.191683440100281e-12, -6.960233687213135e-12, -9.256914819049095e-12, -1.1007411313430296e-11, -1.2164046766784866e-11, -1.270728069477217e-11, -1.2644589640241246e-11, -1.2009024426647567e-11, -1.0856772005529251e-11, -9.263543269200029e-12, -7.320973056397027e-12, -5.131497971472623e-12, -2.8037244261684235e-12, -4.480966394464054e-13, 1.828831696713823e-12, 3.928363432995206e-12, 5.763161543204404e-12, 7.261478884124846e-12, 8.369151155506107e-12, 9.05112587451591e-12, 9.292811806245684e-12, 9.099592773283375e-12, 8.496021830192639e-12, 7.524067717747079e-12, 6.240559600539096e-12, 4.71454349127827e-12, 3.0233498015873664e-12, 1.249080117864206e-12, -5.247582168458644e-13, -2.2177187358804656e-12, -3.755524431387061e-12, -5.072865413094338e-12, -6.116691842939464e-12, -6.8478128690109605e-12, -7.2421427074895655e-12, -7.291682580159645e-12, -7.0041443397088244e-12, -6.402351004079447e-12, -5.522488659832089e-12, -4.412515371206726e-12, -3.1296367432633782e-12, -1.7368258733465851e-12, -3.0086278273399855e-13, 1.111231007901411e-12, 2.4358469424488946e-12, 3.6143917769846362e-12, 4.596461504212237e-12, 5.3422659366746394e-12, 5.823306685641581e-12, 6.023972672621785e-12, 5.941894819783383e-12, 5.587513678614543e-12, 4.9835894806706756e-12, 4.16349197721752e-12, 3.1698963201933003e-12, 2.0525307872062273e-12, 8.651956228960244e-13, -3.358644377284544e-13, -1.4949955462651893e-12, -2.560156275849128e-12, -3.4842334081119183e-12, -4.227639113047913e-12, -4.7602027350692145e-12, -5.061696104819254e-12, -5.1230120976425954e-12, -4.9462622349521796e-12, -4.544360063780908e-12, -3.9404052537619175e-12, -3.1660545176023057e-12, -2.260377728697372e-12, -1.2677878657984449e-12, -2.3541739665212307e-13, 7.882734812181724e-13, 1.7561348263632804e-12, 2.624867742070146e-12, 3.3561163294228264e-12, 3.918613596828754e-12, 4.289652476818175e-12, 4.455474412874664e-12, 4.412109815536039e-12, 4.1652609039969824e-12, 3.729874455368275e-12, 3.129413948941228e-12, 2.39428187250349e-12, 1.5607838429817767e-12, 6.691954173986838e-13, -2.3858442345826717e-13, -1.1202461405527702e-12, -1.9353910408898723e-12, -2.6476880885409233e-12, -3.225784678620579e-12, -3.645085604264855e-12, -3.888881867740915e-12, -3.948620015123482e-12, -3.824463809072503e-12, -3.5249991833413615e-12, -3.0667873984024164e-12, -2.473543204508598e-12, -1.774597309585737e-12, -1.0039403432522496e-12, -1.9840268551390692e-13, 6.044638861922237e-13, 1.3674554189751649e-12, 2.0557728102508796e-12, 2.638783590931737e-12, 3.091162381446572e-12, 3.3936003490879455e-12, 3.5343992785593965e-12, 3.5093149341628894e-12, 3.3218445895113944e-12, 2.982956880250732e-12, 2.5102915553278843e-12, 1.9278207382516343e-12, 1.2638980411356534e-12, 5.501570856552362e-13, -1.792966816543498e-13, -8.906757103007836e-13, -1.5514671334921878e-12, -2.1313748112121537e-12, -2.604806731920265e-12, -2.9513166242752146e-12, -3.1563036982190445e-12, -3.212220760052423e-12, -3.118347813042982e-12, -2.8809820914416086e-12, -2.5129349090622457e-12, -2.0327533591943703e-12, -1.4643434808892323e-12, -8.350196866049007e-13, -1.745034354922244e-13, 4.858520126861505e-13, 1.1156302045374212e-12, 1.68617177056272e-12, 2.171427983196259e-12, 2.550102157968151e-12, 2.805971546099774e-12, 2.9284787765872616e-12, 2.91360779544724e-12, 2.7635986143192768e-12, 2.4870509923986478e-12, 2.09822955546197e-12, 1.6163065073534525e-12, 1.0649522098914826e-12, 4.704001427650631e-13, -1.394655207715511e-13, -7.3585375744681e-13, -1.291428247051016e-12, -1.7810078298027973e-12, -2.1823391277708875e-12, -2.4779278960384896e-12, -2.6552570753656555e-12, -2.7072805229652145e-12, -2.6330100549699705e-12, -2.4371810174342896e-12, -2.1302794386605023e-12, -1.7276899724332087e-12, -1.248960299861251e-12, -7.173648672407731e-13, -1.579994472971617e-13, 4.0305016554725187e-13, 9.394206613408775e-13, 1.4266357306950238e-12, 1.8426995454780334e-12, 2.1687939630653036e-12, 2.3908286549174896e-12, 2.499568346107053e-12, 2.491037591529173e-12, 2.366854879537707e-12, 2.133857667452086e-12, 1.8040617692207642e-12, 1.3936817170405319e-12, 9.224184023641055e-13, 4.1300166585186565e-13, -1.106726638394709e-13, -6.242985433170357e-13, -1.103840123667221e-12, -1.5275067476403917e-12, -1.8762497214038113e-12, -2.134388321627006e-12, -2.2909026720676518e-12, -2.3394811761009006e-12, -2.2788438180016265e-12, -2.11285404362623e-12, -1.8501110493978136e-12, -1.5038493325673178e-12, -1.0908572942626104e-12, -6.307901108230212e-13, -1.4569668463234688e-13, 3.417891420595572e-13, 8.091330097897866e-13, 1.2345471581228302e-12, 1.5987819117354424e-12, 1.8855342511854415e-12, 2.082006013180651e-12, 2.1799601215525717e-12, 2.1756977541485798e-12, 2.070306749935004e-12, 1.8695781344912904e-12, 1.583572740832844e-12, 1.226468182690719e-12, 8.153985663879591e-13, 3.697947691451807e-13, -8.909899003617212e-14, -5.399692117459154e-13, -9.620494672767617e-13, -1.3357328319230948e-12, -1.6441850098869357e-12, -1.873671991508593e-12, -2.014053318234318e-12, -2.059619917067278e-12, -2.009009456963096e-12, -1.8653858051023634e-12, -1.6361841700243472e-12, -1.332658530323035e-12, -9.696827528321525e-13, -5.645318923506043e-13, -1.3625207830748328e-13, 2.9482831544557037e-13, 7.087685726606301e-13, 1.0865666256799717e-12, 1.410735378449382e-12, 1.6667422026759667e-12, 1.8432621130224885e-12, 1.932608659471152e-12, 1.9313699484609138e-12, 1.840269819247181e-12, 1.6642838376078328e-12, 1.4122347957854153e-12, 1.0963269030031162e-12, 7.319073262039149e-13, 3.3620756709270027e-13, -7.225492096741521e-14, -4.741662805871497e-13, -8.510036446955367e-13, -1.1855231372704788e-12, -1.4622987252146037e-12, -1.6689927023106158e-12, -1.7965402085826871e-12, -1.839520147886599e-12, -1.7966047932319797e-12, -1.6703737713451607e-12, -1.4673717545058503e-12, -1.1975742859245965e-12, -8.73914222356241e-13, -5.121149228712704e-13, -1.288818653598473e-13, 2.5760879296476383e-13, 6.291476628313231e-13, 9.689714906138852e-13, 1.2612788999462713e-12, 1.4926901960753853e-12, 1.653130803216939e-12, 1.7354829092508809e-12, 1.7364795462750603e-12, 1.656649111862227e-12, 1.5002409032138677e-12, 1.2752052311728348e-12, 9.922409619761588e-13, 6.650191706236631e-13, 3.0927600498136857e-13, -5.863477024734573e-14, -4.2131685230611045e-13, -7.617425108050677e-13, -1.0646021141417487e-12, -1.3158541290694425e-12, -1.5040617799812594e-12, -1.6211031852792937e-12, -1.6618789025747585e-12, -1.6250372178595531e-12, -1.512771706420214e-12, -1.330801425961167e-12, -1.088204682980177e-12, -7.964036726078805e-13, -4.694197700751132e-13, -1.229001137403062e-13, 2.2728566744779038e-13, 5.64623941833229e-13, 8.733298762321319e-13, 1.1395657030717507e-12, 1.3510269098696288e-12, 1.4981535744840234e-12, 1.5746763048938638e-12, 1.5773774658944502e-12, 1.5066558989861349e-12, 1.3661933654686656e-12, 1.162984027236212e-12, 9.070370509901819e-13, 6.103146227871699e-13, 2.870125469354099e-13, -4.7463363968497e-14, -3.7784599359983194e-13, -6.885936108381186e-13, -9.652136461746925e-13, -1.1953491032507988e-12, -1.3684023690871765e-12, -1.4766199303743493e-12, -1.5154833157899895e-12, -1.483521616557818e-12, -1.382724057333115e-12, -1.2180905152580534e-12, -9.97705128333429e-13, -7.323223778276252e-13, -4.342736151243997e-13, -1.177671338933177e-13, 2.0217061823970218e-13, 5.10979994529492e-13, 7.94167245049865e-13, 1.0385697497539965e-12, 1.2333108024422352e-12, 1.3694620181914896e-12, 1.4410010124344851e-12, 1.445056694952897e-12, 1.38177053771226e-12, 1.25456565447929e-12, 1.069596022036545e-12, 8.358592406260138e-13, 5.646802553485649e-13, 2.6860046994767196e-13, -3.830809513536917e-14, -3.4152276188330466e-13, -6.272833738357041e-13, -8.822074723042419e-13, -1.0944886183772519e-12, -1.254720594154035e-12, -1.3555989676851966e-12, -1.3927521784205784e-12, -1.3648507097398174e-12, -1.2735144102395285e-12, -1.1234469929436224e-12, -9.21798065748833e-13, -6.783102369257607e-13, -4.0471419319346113e-13, -1.1361346313852942e-13, 1.8119231517493913e-13, 4.657954802599287e-13, 7.273148423347053e-13, 9.535301217689107e-13, 1.1340061061558193e-12, 1.260788114104818e-12, 1.328142894438994e-12, 1.3332644017584673e-12, 1.2762565585719411e-12, 1.1600838026081754e-12, 9.905801669131323e-13, 7.7573773163521e-13, 5.258834278208841e-13, 2.529987615005795e-13, -3.038768932564152e-14, -3.1087248834194974e-13, -5.752614468578145e-13, -8.116196116011228e-13, -1.0089276889946955e-12, -1.1581258657328093e-12, -1.2526831567631754e-12, -1.288377460748112e-12, -1.2638781216915724e-12, -1.1806121659116967e-12, -1.042755129697595e-12, -8.571241149148415e-13, -6.324057854441645e-13, -3.793583803901561e-13, -1.100689438173613e-13, 1.63135318818886e-13, 4.273589591295516e-13, 6.702072259214464e-13, 8.80746777335101e-13, 1.0491863833008447e-12, 1.1678352917218809e-12, 1.2315498275641426e-12, 1.237552098263715e-12, 1.1858922157455865e-12, 1.0792080447424001e-12, 9.22753263717558e-13, 7.24183995473716e-13, 4.92738975733474e-13, 2.394624467337582e-13, -2.3588690613416444e-14, -2.8440448066018604e-13, -5.30697405575332e-13, -7.509458874654176e-13, -9.352619823855262e-13, -1.0750982451702664e-12, -1.164116549238141e-12, -1.1985160117044638e-12, -1.1768895390314485e-12, -1.1005693228869645e-12, -9.7329025462193e-13, -8.012520890914632e-13, -5.928094172640587e-13, -3.576161221033287e-13, -1.0686498850080149e-13, 1.4754326985713444e-13, 3.9402133316146655e-13, 6.209778665994116e-13, 8.178262225965537e-13, 9.7575637026231e-13, 1.0874694190861468e-12, 1.1479537979581246e-12, 1.1546992463169538e-12, 1.1075901110512986e-12, 1.0091384244876353e-12, 8.640612174244255e-13, 6.793735913205074e-13, 4.639919231045078e-13, 2.278541881454668e-13, -1.782770520708274e-14, -2.614255536813657e-13, -4.918695930328702e-13, -6.983413744143802e-13, -8.712392143999197e-13, -1.0028525779324298e-12, -1.0871253884723165e-12, -1.1203374394136377e-12, -1.1012098084577067e-12, -1.0308335611766661e-12, -9.127953653921149e-13, -7.526789661441625e-13, -5.581859274523973e-13, -3.3866203315178976e-13, -1.0420449413972099e-13, 1.3407680310443412e-13, 3.649326621043078e-13, 5.778953448590831e-13, 7.62984587941795e-13, 9.116222572891418e-13, 1.017208333226022e-12, 1.0749137836425643e-12, 1.0822660161322514e-12, 1.0391516375972226e-12, 9.477789878489572e-13, 8.127018376064853e-13, 6.402552688491297e-13, 4.387008235212805e-13, 2.1768608441196452e-13, -1.2650808246517813e-14, -2.414146141835417e-13, -4.578317047084633e-13, -6.521104155848283e-13, -8.151627299701393e-13, -9.394615032530131e-13, -1.0195180922531636e-12, -1.0517052345137367e-12, -1.034746249218718e-12, -9.696215726159675e-13, -8.595633365919903e-13, -7.0998323381814e-13, -5.278529731486768e-13, -3.2187056953171783e-13, -1.0186305307262668e-13, 1.2210190228896175e-13, 3.394475613440018e-13, 5.399623930376072e-13, 7.145944784533154e-13, 8.551910650122571e-13, 9.552926319967956e-13, 1.010513059261835e-12, 1.0183926397793412e-12, 9.787915983906892e-13, 8.937072826775002e-13, 7.672988167270301e-13, 6.05725693422866e-13, 4.164828451363242e-13, 2.08584826789353e-13, -8.078492251210672e-15, -2.2361403671504814e-13, -4.278584418719301e-13, -6.112387023776809e-13]}
},{}],43:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isArray = require( '@stdlib/assert/is-array' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var HALF_PI = require( '@stdlib/math/constants/float64-half-pi' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var sici = require( './../lib' );


// FIXTURES //

var smallPositive = require( './fixtures/python/small_positive.json' );
var mediumPositive = require( './fixtures/python/medium_positive.json' );
var largePositive = require( './fixtures/python/large_positive.json' );
var smallNegative = require( './fixtures/python/small_negative.json' );
var mediumNegative = require( './fixtures/python/medium_negative.json' );
var largeNegative = require( './fixtures/python/large_negative.json' );
var veryLarge = require( './fixtures/python/very_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof sici, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the sine and cosine integrals for small positive numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	si = smallPositive.si;
	ci = smallPositive.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for medium positive numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	si = mediumPositive.si;
	ci = mediumPositive.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 60.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 60.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for large positive numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = largePositive.x;
	si = largePositive.si;
	ci = largePositive.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for small negative numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	si = smallNegative.si;
	ci = smallNegative.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for medium negative numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	si = mediumNegative.si;
	ci = mediumNegative.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 60.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 60.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for large negative numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = largeNegative.x;
	si = largeNegative.si;
	ci = largeNegative.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function computes the sine and cosine integrals for very large positive numbers', function test( t ) {
	var delta;
	var tol;
	var si;
	var ci;
	var x;
	var v;
	var i;

	x = veryLarge.x;
	si = veryLarge.si;
	ci = veryLarge.ci;

	for ( i = 0; i < x.length; i++ ) {
		v = sici( x[ i ] );

		delta = abs( v[ 0 ] - si[ i ] );
		tol = 2.0 * EPS * abs( si[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. SI: ' + v[ 0 ] + '. Expected: ' + si[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );

		delta = abs( v[ 1 ] - ci[ i ] );
		tol = 2.0 * EPS * abs( ci[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. CI: ' + v[ 1 ] + '. Expected: ' + ci[ i ] + '. tol: ' + tol + '. delta: ' + delta + '.' );
	}
	t.end();
});

tape( 'the function returns `[0,-Infinity]` if provided `0`', function test( t ) {
	var val = sici( 0.0 );
	t.strictEqual( isArray( val ), true, 'returns an array' );
	t.strictEqual( val[ 0 ], 0.0, 'first element equals NaN' );
	t.strictEqual( val[ 1 ], NINF, 'second element equals -Infinity' );
	t.end();
});

tape( 'the function returns `[-PI/2,NaN]` if provided `-Infinity`', function test( t ) {
	var val = sici( NINF );
	t.strictEqual( isArray( val ), true, 'returns an array' );
	t.strictEqual( val[ 0 ], -HALF_PI, 'first element equals -PI/2' );
	t.strictEqual( isnan( val[ 1 ] ), true, 'second element equals NaN' );
	t.end();
});

tape( 'the function returns `[PI/2,0]` if provided `+Infinity`', function test( t ) {
	var val = sici( PINF );
	t.strictEqual( isArray( val ), true, 'returns an array' );
	t.strictEqual( val[ 0 ], HALF_PI, 'first element equals PI/2' );
	t.strictEqual( val[ 1 ], 0, 'second element equals 0' );
	t.end();
});

tape( 'the function returns `[NaN,NaN]` if provided `NaN`', function test( t ) {
	var val = sici( NaN );
	t.strictEqual( isArray( val ), true, 'returns an array' );
	t.strictEqual( isnan( val[ 0 ] ), true, 'first element equals NaN' );
	t.strictEqual( isnan( val[ 1 ] ), true, 'second element equals NaN' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/sici/test/test.js")
},{"./../lib":34,"./fixtures/python/large_negative.json":36,"./fixtures/python/large_positive.json":37,"./fixtures/python/medium_negative.json":38,"./fixtures/python/medium_positive.json":39,"./fixtures/python/small_negative.json":40,"./fixtures/python/small_positive.json":41,"./fixtures/python/very_large.json":42,"@stdlib/assert/is-array":3,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":13,"@stdlib/math/constants/float64-eps":68,"@stdlib/math/constants/float64-half-pi":71,"@stdlib/math/constants/float64-ninf":76,"@stdlib/math/constants/float64-pinf":77,"tape":144}],44:[function(require,module,exports){
'use strict';

/**
* Compute the sine of a number.
*
* @module @stdlib/math/base/special/sin
*
* @example
* var sin = require( '@stdlib/math/base/special/sin' );
*
* var v = sin( 0.0 );
* // returns ~0.0
*
* v = sin( Math.PI/2.0 );
* // returns ~1.0
*
* v = sin( -Math.PI/6.0 );
* // returns ~-0.5
*
* v = sin( NaN );
* // returns NaN
*/

// MODULES //

var sin = require( './sin.js' );


// EXPORTS //

module.exports = sin;

},{"./sin.js":45}],45:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_sin.c?view=log}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff;

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000;

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb;

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000;

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ];


// MAIN //

/**
* Computes the sine of a number.
*
* #### Method
*
* * Let `S`, `C`, and `T` denote the `sin`, `cos` and `tan`, respectively, on `[-PI/4, +PI/4]`.
* * Reduce the argument `x` to `y1+y2 = x-k*pi/2` in `[-pi/4 , +pi/4]`, and let `n = k mod 4`. We have
*
*   | n   |  sin(x)  |  cos(x)  |  tan(x)  |
*   |:---:|:--------:|:--------:|:--------:|
*   |  0  |     S    |     C    |    T     |
*   |  1  |     C    |    -S    |   -1/T   |
*   |  2  |    -S    |    -C    |    T     |
*   |  3  |    -C    |     S    |   -1/T   |
*
*
* @param {number} x - input value
* @returns {number} sine (in radians)
*
* @example
* var v = sin( 0.0 );
* // returns ~0.0
*
* @example
* var v = sin( Math.PI/2.0 );
* // returns ~1.0
*
* @example
* var v = sin( -Math.PI/6.0 );
* // returns ~-0.5
*
* @example
* var v = sin( NaN );
* // returns NaN
*/
function sin( x ) {
	var ix;
	var n;
	var z;

	z = 0.0;
	ix = getHighWord( x );

	// Case: |x| ~< pi/4
	ix &= ABS_MASK;
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, z, 0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction...
	n = rempio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[0], Y[1] );
	case 1:
		return kernelCos( Y[0], Y[1] );
	case 2:
		return -kernelSin( Y[0], Y[1] );
	default:
		return -kernelCos( Y[0], Y[1] );
	}
} // end FUNCTION sin()


// EXPORTS //

module.exports = sin;

},{"@stdlib/math/base/special/kernel-cos":20,"@stdlib/math/base/special/kernel-sin":22,"@stdlib/math/base/special/rempio2":28,"@stdlib/math/base/utils/float64-get-high-word":56}],46:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* #### Notes
*
* * The implementation uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*
* @example
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*/
function evalpoly( c, x ) {
	var p;
	var i;

	i = c.length;
	if ( i < 2 || x === 0.0 ) {
		if ( i === 0 ) {
			return 0.0;
		}
		return c[ 0 ];
	}
	i -= 1;
	p = ( c[ i ] * x ) + c[ i-1 ];
	i -= 2;
	while ( i >= 0 ) {
		p = ( p * x ) + c[ i ];
		i -= 1;
	}
	return p;
} // end FUNCTION evalpoly()


// EXPORTS //

module.exports = evalpoly;

},{}],47:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( './evalpoly.js' );


// MAIN //

/**
* Generates a function for evaluating a polynomial.
*
* #### Notes
*
* * The compiled function uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @returns {Function} function for evaluating a polynomial
*
* @example
* var polyval = evalpoly.factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/
function factory( c ) {
	var f;
	var n;
	var m;
	var i;

	// Avoid exceeding the maximum stack size on V8 :(. Note that the choice of `500` was empirically determined...
	if ( c.length > 500 ) {
		return polyval;
	}
	// Code generation. Start with the function definition...
	f = 'return function evalpoly(x){';

	// Create the function body...
	n = c.length;

	// If no coefficients, the function always returns 0...
	if ( n === 0 ) {
		f += 'return 0.0;';
	}
	// If only one coefficient, the function always returns that coefficient...
	else if ( n === 1 ) {
		f += 'return ' + c[ 0 ] + ';';
	}
	// If more than one coefficient, apply Horner's method...
	else {
		// If `x == 0`, return the first coefficient...
		f += 'if(x===0.0){return ' + c[ 0 ] + ';}';

		// Otherwise, evaluate the polynomial...
		f += 'return ' + c[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += c[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';
	}
	// Close the function:
	f += '}';

	// Add a source directive for debugging:
	f += '//# sourceURL=evalpoly.factory.js';

	// Create the function in the global scope:
	return ( new Function( f ) )(); // eslint-disable-line no-new-func

	/*
	* returns
	*    function evalpoly( x ) {
	*        if ( x === 0.0 ) {
	*            return c[ 0 ];
	*        }
	*        return c[0]+x*(c[1]+x*(c[2]+x*(c[3]+...+x*(c[n-2]+x*c[n-1]))));
	*    }
	*/

	/**
	* Evaluates a polynomial.
	*
	* @private
	* @param {number} x - value at which to evaluate a polynomial
	* @returns {number} evaluated polynomial
	*/
	function polyval( x ) {
		return evalpoly( c, x );
	} // end FUNCTON polyval()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./evalpoly.js":46}],48:[function(require,module,exports){
'use strict';

/**
* Evaluate a polynomial.
*
* @module @stdlib/math/base/tools/evalpoly
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var polyval = evalpoly.factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var evalpoly = require( './evalpoly.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( evalpoly, 'factory', factory );


// EXPORTS //

module.exports = evalpoly;

},{"./evalpoly.js":46,"./factory.js":47,"@stdlib/utils/define-read-only-property":80}],49:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var EXP_MASK = require( '@stdlib/math/constants/float64-high-word-exponent-mask' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// MAIN //

/**
* Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {integer32} unbiased exponent
*
* @example
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
* @example
* var exp = exponent( -3.14 );
* // returns 1
* @example
* var exp = exponent( 0.0 );
* // returns 0
* @example
* var exp = exponent( NaN );
* // returns 1024
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return high - BIAS;
} // end FUNCTION exponent()


// EXPORTS //

module.exports = exponent;

},{"@stdlib/math/base/utils/float64-get-high-word":56,"@stdlib/math/constants/float64-exponent-bias":70,"@stdlib/math/constants/float64-high-word-exponent-mask":72}],50:[function(require,module,exports){
'use strict';

/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-exponent
*
* @example
* var exponent = require( '@stdlib/math/base/utils/float64-exponent );
*
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* exp = exponent( -3.14 );
* // returns 1
*
* exp = exponent( 0.0 );
* // returns 0
*
* exp = exponent( NaN );
* // returns 1024
*/

// MODULES //

var exponent = require( './exponent.js' );


// EXPORTS //

module.exports = exponent;

},{"./exponent.js":49}],51:[function(require,module,exports){
'use strict';

// MODULES //

var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Creates a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {uinteger32} high - higher order word (unsigned 32-bit integer)
* @param {uinteger32} low - lower order word (unsigned 32-bit integer)
* @returns {number} floating-point number
*
* @example
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns 3.141592653589793
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = fromWords( 4293918720, 0 );
* // returns Number.NEGATIVE_INFINITY
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
} // end FUNCTION fromWords()


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":53}],52:[function(require,module,exports){
'use strict';

/**
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/math/base/utils/float64-from-words
*
* @example
* var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
*
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* v = fromWords( 3221823995, 1413754136 );
* // returns 3.141592653589793
*
* v = fromWords( 0, 0 );
* // returns 0.0
*
* v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* v = fromWords( 2146959360, 0 );
* // returns NaN
*
* v = fromWords( 2146435072, 0 );
* // returns Number.POSITIVE_INFINITY
*
* v = fromWords( 4293918720, 0 );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var fromWords = require( './from_words.js' );


// EXPORTS //

module.exports = fromWords;

},{"./from_words.js":51}],53:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}


// EXPORTS //

module.exports = {
	'HIGH': HIGH,
	'LOW': LOW
};

},{"@stdlib/assert/is-little-endian":6}],54:[function(require,module,exports){
'use strict';

// MODULES //

var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - input value
* @returns {uinteger32} higher order word
*
* @example
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/
function getHighWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ HIGH ];
} // end FUNCTION getHighWord()


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":55}],55:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;

},{"@stdlib/assert/is-little-endian":6}],56:[function(require,module,exports){
'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-get-high-word
*
* @example
* var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var getHighWord = require( './get_high_word.js' );


// EXPORTS //

module.exports = getHighWord;

},{"./get_high_word.js":54}],57:[function(require,module,exports){
'use strict';

// MODULES //

var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns a 32-bit unsigned integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - input value
* @returns {uinteger32} lower order word
*
* @example
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/
function getLowWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ LOW ];
} // end FUNCTION getLowWord()


// EXPORTS //

module.exports = getLowWord;

},{"./low.js":59}],58:[function(require,module,exports){
'use strict';

/**
* Returns an unsigned 32-bit integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-get-low-word
*
* @example
* var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
*
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/

// MODULES //

var getLowWord = require( './get_low_word.js' );


// EXPORTS //

module.exports = getLowWord;

},{"./get_low_word.js":57}],59:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":6}],60:[function(require,module,exports){
'use strict';

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/math/base/utils/float64-normalize
*
* @example
* var normalize = require( '@stdlib/math/base/utils/float64-normalize' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*/

// MODULES //

var normalize = require( './normalize.js' );


// EXPORTS //

module.exports = normalize;

},{"./normalize.js":61}],61:[function(require,module,exports){
'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/math/constants/float64-smallest-normal' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );


// VARIABLES //

// (1<<52)
var SCALAR = 4503599627370496;


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {number} x - input value
* @returns {NumberArray} a two-element array containing `y` and `exp`
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( 0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( Number.POSITIVE_INFINITY );
* // returns [ Number.POSITIVE_INFINITY, 0 ]
*
* @example
* var out = normalize( Number.NEGATIVE_INFINITY );
* // returns [ Number.NEGATIVE_INFINIY, 0 ]
*
* @example
* var out = normalize( NaN );
* // returns [ NaN, 0 ]
*/
function normalize( x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		return [ x, 0 ];
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		return [ x*SCALAR, -52 ];
	}
	return [ x, 0 ];
} // end FUNCTION normalize()


// EXPORTS //

module.exports = normalize;

},{"@stdlib/math/base/assert/is-infinite":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":13,"@stdlib/math/constants/float64-smallest-normal":78}],62:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":6,"dup":55}],63:[function(require,module,exports){
'use strict';

/**
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-set-high-word
*
* @example
* var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
* var PINF = require( '@stdlib/math/constants/float64-pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var setHighWord = require( './set_high_word.js' );


// EXPORTS //

module.exports = setHighWord;

},{"./set_high_word.js":64}],64:[function(require,module,exports){
'use strict';

// MODULES //

var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the more significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - double
* @param {uinteger32} high - unsigned 32-bit integer to replace the higher order word of `x`
* @returns {number} double having the same lower order word as `x`
*
* @example
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); //  => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/math/constants/float64-pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/
function setHighWord( x, high ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ HIGH ] = ( high >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
} // end FUNCTION setHighWord()


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":62}],65:[function(require,module,exports){
'use strict';

/**
* Split a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/math/base/utils/float64-to-words
*
* @example
* var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/

// MODULES //

var toWords = require( './to_words.js' );


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":67}],66:[function(require,module,exports){
arguments[4][53][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":6,"dup":53}],67:[function(require,module,exports){
'use strict';

// MODULES //

var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - input value
* @returns {NumberArray} two-element array containing a higher order word and a lower order word
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/
function toWords( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return [ UINT32_VIEW[ HIGH ], UINT32_VIEW[ LOW ] ];
} // end FUNCTION toWords()


// EXPORTS //

module.exports = toWords;

},{"./indices.js":66}],68:[function(require,module,exports){
'use strict';

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/math/constants/float64-eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number is
*
* ``` tex
* \frac{1}{2^{52}}
* ```
*
* @constant
* @type {number}
* @default 2.220446049250313e-16
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_EPSILON = 2.2204460492503130808472633361816E-16;


// EXPORTS //

module.exports = FLOAT64_EPSILON;

},{}],69:[function(require,module,exports){
'use strict';

/**
* The Euler-Mascheroni constant.
*
* @module @stdlib/math/constants/float64-eulergamma
* @type {number}
*
* @example
* var GAMMA = require( '@stdlib/math/constants/float64-eulergamma' );
* // returns 0.5772156649015329
*/


// MAIN //

/**
* The Euler-Mascheroni constant.
*
* @constant
* @type {number}
* @default 0.5772156649015329
* @see [OEIS]{@link http://oeis.org/A001620}
* @see [Mathworld]{@link http://mathworld.wolfram.com/Euler-MascheroniConstant.html}
*/
var GAMMA = 0.577215664901532860606512090082402431042;


// EXPORTS //

module.exports = GAMMA;

},{}],70:[function(require,module,exports){
'use strict';

/**
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/math/constants/float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* The bias of a double-precision floating-point number's exponent. The bias can be computed via
*
* ``` tex
* \mathrm{bias} = 2^{k-1} - 1
* ```
*
* where \\(k\\) is the number of bits in the exponent; here, \\(k = 11\\).
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_EXPONENT_BIAS = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_EXPONENT_BIAS;

},{}],71:[function(require,module,exports){
'use strict';

/**
* One half times the mathematical constant `π`.
*
* @module @stdlib/math/constants/float64-half-pi
* @type {number}
*
* @example
* var HALF_PI = require( '@stdlib/math/constants/float64-half-pi' );
* // returns 1.5707963267948966
*/


// MAIN //

/**
* One half times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.5707963267948966
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var HALF_PI = 1.5707963267948966;


// EXPORTS //

module.exports = HALF_PI;

},{}],72:[function(require,module,exports){
'use strict';

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/math/constants/float64-high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ``` binarystring
* 0 11111111111 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7ff00000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_EXPONENT_MASK = 0x7ff00000;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;

},{}],73:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/math/constants/float64-max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ``` text
* 00000000000 => 0 - BIAS = -1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;

},{}],74:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/math/constants/float64-max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ``` text
* 11111111110 => 2046 - BIAS = 1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT;

},{}],75:[function(require,module,exports){
'use strict';

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/math/constants/float64-min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ``` text
* -(BIAS+(52-1)) = -(1023+51) = -1074
* ```
*
* where `BIAS = 1023` and `52` is the number of digits in the significand.
*
* @constant
* @type {integer32}
* @default -1074
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;

},{}],76:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/math/constants/float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/math/constants/float64-ninf' );
* // returns Number.NEGATIVE_INFINITY
*/


// MAIN //

/**
* Double-precision floating-point negative infinity has the bit sequence
*
* ``` binarystring
* 1 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.NEGATIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_NINF = Number.NEGATIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_NINF;

},{}],77:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/math/constants/float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/math/constants/float64-pinf' );
* // returns Number.POSITIVE_INFINITY
*/


// MAIN //

/**
* Double-precision floating-point positive infinity has the bit sequence
*
* ``` binarystring
* 0 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.POSITIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_PINF = Number.POSITIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],78:[function(require,module,exports){
'use strict';

/**
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/math/constants/float64-smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/math/constants/float64-smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number has the value
*
* ``` tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 0 00000000001 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 2.2250738585072014e-308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_SMALLEST_NORMAL = 2.2250738585072014e-308;


// EXPORTS //

module.exports = FLOAT64_SMALLEST_NORMAL;

},{}],79:[function(require,module,exports){
'use strict';

/**
* Defines a read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
* setReadOnly( obj, 'foo', 'bar' );
* obj.foo = 'boop'; // => throws
*/
function setReadOnly( obj, prop, value ) {
	Object.defineProperty( obj, prop, {
		'value': value,
		'configurable': false,
		'writable': false,
		'enumerable': true
	});
} // end FUNCTION setReadOnly()


// EXPORTS //

module.exports = setReadOnly;

},{}],80:[function(require,module,exports){
'use strict';

/**
* Defines a read-only property.
*
* @module @stdlib/utils/define-read-only-property
*
* @example
* var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
*
* var obj = {};
* setReadOnly( obj, 'foo', 'bar' );
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var setReadOnly = require( './define_read_only_property.js' );


// EXPORTS //

module.exports = setReadOnly;

},{"./define_read_only_property.js":79}],81:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests for native `Symbol` support.
*
* @returns {boolean} boolean indicating if an environment has `Symbol` support
*
* @example
* var bool = hasSymbolSupport();
* // returns <boolean>
*/
function hasSymbolSupport() {
	return (
		typeof Symbol === 'function' &&
		typeof Symbol( 'foo' ) === 'symbol'
	);
} // end FUNCTION hasSymbolSupport()


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],82:[function(require,module,exports){
'use strict';

/**
* Tests for native `Symbol` support.
*
* @module @stdlib/utils/detect-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/utils/detect-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './detect_symbol_support.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./detect_symbol_support.js":81}],83:[function(require,module,exports){
'use strict';

// MODULES //

var hasSymbols = require( '@stdlib/utils/detect-symbol-support' )();


// MAIN //

/**
* Tests for native `toStringTag` support.
*
* @returns {boolean} boolean indicating if an environment has `toStringTag` support
*
* @example
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/
function hasToStringTagSupport() {
	return ( hasSymbols && typeof Symbol.toStringTag === 'symbol' );
} // end FUNCTION hasToStringTagSupport()


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/utils/detect-symbol-support":82}],84:[function(require,module,exports){
'use strict';

/**
* Tests for native `toStringTag` support.
*
* @module @stdlib/utils/detect-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/utils/detect-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './has_tostringtag_support.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./has_tostringtag_support.js":83}],85:[function(require,module,exports){
'use strict';

/**
* Returns a string value indicating a specification defined classification of an object.
*
* @module @stdlib/utils/native-class
*
* @example
* var nativeClass = require( '@stdlib/utils/native-class' );
*
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* str = nativeClass( 5 );
* // returns '[object Number]'
*
* function Beep() {
*     return this;
* }
* str = nativeClass( new Beep() );
* // returns '[object Object]'
*/

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();


// MAIN //

var nativeClass;
if ( hasToStringTag ) {
	nativeClass = require( './polyfill.js' );
} else {
	nativeClass = require( './native_class.js' );
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":86,"./polyfill.js":87,"@stdlib/utils/detect-tostringtag-support":84}],86:[function(require,module,exports){
'use strict';

// MODULES //

var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	return toStr.call( v );
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":88}],87:[function(require,module,exports){
'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var toStringTag = require( './tostringtag.js' );
var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification of an object in environments supporting `Symbol.toStringTag`.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	var isOwn;
	var tag;
	var out;

	if ( v === null || v === void 0 ) {
		return toStr.call( v );
	}
	tag = v[ toStringTag ];
	isOwn = hasOwnProp( v, toStringTag );

	// Attempt to override the `toStringTag` property. For built-ins having a `Symbol.toStringTag` property (e.g., `JSON`, `Math`, etc), the `Symbol.toStringTag` property is read-only (e.g., , so we need to wrap in a `try/catch`.
	try {
		v[ toStringTag ] = void 0;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return toStr.call( v );
	}
	out = toStr.call( v );

	if ( isOwn ) {
		v[ toStringTag ] = tag;
	} else {
		delete v[ toStringTag ];
	}
	return out;
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":88,"./tostringtag.js":89,"@stdlib/assert/has-own-property":2}],88:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],89:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],90:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],91:[function(require,module,exports){

},{}],92:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"dup":91}],93:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],94:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":90,"ieee754":113}],95:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":115}],96:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":97,"./lib/keys.js":98}],97:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],98:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],99:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":109,"object-keys":118}],100:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],101:[function(require,module,exports){
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;

},{"./helpers/isFinite":102,"./helpers/isNaN":103,"./helpers/mod":104,"./helpers/sign":105,"es-to-primitive/es5":106,"has":112,"is-callable":116}],102:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],103:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],104:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],105:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],106:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":107,"is-callable":116}],107:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],108:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],109:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],110:[function(require,module,exports){
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],111:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":110}],112:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":111}],113:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],114:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],115:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],116:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],117:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0
    && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],118:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":119}],119:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],120:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":93}],121:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

}).call(this,require('_process'))
},{"_process":93}],122:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":123}],123:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":125,"./_stream_writable":127,"core-util-is":95,"inherits":114,"process-nextick-args":121}],124:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":126,"core-util-is":95,"inherits":114}],125:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":123,"./internal/streams/BufferList":128,"./internal/streams/destroy":129,"./internal/streams/stream":130,"_process":93,"core-util-is":95,"events":108,"inherits":114,"isarray":131,"process-nextick-args":121,"safe-buffer":138,"string_decoder/":132,"util":91}],126:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":123,"core-util-is":95,"inherits":114}],127:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":123,"./internal/streams/destroy":129,"./internal/streams/stream":130,"_process":93,"core-util-is":95,"inherits":114,"process-nextick-args":121,"safe-buffer":138,"util-deprecate":150}],128:[function(require,module,exports){
'use strict';

/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();
},{"safe-buffer":138}],129:[function(require,module,exports){
'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":121}],130:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":108}],131:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],132:[function(require,module,exports){
'use strict';

var Buffer = require('safe-buffer').Buffer;

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":138}],133:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":134}],134:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":123,"./lib/_stream_passthrough.js":124,"./lib/_stream_readable.js":125,"./lib/_stream_transform.js":126,"./lib/_stream_writable.js":127}],135:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":134}],136:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":127}],137:[function(require,module,exports){
(function (process){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this,require('_process'))
},{"_process":93,"through":149}],138:[function(require,module,exports){
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":94}],139:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":108,"inherits":114,"readable-stream/duplex.js":122,"readable-stream/passthrough.js":133,"readable-stream/readable.js":134,"readable-stream/transform.js":135,"readable-stream/writable.js":136}],140:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":101,"function-bind":111}],141:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":140,"./polyfill":142,"./shim":143,"define-properties":99,"function-bind":111}],142:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":140}],143:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":142,"define-properties":99}],144:[function(require,module,exports){
(function (process){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this,require('_process'))
},{"./lib/default_stream":145,"./lib/results":147,"./lib/test":148,"_process":93,"defined":100,"through":149}],145:[function(require,module,exports){
(function (process){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this,require('_process'))
},{"_process":93,"fs":92,"through":149}],146:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":93}],147:[function(require,module,exports){
(function (process){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected);
        var ac = inspect(res.actual);
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this,require('_process'))
},{"_process":93,"events":108,"function-bind":111,"has":112,"inherits":114,"object-inspect":117,"resumer":137,"through":149}],148:[function(require,module,exports){
(function (__dirname){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

var nextTick = require('./next_tick');

module.exports = Test;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    trim(msg).split('\n').forEach(function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = setTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator)
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : msg,
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : msg,
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this,"/node_modules/tape/lib")
},{"./next_tick":146,"deep-equal":96,"defined":100,"events":108,"has":112,"inherits":114,"path":120,"string.prototype.trim":141}],149:[function(require,module,exports){
(function (process){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this,require('_process'))
},{"_process":93,"stream":139}],150:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[43]);
