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

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],2:[function(require,module,exports){
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

},{"./is_little_endian.js":3}],3:[function(require,module,exports){
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

},{"./ctors.js":1}],4:[function(require,module,exports){
'use strict';

/**
* Test if a finite numeric value is an even number.
*
* @module @stdlib/math/base/assert/is-even
*
* @example
* var isEven = require( '@stdlib/math/base/assert/is-even' );
*
* var bool = isEven( 5.0 );
* // returns false
*
* bool = isEven( -2.0 );
* // returns true
*
* bool = isEven( 0.0 );
* // returns true
*
* bool = isEven( NaN );
* // returns false
*/

// MODULES //

var isEven = require( './is_even.js' );


// EXPORTS //

module.exports = isEven;

},{"./is_even.js":5}],5:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a finite numeric value is an even number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an even number
*
* @example
* var bool = isEven( 5.0 );
* // returns false
*
* @example
* var bool = isEven( -2.0 );
* // returns true
*
* @example
* var bool = isEven( 0.0 );
* // returns true
*
* @example
* var bool = isEven( NaN );
* // returns false
*/
function isEven( x ) {
	return isInteger( x/2.0 );
} // end FUNCTION isEven()


// EXPORTS //

module.exports = isEven;

},{"@stdlib/math/base/assert/is-integer":8}],6:[function(require,module,exports){
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

},{"./is_infinite.js":7}],7:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],8:[function(require,module,exports){
'use strict';

/**
* Test if a finite double-precision floating-point number is an integer.
*
* @module @stdlib/math/base/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/math/base/assert/is-integer' );
*
* var bool = isInteger( 1.0 );
* // returns true
*
* bool = isInteger( 3.14 );
* // returns false
*/

// MODULES //

var isInteger = require( './is_integer.js' );


// EXPORTS //

module.exports = isInteger;

},{"./is_integer.js":9}],9:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is an integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an integer
*
* @example
* var bool = isInteger( 1.0 );
* // returns true
*
* @example
* var bool = isInteger( 3.14 );
* // returns false
*/
function isInteger( x ) {
	return (floor(x) === x);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":69}],10:[function(require,module,exports){
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
* Test if a numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZero = require( './is_negative_zero.js' );


// EXPORTS //

module.exports = isNegativeZero;

},{"./is_negative_zero.js":13}],13:[function(require,module,exports){
'use strict';

// MODULES //

var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*/
function isNegativeZero( x ) {
	return (x === 0.0 && 1.0/x === NINF);
} // end FUNCTION isNegativeZero()


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/math/constants/float64-ninf":187}],14:[function(require,module,exports){
'use strict';

/**
* Test if a finite numeric value is an odd number.
*
* @module @stdlib/math/base/assert/is-odd
*
* @example
* var isOdd = require( '@stdlib/math/base/assert/is-odd' );
*
* var bool = isOdd( 5.0 );
* // returns true
*
* bool = isOdd( -2.0 );
* // returns false
*
* bool = isOdd( 0.0 );
* // returns false
*
* bool = isOdd( NaN );
* // returns false
*/

// MODULES //

var isOdd = require( './is_odd.js' );


// EXPORTS //

module.exports = isOdd;

},{"./is_odd.js":15}],15:[function(require,module,exports){
'use strict';

// MODULES //

var isEven = require( '@stdlib/math/base/assert/is-even' );


// MAIN //

/**
* Tests if a finite numeric value is an odd number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an odd number
*
* @example
* var bool = isOdd( 5.0 );
* // returns true
*
* @example
* var bool = isOdd( -2.0 );
* // returns false
*
* @example
* var bool = isOdd( 0.0 );
* // returns false
*
* @example
* var bool = isOdd( NaN );
* // returns false
*/
function isOdd( x ) {
	// Check sign to prevent overflow...
	if ( x > 0.0 ) {
		return isEven( x-1.0 );
	}
	return isEven( x+1.0 );
} // end FUNCTION isOdd()


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/math/base/assert/is-even":4}],16:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZero = require( './is_positive_zero.js' );


// EXPORTS //

module.exports = isPositiveZero;

},{"./is_positive_zero.js":17}],17:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Tests if a numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
} // end FUNCTION isPositiveZero()


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/math/constants/float64-pinf":189}],18:[function(require,module,exports){
'use strict';

// MODULES //

var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a beta distribution with first shape parameter `alpha` and second shape parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 0.5, 1.0, 1.0 );
* // returns 0.5
*
* @example
* var y = cdf( 0.5, 2.0, 4.0 );
* // returns ~0.813
*
* @example
* var y = cdf( 0.2, 2.0, 2.0 );
* // returns ~0.104
*
* @example
* var y = cdf( 0.8, 4.0, 4.0 );
* // returns ~0.967
*
* @example
* var y = cdf( -0.5, 4.0, 2.0 );
* // returns 0.0
*
* @example
* var y = cdf( 1.5, 4.0, 2.0 );
* // returns 1.0
*
* @example
* var y = cdf( 2.0, -1.0, 0.5 );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 0.5, -1.0 );
* // returns NaN
*
* @example
* var y = cdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 1.0, NaN );
* // returns NaN
*/
function cdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return 0.0;
	}
	if ( x >= 1.0 ) {
		return 1.0;
	}
	return betainc( x, alpha, beta );
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/betainc":47}],19:[function(require,module,exports){
'use strict';

// MODULES //

var betainc = require( '@stdlib/math/base/special/betainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a beta distribution with first shape parameter `alpha` and second shape parameter `beta`.
*
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 0.5, 0.5 );
*
* var y = cdf( 0.8 );
* // returns ~0.705
*
* y = cdf( 0.3 );
* // returns ~0.369
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return nan;
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a beta distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0.0 ) {
			return 0.0;
		}
		if ( x >= 1.0 ) {
			return 1.0;
		}
		return betainc( x, alpha, beta );
	} // end FUNCTION cdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":21,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/betainc":47}],20:[function(require,module,exports){
'use strict';

/**
* Evaluate the cumulative distribution function (CDF) for a beta distribution.
*
* @module @stdlib/math/base/dist/beta/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dist/beta/cdf' );
*
* var y = cdf( 0.5, 1.0, 1.0 );
* // returns 0.5
*
* y = cdf( 0.5, 2.0, 4.0 );
* // returns ~0.813
*
* @example
* var factory = require( '@stdlib/math/base/dist/beta/cdf' ).factory;
*
* var cdf = factory( 0.5, 0.5 );
*
* var y = cdf( 0.8 );
* // returns ~0.705
*
* y = cdf( 0.3 );
* // returns ~0.369
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":18,"./factory.js":19,"@stdlib/utils/define-read-only-property":195}],21:[function(require,module,exports){
'use strict';

/**
* Evaluates the cumulative distribution function (CDF) for an invalid beta distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = cdf( 1.0 );
* // returns NaN
*/
function cdf() {
	return NaN;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{}],22:[function(require,module,exports){
'use strict';

// MODULES //

var betaCDF = require( '@stdlib/math/base/dist/beta/cdf' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a beta prime distribution with first shape parameter `alpha` and second shape parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 0.5, 1.0, 1.0 );
* // returns ~0.333
* @example
* var y = cdf( 0.5, 2.0, 4.0 );
* // returns ~0.539
* @example
* var y = cdf( 0.2, 2.0, 2.0 );
* // returns ~0.074
* @example
* var y = cdf( 0.8, 4.0, 4.0 );
* // returns ~0.38
* @example
* var y = cdf( -0.5, 4.0, 2.0 );
* // returns 0.0
* @example
* var y = cdf( 2.0, -1.0, 0.5 );
* // returns NaN
* @example
* var y = cdf( 2.0, 0.5, -1.0 );
* // returns NaN
* @example
* var y = cdf( NaN, 1.0, 1.0 );
* // returns NaN
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = cdf( 0.0, 1.0, NaN );
* // returns NaN
*/
function cdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return 0.0;
	}
	if ( x === PINF ) {
		return 1.0;
	}
	return betaCDF( x / ( 1.0 + x ), alpha, beta );
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/beta/cdf":20,"@stdlib/math/constants/float64-pinf":189}],23:[function(require,module,exports){
'use strict';

// MODULES //

var betaFactory = require( '@stdlib/math/base/dist/beta/cdf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a beta prime distribution with first shape parameter `alpha` and second shape parameter `beta`.
*
* @param {PositiveNumber} alpha - first shape parameter
* @param {PositiveNumber} beta - second shape parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 0.5, 0.5 );
*
* var y = cdf( 0.8 );
* // returns ~0.465
*
* y = cdf( 0.3 );
* // returns ~0.319
*/
function factory( alpha, beta ) {
	var betaCDF;
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return nan;
	}
	betaCDF = betaFactory( alpha, beta );
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a beta prime distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0.0 ) {
			return 0.0;
		}
		if ( x === PINF ) {
			return 1.0;
		}
		return betaCDF( x / ( 1.0 + x ) );
	} // end FUNCTION cdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":25,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/beta/cdf":20,"@stdlib/math/constants/float64-pinf":189}],24:[function(require,module,exports){
'use strict';

/**
* Evaluate the cumulative distribution function (CDF) for a beta prime distribution.
*
* @module @stdlib/math/base/dist/betaprime/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dist/betaprime/cdf' );
*
* var y = cdf( 0.5, 1.0, 1.0 );
* // returns ~0.333
*
* y = cdf( 0.5, 2.0, 4.0 );
* // returns ~0.539
*
* @example
* var factory = require( '@stdlib/math/base/dist/betaprime/cdf' ).factory;
*
* var cdf = factory( 0.5, 0.5 );
*
* var y = cdf( 0.8 );
* // returns ~0.465
*
* y = cdf( 0.3 );
* // returns ~0.319
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":22,"./factory.js":23,"@stdlib/utils/define-read-only-property":195}],25:[function(require,module,exports){
'use strict';

/**
* Evaluates the cumulative distribution function (CDF) for an invalid beta prime distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = cdf( 1.0 );
* // returns NaN
*/
function cdf() {
	return NaN;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{}],26:[function(require,module,exports){
module.exports={"expected":[0.0616000090925862,7.533800082349587e-14,0.22787054114009223,0.028589525243493015,0.40567435845080785,0.11274593650656604,2.1692473854750045e-12,0.7899160522140634,0.0009431405631516132,2.9867125978695364e-29,1.2950697349449804e-9,0.9371514732165627,0.00018995832924816364,2.8264036916354593e-13,0.0002342575844379221,0.7563659643107036,6.367936948114231e-8,0.0025670952553093324,0.0001780671998051899,2.0008070102835673e-6,0.0017544664740256203,0.6241544352217325,0.004144437570276635,0.6419191002841479,4.0723159815592146e-14,0.0030417859750555723,0.0007533066097082147,1.275320013264066e-10,0.6828208436495329,6.896625919898998e-6,1.0381212885660822e-28,0.13218231759422946,0.9594246002538005,0.6140035525572065,0.486641718905453,0.011802988738778964,0.924473120537118,0.6090015383464618,9.362317828555806e-5,0.00014812365382315093,8.481468626261382e-9,0.022107894889470257,6.422307313896533e-8,1.856498510242007e-22,0.6119354341704996,3.0177260183412865e-10,0.18489923274327197,0.4821250508153944,9.564429987837929e-22,2.5624870292707546e-18,0.0004186022409464793,5.754227138412379e-16,0.9877993934462266,0.38316477227100043,0.004706045831267145,0.00206728340499097,0.3347830406641442,0.8272517846877849,1.3341792848772363e-31,0.36387088795210437,2.4428437012077025e-9,0.08871482041820442,0.012290487379190522,0.04143017163045735,1.0456828669171403e-10,0.00034352598742441194,3.2191193013751014e-18,3.1815809001449055e-23,0.08035858566419439,0.16312358182983094,5.412158351797869e-31,0.3984524702382893,7.82384499115435e-27,0.12814518458266852,0.04172121385029141,0.7487013518269694,1.1847555294559766e-13,0.003259749851978454,2.067391863497876e-6,0.3235262668251415,0.8147575546649379,0.97164137032933,0.00025593419489018817,0.9837843345672417,0.2811077416869402,0.007295884565056818,9.8263457552209e-5,0.8156946579654082,0.11704676958329734,0.02889666429727929,0.00010731054840121345,0.623699152838866,2.5658271962616947e-8,0.2368640557237387,0.00011118084080693703,0.029923963187765575,6.357311363513857e-6,1.139951732042528e-6,0.02307295568639132,5.260777509581917e-14,0.0005238816470211548,0.0660092122194303,0.28058957479457236,2.7196648840097558e-14,0.0015807213775823675,1.239799365242798e-7,6.369481495786613e-8,4.117752173085138e-15,0.05562618724253564,9.620718037307617e-9,0.0206246648946393,2.6831466094170737e-6,0.6940036925818699,1.59144133457426e-14,2.0558145394800612e-5,8.878822466558588e-9,0.0026426696847962924,0.11971956680133461,0.04058699938866501,0.16777422692476582,0.0004473490982345727,0.001051930642551325,0.00340229670880939,0.7601908295884239,3.424475950336577e-6,0.015965239671221456,0.35968178202050693,0.18804465951362953,2.583201209320986e-16,0.21353628939640837,2.897200711513873e-12,0.022779934551034442,0.8710147018161426,0.1474190424763922,2.1864411027246387e-16,0.00738798629181757,0.49935496576930916,0.3416708440632197,0.004150107039798686,0.11365185252568495,0.016110195180241253,3.2951781699553827e-12,7.445856921064976e-5,9.326713535698122e-11,4.722573364234649e-15,0.014930801347636562,0.0017772259313946772,0.003045841259106463,0.00013567443508751922,0.0003645518625025618,2.9870559062551237e-12,3.2535631104037814e-8,0.0022727354207078064,0.03765714704034312,0.9393774703082869,0.8976981200867616,0.6863369558739352,0.393726830352014,8.468806222699205e-7,0.00020198341207460085,5.166862759503787e-8,0.0942396923229158,0.021742536489741157,0.04269491155643858,0.3020234230187281,0.03975929342966646,4.038455972642709e-11,0.08562325579627532,0.9547000739158773,0.2083118883200068,0.13920554621943446,0.0021649166281659405,0.0007863105350149495,0.8096467488731333,0.14142111601753984,0.16387326126560717,7.724430041307017e-12,0.0010763856687633988,6.615306448178707e-11,0.42569198660708285,0.003774838774281323,0.030512332476974862,0.0024233416945570996,0.2529067895331166,0.009337325340734849,0.4575509437163248,0.010060487028166356,0.23660471406216402,3.496684713609777e-5,0.01157607372836768,0.5508148396587256,4.485906814586146e-5,0.08722185750879137,8.032830959694123e-10,0.17392833451821157,3.45400247829065e-10,4.509090582404262e-8,0.8784966477170835,0.22648693749789794,0.5250302362760634,5.769059930683994e-7,0.05167245584787765,0.0027155450368819205,7.106353310734472e-19,0.7351319697994559,8.428455247954936e-8,0.009665370055027874,0.0042550184457257195,3.025562723901056e-8,0.3625875725947143,0.12721936670910414,0.04211228434850379,5.974603655583412e-6,0.2956289924472459,4.4865212441431867e-26,0.015387672720297734,3.401129355932522e-23,3.252510088322278e-13,0.1468157904601853,0.0016944794650152817,0.0001787404395752386,6.80572516648484e-11,0.0479757320711719,0.052302220800292405,0.012324341763783407,0.009239648197898678,0.33108713310284554,0.0013430654475724512,0.265532117503315,3.4424182936706e-5,0.01871526646367785,1.3538016230737196e-5,7.168227332286054e-9,0.6469752687385694,0.32644626607505756,0.04259744815494308,0.007625105700038057,0.2962237055300893,0.04618725928554616,4.298577723048965e-25,0.09513052525631069,3.5126480150512155e-9,0.0032689719811843463,0.000996497673488944,4.7481780739995574e-20,0.04864876839064691,5.0352782403074026e-14,0.443706866872318,0.7712405052281633,0.5181943362573107,0.00386739258211885,0.0174841123780103,0.0003565181625611853,0.052210827725602316,0.39772069253415515,1.715010934541725e-9,0.009012953991522113,0.45036916183670905,3.17317572111055e-5,1.6312203271750552e-16,2.4701303976222424e-23,0.003711866331003147,0.000514685936798272,0.24484832855215752,3.064847971654002e-11,0.7248604381112482,0.07838988661630929,0.007434458822603865,0.0598174575427478,0.0009310663996582203,0.057925517745347065,0.013652502768133915,0.001056558471610549,0.06351980041421719,0.0021196900447479224,5.614275380282937e-10,0.5694930311334644,0.01777533102643489,0.00226796031966812,5.816953953098097e-29,0.0809781763118758,0.02112501246791825,0.08500211366905872,9.324702947519897e-7,0.09398733555678979,0.494096139836483,0.34504149408748264,0.00247474109317476,1.3861472015576373e-14,0.5396233689785941,0.5045170718625034,1.0472502530853973e-15,0.0004583188069575468,0.2576265880170856,0.005343138608016606,0.302660097931448,0.009031938470930064,3.2081785164783083e-16,0.5781277051493199,0.020928683972006427,0.7050938928004247,0.13837111270363134,0.3403922022143332,0.024179561936776228,2.3171829929157042e-15,0.0015878292202077498,1.6693023020764566e-5,0.07506345410776907,0.37608714425496437,0.31856425685642736,0.18247776111533778,0.00015263845929919966,1.8801551975483344e-8,0.08074989986116471,0.3902255039139671,0.0003336574962967522,0.9544786678341786,0.07267636550780081,0.23061421077959304,0.28462562011732495,0.928107572908571,0.31474375031830276,0.00042705340212661894,4.444633470493535e-7,0.0001242456879308533,0.016138460470013896,1.1069383680247168e-6,1.2867725444738293e-7,1.4227014684715698e-5,0.03707201423711704,0.0006591094300913542,0.6440464521604284,0.152038211675734,0.0001525344717718606,1.4304276006118802e-9,2.9634120978728894e-5,3.4835641025063246e-12,0.22249833160199073,0.0027822181076683386,3.922114265002284e-23,3.798648185623751e-12,0.5598576927123288,0.003885631569353379,0.0016283215012150493,3.364822205597153e-5,0.06264475738680005,0.010102322879528261,0.0004919898048625992,0.04228720801042993,0.0005470344270912091,1.358972618358828e-38,1.8463774781794088e-30,9.060832707800875e-8,0.011407955487005376,0.06177383030695762,0.030730500149816806,0.0033906287610890686,0.032240702338734065,0.05290498786657145,0.5130782899521079,0.004825230302933594,0.32736834016803856,0.4647284525256276,0.3232739573283977,0.04943878230076062,0.17588751752015458,0.04013526628491751,0.3932261403214276,0.7542369613250722,0.9264659123211443,0.7895936632245526,0.9566204954209829,0.20136367868867805,2.5493268195178213e-7,0.3375507885436754,0.8880624893617164,0.00038365226839332564,0.0005340613064107241,1.1101388629216136e-14,8.967524476104698e-6,0.7054137006562036,0.0004884744507444903,0.4027066395026473,6.176212797096047e-5,0.8195626771446713,0.9191239021525559,0.0046333003564151725,0.059684709412261325,1.9359017949982564e-14,0.18172977401427662,5.80571135119901e-31,0.07768486607348864,2.0487895610842188e-5,1.006928654027554e-40,0.6195927170636878,4.609291038942963e-6,6.939434170589935e-10,0.6786308838347679,0.010288715719862939,0.009921107629551888,0.001105302402054808,0.01014116824592577,2.6415970652895623e-11,8.417411570118509e-6,6.027188354425087e-6,0.5646952623166273,0.867817757155954,2.1109238190601217e-20,3.189740200504838e-26,0.29895528226317786,3.760824877856501e-18,6.647453302891631e-7,0.6911387043317136,0.0012799814660359925,5.0317991834826796e-18,0.0255249263763929,0.0010601733732405697,1.039454200704432e-13,2.9560206862012872e-6,0.05114968619125599,0.6868982263754277,1.1634369349816367e-12,4.1351187940646546e-11,0.0014991427139170932,8.46323217316444e-5,0.008768154847965361,0.04974658545177331,0.4169240373996774,8.143710448277624e-5,0.20176786030855226,8.402401784048651e-5,4.2545174986050965e-5,0.24097931431939787,1.381190537101738e-7,0.16223160512523607,0.02396751843932838,0.0027509261250439183,0.002459961924983236,0.0007278790155870708,2.1039001535628713e-5,0.8404192253585305,0.18287466431106994,9.921854538042917e-11,0.5291667380397354,0.002310756343761256,1.895722150465432e-10,0.015251146143274864,0.6445917240704475,4.85161072288881e-6,0.017949476466769747,0.002492878945676767,0.01164601293556466,2.281009235680152e-9,4.7230809753625635e-12,0.9517215254441436,0.12289303903339527,4.2814941173754283e-7,0.00041604896483973857,3.2354468914505328e-9,1.8166819680609591e-16,0.001744485737329925,0.0021584906204462884,0.2076220555494393,0.6005066973175492,3.871283549325525e-14,1.4626811748938772e-31,0.8844671282195646,1.3152255828100648e-13,2.7942272612522087e-6,3.302518859942415e-9,0.005736265610281134,0.6062338196336512,2.1492696692537374e-5,0.1974385791763456,9.37760296568676e-5,0.002445344767173852,0.00770377678190978,0.2710933292794324,0.4446651573410025,0.370313949522913,0.410066913359133,0.20969779728937635,0.9767039879082593,0.3440280839219034,0.07926049398683044,4.0827268387639643e-29,7.758852629817512e-5,0.00036433039667620756,0.06284414302592409,0.09464477302353136,0.0018930531268334736,0.9730762405009294,0.028389660647986217,1.7284723122913276e-9,0.04974255787182398,0.07600594022961335,2.630780574663376e-13,1.5948611188168866e-6,7.635500304293214e-5,0.3946507425114724,0.0011364270762393755,0.012909704174491266,0.5198439571117113,0.03069701534782723,0.9545232289655114,3.184369114650779e-5,1.5486104252244376e-21,0.9506781378545869,0.026154711039750905,0.739523888972843,0.00011633435128945034,0.004451301929093058,0.034878892957082554,0.013227977441497037,2.9696289023467944e-10,0.2888064314263019,0.3805147120722399,0.012784988574502394,3.533904130538804e-7,2.832267877399088e-10,2.0559660288907663e-10,0.026800437977705125,0.549669183054172,0.01651133021002124,0.9355152660456147,0.6014235874136058,0.0011725112496438525,0.44285500961523055,5.47793562689207e-11,2.3298306907667443e-18,1.5530733790717713e-11,2.4023037461577e-5,2.5282652234577032e-15,0.07284463827744915,5.188016127769495e-17,2.0881965714459205e-8,0.0030425073288121714,1.7656133885007046e-5,1.6375180814516007e-16,0.00015257354871342404,0.5843373085659873,0.004130584693151622,7.880424126580001e-7,0.04212317598912538,0.35495003705188116,0.18387068367418188,1.4209051345410765e-12,0.03556897545726071,0.015861224737900605,0.10057192128155944,0.004851392545948099,0.4819966003778972,0.025907022315915476,1.8743362311223815e-6,1.2053089077255188e-13,0.444748430300692,5.916169468834394e-12,0.5812991171830925,0.9126444936827063,0.8373603103041642,0.054419407727431944,0.009253163574627599,0.14803341530094585,0.7669834890083043,2.1540843601592373e-7,5.906143772456071e-23,0.6798651795857986,1.0664504935297029e-29,0.4332989509663626,1.3896775975570244e-15,0.026258439351831968,0.30130752129076876,6.261371255725016e-12,0.9310837755964245,0.6050070763310835,0.0007262844959685873,0.2092710864866092,1.940479700965296e-6,0.017137988801618965,5.926269269953181e-7,0.21640346890288945,2.385181983453851e-5,0.197848007971949,2.769749817530843e-7,0.030757476521040446,0.0013643641877636565,0.0001683450842568254,0.05786271249667311,7.558662986728393e-5,0.003044905681451648,0.22050126299244382,1.4529586999466285e-6,2.539570252391279e-10,0.6364337196107968,0.00021741774902830427,2.5884953424885105e-7,8.39302307470386e-5,2.247076703372369e-6,1.4633764049112406e-9,0.07500224944010199,0.13311392552040888,0.0009173459541559633,4.534787873369308e-5,0.18859209885300948,7.15494723256225e-13,0.08873304112803983,0.681705384518444,9.496035385108974e-12,0.02944463815883092,0.22349479047936652,0.00012722990745969509,0.003488380267315486,0.006090418363197978,0.7501151735025057,0.9123556138738567,2.9412682226501705e-6,0.0001276312625228985,0.18943725390333924,0.3992488535419425,7.683552241839572e-18,0.0014977944055493252,0.04739752362022882,0.059111508283553625,0.9766622006233829,0.06841249966785676,0.03439188891189028,0.00479018554166032,0.33105793198279837,0.6523101780127049,1.9407090606170196e-5,0.6959490252441431,0.007424337379681799,2.0047105317984506e-7,0.0036025774551098847,0.5690094756117414,0.0004492886270072303,0.03328770510128849,2.530799170549412e-16,0.04980686557351065,2.4712110527966247e-22,0.019176924536635727,0.5378977136715647,0.16943216299132788,0.0010564975851192421,0.1766489775952829,0.03670573338950646,0.5237071279647582,0.00020812177142076976,0.008411006830272131,0.007941997892460112,0.9163429399794274,0.2903131947888312,0.49519523904371393,0.6207678992654546,0.029906492980367256,0.0018085961002575965,1.0313636794321168e-13,0.5465475299529178,0.0008866692003569559,0.5568065156498745,0.00020427905931957432,4.592100771546293e-6,1.3764997143143866e-7,0.017580942460678577,2.7239381047506583e-8,0.3040555381168392,1.606808617519123e-18,0.07663345240169316,0.0010277562365861202,0.016487129039396073,0.005614332577305348,0.09328888043679186,0.0010384691338000563,0.01852949910561862,0.08393598116956638,0.12767112592148344,2.728357841407198e-7,0.0008955086732047404,5.2590816663336915e-6,6.20599377245027e-5,5.087590163028525e-5,4.95552823120178e-17,0.3806651878379081,0.0012168288986884944,1.3385868295318405e-8,0.032476309124956776,0.010017669872936364,1.7421898655331083e-5,0.28047777496042336,0.7054499474156652,2.5216121827690713e-8,0.025939318608112875,0.0003460029047181441,1.5002794750335671e-6,0.6617312121772237,0.03740862775467178,0.0004661636232272836,0.00030089786252382456,0.16392303125078403,2.6317075127084224e-38,0.00021958660753114472,8.77674533999288e-19,1.1538978820015271e-8,0.8093327305811183,0.028431088692621787,0.05479941882685092,3.473289685756848e-10,0.1435174192663533,0.39769442100541513,0.8030586738005172,0.0652861992228604,0.16805944445853488,3.692554567862812e-13,0.09355095375268559,3.3189720706041433e-10,8.185775410425345e-9,0.01136692893273117,0.0011289523288276078,1.8591838589314598e-7,0.10179750080311938,0.24645139874683505,6.6369836664562186e-21,0.055088546709670096,0.3424011112815368,0.0014597441804376544,0.004888885466332121,0.90856714995172,0.09637180960443431,4.990986663835228e-7,7.151135473720963e-17,0.9873261377734855,6.888715584816902e-9,0.018173967278053274,0.000160701371214004,0.0023044061653775317,8.489835350602421e-7,0.974388326093256,0.2368198836697669,0.4763567946789171,1.796565709737025e-15,1.4721778212087852e-13,3.596800876237591e-17,0.8826243345379106,0.08337627471802946,0.3218888641717097,4.0508678408998275e-5,8.27550568277551e-23,7.037910052851431e-9,6.611505417631269e-59,0.28311709703056687,2.3824914317574866e-15,3.3854145010056237e-16,6.147519355912786e-10,0.6275632998156389,0.3278042579687953,0.20390821046012048,0.7439069582373341,0.005921234629495277,0.1453691761173801,0.00016530864006494657,0.6884688157048531,6.406324773647403e-42,0.0024887415989707493,2.1613159164867216e-14,0.1279788790565833,0.005230965382231608,4.143403784435548e-15,0.12207644827526701,0.001836682009203404,8.405783039750737e-5,2.0246976190861935e-75,2.2826248913674667e-5,0.00023193646752833896,0.015769058470832237,0.571265950578224,0.0014604684277885543,0.005529842176768798,0.05518984330261462,0.002014219870799102,0.732159803212568,1.5184281221027704e-5,4.0517483331151e-5,5.529319560147312e-16,4.2275982635595184e-5,0.9456002074210246,0.0009715076833087681,1.1387198200894742e-7,1.0733831183533929e-6,0.36636537765352123,0.05074093715532044,0.9158702812815138,0.019829408122131294,0.07527249424045038,2.081205644816421e-9,0.005132075980223642,0.0024534282630597685,0.0010919191384808026,0.6241237532055951,5.944353555797053e-6,0.5572938950549778,5.650026119623807e-5,0.011872526274984882,0.8304416972367592,0.35269679800523934,7.993745720876466e-46,0.015290399133084618,0.09397196168274091,0.041085217074849974,9.095738163112357e-9,0.0010688750093306428,2.4795187424497086e-6,0.07684182068080553,0.8722800341444669,0.5709232896499492,4.750601682698598e-9,0.01278054116682953,4.9783468325296845e-5,8.12813176976633e-8,0.0027045187763671385,7.592763638936275e-8,1.510888413174476e-9,0.5044071123334213,0.34574491140425784,0.14936883689634436,1.482138039196773e-17,0.001211551338824926,0.04908103376886904,0.25533544687521115,0.060972242328847036,0.15849504575826595,0.30900569283230606,0.1694615842751427,0.38599301316546925,0.021530860796227028,0.013693837152395761,3.452128806129589e-12,0.03594425096905572,0.1579766829279234,0.11356714422498224,0.6996251912243552,0.012656307584830568,0.00649443353146646,0.000785032827043474,0.5926778392388863,0.0400859469555985,0.16196987281080252,0.0022361494783388054,0.8475258781592362,1.5440340702788186e-6,0.11921448333249601,1.449098882023781e-21,0.19472060005770084,3.910637043382371e-5,2.5871934512504774e-6,3.940904820569968e-15,6.350570322211685e-5,5.113863990931347e-5,0.22808763727315023,0.020464950963492597,2.1009365449962695e-32,5.876991758101966e-5,0.005464907223060233,0.27215641473684427,0.0021481090268971868,0.09398866913471718,0.0999810119590796,0.004462124578840339,0.004694074129493343,4.28388051181159e-6,9.565977308729314e-15,0.0013507139865162933,0.31311818557659854,0.2866667641739699,3.617047660009737e-7,5.216924803983211e-7,0.10841897274299625,1.524075147620195e-10,4.3873283748678886e-11,2.990085798245344e-6,0.3386954450422709,0.6090651003695422,0.41018611427730967,3.37320180010842e-8,5.245610391595357e-9,0.1443523318744559,0.24891892234220783,0.00014653596927208083,0.8712393294187533,0.7484129379543241,0.5326741943715996,2.671511381857959e-16,0.19928395935698714,0.007027137212115564,1.861093270492746e-5,0.07365878441340523,5.965432115406395e-7,1.7394518078813593e-9,0.7304335914803406,0.0864610344068289,0.9968196937299153,0.01197253700523538,0.00011572894776930434,8.711732992330981e-11,0.10131083492463366,0.14048354268558821,5.129609194248286e-57,1.6250010084325594e-6,0.1258293936069195,1.9661362942588223e-9,0.4276812211676815,1.7298632272871842e-5,3.66901242203304e-8,1.3043971771545579e-9,0.1954302727694727,0.026238398082299257,0.0018186413738084893,2.841310852423134e-26,0.0017352200273271126,0.10654682395252611,0.0029932700448456035,0.04330639728099412,0.7113398805021066,2.489236711743223e-5,7.786398160229745e-5,0.002077729071779392,0.10476931197958932,0.5507733137650765,0.0025890479329393687,0.0003494633749433109,0.0654035171242,0.9152027242520496,0.8913573675628237,0.547822490002994,0.7244365450185761,0.00011984755844250215,0.9054696257380017,0.19441644395788055,1.9415172821422117e-5,0.28377507346213404,1.5900298567223114e-9,3.773496593725315e-6,0.02042741916781409,0.0008778495903141434,0.8520212421720468,1.0704392812205724e-9,0.03239681446388209,0.00013801651813352846,3.1998643830350776e-5,0.6549882018992523,0.8856141864448461,8.289174495634428e-5,0.6481464071757994,2.3300869128298703e-9,0.0006685112798256227,0.006979858435656017,0.045673069177824425,0.0016575321571986427,8.030519032215562e-7,0.003179292669290488,2.855424545638329e-13,0.5754058474045816,0.16796234184318795,0.008315850153253252,0.7125973066514788,0.001052740252339022,0.2743772802658042,0.992306196485328,4.247427226327449e-14,1.226240001719378e-6,6.977874318225985e-14,0.006704421121704593,0.00017379492716492585,0.0014797243091703048,0.1336932743665776,0.05204315046472708,0.02424453484883748,0.012807799803703128,0.7334855463944359,1.815599089519937e-24,0.3263246650448759,2.129563282976044e-12,0.5318627014531836,1.5703927829200316e-11,0.01380529144139333,7.895667626706373e-5,0.5032307260012208,0.0019590682286821245,1.854877932893419e-8,0.017263262981446807,0.0001706680737169724,0.013919799108178399,0.0029820283032277895,0.012774439824071115,7.89832884167637e-17,8.937868626179867e-5,0.3569491906983696,0.23038929062609764,4.5221547572935474e-10,3.205253163875905e-8,0.1606071316764994],"alpha":[14.417716494359961,27.65105681205109,16.814790398400167,29.15475808106008,14.617809192474741,19.738258696158532,23.657816213438583,10.941094683827671,24.69317884379838,23.347199213129425,20.887044513511963,16.696124699102764,22.537850715063655,27.367664449729165,28.32225111163092,12.178644163487347,25.118001251467344,15.098707996491596,16.335736933704702,26.855213011976417,15.52885118314041,10.462593284008932,22.198149903780845,14.131172360095881,25.945358788399933,29.160235539267273,25.681735635553714,13.414666697384273,16.400275461571905,10.991521964869397,29.98797149866446,18.81858723220767,11.37221197493047,17.524598290222,14.982499498475693,12.61612092177577,11.491067217898149,16.4731221740757,22.735210353501483,20.796778257245183,21.853889414594864,18.61855639036307,28.007359128142358,22.26403607689903,18.01506805126553,29.46198031050717,22.41327884859842,16.08300264359913,24.293635518280997,22.432334587297163,16.75974307896038,16.161775974119898,11.040894640920648,19.21563016025569,10.981220270698472,23.59510097975793,13.121184185955496,11.41768123243227,28.992740811805703,13.955295247160366,27.733744870852828,27.587519934770125,23.690304129748647,28.470625754535774,24.022893543103123,26.823982268348573,18.1838951570179,25.327238987764183,18.845224193834937,15.118515661374751,18.00997711892898,16.725716266288025,15.190051300140528,11.543407751517506,13.70175307843207,10.55026528793682,17.520996285636436,13.893051844518567,18.825916239603764,25.203680747171617,11.539631459088842,15.899466318929925,13.287340283581738,12.723339959844356,20.709304836706647,23.63360598426779,23.04760168885016,10.281306686255043,10.364853302801485,10.895959545176432,25.243250268011835,16.609899462049476,18.802910216489405,22.340095373545953,11.125407462105233,19.720500592448104,19.03577107558904,27.844063941541066,18.730651611696317,17.07270719884738,18.159295294840625,12.438100159743989,16.01907785743681,29.73689418621145,26.197551008106327,23.62748180599968,22.472152687074328,22.52859604791126,28.885083142079232,22.58368958017522,11.058480563414719,26.557485842082983,10.494883655013583,16.11225979622855,22.562768062223483,19.846445485376414,28.795363905522894,23.238943712075656,18.741585453903934,27.775259878638543,15.437380261122101,28.72034499038586,16.753363976192013,15.29235743053933,16.473997557199823,24.90189215677027,10.081897703021578,10.974384470442375,22.82130570158869,19.74174537905798,19.632151247049258,23.042322139815568,14.647847239932688,25.236398886463945,23.656596882947962,17.806921548647964,17.178056372709275,24.661077817605204,13.703642953336272,16.41312478401156,25.62017900166662,23.382683195528763,11.031560286346895,29.902137398795887,12.452082541841136,24.245327796001177,28.11419308553176,24.10519625443673,28.35309123183107,25.309583730511342,23.340582507518967,22.47610570595539,10.004835915179239,21.933107129457255,14.060585499472298,11.445381014826204,18.63155441017575,16.69064104040709,12.681486860480163,24.144550449874696,26.981547552577354,23.369850584721675,23.751369529410724,29.986104082034878,13.72251443942325,18.799120115998697,27.24752615259485,14.033079529527468,10.721531015442745,21.85059604270561,21.04865764436402,21.839581767563597,22.255909752272395,10.37857537563685,16.615294922681233,26.361305091383436,12.384124314919864,20.76901887483107,18.779043002098245,11.58744957216166,15.736402521471767,21.090468956056267,15.533788183710303,24.72203879245496,19.014978976124517,20.184670381453024,19.830636256829447,14.264213964911656,15.445049009554834,29.418806026647033,22.926887170342518,26.27921960482979,19.858448596115363,24.340887396290167,10.627019282255947,24.2643231075093,19.410270516472824,19.439796096894394,10.914825274129964,10.19997193949171,27.242972947472822,29.0715085940421,18.432977175946796,29.01700804140528,22.632411260584178,28.302252251594453,18.095276564317693,21.48691052293472,28.272240785888265,26.725021935177907,24.07562951872654,13.137582964183615,26.33969069373091,13.595963390964085,29.932141629270944,13.348834015756093,15.744563719407235,16.000930229895005,12.3355075806106,25.264276773400137,24.44556783398515,22.73843410174742,12.681860430674448,21.49121141675692,18.400615006902655,28.478802612609165,27.522277274669825,25.133266607672233,29.11743924777438,21.10160807116966,13.363743192726902,27.231873739579925,17.428582118661872,20.69977973402387,25.637364992465255,17.69774794559821,13.221295222176707,15.28715081592658,14.467373036163721,29.098360301434973,19.242013159126884,27.80251788948729,28.86383866954164,18.59053228162881,27.17045890864183,22.950184566984298,28.174093780881194,11.299166881483824,11.489104944480912,12.413296537333412,20.49416824132568,21.503089037087104,23.671681558755285,26.102310292493364,11.383031272937938,28.134612539018015,13.41299958678674,22.599923382400327,29.094372647527354,22.381168531503075,29.099711792734126,21.42632067946488,19.610948925056878,11.967665824147694,27.79486047655872,22.892295095221943,20.99859580404512,13.192395196147167,19.98498652891002,23.389296505828856,13.385464242604922,29.317720772410905,15.91918271158332,13.71174815994221,27.389836969703573,28.920537010719936,21.628138314095608,18.20070627298401,28.235861256049187,20.20479757455591,20.812280442064512,19.593910942121035,22.121757967277226,14.85425900621574,29.843453555952742,14.84636472493436,11.984988972390811,28.835606864647264,29.91860739802273,12.513389552132681,18.937275557060683,27.648035406541943,19.834520151087442,13.927704627832815,25.40920527894139,27.047300302419206,18.84851143121473,26.638099174776602,11.0554214578237,20.18675474541766,11.724965754761456,17.897843473089566,18.819958115139343,24.35386974121794,19.607244761907765,24.414424924982363,19.88095707702182,21.634118363459834,13.845087659780276,11.298415727046036,20.37999489592392,13.485587798476608,12.937595960644899,13.889889255045258,13.988229576303413,17.436953321038352,10.734649634470689,29.339607802494957,10.474951391111219,10.731386388423086,11.250212487195945,14.51660729330949,14.043795328090711,27.958371423932164,21.1878040966695,17.934792945505166,12.729962762544918,25.409447255358124,18.816546662018062,27.54776607098595,19.05493066350467,21.855060092820043,17.41372979652764,28.869378583790418,21.134564695353426,22.407650963900675,23.930354293753243,13.093635400523166,28.966011640305645,27.346815260775994,12.605268079469575,10.056002146759223,27.523293213843274,14.957662888306249,29.469515537484085,21.515547026808125,25.624248372440462,18.734763436450525,20.58666395578919,27.47222650710765,24.17053315789659,29.3107855882624,25.9939746495043,23.04114245718665,14.728324771782244,18.6213733213645,25.78822073218189,20.64302661296905,16.519551719293347,16.347803997827086,25.309592129977148,11.092511443073615,22.464371568450268,18.087482916550208,21.543281627608447,21.776224108448456,19.645479629282757,16.79149219509014,10.645933298608279,13.649033467774698,13.997647401917511,10.003357571061514,19.82366701491629,14.239457592050622,15.337384536493243,12.35998530737923,27.449096125770737,11.125196336712913,20.541379279114228,28.0526467199978,11.228748754656696,14.967861526630465,14.346759153953453,25.302761725866066,15.322858986518373,16.126787370199118,29.919551150734286,21.825221792193112,20.005466519591423,26.208626017750927,29.682353759730475,28.957440894814326,24.79360538726278,25.867349385295427,10.038699916312819,21.272715820251086,19.75915497153125,20.53228014479511,27.44435524896926,20.351466356504982,25.569145392900616,25.84786392750971,13.969878789667929,21.94660505719197,23.13649494812492,23.33513786504941,11.809498915502674,27.232058735878596,26.468677525415053,28.740202830320992,27.49265115243852,22.80203228816671,13.740249892076225,25.59336156488846,26.38679366267942,26.171237685154935,23.057134434194097,23.093002729227248,28.558707944486727,23.26816020197761,20.96791146740439,23.43237917201728,23.187538279301535,28.350746552925358,26.45537546216076,21.581448025990948,16.047121535029163,17.649525348909577,21.076750428149293,10.369913489431895,20.98566264431755,10.816224207955912,12.448978058767066,28.047253148329293,15.608998322083444,16.816705228252,13.828114282631997,12.308537857760138,17.69751424981952,22.89867599822104,12.004549892902471,27.359600460404092,26.161483169461274,11.036741484035012,26.2198950801753,25.6052158534264,16.469587096505258,21.618732331946617,28.686809025925943,12.166296618801805,29.28382644017737,26.643379126843545,18.237726452994835,23.805544447483943,13.626871431289285,25.736869410244413,17.274644213238993,23.231691823222636,11.85831551392666,29.68405620066609,26.85329956147158,14.612856365977084,19.19261770240181,10.954161535518017,14.780949482562873,26.805610095621205,12.594771850652155,29.30884638881245,23.468602313668438,23.05577170128691,25.66910554894628,17.347936080796416,24.110246283134195,18.12109030787785,12.1906181013847,27.488745819618075,25.695944016748953,26.78478266366394,12.901945054462693,24.982644748146356,18.432809795341683,11.129901697123245,15.64658127962372,10.747920073431754,20.465052272335726,22.187534963200495,22.39088110224912,15.016020087032862,19.726159944635953,29.060188231164634,25.60463226148809,10.53563984918219,20.50668111057565,23.43750070844844,17.281316278459137,28.426093398205975,26.29725402473827,29.46353967736526,20.999387039829923,12.479880271563708,25.86710818378363,18.645244230038386,19.11319380093982,20.273803104070964,12.819839293051466,26.802191600418723,24.763655401160072,15.082080926264133,21.94813269223687,12.12743056240929,23.284313965750442,22.704407162072663,19.929547671708114,19.312744400309253,29.55827913438498,17.18073925065669,14.744729831003323,23.999888379675852,19.691650028286777,29.04741309150893,25.414053907171787,26.716372516639556,12.768186214569536,23.053277907422686,10.804278703680424,18.772854663374865,24.127441495886263,13.063786987068301,28.084894289840996,20.883855250656282,29.98066693014438,26.358872406868016,22.523920047484438,15.447248614738477,13.936616773638848,24.721072658586365,10.077754205775854,18.979408421931243,23.407867951191363,25.393824681254266,13.543937605266576,22.328573206476207,24.21285833181726,12.811014120591345,11.59240803357672,15.118596711675863,20.615790816497608,15.115899794123791,24.447595244026047,27.666560745316136,15.90789545839737,15.338140230058034,24.614433546839937,28.65871628643474,28.851956075831097,17.390467345648567,13.256296328787144,20.28265991780893,11.642260141943499,12.014682123653543,14.70357229179626,26.912934638389338,15.837532750302895,13.699315996106352,19.704879974424315,24.949403909289444,10.195086472085197,23.814923411380803,10.01269093541405,13.476903158195155,19.9707410556101,20.84871979629234,14.865702353283705,13.323676710573839,14.331970329860608,26.52428137640903,22.513830437974516,22.86071330799787,15.486552721472373,26.322409628431785,13.64535806626671,16.76252152309499,22.496380641152104,26.291328414566376,21.850720904176125,15.718066558126726,29.682141853505787,28.461444762836912,29.56081995506093,29.776741128021087,23.298420510465082,13.892507114545092,29.986458699967567,11.69754421544301,19.065208408171557,27.183411454371345,14.478661829947743,12.821455461716091,21.671665566902938,23.164274750528968,25.420590363861347,27.56648170130901,22.05808470116516,23.983148545760592,21.773006242684097,19.84290965397934,19.086796556251446,23.47483336872412,23.120043835834032,13.471740619646821,26.873170663326093,26.93746472477844,19.00868114040804,13.15222759495442,12.829405518515905,22.673692814623955,24.601777809323618,26.94105630557441,16.202434409918858,26.927369017697387,15.374667769331714,16.8396201161617,16.523024108836317,10.484651448459141,22.531489052812418,16.68842929921353,13.264557791949185,13.618323114001992,15.69825896880638,18.923652850245603,10.779677558151374,23.694629510548296,21.456470034105834,15.412220317052281,18.08201855139125,13.604514816330603,20.83578666627295,13.261089510171802,25.57377983309149,28.00722078610399,26.04667216762657,18.538758798349598,12.211146422595025,25.63813940515015,25.76688556679673,16.572307789014626,11.784523089347815,17.52419981206622,16.04935984709536,27.80351104759272,14.834469405320494,24.544579355650523,10.406679568626274,12.327009793629973,27.19549052479941,24.69195419890739,24.792473741426583,13.008127876518891,22.978677573539198,12.605542307481263,15.276497980513888,21.342059158067958,17.83971623194757,24.79293218242393,23.610833095483535,12.555940710457868,17.9009769784249,16.72129552307172,10.116496544848466,28.03212111918561,24.142373309670763,13.111531850061633,28.308710919827146,20.099460540476333,10.985618128197379,18.121794538470123,19.97415789100492,22.05485227948384,25.415895334582302,16.582681412011553,28.58228934338544,22.785982833988477,19.305780129552655,26.479896478810726,29.579742463336313,12.133527651250882,19.72641811159615,17.711030147200205,11.927863235575007,12.867172118197407,10.036667301708642,27.921191287765406,17.608674599938794,28.571408030845355,16.175940041906514,22.458293659726223,28.780703796543847,24.467387905686632,27.33373322569944,21.25070163546623,23.46899970900672,10.146299878809803,18.971358156435304,11.197866112606212,16.18788964895627,14.965384646329355,24.5185148886952,24.650577193320395,19.58717224636957,10.935810985863377,25.397521821715042,16.94774393190635,14.919557182544256,19.369526538566653,23.214163484806512,28.559178067055846,29.574175238761036,21.645735727494056,20.857839457788682,16.786685337793212,21.86751735703771,28.588077960272166,15.988398486170148,20.56307866070618,20.39772884585076,19.163130968851373,14.803189723117818,14.542547153348613,29.854611426180377,24.276278007629145,10.69203889172364,24.57200458104434,23.128549957050552,28.629724087060396,26.007963658766936,25.17579460342246,12.815048775315176,19.70683731623961,10.178144577783259,24.54837110330866,20.02509874987851,21.5675689506983,17.788729653032775,11.258427449087476,17.25875010666773,16.001745308817526,22.85513489970734,20.789121531300797,24.677765265665226,11.292895729554203,22.074875526812075,17.654506255712988,18.12638647061489,18.516941671887828,10.60091313107816,20.455590546571006,17.266601565918954,10.941284656018336,25.67960053180942,28.14410704308342,21.5118962556846,28.08698906698126,19.07088651994041,22.653296456224766,29.215697994161932,25.218331189469904,18.12844225752044,16.25637652104304,15.047314902143189,11.182112296803686,29.06144464781605,27.140650427817864,14.340095243708944,25.620968791160035,16.4004517217418,22.84186913310215,15.788833711084166,26.504879406234725,29.924006139598607,13.346744183600627,13.154762139194332,28.96986763194456,19.701910400786318,20.461612679809697,10.9359917041035,22.090758493262037,23.16198292283836,28.54906784893304,15.407624095022928,24.343981968494383,17.002383175196417,14.219277413042128,10.207220461114463,13.531819212555533,11.629029276878224,28.109056892614323,19.72437565040937,10.672673590507934,20.216265309991037,12.2173224125908,18.711535624224155,22.79313735290924,13.466954927915381,26.141542246941288,29.55660743147841,13.974709059934805,12.854654307120503,27.97582355937727,19.77951066668945,22.724226185423625,18.23372608187679,20.382989335485785,10.990698692074194,10.857319811820059,28.864767476062546,27.102124685831825,22.894188931821784,22.839003336363124,26.234930940915426,19.848051743398262,23.06619259241826,27.3778264486941,12.295067954578244,16.510076817811957,27.396226041888387,19.125932691268996,18.272934897532235,17.57808070793185,28.22059082434505,23.300761026408757,17.733499804078107,26.35223869232646,27.014427628581622,29.4742370757547,14.89851029484965,20.399740616575826,19.447577964397667,15.519303448463862,13.59019569820148,11.950521381017495,20.80531686371058,22.630831010567903,21.652862978789763,11.902029210930447,14.194297347759651,29.166409473129875,13.625316902018243,13.94808864208375,19.034323508935557,21.04766240740945,10.532963669017711,15.868653723300437,10.711383719602242,21.216381057572416,29.448734853251146,22.252770377043674,28.65280566715978,28.449185411526287,19.457374352332973,10.337657696459384,24.999519415481192,29.928552359069176,13.94199259235152,14.623759470302833,16.06897106773271,16.743436779965858,21.06170471115904,16.086182548246178,23.647659140309297,27.81612466563078,13.195504094747772,15.908009558199815,24.158566313084656,23.762653152760986,13.397563247226394,19.780660157882245,28.8859226730592,13.273488510172808,28.43846574464546,16.0548210276254,20.23839414243179,12.196213787435326,21.382986842718175,29.699860174107716,20.874152202175434,10.33814148066452,27.187222094386545,17.403466659150695,10.769208514144069,25.634612001139494,26.787260278927075,24.800287441682535,19.288417223485943,24.618081620500497,24.365128795137025,23.2510749077043,18.649607811550286,11.507249377763626,11.325103809376005,10.043419038843307,27.036622110369844,13.10728227386559,17.267137587525564,12.223345004137318,18.87335961994331,29.099927913922127,22.617657195418342,14.811006070695335,29.58948584162532,11.67701913893505,14.327426701191058,26.17016401938919,28.597896187808928,11.685668342417493,16.69649273687998,19.806906385643067,20.912446833369856,22.133221706007955,15.180113425707304,24.48652831790822,14.322822871175402,19.151602846995637,17.37041409918624,27.018873193137217,21.6715027721068,12.754813225207261,18.911329306477924,21.40829244595277,27.219170846574592,20.24021355870753,10.961086568532759,18.111782663524423,15.558182826669139,12.14850523196828,16.40392496940731,10.902701439319852,27.740564532076334,27.685455182590776,17.802365927176517,28.995764410559545,24.40290346504232,25.51672207807686,20.743511004955053,12.71681653010463,26.50239553356525,10.796946332683067,19.554596313493505,11.499764751141104,13.420738111713106,11.930937987920455,19.496725225981123,15.824463572217017,25.497511475174477,27.20594074979263,13.859106611880847,25.974826564455796,19.604154717810975,11.688162606508122,14.512198187223003,28.734880564107623,26.88068949389742,11.512523855163948,18.130935430342063,16.587964781013447,19.27132691167143,15.943067339762216,10.691538875631569,18.317936841037053,26.08343172076781,29.681320430960536,19.797317195171868,25.126546995262764,25.55303622093357,15.527721338358251,27.21783200110655,21.942539790149457,16.744944876301684,14.003490547323683,19.347338411272446,27.86988027638156,26.254091365694414,25.839932249372715,29.946490885432183,12.033697227559523,19.596732876720395,23.27794987237857,23.698256332933777,27.470962487626775,19.88600337247313,27.09181171713274,18.98200954828496,24.345192972784556,29.53858102959356,25.6846404760207,18.559952433919726,23.001286078915637,14.422923130099822,16.8470175023128,16.91329452636638,25.557444832975552],"x":[0.5294236430311721,0.12201550946661377,0.8761855446529505,0.827960410350012,0.6436173900899225,0.8545053028549892,0.180340064888052,0.51286066003513,0.6343791887197718,0.020482091147532966,0.12767570665357453,0.9225193951652517,0.28780162206435667,0.18997750882882314,0.48287811750389587,0.8660672471436843,0.2101145010648191,0.21492880004364356,0.2033154936739685,0.4000358466294329,0.20306803139023244,0.49247073118059825,0.678703837746254,0.7163644304680081,0.11782675052973968,0.7835341951177086,0.672416020072101,0.04282832457323882,0.8881044327486087,0.09122150838387388,0.043811185552051324,0.8236521965427799,0.6952590160529597,0.8962518704196918,0.55063715054376,0.40620586086918964,0.6138650073844811,0.6212831416723781,0.3950109586480226,0.3506884595787698,0.1335190779728146,0.5456688442577546,0.41872712815060376,0.036272279215000536,0.6949601322286718,0.26199688504455354,0.7810177711650166,0.5251033756274417,0.03562934073328394,0.06912805752775286,0.24713469136188415,0.022553340598859162,0.885872931664001,0.5872061185917863,0.2638302259670138,0.5822867718973865,0.7601753374717608,0.7719321644994006,0.032824719031247396,0.898369077840268,0.20061744824833383,0.9424253976192236,0.9390508660499999,0.9877894598105363,0.13822802225014574,0.6878069485894356,0.023602084001117074,0.04877221364274931,0.560966194992802,0.7399840444075725,0.00788813002054467,0.6263005238614843,0.00547374586658278,0.45630903728708216,0.25298066774816763,0.690421062516362,0.08497508433578815,0.18882424614865045,0.2923022433387039,0.8405438512843129,0.8657400852220449,0.9432237730655084,0.20567226205765587,0.8782362410394791,0.9971204451347042,0.763392857664742,0.49962536698596094,0.596450827178431,0.2925774218234234,0.1872364607510706,0.5454933820291292,0.9403677454412529,0.16544378072004662,0.9125419598953901,0.16094015762410363,0.507814048995167,0.31032997542497,0.28333538523010016,0.7452795063875222,0.06003969164058387,0.33711069861195986,0.3347440261040848,0.6712989340953315,0.14179385478769446,0.8119910739078262,0.3653570259106771,0.2985272243887753,0.09574196784201505,0.7116986003728138,0.24145833233691705,0.20341661722973647,0.278774252243704,0.5156294628406544,0.03637120459584131,0.3065433431117244,0.2347654288454386,0.5512284462009565,0.5965030620707736,0.9008917019571256,0.9773119152859053,0.21095152717293653,0.8124934546971219,0.23931043910712568,0.767421331819893,0.26396808779489467,0.4854969593892111,0.32550871008168913,0.5012345694401519,0.10907434908702318,0.788735265412321,0.11812907483959467,0.7953127489322087,0.6941450148435875,0.7415172468147173,0.05902025701472846,0.6014255875689936,0.9806881206599181,0.9364503166172584,0.44970020744581896,0.6392636026059937,0.7346247908723131,0.18772794009160854,0.1627203600568614,0.1979702308467417,0.016576998553623268,0.7943236512937759,0.9918566378690599,0.8162984777241653,0.7097696950930583,0.7418675247238469,0.11358499695082758,0.189174490047042,0.2121366786096499,0.6381489845900348,0.9474782591918893,0.9771284628436736,0.9363013121366226,0.6630404018076577,0.13006582575870707,0.33544967294502603,0.42039176735863104,0.5561071033874501,0.6972302277206508,0.7538523983059109,0.8861201557303013,0.7892508681758885,0.14412361217537062,0.4604446817163812,0.6786297149487759,0.8142173586692922,0.5596884171507008,0.4065209591308334,0.6964991576260646,0.4678795175147372,0.6906481892522245,0.8986433492529025,0.03545202119947266,0.5037161111674333,0.12594960927870047,0.5594809196240877,0.2389657058635546,0.6804629267117253,0.2072091646779246,0.8363931235389179,0.7496123175204938,0.6564631420962106,0.5294215052236064,0.5873328708326946,0.18052870670836074,0.9978540745845401,0.9696689439244337,0.3411991591359287,0.6162142774386754,0.14237775589049373,0.3125813558611379,0.2695959467495106,0.2487655482940665,0.921117838529123,0.3982754632115464,0.7239157121019162,0.5024629004551298,0.711809373581519,0.481369880568844,0.08379538019100607,0.998892972329394,0.2860824690947299,0.6071607092864362,0.7977490516371,0.24927489005340808,0.9134715739776633,0.6750453085808026,0.2876290008965432,0.49984108558302554,0.5516339485501651,0.0747821994256972,0.2471855365037261,0.00882611020465851,0.03510771034667126,0.4678107908757585,0.6017886873372564,0.40498151910310476,0.20039702407799576,0.4041563161553199,0.7104922531140612,0.7341113968424278,0.6756086630229508,0.9722890142859113,0.595471839037987,0.9443638862082429,0.24510089715958738,0.45870448963650867,0.508117528499251,0.08523588171221363,0.7956558696406608,0.8431807617423159,0.383420374738497,0.278025504075905,0.4376230006939412,0.7205070353368093,0.050449240620637825,0.9141278769007835,0.2167222255621255,0.6233620489196883,0.5307016556621698,0.08512180402770664,0.6929425337614641,0.19683491964136302,0.4838189621618465,0.6930902038950413,0.651186675554343,0.4758702308673344,0.6614559245761864,0.34601847738165636,0.7937537328279827,0.7277323201652564,0.3634199154692497,0.19643246237540568,0.8140243514049421,0.3940666238735382,0.09728119415549763,0.062486410884246,0.7592485904645456,0.4294394069086689,0.869922295386895,0.2824559213476321,0.9811503508491861,0.5071676475702758,0.23736373346783024,0.6810462408130162,0.7376764993402736,0.5222890697257803,0.6894001957749185,0.1982406271920496,0.3401304182482183,0.736050760893834,0.2383668274502091,0.9513600220552421,0.5566771287715588,0.45487582889635103,0.009392162800932136,0.9891194811510224,0.8392217436267699,0.5188567307798275,0.14527398067850306,0.7400870501654322,0.5156416988649026,0.4383255563010562,0.6713471061628142,0.16271221117091006,0.4781215811158819,0.755127797110817,0.17079344250228767,0.3800465261609529,0.8647351317195253,0.8406926424575818,0.967354377787423,0.33378707700041077,0.12016470840054505,0.40484275371038647,0.6012124280306805,0.5976508671279093,0.627323676894117,0.5573203848990733,0.7112484102459522,0.06256451349231118,0.5968371442766105,0.24683030526652017,0.7102417077551293,0.4281880341400195,0.4157158528346734,0.706439052362001,0.1409590967373835,0.06668332555784495,0.7459900211280714,0.46786947191701156,0.3646653501588064,0.9854289126333895,0.7430312791805203,0.3146036114807267,0.6699979639863105,0.783115009642317,0.6136333352218937,0.21702694866093952,0.43041989148092274,0.3922362557863761,0.3230056004292521,0.09374754488490789,0.2719857985215206,0.25219972111943023,0.9669636731171483,0.34338560954626196,0.8103786902015964,0.4454267643478933,0.7710595785832854,0.15274864165348312,0.2800848926936441,0.09961946561701818,0.49550668055548264,0.9294981816693333,0.05879548507924626,0.02801884858293069,0.3586438507485801,0.726932038972468,0.3822214532317869,0.3944509172841075,0.9620077927782076,0.9380043880525883,0.24622900888467836,0.48339141283532716,0.7845588398615766,0.007553185032190823,0.05219472908529332,0.21057395946830137,0.5633886373401782,0.49706788710985217,0.5494033472960167,0.5971732923686537,0.5532762835256337,0.6206501277125762,0.9922315493009424,0.7093737197033645,0.6626346656840734,0.7911729962557399,0.589550219232511,0.7230815932300569,0.6739447162957644,0.914340063964628,0.8367390430014421,0.5343483865133327,0.7868680868579943,0.7698778069051826,0.9539786409980511,0.816224423270669,0.10289152571318594,0.9319469865270444,0.8962880576299965,0.44208738353107857,0.10325099088304035,0.1088537693406566,0.32761236495630075,0.6524663193403122,0.19687279446330552,0.45181164416398256,0.3104963607149578,0.8162767061562197,0.9887422628942435,0.8957166671269969,0.5301248250506183,0.10149634292748688,0.7750319779274661,0.03295866504475509,0.9469383061104673,0.2868015950638634,0.008685157285817535,0.7051576993882074,0.4025134415992566,0.14012515703705408,0.8129291779668908,0.49513551216141005,0.7671084511925281,0.6501760797534206,0.9680195750327898,0.057229240617567845,0.36023801535902655,0.3696249555600841,0.8276392655070459,0.6067577162884772,0.08594572406283385,0.04315171151622765,0.9961981527618575,0.07724515283354805,0.19692914149136764,0.8603293319894405,0.6646551248447281,0.09974066979073215,0.8044101159276338,0.5634214498336614,0.1519748449655689,0.2965620062120742,0.7179589699541133,0.803090359491613,0.09653127217088486,0.12437282376854553,0.727001819157689,0.33619059918699334,0.8264499621095824,0.3736463357966697,0.7678913944479402,0.25379645090575687,0.2878094498895798,0.5133183406124247,0.07938652581192418,0.7682344453949457,0.29311822685532807,0.5313875929172505,0.5556716915549667,0.3260818714885916,0.32739450605459886,0.2957532190972503,0.2470480036545193,0.8277769277552487,0.7704699792128693,0.24770133652192694,0.379649224387657,0.633210668804975,0.16117309874200347,0.30670062352203686,0.9703553792398938,0.6104964754093636,0.27603648414006376,0.7733813620431047,0.5627984708247558,0.17944717810992405,0.11326551204963597,0.9537171035162502,0.9269521749289755,0.1716660210347971,0.5311777577070291,0.034092342879383564,0.10821532658578303,0.5399968610258121,0.2911238777224703,0.4996023018427125,0.42191943188318803,0.03077036893943408,0.02117219711335694,0.9842802831693249,0.1707593748737566,0.3933052452270398,0.1636145171130976,0.9559213318515822,0.6946875458125745,0.5624263789495252,0.845662582686908,0.10335397997731999,0.5629556615207216,0.9365563080239869,0.9092655444918363,0.9259106187625803,0.88732051442314,0.8309064699775732,0.7345615721870895,0.9968182182005612,0.4570999158481177,0.4952971062340523,0.01510078162558326,0.31293082371390946,0.218424949783661,0.5426340749249738,0.694915131476235,0.6938974819536368,0.9662750135730849,0.3913772684984935,0.1871229363446416,0.4114336666847995,0.7420097860790076,0.11668046085143713,0.33808231370976793,0.47830152352951116,0.6152283633204394,0.4350036942060913,0.5179547738653896,0.7184412674807232,0.4661747841926085,0.7971637821434974,0.33441781635018364,0.06744325019582975,0.9416543655315375,0.5979282718059313,0.8205710538193067,0.29680637135708476,0.39603517241370767,0.8073314578624893,0.41409335532039515,0.24148713594193194,0.5613708244640154,0.8906870171821286,0.5405721030788124,0.16258058487959381,0.22928594179393835,0.23729520993175202,0.6405940953367015,0.559894462215055,0.6889236952294742,0.7832008007446658,0.9012150868812034,0.687524817061459,0.8786400866432611,0.18971927917735432,0.05687279664760014,0.250161508641745,0.5561346871364243,0.06447574994340433,0.3994881813174904,0.016768165865496343,0.19969952980245576,0.204904215852453,0.263759248838616,0.10167848683467584,0.6050821815531358,0.9707593216455301,0.8514015759160762,0.336067418399304,0.5439359106504382,0.6400219708459964,0.5142311502183787,0.11067825183749536,0.6369422774798088,0.5969313156995415,0.9705195137691955,0.5390380367407162,0.8317079870222943,0.6982966168942342,0.33813403431138034,0.14558095381950054,0.7953534665591575,0.053729113103786696,0.929198655680632,0.6909839295681366,0.7715588326865852,0.5951045409183489,0.5327754108090965,0.420503383651772,0.940101004651908,0.23823405828825073,0.0376117429250975,0.482377850544365,0.019178049004452857,0.6452936973459198,0.022822097770916594,0.9679675151199518,0.9985093994576348,0.04403407915151081,0.7586337047237013,0.730462813485034,0.8271215878604694,0.678584624480256,0.4216352656950102,0.25894941744956657,0.3343242853906172,0.5764282599822645,0.24313114475276,0.6900861192278032,0.31269015416696044,0.5652100904232222,0.25316489167664913,0.4368021343714388,0.6357321831521663,0.364396767371135,0.7595014285477355,0.6277932139234921,0.09901351369536693,0.19278459186650587,0.9249516894690417,0.27938803433901604,0.31029777326760954,0.17328163335863045,0.16851922118816542,0.1503946989121685,0.7921067978451257,0.8445643286535978,0.8422241318980321,0.47405378392873576,0.9356035281515906,0.09781001043094717,0.9996288040410852,0.9431166779344893,0.18436511346316875,0.6404058987270556,0.4273419808472032,0.435167033796497,0.9192596687215653,0.6718958027692215,0.8773502370840922,0.8540422265191807,0.3991261938318791,0.6014542555932278,0.9994287074349655,0.7804788588014815,0.10246551607672849,0.3200948292003174,0.7512083694219396,0.5609103955356542,0.7423426839914604,0.7822884453313947,0.3351029804411294,0.17442449887675093,0.7304551110389899,0.8120562640525453,0.3688990384491819,0.4668417949591088,0.8993980341778778,0.3328267594933856,0.44519410945331583,0.9258329332343473,0.1348936836959609,0.4375980713670653,0.015500992971684724,0.6243195667244463,0.06943556096488068,0.8185234937970389,0.7037982261749922,0.40986294266233325,0.6457924369498713,0.8983867656616653,0.6209187167189294,0.5520790902340968,0.44196705790661817,0.4681193908726762,0.9404506385348717,0.9668241970310767,0.9807731222321168,0.5061543019737058,0.7284160215843389,0.9325209359208522,0.40738200172706285,0.11338333912098975,0.589575503429338,0.3621226761221046,0.8966844646454264,0.1508473953580678,0.19526943306148192,0.20530940583727153,0.5346112872876487,0.29824652528487916,0.6872521417506285,0.029606227904503735,0.48590186375095734,0.15811139338129165,0.8696816698266479,0.470029150274742,0.29712765934670404,0.8510265747828178,0.9018274124219512,0.5341813475872907,0.6923138112227405,0.21477245242009246,0.5410521059244773,0.5066606315822741,0.29171062855711627,0.5047913801482404,0.09570444623432128,0.9306799825958536,0.6006427518047281,0.31255563404096653,0.21364273741242057,0.5200631779381952,0.24264160608106877,0.47669845523201704,0.7554296499823077,0.037448021841556045,0.7030687953552321,0.22521652374054635,0.5480983105445809,0.9069021233808925,0.7357557935149737,0.6412314515363526,0.44118567768767103,0.9299350883076232,0.005154992005144354,0.5713711340012901,0.00247151958725933,0.10762759383964982,0.5643601883550116,0.5334629440877063,0.5461112246279651,0.15854053887774122,0.6269245213635126,0.8611108409807862,0.7205605569127211,0.9971543869564641,0.9243105529681057,0.0375321968098552,0.8719076512298976,0.17880396162312628,0.21812811382313213,0.9781173039125577,0.7016512907218362,0.227990336588201,0.4803216954284073,0.9267520792067359,0.11530656675547091,0.6153692170522178,0.696320378981057,0.35077577190267917,0.6547488414260021,0.8932536872682819,0.8569414007710541,0.31983532291972905,0.08273268142376344,0.8775581151998857,0.22208050871826157,0.85158365640465,0.5994951212108741,0.5010339249944462,0.34293709342969847,0.9601759688214979,0.942739635601771,0.5750410549529605,0.11752320264483451,0.05914062703635392,0.06966051671565543,0.8853685392785762,0.35872602644175533,0.9824386326184391,0.195302442503958,0.0446337424067027,0.20018520548164287,0.001878105558145382,0.7078204166048188,0.06998087508215445,0.03980037953912707,0.1482210405167057,0.805573600853273,0.7930184093941819,0.8768886143999697,0.9202819155911706,0.2541036752327772,0.6882514449305286,0.5856196753588443,0.9351853735445299,0.011856163950582532,0.5953229846323371,0.11219780898699905,0.8285206525628555,0.46153879065916614,0.05046970625479141,0.5642531119199825,0.4500490217729458,0.08732382362997049,0.0010059888552986784,0.3233374119783592,0.1456070884309173,0.48197953090926915,0.593159090638123,0.5052763721579308,0.3233048552066964,0.8299441154138598,0.9349665879679985,0.632503508414912,0.14068125138980725,0.5208268039889967,0.06325482607172339,0.2410851983525737,0.8397822480138193,0.4374493053247994,0.33424013845823053,0.440572350411941,0.7618910314292968,0.532479307715197,0.9340418874102994,0.3018271884620023,0.3129396161628659,0.05419073281996489,0.16196615661978275,0.46958191165574426,0.29235063718023624,0.4554546073316825,0.35475007409868264,0.4593294364592002,0.34851223164642486,0.9631333833246094,0.9612224042892918,0.889721840295499,0.011899345885981072,0.4236879197408603,0.35199702376044306,0.9713225208107648,0.20917880425940716,0.32360237514707135,0.2272993579644289,0.9113402324209281,0.8370665622381999,0.41742818945114246,0.2704356848853102,0.9336962723136197,0.27738714846075574,0.3185479286880628,0.6900227095536295,0.15178313384635955,0.1669914648482942,0.9371055556040868,0.8984721588676636,0.463783686257065,0.1426994861097317,0.4061296987574272,0.9179644262087836,0.5815789776834739,0.8266672260283794,0.8050496229036528,0.6981249358719441,0.9346165152044004,0.9285809205646993,0.8116241739305583,0.4888284406444543,0.06953601151643896,0.764051679525227,0.9064472279263154,0.45026203845394686,0.8380485709604044,0.8031315317480143,0.4118917203788406,0.3950780312574591,0.7645017038728767,0.5101080833300311,0.9841578719048887,0.3030418821262595,0.8833045899948733,0.17711809030749048,0.5768002022361549,0.001642116130413207,0.493989458611118,0.08736028253509143,0.24117742832723854,0.20834865277406656,0.41986798558916405,0.603159557958304,0.8397947119624769,0.8520838570820046,0.00015252942167953698,0.39437643221330076,0.6323024012111633,0.5664370404818182,0.3226160413374273,0.6796594045084623,0.9425990459536868,0.3281748798328228,0.4487043780829356,0.4573852738881494,0.12875466486919485,0.20597299177249484,0.6388547053231146,0.894325161138884,0.37331862730038123,0.07498116888626583,0.6562222028159095,0.2944417181395875,0.03569344911028516,0.30757713633491135,0.5362933599731066,0.8149374994915108,0.6374937504979168,0.17017604593902091,0.43044510926994795,0.798525550072535,0.3348659209326763,0.7453367333995833,0.9857071193642251,0.535220255231968,0.9194139209963592,0.12472074062685157,0.7400358214633223,0.4748617702050484,0.2721290199472455,0.6122169431841884,0.332995245649752,0.09554235902140595,0.6496667020705682,0.41702577159246257,0.8710710089275462,0.6722129434497983,0.11313570170521459,0.08269306637152374,0.3589802138707179,0.8917108755346403,0.005243793167877264,0.4164854429818823,0.8235256826710498,0.24711301362868165,0.4033680438134464,0.23890010138532736,0.343711868814214,0.2354064501778521,0.3595342841160747,0.44682886719772585,0.665912096189851,0.016032157350147402,0.3976516310807485,0.5852722595119257,0.6336852270265252,0.32053528307280477,0.7681623543370499,0.1689596321608684,0.588504834871358,0.37440164600285786,0.3355783163811008,0.8673120521287003,0.589896558960902,0.4921411456496865,0.49707883881972226,0.6537161916868888,0.9299351877179063,0.821692438808336,0.7485979659224484,0.28226141117783965,0.840399481395619,0.9385692484354216,0.4249276931653867,0.9544751725629215,0.3447384536146496,0.4688302616225253,0.6401725561339855,0.28715505613220427,0.7295137194661185,0.20312013041809251,0.2822070511366117,0.41424715982951654,0.10568069268249203,0.8937747180104358,0.6347301008707693,0.22327505421333882,0.8424598165881547,0.18835739373482774,0.672104885996158,0.47192670201845166,0.5978384844613329,0.4343503063910723,0.09213181182946006,0.322634003715889,0.14018153407119116,0.9775978168031545,0.758205459844161,0.4573406702873348,0.7565032736258066,0.577983518105377,0.5802916322892984,0.9669454105707092,0.04907737305507842,0.42193011063340635,0.2331695188771603,0.36487639046039533,0.42499580982066454,0.8733526755208925,0.7860561793903824,0.6845168878318166,0.49408230531123354,0.5469044683127633,0.6177743638737161,0.021798084698275044,0.886536002887881,0.15353208788207207,0.9316849351416394,0.27194218927717606,0.18870948918687236,0.23043424712922733,0.9857504653681646,0.589025905807119,0.30949133352416025,0.39772117203286994,0.4999657835511646,0.566492146918901,0.6370330794898749,0.9699921889650804,0.07266058001587883,0.3374195666704829,0.7983153117687443,0.46464276093065116,0.10095299380306644,0.13780013975188532,0.6745095806559884],"beta":[15.285757951505477,25.496323051122374,14.721861103039897,20.503024827154327,20.774854753359126,15.353258714246971,11.597412694449414,27.837372124078783,14.23912268412435,18.616919566452026,22.893405365580367,28.624685586160044,27.159899457946675,14.146939324120531,21.606522737767104,18.039634549913192,24.845828617386875,26.55200046262631,23.23861988551423,16.11608470901501,28.167789314604942,23.480332933099334,13.417966525339953,22.143155767747203,21.504908610746472,16.35450996962444,13.711615455597004,21.61418141807757,21.49103514480544,17.678435800655965,21.000395605770862,15.624030624475203,29.061478183780928,21.402197438604663,26.65088716507004,12.252945507017747,29.912157369460814,28.640577817279443,17.407874175679293,18.131154683481366,27.892365132256835,17.30812909744738,12.058695217626912,18.47974161475106,28.065230861452832,17.736285277574343,21.88644772513399,29.91284712603058,29.85369920663672,14.498065898219782,21.3789690848297,29.526856376939612,26.6609990467345,29.78951872143275,13.631789494560751,16.248734817748662,14.609714708086878,20.63434446139761,19.347870120839872,13.596259779152584,25.828637794211836,19.78663788713599,11.685323164751345,17.19361525767337,24.145008191813844,13.041169788589379,29.113033614857066,18.302640236200368,21.37615740289865,14.185611993271866,12.4105990641337,24.43671328655896,16.246286919631686,16.002318646398553,29.496810591024992,19.45083307826039,10.403175071587171,27.749247416875203,11.73405537132339,26.359510660180455,18.44221042075621,29.861635466753302,16.332665508884517,28.74596435056779,17.234690648059278,13.85399027101284,13.196371720991715,23.599268961993918,21.81038980957533,27.597873455251104,13.991273541513248,19.573523340602122,16.255645302812933,19.63538965091274,13.60022337079938,21.32449341978503,12.582436436716362,25.997598294755626,12.249372245619705,14.68607526870727,17.3981519102134,20.994109862505418,19.499713198502448,23.734204283642665,12.17361048826239,10.597566860257771,11.912294339411961,15.842475992464408,26.403924732770424,13.76161072250969,24.202879601504797,25.952599996529045,24.103425039573413,21.12822383373466,20.311036552460855,10.147087566212507,24.143637146698367,27.81067742501864,10.930375997631408,21.630288159899113,22.474727839658666,13.40735386954325,28.762074857874143,24.855686449137046,10.583444199409477,28.070215791558173,26.483861494267508,15.165538882276305,10.76013552746808,19.386048216154602,12.720279061222115,15.136413000875834,29.805889170995275,25.293769263843547,29.653873288396877,12.080993477262169,17.500317565136942,23.413728677219193,10.229930435129875,16.79230540128256,18.235506917403043,10.862630023822177,12.382479195955995,25.138753935563685,18.737539407194777,15.23753705587425,10.648140382505238,11.576790867238241,12.375466157542938,10.709801187878579,22.567746657468817,21.182876963271745,13.061258773624132,19.746865700977278,24.529539026584743,18.60461679219049,23.08050058692016,22.93653850384814,12.21291309312344,25.533522190119584,10.74561195358546,28.917109627335687,18.242009870469435,24.99487268592366,12.655443382457069,12.74591712521865,29.149625655716637,18.44398488687219,27.969204071592433,20.91373791304994,27.235110789665047,22.31044621919619,10.313433707030013,29.667122723338547,16.502292783813182,22.161358124393793,15.491640317134237,14.564730288003162,13.482020024250637,19.078732320359933,26.5073358724834,16.841459937806963,28.725152973434017,24.425251514814992,10.606283556315542,29.652152838335134,17.352289627837894,18.696619374636022,19.939588168057533,14.676756608174752,24.51913332571006,25.11264689860973,20.935586792618874,27.719803083974128,23.320236768883365,10.301795958178568,10.433218863654382,29.471751158344574,20.23205037477059,14.3232709519236,10.572260928067276,26.32535399408718,14.368174265559999,25.076475991158404,27.04877919194682,21.748845474508375,12.794530387079703,10.438397807363181,24.149470535096135,26.55967540120995,25.717596234772238,24.317412685431105,12.598258678604509,20.19197922521473,12.270480132998,24.552216691214444,21.964965048811468,27.907254033090073,17.539274951197513,16.94688915621589,20.475828548976157,11.821776772930317,16.417026305999197,18.02693906556193,10.86452625989609,21.62185256056184,25.10818253334292,16.562765581917187,26.060432585589133,24.871246754803714,12.694658029474315,14.281033754238557,28.02982817002239,28.876156214824043,26.81950087057387,26.621446704787175,18.90632225022081,29.109583925508097,10.186114392440029,23.70525279193824,13.31013772182815,24.049865335921552,21.438472641240075,11.1573151768043,16.492323574658453,19.925308620166714,12.806825553348311,21.841668658871825,21.43735937397515,19.19909318627168,18.073535625719718,16.344463553955872,25.19315587202211,20.423236404080676,14.008378208453149,10.970542432499236,29.198477354441074,26.72420020275332,24.297775152611962,11.621250626361089,21.664263331170865,10.839828182880362,14.689639114493694,10.274552435826863,11.305537235995828,27.570647344811707,27.134772888895164,22.41850914548418,17.62656847230673,10.651989394513883,13.859017004526418,23.07507099217892,28.28378683782511,23.28991383716239,15.372852875638898,20.308460743465375,23.9170035088272,15.804156299498317,28.89415728863595,27.355632068712904,12.99818774068845,11.16333391962971,28.62446380985468,15.843946218742534,28.52668141218878,28.346929368979048,23.35043819499003,18.970231784441655,18.949428215014144,26.70023883257216,25.05642230470228,11.335062201510597,17.20121382174305,12.507421142126365,13.110960105796185,24.217614753142847,26.867630153185896,16.303797084068947,28.74500277922637,17.187412907197817,23.445996870190463,19.89130983606875,29.68003261982833,18.74190273447955,17.377397459213043,16.095778378584793,20.54373405241591,19.40338407363476,28.753244635652333,22.4678682343332,21.739905457333304,24.492071606283098,19.126872499172116,10.569970868111046,26.927970351994205,13.857347769278089,20.137967959761415,26.73415587884387,24.69978812420274,12.538238746578916,23.78442754271517,19.859532241139153,18.22982586229053,13.76946171606793,15.956797891798974,28.148509388789588,19.297355799090916,19.171659477160553,17.656348154486167,16.583351797234616,18.998073909031795,29.810259135611506,28.184593016101655,11.546883112668457,18.7466011425252,23.239503979955202,28.982099568354652,19.85179435708469,12.909578669942361,19.126644119814515,20.607652069940894,28.994880268992674,16.950144152683887,12.455102838220174,24.931207227898295,13.280375766766358,12.725502777396969,26.448781846172317,25.175375211246443,12.043193293644592,25.05183838130094,10.772259017221678,27.320674543414075,20.38404153821567,16.864364201650663,18.146523939448137,19.187172421780666,20.84922551258362,14.879941468118973,16.65993847259173,15.84469999200266,13.858984793755678,27.60750917522316,26.47763316123784,17.55815497192092,24.451617052113722,11.431687269293246,18.268290555506393,25.11994416515264,27.492628013291494,23.605531975247835,19.80579791046147,18.5220066532759,19.137570640602778,14.109374893209697,21.02585012092647,24.003889673175077,28.645716050200672,10.110292543657371,25.841898464688708,20.73478876509613,23.318621107102977,28.95275537902371,27.15479736443406,25.01059443039631,25.2241537480592,15.17617896513741,25.9322798306236,10.819030555811358,26.27102707816867,23.327142611834454,20.40603208418888,26.18638337326768,23.291507734170914,15.907964991112525,10.681689742008391,16.621316123956,28.75254475967225,29.692816529932955,11.547719349887057,14.891973341126349,12.404945700058567,14.402214711889737,14.244452451342479,14.785986866323135,29.414883267754877,28.037096800648182,15.517110770903596,17.214038581060965,25.006206079641565,26.000540545072592,26.590453653388334,18.94556071178628,14.765498137375555,15.811232204806158,18.07156870808449,15.008023879389022,10.858884597502477,27.687845848423557,19.6596739517984,29.85960936423233,26.514770548534155,23.73675166433239,15.801923544427146,27.355591990504777,11.277834453117904,24.719099565887724,21.402326796892247,25.877058934795187,25.709763231393126,10.439581271767477,25.62784336399256,12.173550303095029,21.45927220401552,20.887629737400083,14.893728941955402,14.336706044858083,11.445170533530483,20.29876572016714,27.284918939123205,20.54968439807751,27.786342122699672,13.029527448049256,29.27502873320982,17.500230750073186,24.02701174373994,26.2073062665159,24.80934535883337,10.948483026772134,19.461601776836808,16.33061665189494,25.04056098204937,10.428749043595932,24.67854521128097,24.589581756825613,19.69075869200886,16.711750090309863,14.62303911052205,27.461667063744333,25.724125288399506,21.311357271142306,17.341327859533187,29.97113459354365,27.911200885326043,20.745636718993893,25.61552453805483,19.512316945099574,19.251398611936402,12.91207217741849,22.633763267029238,11.445806831164468,26.952966836813758,10.219776264774683,16.015788313541016,26.983563646204743,21.802975393820766,12.291480224216848,24.864354774504093,13.180924312773543,25.63165828990849,20.573788584814395,10.68796366507156,28.748301188543685,19.85214453624513,27.012831059809557,22.71816582732672,22.23448734281959,20.010492132229153,22.444942261440314,29.601841607044733,14.691301583405467,21.763332419637138,29.69544679387417,18.67849820998801,24.54286379695588,25.94630242984013,25.566482476163905,23.69097630425329,11.390552863265393,18.209912209942903,24.87175474680257,16.899115509772354,26.86816448284509,24.42699853574108,27.73465736700444,25.846233267361423,12.97750482526455,26.812656846921954,20.080057623272786,18.559426346097815,26.381330302969104,26.541268306958827,13.117280860837738,23.029819744720793,20.075647831308572,25.501361060146422,14.785817730201828,22.974802543053478,23.563154742535296,20.652279288173872,13.683689021359843,24.21108107054991,23.536041419825125,17.03502415260708,23.456440490640755,22.51508744360705,12.701883209486278,14.036170402398689,22.141007571657468,14.596757799029177,16.01320446869114,12.54824801194724,26.563019717899607,23.50518955749143,19.128093038710162,23.549139015868043,14.539238541296452,17.361591844871235,12.823405438167402,12.799931914408834,15.08145416789933,10.158659022544523,15.186182005798452,11.612055007334972,15.530889431289241,21.466063697244238,15.369668276699318,11.80571494990794,21.667470336893622,19.665968336447186,10.765407871933558,18.092133815573526,19.615052944255375,22.766537512478784,23.074603498166493,20.826527984416888,10.99124742724456,23.1925283193478,26.491381749876737,21.846068385498825,13.419690174540104,26.278497368653003,26.592109597172737,18.7685355503756,13.611563887673848,26.05103267440747,24.662521097687886,21.245423010478564,14.319192103602333,15.288168056439222,10.064965303292723,17.681879233320018,21.564451135547724,28.15057118881203,21.332814584847526,10.949467298655623,26.18287399135881,10.60401362435531,29.418503954411364,17.759255134060975,17.661113972256274,15.52766257238883,25.39214153911505,18.186759038360695,21.797383189614003,21.629554434145618,25.579927244338517,29.488599621334906,29.543653217604415,17.536675549599593,29.831081204809134,22.899101310348456,27.934468145828294,14.44307966138191,21.43932328065617,19.589374808302132,20.47475031973759,10.119314861215862,20.424790709068294,18.74337335916603,21.780171421187745,11.752018076979095,11.915857841194516,19.63871347031503,20.438469838982694,12.334357289325627,23.35273270410987,12.433941984193337,20.288713191384513,23.93038826889908,21.25240154966921,12.062984080913782,11.308560417890039,18.958895355647275,23.62912663611589,11.811081372878558,11.930400193587083,20.927403481320166,18.970302809427466,16.768083794764465,16.01113604687277,12.030686811801136,17.02567818726433,27.771897813322887,18.05106230433847,27.508700450977962,29.73609923943673,15.778642485277704,21.8822470427258,11.169991784272186,27.234478202695364,11.384074162229766,10.175139817089146,12.31564566731354,20.61544981832792,29.960857703454927,27.48238005214955,19.853371032380934,25.74997209197909,18.22613300864206,16.865901352067553,26.958832815689412,20.66701378058854,15.003897196443322,21.933232226504845,13.904715194414162,21.533209881346565,10.197731685083022,14.20019495151653,13.794675679554782,23.935215523788827,21.278336203701585,20.145993889155704,18.775777156754717,16.433830435005486,26.288870701241468,21.182447614227073,22.731493737876647,25.01914552243872,14.797356495343399,29.54323097296062,27.79438552001508,12.564659466393667,25.367548053328555,12.392504775945227,14.909992692266684,19.29850785774476,21.276077152120312,16.360039983684054,16.998146323285642,24.511692327399032,27.462138204753085,12.302507084731706,10.366454994768448,11.324125964004015,17.8534900670441,16.57242668714344,14.369180167604343,11.3259631576922,13.501419316514411,17.917404384400616,11.584338101115602,18.79611015013824,17.590537592469076,18.4162193791796,28.554699632630197,17.56989608119696,16.791494396729327,19.913925793131586,20.449492568206374,19.036265413708673,23.00116051902256,25.39273305083915,11.319656369396318,20.41845596516319,17.338095550339958,16.644787445126777,19.463018661723947,22.280698269348726,19.806036214121914,12.52877987539112,26.625756316553385,26.912731753336633,26.553560974909367,15.250552098079723,15.147312254597107,23.08472347719917,29.234447007149686,20.930889892972495,20.551242088125594,15.884089849407825,12.9186441493637,20.51881830379756,14.089289113289851,16.998444940116585,26.80340911351809,15.108946186977445,10.243589417899157,16.26335313293364,22.90764211645064,19.057523563373984,10.442902417130684,14.50066405312295,26.083053563441396,22.758659540988884,11.41989856367248,25.295077998945878,10.049224247992367,23.891793315133953,18.84315248741203,26.18026880328403,18.468168045203505,13.535961720862645,16.086131087135346,22.897970360156545,16.14396720165598,25.360766230603446,16.494356721148975,17.05399668980059,14.53871472300618,27.543885702056592,15.117750780948533,28.51135995075776,18.001275289887367,14.94865714245378,19.771084519065987,14.276669444152637,14.211614938912245,12.820474041392096,12.530213026058835,22.243139800032985,18.927775516290588,11.89499700121145,25.27777404264125,10.992607992309043,17.860940557411848,23.01505512194437,14.759977453945377,27.848888358972502,16.15483734274619,26.46554298367423,20.737773273671742,11.50915774997971,14.468892630494796,25.966507110969847,26.424838908555213,18.58850368040835,19.27815202546136,10.451298986496784,27.038441875311886,18.42755653087268,26.762771254399567,27.84912250970548,29.356699275078082,28.974521986164824,17.59900037079259,19.96236913612804,19.993150081781078,12.927808279417835,25.68024344018484,17.477874845104164,17.233004277301323,15.484767422587433,24.47585968532676,22.85714442281239,18.93960929030454,11.469146375868423,15.070862152615554,17.88499291536882,28.86554526938855,27.549574725676614,22.542308544167454,17.841336251286574,22.133921121271936,26.419776493233925,27.891362694088265,25.792212148266653,25.814905730915104,11.798553120366456,27.53073924391191,13.428968393023059,10.638599929145759,19.505620918816767,26.45461003300436,17.22896471317395,14.329307727747969,22.423621315517536,17.110976805057415,12.003189714330148,28.590024705600896,15.703021150783147,13.723629340897832,19.802906903838142,27.228773914738046,19.77151157959087,14.365592334100764,25.656630497127914,11.520668712179166,16.066344690194285,22.82881513401046,20.74700457616496,29.278307602752367,11.63295351902784,25.269172243828145,10.773661946781296,16.828959386991865,10.744970137787174,24.406858784593698,22.069359936310924,21.445781307588447,21.542086166285873,21.397137930013734,26.875362501965384,20.4540480755579,13.097536567355759,29.76573206615335,13.595613689369124,11.677736037775386,19.330865013248705,17.228715311329303,11.748265901217092,26.43617631761956,20.233781442030455,16.881251443248352,14.266783987857167,22.54659934992674,14.767798979610394,22.194136243534754,22.56368243500909,25.59861185648117,25.821672909748997,24.019888996161054,22.238958853733966,20.06833915781474,11.016860598855587,14.829221605175121,14.195219144627629,27.749881262833306,10.788145549310663,21.84280070626159,19.70149801094228,23.535179638594173,19.703874630476918,15.362050080678959,14.66069068470925,10.922055320573199,29.433428545468207,13.645919778569414,11.050152459562552,21.116403202260344,20.368430679554553,21.032158044876624,22.92027131219357,11.605506856115424,26.152710118873724,20.315194721001696,13.41624037802882,23.4523194199253,26.271824889468288,25.980812270326048,26.841716271162895,17.413554048178543,21.78260546009028,10.567471327722174,18.64290429620581,23.363070423362174,10.809392592359458,24.980729556741,25.184812147406596,28.476485123665867,15.47189576225755,26.397962528832252,17.951193874478246,27.33656952584058,26.33562392974674,13.718179841935875,25.56098060997265,21.840296550516417,15.563602491726986,29.083123631494715,20.9121082075997,28.80637630813306,19.29428705175567,20.948378729432946,14.597587537084742,13.483040671672168,10.338412561283402,11.515514248190698,22.230587514913985,26.694268856903236,10.903176450735792,13.190674113715147,21.370795067165265,23.348577395514724,19.175805520510064,10.119816839365775,24.04238454769505,22.775387959868183,16.516815323019152,16.257749229349248,24.453675277959984,29.196726997795466,26.151002109498833,13.791853533303486,24.155080223112027,23.927962457245314,22.6277415025727,14.123479835738685,20.577061738454475,25.674963567999004,26.6844842013033,28.019273820090355,19.63913128290217,19.94576405754989,14.9818685169196,20.7750498732805,23.235282585525553,19.366856908047122,15.311012496043066,12.814287904945028,11.239079071706847,21.95780626950569,27.84684624988853,24.61502233561697,21.611666402462923,17.874903938303675,12.981183746007762,20.243918462266674,17.27806079340169,27.8645433872393,26.30338017898953,21.209661357845455,23.13978072512552,14.877114294106732,10.792615190477433,27.183953131954578,16.818865004340537,15.291288544862391,16.09717095954273,25.3756183488558,28.914712828913114,10.019561898330863,17.526149564953883,25.96712467811792,10.713857767829156,22.376516525940655,25.447056081901827,24.111738347547277,13.44861364516908,11.619821895376813,25.093447011454067,20.1466961105837,10.519222315382176,13.043326180691782,25.338357916270894,24.577513343951228,13.519649681334492,27.474385188962746,14.228633010528835,27.849582723589464,20.018718825825065,28.315103905022312,14.027177391612744,27.737776338757804,25.443574420986646,23.66504414533803,16.021479320271066,16.230224120487676,26.06523131330466,18.621291185615316,15.814021440278939,16.00252619941395,15.486851122700912,27.326098297406915,14.571730404419352,25.879184989903266,23.937191981797874,16.049093821788667,16.26899722393815,28.82638619133294]}
},{}],27:[function(require,module,exports){
module.exports={"expected":[0.00027212104428608186,0.28350918786389256,0.01612562551106454,1.4591423881426846e-5,3.0963444188699624e-9,0.00067099429249291,1.485722633256522e-11,2.4624962576914635e-14,1.7835718258977092e-11,0.2137218221814018,3.75238315002484e-9,0.06656561407656933,1.4228253890978553e-5,0.12557092315620727,1.6298584199409751e-7,8.880759807623224e-11,0.005948499535663297,0.00026054746701495684,0.1603340747072664,1.0063590059390674e-21,0.00012586825534640947,2.0349184347179988e-10,3.90830766111826e-6,1.352595069220095e-7,2.66605731219164e-25,0.00016870117113106304,5.277115938881504e-10,3.6041260440806748e-6,4.8531954808513346e-9,1.904861380931526e-10,0.00037278176594635526,0.008695355712499546,0.008847037141594552,1.565709068629878e-13,0.04934318748837513,1.051220720308244e-5,2.3200812645314497e-10,0.02731294828846623,1.1042045987020316e-15,7.521377537782299e-6,2.1832032368811094e-11,0.00018665636583311128,8.560585177576413e-6,1.0450902367735769e-10,7.45435712337975e-7,0.045135055869801884,6.792597058863587e-6,0.11653476338413905,1.325563640506889e-14,0.01185085215483939,1.509106724674533e-9,3.567470446069055e-5,0.003266544669665977,2.274530943749863e-19,0.006244774834345522,3.6221147675201154e-7,1.5188396387486733e-6,0.00019094569537130747,4.501258143186462e-5,1.740867195794232e-5,0.007766119004883807,0.0020833125527317396,1.280052489896775e-12,2.962224261787707e-5,0.0003852570574279135,2.021867575286949e-6,4.469589802257672e-6,0.001971662661595766,0.038392429131533595,3.1713239546259916e-9,0.0003143164817677022,7.812521989333758e-5,0.05120380644246083,0.00015315320057975786,9.285409328700803e-7,2.5581515717549576e-12,0.01014856163568809,0.0040510529685072755,0.005563289959562006,1.428318707246016e-13,1.5951525910703448e-5,5.772454284210404e-9,0.003952234120933357,0.037462652877827435,0.00021092413980974131,0.0076442587384690204,1.1155086230611087e-5,0.13276036516005102,2.6422026754081464e-10,0.0008046823012937003,0.0004980658115313221,4.063278759951197e-21,0.007238308729708968,0.0009208684191467267,0.0013097324637596718,0.004925450330897832,0.005194833151355365,0.00022086716510138588,2.0992982004494466e-5,5.316669821658747e-9,1.5137865017188992e-6,0.09559688143445817,9.033325336890312e-18,0.00024274197082582401,0.0003696342577266553,0.06667542228740628,1.6535974248857418e-6,8.383686130809415e-6,5.042604316481625e-6,2.0072279928560542e-8,0.0010232844161563795,0.017539445610731796,0.10797111078380768,0.0005173273032836172,3.080093924253434e-9,3.3202962658934616e-28,0.01760594928932488,0.001393814767308998,0.00042074893830753543,3.436891173299234e-9,0.0014286923231184817,3.0573681722908863e-9,0.04106953366744666,2.800848569587724e-6,0.12748158718166647,0.0012532307695191367,1.1701713928531244e-5,4.476222089543035e-9,0.00021427145069343535,0.003557115142776137,8.505604972919835e-5,0.0005189355010208319,0.0063084988388375845,0.005927480788055727,1.1443557216284874e-7,1.8834718499389054e-5,0.005672287529851421,1.2539207683383515e-8,1.734382334729886e-7,0.00012992073483549739,1.144247779251721e-5,0.01917156459371161,0.004420081815325399,2.8813687323314445e-11,3.8829250467854437e-8,0.029651536683798604,2.5002291840464825e-13,6.577500287655613e-7,1.0444383556030631e-8,6.380395033434493e-29,2.5937999709993294e-10,1.2328742884090015e-6,7.362531887929207e-8,2.371274118948602e-19,2.0600178216873754e-7,7.889757687317767e-5,1.0136651471683345e-12,0.00017449274509228797,2.3501869525365695e-5,2.191782905714216e-8,0.0004209729758291389,0.08228827950017333,0.01656726782058959,0.01147155962513334,0.00030643218268094105,4.993363746294419e-6,5.168312396821444e-7,3.7734561484264574e-8,7.697930872095393e-7,0.0031015640419359137,6.110867552969285e-6,3.82531352741193e-12,0.000257491807808196,7.041549115446477e-6,9.775220853839994e-9,0.16830811794662484,5.8309001936874084e-6,8.384136089454175e-5,4.189195201944821e-9,3.6814114950058816e-7,3.4180101375680477e-9,4.3580854420411737e-11,6.015241946579356e-10,6.791378191507282e-6,1.5735224487098325e-5,1.6232060240136068e-9,6.765782441924666e-5,0.008089042144960427,5.193371780664051e-10,1.631876213212697e-11,0.0022459781195744103,2.949254647622647e-6,0.0022226467019983297,5.630935233241848e-28,0.00038215850946874286,6.22403859038189e-27,3.9606131011025244e-10,6.823930003133983e-11,5.096656253519799e-5,6.637450946381412e-5,0.01243389060572058,6.320611734920791e-13,2.594251881574363e-7,2.478455130301547e-9,0.08820269974453947,0.00016140427372957582,0.0003817279661814333,7.815543959158685e-16,1.1811290103473385e-11,0.011837524784669174,4.258231860751661e-18,2.75934143355681e-7,0.00038453857004686043,4.055675577206993e-5,0.0001760606215975535,0.0004649136154060713,2.5940703379006328e-5,0.1782781635360451,3.836841198847014e-12,0.0027501386622936982,8.031522453852019e-7,0.00012867754627256714,1.6464436997094936e-7,0.006183077143889127,0.0200749729421593,1.632529514248605e-8,4.1106556410392895e-9,1.803411109861738e-7,0.03997575237411276,3.712483175651517e-6,0.010170559677563482,6.133084963998423e-5,7.341378065029825e-8,2.3601363908951505e-6,0.001731711119554123,0.00027160910305774557,3.2796908124791206e-10,0.00012547022327917095,7.26339246016684e-5,0.05633323503995689,4.998945459203919e-9,3.996408737376792e-8,0.01712373235973907,7.976240869779385e-6,0.10379987276919102,4.450849992645489e-6,3.864562381556751e-9,0.011292469056634384,3.256371501730043e-14,9.804048390246113e-8,1.5721595039415264e-5,1.1000070795262329e-11,1.2463915823515454e-8,8.539736001972763e-21,0.025270797647245536,0.017166406373814024,9.457026930582892e-9,1.9947367187643576e-5,2.119755876187056e-9,0.031304861687804615,0.011925737767734049,0.07694855220772932,8.161999165752379e-5,1.8820823017537594e-5,0.006960271446426836,0.0009078074746652866,1.3828171596317728e-27,0.0060030575033470975,5.51088559155663e-19,0.003957044392006625,3.4089149024560918e-12,0.012531301535525587,7.553986135328298e-7,2.998772941332608e-10,0.00019972656910243272,0.03637124827971506,0.005389194344126697,2.688293423259846e-11,0.005911066562171421,8.889815460928256e-9,4.811438338692791e-13,0.0067260513766362814,0.018566055299978245,0.01581272905781031,0.0004017916524201038,0.0047096591574285985,5.714159747689696e-5,9.018740280060809e-6,3.4495182951439267e-19,1.7997159707161223e-12,0.010422330759855155,9.801459751681707e-5,9.155527653822861e-14,8.243141341479014e-7,0.00013248665540693092,0.0008696764593209147,0.001964984528206006,0.00011248247485887971,9.87035998244479e-5,0.0001509002712142651,1.7966721534869698e-5,1.4406163476512888e-18,5.878562749538556e-5,8.035079665877013e-6,7.818444232973219e-13,0.11500716648269639,0.09076508529276664,9.30849918447953e-20,9.621704576641126e-16,7.263758975104244e-5,3.636632899526187e-6,0.0016662987032632181,0.0005931027934972077,0.037092191844153084,0.0003311139811432378,0.10033481548068286,1.2671186220259805e-5,4.628081398673016e-15,0.09478243604972068,4.945637957828017e-12,0.0005028082988371434,7.05310915613856e-8,2.2795894914737294e-7,6.63219778088734e-12,0.00011435211077878037,3.374462453929884e-9,1.6027980561210818e-8,0.02915672776283356,1.3976636254118808e-5,2.1483491536043363e-12,0.21217148468540076,0.0011549331585341775,1.9437501753818376e-11,4.402511377256399e-11,8.768715959023522e-5,8.502495614021213e-12,0.0075602538601612455,0.17879896208765556,3.485654658931435e-18,8.143396500677063e-14,0.0006622069322547518,3.315522033097046e-6,6.342648045445923e-5,1.0814119659322367e-10,4.0246764995274e-19,0.0033655284349758496,3.708506524316487e-6,6.468509879329835e-7,0.0015622177275496283,5.922152057676678e-6,0.029312751411324157,0.00336183324932857,3.1176013237630817e-6,0.0013449282288938394,3.980691676078775e-11,7.57617440333771e-13,0.04948764522428695,4.945517171225179e-13,4.255589031270122e-14,1.1845088786036528e-10,0.0003839723624159855,3.3101338020395915e-6,0.00016078365954055973,0.08896292900259593,0.010069823933744022,5.383340452534828e-11,0.0029895318787660163,0.00032062444092485147,0.0011731943564919779,7.138067058062624e-7,1.2666555561927357e-7,4.398035848046364e-6,7.474871136755291e-7,0.001494886544766075,1.2635728928682905e-20,0.0017284539359871559,0.0006283481405507853,0.011209788080962414,0.007781739882469319,2.215855776926767e-8,9.281945225189496e-6,0.06700537938770962,0.00021781906863964002,1.9973983702961163e-11,0.0006854858855646898,0.0005296793021304013,5.552321613942333e-14,2.2288427883833683e-26,0.015725457430883803,1.6100638553364215e-10,1.5934490535580198e-42,0.00013619995912191095,0.000566987373028828,7.23713297070373e-10,0.035240444899245806,0.2338280333308824,0.0011160898043042075,8.444492182115329e-17,2.121345185460344e-6,3.2976106206601476e-9,6.008842156826541e-12,0.002826903074796252,0.3488944331643986,0.0017780706836976227,1.0300256224149412e-8,4.058980263554301e-11,4.164881105892838e-22,0.019732695871268923,0.00015633351080319275,0.034930855209653736,0.003290599604450722,0.0003262557023217353,1.129517159574916e-14,9.152418758467383e-5,9.454886418537888e-6,7.50676658417587e-6,0.0008596984227420352,2.0056981409485346e-16,6.679053580217921e-5,5.6442060592702534e-21,1.6944217761355577e-8,5.565248454277781e-14,0.17155631941907315,0.002670366063207911,0.005063360376622285,5.6472106768479715e-11,2.8530279530683453e-12,1.1382258935993892e-5,0.0009071536603937028,0.003629486185268369,0.0001332758181205788,3.84203735458351e-5,0.0003063198559285546,4.9960705596937404e-11,0.03917928270750253,0.005780878229104711,0.00944624710817356,0.000974738882620101,4.557709676255466e-18,0.0005010016741287019,0.0006495874058236842,0.004661942564666752,1.90718186042797e-5,0.0006833134551349757,1.1817189638250088e-12,0.00023197120335626442,1.767899438696562e-9,0.11794261968927486,0.0013263166548894945,1.032531146600724e-6,1.1502153535980323e-6,8.709371229489606e-8,5.266268819605911e-5,3.933285983085857e-9,1.394211666100414e-7,5.4375174525329755e-28,2.5645045058397962e-15,1.1669278025443009e-6,1.121484096073894e-9,0.0002043504945769063,0.03413179412250514,1.530621030478944e-12,3.6989825256804176e-9,1.7237770720727488e-9,1.56117528259296e-9,4.726281422175306e-6,6.281716412771693e-11,2.012003987964028e-6,1.9964339181131304e-8,6.522099725304812e-9,0.0001953327432638158,5.614507052312799e-5,2.483372631532044e-9,0.00246172973404353,0.006097240509231134,1.0454839881914042e-5,0.09712281756716455,0.006636089068713838,8.578535054806893e-22,0.0011688427095428184,1.1992878046302747e-7,2.033553787590846e-16,0.00867173679343874,0.002627525194808973,2.204940959082531e-8,0.004583927460727808,0.3932484317996322,0.009064025540274172,2.218540523156971e-6,2.3943376328699467e-6,0.00023744412480495927,0.0002837821417547173,2.077026008180092e-5,0.00022567653119723893,2.0278976413097283e-20,2.4559350480285893e-7,1.281024857775158e-5,1.0693328974707817e-11,0.001110342734666562,0.00044360384562391756,5.010835346757102e-9,1.8151655856372918e-7,0.00010710236886466522,7.384491484865984e-16,3.834302518208016e-5,2.0293460148108897e-14,2.2267319573904005e-9,0.0025064689025144247,0.0017041676073751167,5.1839093137209765e-11,0.015914377190149053,1.6019159162250265e-20,2.0567344463557415e-12,0.08858517254005357,2.62968962411289e-8,3.6065130329529373e-11,3.312326946071152e-6,6.158387396745275e-16,0.23100479989670133,5.001592511781501e-10,3.989731772620717e-11,0.008747349578212204,0.008921580598063463,3.953333491364272e-9,6.80734832395785e-5,0.005059494166440287,1.5878073533932296e-8,0.0016907829153697432,1.7650783334333288e-9,7.489626434469699e-5,0.0037481944724969706,3.9993176106791894e-18,2.3371250483292213e-13,0.000400611002433347,0.00482099129531937,2.4365362795358266e-6,3.4960465058696414e-19,6.507795304246967e-11,5.660382335921916e-5,0.07842374161822073,4.902380425636042e-16,2.4308011689358193e-7,0.0013867837926969243,1.8839393742012214e-5,0.012924855992528192,4.498205327157817e-8,0.00014381328548785006,4.598755061693259e-7,2.2105083944604864e-10,3.058476554625642e-9,0.00034641196484161543,4.5246904804029274e-5,2.032472438313296e-6,1.9855592099115674e-6,0.00377192131595246,6.163901838759952e-8,9.141085629218136e-8,0.0004652867000194812,0.0038788448556673883,6.296698531011203e-13,1.2359998864463128e-7,0.0002989925504931721,6.966742895982797e-5,4.100787885122036e-8,3.3788465696111514e-15,4.828141268185351e-5,0.0003170734714813062,0.048643062627342686,0.00011550336972981725,3.18202667368579e-5,0.1962653922052726,8.490267085882096e-5,0.0019194043357120176,4.570573734470185e-5,2.6238017180540073e-64,0.00010519134945052896,7.340942274988869e-11,0.0023071958415600445,2.5963127405773345e-11,0.008277185640820415,1.3305846374596004e-13,3.792903590753905e-6,5.207947890047593e-8,1.9405678812869067e-7,1.5037365384296418e-16,0.0014867727318651585,1.2868470860904269e-5,0.19256279757176423,5.536650736449849e-12,1.2711916500814306e-11,0.00017493338518767508,1.216528081779324e-6,9.549086573068519e-6,3.263684325197129e-6,2.2578430954927088e-8,1.0005905857373223e-6,0.0003664456412958608,1.723885468926061e-12,1.3861747358860497e-6,0.0027068545677327153,0.0001559214593473979,0.004531202213651715,6.361814891008958e-8,1.1692742311985926e-8,3.20135961605461e-5,4.036550628900302e-6,0.02290379966317903,0.006918040685020926,0.00044599177892829287,3.158302352821208e-8,3.784007912841976e-5,6.494400204069004e-7,1.4330171520003704e-6,2.3800594578441228e-7,1.1116062033278449e-9,4.058971967001648e-10,3.8453479719125955e-16,0.005178204895385983,7.125118153122241e-7,0.00015641444433545066,0.012452175201083089,3.87486145316803e-5,0.14249496250436988,1.8349237605899045e-6,0.03360729278317894,7.136673254337198e-7,3.592597496678162e-23,4.698364244688177e-13,4.925721698296625e-5,1.049910336290415e-16,2.5806596170235388e-5,1.09517716046632e-21,4.519181304507862e-6,0.013598078517151311,0.00012667871717030548,3.766151274662425e-10,3.2740790432658123e-5,0.04832242520399357,0.002712281504614401,9.574772081521508e-13,6.194104244760861e-6,0.05352356133932144,0.29904954073496587,0.0008678111507928606,4.33156028691713e-8,0.0035428838759731596,4.295280974574109e-12,0.006746027448316546,0.27199662764688964,1.7838954165870264e-7,1.6335158861326865e-9,2.386229117695005e-8,0.0025220520763001813,0.0787332189984007,5.205112104346163e-10,0.0008651322878282225,0.005087280048161342,0.0038012936605244926,0.005590095251077225,0.0013191252660464982,0.279304536784709,7.568271399070579e-5,0.009488065290237907,0.0008271293872979141,0.0005661646000253436,2.9773200553431363e-5,0.0001123986662725328,1.396622494342676e-7,6.247763988864833e-5,8.221424599525163e-15,6.822267214777563e-12,0.0008762212125218349,1.7558139286559597e-19,0.0006970901994824053,4.366753463371361e-5,0.02465808053248282,3.830910018245912e-12,0.00011305447204899736,3.8401306096003e-11,0.0004657808705022805,0.00020539459609901546,1.5002314553708077e-5,0.00015186774981757478,0.02322378646075575,0.029370622808188328,9.223606340660846e-6,3.395435037874387e-11,6.365550244927462e-5,0.04406097606994031,1.0193432278008679e-5,0.025661391338958298,7.23971065640178e-8,2.9391973030461e-7,6.27375257178472e-11,0.04448795660047409,1.1170907722012022e-18,0.17812620830603096,3.825177086885967e-5,0.004615830153115715,5.4165657248827954e-5,1.2281130010667824e-7,0.0006705070915384466,0.12668282066932562,0.2369928422474421,1.4137548722610051e-5,2.2179540462891263e-17,5.472037692864339e-8,3.495097617612759e-5,0.053017848988468466,3.4692401836079956e-12,0.017831175674427595,0.0019296358617651162,0.000147710227666696,4.5027538058080284e-8,8.664511632701939e-10,1.657768558757683e-7,3.742065541759611e-10,0.0005032308104951621,0.0014233553531025163,0.019215542940563976,0.00014995600799351587,2.067185045245817e-6,0.10462720516481806,0.00018590543742441447,0.043731456160021435,2.170558135477211e-6,2.0549685257694138e-8,0.0010252708560522198,3.866546996445694e-9,0.00044010773519166316,2.470059303144951e-8,1.5374228730446936e-15,1.1679793960984884e-13,6.937655424430797e-7,5.757331045751676e-6,1.1092527839232546e-9,0.0039003317223261654,0.0439510448931103,1.1400126649757381e-18,0.006950572900454696,0.017940458159028252,0.01874330748450304,8.745267158973993e-11,1.4397870061222394e-5,9.887930053192364e-14,7.642387915582617e-5,9.92689256874276e-7,0.018895276000204096,4.2476515669278286e-7,4.570559761470357e-5,2.6161249552108064e-8,0.00046735709711217556,1.5140713340163706e-7,2.3388175006022954e-6,0.00028233667783096,0.11528043490573518,1.0029588761724393e-8,7.13311845305177e-25,0.008551120513505876,1.8090443372370846e-11,0.00046077345637448946,0.00044234363034385767,0.017419692810522216,0.0012980368506996024,2.6460293511928843e-12,1.1662311070968335e-6,3.0684949848464237e-16,2.5254779540343434e-7,1.0018200725099144e-7,1.8415754852260335e-20,9.42301500975983e-11,2.3419086179558223e-6,1.86626793204328e-13,0.00790474170348736,6.123107153243363e-8,0.0007271384232010287,0.02362558648112562,3.5538355014365236e-9,0.11649826463209478,0.0009462203606326391,0.08794316457561228,0.0009006990995270028,1.097206939147094e-6,0.02648037620181944,6.105428701999174e-6,5.0129751684503644e-5,1.4094167118138036e-12,1.2507089061784922e-9,4.3981262570455866e-11,6.644356162525869e-7,2.898510645694735e-5,5.8195620070920455e-6,0.00014932897371875006,0.002015084670779309,2.2738637285267345e-49,0.000294233395717637,0.07245984894057982,8.143605280721325e-9,2.7271357798295724e-7,0.005179916162954297,0.0034822861331689097,0.1077121428992458,2.386881392750834e-11,3.11370932105284e-5,0.016264399406259147,9.576531614359057e-5,3.320543668130407e-8,8.359833181179758e-5,7.040741237295358e-9,2.3776220210519975e-7,0.0010084702159057944,1.7700805806257143e-7,2.7201675592745157e-19,0.0002519769727451437,2.7592603546367273e-15,4.78706181839366e-12,0.0038017047482360347,3.184716167522755e-14,9.409166446153887e-5,5.414610619143698e-8,0.0010619104687589263,0.07784711004061706,5.106592674023743e-5,1.6041306729734715e-16,0.008765439344673179,2.5760677296065624e-5,6.309762136870456e-13,0.010088637912410235,1.6657784871136096e-10,3.3511690779396147e-7,1.950052200805615e-15,9.195691036110312e-6,7.372914623193416e-6,0.045857342210077666,0.00012983917068931712,4.628055301062065e-6,6.5117257548444e-6,6.005040509974158e-9,6.4931566851397365e-12,0.1116995898984171,0.00014401801339039824,5.574697423598038e-17,5.8688400065538495e-6,3.8431369399401455e-6,8.021444431569697e-10,0.2658318778366506,1.2100016426416874e-7,0.0001052064860096134,4.9134481231626654e-12,0.0060451356941080584,0.0020299642237066994,0.04590925727312931,0.0024769016648284264,0.0861289797391473,3.829464562211629e-28,0.0004403310082977434,0.12270093084418793,1.126567098800217e-12,3.131584101123838e-11,1.795814486776221e-32,1.9361871004914457e-5,0.0005844200782584542,0.00010957011291564343,0.007855621343395588,9.974685862919403e-6,0.004467644257026384,1.4648812322149668e-6,4.319016318121154e-15,5.792956949628868e-5,0.0011788685322456686,3.4389368187076014e-13,2.5803341776590206e-7,0.004203176912689583,1.977902096567479e-7,0.001194011119354704,2.6071628694079487e-8,1.5250176081776118e-7,0.00013121325911193932,9.549006170379768e-9,1.123537435160223e-5,4.7453055628906546e-5,4.32976180022147e-14,1.585086769390401e-5,0.00519850058448704,0.07746169241949771,0.00034696220545916046,0.0059090380881138375,3.0926694515657927e-25,0.0003838194155631662,0.00030798764129308257,7.490038735607432e-8,1.4470016586306249e-6,6.885089897462295e-5,5.339103221351468e-15,1.1823543958031168e-8,6.86171606116581e-5,1.4369867528566726e-6,5.6340827431485e-7,3.6008664924399717e-11,1.3479848107544587e-7,1.8413177291949388e-22,1.0082998604413396e-5,1.5079159038185988e-7,0.005039544203001555,0.0060815286230082154,5.317546359580755e-20,0.05236587829268002,0.00010457824915260893,0.11965630416383657,0.022901312826253132,2.2825608109404193e-10,6.386476133300003e-6,1.2678512015680595e-9,4.927291918378731e-12,1.3391244045224176e-10,3.1361189654768342e-6,0.004609234430871486,2.1668188368085746e-9,0.0005288814027604527,0.03624665807977069,7.817608009986927e-8,2.0728567610661773e-5,2.968258172336583e-5,2.8470249306196828e-5,0.03891540805007145,0.0018491072258533432,0.004272885568629675,4.8086145800847523e-17,0.005982056446375058,8.358326485945905e-5,0.015091162607505476,2.337599229551449e-14,0.21176284027197845,4.410992581119507e-5,5.150507838295708e-5,7.285896673341523e-10,0.005292218078534335,0.0005695869643831478,8.562725739107753e-6,2.184950637797125e-7,5.539987899218494e-8,2.3323527490230647e-9,7.438324208693231e-5,0.0005500501987783465,0.007528018396700117,0.03822426046996016,1.5292374539956113e-6,0.0015528409087197021,2.98266044444416e-7,0.0008999953026900058,6.0779880065620824e-5,1.930904898426353e-6,0.0009608543541448245,0.006564291599104236,3.1877087933218197e-11,2.1209962200643322e-8,0.00014077480332314927,7.261950057707498e-7,0.0038003162012956266,5.6833639787752795e-5,0.03320469565135309,0.0003993819565578376,0.2235548162072302,9.256965699664529e-7,7.90325088747803e-12,0.0034131190483354832,0.11304368682106825,3.7758098033139992e-34,0.0010379051358957452,0.2545363195809593,2.1683584515036415e-9,0.008699344105413818,1.3696333748397937e-6,0.0035559873483704007,0.00019552476257971997,0.0001406569121434483,1.6293684681962943e-12,8.821253574493465e-7,3.190542762994887e-11,1.2278122511575329e-8,1.733753296786886e-5,7.14243527448353e-10,2.5490501212702248e-6,2.3448970096304634e-5,8.475686505615389e-10,5.5137697662144766e-8,0.023136809688606756,0.0017713211948209183,6.562893854119631e-10,0.11036998499263988,1.689475337050303e-5,4.896865365052252e-5,4.449492087164584e-7,6.670067315376584e-15,2.424263614019622e-23,4.13660166210543e-8,0.08869725517516072,6.236649627737524e-9,3.26753241972573e-9,3.869885223863888e-9],"alpha":[15.480913910507642,10.85793989531924,12.468026009812673,18.519032345545227,18.350211987339264,16.27938583637541,18.5491362161873,19.193706664296815,19.837232211041016,12.80420019997689,17.43031281942084,10.6990766607728,18.077729686478015,10.434786860252409,16.45532629432688,11.601400606137615,14.732034698215632,17.86756279337813,13.103370061250978,17.164868158774205,12.513587016340695,15.13365961654431,16.79634056051742,16.903048757305818,14.645251308285893,10.392952930680115,18.93827704633167,15.067060535929084,17.652469084528864,16.992466084239634,11.826198666511763,10.372454926033415,11.331704289069576,14.886409525334185,12.547078083510106,15.014532436118257,19.600751650390645,11.451040236673034,18.31360161282974,13.322323885430025,10.642560435248354,12.91763737758923,14.938436473176885,13.082982988072764,19.72252653479453,14.219909270317102,18.38024919086083,10.558834935057867,19.547349577508548,12.103717595133576,15.25239771286399,15.306765893626942,16.21742497230086,12.345364176184734,10.284619493446588,11.114491666461957,16.636914448317857,11.194792097154602,17.714665919848258,17.271027312807703,15.219297920360395,14.957556366061095,16.655677071650885,15.822254009509273,18.69908145075087,14.645349534345488,17.5232156715277,14.218461876957694,11.369210277580645,17.67205096241184,15.812598169397578,12.138463803604099,10.941550164157977,17.663977180594088,17.943630783432102,11.70786432457474,12.514214094927354,19.831172338493147,11.332895956534635,15.784460462771504,14.920025776954338,19.069944353836853,14.4700389403375,17.404560825797645,12.599484189001638,12.346949612213882,19.604029433525703,13.833567830018117,19.720444126816343,12.910608643249795,10.661774720141587,10.149158456882102,15.667700798167461,12.687403648159323,10.000819089739501,18.014984281280917,10.78721692092766,15.299708993994015,12.833517123920801,18.727319532921953,17.697325756171395,14.022253695955635,19.0969274331418,10.310553721700579,17.643842861093034,11.509902305138901,14.243766860225971,16.422646934356514,17.3124756898794,13.242255083110186,10.728668317995073,13.000546822377583,11.369722166044845,14.938731735458424,15.299820092543756,11.922472744402127,11.290000407214746,14.487115070791816,12.54017321882917,11.070455026312905,14.250788706202735,15.395006537148612,12.20981993863118,13.180148189018993,11.013365695084103,13.191087192757534,13.669789795967093,18.430420682223662,16.33461868710946,11.738682793418821,15.133089226694603,10.473721240743588,12.87938077999084,13.827253111996496,12.199200384674464,19.369072425629085,11.311147762164902,18.067154513514,17.009081124129203,12.203105963927367,14.958712463844961,11.601732181549224,10.883344414562766,14.594678609772398,18.21267463083734,12.445375977795607,18.446680931507593,16.63108646648893,10.755898388626708,16.95263383925984,18.144016265277223,19.977669111095288,19.57208950136413,13.431804368357398,16.301834136710184,15.720993825565142,17.90536491630042,10.630483760874228,13.96900234660502,10.64452466055281,15.712837734998597,10.204458955776651,13.18897780947375,14.57096093082728,12.798469487583503,10.10022807594864,12.84056874211046,15.88012810218907,13.787518187722066,18.504030000262954,12.70792156086566,16.65620643162072,13.009430564923923,16.715056444342682,13.577746415861085,10.658493992426088,18.246708079463282,13.237865342167929,19.689407991427842,11.48764689213091,16.147627599706365,18.281257625929832,16.466483916435593,14.084389950876874,10.24881612020268,10.511393122889125,10.77852638580353,15.201607897306307,14.997710285216295,11.160058937466236,18.35560550414158,15.431640420445403,18.772900961412216,16.914439150022524,16.138597713053013,19.39440207071383,12.820555054935085,15.861998245374878,12.612936521524514,17.161720717068594,10.193196912221595,18.449788465935036,17.293447273509052,18.796891462082993,12.135631776216105,10.41456518989565,18.692371697079214,14.20891174124746,19.873921919440964,14.775251242056807,19.986471077228597,15.987858845590342,13.874562403543862,12.319967474480908,13.41383862891262,15.841349413429626,14.57152320309362,13.915953128748207,18.53839398390305,10.136391130418364,14.827860578632828,10.091068603461093,16.840084861008577,12.894897931010705,12.642406015292746,19.799621684503773,18.142386000910722,19.318343384904214,11.725162689231862,10.554365637031445,12.341649252288265,11.509744840630788,12.494087822465108,17.520681223664724,14.911955552704118,15.067663085002943,19.541534761542735,14.61048537154667,11.4418544805522,10.586948728410864,15.236494023888943,17.254349485347248,11.660190304271508,10.535858357523331,14.393081945170469,15.685207504576052,19.01803193844127,11.841313000961877,19.898513171873603,14.784852347431613,19.230050605043704,17.721705512110137,18.865139706019132,19.9834485393816,11.808841555375864,16.43251507680415,16.056366319733804,15.507383469432387,18.43049855182475,13.586609033577115,14.808337658150846,11.78668916861945,10.252541929814633,19.670922881394954,12.41555928584009,13.917462509305567,13.208481298205736,17.978529399293542,17.6549849332858,13.360627915547074,12.716674500054246,12.402437541031695,13.198045487389734,17.092732292417843,19.37087494978854,15.512737956110305,13.219501335329351,17.82267577614239,14.147957531533716,16.76052519894028,13.051715639461271,14.876637016927683,12.409220712847706,10.889309600453922,19.235905915680082,18.398383966897125,11.048496748274253,17.60475763025188,12.930203679838952,11.613353722378273,11.474956585702108,16.4382677068044,14.57640953152243,11.803206434279069,16.0672542914354,19.106327798668843,10.08783874378077,17.922311256897224,16.474281078131252,19.48147366938875,16.465026056672343,14.816106501514625,18.78859109425951,18.714737244943564,17.176277311463934,12.496906121772412,12.754475352670418,18.510450191893348,14.744768493291705,15.950149046315222,16.08666987236781,13.209102093206148,13.936052177791137,15.778629627428238,12.854523345456652,13.368448499821376,19.468741991236676,14.312699057701849,10.387024919161117,17.733439866248386,11.909276088721768,12.113835526263339,18.317326598784852,14.209361505251906,15.41126498722666,17.053333869420534,10.034142161502107,11.70992773133375,10.07351576103269,12.272503066192932,10.55687958122866,11.769011379582112,18.910483488621395,11.180183985493708,13.928285792135508,13.918038751151409,12.800760009015406,11.39365902943641,11.889144743679957,12.486766654051467,13.010591630665136,17.86243094464233,19.98049322143377,10.272449452965759,17.794504665058874,18.325638130075085,14.508974825845522,16.73864478184944,15.178413475665737,19.98194850869905,16.18572949581518,17.91315094938176,14.153184038042978,15.359351244070421,15.944002670329434,14.689408829942717,15.652467429251661,12.044661954441704,19.75236575224464,18.746084293710492,12.633540108573554,12.837093043994884,19.749748305710973,12.883993338166128,10.143594537415819,19.71798245551203,14.11809271042365,16.551053174755758,13.855428554876696,19.56184145737668,10.307565092642504,10.278193915354215,12.977022343280261,15.177805426968378,14.45023117182473,10.740809905489737,19.400620355127227,18.147267656307765,16.452599695258012,11.561036263019693,14.016659061151653,10.203468941406197,12.48022242768566,15.324363312142486,13.45565933015451,16.696805886279687,13.124436355001151,14.84362902497499,10.505575504039886,15.82402699547755,19.25251911328601,10.170179702914535,12.815656708817077,18.106960194782594,14.866229752818354,10.83626912733832,10.983893916983492,11.850910988872187,18.129983032764624,10.75028037575792,18.551126689168566,17.81348442372903,10.165041284489044,13.733933344487655,16.352895778903175,11.987304739809604,10.287822773095591,11.225681148508361,15.28781614441862,10.191720615598873,15.184565190918649,10.321896170154343,12.66875557101644,10.208888290616919,12.508321432039741,15.819779501495585,10.180258973405714,10.267026699170042,17.043769414082757,15.687201836990157,17.029187368164756,17.542728064378153,11.035451886055794,11.810577379013756,10.840092398300666,19.23421239311862,12.081743644849116,10.422172314131366,14.215005976232867,10.670433220048887,14.586381045651525,11.804182618083532,17.956344517939318,19.39107923189562,17.4065143407455,13.455346988007637,18.537956285538108,10.447442659725477,12.097319987547124,17.98212616903646,15.042046710360212,11.458252142394358,11.900712738900408,14.708552212208307,16.37494949907542,19.453547329730547,19.842966332697387,14.366153161662467,12.25822143595072,18.720867053651737,14.925996269419182,19.408911340077758,14.399993216768674,15.98841644806608,11.145072541439689,19.767346585441814,18.656137134248397,19.046224595846574,10.208237929682678,13.256190039892166,11.515823620853205,19.328525413612766,19.347452434452563,11.328074679125894,19.01728415571614,11.000450311326775,13.014717733326586,17.581815289740433,19.88664063262119,18.335653996933353,16.385518906834548,12.134989941129412,15.422361053102065,16.263834475044334,10.00656843920533,13.879173187849265,12.2289933742174,13.713465161139277,16.67634160818204,19.791925146003244,16.345373793226734,17.76594623780001,17.80667679005954,10.81581492275407,16.792619308834684,17.263931904100325,10.22145998877148,13.368008414333378,10.599722380924142,12.995575416969043,15.157535063606941,15.071906406360885,17.916730640672668,13.402842406774313,18.78884437471818,18.614895349592324,15.022761837792014,17.325108729932904,13.776553966877067,12.069885226232099,10.100390452618178,12.83858753258947,10.685659203033266,14.840984530861922,16.526454294146973,14.301772187727078,17.67474000165742,11.706017728225671,17.712966347981336,13.113364504067311,10.14338341141313,12.512029083253216,16.922972719478967,13.67875712557632,11.560393495444652,19.415489168960637,18.11829716529501,15.967633871172396,12.255468320653833,10.892494358010687,14.101727164283346,12.002987996468192,16.29084036275048,19.54611468643535,10.351588931119068,11.655844982310393,16.83176724745822,14.574722426381022,10.983703106206466,15.36611398473818,10.668760370710313,17.89309513028034,12.77457832938855,11.357527928847581,16.974135638900446,13.720839029233638,19.19635899297332,11.360469086146756,13.673475745755741,12.378858813599393,16.652346644645576,16.92384245552853,13.911017425949073,15.858892484558822,12.054626971779674,11.593395348904977,12.663059729206616,16.975946851343316,19.851094609809785,15.443898128837876,16.296862051591734,13.79368170330956,18.616860364314753,14.590795628057613,16.66087623797231,16.340600915493347,16.903854020993414,16.553171726575926,15.768505605955163,11.41571605978925,16.777178767250376,19.180267375833502,16.27707403366742,14.995951988759092,13.774809804460855,15.399068550173634,19.845535214247125,14.243081587605104,13.267886170717587,16.570753402321234,13.863321787457089,11.932505325305186,18.644499488590032,13.538476029129829,19.228606561316393,10.071972326497542,11.778764418075664,10.20468196262172,15.599754616264956,13.57020513635571,16.065668215815446,12.52393997746162,16.485095772983954,19.946695854304423,18.32787864823116,14.334943407397049,16.89974676715101,10.017015025855166,10.479315639979905,15.758564261227386,15.348673709179339,11.177921454428093,13.008431092145344,17.615262091650116,14.483714209729179,13.855601353650114,16.11814659088942,12.469632139979751,18.357939927969106,15.54559483985027,11.00127251850334,15.50535183360287,18.103332941300998,13.047243378442046,16.76162970484583,17.537769501496435,14.876335181081084,16.122704888367608,17.689385779877238,15.808160798844268,16.21764063460229,11.811496884270174,19.598382870167313,11.315884760215253,14.670894325517466,16.292463490870688,16.494458092931893,17.52339178644879,12.532590851381107,19.073231777207152,12.59426320041772,14.390331549341905,11.902071757999984,13.170631603749705,12.023498628752606,15.541742955807418,17.097780725339483,13.673676399409448,18.953864384208202,11.885541784828376,18.842304757401017,18.074497052073077,15.701437696728288,10.082644703297344,19.11616112824433,13.053579563005313,19.560376490413525,16.978693346407354,16.83636414884399,17.942521155346668,18.18740044425493,16.169873051309793,10.770147724512295,17.326389695659998,11.829369446138907,13.522132691222746,19.80833359267585,12.251054291842205,10.059859432578415,16.83215620863014,16.264094585164834,16.832837413047784,15.957596680680616,15.273258696408995,19.180018039641304,15.6295783065841,12.984878280679643,10.727114772219913,13.131508314468263,17.064746505928397,10.622574889267451,18.029437487337805,10.160786631019592,14.255374714440197,14.468044758274957,12.57950139130514,11.710555489818686,18.709651399716357,16.79441007855292,17.847815725177774,19.218116370981036,13.538153568757442,19.373870887284752,16.027662788225015,19.977147891282208,15.900685273812991,10.98643715971682,10.822310425521993,19.967569099066385,17.595780061109227,13.678440017965452,17.890556278879863,14.85729639063548,12.455727111046182,14.400392090460718,11.172298380012343,15.801616042264916,10.423956957619678,15.875393248178863,14.884665606484411,10.89618287620086,17.480247687800187,10.01507079405117,19.12549881055459,11.520637264545794,18.888483153915807,12.57822247373551,16.699922541736324,17.203332111556378,14.687087879943132,16.81764345013122,10.024702415815057,10.412293871523822,11.163821571683542,10.591999552197173,16.303326521685918,19.20887371210069,15.824169328569822,12.088413717340398,18.0873952752942,12.060126795168578,18.96494871474306,19.17815600685215,19.95922281317312,19.55402568691721,16.86023213434771,12.221105408812448,12.960261112505636,14.158200903991194,16.388585251005004,17.918429311473346,17.02368680041603,10.686406742957637,14.815384535831551,16.112958570350017,17.379911059188387,17.89786707839115,13.289592567085913,17.17224468184687,11.227064021894037,18.16136555985277,13.616440178763058,15.671467574974955,15.237795758026937,13.016215356747022,16.675076053305308,15.042550777459988,14.710520119901071,17.885834162673678,14.50554004148169,15.57278429735544,13.909342341657068,19.04405420029031,11.797541859115688,18.27180186659319,13.240574115447497,16.255898220358233,11.31241650802708,16.881304798071135,14.777373342576672,11.098125023179605,12.857979908534796,17.577008353617796,15.441684000984527,15.296584765473488,11.691614536403021,16.63719927384938,17.181887234383208,12.601381976035192,14.357646891356683,18.059324378815752,10.956530053053422,14.044472602393576,13.297016002683502,18.275044123227755,16.66657823405894,12.355308469489792,18.604263312749406,10.13777096087833,13.209082140798998,19.30654709701169,17.25099206513732,15.432911911422579,13.10523600993189,19.630193672152725,17.720640967343137,13.207831657556197,17.454302997320198,10.865012267777983,12.029757324948651,13.014283773622854,14.598186569117498,14.78604574572294,17.336353355299586,10.861294813641893,13.481232326857565,19.227384286521442,19.658827338437874,15.755272490690519,16.44543176855874,16.05480470853692,13.154406035990263,12.38518617989464,17.352839371009424,19.830655541510488,12.877000016606381,12.184412731977435,12.8321274635125,12.735315761559615,17.392716534424604,12.412195657220169,12.731563911657366,12.90396642573696,12.69781457794344,17.067577974720788,16.8058119860208,18.05733598877434,10.817480845293083,18.92852544264217,17.07225870655602,16.941905431462516,12.630324416705959,13.378346551458103,14.266758405990906,12.354754184131199,16.49413199682119,18.128381076822418,12.235049085052914,18.4197262092517,13.138937911824158,19.652374201351417,10.739599368707173,18.3048723975757,15.299609874640254,12.029661124400008,17.454076518549172,19.60807411781751,13.071998877310893,16.94862913222836,12.419271801788955,16.50970238643203,19.246935977850004,13.177509807683716,15.003412350386249,15.441349103451092,14.005140403744413,15.388246501437841,16.62142413692512,13.230713112079389,10.329878649500388,11.810208816620731,17.630298757515682,15.274991914057232,13.417560675174016,15.651661265224028,10.983055395443476,10.44299443433639,14.981927914362995,19.653980127378983,15.508244460881926,15.867157110672327,14.05927471620796,16.34051097480978,14.207564960708803,14.959831389977701,15.63281272544021,10.640627094726128,10.374784443186858,10.465742322665088,16.99341196680474,16.384705651633823,13.831845896903321,17.341881194204017,16.948832373946587,11.653022005258673,13.795267604336523,15.937204791087613,15.50352796302378,16.09530586029082,13.39165828212957,11.456119626170693,11.91489041070957,14.646250353022792,10.038028565271018,12.563180421317915,13.442241079621752,11.060652057298173,10.255483282538142,18.561097509482124,15.57506412269338,12.558911173583049,15.827380785584939,18.591707391340258,17.43474047536774,13.340774032901521,16.2190820908681,11.041815753212028,18.360567847189554,14.151621540745417,11.944025680385284,11.535654451996315,10.160715146585522,10.24292197585055,17.07651849323971,18.243127315932522,19.305543300556476,11.868155933880978,10.115501161875862,11.846864059032175,17.483746746650894,18.09457004377066,15.715193443353686,18.280745565542333,19.8286368367286,18.147748471757772,18.254465749618333,11.775820729363442,17.238741019823753,12.868406901465388,13.894771657962394,19.951643824182153,18.56540367525632,14.276879948187442,14.569797134479082,19.131015163183825,15.864855183333184,13.598622993080763,12.990651710213273,11.60031296498526,11.602109604523477,19.417323354235055,19.393623875191714,15.407308361280139,10.030474603883867,14.805384752508557,12.83708799059573,18.73098318477303,19.735010853074954,19.47770968620444,18.43247448668175,13.907700558414032,15.802299959505845,11.342639629241786,13.49690761816901,19.526005647202023,17.08725964568483,15.51737292755465,14.5132875245295,12.579228636083128,18.87820889495065,16.284151851151286,12.589982193346591,10.801070227557556,14.551555901725322,17.578541599512988,16.48578091544472,16.69160439632512,14.614627239468765,11.250793328687783,19.183682051652447,11.573501940196058,17.636679026020115,15.381157279764553,16.31628525645764,15.586981895670984,12.01171983563458,15.078148304165936,19.16002890729771,11.226947114926825,10.785679689138357,18.902830109943494,11.373326771239292,10.165399096905539,19.202422084277732,11.87291770161311,12.564477847843413,10.102936427550656,15.976150875398282,10.867255941188912,11.23677835805934,18.430143973246032,19.819843617800043,19.268956412497605,18.091052031667793,17.632372089475723,19.559190603169064,14.990087053210319,14.96212323680166,18.877244273770437,19.02155349414552,10.972851039818632,13.506593109898983,13.831007473439087,18.90087461922682,16.580199124266787,12.571109365146228,11.77045538532293,13.838350552331125,14.015240083745509,12.128095350154462,12.006328760224928,14.412570592212626,13.049216106288746,16.84235686379185,15.642037300890099,19.109070989562195,14.066538469267664,19.836458284503394,16.46321278163181,17.551889134482273],"x":[0.6112849712447461,0.8660311171565227,0.6326294748872994,0.737230093160472,0.20788980719864747,0.5476200170870702,0.4416160670941447,0.14719435883159138,0.1667649302590024,0.9640901167958298,0.3982302873841881,0.7317212317989388,0.5540304750387297,0.8840432513518977,0.5625550304756899,0.1099756121732749,0.6116701486488871,0.6748283357313731,0.968979749288789,0.059058086015074895,0.4353029029894675,0.35984124841790077,0.4658711051128128,0.4429425338661619,0.011628642364417852,0.6762849595272449,0.49978596841828904,0.42727890614358,0.6782814398862458,0.37807224065314515,0.4372442343778238,0.8280907988983706,0.5223045342048653,0.06494335125140904,0.6558932030390174,0.4484630849749214,0.3661180362392209,0.549179060082174,0.10840197472156898,0.5740319199838526,0.07364246422230947,0.5184287848243212,0.8936008778786713,0.1034630131201133,0.35600380002294907,0.9133209008086132,0.7729554871793203,0.637544977653455,0.1735448042670451,0.9733393315836729,0.5242910247485932,0.7871393921675807,0.5663665882339126,0.014697025294610366,0.7961250594216545,0.16963177780845284,0.6570089044896321,0.4625717512519181,0.43128702625798776,0.3713177678063617,0.594174674323332,0.9977291062175939,0.30157642246207916,0.6542844762494253,0.9440436242408956,0.33617485788559454,0.5057876179421754,0.9748602244457414,0.7743419341757494,0.6589518740876539,0.9697936192189442,0.5703638996835605,0.6613828634416126,0.5621270133277851,0.7645033776960357,0.10087939955922254,0.6797786486333299,0.9253931695981832,0.4332140777667792,0.07453945394717665,0.44704951402145277,0.2785179626254124,0.8811367645606087,0.9261191255406833,0.49992722801881073,0.6716309429629623,0.5249757447322074,0.890747551902402,0.41092853480624236,0.43552217206517296,0.8460391046681071,0.005432986688686636,0.6575218432486096,0.399889749026785,0.8173846085524188,0.8334557149801154,0.7358920928678341,0.7719684824178217,0.2159985462674432,0.6657928575730281,0.29897676277617036,0.8461790430449332,0.07007634810102759,0.5966419613700225,0.5297592696948947,0.6502935576094735,0.40325528281422174,0.4279411807317981,0.5857459903840916,0.11978051509660603,0.4653912828770561,0.8922431506958417,0.9361383556094027,0.8991367287119287,0.19409213843686257,0.005651696952065244,0.8125530976354969,0.5137080632987645,0.7950940962841753,0.15030110199140356,0.6136670884976037,0.1651127954383993,0.7302562718614676,0.3378195392759704,0.7050872688994516,0.5289002065095476,0.8642920170541504,0.22811607195642059,0.4435504181035632,0.6796766037735973,0.4231247390541468,0.8609123421179479,0.7432900902044168,0.6237882210412857,0.15331653553044933,0.9066120430337792,0.9585309794675865,0.43828880635425826,0.8411252393637954,0.4661675249143027,0.2870936792513519,0.6916843652249833,0.7698206153431681,0.21905370047328687,0.9132478049697466,0.9538044868289741,0.24593915997113802,0.4595096519171131,0.1614272280564848,0.021224541861795787,0.23084133822366226,0.6036850212866973,0.6646681247078965,0.018194008952615803,0.7198174879036199,0.5816258440598434,0.12735602479011132,0.7105583119394849,0.5933964613354246,0.10716850924793331,0.7414114136577055,0.7199013680927544,0.5431220087198476,0.681495825952896,0.8417632158223216,0.43168494978805416,0.2510485072544184,0.5657782853330242,0.5344359937480394,0.8998635339310712,0.4300356801626708,0.35219233240857295,0.4992606363040957,0.8051353155705987,0.3859462090183259,0.924497258410139,0.6038714844695401,0.6489705490582725,0.44940859664698074,0.17592421238200684,0.29482201947619835,0.3358307156831777,0.20614656415303667,0.9372184125945933,0.20586006333909102,0.07369846712964856,0.2564905784872229,0.7867814276962326,0.3321332585465977,0.10783464587763802,0.6797306109946539,0.42364516154469567,0.8106681853924049,0.0104299043240772,0.4435266826894606,0.03364018210085584,0.09367893357798152,0.270431696175117,0.4043675633435597,0.6302540300485506,0.6599055814780945,0.25390746839239986,0.8787967853207559,0.2600561238193464,0.7743419713276385,0.5518487534194019,0.5279230039114389,0.13734840772864554,0.15735228603975404,0.8447014782742313,0.14787608477184566,0.8083942535562707,0.7364314077339691,0.5084911987571086,0.5444281237175987,0.7021076336403969,0.6173287918923416,0.9910473943781932,0.4384408618176734,0.5484480611140652,0.34655696847719497,0.3979992080129575,0.9196912829464587,0.7221400217330434,0.5906291585881289,0.3317524935031304,0.21247307871553445,0.4931604528428608,0.7445964011192299,0.17090932766846656,0.5346529357028009,0.2781326654998555,0.24339535785446498,0.4290104505744834,0.5653542889614958,0.9110009313200733,0.20218864762412814,0.6511516815444087,0.4044776717364811,0.9760339251570063,0.44057741301434783,0.44526587989270183,0.6606543434666932,0.2555274651530801,0.9363511605278543,0.2983763961349801,0.4183573002987777,0.6624841495636764,0.17995139378686176,0.2907005936712115,0.7158324252213257,0.31561603742588806,0.44035534957591205,0.05049419393749233,0.9126964852136772,0.7340857699888033,0.6117644514702387,0.9397421467787253,0.23842997286624779,0.9536348445904401,0.9644302678515018,0.8721707297995893,0.24723099299337803,0.46078774524853294,0.6536976617344532,0.6623971832831776,0.006963303157830669,0.7038374375588621,0.09102667417017862,0.49228570452285636,0.1390184228682314,0.9051138613599705,0.41188617794576365,0.4521716683995949,0.9329312964840961,0.8773648291494678,0.6645898318124679,0.1427006011127252,0.693681775535357,0.30589578112607607,0.05906519901749663,0.9618019399029234,0.7084446460898972,0.5814432049696228,0.932005397034404,0.8090216883888364,0.34810454011828873,0.5252339375301058,0.030311683515982457,0.0359710053281983,0.941092762249091,0.7147937660840438,0.07064225362462184,0.37085440530291125,0.8601196161279285,0.7854609461715076,0.585625265531613,0.9165735671294997,0.5470047904837347,0.7050404864020252,0.3557811938533699,0.03196861205009616,0.6846018584973776,0.3690557124083458,0.282437983548959,0.9837469357699737,0.9642730386315255,0.04465082224386263,0.07150420674572389,0.4078655308779471,0.8068458830850247,0.7097582722998139,0.5428792726475031,0.8198548892053596,0.32560567191526557,0.9250780425814136,0.7418030286242479,0.12187440631699364,0.826934383296495,0.147009137472778,0.9785173893514079,0.38909345646951543,0.3871231768304737,0.11289513581074373,0.6940159440459439,0.18580581200547108,0.11602656577791559,0.686281448985611,0.34718291778785737,0.07877513674183767,0.783179892512913,0.8465891560877274,0.17157077892582961,0.050239761748224865,0.4522096752068374,0.21611087957825226,0.5150682659084593,0.8929323903494628,0.02365346359619558,0.044242876215714544,0.3870402194834959,0.9311933449381091,0.5828715740940948,0.09568374566075644,0.1335145271886924,0.8800822355634133,0.6672152693350961,0.3148004235916122,0.47687463669417984,0.9292504344325612,0.8061272713732044,0.7717988626889039,0.4639615228898408,0.7252386136022511,0.2425167363280345,0.09126244103708836,0.8544506169957986,0.12557427899776208,0.3800574061868147,0.17061820199834554,0.40583232867924623,0.5624374137188901,0.920208019919664,0.7410574965519203,0.7497227016602657,0.40021851635145356,0.5272506286111724,0.48016871595892785,0.544708136549402,0.8358287737713217,0.3129904181099066,0.2487296628702147,0.1823186150917182,0.4708660068806143,0.04153114760132781,0.31678917152129116,0.6459808844066266,0.9979524145370484,0.8969656227823259,0.18724832979946404,0.6284859289809017,0.5922405400371313,0.5189898461394011,0.13050284854339766,0.4185885716967288,0.5460023768108209,0.06337577701671826,0.009477967722671732,0.5355877734231622,0.19821958336296164,0.0033200700841493624,0.491603216010186,0.9033216085375244,0.20079986495799163,0.7505221131400643,0.9995535366476074,0.456148662343,0.020143470882642456,0.9437992479684159,0.19681119938712244,0.24744625518920627,0.6257149694925102,0.9952412774706763,0.5219329951662643,0.3169215604658342,0.08170860311151595,0.003715659519995862,0.898379963737916,0.4681383289478216,0.6931424198757281,0.7628090316037539,0.4911789821839354,0.0640397781070885,0.7103345247926773,0.6005724564827224,0.33836291088897985,0.6951333138432347,0.0411802591273116,0.5991059272786672,0.045470195738132047,0.7811592761118364,0.20604289385846597,0.9518611140136208,0.3894541078150944,0.6116586436730784,0.24528606822292276,0.05258502587604852,0.5066156514429205,0.8253378186870459,0.8889717882269184,0.33330845131164133,0.2452017142078169,0.9341399687043959,0.18689274399960065,0.976705555354219,0.7325443265773821,0.986134654383602,0.36774401944851975,0.022614065393924854,0.6323286691922037,0.8979600499503075,0.46492825765799983,0.8380301369160004,0.5343128210642725,0.11911867278075428,0.9808711283203657,0.5842980097352235,0.9860713213715753,0.515026279632508,0.43956193166285584,0.44135267049839433,0.2987775498134251,0.34225387390523077,0.35694497365048594,0.4688343963291084,0.03991981740951145,0.1075195721135147,0.5966014598792879,0.23070067610325418,0.5928932145097867,0.7015849283508373,0.19781829616088142,0.3012849242343558,0.11286914155198224,0.5866987205202474,0.3333442042028927,0.12460551329241976,0.40895034353299775,0.3862430056701798,0.22821722418316592,0.8878599560189979,0.5297014620849698,0.14203744609304914,0.6718222803371681,0.4851614670065665,0.8328030066048095,0.8319207045732842,0.7433593577512343,0.0380587133100716,0.8747187780723051,0.5883305486389998,0.16960803670122093,0.8875455944165123,0.5489710767038674,0.31817137132863094,0.9859572250471749,0.9084151390183814,0.5217522397525844,0.31458560257150014,0.2811770203827215,0.4157213993070674,0.4036245651577721,0.4578787150546966,0.3604423404776922,0.06657767061666386,0.47803338764376613,0.6321155214297194,0.3484788232855227,0.6640517598293321,0.4185535204977344,0.16763012748615047,0.2802858678960163,0.3356183786861353,0.12779945851084262,0.8143698542153859,0.06831929062399866,0.40854382273911916,0.7663407353365987,0.6014052147358955,0.14889064664102358,0.894319526509197,0.030011806321490253,0.15923617864929307,0.8257118420598673,0.12490234176531634,0.31729829998911274,0.4925796699194189,0.07946223559628174,0.920146018713434,0.08708678695989525,0.27996139019618305,0.49352215672847555,0.8771979366499443,0.469427027181164,0.2609878686595499,0.542767261339816,0.4119155622885753,0.9127214317998258,0.2391291879135875,0.6667104902583605,0.568333350532598,0.07470729869377513,0.21331468295459577,0.2824927540936373,0.8181709546529352,0.7361384333737728,0.07739454749249908,0.05265402026598376,0.295247925275244,0.7923539783837121,0.07357215662754069,0.6290105945754616,0.9538689759028027,0.5953008872707068,0.6609065154860467,0.10679239571715127,0.4088146376930921,0.586855938896141,0.3002705960767169,0.2894379021247826,0.6984714726170296,0.5715967138573566,0.48608261006927234,0.7052118735353536,0.6487772793819788,0.8657813482689183,0.3619034686703808,0.6576396304293435,0.798942591216758,0.05345421140084583,0.2317725565326676,0.7151795747958107,0.5268806055611484,0.5429721470350803,0.049276880571725634,0.45311391327607065,0.6321284913217964,0.7874756600666122,0.7671130111761422,0.9695800331995805,0.988480965924418,0.8775579780411689,0.7279512408914068,0.27377265728666234,0.00035352423197321237,0.3393017491000856,0.10572599971840524,0.588096058260811,0.23286367129671381,0.8873960395537683,0.12082951314542023,0.17675246149077872,0.2703203517596553,0.6281140215005148,0.06546383703641956,0.5068183351143616,0.7348360926849993,0.9383546870569568,0.05782596443535959,0.14528974594676214,0.8605523632758378,0.1797282971860612,0.5933072705004723,0.6463906279780509,0.3933355718224474,0.19255688868424947,0.4804595684639279,0.10570756241640678,0.9496104814979611,0.9250888559699522,0.5226989381640736,0.56980499476399,0.6780609813068936,0.2262833800499522,0.6387004614835123,0.5584621267732952,0.8734082936234091,0.9812935451173663,0.7096445726373972,0.4320880739178288,0.7046893696678318,0.2612789584477486,0.8156894240655028,0.13753434269024223,0.13056827055688291,0.3308615170593363,0.07175083460122966,0.7201237123436757,0.2837938654392578,0.9125571448318439,0.9870587360547227,0.6641020090301841,0.8721412445787751,0.4370171837844019,0.796653688304034,0.2330506010401141,0.026033036657383102,0.07134972206027967,0.652636904239988,0.04181535681654269,0.6279176465829202,0.08350045955942753,0.6114328140741774,0.8071234406272467,0.6196897108003194,0.14125268484458742,0.6774807976046329,0.9182481311410919,0.9649351608835897,0.17587928281500798,0.7504090960043439,0.8892548906227329,0.9487715842011477,0.6921608979023126,0.506435536559876,0.6299290281274366,0.17685227355792965,0.6589050063393511,0.9769102647482057,0.8997377658291772,0.28439045190331425,0.45063486503153416,0.6189470884974866,0.8845349931235296,0.48660046168404913,0.5411328533892088,0.9416015412196916,0.7212925303356283,0.8800425900855664,0.8456943482124215,0.94424958342698,0.607090996563947,0.5906877024261188,0.3996989000529192,0.6000371761821286,0.4351277246513874,0.47266222833936444,0.8495226975540191,0.7573470859567226,0.07896084784834811,0.15632141157986856,0.48633911830922716,0.14894050403882675,0.7023664983142539,0.9185781892729854,0.7907682990238569,0.053917151225114646,0.8660125962621177,0.16915540373840932,0.8108732785456398,0.7023049160793635,0.42833411450357506,0.5563024280628142,0.8666681688374247,0.8616703002290818,0.23606254482154498,0.1920997904232049,0.2442963741608677,0.8748069330630939,0.8243499092469941,0.8493246680527171,0.4855260333645748,0.1352910784301029,0.44415686219902173,0.943882375611242,0.07287681572079707,0.917036495701729,0.5902260018928343,0.925469303947771,0.3791404431743586,0.2555325088391416,0.7042085754832148,0.8916246734237987,0.9942076709844658,0.20348987046134637,0.08316235505972291,0.554974587875386,0.6408379106855568,0.9410654380686705,0.26026289018406,0.5416722005821781,0.9500363521180535,0.9582070433448886,0.27890029196675936,0.43645799717339284,0.26037191938193116,0.31690468964807783,0.5552065142573721,0.7933852740432139,0.761084482387381,0.6292911504121232,0.708188917989441,0.776579273383323,0.9485098453239171,0.8860922342328446,0.3640753951233273,0.3573374400264979,0.8146093117079076,0.17756627697563898,0.25382741534727593,0.2727013016120934,0.051272483004224156,0.10255344326526528,0.7053785776013817,0.3640328203066152,0.3468113429661914,0.8939393073508894,0.9043516633376418,0.15092939920517945,0.8512398354891431,0.7379244880765807,0.9084361543206467,0.1686122331040225,0.2941122867763333,0.14115778417961544,0.480564392827334,0.5543758035083362,0.9931682464259932,0.27320208719197625,0.3778272767041908,0.1291181348382584,0.8071077957268793,0.5462861037736064,0.5381143865573075,0.473623766576883,0.8332074314603615,0.28873475241645896,0.020216813748952456,0.6211125639598083,0.16057036122253887,0.9543146241311491,0.75053434668646,0.6175056460087993,0.4137535196518016,0.314428810086832,0.3020492028756141,0.04010125329420955,0.8792392916691538,0.07920077975395512,0.038278496450881994,0.29108452106197213,0.3853052828320329,0.06822655734932082,0.5935180198978305,0.6900185859133112,0.7441970228871904,0.7207137784386766,0.5250492567517062,0.6427995454699726,0.7115993552429667,0.9637820577653229,0.49895683597174534,0.2480525922982384,0.8924324417590639,0.5596429732841561,0.7448308916054043,0.17624452004973779,0.2841232994447733,0.16422869877223945,0.23891811275831376,0.332177561116616,0.5722653723292479,0.7424977401234749,0.6353028708835688,0.0026835909964550986,0.9197110320399811,0.6583508653363312,0.31780420961322964,0.19357981949247383,0.7616946426708577,0.8325882281642292,0.80510169506561,0.2157250913257034,0.440227270074671,0.941458657854747,0.8331292394069789,0.9461163044377359,0.21254349039744658,0.2187841170863818,0.36661205237265215,0.6160384611005141,0.9328680482223315,0.05012374470939496,0.7069869125927912,0.07606901882442463,0.1287609575126012,0.6965275950964505,0.036884020769963666,0.9536662882634346,0.4209939113066561,0.7699624845114172,0.9255269195770346,0.6661769846766694,0.10304707908675104,0.6424863648304413,0.9222107552501437,0.14112488096778075,0.4979998610284275,0.5056643620482575,0.261518084129428,0.06682398574054282,0.5435401475423784,0.22766057586470811,0.7818462565136903,0.42713923207710414,0.23041277586875974,0.2756917096829363,0.27958861446463246,0.18403068418793023,0.8699025619402634,0.41022657786312466,0.07047242656178643,0.25826743741762836,0.342078830079227,0.3651357661424117,0.871567411157337,0.23335593050468884,0.5563282713591344,0.3190173052446501,0.6238019942281159,0.7574113202405595,0.8597449920779452,0.750162846527747,0.8551548885602325,0.007210537659635863,0.5899407203126259,0.6586453286322889,0.0298396275283479,0.048625460937332665,0.007072315452943512,0.6964609184231427,0.6479820406794883,0.7692128254313846,0.9747966609672443,0.7202525248524112,0.7931317416840831,0.5849036307503228,0.09554289254687576,0.9023815453250712,0.7054206394232385,0.04790691165442462,0.13591570830226973,0.5978100234342385,0.18993800857275134,0.42071420478039134,0.5707397189618617,0.6397670050735988,0.8172239142535533,0.43288035554167714,0.6020743206375734,0.6551670697146701,0.06980710743779883,0.4785661491636579,0.7607189282202491,0.8460178875505013,0.8519193888058232,0.5483068138451666,0.041216318665929785,0.8679350200628255,0.32647093675732575,0.20594208913874623,0.3302588414659231,0.6548023042280857,0.09305561730084277,0.32996077686472014,0.92101264591396,0.20167135063853192,0.09580553862014285,0.132547718551133,0.30140548066993733,0.046309797589445534,0.653510078003287,0.9703554999298198,0.7938539909362006,0.8532033191039037,0.10030961593344112,0.7739688170448911,0.8671228915792626,0.9412367090501834,0.9747459468637207,0.4655117924354708,0.44157738018935566,0.1430635839002261,0.1263808214708373,0.2345227606323259,0.9185914631631809,0.8689769073500315,0.13075836241429517,0.6357527794489863,0.9796199712542097,0.4924956216563916,0.9166917314777547,0.8051808807548937,0.236688787665019,0.8996138150717672,0.6555412194463326,0.9064494260672331,0.16395685831039786,0.9171646405771643,0.5961003522340642,0.7872007135811987,0.1057068485223902,0.9654258135460345,0.3318041334206685,0.9467907047943018,0.40798054529514216,0.7932397066983483,0.5722260237878589,0.6018999088922319,0.766011521445837,0.7296092716391955,0.21121023776849301,0.21914345869121377,0.8636320464281038,0.7522461419458994,0.9960959855539349,0.8004385406700982,0.6476840655413316,0.3863744720164921,0.8684607956479784,0.8832598212136935,0.7823560804621099,0.5438435800751706,0.9147275504553138,0.25201462503924477,0.18604802709157608,0.4665877395396012,0.5681093902227103,0.42414053659311635,0.7499695429946394,0.9870129006245374,0.33428971953429665,0.8185083991116266,0.8145239493614203,0.07011612378027987,0.6348511829750458,0.6639084345379438,0.0058335377877367645,0.46695496255475444,0.8750020978840256,0.3520603166427425,0.8278010960423932,0.4653166836620195,0.6892212134076869,0.6992607255811105,0.8722431039808249,0.1453391827627133,0.3332089451960052,0.2854505716900373,0.5134658044650513,0.3961320875925167,0.11254579843081047,0.2485717631133031,0.45149812375936005,0.47615459501959734,0.283038478031725,0.5997306059181944,0.9474433691213191,0.2727574920870266,0.9553265911727848,0.9055062169006691,0.7107347050749222,0.31890683751301263,0.08042159926648806,0.024748082178736253,0.5463742107902223,0.9343289753200248,0.5046176663339579,0.18814934507849523,0.5640501265763871],"beta":[5.172645517415326,9.74602110672299,7.524684196996956,3.3001544517669434,8.727925903239392,7.891398195017494,0.28661998095846686,4.66105003769437,9.10858247583623,9.525838347609577,1.9505464365698266,7.190091379773427,5.182594624249899,6.817013572395114,1.4363743591707956,2.6541195084765357,8.386987907158376,5.988267476185321,8.883819939727706,1.3825625110273254,4.628525026315158,0.4136901551788319,4.649564447759449,2.8263400516473625,5.488939106685187,1.3263531361717873,0.8334101413863304,3.932566769914696,0.24000470842733046,0.8754455590674537,5.032934827383393,3.2603661048355015,7.13117266281462,8.555963589121022,9.440692622251765,4.359043232237918,2.4025994005421403,8.824750891527584,4.720469702719079,1.6897890869201238,2.876263505828036,4.1075653445125955,0.8429089500657017,5.448359602160393,8.678241088621956,7.486231572351281,2.4878584817638205,9.697354405872714,3.1559883239571684,3.7695430827639487,0.1279833982245293,2.0279019476811255,9.766060099723353,6.507037187762381,3.076700310143188,4.951273273262215,1.8023670202107778,3.484435486267974,8.696392931979435,8.957018637376136,9.64886322923989,3.4544674005396647,0.2789781698961358,3.1121595732540164,4.163072821971532,4.991217231269154,4.614154764632903,3.1813716421241556,6.306741139479197,0.22661521399631068,2.5655074926539423,2.399165538607424,7.761718731041878,7.045620271024784,1.4162478476488838,1.4799674016172681,6.220495876217416,7.467646109379031,8.165893688624351,8.65583263982325,4.6512009270122405,6.467722303808905,4.550804031187575,9.390558243254254,4.209300386480582,5.784189264905795,6.635790829993509,9.849394833699687,1.816525009162322,7.091676958828764,1.3200301700383732,4.267689025034722,8.790973046225734,7.880989361257333,1.6743898777946797,7.577660189414448,3.5996872203232577,3.285260129715708,9.980432799355274,0.48364583600009503,9.466759595657292,9.702152529663358,7.862457813473782,1.8895451609312142,8.77117663289717,9.116987265129122,3.163919729889022,5.741311995737823,3.4661948810870236,9.46014302563766,4.6142324402822705,5.3118877648863405,6.815484592868231,2.903969990861903,5.413268908705748,0.5755954503768757,4.75652711123619,7.830205569409188,2.2211125326662007,2.35927432646164,5.9685509058741815,7.285236529684591,7.653523108615152,3.840662327483566,9.421444484424866,6.160006851991375,0.7108418007541895,7.9383156510397885,8.872764337301003,4.319593533203969,6.989838091130814,1.224980487784726,5.202855746484607,7.3398474054193,6.487059417644074,2.5956019362599836,2.735578584760312,2.314651027349539,0.38395680692512535,3.9239022847804716,8.806987171928117,6.249050065955273,3.278644708715799,1.2676807717011473,0.1714527260507137,5.220304890981627,1.2941098963644593,3.3639371822660413,2.2772472747280026,1.229301794206803,5.10759954564927,3.8412961144386704,1.5632788851996793,7.856443593739371,0.632883384476346,4.593071424648283,7.270249700545193,1.2971158897089907,2.488333374027245,5.441293627739039,4.297792082353029,7.296510943018779,9.952680613831028,8.179593874133559,1.9166827451633495,0.9629231059716825,4.362517905107146,0.7124661074488303,1.1708437190330523,6.559162592839547,2.5516526226726066,0.16085648288098886,4.7400051654739155,1.6591155083829134,0.6654278574848993,7.363271881581883,3.902256204996477,2.446664372906908,2.5058682592274595,5.216412351320876,2.907484938585987,1.472533126412996,4.981290331148001,0.4824477968124419,5.7735743064046385,6.040676042161268,6.29517093759036,6.785866966769305,0.8291679326860346,1.435972682840645,8.940617125987924,4.128138080643399,7.316709101384069,9.786409471898654,9.461491665643171,3.3691332350585657,7.211158634289081,1.3920610107724118,4.425946918700239,4.799230743168574,4.77104959852668,1.457560538069036,0.4292597377049745,6.2596511422612515,8.671860978923114,1.9961907757610198,9.879969304559388,0.08463804192269109,9.667407149572604,6.404422187875943,1.2946123887935368,0.38109649204464136,3.2026900004463488,2.6396269084131596,4.103733343109354,4.863018426110102,2.67187930017877,9.636014598397066,0.12657138858670258,4.100273507511218,4.179129621786258,3.086852981121817,0.21056399902054768,5.3978156396497905,8.781377632252092,6.082182253559285,8.4156911101248,3.7492782875697395,6.996927944506906,6.332547660799774,8.24232723397287,6.459508616369192,2.854923305241035,5.542857120603129,7.552267955346048,2.458754435344983,8.607852611613005,3.481760863259382,3.6905625257067465,4.7914984077712,0.6780964102204279,2.3476297683957026,6.490467243526792,3.8843356824839947,9.158602775559391,8.162829757893459,2.556177347447466,6.003750712569811,3.6466183478660663,3.9611702682612338,3.920323413660385,1.020340332326246,2.7331011844928232,8.89197461095421,4.863872931440336,9.743811639147104,0.26903739522585957,1.1583646485798327,6.715970701764295,6.059830824422836,5.407607884166463,7.005047481510984,6.0778715299630415,8.78637732229116,5.925276429768013,4.637602021887012,2.570913792854037,9.74136497220597,1.5982358251268347,8.663450502189933,1.1160107522784002,4.4146706015339525,1.9120686232541995,0.46477624792907957,4.029895868384732,8.451898690789443,6.119532324000008,8.556335120501776,6.640449661775369,3.698620679582696,6.445248544939492,4.78262258774564,6.70369235241552,6.675683679945353,4.555758060598474,8.097386153946003,4.078103961806551,4.921150947173977,2.220379795993541,9.863779302782394,3.46056591371378,3.7625202170816507,6.324158718884401,1.5822039954273959,2.7077469375209606,6.714552023985898,3.372390802725329,3.0628727566485114,5.876584014810531,6.12601678736171,8.597468892434573,6.7709997473208805,5.0617826539101,9.765171957971475,0.4991828944404153,7.436755842889989,7.2856856517881745,9.384584668074032,3.323655453590826,8.067712807446629,1.1635015146008443,4.289827873218089,5.732028858958218,9.42636789849545,8.901342867467555,8.35908370044202,3.6380965444629942,0.6478618302737593,6.670268802136037,6.538148884123829,1.3507939855046591,0.6645327915880195,5.272022075985403,4.34645420499063,3.4878472606030786,8.445243561327803,3.5379316302477237,7.106793259232953,2.2012687964891398,3.517693079351336,9.41904941018671,2.2700800514921737,7.422310943015129,8.002382278749794,5.2560381723728415,0.5855908282601097,8.62975349675466,8.470721601688115,3.0846755575603257,6.581439542134648,8.1556099081119,1.149086367982346,7.565508751657848,1.8787626110069011,0.13819076437523448,6.752836078523872,1.2997768282418964,6.771460993166061,9.593693698871563,2.064749691405503,9.484187682373246,7.757406107101435,2.6738595544898636,5.369171022736936,1.7724543355743405,5.5101773486894245,9.469732307771114,0.46686552943368653,0.059258484263917666,8.911738932812437,6.517725437562431,1.1894897580640795,4.133428091530145,9.884806852612638,3.754522596328844,1.3463541962937908,8.292480405023586,8.681433418754125,6.428361817399335,1.457641242460177,0.6400648731772085,3.2987416646253886,7.98063054438188,9.681004307727129,1.2410360681826749,8.68821877281892,8.643055014496513,7.094934203648259,6.459410322832091,2.748873402763281,1.7415321331125444,8.580686045013838,3.901020789023799,5.429123615352873,7.8936930449099,8.002591220663522,4.209207050453458,6.527360405015157,6.956564370292007,3.7332052429739693,8.205428020058648,2.2033951095386595,2.0184344988380376,7.468078820783992,9.503595705528525,7.783551019376138,5.094167005895647,6.846260431657485,1.012244503806894,0.9567913103558867,2.63963610412862,9.830339912222147,8.56578577318807,7.253218756654514,3.200493057747462,4.856945468754108,6.260059805762463,4.262259022671393,6.813463047404427,5.947207257872269,5.863224051366222,2.9242190466335605,2.4536098060162304,0.8726495577057758,1.27396318773493,7.440031211738038,2.044427257716279,0.2554376254990287,5.137959151002116,1.9108290407701123,0.1424359670440456,1.1503951238312093,7.497086470048979,8.687590915298264,4.687475839902595,4.564260263255518,7.043465616232258,0.9905473976538959,3.435990417589312,2.3728281253644856,9.689982941601059,7.568752936527385,3.6936331630875463,7.772642925362289,8.902254789101438,5.6254769407991585,7.203794647492334,6.013254450890269,4.068710563977305,7.444832658002987,3.1276421024196277,7.336791235231965,0.5068734127032992,6.7201712825036,5.78873779571448,3.8454444329653437,0.8891402990083419,8.9318409554838,5.586387292887814,5.605859625343264,2.853049053049461,8.46340123752254,7.881770904089431,1.7531757381163926,0.21739234820258968,1.5169907810565308,5.868995879467787,3.371412208331497,0.16495936333633443,3.5773710605429154,7.021043823448901,4.441968985277196,5.533165169740726,4.049523664526749,0.6128431087833119,2.4407268960382056,3.4276319272585187,5.920331670021309,4.760478864679067,8.169527976512656,2.9413190249595678,2.5344225807819964,9.054016192444827,7.46484478128187,5.7611076771626735,0.8173449262901711,8.302936454566765,5.881031887445065,3.8512167393879437,6.461458150525559,1.1026293689197897,0.525354594030214,7.6191343038118635,4.622142292128986,4.00545420602408,5.520585907701023,9.967281662930427,9.457968944155128,1.9645312132393733,4.9136112938307015,8.477913158291027,8.975555185267524,7.305374331068468,7.934836431138255,3.8048667713087725,3.7392505347935834,2.3608748694450976,0.5105610380837344,4.722458651792428,5.813381039847741,1.1847982618077735,2.8766758454348706,4.530408526397456,0.3678846091516763,2.418720431434791,4.958983675291908,1.7162214876772897,3.285586138015464,9.446200093634143,2.289038145002975,3.374995422771163,0.6164816687499419,4.045982643468411,9.463862569477763,5.9153284504898345,2.37068565399563,5.035727567518393,3.9874909235914124,9.760064602682855,4.335934063172973,0.35057510809227255,8.418954717692092,6.7330716857504775,2.132796203799472,5.555199144415002,6.298616407532698,2.1019303537144163,3.5820668289000435,0.4091960157974772,3.3946439079296975,4.671238593492506,4.397969899971416,0.010675971433344866,8.590028151014888,6.995660079597757,0.6277798658569322,4.517379367103915,8.42521482311331,8.738089555853144,8.402980323801382,5.723414438366596,1.3164732515365896,2.869039298278364,3.4040530220793874,6.407010000826214,8.237753967149427,5.383862980986887,1.9208852947428112,4.0900793381978895,2.4407966549905047,4.919986659497761,3.009789347806011,5.131872635492329,0.9140981996360487,8.797781548741737,0.11644637349860654,4.0245992138518005,5.888605469122645,6.087289554792603,4.063262131794914,8.854950481205723,6.492687997244683,5.712854594042764,0.595166125897304,5.785138958897362,5.972613722426184,8.38876884914596,9.098106856003064,1.923655085468492,1.5708157720696603,9.910534518244859,0.8863991717032271,8.16539878603102,9.178134102694631,3.5103932371510194,3.801376758346877,3.0129614796231508,3.5869418392127184,1.580460460378883,4.777536515858829,3.7388093904579267,9.61902504928824,5.836946583580898,2.4658327827986315,9.751625098489175,7.908475689919183,2.476294663236207,7.045706864453869,3.238054752952988,4.660497638554482,2.568907155474933,5.711415398375468,1.5332696443243066,2.7338548380919003,1.2546166567450356,9.175651973621585,8.407982826739772,1.851803764635509,0.904653930993522,4.4535626748046475,2.5609270974720144,9.510379411581331,0.9458128998278359,2.7034183658923183,3.859507925473502,3.783103501082965,7.193892773971992,5.388343044042998,5.970585093359013,1.631139902080725,3.0492282577990726,3.1927200653584853,1.885513809736974,6.785697486617648,7.925422960230948,1.3647187721753062,5.541346398501775,8.843033828575486,3.4221828857189074,3.8490496531708063,4.019894097974619,2.451691268588141,8.525963816973047,2.078676778218862,6.400231750078012,8.968713260747617,6.790462375866825,5.7609217138481466,5.424781483493668,1.522044505808835,5.123102369836385,0.5109304161331241,2.2805859685000596,3.6636164385294934,6.97330740696585,3.726694921659739,5.1266654414991075,9.685951800728034,4.870103436426573,3.81517244865778,2.5159768983454067,9.623257867988471,8.979707884213507,6.6834855046536585,0.10705169745518717,6.266818106984113,6.99740357847348,5.685460741555062,7.761546944785199,0.2509268660732755,2.8315640093796546,1.8152656633023567,8.089252278883388,9.825740343914118,1.0139010222952227,7.746227169901094,3.5780102167354855,3.363464045671407,4.133323570076753,5.237999025855473,8.645589089415157,5.8419100288085035,5.110643490461539,9.684101116576866,5.299696865384515,3.470161425021756,3.3362934469629035,0.6309242640634793,3.2571416711127954,9.582452997767891,8.218014908313398,6.803542482198601,0.22428222097393924,5.388030755093192,3.2933233608347456,9.121259582598052,4.471358218660355,0.7126508654594588,9.841369143296074,4.8510514772909,2.8877060472270943,7.690168069225032,4.893989098429654,5.530652979387907,7.376545267405589,5.392379798900546,3.0331349414760167,6.141218087205733,9.15100964031868,1.1238718724285035,4.7052330578998625,2.2697865819222263,4.8209614366599585,0.728107033223766,5.268731345422662,5.428026678627114,9.270905520829462,4.538874438188476,6.0015405541238165,7.138271252343227,7.6499438024544775,1.7675167680605641,6.7534091978150235,8.145835922153676,6.296140296006767,2.3159174481599742,2.224386016810931,3.3533410243471184,5.968855221662521,1.756308080513178,8.822060331880843,5.803821427589069,3.5341844507270626,9.418469851432729,1.8899928425601353,7.7778132376391795,0.09877614914601152,4.589164799233356,4.03037138407216,9.496452902159016,6.104985215113516,1.7613364043948576,7.669036369207161,1.9569357290195577,9.187479005836266,7.022469211284985,3.9137871982190964,3.1137778262161553,9.411868512423165,9.794573630691094,6.96900156186766,4.4787110135671355,4.5800419800391845,0.7615108296210771,3.7302192798597655,1.741223769053255,4.776891862507617,7.898223481721414,0.08243621034325077,5.456864969987683,9.006060537041073,5.882689779649284,9.253744292811852,4.829900237262894,4.8606255136686745,4.0991406619832755,2.2522003897700094,3.728976234028789,8.185914094938202,7.080300174594738,4.826604019323158,2.373921560468508,2.0331717603766464,2.4499381581079693,7.402785202314234,8.216070642251747,4.134329802331907,7.248018044432529,6.804848796599618,2.5174102271583787,3.9318813271191977,1.7457541176057112,9.494293013507582,8.768054205601452,0.8471484489884906,7.756108111466911,3.0082423118744694,0.674071630900186,9.213401177318861,0.502091877339339,3.4216692578253682,6.357685383997362,9.373894782940543,7.578435714063751,1.3419947108984531,6.090262368716517,7.654802468013608,0.7446903243033054,9.973161946951752,3.0363419645216827,7.421371170159863,7.648803506786102,7.598475690584046,9.076073035934435,0.6974471250073688,1.6849590845692464,5.472565855889037,5.6404859624984365,4.397107000492042,9.901836250975784,9.582048443152598,1.504598944511013,1.8091172392761212,8.711211870834587,3.016453972414519,1.6081987389264363,9.932543193200043,0.8757400419564632,5.896688897771019,8.121056336103404,3.5626215161632446,9.345335828030965,0.4176914278156696,3.524123594798305,7.500260415561241,2.9983564524300577,0.1085634506359412,8.551416684265634,9.67027236027847,4.742888078938787,7.742543681473519,0.01185354981832143,0.45812191690453474,3.3278429918818397,0.758934258581907,6.207509589757214,9.256397952926438,7.02036690321666,2.927486593206148,0.7576160213184857,7.5276222274970035,5.768215763257154,4.863440863356265,0.9697770344688283,6.047823929689436,1.9698849547860542,8.161997763523775,9.86092363815927,0.13867223289285358,3.3212129723671646,7.735741899043759,5.828796239875508,8.4636286490754,9.731984656180863,7.709351507463856,9.040835561953294,9.221179004120488,4.04206110990142,0.6640143811707699,6.5907282899914765,4.535027142838484,6.391846439004809,9.80217601443737,4.212611922627422,0.9037200527547551,9.572098507652813,1.6040285856987646,4.651721968957416,1.6346505212932194,8.936006277315888,5.827194910510292,7.947469122411417,6.481381929394068,9.493459400977608,6.928451132909117,6.089022615073734,9.598656968599961,7.255946153762154,5.985321485477679,6.7568182209195315,2.7693872640983086,4.307764035744315,3.856198889815705,6.083912175417616,0.5515175866751099,4.976233971463535,2.024985734575935,2.9693379626003447,2.0004597114198397,4.1162058238663395,4.574916717627295,8.186605731579121,8.006016180251239,2.419863222097396,7.579898213857681,0.13286982475479103,0.03308287192742787,0.7224512080430912,2.5316303036088406,2.8311528178664602,1.7465173765738773,8.500359437962604,7.1425265562960405,8.172675885264418,8.598354458294047,3.519213329532729,5.834665623223825,1.9729514429394346,2.5116098524946695,7.510810264565773,2.924528273381495,1.284850417130179,0.9654969662212132,5.577068920380642,4.500833664402095,3.294967993022957,5.881254671599412,9.247259709781524,1.5154900462538379,6.603803110959145,3.609210271857286,2.3950366774696707,0.2888832648511941,9.491551676120535,7.733899659607726,0.8157576214547357,7.2235875035011095,3.0289291613604585,8.209283017933494,5.637988781620873,1.2212440332970353,7.090741232435982,6.319769161924267,3.705530970744597,5.511440131413588,0.6791893674532345,4.285408383186288,5.633662588481545,2.885783801929014,4.79100405598099,3.3046047158055436,2.6001103013350924,1.8733311667937524,4.961569613577426,7.791604825268827,4.661714438590514,7.041670881661495,1.3453761705139256,7.87090560296167,6.413634552887741,6.712994727467305,3.4914848826237876,8.217280043585141,6.903812990453202,3.028640136191627,1.040722365198068,6.3674661438804385,5.729169512354448,1.2536759816816523,1.1490375075197345,0.30818372697360763,1.846660763498289,8.013448591514912,2.9731467644816068,8.988744508594246,8.007843549530127,1.0492778759479982,5.902667183894332,0.778711835391197,5.875582923798676,0.66489912200284,1.5239738841459327,7.598577820503182,5.986611307837282,1.2767618503423517,3.2449313248476286,6.528561754160405,3.4832138905491083,7.620483354995573,0.765186426457265,9.531531304537694,6.867943159972018,8.759235129126562,1.5623405030172877,4.659421870173606,5.3673139807098025,8.675452517663931,3.1529968831777477,4.736630306924024,9.629978908477117,3.0692953392938427,9.867351284467027,5.722526880563523,9.246816509984386,5.237976203755941,4.3199723468617375,2.548277338847167,4.686948732779353,2.6821079371126477,1.883607873380908,2.3998319317365624,7.08363313005165,7.179250543318416,8.549241987132374,0.4289804050869561,1.9537676573721896,7.971376699432049,3.0588045952397303,1.1521933147908547,7.300254478518589,0.3767130941238306,2.2767481516333365,2.8417526382529057,7.061157186773574,3.6623875978553477,2.1333788818497523,8.543019745784775,2.0564559189190468,7.377480272024282,0.5789065518517944]}
},{}],28:[function(require,module,exports){
module.exports={"expected":[0.7727172854071992,0.2363350255622315,0.9875304112518325,0.7116928766394715,0.19392662404847463,0.7312133786606614,0.9942446106486679,0.9292715032834271,0.9999667595576986,0.9987247781231058,0.9887743841081422,8.685863762429297e-6,2.86861325813532e-6,0.7964779257064446,0.8437831783660796,0.7580809603762094,0.959079465992319,0.9963965624485044,0.04576391160750941,0.9980226251795272,0.9996887196272867,0.048518848819632074,0.9783227998314752,0.0919745582838861,0.9938751617671786,7.0064045626232745e-12,0.4838515092245182,0.7990086878833451,0.9693007894626166,0.10803293167805512,0.7228301952739107,0.008138245719981018,0.9916907855313575,0.9966041542852496,0.10313813174263853,0.9982237617159107,0.9986720647967627,0.9970606390386332,0.42260166177456754,0.11249010567192257,0.2525740568957388,0.9747768427408705,0.007727253311543298,0.9971582258293007,0.9299559219627572,0.18231330100519366,0.947933920536489,0.9996852043998715,0.05827649493291746,0.0011088091676831177,0.9855150735914449,0.7708501392320994,1.3342070794225095e-5,0.8756638009703652,0.9383916987283119,0.9722129679020637,0.9954064670540625,0.8423896998612991,0.6790933064751605,0.9302783303745656,0.9616194185248272,0.9669066769904298,0.4010267251496464,0.0044321704625252915,0.6415965677643853,0.9945440998778672,0.985435622706121,0.7573062685235538,0.9693483983219238,0.8725972227888844,0.6950934613104703,0.06062658148357463,0.9943059099510564,0.09980032581754367,0.004680772015169955,0.0793211124100898,0.8914157759505641,0.1431006285012937,0.9497316033946035,0.8626433148377908,0.37995101150193844,0.9658270865145661,0.9999942595316097,0.06435502646217561,0.9817037570246046,0.7526951417035039,0.5839691667038529,0.31930650169593755,0.8288609560558402,0.6061033636955231,0.03423289668361718,0.641390303027549,0.28971094818596776,0.33534714415894196,0.7554175078192832,0.8299085658258158,0.8572660704468936,0.4850130703692103,0.9995931608490249,0.5851259162047852,0.2670664409501187,0.8293009483500728,0.9947797543063293,0.05898894164012233,0.9849161780371465,0.9632465185337757,0.9717910659770924,0.7099354881215847,0.9882959736493016,0.6691555386630357,0.9981520154263547,0.8298942517491944,0.9986410300649877,0.9995002845215903,0.934603811258061,0.853666044320321,0.9930314845720937,0.02930754098664641,0.5551707779617936,0.9998981660199318,0.9704222545086469,0.9000389181095168,0.9993195652099511,0.9920978996115455,0.9771143381817701,0.9482809391447502,0.975750812820637,0.6983947501365562,0.05695976418162905,0.7999775148740541,0.2966675152273194,0.5141744505791768,0.985376145769921,0.23727821936124682,0.013434037184493174,3.382242384510265e-7,0.6848762507281809,0.14619848089110823,0.7777388196480849,0.9990395940514829,0.9999610655697084,0.8883147472419699,0.011861008931660288,0.3103189601521267,0.9998693095301948,0.07949934435564464,0.8332652913092553,0.9982134866191041,0.9999442409329824,0.40701522596553896,0.9997638050156337,0.04865097772347194,0.3474024546888275,0.5090420889869396,0.2201574772384565,0.00015148156541019322,0.00929403189339416,0.9871774748563793,0.4550692556393351,0.9120153024529734,0.8870192487644675,0.28279046360889293,0.9399820147905343,0.975612590238639,0.9083946015589257,0.2417789311811638,0.10675285539947951,0.9999107266792286,0.6404857835237274,0.1271783828634642,0.9055879269108795,0.032817676254922136,0.7269561106748728,0.001114773469271283,0.9456116529895521,0.021486680006050272,0.9887470282185435,0.9999234138928473,0.6785573702226102,0.92749289683504,0.6354188495525785,0.01040057371801973,0.9093972684605145,0.015466471642538943,0.9994488031360462,0.9991937015851026,0.999589957031092,0.46480365887331265,0.9992383143209964,0.536809790542513,0.049745897422068835,0.5473285137950349,0.9996417561318744,1.0942718944341814e-7,0.47994174173809573,0.9249394564453919,0.7650369277566819,0.9179995633159159,0.06822325587151225,0.07362528792035244,0.9902086917249628,0.9999762875861964,0.9919432992694307,0.3912541696274331,0.9999838821186082,1.0068963955075088e-5,0.3153401996181984,0.9320785089062275,0.7346765190860687,0.989566925842517,0.9972525239232558,0.999728401359183,0.999970432050352,1.533503533247564e-5,0.9973370690599868,0.960821982059974,0.9982786390417543,0.32447157699623597,0.6728732704835345,0.00029532039989720927,0.9975604284795438,0.02428123199914423,0.14127885170516924,0.29038651589108583,0.011054790017149617,0.9955301823877079,0.5953329621633042,0.011188291883780668,0.9950001994371063,0.21071440182684345,0.7122246318479686,0.08034599393077253,0.37501742335006016,0.015713139159341208,0.2750075266046176,0.9819368356118692,0.7453555215430556,0.9999996436590651,0.48309877925525085,0.3515651077219374,0.05461404519638737,0.5122444194843365,0.00856362073973096,0.1424244668615118,0.9820367172029307,0.7196126874005084,0.13255694873323176,0.8523780154933687,0.733091602877824,0.9991293972217123,0.7075649765539787,0.4541105693204217,0.008437090360958768,0.004570052472131947,0.6771747117501795,0.6694203966938745,0.7611769579581821,0.8845916793546864,0.04275777695399037,0.9992734142386585,0.10256745390166262,0.9095134637098137,0.0009463462565939585,0.6916496097032327,0.9825020315524235,0.9999826071818974,0.05941453819942653,0.9387018509404361,0.9726303262761176,0.9983195190226694,0.9997884995141253,0.1522593827094826,0.9579371722023873,0.8981799447189056,0.9954317850696698,0.7416115392284129,0.5906108781783856,0.4454682519047037,0.004853548166625642,0.9999242167673894,0.9802780897045105,0.030209046627911847,0.022173938074140663,0.5874397492144681,0.38175363558594616,0.028956248524623734,0.8476329092208398,0.8151470936876067,0.7995406997957324,0.1591712990279632,0.0004481322156812245,0.5434730165217833,0.8097122367031522,0.8878731443691552,0.017526131102443943,0.9145293965302806,0.9429574840658907,0.9937307705463694,0.8425580443378803,0.21940299691834586,0.9544568117154939,0.9912120387515417,0.9250900910126731,0.07537410904646673,0.42737354456486876,0.9977029317995351,0.9849142712974472,0.0015733921098792874,0.9327923031236993,0.9186775096592622,0.9997976949582434,0.49282708598248487,0.9860605002386256,0.15460804382188975,0.42404673497384293,0.9475932509952183,0.04417937193206571,0.7351849171210532,0.05047948694172336,0.9579389285160429,0.8812348698412995,0.9924953213954062,0.9713264201749059,0.17579025640077675,0.8928607546619729,0.9980096320175126,0.9808832649952984,0.9703506836179294,0.97829995638465,0.03587841579788057,0.9409775507468067,0.0016251573332176725,0.00017757148847155084,0.9569810908847332,0.35427645443954386,0.7598705510752963,0.8378683902679664,0.06572263862290773,0.9281212453956524,0.6296230475286032,0.9807064595328769,0.13117799335673141,0.27949652607714776,0.7126391682881998,0.11813786722255165,0.9998367243116402,0.9919617495183175,0.6566428608724941,0.5911697347258482,0.2929378001619279,0.12657441572525563,0.02249555544710178,0.1258004492187492,0.9998190709912929,0.9998107986573772,0.6234288050930759,0.774597196862465,0.9966055023942972,0.9877167941658171,0.0015494027137056847,0.9998854177401018,0.9839817898591445,0.9968092504039283,0.9989264322798512,0.9992789720218384,0.7185756115585774,0.7873895939677606,0.2982424314152317,0.22472936973062393,0.6037766400200264,0.09742121964288078,0.4227688555102918,0.9972957980824978,0.6515918830940292,0.951551974516574,0.05841820383229515,0.8758398265486604,0.8274843989724786,0.31363723327818,0.028226182785275673,0.9999259183570166,0.8915815902916299,0.9732885016190904,0.05390017494185665,0.8484775100997912,0.6362306571391775,0.9930871796145704,0.8091917215620366,0.8872128306931244,0.452184698181601,0.4754854147063143,0.18417535165737448,0.1782527076393588,0.9994909722270473,0.9278050114406968,0.9645189928936256,0.9997903302988254,0.9985420252894106,0.753377167834957,0.8365078870088333,0.9858349900106487,0.5459341842088441,0.015276054229875482,0.6313089195100006,0.12047187243532027,0.9673093525837921,0.9443165923228295,0.6996998905219705,0.8722797721772119,0.999997569001093,0.3989510935758915,0.977227663773497,0.11307215854391765,0.8620837488092417,0.6354446484809363,0.0005725487001788665,0.998565873892664,0.9532368551329433,0.7398832947327146,0.02320271294341966,0.5176297881616362,0.9995806849439143,7.400991483969405e-13,0.09124710139056667,0.7161284153998456,0.9455227244522783,0.8570688666451174,0.998046172225993,0.9203613926702047,0.7866139170422016,0.7486272958823847,0.7400196830695661,0.34931187892655297,0.8786510742325352,0.9641159340742537,0.9935809570073193,0.002238647722106259,0.011919145559448986,0.6636062866808996,0.9558653415954387,0.5506622995686636,0.5800985163664837,0.9992507919080443,0.6233164938787834,0.9999991759526049,0.08018307809655906,0.6394715584489332,0.06323643054932312,0.9182269560716818,0.9716042427065442,0.9996319215189721,0.04587438268545752,0.8919264447115625,0.7775136694237694,0.0171802957510834,0.9993182787177359,0.005139770595986249,0.8576567765154561,0.4075359088269925,0.04105811714831316,0.3263922317228626,0.9902043836367636,0.007106415380636808,0.9999438405449836,0.8538974066963113,0.8114286039165035,0.06914966198231445,5.223831475253127e-5,0.8389826035171462,0.15573644138060572,0.3362443484869872,0.6906168526706288,0.6308382992554566,0.6236340677719272,0.047841937217183134,0.999856274289382,0.968253625212629,0.3412721891809841,0.9849298856488942,3.743788344186331e-5,0.9997152912616458,0.987717366591421,0.9980076775774296,5.385604549553067e-5,0.1522782935412237,0.931894990987628,0.9999785780688124,0.13406476724940583,0.4479732368596677,0.9996796951320799,0.9128258938360266,0.0002655452174294613,0.868461284460455,0.9927855420522851,0.9850447060887765,0.7411402412761852,0.9978866497687395,0.9739100121204554,0.02795581967164463,0.7819977769141916,0.07557840583912165,0.9654698123126322,0.8904475122998743,0.06860854758632666,0.019699034589050396,0.9171915331630547,0.9882424292317609,0.9247379664412845,0.9389483765310765,0.9996105140512908,0.8244678134685829,0.48397888981290116,0.9886859310320957,0.6098428208094155,0.4326333613841968,0.007275009902939145,0.9699679964898873,0.9981691820570556,0.9952469620189325,0.12466890703818108,0.06377915742160199,0.8629937426343304,0.8111150048070234,0.9982836687399184,0.5655760837130097,0.016886729921847345,0.9662235190468356,0.7449759411321477,0.0013879839047638122,0.9090500159262449,0.999704486517685,0.9745731452170509,0.7749229656346062,0.9940778241486449,5.1892049899999855e-6,0.9991514729327837,0.13024950859404785,0.3465094908824384,0.15603221739904316,0.28390819298377,0.9822399014677174,0.912319523798035,0.0017983647165899241,0.00039138914495377177,0.9996208504957265,0.020194367017032235,0.9984409942985962,0.04877657951737898,0.008773892428468755,0.9308199500318282,0.06812453660017505,0.6856658643006381,0.9958932911334477,0.97417670656496,0.6512732390882462,0.9994405949994021,0.9822564731296305,0.9771415281087272,0.661365225777276,0.8989901660180255,0.9582696270604055,0.9325744749366343,0.9751687693895839,0.42919241561910215,0.16667622300058557,0.7608749144092759,0.9997375151281824,0.9441849182870983,0.8897490848219685,0.9996776398764733,0.9759050845165835,0.8459385718964374,0.7251639392354655,0.33605171815455936,0.9737105267421684,0.7119453902631694,0.06430494110953837,0.7980368210288327,0.6235802681361368,0.9896362134893083,0.6214803846760788,4.2651495622710727e-7,0.0007471310424897697,8.366011616445202e-8,7.03311148945134e-13,0.15215344239712214,0.9929544733011293,0.9606934721771007,0.6327178566201512,0.5004916106929316,0.9999830182586209,0.834972477732126,0.48977320468410634,0.5842001582462942,0.06206583550468934,0.9204183252055496,0.9719518304270247,0.9997856219162664,0.998984496283494,0.11299450410460644,0.07696963480362698,0.3819227576336939,0.5541517639383043,0.4029747235194661,0.9990853992957591,0.291094662633023,0.9869955650050721,0.9236643325505278,0.9999133747555267,0.9780329012728917,0.9897757363699694,0.8012929885171967,0.9675078413968863,0.8412925094300436,0.020911049693922847,0.9661022893804219,0.03786468634026301,0.974842541122013,0.7070286316344702,0.5988320783831764,0.6962135484971353,0.9989983622865835,0.6108490449679249,0.996604765419369,0.9875737035209853,0.9989007106383626,0.875274478131294,0.05092434728888584,7.0719466136238615e-9,0.991240535910662,0.9643223167894661,0.663767592167819,0.005433312965250778,0.6006100948006602,0.9981731947243779,0.8141002813125546,0.7382975989411866,0.778891565436378,0.9808468760986019,0.689556501749274,0.9943621152882053,0.9999992312286704,0.004190183598097633,0.9999999819958587,0.5546771838426134,0.8294617870992337,1.9657205867810217e-8,0.4023802832067772,0.9999843192155452,0.9833246214784608,0.025471439875736156,0.3223848461556006,0.6969270848408059,0.9999963990986216,0.48869704491865157,0.9695943563071636,0.7806204458333079,0.9915127244936212,0.6920373216767384,0.9837656443303371,0.0077704277006152974,0.30032158845173695,0.6119251286089333,0.9999999168496475,0.9998423210439507,0.8150486035416863,0.3360562104966572,3.9576159288848945e-5,0.999978475992376,0.9917046006903878,0.00021984959610211788,0.9726562131737166,0.03001874269817629,0.014686026564514527,0.9088233049083367,0.7672699747948064,0.39360750786575616,0.9989358446001864,5.693658179506373e-9,0.999932305271362,0.05075111128428741,0.9999971841464296,0.10045445398785775,0.571421091353626,0.9992229287721623,0.5752518656556374,0.9989279872664697,0.0013200358953074892,0.8215194352929273,0.4969418723997908,0.9562921010400796,0.9999999574279554,0.8257760180999782,0.9984785596937906,0.9012883880712368,0.3740864458483342,0.5959357522280471,0.88446389349084,0.8915361745943767,0.9924783043363843,0.9091962673115712,0.7074318040226155,0.8848475616941875,0.9993182554939828,0.5099874186446385,0.21520637611001206,0.1056384219907569,0.799524099675093,0.3616976053245083,0.9999775766064919,0.9892293547086554,0.9872455001036073,0.9680437179275438,0.9677797541653133,5.400639313129636e-12,4.70574248986203e-5,0.0017356066706637778,0.44595441496653065,0.02806375494344332,0.27120687569442553,0.002448760956024296,0.8806888065452458,0.8373234350455144,0.9808530597108301,0.4615932427763237,0.9963187731282288,0.9934193045132511,0.999775073148798,0.8057788765269785,0.775147231811654,1.3469992754195813e-5,0.5439216840106522,0.747642107147643,0.9705222617396901,0.986684689653115,0.934385493602589,0.9725182531130376,0.9782320958117305,0.031419969218654066,0.9748120182650599,0.9998912868172416,0.23601972013628575,0.00018539532694434238,0.8975851015917978,0.6507011896509842,0.979701140530043,0.9798811318623769,0.8225561287789334,0.615369277795075,0.0006845002272675956,0.9980034976991035,0.5802962198517625,0.4382218713016106,0.9999819869393274,0.8378520825054728,0.9996832194418246,0.990464596380904,0.999683667236843,0.9936877634977433,0.5392320107303212,0.9622727724871001,5.720036816601754e-18,0.7255238112714579,0.6403724206983714,0.0026122527731636132,0.7959359321250167,0.9232316090438343,0.9693733752246061,0.8697995441703701,0.9995249169211868,0.9634589571346374,0.9883204802805572,0.6540928065994243,0.9871449058626036,0.9845399687759135,0.9209769487117319,0.9997708563724708,0.8703422890039617,0.6666801939425366,0.05707430121681185,0.813505922149567,0.9182251604096516,0.32385320008053803,0.9635297937599293,0.9948559805850651,0.9295910956013707,0.9963924984048625,0.5092728419141973,0.9999987734996796,0.388103301087591,0.9989747878395807,0.9874210296848613,0.999998423865667,0.9998718685534347,0.4543217056391891,0.7195621283763898,0.8723250097033769,0.28070799799581125,0.9942113837845568,0.9937311604884148,0.7103575211307556,0.4704396432184154,0.8603299148711709,0.6462140091714332,0.06116438202534565,0.9841590760589183,0.9204945575096599,0.7020041209629942,0.0018234682132317506,0.057977325115002955,0.0025781636357033806,0.9989920047122975,0.0635974086966251,0.8609042096931014,0.9990549633717538,0.871559627521753,0.8500227251270693,0.7382101103028604,0.9623675130899427,0.050917513782628626,0.99394101312885,0.9766458435918721,0.9999038500729311,0.4410196446352092,0.8661058785227761,0.7609522176024779,0.1953533339975494,0.9795120514004959,0.9994763184676725,0.708269966690269,0.6640006809895721,0.9342177746361876,0.801598248790785,0.7508912393349633,0.9962357233618895,0.4656360572899719,0.9999493433024366,0.015115602129857155,0.0025201621584911597,0.7606821943594636,0.3112058384613576,0.9984501526675353,0.9442533599308445,0.935569901394803,0.0008545634255096358,0.7099029349257187,5.78788783304579e-5,0.9881725752070492,0.9994269858200004,0.9784336813451564,0.596018504280017,0.9969880814126236,0.8837216722926954,0.11878458821525305,0.32538426202473836,0.9353979134991213,0.9221336005872021,0.9841227839788563,0.021347648715137744,0.002779451390964019,0.8108841169272543,0.18432464416443123,0.9667556409328413,0.9933897001712974,0.2237667162515885,0.8825882363944222,0.9999974413355128,0.7716965344559561,0.032703092034463775,0.6127377038708404,0.4837904248438157,0.9945526675481899,0.7839281076545257,0.9609257063992983,0.9945184943789123,0.7727420737393123,0.06604805543735531,0.9954178013228536,0.8658549929866816,0.9721308933545612,0.9797201223761638,0.999942948924915,0.9008244463425397,0.9998974854793734,0.8450207483085206,0.9977455093399273,0.8604246257299437,0.38256770803524487,0.00036460659370017996,0.14619311297492724,0.9880467947724476,0.9989705699816651,0.1289621673266852,0.06790356343111675,0.9594674290523111,0.9637636816310535,0.8694104302108862,0.9882725494944706,0.6944306639971414,0.887699736131545,0.9602806926578783,0.6808990827374072,0.8645141970577542,0.9992767800494622,7.436586174853795e-5,1.390375171800976e-5,0.0018732558763051256,0.9982620649305696,0.9999488518399539,0.9892189286637703,0.9937675922991428,0.010148080960873917,0.0427547648084185,0.5345388810419769,0.6918944354270725,0.5666814936708782,0.99999598296524,0.9943654992669588,0.9919032376166986,0.8478778005129357,0.8768904123883989,0.9992500388618463,0.26166711341354226,0.9507549530090538,0.24119468450508474,0.9889700623585517,0.021211503546334984,0.8784243130066047,0.7174009903007159,0.9091008499791151,0.9998994392590028,0.6134844663408114,0.9823211124315867,0.9903395054927844,0.3877288038467822,0.907911755090038,0.617178052623907,0.010929545423216565,0.9902778929088614,0.7659075860320386,0.9780105558920213,0.9671366465032255,0.4665360546875368,0.9381594275658216,0.7459242263784689,0.9990779474057699,0.7321598617341353,0.9432664641705311,0.9812160099330113,0.025512879877054268,0.595912582946625,0.999453599231982,0.8596605755553599,0.9903021311208844,0.6662743616544016,0.47672085497463634,0.9748126431361128,0.9167214851827913,0.9242068329204624,4.286815101146907e-9,0.8163622669342301,0.3799816919190031,0.76443114484976,0.9999694878929523,0.99578052874142,0.6098286136510519,0.8682535165486334,0.9997412125193121,0.9095052233702818,0.9972361128372979,0.01893568403895828,0.9522175187424805,0.9768772469511158,0.2986674773550254,0.981002044468837,0.41920316922825945,0.9639626676239017,0.34207351928854773,0.6173158502736318,0.9965110889573041,0.9967074109029781,0.9944273141704807,0.9954998872398225,0.9966396039114285,0.02073702185534069,0.005630252365807932,0.6345513290349258,0.08753457914812336,0.09357169572018999,0.13946476917979025,0.8528080412952244,0.018512573043243295,0.06767747218891589,0.8812438924802328,0.999898817210569,0.6079503838161217,1.8646802444930703e-11,0.9969638825691893,0.29072000297342737,0.9867275095388436],"alpha":[3.1141702231264157,3.7113585477303923,2.7264128993160885,4.604897449133634,6.7719721334651,9.861016968104543,3.4581626818811495,4.908955543734297,0.5903088079017027,4.5851159562600685,2.7634314997373144,4.100718048424441,8.330944354146357,2.489243990383865,6.698439664226785,7.429817011710953,8.081378422581,0.7735928121903601,7.980080563930878,2.4159116549465276,0.7324634854278833,9.80286267934112,2.9601238524439144,5.33827106379788,1.20463969073914,6.066713288396562,4.94228830423173,9.890751737953751,2.621020918050183,9.38726106985806,4.042642703379313,4.0232187549766385,0.8314680065100566,2.739054323906369,5.671702413983601,1.179798581628324,1.9962101012743605,0.36521793322154883,8.35204887211054,3.424610951554965,9.545661130693885,2.4042215552144386,4.493971459667179,3.317953564554623,9.099290961527073,2.7206509933585643,2.87220539716881,0.02834516414347954,2.710497540182888,8.381419029745597,1.4508291808903495,2.3651926232515885,8.728161659986382,0.9180599832927294,7.983556107702321,2.8670668574336933,1.2985370605005686,6.227889518799719,6.455719381648828,4.194724470104316,2.914223673455363,1.5593395317855019,2.7899406804968963,6.467689000838703,6.7709139967572884,4.030987817893901,4.687170097253992,5.568545166745311,3.3306300999608895,4.2915082764918555,3.4600744618592705,5.043299151967558,3.504732037670062,4.787773304669609,5.199545358678812,8.86641493260224,5.728911285065941,7.157941987831327,4.86877907054823,6.174344777203271,7.0184643187781255,1.798599952981823,1.660681597652931,6.469206543154861,1.8625892022116441,8.175854593224576,6.86896105395318,6.45281722001263,8.870416823505725,3.984543247792105,8.47176973994306,5.657240963666164,9.514572283804627,6.817398068396332,1.6979642571732545,5.335370639059991,7.344218144871839,2.590257157673135,3.2774039253094545,5.058387610780071,8.417679885083409,9.53915880862735,1.0204326914447082,5.109676257698997,1.2304924758700508,0.6506292731351415,3.875105010657398,8.908430926112425,6.4460443285827544,7.566463019221851,2.715201177469495,4.139626231808817,0.9149356814926346,3.2453057263414276,4.10830801876094,4.9050612302845025,1.1626874904006312,5.940791386789952,6.836390636645476,2.3902715737864355,2.657532348556011,4.610347021377484,1.165187297448711,5.900188754550644,4.217016948385428,4.168070650032998,5.331523827491946,3.752532369356283,4.196381071541653,3.0122565992402484,7.971338261181769,9.28378849013254,6.759712931442817,5.461721520976859,9.75043781454211,5.908697189365526,4.035286937773142,7.251181264941455,4.7291532172635,2.439376449961448,1.4771083814837094,3.3606794955630925,7.902727567391912,5.636174128317477,0.6509581279434817,5.455893490552086,3.7936134956402423,1.0365520802022754,0.35190533050812434,8.485956566451938,0.7192356604544803,8.094960408165264,6.012837668195616,6.187534571452136,3.1490665057438516,5.621044327577085,4.730916339227605,1.6002588321759115,8.111249585509901,2.713016240547983,2.4274559462962797,7.367434034646793,4.152443295559554,1.4324275819249466,3.600889907834579,6.398898214202884,9.17981870296823,0.18610051691234863,8.546365631425614,9.953333246817442,6.203297373285754,6.847147408753747,7.1429322717811905,5.622779232672615,4.21731704460276,5.7584666107514115,1.9165869330575136,1.0248412050449351,6.060017185403829,5.226838058353147,9.995989275615038,7.211129115943997,7.516181566753042,9.597820248052296,2.0219503486299684,2.2457484684519224,0.6360840510969101,3.9322537434959837,1.0786818154561573,8.590303127354591,3.525158043987908,4.768812553879716,2.9013953111475344,7.593500445328236,3.225723197556518,4.660011477894224,4.772828457642218,7.650831450895872,8.12839053989695,7.1159197832680725,3.21695833520371,1.3569152412027807,3.4831028902184147,3.757830359693619,1.0255605305971316,8.320761386878523,9.468797310203772,0.6362691542337262,8.372226667040588,2.594710529620632,3.412864293293232,2.2916230961602313,1.43018428188314,9.67518968598114,1.7138189048154029,3.0026993836643046,2.221456764582741,4.136063404925016,8.730719871614422,2.7715816143158145,3.813482351701878,4.701716868279502,6.512607581124761,5.351740279416881,4.296560637618749,0.4664915817089521,3.136395507841494,9.728105212842443,3.67078136137738,5.941765660809404,7.663405830657775,3.7624525771654604,8.469963538255513,5.061093318659546,8.488367827914239,3.8817066720285154,6.109756723102322,0.351735587095372,7.9062466721193125,9.625901673134988,2.2139843123573044,8.274010237888866,9.105725644043277,5.094978347718242,2.7209254802618776,7.39265092590256,7.001036087185093,7.6514217428352715,5.362848318444373,1.4941442991433784,7.19944511785129,5.594229452250669,5.3750212564647,8.900165512692158,2.2773763993952545,4.878515473371365,5.243043613631393,3.6707764396625,8.809019767015275,0.9692716572039761,9.21905235635192,4.0190433532536485,7.004078733957959,7.156977220380385,6.398028270879552,2.0398536347505702,8.54037918159185,1.9282847962054994,3.5247592755501933,3.8180338625686283,0.43196250464083263,6.7697517084354075,1.4892491819324505,1.5973060471950284,0.861775195253176,5.6406264814104805,7.1756073920881525,2.3139734851503158,7.798013638265335,1.7849170489748278,5.0307773614028894,9.416991675797382,4.7323331558020865,9.057036263055917,8.000288362097061,2.6771887663770877,8.103044853957918,3.3525373640766443,5.08195550759636,7.241961706145035,7.963131928578912,2.461560637956375,7.359465793446125,4.888350304480154,8.0023524320588,3.224212202479342,9.953088629680284,2.1877885393371588,6.554585524915457,9.100890947024844,4.966750489695919,3.966057591506571,4.498039175773814,4.915438530622424,8.587772149393295,0.039596944924440436,6.222380426729184,2.941642206665629,6.938896655809841,2.524108485682597,2.9654470507377573,0.5849342651036404,4.52604186798647,8.760456378665449,9.799394376437668,6.3981949155908175,8.050722741184329,8.052861929372279,3.6659032596985064,3.590806198434784,0.6851310928197885,5.997214125844696,4.428867506759239,6.233119312145798,3.988012010244395,0.7397195613904883,6.458860747663837,6.7489760669492105,7.147801424428337,4.979623119779911,5.273842732449683,7.943371298332968,9.820978076243307,7.6518883503260575,9.833331041267286,9.993489372912217,5.972440050696299,9.827030124611362,7.832196505901812,9.398160741228947,1.8935195614162637,8.553027474370072,5.465495240543619,4.043062933759631,5.792148319213391,1.105964946622271,4.1000829179612115,1.3438330288623246,7.6640355245491865,4.67265827452418,5.505179160866436,3.9901297599938057,8.674808228339778,2.3896129348088713,0.16673129817097676,5.7609131143979875,2.2050208169373264,3.4173107991110308,2.46347188398524,5.555194262816732,2.1685562599181574,5.205771323144495,0.11584811287945751,0.353638021167324,0.9478801244724488,2.4191185789449277,7.456930384920691,5.058851351650797,8.771396669006304,8.359648960074665,9.058278642089089,2.701723436179173,2.060240607084083,6.148584451849992,6.397204718105436,7.394566784214616,2.050611140432279,5.371726071857681,2.771195852919466,8.37655915271197,0.8340047807280571,1.4443887096820363,1.0031812888387903,6.392454973613335,7.899771207451282,0.5307620865692941,3.8583436291081052,7.486113260884137,4.925314255245885,9.905374024424816,6.4408156657742754,9.493007316683823,8.730159559655824,2.035949943283313,5.42784708362915,3.21083975404014,1.1416883453167226,4.837675086015785,7.5320317203480736,4.5063828838171105,6.219473216163543,3.6868417091108485,5.998967878378885,6.027929362225148,3.413814578783565,6.722050849616088,0.9542390623511054,7.402370377712952,1.7442244916863459,0.5258035080132806,6.1903285527471885,2.0170352556797977,5.9742804102119145,5.765572762265167,6.632344231087113,9.986022108721027,2.222010988302763,4.3938135345251395,7.702936934599345,2.860028624799944,5.50379231483279,0.21328236919126775,4.7146568997480305,7.446398954004703,8.792831348324876,3.5378691481923363,1.0029185402557639,1.3781869399181623,1.9625741080317471,2.1551637617559694,9.438283938322423,8.397666037378187,6.348081259708986,6.435891858874294,8.154677351857826,3.2973567243618684,4.525809810253132,3.1442553479997892,0.8813934496671894,4.524045376656616,9.940807618702767,4.00645804479084,0.44036807838156555,5.048727217387929,0.14164650724165284,1.6175270479593329,7.8065598291416265,3.8119338908732514,4.944625353621863,7.4330756678914,0.5308035136753975,7.644181197228699,9.064513100311157,4.477753132220785,2.687548672768396,0.2510498185408738,7.770759871887125,2.967936140420895,8.10723927651891,8.446585252517608,8.844326981723016,4.641127779017209,9.246899394693992,0.14281039786374183,8.050809732269395,4.174335780284785,4.285767968777026,5.6366150311983105,6.837493943036423,4.663049004623168,2.849456036043223,2.869568770941824,8.233125474392137,9.467973530238467,7.587058138618657,0.9588031576479072,3.4557694803105488,1.7156508758833722,4.52649411145309,9.00145398108149,1.2919792230390947,1.814303628708125,1.8574308899323921,9.60200297203701,0.8154271978669048,7.890572186621714,1.0209708973577802,3.099175298314476,7.7098375509301835,0.6429175251084107,7.00054325538209,8.906224694484058,3.5215995648415555,4.516896314328928,4.169629351363713,3.5182567076400573,1.6965164269895872,4.567350894178366,7.237516903081486,4.960619806245035,8.77645001793753,3.397855246603172,4.884014554007223,6.602140628157242,5.957153319129804,4.200654271799382,1.3835828564271346,5.989364179347105,5.50277710501746,1.2061774042127094,8.118533642200276,9.117903975482948,0.02915189193083645,7.500341690975992,3.674475083107931,8.295006733945272,6.017037913711915,1.2351226023018458,3.4942938683375857,9.789599288456765,8.35324391517689,2.6056922211006994,8.731965113517099,2.3840428513309653,4.099813295853649,9.78272878108282,5.657262227133819,8.217337028924664,5.093326199945183,4.310080808828594,0.1144846308965275,2.862294353787933,3.8226860665251294,4.608893006255721,7.515526076009797,0.3189920919492506,1.4043582721910108,8.778012734471918,9.92700676554067,6.752616828163001,5.87325164162003,9.17257943390694,4.468272267584339,9.00538372618039,1.7446201067999456,5.534059532967353,2.0111893201420172,5.620479701772878,4.446887962424593,5.360575367468132,5.305001339069689,5.699215189903382,2.7503840033391413,1.8024904399279462,4.421226654034555,3.7607922995117793,2.7577140792802735,6.70965918290872,9.246310770890862,3.3994833409086533,8.208888027266983,3.6759436470947837,3.5398069848444713,7.631302798425283,2.6877843562136694,7.945740557849046,0.5353676792926954,7.880249579059713,4.3693459723474115,0.8927288247469467,3.8942413834540757,7.878052142043921,9.896203354441448,4.709352479846736,2.048123641323303,9.62146914757261,3.3936016586512108,7.372208431186468,8.75093868367075,1.691177819394032,4.926276780871309,9.53787902500479,6.8249899505808465,8.36155465954112,6.347004771822604,9.615928569706163,2.9442207511812213,8.982189406183881,5.864456649950607,5.234786555008912,0.030566220403547284,7.151469606321459,6.3225088665363565,1.8857976895692996,8.400384285018221,4.106961224315673,5.698516337450421,2.8750792656257262,1.501249907749287,5.501376853475519,7.298131913750117,1.4933479930595506,3.138844051462437,9.848838173405001,0.9488484751575132,5.517578535080898,2.920596296409703,2.233925947621338,1.1687508153671078,4.850550856783586,1.6449030312964696,7.440215299342567,3.1790628387731634,4.723132906785093,3.2068632477474757,2.7303515207983686,7.848916830051564,0.660915779474982,2.4035829082023885,2.4865808457891414,8.235598675117757,1.5849187221016892,9.161364738138838,1.4785792602003478,2.961724708180231,0.29773913144791386,6.279316588989435,9.614245244922833,8.172892644397976,6.549385809301218,6.385602433043931,5.961028462085068,8.599526373678861,7.7633123676432625,3.1807110709753306,0.9366202326939144,3.2353945795129513,4.493828661308761,8.017159157217744,3.624663455720234,2.3793160217433007,0.08274819953733914,7.960907450003203,0.0019851942923776456,3.8716671767563904,6.302828923207215,8.383005009559206,8.826697146514773,0.7949726638931209,7.13291952684147,8.806650780256732,5.481568780314849,3.025752749934514,0.46676451488739,3.756283535109568,5.457626310396384,8.951499342349393,1.9489810814234465,0.5437911749313895,1.4503191699100637,5.544536807608109,9.76309839663706,4.41917721629358,0.037771271520998795,2.254612251365271,3.5121172450052263,8.900552481592465,7.468939067820825,0.5461411869440402,3.491679951275821,7.002374788755247,4.684945345049969,6.3323445657856485,6.072369769169638,4.564928740904437,3.2618846564351944,4.359835050698724,1.4734950927619228,7.177358972526163,1.1482262443618474,6.668550025972735,0.835506015572054,9.114276502717637,7.012063992275497,3.1014223471964075,2.7057031807915255,0.949549202053821,7.1723724578988275,9.344928745921436,6.676549167154684,3.7413170725440037,0.04727368243615526,5.945609818934399,0.9745462689006668,6.365939755338912,9.085580052736278,6.136569972777317,7.034535204483882,8.872281806258682,4.124579558597661,3.8270780410513683,7.079766947477131,6.122319627565799,1.4364720675677578,6.313491469937393,0.9422177811977139,4.233071809212285,8.446470107093596,4.224234611810955,1.8595221278110774,6.106830966796702,3.1756029272940522,5.717884966663127,0.8323012041821065,6.594031416982742,9.88248316351212,6.788481771909423,8.53706412281776,8.597038180644718,0.8806483913638652,9.670212460680613,8.854592999214344,5.1821694194837375,1.5111315758877009,8.19624210019988,2.40824352239446,2.719254956408932,2.039494410215781,5.883760140758037,6.06954421222027,5.414017495180385,8.836320498990505,4.688835146826551,4.45335559473691,2.4140590674899176,7.44383775918585,4.0124056306669065,1.3996130726017197,5.073086105986196,5.9773112838684135,0.044570969052928344,6.359214753081925,6.016743487035773,9.57075176282332,2.6579018484847894,2.1883976231036972,3.991223712714682,1.0417768455015053,8.989975410275381,9.244149089254774,1.8752571734045054,5.007789941474408,9.690981389338093,0.10744148172663115,6.53898826705367,0.6043819812967777,1.2448652998877918,3.8383580494271086,2.2028084701336237,9.636907032683988,3.638130102712469,9.861091021194625,5.423844524521069,6.3665785608774,7.885019670919355,0.5884501972536316,5.445931497284933,2.653564684062475,9.12251357966394,0.6301431766991317,6.4808502838183095,6.112359714116174,1.3971527141464724,7.458194492244134,1.9799724700651922,5.354372974178476,0.4996927333103107,9.997106301225784,5.757593089445125,7.415431516225479,8.614587280390149,8.532941332315398,5.465968562920991,0.09826021071765334,2.212989391010187,0.9149238232898305,2.4314367831283135,3.9059123615868163,0.4938841546497197,7.363198677763354,1.6370617531319942,0.29043842121179164,0.18783751481191047,0.05542508647727651,3.7252220868029218,3.0378924660212747,5.553235523530651,2.1013860870496193,2.6138670450345103,4.829434262725818,8.365333862396723,8.399907764858039,4.505487418535548,4.715810039374864,7.8307384280379955,2.486427148013177,0.9700919600583013,6.321969429263703,8.923880928421013,6.5945929844562095,5.0237719258500135,2.225649485107648,7.0953450866893775,8.42794489149248,0.05371872210477413,7.71201729304061,0.3812068927368917,2.635938383868617,1.6427277484291758,5.164983654789697,4.398208384377238,6.369714101639921,0.7877748798491591,6.412982864902064,9.43263733918247,9.359066013713946,9.462463210239346,4.295752788471234,0.5033281451153271,7.651751189700057,6.263784898467078,1.2163216211240302,5.114258814183028,9.193814735717607,5.243029870869041,7.242526698512856,1.9825063856397929,8.611023861867455,8.39088562158601,3.118709006587581,9.442019993922923,1.4878115615774856,8.209083032831197,4.0368599128413685,8.823172235492367,5.594259732235216,4.046095119516107,1.0043523341398308,0.6494399640714921,0.8303905491143104,8.45439916071963,1.0212212545993116,9.352951348090862,6.6879785086914545,4.590241037252019,8.54548292503335,9.255000186630717,6.068522573094679,6.540744206582183,4.849844485356625,6.139721977509101,4.942924568370824,4.628974110786881,5.205984035041555,7.295747001378848,4.5542960878267795,0.2014316032255059,6.246823056697311,9.160482376629066,3.3018740056030182,6.4987045175596965,4.215489225266711,7.127083131857996,5.021499155573461,1.9478057311444963,9.708703312889465,8.661960133469355,4.346047816792984,5.275787678598292,1.5912432378586594,4.781883285743939,0.20772339080010527,2.300994527547695,0.7364203916644274,8.402593066905933,1.2584746937575209,6.540431793554513,4.21952733908398,6.7881373623445995,2.925737889750053,1.241936668804977,0.6210286036211587,9.674970441621012,3.323436471037844,1.8042147402279407,8.18373125187196,2.970788907253974,2.7940083892491674,5.3044003104523485,3.731072554354473,3.7433205021317573,4.913840791141471,4.604432887553185,2.9719592891236934,9.08447231382775,6.512228204701664,5.1859514366671,3.848687479270101,1.381566072611562,2.593956533155075,4.785416654841881,4.056008908361298,9.527429567755162,8.627718420358352,9.467409648127859,1.0275451400074664,0.1103904789602117,0.8685600336408172,5.4511783710377015,8.58233446258792,8.590113114255676,1.2308922428407665,3.9560440600862368,5.719881845592463,8.008363858498262,8.141782862438712,2.0921215978503027,5.32255512460138,8.904667284556815,9.168684366667971,0.29455350715735573,8.687272505375251,0.8197039600265077,5.586228040979943,8.508784676031851,7.361993993866283,9.081582639244527,7.460377093090081,1.5558264722366788,5.612910502772581,3.433559346194104,6.250486172030487,7.728011175473175,5.81083934943832,8.700406978947722,1.0789785137233365,6.303686368521621,3.6648970338087405,0.575936452186272,5.667908138203299,2.720157702594188,2.804952467010291,4.939515436581868,0.6678405851028923,8.23898708241023,7.159561674242814,7.758604362146338,4.953266230472984,5.945571037944757,8.856233981016914,6.06632413811721,5.972472854821273,9.623481024497465,0.19433552861898518,4.968791593697972,9.593507250373936,2.2939152710299537,1.1518117781592752,6.651124337753291,2.9454269912088615,8.308670687147444,4.3376276737809905,6.7836614087809854,4.150479356947794,1.5298192344874617,1.528003622065599,9.000611586037257,0.8120891108976047,8.410387843987602,0.25744468510361607,4.541497171116847,5.4864591378948795,0.29370170094243253,0.284622382129891,7.045102373903478,8.994225815337876,8.373771071343839,7.600797229492513,5.273270627148938,8.081718170542771,3.3704170673318923,8.151169168483598,9.705521643878551,6.011886873014265,0.7198429419962094,4.4696112972600766,8.252222218965564,5.466479936252657,3.2714771086950245,2.9928828124878737],"x":[0.4135914338030193,0.14094725282782394,0.5312312433156607,0.3020252904853251,0.2370352256814281,0.8953754991205412,0.9717995311490395,0.5370381741484695,0.5979825260869285,0.9825835621617376,0.5046241196935983,0.007769701804734908,0.07040967809254073,0.23905967348260626,0.5281719099218531,0.9935602063697431,0.8542508357930501,0.30493274878487053,0.2735351854287156,0.8590623558843495,0.44897377690000284,0.273964305043493,0.5128602646235447,0.20068032479853004,0.331733659945461,0.0027201404916474825,0.2534198096161906,0.9420079655078064,0.5393961795404596,0.3659380452145242,0.5157093922733731,0.07004363698178229,0.4548796062230549,0.7393388291511094,0.18846405533475674,0.44136166744215877,0.703407088490569,0.4698911483778372,0.48215071102562157,0.11672334534018769,0.5890100606159645,0.5378684944832626,0.07627901988436347,0.9392008604950695,0.9649667535299964,0.07120599723271837,0.3749300745711597,0.380650889479452,0.03574050434349019,0.11158664257982598,0.4076407491939271,0.35222992259398556,0.06665770433697649,0.14879065480411224,0.7650960913361446,0.69051792271006,0.4325812284270423,0.5429587037662467,0.7860315773711768,0.6568560647965254,0.8104278987954185,0.4747240339217227,0.18502233079634567,0.10660583046690908,0.617974836443792,0.8350389355936751,0.6819075461840574,0.5213534198291152,0.6666318098759445,0.4491941688062595,0.3908062410807176,0.19281965572298732,0.8758125184546481,0.1919370611753679,0.07036111773780229,0.4298193909261374,0.849239153257815,0.36777518448081126,0.8221836597646905,0.6729615861322138,0.437721660704935,0.2883732944439128,0.9890430985170251,0.2639413634198373,0.4657863888221576,0.6488455651165832,0.4521892018046991,0.4378253653314721,0.7035105579053602,0.24693199087847595,0.19258218814560557,0.6583892548226713,0.4016790660226439,0.4455743044755278,0.14148786269398306,0.4284628023267938,0.6260386208406474,0.15866185219851925,0.8980979792906236,0.38338365426787946,0.37271037263218365,0.7811505248283743,0.5470247191213609,0.16345903159334374,0.3190729441178981,0.22580176384417228,0.8968471205763864,0.6952986501208536,0.937036968668254,0.4992501191721237,0.7695533249180053,0.4474482983225687,0.634977549495086,0.9397938496738247,0.4871536897468751,0.6343131916297462,0.3736936756858775,0.16734500262382657,0.6504716493287133,0.9718549341067064,0.7050096248451709,0.7618946022154209,0.6504223271080976,0.9162788976907239,0.8462371687516514,0.9236773056737784,0.7688478127058409,0.44262251024428534,0.09793453856145895,0.3926011859082206,0.5017755412663913,0.4777742260041562,0.8278308487749786,0.18817830102934896,0.3441517016062161,0.014967610588330738,0.45758785440465166,0.3474895076445901,0.5134333518181569,0.7243710023637924,0.8408324672358789,0.4614202580585711,0.14765830759472887,0.2463286018442563,0.536838309626136,0.13683459595542447,0.5268301446076702,0.4017281050428032,0.7735831597944172,0.38941659475471835,0.4903891419996249,0.34778305964897926,0.37875572418374626,0.31573758771587723,0.13493909264426107,0.03157665374205143,0.09445306540782172,0.5812188420803439,0.737217185930259,0.4745506853778585,0.2717518018261711,0.28098289434150203,0.9479406206746386,0.33040502502789515,0.41924755801959335,0.4030868809795216,0.4214717862148081,0.6027089838291664,0.5907756383883254,0.33704173217073197,0.6010372803023702,0.14005133364960654,0.5584036671904662,0.08103052780185171,0.8429892765598417,0.11829695594858092,0.49406317025081714,0.8475734531420063,0.7142887377054716,0.6453449786348198,0.5646643389771733,0.1345150459160982,0.8984851022572997,0.27484929174037753,0.7327658120121459,0.6431731324123591,0.6181960003535076,0.21577671597755588,0.5556350096896396,0.5743797199370368,0.09249814647168364,0.38848182407974363,0.8582455410349694,0.024591722117978332,0.27377459222678047,0.7103220509375938,0.6808655777838029,0.8236319388283904,0.2117243567247764,0.3314855578376481,0.8736832305628142,0.9494700918148495,0.9218954841841875,0.20431015222105064,0.9274483974152714,0.058320683784146565,0.6188188310042178,0.14965680317853236,0.6141754269322044,0.8257292380045156,0.9009237639746297,0.8342563095039053,0.9322254772387308,0.07200371144678885,0.673714197458849,0.750589744530634,0.9236990812152295,0.15456226887570823,0.5644244515406176,0.007330224574384703,0.975864915702779,0.10006397757984775,0.210855764076739,0.3058246825243218,0.0739330571118757,0.23198234251877015,0.21067809355262845,0.2476019970168093,0.7172490268803962,0.2696104034589981,0.5549846272126115,0.09929971225895495,0.45960498603815414,0.11754641100053287,0.37938217515498396,0.5373262959221583,0.8275961251129575,0.9352901972311805,0.4357015877368644,0.5180071852130694,0.023725806726635268,0.4803031908569171,0.20229791677063913,0.23283094610851096,0.7794388091216808,0.7135661755561071,0.2042623310464764,0.669506577245147,0.4851303787620673,0.7121431964801952,0.6148893477259618,0.3406649478586137,0.07829606714515047,0.13786137002626409,0.21745620527863352,0.46495467038127747,0.6280711860643822,0.564792580618952,0.2916352676189935,0.967613672670288,0.46337027428579547,0.5976330140484567,0.11608172968080965,0.671731493263634,0.9946501127475109,0.9568830561055279,0.36614654012037673,0.2810417243308083,0.49048528316480833,0.8205736679139732,0.42919043141936974,0.2760523355460216,0.4400752619660868,0.23628022639755186,0.42173516230005426,0.466249384333687,0.4920522488104493,0.10982530738338614,0.11272482374564818,0.9558853812952124,0.6958473384364336,0.24259070492613022,0.07647580781784225,0.597570395942473,0.3803945628098082,0.04842888256797773,0.708994697578998,0.28254257598930854,0.704104502799515,0.26529395955317114,0.08700598272456572,0.19389305242695687,0.6796310779510157,0.7278797197443561,0.24640040314343237,0.5898368579283584,0.9027558417351587,0.5259220009381813,0.6833584799767145,0.5399873312362258,0.5995312713119518,0.9278909859763835,0.7024901691892911,0.1695273164063118,0.7464882397505435,0.15415060529368896,0.9057916282641589,0.01321874650123056,0.9648882729902524,0.27346373789827627,0.8742569712577963,0.01686545179907184,0.7256412174430589,0.5033450299941342,0.5544697555879554,0.9174657820068488,0.33974573014946974,0.7405688736285652,0.09629737747106071,0.5956934053347716,0.1422200330565786,0.8587118325671033,0.8089415238173401,0.3247423491486068,0.7136603201050435,0.43135918625629155,0.9326830911555253,0.7835641327429133,0.8979288160615619,0.14256468987881954,0.6867208655860935,0.10386859897628264,0.14082030741038065,0.9939791947249368,0.6344921403691295,0.844503819996818,0.5234977850696672,0.32758660567953113,0.696642233810725,0.7443701848879367,0.6918125773517954,0.27169564720030714,0.3765862878669044,0.32881598012564384,0.26170470016147274,0.8650234131213628,0.8140885903700104,0.08907047949856883,0.5473225716949042,0.3006931107817772,0.20899444922765276,0.052288138251849414,0.3656954843429494,0.8812256733068362,0.4985079098700196,0.38616312213425963,0.2894607955609867,0.9477282562482867,0.5672511994930465,0.06493457024248084,0.8887387004512457,0.9428072496700333,0.16863621754279112,0.6009102218045936,0.5441740813921829,0.2970690484837968,0.6799491051099786,0.3486803499762148,0.32572231867290435,0.5878849257775438,0.32741961656518015,0.1548978467258011,0.9343066589464233,0.7360714033947859,0.8131198755922657,0.24703020255454167,0.21121371175904735,0.8514520103918577,0.17500746954414348,0.18346685765303605,0.8542818266392713,0.19895499162378782,0.41064977112726986,0.1815768144237635,0.6732837714572455,0.023639143557866005,0.7384551675130602,0.5841268026048727,0.79892878981412,0.5657520229030923,0.40499145353511623,0.40434987476072726,0.30978217239413297,0.9417907672997778,0.582306169589087,0.6416361484116353,0.6407561942531463,0.9562390055718819,0.8995048418282003,0.4806103444004466,0.791068805375049,0.33684952989953443,0.14569904146482093,0.42636451770345873,0.10367922108685246,0.8146247525068593,0.18489604821246175,0.6117704144375344,0.27437726897354464,0.9551110207721873,0.4149951823681808,0.5301111971218653,0.27506554597007726,0.8362950431650724,0.7113889824976536,0.12956536162833454,0.9468633952303811,0.5786634819097425,0.5794848650563709,0.02881890116342345,0.31778182910075103,0.429891495794515,0.00037103133380811393,0.249931105324515,0.8561203647027682,0.4545795489410138,0.18446407897674844,0.65487460053407,0.29540013710232205,0.21345845449528822,0.9774976729433986,0.989361817266015,0.4401782245637318,0.9330021229200625,0.9775498790664439,0.8519678652023566,0.03570180852435323,0.027932106413840918,0.08234935752958927,0.8274062569366007,0.964460011826922,0.3919606745545414,0.38227900402732473,0.4700298437747017,0.7972039374740261,0.024043544815541384,0.5569774422498133,0.10627827934648293,0.5106267914912654,0.9369084032832504,0.6721974778436743,0.18257879282803935,0.8937049978961189,0.6517170520096904,0.027975810063090467,0.4344726838835593,0.17200902305488341,0.2887514429402185,0.5626552004638041,0.3137350321752823,0.5103475601223961,0.8004716622521322,0.1654580864920121,0.44786448050270167,0.8151223704918302,0.4317504062138502,0.13410907141930717,0.03988275795372376,0.6538235202075688,0.20829472587785114,0.16631962785731536,0.29907437713514473,0.6106794689786166,0.900500938666748,0.2856724633288874,0.7105563836611863,0.818566802850859,0.0844012612394145,0.6369683173922929,0.10557335553605718,0.933652329889384,0.5031585386932707,0.5302706357613829,0.09961941345911973,0.005521555167465664,0.9699243985596555,0.8000164965800556,0.11284224370704465,0.48807221241948584,0.6143580602287133,0.7020605430510771,0.1453518011264161,0.5814668961026463,0.7094610469456406,0.7475170437618086,0.2930354877730488,0.5965194344482219,0.7704557406975434,0.16996539121780518,0.4893923507251534,0.2550367554146835,0.8266667752431822,0.8973552851889057,0.21450504274371784,0.1500096353709992,0.737564439181642,0.35849374846826665,0.5690508219951858,0.5377214512488251,0.7365375257895463,0.8193645471972797,0.7571827566798812,0.03953069738911319,0.5888647042786603,0.22471713731897536,0.19708076650096062,0.8944197116468227,0.687391267363028,0.7573265812912919,0.5284161050429848,0.33528396987583164,0.2331726715188922,0.9839421010377476,0.6363828836141665,0.4116565907678973,0.3277633079874869,0.689068180656125,0.5658174578544874,0.05871902197135381,0.553428658697086,0.5213953969846246,0.49514667084835806,0.4018613827893971,0.7514609175386207,0.04195962196397596,0.33549075522133553,0.017704921586320976,0.4529108775370283,0.5368433983940646,0.3243314172416656,0.9269865668333093,0.94031001924703,0.03403823448193144,0.1291794716439738,0.7617648936162229,0.15562015271923246,0.5903904403063622,0.17405057203812602,0.0850554144303517,0.6394611521970228,0.1346481906637722,0.4008172721105583,0.609983382708633,0.37939746865425517,0.3413124045299707,0.9709322962166878,0.4526593987116265,0.9917285270168528,0.9264775727444123,0.5601161133861683,0.9627961088708992,0.4924408665082438,0.7552751764434926,0.6136843467807502,0.08338511452199393,0.7395597630640496,0.5623573715136709,0.7538923203661998,0.5712352171371513,0.7046174776123955,0.6860561349370082,0.5908021156675125,0.8775939820803811,0.17790787710715272,0.3282955559950036,0.6414876925598461,0.09999253080032333,0.7559214840360455,0.8574093334744084,0.611063879599486,0.41750300552648034,0.05778337147083845,0.08852643876070632,0.03714287108685621,0.0018950941299122892,0.4233295038306484,0.5793347519935579,0.9102843007833361,0.3686656263584833,0.5065762536653233,0.666366295712626,0.8527648774232581,0.3813107978335799,0.15172924863521775,0.2981191098087459,0.5781513681035055,0.7789067377155265,0.9874907978064991,0.5423369625165606,0.16549169910027528,0.3228340851522866,0.05920038884926537,0.18315806081033958,0.4892514466154896,0.5768915952261147,0.27919982726727555,0.8291154323316603,0.37256976662179997,0.878883399228295,0.6519484634479902,0.5046633746595621,0.5679921407075761,0.5108052392357847,0.4568544947991471,0.04572884616972761,0.5061085441041342,0.27687163826387784,0.16494327666876973,0.2164913943539195,0.21684310062085044,0.5757041964978513,0.8321955271513986,0.6446448734691201,0.7378997945077654,0.5002369557202511,0.27908894170229304,0.5194910514344853,0.4352318618834279,0.019355322637420125,0.9579263625776329,0.7630054368566561,0.5446760316504775,0.14534860026449636,0.4261184977448791,0.8442529940284091,0.16055010774560263,0.2941987543901512,0.3619403810605508,0.9955940918474164,0.38709624713946966,0.674486433654998,0.7359647814718386,0.14497055650027635,0.6800140199092417,0.2443191874097057,0.6066718655940968,0.029758637378775488,0.5679759029380427,0.856010282235385,0.9731308072276108,0.28833545180596176,0.3726973907513387,0.3662371957574546,0.9103406125923987,0.2056532886152722,0.6559474510445984,0.8501953615334683,0.6624068268057195,0.02983275875368685,0.6338186855722672,0.1139129781977899,0.601272791375022,0.3763508189703053,0.7805861510704744,0.9299772292667485,0.3213894544795579,0.593362138128219,0.07108712613871138,0.9679963345771931,0.8851848618849447,0.08389649030180513,0.8152850870200032,0.1376518608682944,0.1483826773794692,0.7354631237118394,0.3361068673352461,0.1906731461569806,0.8644200002841114,0.014054374748590837,0.8054373876433796,0.15918936715428633,0.8934995177490934,0.4242456350446777,0.39373621593223396,0.7595033843199825,0.23835265407185569,0.936622483382707,0.08601542834935638,0.6592802508129427,0.32535220894186634,0.8532451289667173,0.8474863752658557,0.6112788720952447,0.7712470812977872,0.7993855700115113,0.519254611202637,0.679094519715318,0.7570896406222085,0.920829460391793,0.7475812581809562,0.6940578521938585,0.4988842557549171,0.588485838226041,0.8756428167205461,0.46713849446504496,0.012162355293217963,0.14680999522659377,0.8576183179578296,0.19054353301515525,0.9516052648463109,0.8654009476141784,0.5221250904031778,0.917685943265617,0.17195324139356138,0.00397375254935306,0.10102184864481867,0.08753869493079258,0.7427214986073749,0.22443921822016377,0.016441985706657114,0.1688418592063814,0.8946591832939164,0.4121408289549173,0.6053461370127642,0.39180968024833596,0.8892986089194732,0.6207615314221302,0.7969165269735454,0.6833618571731122,0.6322238948132128,0.02744467088467828,0.5243329652300366,0.6334433491299762,0.782379164832059,0.42317119215774057,0.9186135591853299,0.5837945665079463,0.377850225080268,0.11459954343170686,0.870901223546535,0.322498353421216,0.40782662664438685,0.03680808887775022,0.9568498111704715,0.17613089493252176,0.3802599413504122,0.7739441336564878,0.1716846954335074,0.7334447814985496,0.1918068963350843,0.5054127456726589,0.47450570105354384,0.5888766020244562,0.48413734216786497,0.6738680774903554,0.6570551764001009,0.4476595205284717,0.9997770448661416,0.9544759921547483,0.5846768283855652,0.8670008969372092,0.00506858492194473,0.36522096616243904,0.5033699875518127,0.10750975463551637,0.05370270321543713,0.8660342259767095,0.501616579673394,0.9468443652829397,0.5333969625205535,0.7908431421748603,0.7941187824498728,0.09012178012487437,0.9172507077579737,0.38078958564003385,0.9091288600223861,0.7322495764705175,0.780526355704338,0.5742127139302318,0.32453752998303265,0.6071763702847977,0.8152867104244312,0.3061485340648813,0.06231050757989509,0.6345110424296896,0.18620391033976702,0.9002813964509304,0.2307685354351836,0.8966635624042418,0.5701010810729668,0.8280677370040825,0.16700251530765997,0.9670757026106949,0.27346905522071574,0.2433321568545017,0.23228379143083533,0.6788463357344234,0.07025644825695321,0.6276038208044534,0.7746338121739049,0.655013963499935,0.4949361706039046,0.48839969544575057,0.3323217742256874,0.20527976393631753,0.6474576085254875,0.2616528910216871,0.5569046737389258,0.1856905512761302,0.21621849115176106,0.04342762507929154,0.7394996934030722,0.2671333830416833,0.8402346848533102,0.18427570448235886,0.6192107456273739,0.056971979302044895,0.33709815341671434,0.48404708385125783,0.1407926755691178,0.8748778431329707,0.8230802265844994,0.6874992888080418,0.30711341577726214,0.8817559573677205,0.8687137971517853,0.4935224706228629,0.5858417583193269,0.6302429953703554,0.6756970709555608,0.38507540376294846,0.2257123985533942,0.427622113880896,0.8795229779986355,0.8441877244880323,0.4179412250010579,0.883298686175082,0.18679487487472612,0.14584691665637095,0.27244191644315263,0.6850740631539503,0.8759698622215122,0.8757228525720739,0.8228648821587454,0.1739429715482943,0.3738431759833656,0.013484206893811912,0.3743623221825463,0.9108317928261627,0.2607330106975292,0.7115771013325176,0.627391430802605,0.8006375290335697,0.2840008091840751,0.18890342135327765,0.8947814344977401,0.8489555941769131,0.9369821904654596,0.15315224735303,0.06580254803682206,0.539370088188216,0.22366173519025456,0.7467814330360194,0.7735687156122788,0.3164163041116044,0.5348614814063193,0.7370302222936271,0.8434469370266386,0.33235616585227756,0.3362378183968455,0.38264040430991453,0.9513936685780586,0.6372794664325856,0.5979567409026254,0.5485411130749958,0.9177195615938665,0.2367505492079658,0.963997557640448,0.5698828626156718,0.3193616623524962,0.9306691902572992,0.7256806927446158,0.4762821567968485,0.5974567370363926,0.7940152101133642,0.6355643647495748,0.7666552028400802,0.17047395886038896,0.09188280277332295,0.08523187434733659,0.6305207220794686,0.4853808414887266,0.4768480498333272,0.06973743270538746,0.29451939250911363,0.9187459064129488,0.3907077328602424,0.7093866046637647,0.47341491345597775,0.6419148264018499,0.8218269990773532,0.5380742903178377,0.6780824285276987,0.870236459046482,0.08179923396775202,0.02820083916122984,0.05587626570706927,0.9559936456275275,0.8488929502918929,0.8642631993553422,0.7797308868781911,0.04670937826053234,0.23373785076638876,0.5581119049831642,0.8130016383044485,0.0830584795137157,0.9491908528020652,0.3239882558649996,0.9224464744327168,0.653365446415884,0.8615688429534691,0.8553291851828333,0.1591176860836836,0.6580250983697167,0.45622190075880686,0.9936550206884156,0.01813141784438188,0.9551819238364652,0.5680772705613508,0.8671587496752644,0.5159037732744856,0.8179283476365244,0.20268653447167106,0.8724820018477566,0.5403963354902124,0.7792436339405309,0.7191305344658199,0.18300764707281147,0.44543205553643284,0.48793906279674104,0.6027713390880214,0.7535274484422352,0.4353095622726817,0.5930637159857977,0.9310321331096316,0.6308563805099203,0.5312607720737483,0.8405473631297444,0.16297175365300132,0.12573679010977035,0.16909096840291316,0.8701329084027363,0.5060319818496597,0.3605336898129985,0.6799279246638656,0.6815116939958608,0.9678313924225479,0.8677199422463908,0.8676311124277911,0.022778869866430185,0.785735444133725,0.28536513636940763,0.8743883613804309,0.7206621486159943,0.8406998040307121,0.7223050417813568,0.36885797588557256,0.5704248989031051,0.6838393851021518,0.6302450105853121,0.2958197868718784,0.4787592923592605,0.9342822614299242,0.22376228383383134,0.5727307944600399,0.09815885440840755,0.9257148398879149,0.016644152530450373,0.8760793982929922,0.2606569439879638,0.8475062120421717,0.8312284350945358,0.40453595754259286,0.30984398824737913,0.21377354673233606,0.17044822357867528,0.4876911981258696,0.2698127349614523,0.17355578224081714,0.25562615841712644,0.422003017513652,0.25670205571595583,0.35729821094071457,0.5720186335663406,0.6456589243291873,0.45670342288337706,0.011383656639051276,0.937326869430217,0.12062461703847971,0.5614720640352915],"beta":[11.18072936202787,15.666552934946026,17.170498447774214,19.22556562433453,18.40685033651416,14.096647347347197,13.4334097779162,17.849730697453232,19.308941758603332,18.465630933853284,18.397770519914083,15.917745404748684,10.211879846486308,16.101097274968378,19.160284165972975,10.362140495232683,18.83839544530624,19.05924262932929,12.841165253495486,14.34655588210937,19.78172082368635,17.55419829123641,16.819389547418847,12.190103264060003,19.328332425097017,13.778106361066138,18.158160065771092,14.668579088116537,13.962892595489897,14.820055071844491,10.520924418131886,10.133358327575493,11.780610590219382,15.946430437581585,14.799816763430025,18.4600522068243,16.26081010423998,10.537480217847058,15.610561065657755,11.846348066139106,11.982047276870029,13.850341714722747,11.534098211250507,14.84269698360556,16.88299635260044,17.55099607700595,18.102836470423604,10.297612886137,19.690204776371104,17.141658733248747,14.91602208028732,10.204602439078743,16.035293737666336,14.07773079779324,19.184070901297773,12.224530402598601,16.751406120017887,17.552098235109632,10.199356817695147,13.401796582696313,10.107405756108232,11.247670969735635,11.487520724548173,14.411466850444768,12.732637797917029,16.57174937349886,18.633492994012244,14.535294105338362,13.529958367609915,16.403801369237847,11.318269639689227,10.07565243317271,14.707066424431034,11.201729872401767,14.856537046590358,10.56993895383356,12.127065224779033,11.25030761940047,13.163689042533465,14.873519321328585,13.542592726920166,18.7842520884182,19.990387091539723,10.745697265726704,14.472703202443027,16.514402006984124,16.27150084274667,11.35127656189831,18.18716309878712,17.561320286700166,19.153389776577622,10.137011346167611,18.562586663542582,12.146001995994924,17.323618424751725,18.81500316489806,18.087433286895298,14.239058677501465,18.968446462758557,14.141623637103626,16.89518249105339,17.580071848555512,12.146289865519526,12.17126718480285,16.80982113132002,12.698527002665418,11.815420054602018,15.889893442230143,17.954793229680273,17.861318695083796,16.646116947626563,14.670488911069071,13.010355627345461,17.8653098106572,17.42237349349331,12.838562767199681,16.73728286768589,12.209994077891768,11.042210499820175,17.931217707287836,11.335204345935079,11.562072444706322,15.338640063287732,18.225125448412495,13.556759674674657,10.695302027031584,16.875036809886907,10.908941457464804,15.003894235800077,12.014216496881758,12.202435921582339,19.34163167973994,19.917876312146234,19.23512693850832,10.096656099226038,14.208948788333892,11.068900224920421,12.23930815255202,13.20483270299813,18.01271804081633,18.586596413224115,13.781000968249018,18.05325387906734,17.10114497092232,18.456770878741768,17.93499474277143,11.865830664455908,18.994469782030958,13.370362166690978,19.304992172152048,18.96446421200671,10.223878029518193,12.611381393302828,19.084126130011008,12.612771882829366,18.893252721344897,10.729300472159014,11.936917863818575,10.333005908293947,12.319573400919646,17.4045573410198,19.700656860254984,10.103525365060033,15.8145728669225,16.701245876387325,10.81711025389221,12.324736863449342,13.396658725669411,16.526260734958697,18.24176640062431,18.05866151329115,19.22367784202971,16.319655040541274,10.44003870313201,11.50218343766544,15.466353549197166,15.373396732096843,15.544266094830967,10.513254650080395,15.797139147512425,19.915999871173717,16.59305338909911,14.78519147716806,13.157178014464781,17.599436163453436,19.52196665980924,14.12309394408501,16.2013764872829,16.680395743404258,15.296082722083405,11.167956761662962,12.530848535250836,18.88022523161574,15.816959896000618,10.577145608779187,13.270642549989514,10.085780212196614,16.502952770420965,19.291238483154984,10.056964588761454,12.987520975783367,17.316819050868645,13.387984921336635,14.534796678455548,16.9242398312268,15.84212004151221,12.282234842724867,14.305933375616144,17.370600839096184,11.981743856139975,15.616860670665886,18.031978131159462,17.471696666073512,19.295790333787043,14.326345702474173,10.9153644262927,13.311596086657314,19.31065567431424,18.232749729770383,12.040966319074693,15.736513491628319,13.395408812164662,17.709966842343974,12.53185581463673,12.149109866951346,19.105839347493767,15.86519540386545,14.150167161792957,18.036773213363603,14.107485588941449,17.179840710225687,14.09523793165236,15.75098728563296,11.271007491338388,16.93572048999794,19.671294066911944,10.142062731045861,18.851372651026097,17.401888722689165,15.638142690225589,19.25300642273394,17.089494483393487,15.08989239170208,11.476890950491132,11.690873031733705,13.267623222028291,19.73651245696667,17.452167391168047,14.528176981009233,15.139077963870633,14.661785259503478,14.908203191094776,16.53772112718812,19.702714188331036,12.897402378210765,12.705676807556925,11.689370686447372,12.186462655172143,13.625333577128655,10.570064292819726,11.058397553659113,13.246334714052065,10.8977105861497,13.166869506380298,16.094752699420418,19.98153952988669,11.035190168704148,17.244265091884518,18.646739458982253,18.854163815753026,18.74880265906163,14.440377825806676,10.956766860820666,15.06609174737899,14.403958712191605,15.957543787993448,15.76955471184976,16.690685587081404,19.65974125087946,16.848679656143723,18.28030149509939,16.983605582805158,17.557407409318387,16.345533854615333,18.024917681769523,10.10279404283999,17.232462623167233,18.35291143995896,10.913605576926448,16.676084114140203,17.313696109521263,12.268224883485884,15.600944064157288,12.199351174715519,11.389385580996265,11.607652171508786,19.827534596040266,17.252316037949146,14.852039303207778,11.78328625678644,17.852848240002906,14.12443883261462,13.069419442525273,11.992674920619383,10.485758026769298,13.862350206921866,17.445788364315113,15.105550113256083,13.92288525417614,19.665333111414718,19.844288895006844,17.738697555104988,17.423132281587517,10.746866495716514,16.115726259778377,14.38439949206569,10.137324702697658,14.103401646554321,11.550315186975087,14.652083680873877,12.012961131484056,19.53880421348822,13.946562896644942,11.527902205794646,10.791219137538608,15.517562132061794,16.858995228024867,18.821685513752133,18.26281328819217,11.46683420589573,15.72061524128862,17.959360692061857,13.181554182503403,15.792093485936977,13.090317677671223,15.571592336347976,17.401512791215044,15.599775719427845,19.976977232184836,14.341095676312872,10.396619525748633,18.9911611794615,10.219558498228826,15.76996295162102,11.3118212535667,14.416248017207137,16.198089362243373,17.190456566994218,15.185035363724221,10.8700264504793,13.685162512905816,19.13020169931089,13.972057564391275,18.294002603640177,13.586688968097956,16.721952420667048,11.601420050992346,14.620767630507412,15.398719979130238,14.150770747752297,18.311404312187733,14.968133948681928,16.937071677962884,10.487602254552977,16.35170026611142,10.991405024224477,15.276010162783301,10.393509335611025,19.170666132825666,15.631897208257868,15.470273320503434,13.706309672935015,12.006366828409083,10.003312319074125,16.176523845520464,13.68885425678866,18.737914792055655,10.126153675232866,10.132442636860507,18.97885736021889,14.666283865871359,16.022175292321485,10.547231647732456,14.983299299034034,17.711568944794823,19.474121822813437,17.317670215124267,18.177839891360804,11.297227836117035,16.446711648922292,14.982321907615649,15.818806728223533,18.634807235494236,14.67409536265187,17.80003248549294,13.25684748437542,17.826036034174678,19.121427881807772,11.395379922020929,14.910163757635233,19.702618726845188,11.040724467440036,12.060230954514974,16.034262937494347,13.749396981690483,17.877388021861258,16.527286070963278,14.964496685308532,12.875333308674357,16.955876248521413,12.749486190836283,12.946596537133694,11.032761619606749,11.609526909434532,10.85704740530682,18.231361302315058,13.375528574841717,16.83681427316356,17.13492198121979,18.184916563292326,16.97914926598709,14.181669876098939,16.18269145998203,15.504555777526152,13.032363964374547,17.382858940818636,11.517809228954043,14.011196906746981,15.440846817776649,15.508910216446521,12.775905842449509,11.288118144888529,11.564447594084971,11.884239483073715,17.249535377842214,14.310541457440111,18.64096437317375,17.770415243589323,11.979269651782738,12.790729903790481,10.874644969779201,10.91634151256879,17.14242855235239,12.209329766433388,17.572207832952323,12.124620893418484,16.030233502312118,12.184565608176554,18.182435731668818,17.385698355481697,12.778635130874683,18.666671641201333,16.553304424001162,10.14525569086314,14.291476088687784,13.435965861886707,12.305940970276588,17.816602354853526,12.751424272898568,11.683795491751114,14.028351992753844,17.158245312409903,18.69553651938012,17.234016724844576,15.269926294403147,14.754652156197974,11.98698705681477,11.533808050030263,15.906517103875027,11.818689367546327,11.573826155415459,12.150823507934856,15.295781685747482,11.983199208726752,11.484071097550029,16.279853704561464,11.591436680041486,11.694232257092253,19.226148492887834,11.796724414489647,13.422259401261256,14.47234786953301,18.79858142405818,15.657827822868109,17.637771657238673,15.191276689801699,18.388617595862602,11.403087013244557,14.581837233125082,14.72881191003534,17.540123944423655,10.977491495729652,11.068297229275181,19.4634367588791,16.00169958813875,16.222538725569834,16.272021021729834,15.062896944899911,16.36601511518208,14.473754639494267,18.085934902884667,11.186284465008304,10.238606311335158,14.124728894653343,12.365349550330757,11.651632113603617,16.992850285000934,19.377991811013928,19.97309020875027,15.12129424414369,14.60864149546065,11.729768763020168,18.315838452670217,14.156219852285792,13.759722287802516,12.783548328022496,15.537708609684287,13.043058499647408,16.918319900143654,10.997305099212527,12.006375692301658,19.877042447104223,12.911685847366074,18.44398450022789,10.439327593598835,11.304160665282497,18.24864850201255,18.67767483256447,12.592015287054279,14.903836375674036,11.203994805631801,16.478266426745805,13.734252023388962,19.260687357306455,15.755504031109384,17.098740322092972,17.51858120377042,16.079912743310928,11.783353974267708,15.403142778957301,16.116102155326736,16.659692611040956,17.912597214255182,13.896494330679765,16.830488517230307,10.49506884399869,18.407424851759068,12.449934256084417,10.406509082135639,16.38344188488461,16.62494142987226,17.255656374844094,18.215839931283845,15.743361427971793,15.147635150063007,18.41004124769187,18.643081376079174,15.996250234298678,11.899609818142158,12.045854663153916,17.13913709922391,15.837369524451015,13.178600239842078,11.257481144392125,13.960370355527601,14.41723262948332,15.44016511504692,19.584259351314472,13.934921688845101,14.555676381742149,15.228837023552614,19.835232968066734,14.305980843852113,19.944940917982564,19.203478502048725,18.422500595317466,10.70259968695671,13.9410744925628,11.653072542590944,12.279005942359385,13.315685092121177,14.305046099620306,13.401684541462874,12.74093670957271,17.61853283554715,14.450981639732658,18.228334753756695,19.361079324725218,17.98707113703645,10.02214143657113,11.598580407774975,12.908777956321533,15.85651373488185,12.603456201015053,13.657324405407243,14.30185229727201,17.02939020782869,17.75458125652711,18.50047622342165,16.752786157609496,10.883206925900124,15.182679023800521,17.069174231565853,17.952760321844906,15.08662978003513,14.269076180662001,12.25964291026851,13.883341836722096,15.509206970014478,18.560867758702987,14.221897947450323,18.351459054282223,16.307869210042455,16.371446055659618,13.784326009197407,14.808198001266575,11.75623534619007,19.29411184469734,14.402075280681112,12.260654728782987,17.396732823274917,13.475732513107557,15.742402023458526,12.056173191300264,18.95357893149683,18.724455631818948,19.51883991063994,10.36939122196715,17.559250993495876,18.48280146375118,17.993690892466624,13.087230260761473,18.081499255211288,19.776988368083202,16.692249207217955,10.684405530604987,14.926347477829243,17.518216307395704,18.40100136916587,11.812868009510925,14.890611690530424,17.62396679726386,14.970227305800648,18.387658705051184,16.039848443637442,15.676193487242422,13.419915183557547,13.753509611928646,16.92590373373978,17.697442318776957,12.168221617788575,11.106914115345752,10.66828149273837,16.611157604889556,16.73004922991131,18.917077154042765,14.432582358556603,12.7960775715301,19.93152110117998,10.07453303319296,11.385764983238925,12.84210615878001,13.066962959410994,18.98011136027313,17.408272453101645,16.910564203024443,12.277795574939622,12.000295852427133,13.81288645735398,13.785577238232987,11.735027246739769,14.484050914936157,16.878156262956068,11.951972862208802,12.111656884151078,13.954986507789869,18.534780110474472,12.631491347463621,15.124808618071267,16.89782829303594,18.074465410397913,19.24411028277209,11.91086544324823,18.724346724486928,19.763716878769205,11.72842395353278,10.166988404734855,17.3273919386194,19.96894212648744,19.771226155758654,11.028823994630512,19.252422758267898,14.7465741655597,11.24551000631121,14.163920841891628,15.028155585407227,10.030952835109092,15.482102859531981,15.839722729364565,17.591559158692064,11.216269074916145,17.577216013219065,17.410996437686315,13.133284178381174,13.299681143988831,17.627382716705817,12.610121341018836,13.978114697087227,17.044814467700085,19.0832651108631,18.744824344167593,18.93361031681465,14.548270455681187,19.50565388115721,13.34209631208539,16.107418273261832,16.054243620284485,10.70284091547405,15.83774002309408,15.084905083860798,16.217485972023894,15.895012183484711,19.285545724811165,10.29660300864197,19.605851462746813,12.810890209372449,16.667478141609564,18.217530987116994,12.791603837081206,13.452452672798055,11.518195946739095,17.318171395035463,10.31724880777277,14.320241495060738,19.289257406802186,15.357462641541751,17.396575401442185,14.267376826933734,14.361979370683924,16.27480230623759,16.369371370539866,10.499951972797696,19.867974887605378,16.44615434156192,17.488895323121383,18.49946526228874,14.424651558978391,11.294079842094916,13.73461903665947,10.092982304108173,19.643527440826283,11.342276104248189,15.229664323156682,17.934817265713434,14.893011777824563,13.759202104210226,13.923494941879737,19.183021731787868,10.711915799710642,16.900135555554016,11.026871473788646,11.737282009383513,18.977566547954783,14.572275260014809,18.684104974541395,18.44224226691992,12.45815035214721,14.980820333641756,15.183500917922565,15.50946076930895,17.557724876833216,19.935939309321995,17.598498944842547,19.807164002621906,18.429792623958974,11.732100862607656,12.588590287093828,19.46095803482767,12.104317304262416,10.133501324592139,19.8863957374358,18.10646306398687,13.5237672476209,12.72388983519986,15.316007604645407,14.650955853714256,12.78415259456645,16.04952575967866,18.580475899666624,11.07881265325143,13.656027246432693,15.978568722495387,14.924983872942173,19.121299658236637,13.356003844197028,17.087765645491714,13.83269921558716,16.002662840959587,16.498367089856266,19.152972868000045,15.881690710370126,16.121914688687212,15.392044230135124,16.41042076837658,18.374468356412812,13.241832891944918,10.674616858674572,14.201139730988292,11.809931043739407,13.300893201307373,19.91107188714846,16.936159017178056,12.124398897216206,15.60477079616784,17.26910399691402,19.484460669835585,14.754890773795077,10.952276512363534,11.032982877190014,13.833348150700008,16.517210222869913,18.008533908901107,16.549076142204658,18.811487232058074,16.51656225933626,14.34469011790431,13.03996288512584,19.048545323441203,12.567226583876206,14.19662878701179,19.065106293652864,15.190865199111718,17.363875860185324,13.791469194203431,19.896271818783074,16.235062665434683,19.210261566631015,16.931525520819832,14.80798813446932,16.148161693413584,10.98166169239828,11.918734565223346,17.713373564297235,10.967758988978593,10.773755509233885,18.699834895456867,14.08912392306339,13.983091351821965,10.10648555397382,15.029691467294155,13.053891415187877,12.018688356518961,18.436536986265114,12.680574036431127,17.921793235545582,17.450725303307863,18.766398711839685,16.576882818494283,14.500118042813492,11.925450717912877,16.585251017760147,12.75524810332181,14.942179999541484,19.896199497804922,15.793296566527617,15.00105322389196,17.56217545010928,10.559722446512227,11.700573649498256,10.958446993444868,16.14695592699537,15.300424747871501,15.521998147244352,18.550043245665538,16.070164143512308,14.292204556767725,18.575263244264768,15.74275697771804,15.338690584521505,16.752508927613814,13.832981075940156,12.622082520410498,10.534827068188488,18.01345152677312,15.959052380789021,13.5405362242315,13.80362497257191,19.633877758456087,10.876396089711456,14.518288159078296,10.01600042332312,14.817324438829447,12.217662518907646,15.383784301213275,17.697215804205708,18.20218232235105,13.895448875920817,13.815171119017517,13.958563301357161,11.112695341856817,11.610071389046869,11.332829290572553,11.773864878723268,17.5483091963468,18.292562338032578,19.705882680807278,14.989047840360485,16.711730223490854,17.629312810594683,11.491045840945812,18.96356859326385,17.150474078801466,19.4396991164979,15.760111269052597,14.21476200576802,10.837122124341128,12.852816973923254,17.37086119921191,17.23648995003426,19.47567042776617,15.93339904056889,12.496129997467936,15.863479358746774,17.90110045302515,12.466630089477576,19.990226880195422,13.33704246200488,10.069208388973765,19.374969756143567,17.760098974329786,16.35179821147963,11.964324158540977,19.75493000462466,17.886089058656133,13.662584338300135,16.43232706718252,14.157607535533055,12.645967366973597,15.51839308370992,15.759516881272793,15.982341259677284,18.16739015235172,16.70657173406112,18.99733905298378,12.39757574316119,14.673538562313059,15.392723726133543,10.39729791553456,19.872623441593415,14.784431220909823,16.999072024647617,17.632150915418034,16.012925171627185,12.566311079336703,14.378301622194357,10.065553589537759,17.731680213605088,11.400482056510597,13.293002083253928,17.901891352525865,11.772387310206254,17.361149247288658,14.672835323687828,13.57620071692337,19.112273250200364,14.740540898545852,11.977404635836562,19.14426110726992,17.131396882354228,19.345533183444957,10.020925401863309,19.640537698804266,16.90329904424504,12.797403316841347,10.862301861907053,10.475456802405521,19.365025232723298,17.43951394370651,10.922776738347999,14.773314197853667,18.60951154611683,19.744414715981815,10.00538109742379,13.289851703953238,11.27310799664301,16.48218161864369,19.355406630698873,14.52771626929884,14.039681375242111,19.152643692988406,13.751561715869522,11.356912873889565,14.056284695443107,17.47992490466197,16.869939146247763,10.929396548260195,13.994659249669418,19.172511436477677,17.384102674595447,17.086804395964798]}
},{}],29:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var cdf = require( './../lib' );


// FIXTURES //

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number less than or equal to zero for `x` and a finite `alpha` and `beta`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -100.0, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -1.0, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 0.0, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `+Infinity` for `x` and a finite `alpha` and `beta`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.5, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1/0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 80.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 80.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/betaprime/cdf/test/test.cdf.js")
},{"./../lib":24,"./fixtures/julia/both_large.json":26,"./fixtures/julia/large_alpha.json":27,"./fixtures/julia/large_beta.json":28,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":172,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189,"tape":253}],30:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `0` when provided a number smaller than or equal to zero for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -100.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -10.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `1` when provided `+Infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.5, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, 0.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 0.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( -1.0, 0.5 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, 1.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, PINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NaN );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 80.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var cdf;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( alpha[i], beta[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 80.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/betaprime/cdf/test/test.factory.js")
},{"./../lib/factory.js":23,"./fixtures/julia/both_large.json":26,"./fixtures/julia/large_alpha.json":27,"./fixtures/julia/large_beta.json":28,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":172,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189,"tape":253}],31:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/betaprime/cdf/test/test.js")
},{"./../lib":24,"tape":253}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"./abs.js":32}],34:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* COPYRIGHT
*
* Cephes Math Library Release 2.8:  June, 2000
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
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

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PIO4 = require( '@stdlib/math/constants/float64-fourth-pi' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS.

/*
* arcsin(x) = x + x^3 P(x^2)/Q(x^2)
* 0 <= x <= 0.625
* Peak relative error = 1.2e-18
*/
var P = [
	-8.198089802484824371615e0,
	1.956261983317594739197e1,
	-1.626247967210700244449e1,
	5.444622390564711410273e0,
	-6.019598008014123785661e-1,
	4.253011369004428248960e-3
];
var Q = [
	-4.918853881490881290097e1,
	1.395105614657485689735e2,
	-1.471791292232726029859e2,
	7.049610280856842141659e1,
	-1.474091372988853791896e1,
	1.0
];

/*
* arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
* 0 <= x <= 0.5
* Peak relative error = 4.2e-18
*/
var R = [
	2.853665548261061424989e1,
	-2.556901049652824852289e1,
	6.968710824104713396794e0,
	-5.634242780008963776856e-1,
	2.967721961301243206100e-3
];
var S = [
	3.424398657913078477438e2,
	-3.838770957603691357202e2,
	1.470656354026814941758e2,
	-2.194779531642920639778e1,
	1.0
];


// FUNCTIONS //

// Compile functions to evaluate rational functions based on the above coefficients...
var ratevalPQ = evalrational( P, Q );
var ratevalRS = evalrational( R, S );


// MAIN //

/**
* Computes the arcsine of a number.
*
* @param {number} x - input value
* @returns {number} arcsine (in radians)
*
* @example
* var v = asin( 0.0 );
* // returns ~0.0
*
* @example
* var v = asin( Math.PI/2.0 );
* // returns ~1.0
*
* @example
* var v = asin( -Math.PI/6.0 );
* // returns ~-0.5
*
* @example
* var v = asin( NaN );
* // returns NaN
*/
function asin( x ) {
	var sgn;
	var zz;
	var a;
	var p;
	var z;

	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x > 0.0 ) {
		a = x;
	} else {
		sgn = true;
		a = -x;
	}
	if ( a > 1.0 ) {
		return NaN;
	}
	if ( a > 0.625 ) {
		// arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
		zz = 1.0 - a;
		p = zz * ratevalRS( zz );
		zz = sqrt( zz + zz );
		z = PIO4 - zz;
		zz = ( zz*p ) - MOREBITS;
		z -= zz;
		z += PIO4;
	} else {
		if ( a < 1.0e-8 ) {
			return x;
		}
		zz = a * a;
		z = zz * ratevalPQ( zz );
		z = ( a*z ) + a;
	}
	return ( sgn ) ? -z : z;
} // end FUNCTION asin()


// EXPORTS //

module.exports = asin;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/base/tools/evalrational":142,"@stdlib/math/constants/float64-fourth-pi":175}],35:[function(require,module,exports){
'use strict';

/**
* Compute the arcsine of a number.
*
* @module @stdlib/math/base/special/asin
*
* @example
* var PI = require( '@stdlib/math/constants/float64-pi' );
* var asin = require( '@stdlib/math/base/special/asin' );
*
* var v = asin( 0.0 );
* // returns 0.0
*
* v = asin( PI/2.0 );
* // returns ~1.0
*
* v = asin( -PI/6.0 );
* // returns ~-0.5
*
* v = asin( NaN );
* // returns NaN
*/

// MODULES //

var asin = require( './asin.js' );


// EXPORTS //

module.exports = asin;

},{"./asin.js":34}],36:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var E = require( '@stdlib/math/constants/float64-e' );
var EPSILON = require( '@stdlib/math/constants/float64-eps' );


// VARIABLES //

var G = 10.90051099999999983936049829935654997826;
var NUM = [
	709811.662581657956893540610814842699825,
	679979.847415722640161734319823103390728,
	293136.785721159725251629480984140341656,
	74887.5403291467179935942448101441897121,
	12555.29058241386295096255111537516768137,
	1443.42992444170669746078056942194198252,
	115.2419459613734722083208906727972935065,
	6.30923920573262762719523981992008976989,
	0.2266840463022436475495508977579735223818,
	0.004826466289237661857584712046231435101741,
	0.4624429436045378766270459638520555557321e-4
];
var DENOM = [
	0,
	362880,
	1026576,
	1172700,
	723680,
	269325,
	63273,
	9450,
	870,
	45,
	1
];


// FUNCTIONS //

/**
* Calculate the Lanczos approximation scaled by exp(G).
*
* @private
* @param {number} z - input value
* @returns {number} Lanczos approximation
*/
var lanczosSumExpGScaled = evalrational( NUM, DENOM );


// MAIN //

/**
* Evaluate the beta function.
*
* @param {NonNegativeNumber} a - input value
* @param {NonNegativeNumber} b - input value
* @returns {number} evaluated beta function
*
* @example
* var v = beta( 0, 0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = beta( 1, 1 );
* // returns 1
*
* @example
* var v = beta( -1, 2 );
* // returns NaN
*
* @example
* var v = beta( 5, 0.2 );
* // returns ~3.382
*
* @example
* var v = beta( 4, 1 );
* // returns 0.25
*
* @example
* var v = beta( NaN, 2 );
* // returns NaN
*/
function beta( a, b ) {
	var prefix;
	var ambh;
	var agh;
	var bgh;
	var cgh;
	var res;
	var tmp;
	var c;

	prefix = 1;
	c = a + b;
	if ( isnan( a ) || isnan( b ) ) {
		return NaN;
	}
	if ( a < 0.0 || b < 0.0 ) {
		return NaN;
	}
	if ( b === 1.0 ) {
		return 1.0 / a;
	} else if ( a === 1.0 ) {
		return 1.0 / b;
	} else if ( c < EPSILON ) {
		res = c / a;
		res /= b;
		return res;
	}

	// Special cases:
	if ( c === a && b < EPSILON ) {
		return 1.0 / b;
	} else if ( c === b && a < EPSILON ) {
		return 1.0 / a;
	}

	if ( a < b ) {
		// Swap a and b:
		tmp = b;
		b = a;
		a = tmp;
	}

	// Lanczos calculation:
	agh = a + G - 0.5;
	bgh = b + G - 0.5;
	cgh = c + G - 0.5;
	res = lanczosSumExpGScaled( a ) * ( lanczosSumExpGScaled( b ) /
		lanczosSumExpGScaled( c ) );
	ambh = a - 0.5 - b;
	if ( ( abs( b * ambh ) < ( cgh * 100.0 ) ) && a > 100.0 ) {
		// Special case where the base of the power term is close to 1; compute (1+x)^y instead:
		res *= exp( ambh * log1p( -b / cgh ) );
	} else {
		res *= pow( agh / cgh, a - 0.5 - b );
	}
	if ( cgh > 1e10 ) {
		// This avoids possible overflow, but appears to be marginally less accurate:
		res *= pow( (agh / cgh) * (bgh / cgh), b );
	} else {
		res *= pow( (agh * bgh) / (cgh * cgh), b );
	}
	res *= sqrt( E / bgh);

	// If a and b were originally less than 1 we need to scale the result:
	res *= prefix;
	return res;
} // end FUNCTION beta()


// EXPORTS //

module.exports = beta;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/log1p":105,"@stdlib/math/base/special/pow":111,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/base/tools/evalrational":142,"@stdlib/math/constants/float64-e":171,"@stdlib/math/constants/float64-eps":172}],37:[function(require,module,exports){
'use strict';

/**
* Evaluate the beta function.
*
* @module @stdlib/math/base/special/beta
*
* @example
* var beta = require( '@stdlib/math/base/special/beta' );
*
* var v = beta( 0.0, 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = beta( 1.0, 1.0 );
* // returns 1.0
*
* v = beta( -1.0, 2.0 );
* // returns NaN
*
* v = beta( 5.0, 0.2 );
* // returns ~3.382
*
* v = beta( 4.0, 1.0 );
* // returns 0.25
*
* v = beta( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var beta = require( './beta.js' );


// EXPORTS //

module.exports = beta;

},{"./beta.js":36}],38:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaDeltaRatio = require( '@stdlib/math/base/special/gamma-delta-ratio' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var gammainc = require( '@stdlib/math/base/special/gammainc' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MIN_VALUE = require( '@stdlib/math/constants/float64-smallest-normal' );
var EPSILON = require( '@stdlib/math/constants/float64-eps' );
var fullIGammaPrefix = require( './full_igamma_prefix.js' );
var regularisedGammaPrefix = require( './regularised_gamma_prefix.js' );


// MAIN //

/**
* This is DiDonato and Morris's BGRAT routine, see Eq's 9 through 9.6.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {NonNegativeInteger} s0 - initial value
* @param {number} mult - initial value
* @param {boolean} normalised - boolean indicating whether to evaluate the regularized or non-regularized incomplete beta function
* @returns {number} function value
*/
function betaSmallBLargeASeries( a, b, x, y, s0, mult, normalised ) {
	var prefix;
	var tmp1;
	var tnp1;
	var sum;
	var b2n;
	var bm1;
	var lx2;
	var lxp;
	var mbn;
	var lx;
	var t4;
	var h;
	var j;
	var m;
	var n;
	var p;
	var r;
	var t;
	var u;

	// Some values we'll need later, these are Eq 9.1:
	bm1 = b - 1.0;
	t = a + ( bm1 / 2.0 );
	if ( y < 0.35 ) {
		lx = log1p( -y );
	} else {
		lx = ln( x );
	}
	u = -t * lx;

	// And from from 9.2:
	h = regularisedGammaPrefix( b, u );
	if ( h <= MIN_VALUE ) {
		return s0;
	}
	if ( normalised ) {
		prefix = h / gammaDeltaRatio( a, b );
		prefix /= pow( t, b );
	} else {
		prefix = fullIGammaPrefix( b, u ) / pow( t, b );
	}
	prefix *= mult;

	// We need the quantity Pn, unfortunately this is computed recursively, and requires a full history of all the previous values so no choice but to declare a big table and hope it's big enough...
	p = new Array( 30 );
	p[ 0 ] = 1;  // see 9.3.

	// Now an initial value for J, see 9.6: gammainc( u, b, regularized, upper )
	j = gammainc( u, b, true, true );
	j /= h;

	// Now we can start to pull things together and evaluate the sum in Eq 9:
	sum = s0 + ( prefix * j ); // Value at N = 0

	// Some variables we'll need...
	tnp1 = 1.0; // 2*N+1
	lx2 = lx / 2.0;
	lx2 *= lx2;
	lxp = 1.0;
	t4 = 4.0 * t * t;
	b2n = b;
	for ( n = 1; n < p.length; ++n ) {
		// Begin by evaluating the next Pn from Eq 9.4:
		tnp1 += 2;
		p[ n ] = 0.0;
		mbn = b - n;
		tmp1 = 3;
		for ( m = 1; m < n; ++m ) {
			mbn = ( m * b ) - n;
			p[ n ] += mbn * p[ n-m ] / factorial( tmp1 );
			tmp1 += 2;
		}
		p[ n ] /= n;
		p[ n ] += bm1 / factorial( tnp1 );

		// Now we want Jn from Jn-1 using Eq 9.6:
		j = ( ( b2n * ( b2n+1.0 ) * j ) + ( ( u+b2n+1.0 ) * lxp ) ) / t4;
		lxp *= lx2;
		b2n += 2.0;

		// Pull it together with Eq 9:
		r = prefix * p[ n ] * j;
		sum += r;
		if ( r > 1.0 ) {
			if ( abs( r ) < abs( EPSILON * sum ) ) {
				break;
			}
		} else if ( abs( r / EPSILON ) < abs( sum ) ) {
			break;
		}
	}
	return sum;
} // end FUNCTION betaSmallBLargeASeries()


// EXPORTS //

module.exports = betaSmallBLargeASeries;

},{"./full_igamma_prefix.js":41,"./regularised_gamma_prefix.js":48,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/factorial":67,"@stdlib/math/base/special/gamma-delta-ratio":72,"@stdlib/math/base/special/gammainc":87,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/log1p":105,"@stdlib/math/base/special/pow":111,"@stdlib/math/constants/float64-eps":172,"@stdlib/math/constants/float64-smallest-normal":190}],39:[function(require,module,exports){
'use strict';

// MODULES //

var ibetaImp = require( './ibeta_imp.js' );


// MAIN //

/**
* Evaluates the incomplete beta function.
*
* @param {Probability} x - function parameter
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete beta function
* @param {boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete beta function
* @returns {number} function value
*
* @example
* var y = betainc( 0.5, 2.0, 2.0 );
* // returns 0.5
*
* @example
* var y = betainc( 0.5, 2.0, 2.0, false );
* // returns ~0.083
*
* @example
* var y = betainc( 0.2, 1.0, 2.0 );
* // returns 0.36
*/
function betainc( x, a, b, regularized, upper ) {
	if ( regularized !== false ) {
		return upper ?
			ibetaImp( a, b, x, true, true ) :
			ibetaImp( a, b, x, false, true );
	}
	return upper ?
		ibetaImp( a, b, x, true, false ) :
		ibetaImp( a, b, x, false, false );
} // end FUNCTION betainc()


// EXPORTS //

module.exports = betainc;

},{"./ibeta_imp.js":44}],40:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var binomcoef = require( '@stdlib/math/base/special/binomcoef' );
var floor = require( '@stdlib/math/base/special/floor' );
var pow = require( '@stdlib/math/base/special/pow' );
var MIN_VALUE = require( '@stdlib/math/constants/float64-smallest-normal' );


// MAIN //

/**
* For integer arguments we can relate the incomplete beta to the  complement of the binomial distribution cdf and use this finite sum.
*
* @private
* @param {NonNegativeInteger} n - number of trials
* @param {NonNegativeInteger} k - function input
* @param {Probability} x - function input
* @param {Probability} y - probability equal to `1-x`
* @returns {number} sum
*/
function binomialCCDF( n, k, x, y ) {
	var startTerm;
	var result;
	var start;
	var term;
	var i;

	result = pow( x, n );
	if ( result > MIN_VALUE ) {
		term = result;
		for ( i = floor( n - 1 ); i > k; --i ) {
			term *= ((i + 1) * y) / ((n - i) * x);
			result += term;
		}
	} else {
		// First term underflows so we need to start at the mode of the distribution and work outwards:
		start = floor( n * x );
		if ( start <= k + 1 ) {
			start = floor( k + 2 );
		}
		result = pow( x, start ) * pow( y, n - start );
		result *= binomcoef( floor(n), floor(start) );
		if ( result === 0 ) {
			// OK, starting slightly above the mode didn't work, we'll have to sum the terms the old fashioned way:
			for ( i = start - 1; i > k; --i ) {
				result += pow( x, i ) * pow( y, n - i );
				result *= binomcoef( floor(n), floor(i) );
			}
		} else {
			term = result;
			startTerm = result;
			for ( i = start - 1; i > k; --i ) {
				term *= ((i + 1) * y) / ((n - i) * x);
				result += term;
			}
			term = startTerm;
			for ( i = start + 1; i <= n; ++i ) {
				term *= (n - i + 1) * x / (i * y);
				result += term;
			}
		}
	}
	return result;
} // end FUNCTION binomialCCDF()


// EXPORTS

module.exports = binomialCCDF;

},{"@stdlib/math/base/special/binomcoef":51,"@stdlib/math/base/special/floor":69,"@stdlib/math/base/special/pow":111,"@stdlib/math/constants/float64-smallest-normal":190}],41:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );


// MAIN //

/**
* Calculates the power term prefix (z^a)(e^-z) used in the non-normalised incomplete gammas.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} power term prefix
*/
function fullIGammaPrefix( a, z ) {
	var prefix;
	var alz;

	alz = a * ln( z );
	if ( z >= 1.0 ) {
		if ( ( alz < MAX_LN ) && ( -z > MIN_LN ) ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( a >= 1.0 ) {
			prefix = pow( z / exp(z/a), a );
		}
		else {
			prefix = exp( alz - z );
		}
	}
	else if ( alz > MIN_LN ) {
		prefix = pow( z, a ) * exp( -z );
	}
	else if ( z/a < MAX_LN ) {
		prefix = pow( z / exp(z/a), a );
	} else {
		prefix = exp( alz - z );
	}
	return prefix;
} // end FUNCTION fullIGammaPrefix()


// EXPORTS //

module.exports = fullIGammaPrefix;

},{"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/pow":111,"@stdlib/math/constants/float64-max-ln":183,"@stdlib/math/constants/float64-min-ln":186}],42:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var ibetaPowerTerms = require( './ibeta_power_terms.js' );


// MAIN //

/**
* Computes the difference between `ibeta(a,b,x)` and `ibeta(a+k,b,x)`.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {NonNegativeInteger} k - function input
* @param {boolean} normalised - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @param {Object} pderiv - object holding the derivative in the `value` property
* @returns {number} difference between ibeta(a,b,x) and ibeta(a+k,b,x)
*/
function ibetaAStep( a, b, x, y, k, normalised, pderiv ) {
	var prefix;
	var term;
	var sum;
	var i;

	prefix = ibetaPowerTerms( a, b, x, y, normalised );
	if ( pderiv ) {
		pderiv.value = prefix;
	}
	prefix /= a;
	if ( prefix === 0.0 ) {
		return prefix;
	}
	sum = 1.0;
	term = 1.0;
	// Series summation from 0 to k-1:
	for ( i = 0; i < k-1; ++i ) {
		term *= (a+b+i) * x / (a+i+1.0);
		sum += term;
	}
	prefix *= sum;
	return prefix;
} // end FUNCTION ibetaAStep()


// EXPORTS

module.exports = ibetaAStep;

},{"./ibeta_power_terms.js":45}],43:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
var ibetaPowerTerms = require( './ibeta_power_terms.js' );


// FUNCTIONS //

/**
* Continued fraction for the incomplete beta.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @returns {Function} series function
*/
function ibetaFraction2t( a, b, x, y ) {
	var m = 0;
	return next;

	/**
	* Calculate the numerator and denominator of the next term of the series.
	*
	* @private
	* @returns {Array} series expansion terms
	*/
	function next() {
		var denom;
		var aN;
		var bN;

		aN = (a + m - 1) * (a + b + m - 1) * m * (b - m) * x * x;
		denom = a + ( 2.0*m ) - 1.0;
		aN /= denom * denom;
		bN = m;
		bN += (m * (b - m) * x) / ( a + ( 2.0*m ) - 1.0 );
		bN += ( (a+m) * ( (a*y) - (b*x) + 1.0 + ( m*(2.0-x) ) ) ) /
			( a + (2.0*m) + 1.0 );
		m += 1;
		return [ aN, bN ];
	}
} // end FUNCTION ibetaFraction2t()


// MAIN //

/**
* Evaluates the incomplete beta via the continued fraction representation.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {boolean} normalised - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @param {Object} pderiv - object holding the derivative in the `value` property
* @returns {number} incomplete beta value
*/
function ibetaFraction2( a, b, x, y, normalised, pderiv ) {
	var result;
	var fract;
	var f;

	result = ibetaPowerTerms( a, b, x, y, normalised );
	if ( pderiv ) {
		pderiv.value = result;
	}
	if ( result === 0.0 ) {
		return result;
	}
	f = ibetaFraction2t( a, b, x, y );
	fract = continuedFraction( f, {
		'keep': true,
		'maxIter': 1000
	});
	return result / fract;
} // end FUNCTION ibetaFraction2()


// EXPORTS

module.exports = ibetaFraction2;

},{"./ibeta_power_terms.js":45,"@stdlib/math/base/tools/continued-fraction":136}],44:[function(require,module,exports){
/* eslint-disable max-statements */
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_61_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var expm1 = require( '@stdlib/math/base/special/expm1' );
var floor = require( '@stdlib/math/base/special/floor' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var asin = require( '@stdlib/math/base/special/asin' );
var beta = require( '@stdlib/math/base/special/beta' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var MAX_FLOAT64 = require( '@stdlib/math/constants/float64-max' );
var MIN_FLOAT64 = require( '@stdlib/math/constants/float64-smallest-normal' );
var MAX_INT32 = require( '@stdlib/math/constants/int32-max' );
var HALF_PI = require( '@stdlib/math/constants/float64-half-pi' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var betaSmallBLargeASeries = require( './beta_small_b_large_a_series.js' );
var risingFactorialRatio = require( './rising_factorial_ratio.js' );
var ibetaPowerTerms = require( './ibeta_power_terms.js' );
var ibetaFraction2 = require( './ibeta_fraction2.js');
var binomialCCDF = require( './binomial_ccdf.js' );
var ibetaAStep = require( './ibeta_a_step.js' );
var ibetaSeries = require( './ibeta_series.js' );


// MAIN //

/**
* Evaluates the incomplete beta function. This function divides up the input range and selects the right implementation method for each domain.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function input
* @param {boolean} invert - boolean indicating if the function should return the upper tail of the incomplete beta function instead
* @param {boolean} normalised - boolean indicating if the function should evaluate the regularized incomplete beta function
* @param {Object} [pderiv] - derivative container
* @returns {number} function value
*/
function ibetaImp( a, b, x, invert, normalised, pderiv ) {
	var lambda;
	var prefix;
	var fract;
	var bbar;
	var div;
	var tmp;
	var k;
	var n;
	var p;
	var y;
	y = 1.0 - x;
	if ( pderiv ) {
		// Value not set...
		pderiv.value = -1;
	}
	if ( x < 0.0 || x > 1.0 ) {
		return NaN;
	}
	if ( normalised ) {
		if ( a < 0.0 || b < 0.0 ) {
			return NaN;
		}
		// Extend to a few very special cases...
		if ( a === 0.0 ) {
			if ( b === 0.0 ) {
				return NaN;
			}
			if ( b > 0.0 ) {
				return invert ? 0.0 : 1.0;
			}
		} else if ( b === 0.0 ) {
			if ( a > 0.0 ) {
				return invert ? 1.0 : 0.0;
			}
		}
	} else if ( a <= 0.0 || b <= 0.0 ) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( pderiv ) {
			if ( a === 1.0 ) {
				pderiv.value = 1.0;
			} else {
				pderiv.value = a < 1.0 ? MAX_FLOAT64 / 2.0 : MIN_FLOAT64 * 2.0;
			}
		}
		if ( invert ) {
			return normalised ? 1.0 : beta( a, b );
		}
		return 0.0;
	}
	if ( x === 1.0 ) {
		if ( pderiv ) {
			if ( b === 1 ) {
				pderiv.value = 1;
			} else {
				pderiv.value = b < 1 ? MAX_FLOAT64 / 2 : MIN_FLOAT64 * 2;
			}
		}
		if ( invert ) {
			return 0.0;
		}
		return normalised ? 1.0 : beta( a, b );
	}
	if ( a === 0.5 && b === 0.5 ) {
		if ( pderiv ) {
			pderiv.value = 1.0 / PI * sqrt( y * x );
		}
		// We have an arcsine distribution:
		p = invert ? asin( sqrt(y) ) : asin( sqrt(x) );
		p /= HALF_PI;
		if ( !normalised ) {
			p *= PI;
		}
		return p;
	}
	if ( a === 1.0 ) {
		tmp = b;
		b = a;
		a = tmp;

		tmp = y;
		y = x;
		x = tmp;

		invert = !invert;
	}
	if ( b === 1.0 ) {
		// Special case see: http://functions.wolfram.com/GammaBetaErf/BetaRegularized/03/01/01/
		if ( a === 1.0 ) {
			if ( pderiv ) {
				pderiv.value = 1.0;
			}
			return invert ? y : x;
		}
		if ( pderiv ) {
			pderiv.value = a * pow( x, a - 1.0 );
		}
		if ( y < 0.5 ) {
			p = invert ? -expm1( a * log1p(-y) ) : exp( a * log1p(-y) );
		} else {
			p = invert ? -( pow( x, a ) - 1 ) : pow( x, a );
		}
		if ( !normalised ) {
			p /= a;
		}
		return p;
	}
	if ( min(a, b) <= 1.0 ) {
		if ( x > 0.5 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = y;
			y = x;
			x = tmp;

			invert = !invert;
		}
		if ( max( a, b ) <= 1.0 ) {
			// Both a,b < 1:
			if ( (a >= min( 0.2, b ) ) || ( pow(x, a) <= 0.9 ) ) {
				if ( invert ) {
					fract = -(normalised ? 1.0 : beta( a, b ) );
					invert = false;
					fract = -ibetaSeries(
						a, b, x, fract, normalised, pderiv, y
					);
				} else {
					fract = ibetaSeries(
						a, b, x, 0, normalised, pderiv, y
					);
				}
			} else {
				tmp = b;
				b = a;
				a = tmp;

				tmp = y;
				y = x;
				x = tmp;

				invert = !invert;
				if ( y >= 0.3 ) {
					if ( invert ) {
						fract = -( normalised ? 1.0 : beta( a, b ) );
						invert = false;
						fract = -ibetaSeries(
							a, b, x, fract, normalised, pderiv, y
						);
					} else {
						fract = ibetaSeries(
							a, b, x, 0, normalised, pderiv, y
						);
					}
				} else {
					// Sidestep on a, and then use the series representation:
					if ( normalised ) {
						prefix = 1;
					} else {
						prefix = risingFactorialRatio( a + b, a, 20 );
					}
					fract = ibetaAStep( a, b, x, y, 20, normalised, pderiv );
					if ( invert ) {
						fract -= ( normalised ? 1 : beta( a, b ) );
						invert = false;
						fract = -betaSmallBLargeASeries(
							a + 20, b, x, y, fract, prefix, normalised
						);
					} else {
						fract = betaSmallBLargeASeries(
							a + 20, b, x, y, fract, prefix, normalised
						);
					}
				}
			}
		} else if ( b <= 1 || ( x < 0.1 && ( pow(b * x, a) <= 0.7 ) ) ) {
			if ( invert ) {
				fract = -( normalised ? 1 : beta( a, b ) );
				invert = false;
				fract = -ibetaSeries( a, b, x, fract, normalised, pderiv, y );
			} else {
				fract = ibetaSeries( a, b, x, 0, normalised, pderiv, y );
			}
		} else {
			tmp = b;
			b = a;
			a = tmp;

			tmp = y;
			y = x;
			x = tmp;
			invert = !invert;

			if ( y >= 0.3 ) {
				if (invert) {
					fract = -(normalised ? 1 : beta( a, b ));
					invert = false;
					fract = -ibetaSeries(
						a, b, x, fract, normalised, pderiv, y
					);
				} else {
					fract = ibetaSeries(
						a, b, x, 0, normalised, pderiv, y
					);
				}
			}
			else if ( a >= 15 ) {
				if ( invert ) {
					fract = -(normalised ? 1 : beta( a, b ));
					invert = false;
					fract = -betaSmallBLargeASeries(
						a, b, x, y, fract, 1, normalised
					);
				} else {
					fract = betaSmallBLargeASeries(
						a, b, x, y, 0, 1, normalised
					);
				}
			}
			else {
				if ( normalised ) {
					prefix = 1;
				} else {
					// Sidestep to improve errors:
					prefix = risingFactorialRatio( a + b, a, 20 );
				}
				fract = ibetaAStep( a, b, x, y, 20, normalised, pderiv );
				if ( invert ) {
					fract -= ( normalised ? 1 : beta( a, b ) );
					invert = false;
					fract = -betaSmallBLargeASeries(
						a + 20, b, x, y, fract, prefix, normalised
					);
				} else {
					fract = betaSmallBLargeASeries(
						a + 20, b, x, y, fract, prefix, normalised
					);
				}
			}
		}
	} else {
		// Both a,b >= 1:
		if ( a < b ) {
			lambda = a - ( (a + b) * x );
		} else {
			lambda = ( (a + b) * y ) - b;
		}
		if ( lambda < 0.0 ) {
			tmp = b;
			b = a;
			a = tmp;

			tmp = y;
			y = x;
			x = tmp;
			invert = !invert;
		}
		if ( b < 40.0 ) {
			if (
				floor(a) === a &&
				floor(b) === b &&
				a < MAX_INT32 - 100
			) {
				// Relate to the binomial distribution and use a finite sum:
				k = a - 1;
				n = b + k;
				fract = binomialCCDF( n, k, x, y );
				if ( !normalised ) {
					fract *= beta( a, b );
				}
			}
			else if ( b * x <= 0.7 ) {
				if ( invert ) {
					fract = -( normalised ? 1.0 : beta( a, b ) );
					invert = false;
					fract = -ibetaSeries(
						a, b, x, fract, normalised, pderiv, y
					);
				} else {
					fract = ibetaSeries(
						a, b, x, 0.0, normalised, pderiv, y
					);
				}
			}
			else if ( a > 15.0 ) {
				// Sidestep so we can use the series representation:
				n = floor( b );
				if ( n === b ) {
					n -= 1;
				}
				bbar = b - n;
				if ( normalised ) {
					prefix = 1;
				} else {
					prefix = risingFactorialRatio( a + bbar, bbar, n );
				}
				fract = ibetaAStep( bbar, a, y, x, n, normalised );
				fract = betaSmallBLargeASeries(
					a, bbar, x, y, fract, 1.0, normalised
				);
				fract /= prefix;
			}
			else if ( normalised ) {
				n = floor( b );
				bbar = b - n;
				if ( bbar <= 0 ) {
					n -= 1;
					bbar += 1;
				}
				fract = ibetaAStep( bbar, a, y, x, n, normalised );
				fract += ibetaAStep( a, bbar, x, y, 20, normalised );
				if ( invert ) {
					fract -= 1;
				}
				fract = betaSmallBLargeASeries(
					a + 20.0, bbar, x, y, fract, 1, normalised
				);
				if ( invert ) {
					fract = -fract;
					invert = false;
				}
			}
			else {
				fract = ibetaFraction2( a, b, x, y, normalised, pderiv );
			}
		} else {
			fract = ibetaFraction2( a, b, x, y, normalised, pderiv );
		}
	}
	if ( pderiv ) {
		if ( pderiv.value < 0.0 ) {
			pderiv.value = ibetaPowerTerms( a, b, x, y, true );
		}
		div = y * x;
		if ( pderiv.value !== 0.0 ) {
			if ( ( MAX_FLOAT64 * div < pderiv.value ) ) {
				// Overflow, return an arbitrarily large value:
				pderiv.value = MAX_FLOAT64 / 2.0;
			} else {
				pderiv.value /= div;
			}
		}
	}
	return invert ? ( normalised ? 1.0 : beta( a, b ) ) - fract : fract;
} // end FUNCTION ibetaImp()


// EXPORTS //

module.exports = ibetaImp;

},{"./beta_small_b_large_a_series.js":38,"./binomial_ccdf.js":40,"./ibeta_a_step.js":42,"./ibeta_fraction2.js":43,"./ibeta_power_terms.js":45,"./ibeta_series.js":46,"./rising_factorial_ratio.js":49,"@stdlib/math/base/special/asin":35,"@stdlib/math/base/special/beta":37,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/expm1":64,"@stdlib/math/base/special/floor":69,"@stdlib/math/base/special/log1p":105,"@stdlib/math/base/special/max":107,"@stdlib/math/base/special/min":109,"@stdlib/math/base/special/pow":111,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/constants/float64-half-pi":178,"@stdlib/math/constants/float64-max":184,"@stdlib/math/constants/float64-pi":188,"@stdlib/math/constants/float64-smallest-normal":190,"@stdlib/math/constants/int32-max":193}],45:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
var G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
var E = require( '@stdlib/math/constants/float64-e' );


// MAIN //

/**
* Computes the leading power terms in the incomplete beta function. When normalized,
*
* ``` tex
* \frac{ x^a y^b }{ \operatorname{Beta}(a,b) }
* ```
*
* and otherwise
*
* ``` tex
* x^a y^b
* ```
*
* #### Notes
*
* - Almost all of the error in the incomplete beta comes from this function, particularly when a and b are large. Computing large powers are *hard* though, and using logarithms just leads to horrendous cancellation errors.
* - For \\( l1 * l2 > 0 \\) or \\( \operatorname{min}( a, b ) < 1 \\), the two power terms both go in the same direction (towards zero or towards infinity). In this case if either term overflows or underflows, then the product of the two must do so also. Alternatively, if one exponent is less than one, then we can't productively use it to eliminate overflow or underflow from the other term.  Problems with spurious overflow/underflow can't be ruled out in this case, but it is *very* unlikely since one of the power terms will evaluate to a number close to 1.
* - If \\( \max( \abs(l1), \abs(l2) ) < 0.5 \\), both exponents are near one and both the exponents are greater than one, and, further, these two power terms tend in opposite directions (one toward zero, the other toward infinity), so we have to combine the terms to avoid any risk of overflow or underflow. We do this by moving one power term inside the other, we have:
*
*    ``` tex
*    (1 + l_1)^a \cdot (1 + l_2)^b \\
*    = ((1 + l_1) \cdot (1 + l_2)^(b/a))^a \\
*    = (1 + l_1 + l_3 + l_1*l_3)^a
*    ```
*
*    and
*
*    ``` tex
*    l_3 = (1 + l_2)^(b/a) - 1 \\
*    = \exp((b/a) * \ln(1 + l_2)) - 1
*    ```
*
*  The tricky bit is deciding which term to move inside. By preference we move the larger term inside, so that the size of the largest exponent is reduced.  However, that can only be done as long as l3 (see above) is also small.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {boolean} normalised - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @returns {number} power terms
*/
function ibetaPowerTerms( a, b, x, y, normalised ) {
	var result;
	var smallA;
	var ratio;
	var agh;
	var bgh;
	var cgh;
	var l1;
	var l2;
	var l3;
	var p1;
	var b1;
	var b2;
	var c;
	var l;

	if ( !normalised ) {
		// Can we do better here?
		return pow( x, a ) * pow( y, b );
	}
	c = a + b;

	// Combine power terms with Lanczos approximation:
	agh = a + G - 0.5;
	bgh = b + G - 0.5;
	cgh = c + G - 0.5;
	result = lanczosSumExpGScaled( c );
	result /= lanczosSumExpGScaled( a ) * lanczosSumExpGScaled( b );

	// Combine with the leftover terms from the Lanczos approximation:
	result *= sqrt( bgh / E );
	result *= sqrt( agh / cgh );

	// `l1` and `l2` are the base of the exponents minus one:
	l1 = ( ( x * b ) - ( y * agh ) ) / agh;
	l2 = ( ( y * a ) - ( x * bgh ) ) / bgh;
	if ( min( abs(l1), abs(l2) ) < 0.2 ) {
		// When the base of the exponent is very near 1 we get really gross errors unless extra care is taken:
		if ( l1 * l2 > 0 || min( a, b ) < 1 ) {
			if ( abs(l1) < 0.1 ) {
				result *= exp( a * log1p( l1 ) );
			} else {
				result *= pow( ( x*cgh ) / agh, a );
			}
			if ( abs(l2) < 0.1 ) {
				result *= exp( b * log1p( l2 ) );
			} else {
				result *= pow((y * cgh) / bgh, b);
			}
		}
		else if ( max( abs(l1), abs(l2) ) < 0.5 ) {
			smallA = a < b;
			ratio = b / a;
			if (
				(smallA && (ratio * l2 < 0.1)) ||
				(!smallA && (l1 / ratio > 0.1))
			) {
				l3 = expm1( ratio * log1p( l2 ) );
				l3 = l1 + l3 + ( l3 * l1 );
				l3 = a * log1p( l3 );
				result *= exp( l3 );
			}
			else {
				l3 = expm1( log1p( l1 ) / ratio );
				l3 = l2 + l3 + ( l3 * l2 );
				l3 = b * log1p( l3 );
				result *= exp( l3 );
			}
		}
		else if ( abs(l1) < abs(l2) ) {
			// First base near 1 only:
			l = ( a * log1p( l1 ) ) + ( b * ln( ( y*cgh ) / bgh ) );
			if ( l <= MIN_LN || l >= MAX_LN ) {
				l += ln(result);
				if ( l >= MAX_LN ) {
					return NaN;
				}
				result = exp( l );
			} else {
				result *= exp( l );
			}
		}
		else {
			// Second base near 1 only:
			l = ( b * log1p( l2 ) ) + ( a * ln( (x*cgh) / agh ) );
			if ( l <= MIN_LN || l >= MAX_LN ) {
				l += ln(result);
				if ( l >= MAX_LN ) {
					return NaN;
				}
				result = exp( l );
			} else {
				result *= exp( l );
			}
		}
	}
	else {
		// General case:
		b1 = (x * cgh) / agh;
		b2 = (y * cgh) / bgh;
		l1 = a * ln(b1);
		l2 = b * ln(b2);
		if (
			l1 >= MAX_LN ||
			l1 <= MIN_LN ||
			l2 >= MAX_LN ||
			l2 <= MIN_LN
		) {
			// Oops, under/overflow, sidestep if we can:
			if ( a < b ) {
				p1 = pow( b2, b / a );
				l3 = a * ( ln(b1) + ln(p1) );
				if ( l3 < MAX_LN && l3 > MIN_LN ) {
					result *= pow( p1 * b1, a );
				} else {
					l2 += l1 + ln(result);
					if ( l2 >= MAX_LN ) {
						return NaN;
					}
					result = exp( l2 );
				}
			}
			else {
				p1 = pow( b1, a / b );
				l3 = ( ln(p1) + ln(b2) ) * b;
				if ( l3 < MAX_LN && l3 > MIN_LN ) {
					result *= pow( p1 * b2, b );
				} else {
					l2 += l1 + ln( result );
					if (l2 >= MAX_LN) {
						return NaN;
					}
					result = exp( l2 );
				}
			}
		}
		else {
			// Finally the normal case:
			result *= pow( b1, a ) * pow( b2, b );
		}
	}
	return result;
} // end FUNCTION ibetaPowerTerms()


// EXPORTS //

module.exports = ibetaPowerTerms;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/expm1":64,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":74,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/log1p":105,"@stdlib/math/base/special/max":107,"@stdlib/math/base/special/min":109,"@stdlib/math/base/special/pow":111,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/constants/float64-e":171,"@stdlib/math/constants/float64-gamma-lanczos-g":176,"@stdlib/math/constants/float64-max-ln":183,"@stdlib/math/constants/float64-min-ln":186}],46:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MIN_VALUE = require( '@stdlib/math/constants/float64-smallest-normal' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
var G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
var E = require( '@stdlib/math/constants/float64-e' );


// FUNCTIONS //

/**
* Series approximation to the incomplete beta.
*
* @private
* @param {NonNegativeNumber} a_ - function parameter
* @param {NonNegativeNumber} b_ - function parameter
* @param {Probability} x_ - function parameter
* @param {number} mult - initial value
* @returns {Function} series function
*/
function ibetaSeriesT( a_, b_, x_, mult ) {
	var result = mult;
	var poch = 1.0 - b_;
	var apn = a_;
	var x = x_;
	var n = 1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		var r = result / apn;
		apn += 1.0;
		result *= poch * x / n;
		n += 1;
		poch += 1.0;
		return r;
	} // end FUNCTION next()
} // end FUNCTION ibetaSeriesT()


// MAIN //

/**
* Incomplete beta series.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {NonNegativeInteger} s0 - initial value
* @param {boolean} normalised - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @param {Object} pderiv - object holding the derivative in the `value` property
* @param {Probability} y - probability equal to `1-x`
* @returns {number} function value
*/
function ibetaSeries( a, b, x, s0, normalised, pderiv, y ) {
	var result;
	var agh;
	var bgh;
	var cgh;
	var l1;
	var l2;
	var c;
	var s;

	if ( normalised ) {
		c = a + b;

		// Incomplete beta power term, combined with the Lanczos approximation:
		agh = a + G - 0.5;
		bgh = b + G - 0.5;
		cgh = c + G - 0.5;
		result = lanczosSumExpGScaled( c ) / ( lanczosSumExpGScaled( a ) *
			lanczosSumExpGScaled( b ) );

		l1 = ln( cgh / bgh ) * ( b - 0.5 );
		l2 = ln( x * cgh / agh ) * a;

		// Check for over/underflow in the power terms:
		if (
			l1 > MIN_LN &&
			l1 < MAX_LN &&
			l2 > MIN_LN &&
			l2 < MAX_LN
		) {
			if ( a * b < bgh * 10.0 ) {
				result *= exp( ( b-0.5 ) * log1p( a / bgh ) );
			} else {
				result *= pow( cgh / bgh, b - 0.5 );
			}
			result *= pow( x * cgh / agh, a );
			result *= sqrt( agh / E );

			if ( pderiv ) {
				pderiv.value = result * pow( y, b );
			}
		}
		else {
			// We need logs, and this *will* cancel:
			result = ln( result ) + l1 + l2 + ( ( ln( agh ) - 1.0 ) / 2.0 );
			if ( pderiv ) {
				pderiv.value = exp( result + ( b * ln( y ) ) );
			}
			result = exp(result);
		}
	}
	else {
		// Non-normalised, just compute the power:
		result = pow( x, a );
	}
	if ( result < MIN_VALUE ) {
		return s0; // Safeguard: series can't cope with denorms.
	}
	s = ibetaSeriesT( a, b, x, result );
	result = sumSeries( s, {
		'initialValue': s0,
		'maxTerms': 100
	});
	return result;
} // end FUNCTION ibetaSeries()


// EXPORTS //

module.exports = ibetaSeries;

},{"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":74,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/log1p":105,"@stdlib/math/base/special/pow":111,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/base/tools/sum-series":145,"@stdlib/math/constants/float64-e":171,"@stdlib/math/constants/float64-gamma-lanczos-g":176,"@stdlib/math/constants/float64-max-ln":183,"@stdlib/math/constants/float64-min-ln":186,"@stdlib/math/constants/float64-smallest-normal":190}],47:[function(require,module,exports){
'use strict';

/**
* Evaluate the incomplete beta function.
*
* @module @stdlib/math/base/special/betainc
*
* @example
* var betainc = require( '@stdlib/math/base/special/betainc' );
*
* var y = betainc( 0.5, 2.0, 2.0 );
* // returns 0.5
*
* y = betainc( 0.5, 2.0, 2.0, false );
* // returns ~0.083
*
* y = betainc( 0.2, 1.0, 2.0 );
* // returns 0.36
*
* y = betainc( 0.2, 1.0, 2.0, true, true );
* // returns 0.64
*/

// MODULES //

var betainc = require( './betainc.js' );


// EXPORTS //

module.exports = betainc;

},{"./betainc.js":39}],48:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
var G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
var E = require( '@stdlib/math/constants/float64-e' );


// MAIN //

/**
* Computes `(z^a)*(e^-z) / gamma(a)`.
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} function value
*/
function regularisedGammaPrefix( a, z ) {
	var prefix;
	var amza;
	var agh;
	var alz;
	var amz;
	var sq;
	var d;

	agh = a + G - 0.5;
	d = ( (z - a) - G + 0.5 ) / agh;
	if ( a < 1.0 ) {
		// Treat a < 1 as a special case because our Lanczos approximations are optimized against the factorials with a > 1, and for high precision types very small values of `a` can give rather erroneous results for gamma:
		if ( z <= MIN_LN ) {
			// Use logs, so should be free of cancellation errors:
			return exp( ( a * ln(z) ) - z - gammaln( a ) );
		}
		// No danger of overflow as gamma(a) < 1/a for small a, so direct calculation:
		return pow( z, a ) * exp( -z ) / gamma( a );
	}
	else if ( abs(d*d*a) <= 100.0 && a > 150.0 ) {
		// Special case for large a and a ~ z:
		prefix = ( a * ( log1p( d ) - d ) ) + ( z * ( 0.5-G ) / agh );
		prefix = exp( prefix );
	}
	else {
		// General case. Direct computation is most accurate, but use various fallbacks for different parts of the problem domain:
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= MIN_LN ||
			max(alz, amz) >= MAX_LN
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2.0 > MIN_LN &&
				max(alz, amz)/2.0 < MAX_LN
			) {
				// Compute square root of the result and then square it:
				sq = pow( z / agh, a / 2.0 ) * exp( amz / 2.0 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4.0 > MIN_LN &&
				max(alz, amz)/4.0 < MAX_LN &&
				z > a
			) {
				// Compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4.0 ) * exp( amz / 4.0 );
				prefix = sq * sq;
				prefix *= prefix;
			}
			else if (
				amza > MIN_LN &&
				amza < MAX_LN
			) {
				prefix = pow( (z * exp(amza)) / agh, a );
			}
			else {
				prefix = exp( alz + amz );
			}
		}
		else
		{
			prefix = pow( z / agh, a ) * exp( amz );
		}
	}
	prefix *= sqrt( agh / E ) / lanczosSumExpGScaled( a );
	return prefix;
} // end FUNCTION regularisedGammaPrefix()


// EXPORTS //

module.exports = regularisedGammaPrefix;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/gamma":78,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":74,"@stdlib/math/base/special/gammaln":96,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/log1p":105,"@stdlib/math/base/special/max":107,"@stdlib/math/base/special/min":109,"@stdlib/math/base/special/pow":111,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/constants/float64-e":171,"@stdlib/math/constants/float64-gamma-lanczos-g":176,"@stdlib/math/constants/float64-max-ln":183,"@stdlib/math/constants/float64-min-ln":186}],49:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Calculates
*
*    ``` tex
*    \frac{ (a)(a+1)(a+2)...(a+k-1) }{ (b)(b+1)(b+2)...(b+k-1) }
*    ```
*
* - This function computes the delta in `beta(a,b,x) = prefix + delta * beta(a+k,b,x)`. It is only called with small `k`, for large `k` it is grossly inefficient.
*
* @private
* @param {number} a - input value
* @param {number} b - input value
* @param {number} k - input value
* @returns {number} ratio value
*/
function risingFactorialRatio( a, b, k ) {
	var result;
	var i;
	if ( k === 0 ) {
		return 1.0;
	}
	result = 1.0;
	for ( i = 0; i < k; ++i ) {
		result *= ( a + i ) / ( b + i );
	}
	return result;
} // end FUNCTION risingFactorialRatio()


// EXPORTS //

module.exports = risingFactorialRatio;

},{}],50:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var round = require( '@stdlib/math/base/special/round' );


// MAIN //

/**
* Computes the binomial coefficient of two integers.
*
* #### Method
*
* * Instead of evaluating the factorial form, which is inefficient and prone to overflow for large inputs arguments, this module computes the following multiplicative representation of the binomial coefficient for integer arguments
*
*   ``` tex
*   \binom nk = \prod_{i=1}^k \frac{n+1-i}{i}
*   ```
*
* @param {integer} n - input value
* @param {integer} k - second input value
* @returns {number} function value
*
* @example
* var v = binomcoef( 8, 2 );
* // returns 28
*
* @example
* var v = binomcoef( 0, 0 );
* // returns 1
*
* @example
* var v = binomcoef( -4, 2 );
* // returns 10
*
* @example
* var v = binomcoef( NaN, 3 );
* // returns NaN
*
* @example
* var v = binomcoef( 5, NaN );
* // returns NaN
*
* @example
* var v = binomcoef( NaN, NaN );
* // returns NaN
*/
function binomcoef( n, k ) {
	var res;
	var j;
	if ( isnan( n ) || isnan( k ) ) {
		return NaN;
	}
	if ( !isInteger( n ) || !isInteger( k ) ) {
		return NaN;
	}
	if ( k < 0 ) {
		return 0;
	}
	if ( n < 0 ) {
		res = binomcoef( -n + k - 1, k );
		if ( isOdd( k ) ) {
			res = -res;
		}
		return res;
	}
	if ( k > n ) {
		return 0;
	}
	if ( k === 0 || k === n ) {
		return 1;
	}
	if ( k === 1 || k === n - 1 ) {
		return n;
	}
	if ( n - k < k ) {
		k = n - k;
	}
	// Use recursive definition...
	res = n;
	for ( j = 2; j <= k; j++ ) {
		res *= ( n - j + 1 ) / j;
	}
	// Correct for rounding errors...
	return isInteger( res ) ? res : round( res );
} // end FUNCTION binomcoef()


// EXPORTS //

module.exports = binomcoef;

},{"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/round":125}],51:[function(require,module,exports){
'use strict';

/**
* Compute the binomial coefficient.
*
* @module @stdlib/math/base/special/binomcoef
*
* @example
* var binomcoef = require( '@stdlib/math/base/special/binomcoef' );
*
* var v = binomcoef( 8, 2 );
* // returns 28
*
* v = binomcoef( 0, 0 );
* // returns 1
*
* v = binomcoef( -4, 2 );
* // returns 10
*
* v = binomcoef( 5, 3 );
* // returns 10
*
* v = binomcoef( NaN, 3 );
* // returns NaN
*
* v = binomcoef( 5, NaN );
* // returns NaN
*
* v = binomcoef( NaN, NaN );
* // returns NaN
*/

// MODULES //

var binomcoef = require( './binomcoef.js' );


// EXPORTS //

module.exports = binomcoef;

},{"./binomcoef.js":50}],52:[function(require,module,exports){
'use strict';

// TODO: implementation (?)

/**
* Rounds a numeric value toward positive infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = ceil( -4.2 );
* // returns -4.0
*
* @example
* var v = ceil( 9.99999 );
* // returns 10.0
*
* @example
* var v = ceil( 0.0 );
* // returns 0.0
*
* @example
* var v = ceil( NaN );
* // returns NaN
*/
var ceil = Math.ceil;


// EXPORTS //

module.exports = ceil;

},{}],53:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward positive infinity.
*
* @module @stdlib/math/base/special/ceil
*
* @example
* var ceil = require( '@stdlib/math/base/special/ceil' );
*
* var v = ceil( -4.2 );
* // returns -4.0
*
* v = ceil( 9.99999 );
* // returns 10.0
*
* v = ceil( 0.0 );
* // returns 0.0
*
* v = ceil( NaN );
* // returns NaN
*/

// MODULES //

var ceil = require( './ceil.js' );


// EXPORTS //

module.exports = ceil;

},{"./ceil.js":52}],54:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":149,"@stdlib/math/base/utils/float64-get-high-word":153,"@stdlib/math/base/utils/float64-to-words":165}],55:[function(require,module,exports){
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

},{"./copysign.js":54}],56:[function(require,module,exports){
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
* @param {number} x - input value (in radians)
* @returns {number} cosine
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

},{"@stdlib/math/base/special/kernel-cos":97,"@stdlib/math/base/special/kernel-sin":99,"@stdlib/math/base/special/rempio2":121,"@stdlib/math/base/utils/float64-get-high-word":153}],57:[function(require,module,exports){
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

},{"./cos.js":56}],58:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c?revision=268523&view=co}.
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

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// VARIABLES //

var TINY = 1.0e-300;

// 2**-56 = 1/(2**56) = 1/72057594037927940
var SMALL = 1.3877787807814457e-17;

var ERX = 8.45062911510467529297e-1; // 0x3FEB0AC1, 0x60000000

// Coefficients for approximation to erf on [0, 0.84375)
var PPC = 1.28379167095512558561e-1;  // 0x3FC06EBA, 0x8214DB68
var PP = [
	-3.25042107247001499370e-1, // 0xBFD4CD7D, 0x691CB913
	-2.84817495755985104766e-2, // 0xBF9D2A51, 0xDBD7194F
	-5.77027029648944159157e-3, // 0xBF77A291, 0x236668E4
	-2.37630166566501626084e-5  // 0xBEF8EAD6, 0x120016AC
];
var QQC = 1.0;
var QQ = [
	3.97917223959155352819e-1, // 0x3FD97779, 0xCDDADC09
	6.50222499887672944485e-2, // 0x3FB0A54C, 0x5536CEBA
	5.08130628187576562776e-3, // 0x3F74D022, 0xC4D36B0F
	1.32494738004321644526e-4, // 0x3F215DC9, 0x221C1A10
	-3.96022827877536812320e-6 // 0xBED09C43, 0x42A26120
];

// Coefficients for approximation to erf on [0.84375, 1.25)
var PAC = -2.36211856075265944077e-3; // 0xBF6359B8, 0xBEF77538
var PA = [
	4.14856118683748331666e-1,  // 0x3FDA8D00, 0xAD92B34D
	-3.72207876035701323847e-1, // 0xBFD7D240, 0xFBB8C3F1
	3.18346619901161753674e-1,  // 0x3FD45FCA, 0x805120E4
	-1.10894694282396677476e-1, // 0xBFBC6398, 0x3D3E28EC
	3.54783043256182359371e-2,  // 0x3FA22A36, 0x599795EB
	-2.16637559486879084300e-3  // 0xBF61BF38, 0x0A96073F
];
var QAC = 1.0;
var QA = [
	1.06420880400844228286e-1, // 0x3FBB3E66, 0x18EEE323
	5.40397917702171048937e-1, // 0x3FE14AF0, 0x92EB6F33
	7.18286544141962662868e-2, // 0x3FB2635C, 0xD99FE9A7
	1.26171219808761642112e-1, // 0x3FC02660, 0xE763351F
	1.36370839120290507362e-2, // 0x3F8BEDC2, 0x6B51DD1C
	1.19844998467991074170e-2  // 0x3F888B54, 0x5735151D
];

// Coefficients for approximation to erfc on [1.25, 1/0.35)
var RAC = -9.86494403484714822705e-3; // 0xBF843412, 0x600D6435
var RA = [
	-6.93858572707181764372e-1, // 0xBFE63416, 0xE4BA7360
	-1.05586262253232909814e1,  // 0xC0251E04, 0x41B0E726
	-6.23753324503260060396e1,  // 0xC04F300A, 0xE4CBA38D
	-1.62396669462573470355e2,  // 0xC0644CB1, 0x84282266
	-1.84605092906711035994e2,  // 0xC067135C, 0xEBCCABB2
	-8.12874355063065934246e1,  // 0xC0545265, 0x57E4D2F2
	-9.81432934416914548592     // 0xC023A0EF, 0xC69AC25C
];
var SAC = 1.0;
var SA = [
	1.96512716674392571292e1,  // 0x4033A6B9, 0xBD707687
	1.37657754143519042600e2,  // 0x4061350C, 0x526AE721
	4.34565877475229228821e2,  // 0x407B290D, 0xD58A1A71
	6.45387271733267880336e2,  // 0x40842B19, 0x21EC2868
	4.29008140027567833386e2,  // 0x407AD021, 0x57700314
	1.08635005541779435134e2,  // 0x405B28A3, 0xEE48AE2C
	6.57024977031928170135,    // 0x401A47EF, 0x8E484A93
	-6.04244152148580987438e-2 // 0xBFAEEFF2, 0xEE749A62
];

// Coefficients for approximation to erfc on [1/0.35, 28]
var RBC = -9.86494292470009928597e-3; // 0xBF843412, 0x39E86F4A
var RB = [
	-7.99283237680523006574e-1, // 0xBFE993BA, 0x70C285DE
	-1.77579549177547519889e1,  // 0xC031C209, 0x555F995A
	-1.60636384855821916062e2,  // 0xC064145D, 0x43C5ED98
	-6.37566443368389627722e2,  // 0xC083EC88, 0x1375F228
	-1.02509513161107724954e3,  // 0xC0900461, 0x6A2E5992
	-4.83519191608651397019e2  // 0xC07E384E, 0x9BDC383F
];
var SBC = 1.0;
var SB = [
	3.03380607434824582924e1, // 0x403E568B, 0x261D5190
	3.25792512996573918826e2, // 0x40745CAE, 0x221B9F0A
	1.53672958608443695994e3, // 0x409802EB, 0x189D5118
	3.19985821950859553908e3, // 0x40A8FFB7, 0x688C246A
	2.55305040643316442583e3, // 0x40A3F219, 0xCEDF3BE6
	4.74528541206955367215e2, // 0x407DA874, 0xE79FE763
	-2.24409524465858183362e1 // 0xC03670E2, 0x42712D62
];


// FUNCTIONS //

// Compile functions to evaluate polynomials based on the above coefficients...
var polyvalPP = evalpoly( PP );
var polyvalQQ = evalpoly( QQ );
var polyvalPA = evalpoly( PA );
var polyvalQA = evalpoly( QA );
var polyvalRA = evalpoly( RA );
var polyvalSA = evalpoly( SA );
var polyvalRB = evalpoly( RB );
var polyvalSB = evalpoly( SB );


// MAIN //

/**
* Evaluates the complementary error function.
*
* ``` tex
* \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int^{x}_{0} e^{-t^2}\ \mathrm{dt}
* ```
*
* Note that
*
* ``` tex
* \begin{align*}
* \operatorname{erfc}(x) &= 1 - \operatorname{erf}(x) \\
* \operatorname{erf}(-x) &= -\operatorname{erf}(x) \\
* \operatorname{erfc}(-x) &= 2 - \operatorname{erfc}(x)
* \end{align*}
* ```
*
* #### Method
*
* 1. For \\(|x| \in [0, 0.84375)\\),
*
*    ``` tex
*    \operatorname{erf}(x) = x + x \cdot \operatorname{R}(x^2)
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    1 - \operatorname{erf}(x) & \textrm{if}\ x \in (-.84375,0.25) \\
*    0.5 + ((0.5-x)-x \mathrm{R}) & \textrm{if}\ x \in [0.25,0.84375)
*    \end{cases}
*    ```
*
*    where \\(R = P/Q\\) and where \\(P\\) is an odd polynomial of degree \\(8\\) and \\(Q\\) is an odd polynomial of degree \\(10\\).
*
*    ``` tex
*    \biggl| \mathrm{R} - \frac{\operatorname{erf}(x)-x}{x} \biggr| \leq 2^{-57.90}
*    ```
*
*    <!-- <note> -->
*    The formula is derived by noting
*
*    ``` tex
*    \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\biggl(x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \ldots \biggr)
*    ```
*
*    and that
*
*    ``` tex
*    \frac{2}{\sqrt{\pi}} = 1.128379167095512573896158903121545171688
*    ```
*
*    is close to unity. The interval is chosen because the fix point of \\(\operatorname{erf}(x)\\) is near \\(0.6174\\) (i.e., \\(\operatorname{erf(x)} = x\\) when \\(x\\) is near \\(0.6174\\)), and, by some experiment, \\(0.84375\\) is chosen to guarantee the error is less than one ulp for \\(\operatorname{erf}(x)\\).
*    <!-- </note> -->
*
* 2. For \\(|x| \in [0.84375,1.25)\\), let \\(s = |x|-1\\), and \\(c = 0.84506291151\\) rounded to single (\\(24\\) bits)
*
*    ``` tex
*    \operatorname{erf}(x) = \operatorname{sign}(x) \cdot \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr)
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    (1-c) - \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)} & \textrm{if}\ x > 0 \\
*    1 + \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr) & \textrm{if}\ x < 0
*    \end{cases}
*    ```
*
*    where
*
*    ``` tex
*    \biggl|\frac{\mathrm{P1}}{\mathrm{Q1}} - (\operatorname{erf}(|x|)-c)\biggr| \leq 2^{-59.06}
*    ```
*
*    <!-- <note> -->
*    Here, we use the Taylor series expansion at \\(x = 1\\)
*
*    ``` tex
*    \begin{align*}
*    \operatorname{erf}(1+s) &= \operatorname{erf}(1) + s\cdot \operatorname{poly}(s) \\
*    &= 0.845.. + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}
*    \end{align*}
*    ```
*
*    using a rational approximation to approximate
*
*    ``` tex
*    \operatorname{erf}(1+s) - (c = (\mathrm{single})0.84506291151)
*    ```
*
*    <!-- </note> -->
*    Note that, for \\(x \in [0.84375,1.25)\\), \\(|\mathrm{P1}/\mathrm{Q1}| < 0.078\\), where
*
*    - \\(\operatorname{P1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*    - \\(\operatorname{Q1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*
* 3. For \\(x \in [1.25,1/0.35)\\),
*
*    ``` tex
*    \begin{align*}
*    \operatorname{erfc}(x) &= \frac{1}{x}e^{-x^2-0.5625+(\mathrm{R1}/\mathrm{S1})} \\
*    \operatorname{erf}(x) &= 1 - \operatorname{erfc}(x)
*    \end{align*}
*    ```
*
*    where
*
*    - \\(\operatorname{R1}(z)\\) is a degree \\(7\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*    - \\(\operatorname{S1}(z)\\) is a degree \\(8\\) polynomial in \\(z\\)
*
* 4. For \\(x \in [1/0.35,28)\\),
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ x > 0 \\
*    2.0 - \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ -6 < x < 0 \\
*    2.0 - \mathrm{tiny} & \textrm{if}\ x \leq -6
*    \end{cases}
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erf}(x) = \begin{cases}
*    \operatorname{sign}(x) \cdot (1.0 - \operatorname{erfc}(x)) & \textrm{if}\ x < 6 \\
*    \operatorname{sign}(x) \cdot (1.0 - \mathrm{tiny}) & \textrm{otherwise}
*    \end{cases}
*    ```
*
*    where
*
*    - \\(\operatorname{R2}(z)\\) is a degree \\(6\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*    - \\(\operatorname{S2}(z)\\) is a degree \\(7\\) polynomial in \\(z\\)
*
* 5. For \\(x \in [28, \infty)\\),
*
*    ``` tex
*    \begin{align*}
*    \operatorname{erf}(x) &= \operatorname{sign}(x) \cdot (1 - \mathrm{tiny}) & \textrm{(raise inexact)}
*    \end{align*}
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    \mathrm{tiny} \cdot \mathrm{tiny} & \textrm{if}\ x > 0\ \textrm{(raise underflow)} \\
*    2 - \mathrm{tiny} & \textrm{if}\ x < 0
*    \end{cases}
*    ```
*
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* \operatorname{erf}(0) &= 0 \\
* \operatorname{erf}(-0) &= -0 \\
* \operatorname{erf}(\infty) &= 1 \\
* \operatorname{erf}(-\infty) &= -1 \\
* \operatorname{erfc}(0) &= 1 \\
* \operatorname{erfc}(\infty) &= 0 \\
* \operatorname{erfc}(-\infty) &= 2 \\
* \operatorname{erf}(\mathrm{NaN}) &= \mathrm{NaN} \\
* \operatorname{erfc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* #### Notes
*
* * To compute \\(\exp(-x^2-0.5625+(\mathrm{R}/\mathrm{S}))\\), let \\(s\\) be a single precision number and \\(s := x\\); then
*
*    ``` tex
*    -x^2 = -s^2 + (s-x)(s+x)
*    ```
*
*    and
*
*    ``` tex
*    e^{-x^2-0.5626+(\mathrm{R}/\mathrm{S})} = e^{-s^2-0.5625} e^{(s-x)(s+x)+(\mathrm{R}/\mathrm{S})}
*    ```
*
* * `#4` and `#5` make use of the asymptotic series
*
*    ``` tex
*    \operatorname{erfc}(x) \approx \frac{e^{-x^2}}{x\sqrt{\pi}} (1 + \operatorname{poly}(1/x^2))
*    ```
*
*    We use a rational approximation to approximate
*
*    ``` tex
*    g(s) = f(1/x^2) = \ln(\operatorname{erfc}(x) \cdot x) - x^2 + 0.5625
*    ```
*
* * The error bound for \\(\mathrm{R1}/\mathrm{S1}\\) is
*
*    ``` tex
*    |\mathrm{R1}/\mathrm{S1} - f(x)| < 2^{-62.57}
*    ```
*
*    and for \\(\mathrm{R2}/\mathrm{S2}\\) is
*
*    ``` tex
*    |\mathrm{R2}/\mathrm{S2} - f(x)| < 2^{-61.52}
*    ```
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* @example
* var y = erfc( -1.0 );
* // returns ~-1.8427
*
* @example
* var y = erfc( 0.0 );
* // returns 1.0
*
* @example
* var y = erfc( Number.POSITIVE_INFINITY );
* // returns 0.0
*
* @example
* var y = erfc( Number.NEGATIVE_INFINITY );
* // returns 2.0
*
* @example
* var y = erfc( NaN );
* // returns NaN
*/
function erfc( x ) {
	var sign;
	var ax;
	var z;
	var r;
	var s;
	var y;
	var p;
	var q;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: +infinity
	if ( x === PINF ) {
		return 0.0;
	}
	// Special case: -infinity
	if ( x === NINF ) {
		return 2.0;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		sign = true;
		ax = -x;
	} else {
		sign = false;
		ax = x;
	}
	// |x| < 0.84375
	if ( ax < 0.84375 ) {
		if ( ax < SMALL ) {
			return 1.0 - x; // raise inexact
		}
		z = x * x;
		r = PPC + ( z*polyvalPP( z ) );
		s = QQC + ( z*polyvalQQ( z ) );
		y = r / s;

		// x < 1/4
		if ( x < 0.25 ) {
			return 1.0 - ( x + (x*y) );
		}
		r = x * y;
		r += x - 0.5;
		return 0.5 - r;
	}
	// 0.84375 <= |x| < 1.25
	if ( ax < 1.25 ) {
		s = ax - 1.0;
		p = PAC + ( s*polyvalPA( s ) );
		q = QAC + ( s*polyvalQA( s ) );
		if ( sign ) {
			return 1.0 + ERX + (p/q);
		}
		return 1.0 - ERX - (p/q);
	}
	// |x| < 28
	if ( ax < 28.0 ) {
		s = 1.0 / (ax*ax);

		// |x| < 1/0.35 ~ 2.857143
		if ( ax < 2.857142857142857 ) {
			r = RAC + ( s*polyvalRA( s ) );
			s = SAC + ( s*polyvalSA( s ) );
		}
		// |x| >= 1/0.35 ~ 2.857143
		else {
			// x < -6
			if ( x < -6.0 ) {
				return 2.0 - TINY; // raise inexact
			}
			r = RBC + ( s*polyvalRB( s ) );
			s = SBC + ( s*polyvalSB( s ) );
		}
		z = setLowWord( ax, 0 ); // pseudo-single (20-bit) precision x
		r = exp( -(z*z) - 0.5625 ) * exp( ((z-ax)*(z+ax)) + (r/s) );
		if ( sign ) {
			return 2.0 - (r/ax);
		}
		return r/ax;
	}
	if ( sign ) {
		return 2.0 - TINY; // raise inexact; ~2
	}
	return TINY * TINY; // raise inexact; ~0
} // end FUNCTION erfc()


// EXPORTS //

module.exports = erfc;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/base/utils/float64-set-low-word":162,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],59:[function(require,module,exports){
'use strict';

/**
* Evaluate the complementary error function.
*
* @module @stdlib/math/base/special/erfc
*
* @example
* var erfc = require( '@stdlib/math/base/special/erfc' );
*
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* y = erfc( -1.0 );
* // returns ~-1.8427
*
* y = erfc( 0.0 );
* // returns 1.0
*
* y = erfc( Number.POSITIVE_INFINITY );
* // returns 0.0
*
* y = erfc( Number.NEGATIVE_INFINITY );
* // returns 2.0
*
* y = erfc( NaN );
* // returns NaN
*/

// MODULES //

var erfc = require( './erfc.js' );


// EXPORTS //

module.exports = erfc;

},{"./erfc.js":58}],60:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var expmulti = require( './expmulti.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01;
var LN2_LO = 1.90821492927058770002e-10;
var LOG2_E = 1.44269504088896338700e+00;
var OVERFLOW = 7.09782712893383973096e+02;
var UNDERFLOW = -7.45133219101941108420e+02;
var NEARZERO = 1.0 / (1 << 28); // 2^-28;
var NEG_NEARZERO = -NEARZERO;


// MAIN //

/**
* Evaluates the natural exponential function.
*
* #### Method
*
* 1. We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*   ``` tex
*   \begin{align*}
*   x &= k \cdot \ln(2) + r \\
*   |r| &\leq 0.5 \cdot \ln(2)
*   \end{align*}
*   ```
*
*   <!-- <note> -->
*   \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*   <!-- </note> -->
*
* 2. We approximate of \\( e^{r} \\) by a special rational function on the interval \\([0,0.34658]\\):
*
*   ``` tex
*   \begin{align*}
*   R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*   &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*   \end{align*}
*   ```
*
*   We use a special Remes algorithm on \\([0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*   ``` tex
*   R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*   ```
*
*   where \\( z = r^2 \\) and
*
*   ``` tex
*   \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*   ```
*
*   <!-- <note> -->
*   The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*   <!-- </note> -->
*   The computation of \\( e^{r} \\) thus becomes
*
*   ``` tex
*   \begin{align*}
*   e^{r} &= 1 + \frac{2r}{R-r} \\
*           &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*   \end{align*}
*   ```
*
*   where
*
*   ``` tex
*   R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*   ```
*
* 3. We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*   ``` tex
*   e^{x} = 2^k e^{r}
*   ```
*
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* #### Notes
*
* - According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
* - For IEEE double,
*   * if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*   * if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
* - The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp( 4.0 );
* // returns ~54.5982
*
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
*
* @example
* var v = exp( 0.0 );
* // returns 1.0
*
* @example
* var v = exp( NaN );
* // returns NaN
*/
function exp( x ) {
	var hi;
	var lo;
	var k;

	if ( isnan( x ) || x === PINF ) {
		return x;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	if ( x > OVERFLOW ) {
		return PINF;
	}
	if ( x < UNDERFLOW ) {
		return 0.0;
	}
	if (
		x > NEG_NEARZERO &&
		x < NEARZERO
	) {
		return 1.0 + x;
	}
	// Reduce and compute `r = hi - lo` for extra precision.
	if ( x < 0.0 ) {
		k = trunc( (LOG2_E*x) - 0.5 );
	} else {
		k = trunc( (LOG2_E*x) + 0.5 );
	}
	hi = x - (k*LN2_HI);
	lo = k * LN2_LO;

	return expmulti( hi, lo, k );
} // end FUNCTION exp()


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":61,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":132,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],61:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var ldexp = require( '@stdlib/math/base/special/ldexp' );


// VARIABLES //

var P = [
	1.66666666666666019037e-01,  /* 0x3FC55555; 0x5555553E */
	-2.77777777770155933842e-03, /* 0xBF66C16C; 0x16BEBD93 */
	6.61375632143793436117e-05, /* 0x3F11566A; 0xAF25DE2C */
	-1.65339022054652515390e-06,/* 0xBEBBBD41; 0xC5D26BF1 */
	4.13813679705723846039e-08 /* 0x3E663769; 0x72BEA4D0 */
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyval_P = evalpoly( P );


// MAIN //

/**
* Computes \\(e^{r} 2^k\\) where \\(r = \mathrm{hi} - \mathrm{lo}\\) and \\(|r| \leq \ln(2)/2\\).
*
* @private
* @param {number} hi - upper bound
* @param {number} lo - lower bound
* @param {integer} k - power of 2
* @returns {number} function value
*/
function expmulti( hi, lo, k ) {
	var r;
	var t;
	var c;
	var y;

	r = hi - lo;
	t = r * r;
	c = r - t*polyval_P( t );
	y = 1.0 - ((lo - (r*c)/(2.0-c)) - hi);

	return ldexp( y, k );
} // end FUNCTION expmulti()


// EXPORTS //

module.exports = expmulti;

},{"@stdlib/math/base/special/ldexp":101,"@stdlib/math/base/tools/evalpoly":139}],62:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural exponential function.
*
* @module @stdlib/math/base/special/exp
*
* @example
* var exp = require( '@stdlib/math/base/special/exp' );
*
* var v = exp( 4.0 );
* // returns ~54.5982
*
* v = exp( -9.0 );
* // returns ~1.234e-4
*
* v = exp( 0.0 );
* // returns 1.0
*
* v = exp( NaN );
* // returns NaN
*/

// MODULES //

var exp = require( './exp.js' );


// EXPORTS //

module.exports = exp;

},{"./exp.js":60}],63:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [netlib]{@link http://www.netlib.org/fdlibm/s_expm1.c}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var LN2_HALF = require( '@stdlib/math/constants/float64-half-ln-two' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73

// Scaled polynomial coefficients:
var Q = [
	-3.33333333333331316428e-02, // 0xBFA11111 0x111110F4
	1.58730158725481460165e-03,  // 0x3F5A01A0 0x19FE5585
	-7.93650757867487942473e-05, // 0xBF14CE19 0x9EAADBB7
	4.00821782732936239552e-06,  // 0x3ED0CFCA 0x86E65239
	-2.01099218183624371326e-07 // 0xBE8AFDB7 0x6E09C32D
];


// FUNCTIONS //

var polyval = evalpoly.factory( Q );


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* #### Method
*
* 1. Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*    ``` tex
*    x = k \cdot \ln(2) + r
*    ```
*
*    where
*
*    ``` tex
*    |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*    ```
*
*    <!-- <note> -->
*    A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*    <!-- </note> -->
*
* 2. To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\([0,0.34658]\\). Since
*
*    ``` tex
*    r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*    ```
*
*    we define \\(\operatorname{R1}(r^2)\\) by
*
*    ``` tex
*    r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*    ```
*
*    That is,
*
*    ``` tex
*    \begin{align*}
*    \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*    &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*    &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*    \end{align*}
*    ```
*
*    We use a special Remes algorithm on \\([0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*    ``` tex
*    \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*    ```
*
*    where
*
*    ``` tex
*    \begin{align*}
*    \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*    \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*    \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*    \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*    \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*    \end{align*}
*    ```
*
*    where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*    ``` tex
*    \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*    ```
*
*    \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*    ``` tex
*    \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*    ```
*
*    To compensate for the error in the argument reduction, we use
*
*    ``` tex
*    \begin{align*}
*    \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*    &\approx \operatorname{expm1}(r) + c + rc
*    \end{align*}
*    ```
*
*    Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*    ``` tex
     \begin{align*}
*    \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*    &= r - \mathrm{E}
*    \end{align*}
*    ```
*
* 3. To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*    ``` tex
*    \operatorname{expm1}(x) = \begin{cases}
*    2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*    2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*    \end{cases}
*    ```
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* #### Notes
*
* - For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
* - To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
* - To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*   * if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*   * if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*   * if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*   * if \\(k = 1\\),
*     - if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*     - else return \\(1+2(r-\mathrm{E})\\)
*   * if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*   * if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*   * else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)
* - For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
* - The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* #### Accuracy
*
* According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
*
* @example
* var v = expm1( -9.0 );
* // returns ~-0.999
*
* @example
* var v = expm1( 0.0 );
* // returns 0.0
*
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = highWord( y );

	// Argument reduction...
	if ( y > LN2_HALF ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k = k|0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// if |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	}
	else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) )- 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);

		// Add k to y's exponent:
		hi = highWord( y ) + (k<<20);
		y = setHighWord( y, hi );

		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x200000 = 0 00000000010 00000000000000000000
		hi = 1072693248 - (0x200000>>k);
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (BIAS-k)<<20 );
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	// Add k to y's exponent:
	hi = highWord( y ) + (k<<20);
	y = setHighWord( y, hi );
	return y;
} // end FUNCTION expm1()


// EXPORTS //

module.exports = expm1;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/base/utils/float64-get-high-word":153,"@stdlib/math/base/utils/float64-set-high-word":160,"@stdlib/math/constants/float64-exponent-bias":174,"@stdlib/math/constants/float64-half-ln-two":177,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],64:[function(require,module,exports){
'use strict';

/**
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './expm1.js' );


// EXPORTS //

module.exports = expm1;

},{"./expm1.js":63}],65:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var FACTORIALS = require( './factorials.json' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Evaluates the factorial of `x`.
*
* @param {number} x - input value
* @returns {number} factorial
*
* @example
* var v = factorial( 3.0 );
* // returns 6.0
*
* @example
* var v = factorial( -1.5 );
* // returns ~-3.545
*
* @example
* var v = factorial( -0.5 );
* // returns ~1.772
*
* @example
* var v = factorial( 0.5 );
* // returns ~0.886
*
* @example
* var v = factorial( -10.0 );
* // returns NaN
*
* @example
* var v = factorial( 171.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = factorial( NaN );
* // returns NaN
*/
function factorial( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInteger( x ) ) {
		if ( x < 0 ) {
			return NaN;
		}
		if ( x <= MAX_FACTORIAL ) {
			return FACTORIALS[ x ];
		}
		return PINF;
	}
	return gamma( x + 1.0 );
} // end FUNCTION factorial()


// EXPORTS //

module.exports = factorial;

},{"./factorials.json":66,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gamma":78,"@stdlib/math/constants/float64-pinf":189}],66:[function(require,module,exports){
module.exports=[
	1,
	1,
	2,
	6,
	24,
	120,
	720,
	5040,
	40320,
	362880.0,
	3628800.0,
	39916800.0,
	479001600.0,
	6227020800.0,
	87178291200.0,
	1307674368000.0,
	20922789888000.0,
	355687428096000.0,
	6402373705728000.0,
	121645100408832000.0,
	0.243290200817664e19,
	0.5109094217170944e20,
	0.112400072777760768e22,
	0.2585201673888497664e23,
	0.62044840173323943936e24,
	0.15511210043330985984e26,
	0.403291461126605635584e27,
	0.10888869450418352160768e29,
	0.304888344611713860501504e30,
	0.8841761993739701954543616e31,
	0.26525285981219105863630848e33,
	0.822283865417792281772556288e34,
	0.26313083693369353016721801216e36,
	0.868331761881188649551819440128e37,
	0.29523279903960414084761860964352e39,
	0.103331479663861449296666513375232e41,
	0.3719933267899012174679994481508352e42,
	0.137637530912263450463159795815809024e44,
	0.5230226174666011117600072241000742912e45,
	0.203978820811974433586402817399028973568e47,
	0.815915283247897734345611269596115894272e48,
	0.3345252661316380710817006205344075166515e50,
	0.1405006117752879898543142606244511569936e52,
	0.6041526306337383563735513206851399750726e53,
	0.265827157478844876804362581101461589032e55,
	0.1196222208654801945619631614956577150644e57,
	0.5502622159812088949850305428800254892962e58,
	0.2586232415111681806429643551536119799692e60,
	0.1241391559253607267086228904737337503852e62,
	0.6082818640342675608722521633212953768876e63,
	0.3041409320171337804361260816606476884438e65,
	0.1551118753287382280224243016469303211063e67,
	0.8065817517094387857166063685640376697529e68,
	0.427488328406002556429801375338939964969e70,
	0.2308436973392413804720927426830275810833e72,
	0.1269640335365827592596510084756651695958e74,
	0.7109985878048634518540456474637249497365e75,
	0.4052691950487721675568060190543232213498e77,
	0.2350561331282878571829474910515074683829e79,
	0.1386831185456898357379390197203894063459e81,
	0.8320987112741390144276341183223364380754e82,
	0.507580213877224798800856812176625227226e84,
	0.3146997326038793752565312235495076408801e86,
	0.1982608315404440064116146708361898137545e88,
	0.1268869321858841641034333893351614808029e90,
	0.8247650592082470666723170306785496252186e91,
	0.5443449390774430640037292402478427526443e93,
	0.3647111091818868528824985909660546442717e95,
	0.2480035542436830599600990418569171581047e97,
	0.1711224524281413113724683388812728390923e99,
	0.1197857166996989179607278372168909873646e101,
	0.8504785885678623175211676442399260102886e102,
	0.6123445837688608686152407038527467274078e104,
	0.4470115461512684340891257138125051110077e106,
	0.3307885441519386412259530282212537821457e108,
	0.2480914081139539809194647711659403366093e110,
	0.188549470166605025498793226086114655823e112,
	0.1451830920282858696340707840863082849837e114,
	0.1132428117820629783145752115873204622873e116,
	0.8946182130782975286851441715398316520698e117,
	0.7156945704626380229481153372318653216558e119,
	0.5797126020747367985879734231578109105412e121,
	0.4753643337012841748421382069894049466438e123,
	0.3945523969720658651189747118012061057144e125,
	0.3314240134565353266999387579130131288001e127,
	0.2817104114380550276949479442260611594801e129,
	0.2422709538367273238176552320344125971528e131,
	0.210775729837952771721360051869938959523e133,
	0.1854826422573984391147968456455462843802e135,
	0.1650795516090846108121691926245361930984e137,
	0.1485715964481761497309522733620825737886e139,
	0.1352001527678402962551665687594951421476e141,
	0.1243841405464130725547532432587355307758e143,
	0.1156772507081641574759205162306240436215e145,
	0.1087366156656743080273652852567866010042e147,
	0.103299784882390592625997020993947270954e149,
	0.9916779348709496892095714015418938011582e150,
	0.9619275968248211985332842594956369871234e152,
	0.942689044888324774562618574305724247381e154,
	0.9332621544394415268169923885626670049072e156,
	0.9332621544394415268169923885626670049072e158,
	0.9425947759838359420851623124482936749562e160,
	0.9614466715035126609268655586972595484554e162,
	0.990290071648618040754671525458177334909e164,
	0.1029901674514562762384858386476504428305e167,
	0.1081396758240290900504101305800329649721e169,
	0.1146280563734708354534347384148349428704e171,
	0.1226520203196137939351751701038733888713e173,
	0.132464181945182897449989183712183259981e175,
	0.1443859583202493582204882102462797533793e177,
	0.1588245541522742940425370312709077287172e179,
	0.1762952551090244663872161047107075788761e181,
	0.1974506857221074023536820372759924883413e183,
	0.2231192748659813646596607021218715118256e185,
	0.2543559733472187557120132004189335234812e187,
	0.2925093693493015690688151804817735520034e189,
	0.339310868445189820119825609358857320324e191,
	0.396993716080872089540195962949863064779e193,
	0.4684525849754290656574312362808384164393e195,
	0.5574585761207605881323431711741977155627e197,
	0.6689502913449127057588118054090372586753e199,
	0.8094298525273443739681622845449350829971e201,
	0.9875044200833601362411579871448208012564e203,
	0.1214630436702532967576624324188129585545e206,
	0.1506141741511140879795014161993280686076e208,
	0.1882677176888926099743767702491600857595e210,
	0.237217324288004688567714730513941708057e212,
	0.3012660018457659544809977077527059692324e214,
	0.3856204823625804217356770659234636406175e216,
	0.4974504222477287440390234150412680963966e218,
	0.6466855489220473672507304395536485253155e220,
	0.8471580690878820510984568758152795681634e222,
	0.1118248651196004307449963076076169029976e225,
	0.1487270706090685728908450891181304809868e227,
	0.1992942746161518876737324194182948445223e229,
	0.269047270731805048359538766214698040105e231,
	0.3659042881952548657689727220519893345429e233,
	0.5012888748274991661034926292112253883237e235,
	0.6917786472619488492228198283114910358867e237,
	0.9615723196941089004197195613529725398826e239,
	0.1346201247571752460587607385894161555836e242,
	0.1898143759076170969428526414110767793728e244,
	0.2695364137888162776588507508037290267094e246,
	0.3854370717180072770521565736493325081944e248,
	0.5550293832739304789551054660550388118e250,
	0.80479260574719919448490292577980627711e252,
	0.1174997204390910823947958271638517164581e255,
	0.1727245890454638911203498659308620231933e257,
	0.2556323917872865588581178015776757943262e259,
	0.380892263763056972698595524350736933546e261,
	0.571338395644585459047893286526105400319e263,
	0.8627209774233240431623188626544191544816e265,
	0.1311335885683452545606724671234717114812e268,
	0.2006343905095682394778288746989117185662e270,
	0.308976961384735088795856467036324046592e272,
	0.4789142901463393876335775239063022722176e274,
	0.7471062926282894447083809372938315446595e276,
	0.1172956879426414428192158071551315525115e279,
	0.1853271869493734796543609753051078529682e281,
	0.2946702272495038326504339507351214862195e283,
	0.4714723635992061322406943211761943779512e285,
	0.7590705053947218729075178570936729485014e287,
	0.1229694218739449434110178928491750176572e290,
	0.2004401576545302577599591653441552787813e292,
	0.3287218585534296227263330311644146572013e294,
	0.5423910666131588774984495014212841843822e296,
	0.9003691705778437366474261723593317460744e298,
	0.1503616514864999040201201707840084015944e301,
	0.2526075744973198387538018869171341146786e303,
	0.4269068009004705274939251888899566538069e305,
	0.7257415615307998967396728211129263114717e307
]

},{}],67:[function(require,module,exports){
'use strict';

/**
* Evaluate the factorial function.
*
* @module @stdlib/math/base/special/factorial
*
* @example
* var factorial = require( '@stdlib/math/base/special/factorial' );
*
* var v = factorial( 3.0 );
* // returns 6.0
*
* v = factorial( -1.5 );
* // returns ~-3.545
*
* v = factorial( -0.5 );
* // returns ~1.772
*
* v = factorial( 0.5 );
* // returns ~0.886
*
* v = factorial( -10.0 );
* // returns NaN
*
* v = factorial( 171.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = factorial( NaN );
* // returns NaN
*/

// MODULES //

var factorial = require( './factorial.js' );


// EXPORTS //

module.exports = factorial;

},{"./factorial.js":65}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"./floor.js":68}],70:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var factorial = require( '@stdlib/math/base/special/factorial' );
var gammaDeltaRatioLanczos = require( './gamma_delta_ratio_lanczos.js' );


// VARIABLES //

var MAX_FACTORIAL = 170;


// MAIN //

/**
* Computes the ratio of two gamma functions.
*
* ## Notes
*
* * Specifically, the function evaluates
*
*   ``` tex
*   \frac{ \Gamma( z ) }{ \Gamma( z + \delta ) }
*   ```
*
* @param {number} z - first gamma parameter
* @param {number} delta - difference
* @returns {number} gamma ratio
*
* @example
* var y = gammaDeltaRatio( 2.0, 3.0 );
* // returns ~0.042
*
* @example
* var y = gammaDeltaRatio( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var y = gammaDeltaRatio( 100.0, 0.0 );
* // returns 1.0
*/
function gammaDeltaRatio( z, delta ) {
	var result;
	var idelta;
	var iz;

	if ( z <= 0.0 || z + delta <= 0.0 ) {
		// This isn't very sophisticated, or accurate, but it does work:
		return gamma( z ) / gamma( z + delta );
	}
	idelta = floor( delta );
	if ( idelta === delta ) {
		iz = floor( z );
		if ( iz === z ) {
			// As both `z` and `delta` are integers, see if we can use a table lookup:
			if ( z <= MAX_FACTORIAL && ( z + delta <= MAX_FACTORIAL ) ) {
				return factorial( iz - 1.0 ) / factorial( idelta + iz - 1.0 ); // eslint-disable-line max-len
			}
		}
		if ( abs(delta) < 20.0 ) {
			// As `delta` is a small integer, we can use a finite product:
			if ( delta === 0.0 ) {
				return 1.0;
			}
			if ( delta < 0.0 ) {
				z -= 1.0;
				result = z;
				delta += 1.0;
				while ( delta !== 0.0 ) {
					z -= 1.0;
					result *= z;
					delta += 1.0;
				}
				return result;
			}
			result = 1.0 / z;
			delta -= 1.0;
			while ( delta !== 0.0 ) {
				z += 1.0;
				result /= z;
				delta -= 1.0;
			}
			return result;
		}
	}
	return gammaDeltaRatioLanczos( z, delta );
} // end FUNCTION gammaDeltaRatio()


// EXPORTS //

module.exports = gammaDeltaRatio;

},{"./gamma_delta_ratio_lanczos.js":71,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/factorial":67,"@stdlib/math/base/special/floor":69,"@stdlib/math/base/special/gamma":78}],71:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006-7, 2013-14.
* Copyright Paul A. Bristow 2007, 2013-14.
* Copyright Nikhar Agrawal 2013-14.
* Copyright Christopher Kormanyos 2013-14.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSum = require( '@stdlib/math/base/special/gamma-lanczos-sum' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var EPSILON = require( '@stdlib/math/constants/float64-eps' );
var E = require( '@stdlib/math/constants/float64-e' );
var G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );


// VARIABLES //

var MAX_FACTORIAL = 170;
var FACTORIAL_169 = 4.269068009004705e+304;


/**
* Calculates the ratio of two gamma functions via Lanczos approximation.
*
* ## Notes
*
* * When \\( z < \epsilon \\), we get spurious numeric overflow unless we're very careful. This can occur either inside `lanczosSum(z)` or in the final combination of terms. To avoid this, split the product up into 2 (or 3) parts:
*
*   ``` tex
*   \begin{align}
*   G(z) / G(L) &= 1 / (z \cdot G(L)) ; z < \eps, L = z + \delta = \delta \\
*   z * G(L) &= z * G(lim) \cdot (G(L)/G(lim)) ; lim = \text{largest factorial}
*   \end{align}
*   ````
*
* @private
* @param {number} z - first gamma parameter
* @param {number} delta - difference
* @returns {number} gamma ratio
*/
function gammaDeltaRatioLanczos( z, delta ) {
	var result;
	var ratio;
	var zgh;

	if ( z < EPSILON ) {
		if ( delta > MAX_FACTORIAL ) {
			ratio = gammaDeltaRatioLanczos( delta, MAX_FACTORIAL-delta );
			ratio *= z;
			ratio *= FACTORIAL_169;
			return 1.0 / ratio;
		}
		return 1.0 / ( z * gamma( z+delta ) );
	}
	zgh = z + G - 0.5;
	if ( z + delta === z ) {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5-z ) * log1p( delta/zgh ) );
		} else {
			result = 1.0;
		}
	} else {
		if ( abs(delta) < 10.0 ) {
			result = exp( ( 0.5-z ) * log1p( delta/zgh ));
		} else {
			result = pow( zgh / (zgh+delta), z-0.5 );
		}
		// Split up the calculation to avoid spurious overflow:
		result *= lanczosSum( z ) / lanczosSum( z + delta );
	}
	result *= pow( E / ( zgh+delta ), delta );
	return result;
} // end FUNCTION gammaDeltaRatioLanczos()


// EXPORTS //

module.exports = gammaDeltaRatioLanczos;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/gamma":78,"@stdlib/math/base/special/gamma-lanczos-sum":76,"@stdlib/math/base/special/log1p":105,"@stdlib/math/base/special/pow":111,"@stdlib/math/constants/float64-e":171,"@stdlib/math/constants/float64-eps":172,"@stdlib/math/constants/float64-gamma-lanczos-g":176}],72:[function(require,module,exports){
'use strict';

/**
* Calculate the ratio of two gamma functions.
*
* @module @stdlib/math/base/special/gamma-delta-ratio
*
* @example
* var gammaDeltaRatio = require( '@stdlib/math/base/special/gamma-delta-ratio' );
*
* var y = gammaDeltaRatio( 2.0, 3.0 );
* // returns ~0.042
*
* y = gammaDeltaRatio( 4.0, 0.5 );
* // returns 2.0
*
* y = gammaDeltaRatio( 100.0, 0.0 );
* // returns 1.0
*/

// MODULES //

var gammaDeltaRatio = require( './gamma_delta_ratio.js' );


// EXPORTS //

module.exports = gammaDeltaRatio;

},{"./gamma_delta_ratio.js":70}],73:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;


// VARIABLES //

var NUM = [
	709811.662581657956893540610814842699825,
	679979.847415722640161734319823103390728,
	293136.785721159725251629480984140341656,
	74887.5403291467179935942448101441897121,
	12555.29058241386295096255111537516768137,
	1443.42992444170669746078056942194198252,
	115.2419459613734722083208906727972935065,
	6.30923920573262762719523981992008976989,
	0.2266840463022436475495508977579735223818,
	0.004826466289237661857584712046231435101741,
	0.4624429436045378766270459638520555557321e-4
];
var DENOM = [
	0.0,
	362880.0,
	1026576.0,
	1172700.0,
	723680.0,
	269325.0,
	63273.0,
	9450.0,
	870.0,
	45.0,
	1.0
];


// MAIN //

/**
* Calculates the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @name gammaLanczosSumExpGScaled
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* @example
* var v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* @example
* var v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/
var gammaLanczosSumExpGScaled = evalrational( NUM, DENOM );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"@stdlib/math/base/tools/evalrational":142}],74:[function(require,module,exports){
'use strict';

/**
* Calculate the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum-expg-scaled
*
* @example
* var gammaLanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
*
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSumExpGScaled = require( './gamma_lanczos_sum_expg_scaled.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./gamma_lanczos_sum_expg_scaled.js":73}],75:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;


// VARIABLES //

var NUM = [
	38474670393.31776828316099004518914832218,
	36857665043.51950660081971227404959150474,
	15889202453.72942008945006665994637853242,
	4059208354.298834770194507810788393801607,
	680547661.1834733286087695557084801366446,
	78239755.00312005289816041245285376206263,
	6246580.776401795264013335510453568106366,
	341986.3488721347032223777872763188768288,
	12287.19451182455120096222044424100527629,
	261.6140441641668190791708576058805625502,
	2.506628274631000502415573855452633787834
];
var DENOM = [
	0.0,
	362880.0,
	1026576.0,
	1172700.0,
	723680.0,
	269325.0,
	63273.0,
	9450.0,
	870.0,
	45.0,
	1.0
];


// MAIN //

/**
* Calculates the Lanczos sum approximation.
*
* @name gammaLanczosSum
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSum( 4.0 );
* // returns ~950.366
*
* @example
* var v = gammaLanczosSum( -1.5 );
* // returns ~1373366.245
*
* @example
* var v = gammaLanczosSum( -0.5 );
* // returns ~-699841.735
*
* @example
* var v = gammaLanczosSum( 0.5 );
* // returns ~96074.186
*
* @example
* var v = gammaLanczosSum( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = gammaLanczosSum( NaN );
* // returns NaN
*/
var gammaLanczosSum = evalrational( NUM, DENOM );


// EXPORTS //

module.exports = gammaLanczosSum;

},{"@stdlib/math/base/tools/evalrational":142}],76:[function(require,module,exports){
'use strict';

/**
* Calculate the Lanczos sum for the approximation of the gamma function.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum
*
* @example
* var gammaLanczosSum = require( '@stdlib/math/base/special/gamma-lanczos-sum' );
*
* var v = gammaLanczosSum( 4.0 );
* // returns ~950.366
*
* v = gammaLanczosSum( -1.5 );
* // returns ~1373366.245
*
* v = gammaLanczosSum( -0.5 );
* // returns ~-699841.735
*
* v = gammaLanczosSum( 0.5 );
* // returns ~96074.186
*
* v = gammaLanczosSum( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = gammaLanczosSum( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSum = require( './gamma_lanczos_sum.js' );


// EXPORTS //

module.exports = gammaLanczosSum;

},{"./gamma_lanczos_sum.js":75}],77:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://netlib.sandia.gov/cephes/cprob/gamma.c}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* COPYRIGHT
*
* Cephes Math Library Release 2.8:  June, 2000
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var sin = require( '@stdlib/math/base/special/sin' );
var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );


// VARIABLES //

var P = [
	9.99999999999999996796e-01,
	4.94214826801497100753e-01,
	2.07448227648435975150e-01,
	4.76367800457137231464e-02,
	1.04213797561761569935e-02,
	1.19135147006586384913e-03,
	1.60119522476751861407e-04,
	0
];
var Q = [
	1.00000000000000000320e+00,
	7.14304917030273074085e-02,
	-2.34591795718243348568e-01,
	3.58236398605498653373e-02,
	1.18139785222060435552e-02,
	-4.45641913851797240494e-03,
	5.39605580493303397842e-04,
	-2.31581873324120129819e-05
];


// FUNCTIONS //

// Compile a function to evaluate a rational function based on the above coefficients...
var rateval = evalrational( P, Q );


// MAIN //

/**
* Evaluates the gamma function.
*
* #### Method
*
* 1. Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2. Large negative arguments are made positive using a reflection formula.
* 3. Large arguments are handled by Stirling's formula.
*
*
* #### Notes
*
* * Relative error:
*
*   | arithmetic | domain    | # trials | peak    | rms     |
*   |:----------:|:---------:|:--------:|:-------:|:-------:|
*   | DEC        | -34,34    | 10000    | 1.3e-16 | 2.5e-17 |
*   | IEEE       | -170,-33  | 20000    | 2.3e-15 | 3.3e-16 |
*   | IEEE       | -33, 33   | 20000    | 9.4e-16 | 2.2e-16 |
*   | IEEE       | 33, 171.6 | 20000    | 2.3e-15 | 3.2e-16 |
*
* * Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gamma( 4.0 );
* // returns 6.0
*
* @example
* var v = gamma( -1.5 );
* // returns ~2.363
*
* @example
* var v = gamma( -0.5 );
* // returns ~-3.545
*
* @example
* var v = gamma( 0.5 );
* // returns ~1.772
*
* @example
* var v = gamma( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = gamma( -0.0 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = gamma( NaN );
* // returns NaN
*/
function gamma( x ) {
	var sign;
	var q;
	var p;
	var z;
	if (
		(isInteger( x ) && x < 0) ||
		x === NINF ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( isNegativeZero( x ) ) {
			return NINF;
		}
		return PINF;
	}
	if ( x > 171.61447887182298 ) {
		return PINF;
	}
	if ( x < -170.5674972726612 ) {
		return 0.0;
	}
	q = abs( x );
	if ( q > 33.0 ) {
		if ( x >= 0.0 ) {
			return stirlingApprox( x );
		}
		p = floor( q );

		// Check whether `x` is even...
		if ( (p&1) === 0 ) {
			sign = -1.0;
		} else {
			sign = 1.0;
		}
		z = q - p;
		if ( z > 0.5 ) {
			p += 1.0;
			z = q - p;
		}
		z = q * sin( PI * z );
		return sign * PI / ( abs(z)*stirlingApprox(q) );
	}
	// Reduce `x`...
	z = 1.0;
	while ( x >= 3.0 ) {
		x -= 1.0;
		z *= x;
	}
	while ( x < 0.0 ) {
		if ( x > -1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	while ( x < 2.0 ) {
		if ( x < 1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	if ( x === 2.0 ) {
		return z;
	}
	x -= 2.0;
	return z * rateval( x );
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"./small_approximation.js":79,"./stirling_approximation.js":80,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/floor":69,"@stdlib/math/base/special/sin":127,"@stdlib/math/base/tools/evalrational":142,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pi":188,"@stdlib/math/constants/float64-pinf":189}],78:[function(require,module,exports){
'use strict';

/**
* Evaluate the gamma function.
*
* @module @stdlib/math/base/special/gamma
*
* @example
* var gamma = require( '@stdlib/math/base/special/gamma' );
*
* var v = gamma( 4.0 );
* // returns 6.0
*
* v = gamma( -1.5 );
* // returns ~2.363
*
* v = gamma( -0.5 );
* // returns ~-3.545
*
* v = gamma( 0.5 );
* // returns ~1.772
*
* v = gamma( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = gamma( -0.0 );
* // returns Number.NEGATIVE_INFINITY
*
* v = gamma( NaN );
* // returns NaN
*/

// MODULES //

var gamma = require( './gamma.js' );


// EXPORTS //

module.exports = gamma;

},{"./gamma.js":77}],79:[function(require,module,exports){
'use strict';

// MODULES //

var EULER = require( '@stdlib/math/constants/float64-eulergamma' );


// MAIN //

/**
* Evaluates the gamma function using a small-value approximation.
*
* @param {number} x - input value
* @param {number} z - scale factor
* @returns {number} function value
*/
function gamma( x, z ) {
	return z / ( ( 1.0 + ( EULER*x ) ) * x );
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"@stdlib/math/constants/float64-eulergamma":173}],80:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );


// VARIABLES //

var MAX_STIRLING = 143.01608;
var S = [
	8.33333333333482257126e-02,
	3.47222221605458667310e-03,
	-2.68132617805781232825e-03,
	-2.29549961613378126380e-04,
	7.87311395793093628397e-04
];


// FUNCTIONS //

// Compile a function to evaluate a polynomial based on the above coefficients...
var polyval = evalpoly( S );


// MAIN //

/**
* Evaluates the gamma function using Stirling's formula. The polynomial is valid for \\(33 \leq x \leq 172\\).
*
* @param {number} x - input value
* @returns {number} function value
*/
function gamma( x ) {
	var w;
	var y;
	var v;

	w = 1.0 / x;
	w = 1.0 + ( w * polyval( w ) );
	y = exp( x );

	// Check `x` to avoid `pow()` overflow...
	if ( x > MAX_STIRLING ) {
		v = pow( x, ( 0.5*x ) - 0.25 );
		y = v * (v/y);
	} else {
		y = pow( x, x-0.5 ) / y;
	}
	return SQRT_TWO_PI * y * w;
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/pow":111,"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/constants/float64-sqrt-two-pi":192}],81:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Calculates normalised Q when a is an integer.
*
* @private
* @param {integer} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finiteGammaQ( a, x ) {
	var term;
	var sum;
	var e;
	var n;

	e = exp( -x );
	sum = e;
	if ( sum !== 0.0 ) {
		term = sum;
		for ( n = 1; n < a; ++n ) {
			term /= n;
			term *= x;
			sum += term;
		}
	}
	return sum;
} // end FUNCTION finiteGammaQ()


// EXPORTS //

module.exports = finiteGammaQ;

},{"@stdlib/math/base/special/exp":62}],82:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var PI = require( '@stdlib/math/constants/float64-pi' );


// MAIN //

/**
* Calculates normalised Q when a is a half-integer.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finiteHalfGammaQ( a, x ) {
	var half;
	var term;
	var sum;
	var e;
	var n;

	e = erfc( sqrt(x) );
	if ( e !== 0 && a > 1.0 ) {
		term = exp( -x ) / sqrt( PI * x );
		term *= x;
		half = 0.5;
		term /= half;
		sum = term;
		for ( n = 2; n < a; ++n ) {
			term /= n - half;
			term *= x;
			sum += term;
		}
		e += sum;
	}
	return e;
} // end FUNCTION finiteHalfGammaQ()


// EXPORTS //

module.exports = finiteHalfGammaQ;

},{"@stdlib/math/base/special/erfc":59,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/constants/float64-pi":188}],83:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );


// MAIN //

/**
* Calculates the power term prefix (z^a)(e^-z) used in the non-normalised incomplete gammas.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} power term prefix
*/
function fullIGammaPrefix( a, z ) {
	var prefix;
	var alz;

	alz = a * ln( z );
	if ( z >= 1.0 ) {
		if ( ( alz < MAX_LN ) && ( -z > MIN_LN ) ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( a >= 1.0 ) {
			prefix = pow( z / exp(z/a), a );
		}
		else {
			prefix = exp( alz - z );
		}
	}
	else {
		/* eslint-disable no-lonely-if */
		if ( alz > MIN_LN ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( z/a < MAX_LN ) {
			prefix = pow( z / exp(z/a), a );
		} else {
			prefix = exp( alz - z );
		}
	}
	return prefix;
} // end FUNCTION fullIGammaPrefix()


// EXPORTS //

module.exports = fullIGammaPrefix;

},{"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/pow":111,"@stdlib/math/constants/float64-max-ln":183,"@stdlib/math/constants/float64-min-ln":186}],84:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006-7, 2013-14.
* (C) Copyright Paul A. Bristow 2007, 2013-14.
* (C) Copyright Nikhar Agrawal 2013-14
* (C) Christopher Kormanyos 2013-14
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var SQRT_EPSILON = require( '@stdlib/math/constants/float64-sqrt-eps' );
var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var finiteGammaQ = require( './finite_gamma_q.js' );
var finiteHalfGammaQ = require( './finite_half_gamma_q.js' );
var fullIGammaPrefix = require( './full_igamma_prefix.js' );
var igammaTemmeLarge = require( './igamma_temme_large.js' );
var lowerGammaSeries = require( './lower_gamma_series.js' );
var regularisedGammaPrefix = require( './regularised_gamma_prefix.js' );
var tgammaSmallUpperPart = require( './tgamma_small_upper_part.js' );
var upperGammaFraction = require( './upper_gamma_fraction.js' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Computes the regularized incomplete gamma function. The upper tail is calculated via the modified Lentz's method for computing continued fractions, the lower tail using a power expansion.
*
*
* #### Notes
*
* - When a >= MAX_FACTORIAL and computing the non-normalized incomplete gamma, result is rather hard to compute unless we use logs. There are really two options a) if x is a long way from a in value then we can reliably use methods 2 and 4 below in logarithmic form and go straight to the result. Otherwise we let the regularized gamma take the strain (the result is unlikely to underflow in the central region anyway) and combine with lgamma in the hopes that we get a finite result.
*
* @param {NonNegativeNumber} x - function parameter
* @param {PositiveNumber} a - function parameter
* @param {boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @param {boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete gamma function
* @returns {number} function value
*/
function gammainc( x, a, regularized, upper ) {
	var optimisedInvert;
	var normalised;
	var evalMethod;
	var initValue;
	var isHalfInt;
	var useTemme;
	var isSmallA;
	var invert;
	var result;
	var isInt;
	var sigma;
	var gam;
	var res;
	var fa;
	var g;

	if ( x < 0.0 || a <= 0.0 ) {
		return NaN;
	}
	normalised = ( regularized === void 0 ) ? true : regularized;
	invert = upper;
	result = 0.0;
	if ( a >= MAX_FACTORIAL && !normalised ) {
		if ( invert && ( a * 4.0 < x ) ) {
			// This is method 4 below, done in logs:
			result = ( a * ln(x) ) - x;
			result += ln( upperGammaFraction( a, x ) );
		}
		else if ( !invert && ( a > 4.0 * x ) ) {
			// This is method 2 below, done in logs:
			result = ( a * ln(x) ) - x;
			initValue = 0;
			result += ln( lowerGammaSeries( a, x, initValue ) / a );
		}
		else {
			result = gammainc( a, x, true, invert );
			if ( result === 0.0 ) {
				if ( invert ) {
					// Try http://functions.wolfram.com/06.06.06.0039.01
					result = 1.0 + ( 1.0 / (12.0*a) ) + ( 1.0 / (288.0*a*a) );
					result = ln( result ) - a + ( ( a-0.5 ) * ln(a) );
					result += ln( SQRT_TWO_PI );
				} else {
					// This is method 2 below, done in logs, we're really outside the range of this method, but since the result is almost certainly infinite, we should probably be OK:
					result = ( a * ln( x ) ) - x;
					initValue = 0.0;
					result += ln( lowerGammaSeries( a, x, initValue ) / a);
				}
			}
			else {
				result = ln( result ) + gammaln( a );
			}
		}
		if ( result > MAX_LN ) {
			return PINF;
		}
		return exp( result );
	}
	isSmallA = ( a < 30 ) && ( a <= x + 1.0 ) && ( x < MAX_LN );
	if ( isSmallA ) {
		fa = floor( a );
		isInt = ( fa === a );
		isHalfInt = isInt ? false : ( abs( fa - a ) === 0.5 );
	} else {
		isInt = isHalfInt = false;
	}
	if ( isInt && x > 0.6 ) {
		// Calculate Q via finite sum:
		invert = !invert;
		evalMethod = 0;
	}
	else if ( isHalfInt && x > 0.2 ) {
		// Calculate Q via finite sum for half integer a:
		invert = !invert;
		evalMethod = 1;
	}
	else if ( x < SQRT_EPSILON && a > 1.0 ) {
		evalMethod = 6;
	}
	else if ( x < 0.5 ) {
		// Changeover criterion chosen to give a changeover at Q ~ 0.33:
		if ( -0.4 / ln( x ) < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 3;
		}
	}
	else if ( x < 1.1 ) {
		// Changeover here occurs when P ~ 0.75 or Q ~ 0.25:
		if ( x * 0.75 < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 3;
		}
	}
	else {
		// Begin by testing whether we're in the "bad" zone where the result will be near 0.5 and the usual series and continued fractions are slow to converge:
		useTemme = false;
		if ( normalised && a > 20 ) {
			sigma = abs( (x-a)/a );
			if ( a > 200 ) {
				// Limit chosen so that we use Temme's expansion only if the result would be larger than about 10^-6. Below that the regular series and continued fractions converge OK, and if we use Temme's method we get increasing errors from the dominant erfc term as it's (inexact) argument increases in magnitude.
				if ( 20 / a > sigma * sigma ) {
					useTemme = true;
				}
			} else if ( sigma < 0.4 ) {
				useTemme = true;
			}
		}
		if ( useTemme ) {
			evalMethod = 5;
		}
		// Regular case where the result will not be too close to 0.5: Changeover occurs at P ~ Q ~ 0.5. Note that series computation of P is about x2 faster than continued fraction calculation of Q, so try and use the CF only when really necessary, especially for small x.
		else if ( x - ( 1.0 / (3.0 * x) ) < a ) {
			evalMethod = 2;
		} else {
			evalMethod = 4;
			invert = !invert;
		}
	}

	/* eslint-disable default-case */
	switch ( evalMethod ) {
	case 0:
		result = finiteGammaQ( a, x );
		if (normalised === false ) {
			result *= gamma( a );
		}
		break;
	case 1:
		result = finiteHalfGammaQ( a, x );
		if ( normalised === false ) {
			result *= gamma( a );
		}
		break;
	case 2:
		// Compute P:
		result = normalised ?
			regularisedGammaPrefix( a, x ) :
			fullIGammaPrefix( a, x );
		if ( result !== 0.0 ) {
			initValue = 0.0;
			optimisedInvert = false;
			if ( invert ) {
				initValue = normalised ? 1.0 : gamma(a);
				if (
					normalised ||
					result >= 1.0 ||
					FLOAT64_MAX * result > initValue
				) {
					initValue /= result;
					if (
						normalised ||
						a < 1.0 ||
						( FLOAT64_MAX / a > initValue )
					) {
						initValue *= -a;
						optimisedInvert = true;
					}
					else {
						initValue = 0.0;
					}
				}
				else {
					initValue = 0.0;
				}
			}
		}
		result *= lowerGammaSeries( a, x, initValue ) / a;
		if ( optimisedInvert ) {
			invert = false;
			result = -result;
		}
		break;
	case 3:
		// Compute Q:
		invert = !invert;
		res = tgammaSmallUpperPart( a, x, invert );
		result = res[ 0 ];
		g = res[ 1 ];
		invert = false;
		if ( normalised ) {
			result /= g;
		}
		break;
	case 4:
		// Compute Q:
		result = normalised ?
			regularisedGammaPrefix( a, x ) :
			fullIGammaPrefix( a, x );
		if ( result !== 0 ) {
			result *= upperGammaFraction( a, x );
		}
		break;
	case 5:
		result = igammaTemmeLarge( a, x );
		if ( x >= a ) {
			invert = !invert;
		}
		break;
	case 6:
		// Since x is so small that P is necessarily very small too, use http://functions.wolfram.com/GammaBetaErf/GammaRegularized/06/01/05/01/01/
		result = normalised ?
			pow(x, a) / gamma( a + 1.0 ) :
			pow( x, a ) / a;
		result *= 1.0 - ( a * x / ( a + 1.0 ) );
		break;
	}
	if ( normalised && result > 1.0 ) {
		result = 1.0;
	}
	if ( invert ) {
		gam = normalised ? 1.0 : gamma( a );
		result = gam - result;
	}
	return result;
} // end FUNCTION gammainc()


// EXPORTS //

module.exports = gammainc;

},{"./finite_gamma_q.js":81,"./finite_half_gamma_q.js":82,"./full_igamma_prefix.js":83,"./igamma_temme_large.js":86,"./lower_gamma_series.js":88,"./regularised_gamma_prefix.js":90,"./tgamma_small_upper_part.js":92,"./upper_gamma_fraction.js":93,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/floor":69,"@stdlib/math/base/special/gamma":78,"@stdlib/math/base/special/gammaln":96,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/pow":111,"@stdlib/math/constants/float64-max":184,"@stdlib/math/constants/float64-max-ln":183,"@stdlib/math/constants/float64-pinf":189,"@stdlib/math/constants/float64-sqrt-eps":191,"@stdlib/math/constants/float64-sqrt-two-pi":192}],85:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/gamma.hpp}.
*
* This implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );


// MAIN //

/**
* Computes `Γ(x+1) - 1`.
*
* @private
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammap1m1( 1e-3 );
* // returns ~-0.001
*
* @example
* var v = gammap1m1( -3/2 );
* // returns ~-4.545
*
* @example
* var v = gammap1m1( 4.0 );
* // returns 23
*
* @example
* var v = gammap1m1( 1/2 );
* // returns ~-0.114
*
* @example
* var v = gammap1m1( NaN );
* // returns NaN
*/
function gammap1m1( x ) {
	if ( x < -0.5 ) {
		// Best method is simply to subtract 1 from gamma:
		return gamma( 1.0 + x ) - 1.0;
	}
	if ( x < 0.0 ) {
		// Use expm1 on gammaln:
		return expm1( -log1p(x) + gammaln( x + 2.0 ) );
	}
	if ( x < 2.0 ) {
		// Use expm1 on gammaln:
		return expm1( gammaln( x + 1.0 ) );
	}
	// Best method is simply to subtract 1 from gamma:
	return gamma( 1.0 + x ) - 1.0;
} // end FUNCTION gammap1m1()


// EXPORTS //

module.exports = gammap1m1;

},{"@stdlib/math/base/special/expm1":64,"@stdlib/math/base/special/gamma":78,"@stdlib/math/base/special/gammaln":96,"@stdlib/math/base/special/log1p":105}],86:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var PI = require( '@stdlib/math/constants/float64-pi' );


// VARIABLES //

// Pre-allocate workspace array:
var workspace = new Array( 10 );

// Polynomical coefficients...
var C0 = [
	-0.33333333333333333,
	0.083333333333333333,
	-0.014814814814814815,
	0.0011574074074074074,
	0.0003527336860670194,
	-0.00017875514403292181,
	0.39192631785224378e-4,
	-0.21854485106799922e-5,
	-0.185406221071516e-5,
	0.8296711340953086e-6,
	-0.17665952736826079e-6,
	0.67078535434014986e-8,
	0.10261809784240308e-7,
	-0.43820360184533532e-8,
	0.91476995822367902e-9
];
var C1 = [
	-0.0018518518518518519,
	-0.0034722222222222222,
	0.0026455026455026455,
	-0.00099022633744855967,
	0.00020576131687242798,
	-0.40187757201646091e-6,
	-0.18098550334489978e-4,
	0.76491609160811101e-5,
	-0.16120900894563446e-5,
	0.46471278028074343e-8,
	0.1378633446915721e-6,
	-0.5752545603517705e-7,
	0.11951628599778147e-7
];
var C2 = [
	0.0041335978835978836,
	-0.0026813271604938272,
	0.00077160493827160494,
	0.20093878600823045e-5,
	-0.00010736653226365161,
	0.52923448829120125e-4,
	-0.12760635188618728e-4,
	0.34235787340961381e-7,
	0.13721957309062933e-5,
	-0.6298992138380055e-6,
	0.14280614206064242e-6
];
var C3 = [
	0.00064943415637860082,
	0.00022947209362139918,
	-0.00046918949439525571,
	0.00026772063206283885,
	-0.75618016718839764e-4,
	-0.23965051138672967e-6,
	0.11082654115347302e-4,
	-0.56749528269915966e-5,
	0.14230900732435884e-5
];
var C4 = [
	-0.0008618882909167117,
	0.00078403922172006663,
	-0.00029907248030319018,
	-0.14638452578843418e-5,
	0.66414982154651222e-4,
	-0.39683650471794347e-4,
	0.11375726970678419e-4
];
var C5 = [
	-0.00033679855336635815,
	-0.69728137583658578e-4,
	0.00027727532449593921,
	-0.00019932570516188848,
	0.67977804779372078e-4,
	0.1419062920643967e-6,
	-0.13594048189768693e-4,
	0.80184702563342015e-5,
	-0.22914811765080952e-5
];
var C6 = [
	0.00053130793646399222,
	-0.00059216643735369388,
	0.00027087820967180448,
	0.79023532326603279e-6,
	-0.81539693675619688e-4,
	0.56116827531062497e-4,
	-0.18329116582843376e-4
];
var C7 = [
	0.00034436760689237767,
	0.51717909082605922e-4,
	-0.00033493161081142236,
	0.0002812695154763237,
	-0.00010976582244684731
];
var C8 = [
	-0.00065262391859530942,
	0.00083949872067208728,
	-0.00043829709854172101
];

// Compile functions for evaluating polynomial functions...
var polyvalC0 = evalpoly.factory( C0 );
var polyvalC1 = evalpoly.factory( C1 );
var polyvalC2 = evalpoly.factory( C2 );
var polyvalC3 = evalpoly.factory( C3 );
var polyvalC4 = evalpoly.factory( C4 );
var polyvalC5 = evalpoly.factory( C5 );
var polyvalC6 = evalpoly.factory( C6 );
var polyvalC7 = evalpoly.factory( C7 );
var polyvalC8 = evalpoly.factory( C8 );


// MAIN //

/**
* Asymptotic expansions of the incomplete gamma functions when a is large and x ~ a. (IEEE double precision or 10^-17).
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} value of asymptotic expansion
*/
function igammaTemmeLarge( a, x ) {
	var result;
	var sigma;
	var phi;
	var y;
	var z;

	sigma = ( x - a ) / a;
	phi = -ln( 1 + sigma ) + sigma;
	y = a * phi;
	z = sqrt( 2 * phi );
	if ( x < a ) {
		z = -z;
	}
	workspace[ 0 ] = polyvalC0( z );
	workspace[ 1 ] = polyvalC1( z );
	workspace[ 2 ] = polyvalC2( z );
	workspace[ 3 ] = polyvalC3( z );
	workspace[ 4 ] = polyvalC4( z );
	workspace[ 5 ] = polyvalC5( z );
	workspace[ 6 ] = polyvalC6( z );
	workspace[ 7 ] = polyvalC7( z );
	workspace[ 8 ] = polyvalC8( z );
	workspace[ 9 ] = -0.00059676129019274625;
	result = evalpoly( workspace, 1.0/a );
	result *= exp( -y ) / sqrt( 2.0 * PI * a );
	if ( x < a ) {
		result = -result;
	}
	result += erfc( sqrt(y) ) / 2.0;
	return result;
} // end FUNCTION igammaTemmeLarge()


// EXPORTS //

module.exports = igammaTemmeLarge;

},{"@stdlib/math/base/special/erfc":59,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/constants/float64-pi":188}],87:[function(require,module,exports){
'use strict';

/**
* Evaluate the incomplete gamma function.
*
* @module @stdlib/math/base/special/gammainc
*
* @example
* var gammainc = require( '@stdlib/math/base/special/gammainc' );
*
* var v = gammainc( 6.0, 2.0 );
* // returns ~0.9826
*
* v = gammainc( 1.0, 2.0, true, true );
* // returns ~0.7358
*
* v = gammainc( 7.0, 5.0 );
* // returns ~0.8270
*
* v = gammainc( 7.0, 5.0, false );
* // returns ~19.8482
*
* v = gammainc( NaN, 2.0 );
* // returns NaN
*
* v = gammainc( 6.0, NaN );
* // returns NaN
*/

// MODULES //

var gammainc = require( './gammainc.js' );


// EXPORTS //

module.exports = gammainc;

},{"./gammainc.js":84}],88:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var lowerIncompleteGammaSeries = require( './lower_incomplete_gamma_series' );


// MAIN //

/**
* Sums elements of the series expansion of the lower incomplete gamma function.
*
* #### Method
*
* Multiply result by ((z^a) * (e^-z) / a) to get the full lower incomplete integral. Then divide by tgamma(a) to get the normalised value.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @param {number} initialValue - initial value of the resulting sum
* @returns {number} sum of terms of lower gamma series
*/
function lowerGammaSeries( a, z, initialValue ) {
	var result;
	var s;

	initialValue = initialValue || 0.0;
	s = lowerIncompleteGammaSeries( a, z );
	result = sumSeries( s, {
		'initialValue': initialValue
	});
	return result;
} // end FUNCTION lowerGammaSeries()


// EXPORTS //

module.exports = lowerGammaSeries;

},{"./lower_incomplete_gamma_series":89,"@stdlib/math/base/tools/sum-series":145}],89:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Creates a function to evaluate a series expansion of the incomplete gamma function.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function lowerIncompleteGammaSeries( a1, z1 ) {
	var result = 1.0;
	var a = a1;
	var z = z1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		var r = result;
		a += 1.0;
		result *= z/a;
		return r;
	} // end FUNCTION next()
} // end FUNCTION lowerIncompleteGammaSeries()


// EXPORTS //

module.exports = lowerIncompleteGammaSeries;

},{}],90:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/exp":62,"@stdlib/math/base/special/gamma":78,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":74,"@stdlib/math/base/special/gammaln":96,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/log1p":105,"@stdlib/math/base/special/max":107,"@stdlib/math/base/special/min":109,"@stdlib/math/base/special/pow":111,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/constants/float64-e":171,"@stdlib/math/constants/float64-gamma-lanczos-g":176,"@stdlib/math/constants/float64-max-ln":183,"@stdlib/math/constants/float64-min-ln":186,"dup":48}],91:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

/**
* Series representation for upper fraction when z is small.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {Function}  series function
*/
function smallGamma2Series( a, x ) {
	var result;
	var apn;
	var n;
	var r;

	result = -x;
	x = -x;
	apn = a + 1.0;
	n = 1;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {number} series expansion term
	*/
	function next() {
		r = result / apn;
		result *= x;
		n += 1;
		result /= n;
		apn += 1.0;
		return r;
	} // end FUNCTION next();
} // end FUNCTION smallGamma2Series()


// EXPORTS //

module.exports = smallGamma2Series;

},{}],92:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var powm1 = require( '@stdlib/math/base/special/powm1' );
var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var smallGamma2Series = require( './small_gamma2_series.js' );
var tgamma1pm1 = require( './gammap1m1.js' );


// MAIN //

/**
* Compute the full upper fraction (Q) when a is very small.
*
* @param {number} a - function parameter
* @param {number} x - function parameter
* @param {boolean} invert - boolean indicating if the upper tail of the incomplete gamma function should be evaluated
* @returns {Array} full upper fraction (Q) and pgam
*/
function tgammaSmallUpperPart( a, x, invert ) {
	var initialValue;
	var result;
	var pgam;
	var p;
	var s;

	result = tgamma1pm1( a );
	pgam = ( result + 1.0 ) / a;
	p = powm1( x, a );
	result -= p;
	result /= a;
	s = smallGamma2Series( a, x );
	p += 1.0;
	initialValue = invert ? pgam : 0.0;
	result = -p * sumSeries( s, {
		'initialValue': (initialValue - result) / p
	});
	if ( invert ) {
		result = -result;
	}
	return [ result, pgam ];
} // end FUNCTION tgammaSmallUpperPart()


// EXPORTS //

module.exports = tgammaSmallUpperPart;

},{"./gammap1m1.js":85,"./small_gamma2_series.js":91,"@stdlib/math/base/special/powm1":119,"@stdlib/math/base/tools/sum-series":145}],93:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
var upperIncompleteGammaFract = require( './upper_incomplete_gamma_fract' );


// MAIN //

/**
* Evaluate the lower incomplete gamma integral via a series expansion and divide by gamma(z) to normalise.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} function value
*/
function upperGammaFraction( a, z ) {
	var f = upperIncompleteGammaFract( a, z );
	return 1.0 / ( z - a + 1.0 + continuedFraction( f ) );
} // end FUNCTION upperGammaFraction()


// EXPORTS //

module.exports = upperGammaFraction;

},{"./upper_incomplete_gamma_fract":94,"@stdlib/math/base/tools/continued-fraction":136}],94:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Creates a function to evaluate a series expansion of the upper incomplete gamma fraction.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function upperIncompleteGammaFract( a1, z1 ) {
	var z = z1 - a1 + 1.0;
	var a = a1;
	var k = 0;
	return next;

	/**
	* Calculate the next term of the series.
	*
	* @private
	* @returns {Array} series expansion terms
	*/
	function next() {
		k += 1;
		z += 2.0;
		return [
			k * (a - k),
			z
		];
	} // end FUNCTION next()
} // end FUNCTION upperIncompleteGammaFract()


// EXPORTS //

module.exports = upperIncompleteGammaFract;

},{}],95:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_lgamma_r.c?revision=268523&view=co}.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var PI = require( '@stdlib/math/constants/float64-pi' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// VARIABLES //

var A1C = 7.72156649015328655494e-02; // 0x3FB3C467E37DB0C8
var A1 = [
	6.73523010531292681824e-02, // 0x3FB13E001A5562A7
	7.38555086081402883957e-03, // 0x3F7E404FB68FEFE8
	1.19270763183362067845e-03, // 0x3F538A94116F3F5D
	2.20862790713908385557e-04, // 0x3F2CF2ECED10E54D
	2.52144565451257326939e-05  // 0x3EFA7074428CFA52
];
var A2C = 3.22467033424113591611e-01; // 0x3FD4A34CC4A60FAD
var A2 = [
	2.05808084325167332806e-02, // 0x3F951322AC92547B
	2.89051383673415629091e-03, // 0x3F67ADD8CCB7926B
	5.10069792153511336608e-04, // 0x3F40B6C689B99C00
	1.08011567247583939954e-04, // 0x3F1C5088987DFB07
	4.48640949618915160150e-05  // 0x3F07858E90A45837
];
var RC = 1.0;
var R = [
	1.39200533467621045958e+00, // 0x3FF645A762C4AB74
	7.21935547567138069525e-01, // 0x3FE71A1893D3DCDC
	1.71933865632803078993e-01, // 0x3FC601EDCCFBDF27
	1.86459191715652901344e-02, // 0x3F9317EA742ED475
	7.77942496381893596434e-04, // 0x3F497DDACA41A95B
	7.32668430744625636189e-06  // 0x3EDEBAF7A5B38140
];
var SC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var S = [
	2.14982415960608852501e-01,  // 0x3FCB848B36E20878
	3.25778796408930981787e-01,  // 0x3FD4D98F4F139F59
	1.46350472652464452805e-01,  // 0x3FC2BB9CBEE5F2F7
	2.66422703033638609560e-02,  // 0x3F9B481C7E939961
	1.84028451407337715652e-03,  // 0x3F5E26B67368F239
	3.19475326584100867617e-05   // 0x3F00BFECDD17E945
];
var T1C = 4.83836122723810047042e-01; // 0x3FDEF72BC8EE38A2
var T1 = [
	-3.27885410759859649565e-02, // 0xBFA0C9A8DF35B713
	6.10053870246291332635e-03,  // 0x3F78FCE0E370E344
	-1.40346469989232843813e-03, // 0xBF56FE8EBF2D1AF1
	3.15632070903625950361e-04   // 0x3F34AF6D6C0EBBF7
];
var T2C = -1.47587722994593911752e-01; // 0xBFC2E4278DC6C509
var T2 = [
	1.79706750811820387126e-02,  // 0x3F9266E7970AF9EC
	-3.68452016781138256760e-03, // 0xBF6E2EFFB3E914D7
	8.81081882437654011382e-04,  // 0x3F4CDF0CEF61A8E9
	-3.12754168375120860518e-04  // 0xBF347F24ECC38C38
];
var T3C = 6.46249402391333854778e-02; // 0x3FB08B4294D5419B
var T3 = [
	-1.03142241298341437450e-02, // 0xBF851F9FBA91EC6A
	2.25964780900612472250e-03,  // 0x3F6282D32E15C915
	-5.38595305356740546715e-04, // 0xBF41A6109C73E0EC
	3.35529192635519073543e-04   // 0x3F35FD3EE8C2D3F4
];
var UC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var U = [
	6.32827064025093366517e-01,  // 0x3FE4401E8B005DFF
	1.45492250137234768737e+00,  // 0x3FF7475CD119BD6F
	9.77717527963372745603e-01,  // 0x3FEF497644EA8450
	2.28963728064692451092e-01,  // 0x3FCD4EAEF6010924
	1.33810918536787660377e-02   // 0x3F8B678BBF2BAB09
];
var VC = 1.0;
var V = [
	2.45597793713041134822e+00, // 0x4003A5D7C2BD619C
	2.12848976379893395361e+00, // 0x40010725A42B18F5
	7.69285150456672783825e-01, // 0x3FE89DFBE45050AF
	1.04222645593369134254e-01, // 0x3FBAAE55D6537C88
	3.21709242282423911810e-03  // 0x3F6A5ABB57D0CF61
];
var WC = 4.18938533204672725052e-01; // 0x3FDACFE390C97D69
var W = [
	8.33333333333329678849e-02,  // 0x3FB555555555553B
	-2.77777777728775536470e-03, // 0xBF66C16C16B02E5C
	7.93650558643019558500e-04,  // 0x3F4A019F98CF38B6
	-5.95187557450339963135e-04, // 0xBF4380CB8C0FE741
	8.36339918996282139126e-04,  // 0x3F4B67BA4CDAD5D1
	-1.63092934096575273989e-03  // 0xBF5AB89D0B9E43E4
];
var YMIN = 1.461632144968362245;
var TWO52 = 4503599627370496; // 2**52
var TWO58 = 288230376151711744; // 2**58
var TINY = 8.470329472543003e-22;
var TC = 1.46163214496836224576e+00; // 0x3FF762D86356BE3F
var TF = -1.21486290535849611461e-01; // 0xBFBF19B9BCC38A42
var TT = -3.63867699703950536541e-18; // 0xBC50C7CAA48A971F => TT = -(tail of TF)


// FUNCTIONS //

// Compile functions to evaluate polynomials based on the above coefficients...
var polyvalA1 = evalpoly( A1 );
var polyvalA2 = evalpoly( A2 );
var polyvalR = evalpoly( R );
var polyvalS = evalpoly( S );
var polyvalT1 = evalpoly( T1 );
var polyvalT2 = evalpoly( T2 );
var polyvalT3 = evalpoly( T3 );
var polyvalU = evalpoly( U );
var polyvalV = evalpoly( V );
var polyvalW = evalpoly( W );


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function.
*
* #### Method
*
* 1. Argument reduction for \\(0 < x \leq 8\\). Since \\(\Gamma(1+s) = s \Gamma(s)\\), for \\(x \in [0,8]\\), we may reduce \\(x\\) to a number in \\([1.5,2.5]\\) by
*
*   ``` tex
*   \operatorname{lgamma}(1+s) = \ln(s) + \operatorname{lgamma}(s)
*   ```
*
*   For example,
*
*   ``` tex
*   \begin{align}
*   \operatorname{lgamma}(7.3) &= \ln(6.3) + \operatorname{lgamma}(6.3) \\
*   &= \ln(6.3 \cdot 5.3) + \operatorname{lgamma}(5.3) \\
*   &= \ln(6.3 \cdot 5.3 \cdot 4.3 \cdot 3.3 \cdot2.3) + \operatorname{lgamma}(2.3)
*   \end{align}
*   ```
*
* 2. Compute a polynomial approximation of \\(\mathrm{lgamma}\\) around its
minimum (\\(\mathrm{ymin} = 1.461632144968362245\\)) to maintain monotonicity. On the interval \\([\mathrm{ymin} - 0.23, \mathrm{ymin} + 0.27]\\) (i.e., \\([1.23164,1.73163]\\)), we let \\(z = x - \mathrm{ymin}\\) and use
*
*   ``` tex
*   \operatorname{lgamma}(x) = -1.214862905358496078218 + z^2 \cdot \operatorname{poly}(z)
*   ```
*
*   where \\(\operatorname{poly}(z)\\) is a \\(14\\) degree polynomial.
*
* 3. Compute a rational approximation in the primary interval \\([2,3]\\). Let \\( s = x - 2.0 \\). We can thus use the approximation
*
*   ``` tex
*   \operatorname{lgamma}(x) = \frac{s}{2} + s\frac{\operatorname{P}(s)}{\operatorname{Q}(s)}
*   ```
*
*   with accuracy
*
*   ``` tex
*   \biggl|\frac{\mathrm{P}}{\mathrm{Q}} - \biggr(\operatorname{lgamma}(x)-\frac{s}{2}\biggl)\biggl| < 2^{-61.71}
*   ```
*
*   The algorithms are based on the observation
*
*   ``` tex
*   \operatorname{lgamma}(2+s) = s(1 - \gamma) + \frac{\zeta(2) - 1}{2} s^2 - \frac{\zeta(3) - 1}{3} s^3 + \ldots
*   ```
*
*   where \\(\zeta\\) is the zeta function and \\(\gamma = 0.5772156649...\\) is the Euler-Mascheroni constant, which is very close to \\(0.5\\).
*
* 3. For \\(x \geq 8\\),
*
*   ``` tex
*   \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr) \ln(x) - x + \frac{\ln(2\pi)}{2} + \frac{1}{12x} - \frac{1}{360x^3} + \ldots
*   ```
*
*   which can be expressed
*
*   ``` tex
*   \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)-\frac{\ln(2\pi)-1}{2} + \ldots
*   ```
*
*   Let \\(z = \frac{1}{x}\\). We can then use the approximation
*
*   ``` tex
*   f(z) = \operatorname{lgamma}(x) - \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)
*   ```
*
*   by
*
*   ``` tex
*   w = w_0 + w_1 z + w_2 z^3 + w_3 z^5 + \ldots + w_6 z^{11}
*   ```

*   where
*
*   ``` tex
*   |w - f(z)| < 2^{-58.74}
*   ```
*
* 4. For negative \\(x\\), since
*
*   ``` tex
*   -x \Gamma(-x) \Gamma(x) = \frac{\pi}{\sin(\pi x)}
*   ```
*
*   where \\(\Gamma\\) is the gamma function, we have
*
*   ``` tex
*   \Gamma(x) = \frac{\pi}{\sin(\pi x)(-x)\Gamma(-x)}
*   ```
*
*   Since \\(\Gamma(-x)\\) is positive,
*
*   ``` tex
*   \operatorname{sign}(\Gamma(x)) = \operatorname{sign}(\sin(\pi x))
*   ```
*
*   for \\(x < 0\\). Hence, for \\(x < 0\\),
*
*   ``` tex
*   \mathrm{signgam} = \operatorname{sign}(\sin(\pi x))
*   ```
*
*   and
*
*   ``` tex
*   \begin{align}
*   \operatorname{lgamma}(x) &= \ln(|\Gamma(x)|) \\
*   &= \ln\biggl(\frac{\pi}{|x \sin(\pi x)|}\biggr) - \operatorname{lgamma}(-x)
*   \end{align}
*   ```
*
*   <!-- <note> -->
*   Note that one should avoid computing \\(\pi (-x)\\) directly in the computation of \\(\sin(\pi (-x))\\).
*   <!-- </note> -->
*
*
* #### Special Cases
*
* ``` tex
* \begin{align}
* \operatorname{lgamma}(2+s) &\approx s (1-\gamma) & \mathrm{for\ tiny\ s} \\
* \operatorname{lgamma}(x) &\approx -\ln(x) & \mathrm{for\ tiny\ x} \\
* \operatorname{lgamma}(1) &= 0 & \\
* \operatorname{lgamma}(2) &= 0 & \\
* \operatorname{lgamma}(0) &= \infty & \\
* \operatorname{lgamma}(\infty) &= \infty & \\
* \operatorname{lgamma}(-\mathrm{integer}) &= \pm \infty
* \end{align}
* ```
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammaln( 1.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 2.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 4.0 );
* // returns ~1.792
*
* @example
* var v = gammaln( -0.5 );
* // returns ~1.266
*
* @example
* var v = gammaln( 0.5 );
* // returns ~0.572
*
* @example
* var v = gammaln( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = gammaln( NaN );
* // returns NaN
*/
function gammaln( x ) {
	var isNegative;
	var nadj;
	var flg;
	var p3;
	var p2;
	var p1;
	var p;
	var q;
	var t;
	var w;
	var y;
	var z;
	var r;

	// Special cases: NaN, +-infinity
	if ( isnan( x ) || isInfinite( x ) ) {
		return x;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	if ( x < 0.0 ) {
		isNegative = true;
		x = -x;
	} else {
		isNegative = false;
	}
	// If |x| < 2**-70, return -ln(|x|)
	if ( x < TINY ) {
		return -ln( x );
	}
	if ( isNegative ) {
		// If |x| >= 2**52, must be -integer
		if ( x >= TWO52 ) {
			return PINF;
		}
		t = sinpi( x );
		if ( t === 0.0 ) {
			return PINF;
		}
		nadj = ln( PI / abs( t*x ) );
	}
	// If x equals 1 or 2, return 0
	if ( x === 1.0 || x === 2.0 ) {
		return 0.0;
	}
	// If x < 2, use lgamma(x) = lgamma(x+1) - log(x)
	if ( x < 2.0 ) {
		if ( x <= 0.9 ) {
			r = -ln( x );

			// 0.7316 <= x <=  0.9
			if ( x >= ( YMIN - 1.0 + 0.27 ) ) {
				y = 1.0 - x;
				flg = 0;
			}
			// 0.2316 <= x < 0.7316
			else if ( x >= (YMIN - 1.0 - 0.27) ) {
				y = x - (TC - 1.0);
				flg = 1;
			}
			// 0 < x < 0.2316
			else {
				y = x;
				flg = 2;
			}
		} else {
			r = 0.0;

			// 1.7316 <= x < 2
			if ( x >= (YMIN + 0.27) ) {
				y = 2.0 - x;
				flg = 0;
			}
			// 1.2316 <= x < 1.7316
			else if ( x >= (YMIN - 0.27) ) {
				y = x - TC;
				flg = 1;
			}
			// 0.9 < x < 1.2316
			else {
				y = x - 1.0;
				flg = 2;
			}
		}
		switch ( flg ) { // eslint-disable-line default-case
		case 0:
			z = y * y;
			p1 = A1C + (z*polyvalA1( z ));
			p2 = z * (A2C + (z*polyvalA2( z )));
			p = (y*p1) + p2;
			r += ( p - (0.5*y) );
			break;
		case 1:
			z = y * y;
			w = z * y;
			p1 = T1C + (w*polyvalT1( w ));
			p2 = T2C + (w*polyvalT2( w ));
			p3 = T3C + (w*polyvalT3( w ));
			p = (z*p1) - (TT - (w*(p2+(y*p3))));
			r += ( TF + p );
			break;
		case 2:
			p1 = y * (UC + (y*polyvalU( y )));
			p2 = VC + (y*polyvalV( y ));
			r += (-0.5*y) + (p1/p2);
			break;
		}
	}
	// 2 <= x < 8
	else if ( x < 8.0 ) {
		flg = trunc( x );
		y = x - flg;
		p = y * (SC + (y*polyvalS( y )));
		q = RC + (y*polyvalR( y ));
		r = (0.5*y) + (p/q);
		z = 1.0; // gammaln(1+s) = ln(s) + gammaln(s)
		switch ( flg ) { // eslint-disable-line default-case
		case 7:
			z *= y + 6.0;
			/* falls through */
		case 6:
			z *= y + 5.0;
			/* falls through */
		case 5:
			z *= y + 4.0;
			/* falls through */
		case 4:
			z *= y + 3.0;
			/* falls through */
		case 3:
			z *= y + 2.0;
			r += ln( z );
		}
	}
	// 8 <= x < 2**58
	else if ( x < TWO58 ) {
		t = ln( x );
		z = 1.0 / x;
		y = z * z;
		w = WC + (z*polyvalW( y ));
		r = ((x-0.5)*(t-1.0)) + w;
	}
	// 2**58 <= x <= Inf
	else {
		r = x * ( ln(x)-1.0 );
	}
	if ( isNegative ) {
		r = nadj - r;
	}
	return r;
} // end FUNCTION gammaln()


// EXPORTS //

module.exports = gammaln;

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/sinpi":129,"@stdlib/math/base/special/trunc":132,"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/constants/float64-pi":188,"@stdlib/math/constants/float64-pinf":189}],96:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of the gamma function.
*
* @module @stdlib/math/base/special/gammaln
*
* @example
* var gammaln = require( '@stdlib/math/base/special/gammaln' );
*
* var v = gammaln( 1.0 );
* // returns 0.0
*
* v = gammaln( 2.0 );
* // returns 0.0
*
* v = gammaln( 4.0 );
* // returns ~1.792
*
* v = gammaln( -0.5 );
* // returns ~1.266
*
* v = gammaln( 0.5 );
* // returns ~0.572
*
* v = gammaln( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = gammaln( NaN );
* // returns NaN
*/

// MODULES //

var gammaln = require( './gammaln.js' );


// EXPORTS //

module.exports = gammaln;

},{"./gammaln.js":95}],97:[function(require,module,exports){
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

},{"./kernel_cos.js":98}],98:[function(require,module,exports){
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
* @param {number} x - input value (in radians, assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine
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

},{"@stdlib/math/base/tools/evalpoly":139}],99:[function(require,module,exports){
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

},{"./kernel_sin.js":100}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{"./ldexp.js":102}],102:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":55,"@stdlib/math/base/utils/float64-exponent":147,"@stdlib/math/base/utils/float64-from-words":149,"@stdlib/math/base/utils/float64-normalize":157,"@stdlib/math/base/utils/float64-to-words":165,"@stdlib/math/constants/float64-exponent-bias":174,"@stdlib/math/constants/float64-max-base2-exponent":182,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":181,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":185,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],103:[function(require,module,exports){
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

},{"./ln.js":104}],104:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/base/utils/float64-get-high-word":153,"@stdlib/math/base/utils/float64-set-high-word":160,"@stdlib/math/base/utils/float64-to-words":165,"@stdlib/math/constants/float64-exponent-bias":174,"@stdlib/math/constants/float64-ninf":187}],105:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of \\(1+x\\).
*
* @module @stdlib/math/base/special/log1p
*
* @example
* var log1p = require( '@stdlib/math/base/special/log1p' );
*
* var v = log1p( 4.0 );
* // returns ~1.609
*
* v = log1p( -1.0 );
* // returns Number.NEGATIVE_INFINITY
*
* v = log1p( 0.0 );
* // returns 0.0
*
* v = log1p( -0.0 );
* // returns -0.0
*
* v = log1p( -2.0 );
* // returns NaN
*
* v = log1p( NaN );
* // returns NaN
*/

// MODULES //

var log1p = require( './log1p.js' );


// EXPORTS //

module.exports = log1p;

},{"./log1p.js":106}],106:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [netlib]{http://www.netlib.org/fdlibm/s_log1p.c}.
*
* The long comment and implementation follow the original, but have been reformatted and modified for JavaScript.
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

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01;  // 0x3fda8279 0x99fcef34

// sqrt(2)/2-1:
var SQRT2HALFM1 = -2.928932188134524755992e-01; // 0xbfd2bec3 0x33018866

// 2**-29:
var SMALL = 1.862645149230957e-09; // 0x3e200000 0x00000000

// 2**-54:
var TINY = 5.551115123125783e-17;

// Max integer (unsafe) => 2**53:
var TWO53 = 9007199254740992;

// 2/3:
var TWO_THIRDS = 6.666666666666666666e-01;

// Polynomial coefficients:
var Lp = [
	6.666666666666735130e-01, // 0x3FE55555 0x55555593
	3.999999999940941908e-01, // 0x3FD99999 0x9997FA04
	2.857142874366239149e-01, // 0x3FD24924 0x94229359
	2.222219843214978396e-01, // 0x3FCC71C5 0x1D8E78AF
	1.818357216161805012e-01, // 0x3FC74664 0x96CB03DE
	1.531383769920937332e-01, // 0x3FC39A09 0xD078C69F
	1.479819860511658591e-01 // 0x3FC2F112 0xDF3E5244
];


// FUNCTIONS //

var polyval = evalpoly.factory( Lp );


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* #### Method
*
* 1. Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*    ``` tex
*    1+x = 2^k (1+f)
*    ```
*
*    where
*
*    ``` tex
*    \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*    ```
*
*    <!-- <note> -->
*    If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*    ``` tex
*    u = \operatorname{round}(1+x)
*    ```
*
*    and
*
*    ``` tex
*    c = (1+x) - u
*    ```
*
*    then
*
*    ``` tex
*    \ln (1+x) - \ln u \approx \frac{c}{u}
*    ```
*
*    We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*    <!-- </note> -->
*    <!-- <note> -->
*    When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*    <!-- </note> -->
*
* 2. Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*    ``` tex
*    s = \frac{f}{2+f}
*    ```
*
*    based on
*
*    ``` tex
*    \begin{align*}
*    \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*            &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*            &= 2s + sR \\
*    \end{align*}
*    ```
*
*     We use a special Reme algorithm on \\([0,0.1716]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ``` tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ``` tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*     <!-- </note> -->
*
*     Note that
*
*     ``` tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ``` tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3. Finally,
*
*    ``` tex
*    \begin{align*}
*    \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*    &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*    \end{align*}
*    ```
*
*    Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*    ``` tex
*    \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*    ```
*
*    where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
*
* #### Special Cases
*
* - \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* - \\(\operatorname{log1p}(+\infty) = +\infty\\)
* - \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* - \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
*
* #### Notes
*
* * According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
* * The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
* * Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*    ``` javascript
*    var u = 1.0 + x;
*    if ( u === 1.0 ) {
*      return x;
*    } else {
*      return ln(u) * (x/(u-1.0));
*    }
*    ```
*
*    See HP-15C Advanced Functions Handbook, p.193.
*
*
* @param {number} x - input value
* @returns {number} the natural logarithm of `1+x`
*
* @example
* var v = log1p( 4.0 );
* // returns ~1.609
*
* @example
* var v = log1p( -1.0 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = log1p( 0.0 );
* // returns 0.0
*
* @example
* var v = log1p( -0.0 );
* // returns -0.0
*
* @example
* var v = log1p( -2.0 );
* // returns NaN
*
* @example
* var v = log1p( NaN );
* // returns NaN
*/
function log1p( x ) {
	var hfsq;
	var hu;
	var y;
	var f;
	var c;
	var s;
	var z;
	var R;
	var u;
	var k;

	if ( x < -1.0 || isnan( x ) ) {
		return NaN;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x === PINF ) {
		return x;
	}
	if ( x === 0.0 ) {
		return x; // handle +-0 (IEEE 754-2008 spec)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		y = -x;
	} else {
		y = x;
	}
	// Argument reduction...
	k = 1;

	// Check if argument reduction is needed and if we can just return a small value approximation requiring less computation but with equivalent accuracy...
	if ( y < SQRT2M1 ) { // if |x| < sqrt(2)-1 => ~0.41422
		if ( y < SMALL ) { // if |x| < 2**-29
			if ( y < TINY ) { // if |x| < 2**-54
				return x;
			}
			// Use a simple two-term Taylor series...
			return x - ( x*x*0.5 );
		}
		// Check if `f=x` can be represented exactly (no need for correction terms), allowing us to bypass argument reduction...
		if ( x > SQRT2HALFM1 ) { // if x > sqrt(2)/2-1 => ~-0.2929
			// => -0.2929 < x < 0.41422
			k = 0;
			f = x; // exact
			hu = 1;
		}
	}
	// Address case where `f` cannot be represented exactly...
	if ( k !== 0 ) {
		if ( y < TWO53 ) {
			u = 1.0 + x;
			hu = highWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - BIAS;

			// Correction term...
			if ( k > 0 ) { // positive unbiased exponent
				c = 1.0 - (u-x);
			} else { // nonpositive unbiased exponent
				c = x - (u-1.0);
			}
			c /= u;
		} else {
			u = x;
			hu = highWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - BIAS;

			// Correction term is zero:
			c = 0;
		}
		// Apply a bit mask (0 00000000000 11111111111111111111) to remove the exponent:
		hu &= 0x000fffff; // max value => 1048575

		// Check if u significand is less than sqrt(2) significand => 0x6a09e => 01101010000010011110
		if ( hu < 434334 ) {
			// Normalize u by setting the exponent to 1023 (bias) => 0x3ff00000 => 0 01111111111 00000000000000000000
			u = setHighWord( u, hu|0x3ff00000 );
		} else {
			k += 1;

			// Normalize u/2 by setting the exponent to 1022 (bias-1 => 2**-1 = 1/2) => 0x3fe00000 => 0 01111111110 00000000000000000000
			u = setHighWord( u, hu|0x3fe00000 );

			// Subtract hu significand from next largest hu => 0 00000000001 00000000000000000000 => 0x00100000 => 1048576
			hu = (1048576-hu)>>2;
		}
		f = u - 1.0;
	}
	// Approximation of log1p(f)...
	hfsq = 0.5 * f * f;
	if ( hu === 0 ) { // if |f| < 2**-20
		if ( f === 0.0 ) {
			c += k * LN2_LO;
			return ( k * LN2_HI ) + c;
		}
		R = hfsq * (1.0 - ( TWO_THIRDS*f ) ); // avoid division
		return ( k*LN2_HI ) - ( (R - ( (k*LN2_LO) + c)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;

	R = z * polyval( z );

	if ( k === 0 ) {
		return f - ( hfsq - ( s*(hfsq+R) ) );
	}
	return ( k*LN2_HI ) - ( (hfsq - ( (s*(hfsq+R)) + ((k*LN2_LO) + c))) - f );
} // end FUNCTION log1p()


// EXPORTS //

module.exports = log1p;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/base/utils/float64-get-high-word":153,"@stdlib/math/base/utils/float64-set-high-word":160,"@stdlib/math/constants/float64-exponent-bias":174,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],107:[function(require,module,exports){
'use strict';

/**
* Return the maximum value.
*
* @module @stdlib/math/base/special/max
*
* @example
* var max = require( '@stdlib/math/base/special/max' );
*
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './max.js' );


// EXPORTS //

module.exports = max;

},{"./max.js":108}],108:[function(require,module,exports){
'use strict';

// MODULES //

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2

* @example
* var v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* @example
* var v = max( 3.14, NaN );
* // returns NaN
*
* @example
* var v = max( +0.0, -0.0 );
* // returns +0.0
*/
function max( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === PINF || y === PINF ) {
			return PINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isPositiveZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x > y ) {
			return x;
		}
		return y;
	}
	m = NINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === PINF ) {
			return v;
		}
		if ( v > m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isPositiveZero( v )
		) {
			m = v;
		}
	}
	return m;
} // end FUNCTION max()


// EXPORTS //

module.exports = max;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":16,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],109:[function(require,module,exports){
'use strict';

/**
* Return the minimum value.
*
* @module @stdlib/math/base/special/min
*
* @example
* var min = require( '@stdlib/math/base/special/min' );
*
* var v = min( 3.14, 4.2 );
* // returns 3.14
*
* v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* v = min( 3.14, NaN );
* // returns NaN
*
* v = min( +0.0, -0.0 );
* // returns -0.0
*/

// MODULES //

var min = require( './min.js' );


// EXPORTS //

module.exports = min;

},{"./min.js":110}],110:[function(require,module,exports){
'use strict';

// MODULES //

var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Returns the minimum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} minimum value
*
* @example
* var v = min( 3.14, 4.2 );
* // returns 3.14

* @example
* var v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = min( 3.14, NaN );
* // returns NaN
*
* @example
* var v = min( +0.0, -0.0 );
* // returns -0.0
*/
function min( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === NINF || y === NINF ) {
			return NINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isNegativeZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x < y ) {
			return x;
		}
		return y;
	}
	m = PINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === NINF ) {
			return v;
		}
		if ( v < m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isNegativeZero( v )
		) {
			m = v;
		}
	}
	return m;
} // end FUNCTION min()


// EXPORTS //

module.exports = min;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],111:[function(require,module,exports){
'use strict';

/**
* Evaluate the exponential function.
*
* @module @stdlib/math/base/special/pow
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* v = pow( 4.0, 0.5 );
* // returns 2.0
*
* v = pow( 100.0, 0.0 );
* // returns 1.0
*
* v = pow( Math.PI, 5.0 );
* // returns ~306.0197
*
* v = pow( Math.PI, -0.2 );
* // returns ~0.7954
*
* v = pow( NaN, 3.0 );
* // returns NaN
*
* v = pow( 5.0, NaN );
* // returns NaN
*
* v = pow( NaN, NaN );
* // returns NaN
*/

// MODULES //

var pow = require( './pow.js' );


// EXPORTS //

module.exports = pow;

},{"./pow.js":114}],112:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// VARIABLES //

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff;

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000;

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000;

// 0x20000000 = 536870912 => 0 01000000000 00000000000000000000 => biased exponent: 512 = -511+1023
var HIGH_BIASED_EXP_NEG_512 = 0x20000000;

// 0x00080000 = 524288 => 0 00000000000 10000000000000000000
var HIGH_SIGNIFICAND_HALF = 0x00080000;

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20;

var TWO53 = 9007199254740992.0;	// 0x43400000, 0x00000000

// 2/(3*LN2)
var CP = 9.61796693925975554329e-01; // 0x3FEEC709, 0xDC3A03FD

// (float)CP
var CP_HI = 9.61796700954437255859e-01; // 0x3FEEC709, 0xE0000000

// Low: CP_HI
var CP_LO = -7.02846165095275826516e-09; // 0xBE3E2FE0, 0x145B01F5

var BP = [
	1.0,
	1.5
];
var DP_HI = [
	0.0,
	5.84962487220764160156e-01 // 0x3FE2B803, 0x40000000
];
var DP_LO = [
	0.0,
	1.35003920212974897128e-08 // 0x3E4CFDEB, 0x43CFD006
];

// Polynomial coefficients...
var L = [
	5.99999999999994648725e-01, // 0x3FE33333, 0x33333303
	4.28571428578550184252e-01, // 0x3FDB6DB6, 0xDB6FABFF
	3.33333329818377432918e-01, // 0x3FD55555, 0x518F264D
	2.72728123808534006489e-01, // 0x3FD17460, 0xA91D4101
	2.30660745775561754067e-01, // 0x3FCD864A, 0x93C9DB65
	2.06975017800338417784e-01  // 0x3FCA7E28, 0x4A454EEF
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyvalL = evalpoly( L );


// MAIN //

/**
* Computes \\(\operatorname{log2}(ax)\\).
*
* @private
* @param {number} ax - absolute value of `x`
* @param {number} ahx - high word of `ax`
* @returns {NumberArray} tuple comprised of high and low parts
*
* @example
* var t = log2ax( 9.0, 1075970048 ); // => [ t1, t2 ]
* // returns [ 3.169923782348633, 0.0000012190936795504075 ]
*/
function log2ax( ax, ahx ) {
	var tmp;
	var ss;  // `hs + ls`
	var s2;  // `ss` squared
	var hs;
	var ls;
	var ht;
	var lt;
	var bp;  // `BP` constant
	var dp;  // `DP` constant
	var hp;
	var lp;
	var hz;
	var lz;
	var t1;
	var t2;
	var t;
	var r;
	var u;
	var v;
	var n;
	var j;
	var k;

	n = 0;

	// Check if `x` is subnormal...
	if ( ahx < HIGH_MIN_NORMAL_EXP ) {
		ax *= TWO53;
		n -= 53;
		ahx = getHighWord( ax );
	}
	// Extract the unbiased exponent of `x`:
	n += (ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS;

	// Isolate the significand bits of `x`:
	j = (ahx & HIGH_SIGNIFICAND_MASK);

	// Normalize `ahx` by setting the (biased) exponent to `1023`:
	ahx = (j | HIGH_BIASED_EXP_0);

	// Determine the interval of `|x|` by comparing significand bits...

	// |x| < sqrt(3/2)
	if ( j <= 0x3988E ) { // 0 00000000000 00111001100010001110
		k = 0;
	}
	// |x| < sqrt(3)
	else if ( j < 0xBB67A ) { // 0 00000000000 10111011011001111010
		k = 1;
	}
	// |x| >= sqrt(3)
	else {
		k = 0;
		n += 1;
		ahx -= HIGH_MIN_NORMAL_EXP;
	}
	// Load the normalized high word into `|x|`:
	ax = setHighWord( ax, ahx );

	// Compute `ss = hs + ls = (x-1)/(x+1)` or `(x-1.5)/(x+1.5)`:
	bp = BP[ k ]; // BP[0] = 1.0, BP[1] = 1.5
	u = ax - bp; // (x-1) || (x-1.5)
	v = 1.0 / (ax + bp); // 1/(x+1) || 1/(x+1.5)
	ss = u * v;
	hs = setLowWord( ss, 0 ); // set all low word (less significant significand) bits to 0s

	// Compute `ht = ax + bp` (via manipulation, i.e., bit flipping, of the high word):
	tmp = ((ahx>>1) | HIGH_BIASED_EXP_NEG_512) + HIGH_SIGNIFICAND_HALF;
	tmp += (k << 18); // `(k<<18)` can be considered the word equivalent of `1.0` or `1.5`
	ht = setHighWord( 0.0, tmp );
	lt = ax - (ht - bp);
	ls = v * ( ( u - (hs*ht) ) - ( hs*lt ) );

	// Compute `log(ax)`...

	s2 = ss * ss;
	r = s2 * s2 * polyvalL( s2 );
	r += ls * (hs + ss);
	s2 = hs * hs;
	ht = 3.0 + s2 + r;
	ht = setLowWord( ht, 0 );
	lt = r - ((ht-3.0) - s2);

	// u+v = ss*(1+...):
	u = hs * ht;
	v = ( ls*ht ) + ( lt*ss );

	// 2/(3LN2) * (ss+...):
	hp = u + v;
	hp = setLowWord( hp, 0 );
	lp = v - (hp - u);
	hz = CP_HI * hp; // CP_HI+CP_LO = 2/(3*LN2)
	lz = ( CP_LO*hp ) + ( lp*CP ) + DP_LO[ k ];

	// log2(ax) = (ss+...)*2/(3*LN2) = n + dp + hz + lz
	dp = DP_HI[ k ];
	t = n;
	t1 = ((hz+lz) + dp) + t; // log2(ax)
	t1 = setLowWord( t1, 0 );
	t2 = lz - (((t1-t) - dp) - hz);
	return [ t1, t2 ];
} // FUNCTION log2ax()


// EXPORTS //

module.exports = log2ax;

},{"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/base/utils/float64-get-high-word":153,"@stdlib/math/base/utils/float64-set-high-word":160,"@stdlib/math/base/utils/float64-set-low-word":162,"@stdlib/math/constants/float64-exponent-bias":174}],113:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );


// VARIABLES //

// 1/LN2
var INV_LN2 = 1.44269504088896338700e+00; // 0x3FF71547, 0x652B82FE

// High (24 bits): 1/LN2
var INV_LN2_HI = 1.44269502162933349609e+00; // 0x3FF71547, 0x60000000

// Low: 1/LN2
var INV_LN2_LO = 1.92596299112661746887e-08; // 0x3E54AE0B, 0xF85DDF44

// Polynomial coefficients for `x - x^2/2 + x^3/3 - x^4/4`...
var W = [
	0.5,
	-0.3333333333333333333333,
	0.25
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyvalW = evalpoly( W );


// MAIN //

/**
* Computes \\(\operatorname{log}(x)\\) assuming \\(|1-x|\\) is small and using the approximation \\(x - x^2/2 + x^3/3 - x^4/4\\).
*
* @private
* @param {number} ax - absolute value of `x`
* @returns {NumberArray} tuple comprised of high and low parts
*
* @example
* var t = logx( 9.0 ); // => [ t1, t2 ]
* // returns [ -1265.7236328125, -0.0008163940840404393 ]
*/
function logx( ax ) {
	var t2;
	var t1;
	var t;
	var w;
	var u;
	var v;

	t = ax - 1.0; // `t` has `20` trailing zeros
	w = t * t * polyvalW( t );
	u = INV_LN2_HI * t; // `INV_LN2_HI` has `21` significant bits
	v = ( t*INV_LN2_LO ) - ( w*INV_LN2 );
	t1 = u + v;
	t1 = setLowWord( t1, 0 );
	t2 = v - (t1 - u);
	return [ t1, t2 ];
} // end FUNCTION logx()


// EXPORTS //

module.exports = logx;

},{"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/base/utils/float64-set-low-word":162}],114:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var uint32ToInt32 = require( '@stdlib/math/base/utils/uint32-to-int32' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff;

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff;

// 0x41e00000 = 1105199104 => 0 10000011110 00000000000000000000 => biased exponent: 1054 = 31+1023 => 2^31
var HIGH_BIASED_EXP_31 = 0x41e00000;

// 0x43f00000 = 1139802112 => 0 10000111111 00000000000000000000 => biased exponent: 1087 = 64+1023 => 2^64
var HIGH_BIASED_EXP_64 = 0x43f00000;

// 0x40900000 = 1083179008 => 0 10000001001 00000000000000000000 => biased exponent: 1033 = 10+1023 => 2^10 = 1024
var HIGH_BIASED_EXP_10 = 0x40900000;

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000;

// 0x4090cc00 = 1083231232 => 0 10000001001 00001100110000000000
var HIGH_1075 = 0x4090cc00;

// 0xc090cc00 = 3230714880 => 1 10000001001 00001100110000000000
var HIGH_NEG_1075 = 0xc090cc00;

var HIGH_NUM_NONSIGN_BITS = 31;

var HUGE = 1.0e300;
var TINY = 1.0e-300;

// -(1024-log2(ovfl+.5ulp))
var OVT = 8.0085662595372944372e-17;


// MAIN //

/**
* Evaluates the exponential function.
*
* #### Method
*
* 1. Let \\(x = 2^n (1+f)\\).
*
* 2. Compute \\(\operatorname{log2}(x)\\) as
*
*   ``` tex
*   \operatorname{log2}(x) = w_1 + w_2
*   ```
*
*   where \\(w_1\\) has \\(53 - 24 = 29\\) bit trailing zeros.
*
* 3. Compute
*
*   ``` tex
*   y \cdot \operatorname{log2}(x) = n + y^\prime
*   ```
*
*   by simulating multi-precision arithmetic, where \\(|y^\prime| \leq 0.5\\).
*
* 4. Return
*
*   ``` tex
*   x^y = 2^n e^{y^\prime \cdot \mathrm{log2}}
*   ```
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* x^{\mathrm{NaN}} &= \mathrm{NaN} & \\
* (\mathrm{NaN})^y &= \mathrm{NaN} & \\
* 1^y &= 1 & \\
* x^0 &= 1 & \\
* x^1 &= x & \\
* (\pm 0)^\infty &= +0 & \\
* (\pm 0)^{-\infty} &= +\infty & \\
* (+0)^y &= +0 & \mathrm{if}\ y > 0 \\
* (+0)^y &= +\infty & \mathrm{if}\ y < 0 \\
* (-0)^y &= -\infty & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= +\infty & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= -0 & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y > 0 \\
* (-0)^y &= +0 & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y > 0 \\
* (-1)^{\pm\infty} &= \mathrm{NaN} & \\
* x^{\infty} &= +\infty & |x| > 1 \\
* x^{\infty} &= +0 & |x| < 1 \\
* x^{-\infty} &= +0 & |x| > 1 \\
* x^{-\infty} &= +\infty & |x| < 1 \\
* (-\infty)^y &= (-0)^y & \\
* \infty^y &= +0 & y < 0 \\
* \infty^y &= +\infty & y > 0 \\
* x^y &= \mathrm{NaN} & \mathrm{if}\ y\ \mathrm{is\ not\ a\ finite\ integer\ and}\ x < 0
* \end{align*}
* ```
*
*
* #### Notes
*
* - \\(\operatorname{pow}(x,y)\\) returns \\(x^y\\) nearly rounded. In particular, \\(\operatorname{pow}(<\mathrm{integer}>,<\mathrm{integer}>)\\) __always__ returns the correct integer, provided the value is representable.
* - The hexadecimal values shown in the source code are the intended values for used constants. Decimal values may be used, provided the compiler will accurately convert decimal to binary in order to produce the hexadecimal values.
*
*
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* @example
* var v = pow( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var v = pow( 100.0, 0.0 );
* // returns 1.0
*
* @example
* var v = pow( Math.PI, 5.0 );
* // returns ~306.0197
*
* @example
* var v = pow( Math.PI, -0.2 );
* // returns ~0.7954
*
* @example
* var v = pow( NaN, 3.0 );
* // returns NaN
*
* @example
* var v = pow( 5.0, NaN );
* // returns NaN
*
* @example
* var v = pow( NaN, NaN );
* // returns NaN
*/
function pow( x, y ) {
	var ahx; // absolute value high word `x`
	var ahy; // absolute value high word `y`
	var ax;  // absolute value `x`
	var hx;  // high word `x`
	var lx;  // low word `x`
	var hy;  // high word `y`
	var ly;  // low word `y`
	var sx;  // sign `x`
	var sy;  // sign `y`
	var y1;
	var hp;
	var lp;
	var w;
	var t;
	var z;   // y prime
	var j;
	var i;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	// Split `y` into high and low words:
	hy = getHighWord( y );
	ly = getLowWord( y );

	// Special cases `y`...
	if ( ly === 0 ) {
		if ( y === 0.0 ) {
			return 1.0;
		}
		if ( y === 1.0 ) {
			return x;
		}
		if ( y === -1.0 ) {
			return 1.0 / x;
		}
		if ( y === 0.5 ) {
			return sqrt( x );
		}
		if ( y === -0.5 ) {
			return 1.0 / sqrt( x );
		}
		if ( y === 2.0 ) {
			return x * x;
		}
		if ( y === 3.0 ) {
			return x * x * x;
		}
		if ( y === 4.0 ) {
			x *= x;
			return x * x;
		}
		if ( isInfinite( y ) ) {
			return yIsInfinite( x, y );
		}
	}
	// Split `x` into high and low words:
	hx = getHighWord( x );
	lx = getLowWord( x );

	// Special cases `x`...
	if ( lx === 0 ) {
		if ( hx === 0 ) {
			return xIsZero( x, y );
		}
		if ( x === 1.0 ) {
			return 1.0;
		}
		if (
			x === -1.0 &&
			isOdd( y )
		) {
			return -1.0;
		}
		if ( isInfinite( x ) ) {
			if ( x === NINF ) {
				// pow( 1/x, -y )
				return pow( -0.0, -y );
			}
			if ( y < 0.0 ) {
				return 0.0;
			}
			return PINF;
		}
	}
	if (
		x < 0.0 &&
		isInteger( y ) === false
	) {
		// signal NaN...
		return (x-x)/(x-x);
	}
	ax = abs( x );

	// Remove the sign bits (i.e., get absolute values):
	ahx = (hx & ABS_MASK);
	ahy = (hy & ABS_MASK);

	// Extract the sign bits:
	sx = (hx >>> HIGH_NUM_NONSIGN_BITS);
	sy = (hy >>> HIGH_NUM_NONSIGN_BITS);

	// Determine the sign of the result...
	if ( sx && isOdd( y ) ) {
		sx = -1.0;
	} else {
		sx = 1.0;
	}
	// Case 1: `|y|` is huge...

	// |y| > 2^31
	if ( ahy > HIGH_BIASED_EXP_31 ) {
		// `|y| > 2^64`, then must over- or underflow...
		if ( ahy > HIGH_BIASED_EXP_64 ) {
			return yIsHuge( x, y );
		}
		// Over- or underflow if `x` is not close to unity...

		if ( ahx < HIGH_MAX_NEAR_UNITY ) {
			// y < 0
			if ( sy === 1 ) {
				// signal overflow...
				return sx * HUGE * HUGE;
			}
			// signal underflow...
			return sx * TINY * TINY;
		}
		if ( ahx > HIGH_BIASED_EXP_0 ) {
			// y > 0
			if ( sy === 0 ) {
				// signal overflow...
				return sx * HUGE * HUGE;
			}
			// signal underflow...
			return sx * TINY * TINY;
		}
		// At this point, `|1-x|` is tiny (`<= 2^-20`). Suffice to compute `log(x)` by `x - x^2/2 + x^3/3 - x^4/4`.
		t = logx( ax );
	}
	// Case 2: `|y|` is not huge...
	else {
		t = log2ax( ax, ahx );
	}
	// Split `y` into `y1 + y2` and compute `(y1+y2) * (t1+t2)`...
	y1 = setLowWord( y, 0 );
	lp = ( (y-y1)*t[0] ) + ( y*t[1] );
	hp = y1 * t[0];
	z = lp + hp;

	// Note: *can* be more performant to use `getHighWord` and `getLowWord` directly, but using `toWords` looks cleaner.
	w = toWords( z );
	j = uint32ToInt32( w[0] );
	i = uint32ToInt32( w[1] );

	// z >= 1024
	if ( j >= HIGH_BIASED_EXP_10 ) {
		// z > 1024
		if ( ((j-HIGH_BIASED_EXP_10)|i) !== 0 ) {
			// signal overflow...
			return sx * HUGE * HUGE;
		}
		else if ( (lp+OVT) > (z-hp) ) {
			// signal overflow...
			return sx * HUGE * HUGE;
		}
	}
	// z <= -1075
	else if ( (j&ABS_MASK) >= HIGH_1075 ) {
		// z < -1075
		if ( ((j-HIGH_NEG_1075)|i) !== 0 ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
		else if ( lp <= (z-hp) ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":112,"./logx.js":113,"./pow2.js":115,"./x_is_zero.js":116,"./y_is_huge.js":117,"./y_is_infinite.js":118,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/sqrt":131,"@stdlib/math/base/utils/float64-get-high-word":153,"@stdlib/math/base/utils/float64-get-low-word":155,"@stdlib/math/base/utils/float64-set-low-word":162,"@stdlib/math/base/utils/float64-to-words":165,"@stdlib/math/base/utils/uint32-to-int32":168,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],115:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var uint32ToInt32 = require( '@stdlib/math/base/utils/uint32-to-int32' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var LN2 = require( '@stdlib/math/constants/float64-ln-two' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff;

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000;

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000;

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20;

// High: LN2
var LN2_HI = 6.93147182464599609375e-01; // 0x3FE62E43, 0x00000000

// Low: LN2
var LN2_LO = -1.90465429995776804525e-09; // 0xBE205C61, 0x0CA86C39

// Polynomial coefficients...
var P = [
	1.66666666666666019037e-01,  // 0x3FC55555, 0x5555553E
	-2.77777777770155933842e-03, // 0xBF66C16C, 0x16BEBD93
	6.61375632143793436117e-05,  // 0x3F11566A, 0xAF25DE2C
	-1.65339022054652515390e-06, // 0xBEBBBD41, 0xC5D26BF1
	4.13813679705723846039e-08   // 0x3E663769, 0x72BEA4D0
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyvalP = evalpoly( P );


// MAIN //

/**
* Computes \\(2^{\mathrm{hp} + \mathrm{lp}\\).
*
* @private
* @param {number} j - high word of `hp + lp`
* @param {number} hp - first power summand
* @param {number} lp - second power summand
* @returns {number} function value
*
* @example
* var z = pow2( 1065961648, -0.3398475646972656, -0.000002438187359100815 );
* // returns 0.012345679012345678
*/
function pow2( j, hp, lp ) {
	var tmp;
	var t1;
	var t;
	var r;
	var u;
	var v;
	var w;
	var z;
	var n;
	var i;
	var k;

	i = (j & ABS_MASK);
	k = (i>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS;
	n = 0;

	// `|z| > 0.5`, set `n = z+0.5`
	if ( i > HIGH_BIASED_EXP_NEG_1 ) {
		n = j + (HIGH_MIN_NORMAL_EXP>>(k+1));
		k = ((n & ABS_MASK)>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS; // new k for n
		tmp = ((n & ~(HIGH_SIGNIFICAND_MASK >> k)));
		t = setHighWord( 0.0, tmp );
		n = ((n & HIGH_SIGNIFICAND_MASK)|HIGH_MIN_NORMAL_EXP) >>
			(HIGH_NUM_SIGNIFICAND_BITS-k);
		if ( j < 0 ) {
			n = -n;
		}
		hp -= t;
	}
	t = lp + hp;
	t = setLowWord( t, 0 );
	u = t * LN2_HI;
	v = ( (lp - (t-hp))*LN2 ) + ( t*LN2_LO );
	z = u + v;
	w = v - (z - u);
	t = z * z;
	t1 = z - ( t*polyvalP( t ) );
	r = ( (z*t1) / (t1-2.0) ) - ( w + (z*w) );
	z = 1.0 - (r - z);
	j = getHighWord( z );
	j = uint32ToInt32( j );
	j += (n << HIGH_NUM_SIGNIFICAND_BITS);

	// Check for subnormal output...
	if ( (j>>HIGH_NUM_SIGNIFICAND_BITS) <= 0 ) {
		z = ldexp( z, n );
	} else {
		z = setHighWord( z, j );
	}
	return z;
} // end FUNCTION pow2()


// EXPORTS //

module.exports = pow2;

},{"@stdlib/math/base/special/ldexp":101,"@stdlib/math/base/tools/evalpoly":139,"@stdlib/math/base/utils/float64-get-high-word":153,"@stdlib/math/base/utils/float64-set-high-word":160,"@stdlib/math/base/utils/float64-set-low-word":162,"@stdlib/math/base/utils/uint32-to-int32":168,"@stdlib/math/constants/float64-exponent-bias":174,"@stdlib/math/constants/float64-ln-two":180}],116:[function(require,module,exports){
'use strict';

// MODULES //

var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when  \\(|x| = 0\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 0.0, 2 );
* // returns 0.0
*
* @example
* var v = pow( -0.0, -9 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = pow( 0.0, -9 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( -0.0, 9 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( 0.0, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( 0.0, Number.POSITIVE_INFINITY );
* // returns 0.0
*/
function pow( x, y ) {
	if ( y === NINF ) {
		return PINF;
	}
	if ( y === PINF ) {
		return 0.0;
	}
	if ( y > 0.0 ) {
		if ( isOdd( y ) ) {
			return x; // handles +-0
		}
		return 0.0;
	}
	// y < 0.0
	if ( isOdd( y ) ) {
		return copysign( PINF, x ); // handles +-0
	}
	return PINF;
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"@stdlib/math/base/assert/is-odd":14,"@stdlib/math/base/special/copysign":55,"@stdlib/math/constants/float64-ninf":187,"@stdlib/math/constants/float64-pinf":189}],117:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff;

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff;

var HUGE = 1.0e300;
var TINY = 1.0e-300;


// MAIN //

/**
* Evaluates the exponential function when \\(|y| > 2^64\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} overflow or underflow result
*
* @example
* var v = pow( 9.0, 3.6893488147419103e19 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( -3.14, -3.6893488147419103e19 );
* // returns 0.0
*/
function pow( x, y ) {
	var ahx;
	var hx;

	hx = getHighWord( x );
	ahx = (hx & ABS_MASK);

	if ( ahx <= HIGH_MAX_NEAR_UNITY ) {
		if ( y < 0 ) {
			// signal overflow...
			return HUGE * HUGE;
		}
		// signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// signal overflow...
		return HUGE * HUGE;
	}
	// signal underflow...
	return TINY * TINY;
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"@stdlib/math/base/utils/float64-get-high-word":153}],118:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\( y = \pm \infty\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( -1.0, Number.POSITIVE_INFINITY );
* // returns NaN
*
* @example
* var v = pow( -1.0, Number.NEGATIVE_INFINITY );
* // returns NaN
*
* @example
* var v = pow( 1.0, Number.POSITIVE_INFINITY );
* // returns 1.0
*
* @example
* var v = pow( 1.0, Number.NEGATIVE_INFINITY );
* // returns 1.0
*
* @example
* var v = pow( 0.5, Number.POSITIVE_INFINITY );
* // returns 0.0
*
* @example
* var v = pow( 0.5, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( 1.5, Number.NEGATIVE_INFINITY );
* // returns 0.0
*
* @example
* var v = pow( 1.5, Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*/
function pow( x, y ) {
	if ( x === -1.0 ) {
		// Julia (0.4.2) and Python (2.7.9) return `1.0` (WTF???). JavaScript (`Math.pow`), R, and libm return `NaN`. We choose `NaN`, as the value is indeterminate; i.e., we cannot determine whether `y` is odd, even, or somewhere in between.
		return (x-x)/(x-x); // signal NaN
	}
	if ( x === 1.0 ) {
		return 1.0;
	}
	// (|x| > 1 && y === NINF) || (|x| < 1 && y === PINF)
	if ( (abs(x) < 1.0) === (y === PINF) ) {
		return 0.0;
	}
	// (|x| > 1 && y === PINF) || (|x| < 1 && y === NINF)
	return PINF;
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-pinf":189}],119:[function(require,module,exports){
'use strict';

/**
* Evaluate `bˣ - 1`.
*
* @module @stdlib/math/base/special/powm1
*
* @example
* var powm1 = require( '@stdlib/math/base/special/powm1' );
*
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
*
* y = powm1( 4.0, 0.5 );
* // returns 1.0
*
* y = powm1( 0.0, 100.0 );
* // returns -1.0
*
* y = powm1( 100.0, 0.0 );
* // returns 0.0
*
* y = powm1( 0.0, 0.0 );
* // returns 0.0
*
* y = powm1( Math.PI, 5.0 );
* // returns ~305.0197
*
* y = powm1( NaN, 3.0 );
* // returns NaN
*
* y = powm1( 5.0, NaN );
* // returns NaN
*/

// MODULES //

var powm1 = require( './powm1.js' );


// EXPORTS //

module.exports = powm1;

},{"./powm1.js":120}],120:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/special_functions/powm1.hpp}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var ln = require( '@stdlib/math/base/special/ln' );
var pow = require( '@stdlib/math/base/special/pow' );
var trunc = require( '@stdlib/math/base/special/trunc' );


// MAIN //

/**
* Evaluates `bˣ - 1`.
*
* @param {number} b - base
* @param {number} x - exponent
* @returns {number} function value
*
* @example
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
*
* @example
* var y = powm1( 4.0, 0.5 );
* // returns 1.0
*
* @example
* var y = powm1( 0.0, 100.0 );
* // returns -1.0
*
* @example
* var y = powm1( 100.0, 0.0 );
* // returns 0.0
*
* @example
* var y = powm1( 0.0, 0.0 );
* // returns 0.0
*
* @example
* var y = powm1( Math.PI, 5.0 );
* // returns ~305.0197
*
* @example
* var y = powm1( NaN, 3.0 );
* // returns NaN
*
* @example
* var y = powm1( 5.0, NaN );
* // returns NaN
*/
function powm1( b, x ) {
	var y;
	if (
		isnan( b ) ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		// Any number raised to zero (including 0) is always 1 => b^0 - 1 = 0
		return 0.0;
	}
	if ( b === 0.0 ) {
		// Zero raised to any number (except 0) is always zero => 0^x - 1 = -1
		return -1.0;
	}
	if ( b < 0.0 && x%2.0 === 0 ) {
		// If `x` is even, recognize that `(-b)**x == (b)**x`...
		b = -b;
	}
	if ( b > 0.0 ) {
		if (
			abs( x*(b-1.0) ) < 0.5 ||
			abs( x ) < 0.2
		) {
			// No good/quick approximation for ln(b)*x, so we have to evaluate...
			y = ln( b ) * x;
			if ( y < 0.5 ) {
				return expm1( y );
			}
		}
	} else if ( trunc( x ) !== x ) {
		// Exponentiation would yield a complex result...
		return NaN;
	}
	return pow( b, x ) - 1.0;
} // end FUNCTION powm1()


// EXPORTS //

module.exports = powm1;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/expm1":64,"@stdlib/math/base/special/ln":103,"@stdlib/math/base/special/pow":111,"@stdlib/math/base/special/trunc":132}],121:[function(require,module,exports){
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

},{"./rempio2.js":123}],122:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":69,"@stdlib/math/base/special/ldexp":101}],123:[function(require,module,exports){
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

},{"./kernel_rempio2.js":122,"./rempio2_medium.js":124,"@stdlib/math/base/utils/float64-from-words":149,"@stdlib/math/base/utils/float64-get-high-word":153,"@stdlib/math/base/utils/float64-get-low-word":155}],124:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":125,"@stdlib/math/base/utils/float64-get-high-word":153}],125:[function(require,module,exports){
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

},{"./round.js":126}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{"./sin.js":128}],128:[function(require,module,exports){
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
* @param {number} x - input value (in radians)
* @returns {number} sine
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

},{"@stdlib/math/base/special/kernel-cos":97,"@stdlib/math/base/special/kernel-sin":99,"@stdlib/math/base/special/rempio2":121,"@stdlib/math/base/utils/float64-get-high-word":153}],129:[function(require,module,exports){
'use strict';

/**
* Compute the value of `sin(πx)`.
*
* @module @stdlib/math/base/special/sinpi
*
* @example
* var sinpi = require( '@stdlib/math/base/special/sinpi' );
*
* var y = sinpi( 0.0 );
* // returns 0.0
*
* y = sinpi( 0.5 );
* // returns 1.0
*
* y = sinpi( 0.9 );
* // returns ~0.309
*
* y = sinpi( NaN );
* // returns NaN
*/

// MODULES //

var sinpi = require( './sinpi.js' );


// EXPORTS //

module.exports = sinpi;

},{"./sinpi.js":130}],130:[function(require,module,exports){
'use strict';

/*
* Notes:
*	=> sin(-x) = -sin(x)
*	=> sin(+n) = +0, where `n` is a positive integer
*	=> sin(-n) = -sin(+n) = -0, where `n` is a positive integer
*	=> cos(-x) = cos(x)
*/


// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var abs = require( '@stdlib/math/base/special/abs' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var PI = require( '@stdlib/math/constants/float64-pi' );


// MAIN //

/**
* Computes the value of `sin(πx)`.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = sinpi( 0.0 );
* // returns 0.0
*
* @example
* var y = sinpi( 0.5 );
* // returns 1.0
*
* @example
* var y = sinpi( 0.9 );
* // returns ~0.309
*
* @example
* var y = sinpi( NaN );
* // returns NaN
*/
function sinpi( x ) {
	var ar;
	var r;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return NaN;
	}
	// Argument reduction (reduce to [0,2))...
	r = x % 2.0; // sign preserving
	ar = abs( r );

	// If `x` is an integer, the mod is an integer...
	if ( ar === 0.0 || ar === 1.0 ) {
		return copysign( 0.0, r );
	}
	if ( ar < 0.25 ) {
		return sin( PI*r );
	}
	// In each of the following, we further reduce to [-π/4,π/4)...
	if ( ar < 0.75 ) {
		ar = 0.5 - ar;
		return copysign( cos( PI*ar ), r );
	}
	if ( ar < 1.25 ) {
		r = copysign( 1.0, r ) - r;
		return sin( PI*r );
	}
	if ( ar < 1.75 ) {
		ar = ar - 1.5;
		return -copysign( cos( PI*ar ), r );
	}
	r = r - copysign( 2.0, r );
	return sin( PI*r );
} // end FUNCTION sinpi()


// EXPORTS //

module.exports = sinpi;

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/base/special/copysign":55,"@stdlib/math/base/special/cos":57,"@stdlib/math/base/special/sin":127,"@stdlib/math/constants/float64-pi":188}],131:[function(require,module,exports){
'use strict';

/**
* Compute the principal square root.
*
* @module @stdlib/math/base/special/sqrt
*
* @example
* var sqrt = require( '@stdlib/math/base/special/sqrt' );
*
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/

// MODULES //

var sqrt = Math.sqrt;


// EXPORTS //

module.exports = sqrt;

},{}],132:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward zero.
*
* @module @stdlib/math/base/special/trunc
*
* @example
* var trunc = require( '@stdlib/math/base/special/trunc' );
*
* var v = trunc( -4.2 );
* // returns -4.0
*
* v = trunc( 9.99999 );
* // returns 9.0
*
* v = trunc( 0.0 );
* // returns 0.0
*
* v = trunc( -0.0 );
* // returns -0.0
*
* v = trunc( NaN );
* // returns NaN
*
* v = trunc( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* v = trunc( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var trunc = require( './trunc.js' );


// EXPORTS //

module.exports = trunc;

},{"./trunc.js":133}],133:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ceil = require( '@stdlib/math/base/special/ceil' );


// MAIN //

/**
* Rounds a numeric value toward zero.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = trunc( -4.2 );
* // returns -4.0
*
* @example
* var v = trunc( 9.99999 );
* // returns 9.0
*
* @example
* var v = trunc( 0.0 );
* // returns 0.0
*
* @example
* var v = trunc( -0.0 );
* // returns -0.0
*
* @example
* var v = trunc( NaN );
* // returns NaN
*
* @example
* var v = trunc( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = trunc( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
} // end FUNCTION trunc()


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":53,"@stdlib/math/base/special/floor":69}],134:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );
var TINY = require( '@stdlib/math/constants/float32-smallest-normal' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var delta;
	var a0;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;

	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = TINY;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = TINY;
			}
			D = 1.0 / D;
			delta = C * D;
			f = f * delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus

	return a0 / f;
} // end FUNCTION continuedFractionA()

/**
* Evaluates
*      b0 +   a1
*      ---------------
*      b1 +   a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var delta;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;
	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = TINY;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = TINY;
			}
			D = 1.0 / D;
			delta = C * D;
			f = f * delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	return f;
} // end FUNCTION continuedFractionB()


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* #### References
* * Lentz, W.J. 1976, Applied Optics, vol. 15, pp. 668-671.
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator()
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	eps = opts.tolerance || TOLERANCE;
	maxIter = opts.maxIter || MAX_ITER;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
} // end FUNCTION continuedFraction()


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float32-smallest-normal":170,"@stdlib/math/constants/float64-eps":172}],135:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );
var TINY = require( '@stdlib/math/constants/float32-smallest-normal' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var isgenerator = typeof gen.next === 'function';
	var f;
	var C;
	var D;
	var delta;
	var a0;
	var v = isgenerator ? gen.next().value : gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return a0 / f;
} // end FUNCTION continuedFractionA()

/**
* Evaluates
*      b0 +    a1
*      ---------------
*      b1 +     a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var isgenerator = typeof gen.next === 'function';
	var f;
	var C;
	var D;
	var delta;
	var v = isgenerator ? gen.next().value : gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return f;
} // end FUNCTION continuedFractionB()


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* #### References
* * Lentz, W.J. 1976, Applied Optics, vol. 15, pp. 668-671.
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator();
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function* generator() {
*    var i = 0;
*    while ( true ) {
*        i++;
*        yield [ i, i ];
*    }
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	eps = opts.tolerance || TOLERANCE;
	maxIter = opts.maxIter || MAX_ITER;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
} // end FUNCTION continuedFraction()


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float32-smallest-normal":170,"@stdlib/math/constants/float64-eps":172}],136:[function(require,module,exports){
'use strict';

/**
* Calculates a continued fraction approximation.
*
* @module @stdlib/math/base/tools/continued-fraction
*
* @example
* var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
*
* // Continued fraction for (e-1)^(-1):
* var gen = generator()
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/

// MODULES //

var hasGeneratorsSupport = require( '@stdlib/utils/detect-generator-support' )();


// EXPORTS //

module.exports = hasGeneratorsSupport ? require( './generators.js' ) : require( './basic.js' );

},{"./basic.js":134,"./generators.js":135,"@stdlib/utils/detect-generator-support":197}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{"./evalpoly.js":137}],139:[function(require,module,exports){
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

},{"./evalpoly.js":137,"./factory.js":138,"@stdlib/utils/define-read-only-property":195}],140:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/tools/rational.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );


// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\). Coefficients should be sorted in ascending degree.
*
* #### Notes
*
* * The implementation uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} P - numerator polynomial coefficients sorted in ascending degree
* @param {NumericAray} Q - denominator polynomial coefficients sorted in ascending degree
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*
* @example
* var P = [ -6.0, -5.0 ];
* var Q = [ 3.0, 0.5 ];
*
* var v = evalrational( P, Q, 6.0 ); //  => ( -6*6^0 - 5*6^1 ) / ( 3*6^0 + 0.5*6^1 ) = (-6-30)/(3+3)
* // returns -6.0
*
* @example
* // 2x^3 + 4x^2 - 5x^1 - 6x^0 => degree 4
* var P = [ -6.0, -5.0, 4.0, 2.0 ];
*
* // 0.5x^1 + 3x^0 => degree 2
* var Q = [ 3.0, 0.5, 0.0, 0.0 ]; // zero-padded
*
* var v = evalrational( P, Q, 6.0 ); // => ( -6*6^0 - 5*6^1 + 4*6^2 + 2*6^3 ) / ( 3*6^0 + 0.5*6^1 + 0*6^2 + 0*6^3 ) = (-6-30+144+432)/(3+3)
* // returns 90.0
*/
function evalrational( P, Q, x ) {
	var len;
	var s1;
	var s2;
	var i;

	len = P.length;
	if ( len === 0 ) {
		return NaN;
	}
	if ( len !== Q.length ) {
		return NaN;
	}
	if ( x === 0.0 || len === 1 ) {
		return P[ 0 ] / Q[ 0 ];
	}
	// Use Horner's method...
	if ( abs( x ) <= 1.0 ) {
		s1 = P[ len-1 ];
		s2 = Q[ len-1 ];
		for ( i = len-2; i >= 0; --i ) {
			s1 *= x;
			s2 *= x;
			s1 += P[ i ];
			s2 += Q[ i ];
		}
	} else {
		x = 1.0 / x; // use inverse to avoid overflow
		s1 = P[ 0 ];
		s2 = Q[ 0 ];
		for( i = 1; i < len; ++i ) {
			s1 *= x;
			s2 *= x;
			s1 += P[ i ];
			s2 += Q[ i ];
		}
	}
	return s1 / s2;
} // end FUNCTION evalrational()


// EXPORTS //

module.exports = evalrational;

},{"@stdlib/math/base/special/abs":33}],141:[function(require,module,exports){
'use strict';

// MODULES //

var evalrational = require( './evalrational.js' );


// MAIN //

/**
* Generates a function for evaluating a rational function.
*
* #### Notes
*
* * The compiled function uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} P - numerator polynomial coefficients sorted in ascending degree
* @param {NumericArray} Q - denominator polynomial coefficients sorted in ascending degree
* @returns {Function} function for evaluating a rational function
*
* @example
* var P = [ 20.0, 8.0, 3.0 ];
* var Q = [ 10.0, 9.0, 1.0 ];
*
* var rational = evalrational.factory( P, Q );
*
* var v = rational( 10.0 ); // => (20*10^0 + 8*10^1 + 3*10^2) / (10*10^0 + 9*10^1 + 1*10^2) = (20+80+300)/(10+90+100)
* // returns 2.0
*
* v = rational( 2.0 ); // => (20*2^0 + 8*2^1 + 3*2^2) / (10*2^0 + 9*2^1 + 1*2^2) = (20+16+12)/(10+18+4)
* // returns 1.5
*/
function factory( P, Q ) {
	var f;
	var r;
	var n;
	var m;
	var i;

	// Avoid exceeding maximum stack size on V8 :(. Note that the value of `500` was empirically determined...
	if ( P.length > 500 ) {
		return rational;
	}
	// Code generation. Start with the function definition...
	f = 'return function evalrational(x){';

	// Create the function body...
	n = P.length;

	// Declare variables...
	f += 'var ax,s1,s2;';

	// If no coefficients, the function always returns NaN...
	if ( n === 0 ) {
		f += 'return NaN;';
	}
	// If P and Q have different lengths, the function always returns NaN...
	else if ( n !== Q.length ) {
		f += 'return NaN;';
	}
	// If P and Q have only one coefficient, the function always returns the ratio of the first coefficients...
	else if ( n === 1 ) {
		r = P[ 0 ] / Q[ 0 ];
		f += 'return ' + r + ';';
	}
	// If more than one coefficient, apply Horner's method to both the numerator and denominator...
	else {
		// If `x == 0`, return the ratio of the first coefficients...
		r = P[ 0 ] / Q[ 0 ];
		f += 'if(x===0.0){return ' + r + ';}';

		// Compute the absolute value of `x`...
		f += 'if(x<0.0){ax=-x;}else{ax=x;}';

		// If `abs(x) <= 1`, evaluate the numerator and denominator of the rational function using Horner's method...
		f += 'if(ax<=1.0){';
		f += 's1 = ' + P[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += P[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';
		f += 's2 = ' + Q[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += Q[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		// Close the if statement...
		f += '}else{';

		// If `abs(x) > 1`, evaluate the numerator and denominator via the inverse to avoid overflow...
		f += 'x = 1.0/x;';
		m = n - 1;
		f += 's1 = ' + P[ m ];
		for ( i = m - 1; i >= 0; i-- ) {
			f += '+x*';
			if ( i > 0 ) {
				f += '(';
			}
			f += P[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		m = n - 1;
		f += 's2 = ' + Q[ m ];
		for ( i = m - 1; i >= 0; i-- ) {
			f += '+x*';
			if ( i > 0 ) {
				f += '(';
			}
			f += Q[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		// Close the else statement...
		f += '}';

		// Return the ratio of the two sums...
		f += 'return s1/s2;';
	}
	// Close the function:
	f += '}';

	// Add a source directive for debugging:
	f += '//# sourceURL=evalrational.factory.js';

	// Create the function in the global scope:
	return ( new Function( f ) )(); // eslint-disable-line no-new-func

	/*
	* returns
	*	function evalrational( x ) {
	*		var ax, s1, s2;
	*		if ( x === 0.0 ) {
	*			return P[0] / Q[0];
	*		}
	*		if ( x < 0.0 ) {
	*			ax = -x;
	*		} else {
	*			ax = x;
	*		}
	*		if ( ax <= 1.0 ) {
	*			s1 = P[0]+x*(P[1]+x*(P[2]+x*(P[3]+...+x*(P[n-2]+x*P[n-1]))));
	*			s2 = Q[0]+x*(Q[1]+x*(Q[2]+x*(Q[3]+...+x*(Q[n-2]+x*Q[n-1]))));
	*		} else {
	*			x = 1.0/x;
	*			s1 = P[n-1]+x*(P[n-2]+x*(P[n-3]+x*(P[n-4]+...+x*(P[1]+x*P[0]))));
	*			s2 = Q[n-1]+x*(Q[n-2]+x*(Q[n-3]+x*(Q[n-4]+...+x*(Q[1]+x*Q[0]))));
	*		}
	*		return s1 / s2;
	*	}
	*/

	/**
	* Evaluates a rational function.
	*
	* @private
	* @param {number} x - value at which to evaluate a rational function
	* @returns {number} evaluated rational function
	*/
	function rational( x ) {
		return evalrational( P, Q, x );
	} // end FUNCTION rational()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./evalrational.js":140}],142:[function(require,module,exports){
'use strict';

/**
* Evaluate a rational function.
*
* @module @stdlib/math/base/tools/evalrational
*
* @example
* var evalrational = require( '@stdlib/math/base/tools/evalrational' );
*
* // 2x^3 + 4x^2 - 5x^1 - 6x^0 => degree 4
* var P = [ -6.0, -5.0, 4.0, 2.0 ];
*
* // 0.5x^1 + 3x^0 => degree 2
* var Q = [ 3.0, 0.5, 0.0, 0.0 ]; // zero-padded
*
* var v = evalrational( P, Q, 6.0 ); // => ( -6*6^0 - 5*6^1 + 4*6^2 + 2*6^3 ) / ( 3*6^0 + 0.5*6^1 + 0*6^2 + 0*6^3 ) = (-6-30+144+432)/(3+3)
* // returns 90.0
*
* @example
* var evalrational = require( '@stdlib/math/base/tools/evalrational' );
*
* var P = [ 20.0, 8.0, 3.0 ];
* var Q = [ 10.0, 9.0, 1.0 ];
*
* var rational = evalrational.factory( P, Q );
*
* var v = rational( 10.0 ); // => (20*10^0 + 8*10^1 + 3*10^2) / (10*10^0 + 9*10^1 + 1*10^2) = (20+80+300)/(10+90+100)
* // returns 2.0
*
* v = rational( 2.0 ); // => (20*2^0 + 8*2^1 + 3*2^2) / (10*2^0 + 9*2^1 + 1*2^2) = (20+16+12)/(10+18+4)
* // returns 1.5
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var evalrational = require( './evalrational.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( evalrational, 'factory', factory );


// EXPORTS //

module.exports = evalrational;

},{"./evalrational.js":140,"./factory.js":141,"@stdlib/utils/define-read-only-property":195}],143:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/
function sumSeries( generator, options ) {
	var nextTerm;
	var tolerance;
	var counter;
	var result;
	var opts;

	opts = {};

	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || TOLERANCE;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	// Repeatedly call function...
	do {
		nextTerm = generator();
		result += nextTerm;
	}
	while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus

	return result;
} // end FUNCTION sum_series()


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":172}],144:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesGenerator( 0.9 );
* var out = sumSeries( gen );
* // returns 10
*
* function* geometricSeriesGenerator( x ) {
*     var exponent = 0;
*     while ( true ) {
*         yield Math.pow( x, exponent );
*         exponent += 1;
*     }
* }
*/
function sumSeries( generator, options ) {
	var isgenerator;
	var tolerance;
	var nextTerm;
	var counter;
	var result;
	var opts;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || TOLERANCE;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	isgenerator = typeof generator.next === 'function';
	if ( isgenerator === true ) {
		// Case A: Iterate over generator object created by a generator function...
		for ( nextTerm of generator ) {
			result += nextTerm;
			if (
				abs(tolerance * result) >= abs(nextTerm) ||
				--counter === 0 // eslint-disable-line no-plusplus
			) {
				break;
			}
		}
	} else {
		// Case B: Repeatedly call function...
		do {
			nextTerm = generator();
			result += nextTerm;
		}
		while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus
	}
	return result;
} // end FUNCTION sumSeries()


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-eps":172}],145:[function(require,module,exports){
'use strict';

/**
* Sum the elements of the series given by the supplied function.
*
* @module @stdlib/math/base/tools/sum-series
*
* @example
* var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
*
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/

// MODULES //

var hasGeneratorsSupport = require( '@stdlib/utils/detect-generator-support' )();


// EXPORTS //

module.exports = hasGeneratorsSupport ? require( './generators.js' ) : require( './basic.js' );

},{"./basic.js":143,"./generators.js":144,"@stdlib/utils/detect-generator-support":197}],146:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":153,"@stdlib/math/constants/float64-exponent-bias":174,"@stdlib/math/constants/float64-high-word-exponent-mask":179}],147:[function(require,module,exports){
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

},{"./exponent.js":146}],148:[function(require,module,exports){
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

},{"./indices.js":150}],149:[function(require,module,exports){
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

},{"./from_words.js":148}],150:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],151:[function(require,module,exports){
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

},{"./high.js":152}],152:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],153:[function(require,module,exports){
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

},{"./get_high_word.js":151}],154:[function(require,module,exports){
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

},{"./low.js":156}],155:[function(require,module,exports){
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

},{"./get_low_word.js":154}],156:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],157:[function(require,module,exports){
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

},{"./normalize.js":158}],158:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":33,"@stdlib/math/constants/float64-smallest-normal":190}],159:[function(require,module,exports){
arguments[4][152][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":152}],160:[function(require,module,exports){
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

},{"./set_high_word.js":161}],161:[function(require,module,exports){
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

},{"./high.js":159}],162:[function(require,module,exports){
'use strict';

/**
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-set-low-word
*
* @example
* var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
* var PINF = require( '@stdlib/math/constants/float64-pinf' );
* var NINF = require( '@stdlib/math/constants/float64-ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/

// MODULES //

var setLowWord = require( './set_low_word.js' );


// EXPORTS //

module.exports = setLowWord;

},{"./set_low_word.js":164}],163:[function(require,module,exports){
arguments[4][156][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":156}],164:[function(require,module,exports){
'use strict';

// MODULES //

var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
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
* @param {number} x - double
* @param {uinteger32} low - unsigned 32-bit integer to replace the lower order word of `x`
* @returns {number} double having the same higher order word as `x`
*
* @example
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var PINF = require( '@stdlib/math/constants/float64-pinf' );
* var NINF = require( '@stdlib/math/constants/float64-ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/
function setLowWord( x, low ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ LOW ] = ( low >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
} // end FUNCTION setLowWord()


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":163}],165:[function(require,module,exports){
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

},{"./to_words.js":167}],166:[function(require,module,exports){
arguments[4][150][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":150}],167:[function(require,module,exports){
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

},{"./indices.js":166}],168:[function(require,module,exports){
'use strict';

/**
* Convert an unsigned 32-bit integer to a signed 32-bit integer.
*
* @module @stdlib/math/base/utils/uint32-to-int32
*
* @example
* var float64ToUint32 = require( '@stdlib/math/base/utils/float64-to-uint32' );
* var uint32ToInt32 = require( '@stdlib/math/base/utils/uint32-to-int32' );
*
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/

// MODULES //

var uint32ToInt32 = require( './uint32_to_int32.js' );


// EXPORTS //

module.exports = uint32ToInt32;

},{"./uint32_to_int32.js":169}],169:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Converts an unsigned 32-bit integer to a signed 32-bit integer.
*
* @param {uinteger32} x - unsigned 32-bit integer
* @returns {integer32} signed 32-bit integer
*
* @example
* var float64ToUint32 = require( '@stdlib/math/base/utils/float64-to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* @example
* var float64ToUint32 = require( '@stdlib/math/base/utils/float64-to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/
function uint32ToInt32( x ) {
	// NOTE: we could also use typed-arrays to achieve the same end.
	return x|0; // asm type annotation
} // end FUNCTION uint32ToInt32()


// EXPORTS //

module.exports = uint32ToInt32;

},{}],170:[function(require,module,exports){
'use strict';

/**
* Smallest positive single-precision floating-point normal number.
*
* @module @stdlib/math/constants/float32-smallest-normal
* @type {number}
*
* @example
* var FLOAT32_SMALLEST_NORMAL = require( '@stdlib/math/constants/float32-smallest-normal' );
* // returns 1.1754943508222875e-38
*/


// MAIN //

/**
* The smallest positive single-precision floating-point normal number has the value
*
* ``` tex
* \frac{1}{2^{127-1}}
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 0 00000001 00000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 1.1754943508222875e-38
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_SMALLEST_NORMAL = 1.1754943508222875e-38;


// EXPORTS //

module.exports = FLOAT32_SMALLEST_NORMAL;


},{}],171:[function(require,module,exports){
'use strict';

/**
* Euler's number.
*
* @module @stdlib/math/constants/float64-e
* @type {number}
*
* @example
* var E = require( '@stdlib/math/constants/float64-e' );
* // returns 2.718281828459045
*/


// MAIN //

/**
* Euler's number.
*
* @constant
* @type {number}
* @default 2.718281828459045
* @see [OEIS]{@link https://oeis.org/A001113}
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/E_(mathematical_constant)}
*/

var E = 2.718281828459045235360287471352662497757247093699959574966;


// EXPORTS //

module.exports = E;

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
'use strict';

/**
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/math/constants/float64-fourth-pi
* @type {number}
*
* @example
* var FOURTH_PI = require( '@stdlib/math/constants/float64-fourth-pi' );
* // returns 7.85398163397448309616e-1
*/


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.85398163397448309616e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FOURTH_PI = 7.85398163397448309616e-1;


// EXPORTS //

module.exports = FOURTH_PI;

},{}],176:[function(require,module,exports){
'use strict';

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @module @stdlib/math/constants/float64-gamma-lanczos-g
* @type {number}
*
* @example
* var FLOAT64_GAMMA_LANCZOS_G = require( '@stdlib/math/constants/float64-gamma-lanczos-g' );
* // returns 10.900511
*/


// MAIN //

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @constant
* @type {number}
* @default 10.900511
* @see [Lanczos Approximation]{@link https://en.wikipedia.org/wiki/Lanczos_approximation}
*/
var FLOAT64_GAMMA_LANCZOS_G = 10.90051099999999983936049829935654997826;


// EXPORTS //

module.exports = FLOAT64_GAMMA_LANCZOS_G;

},{}],177:[function(require,module,exports){
'use strict';

/**
* One half times the natural logarithm of 2.
*
* @module @stdlib/math/constants/float64-half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/math/constants/float64-half_ln2' );
* // returns 3.46573590279972654709e-01
*/


// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ``` tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of `2`.
*
* @module @stdlib/math/constants/float64-ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/math/constants/float64-ln-two' );
* // returns 0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `2`.
*
* ``` tex
* \ln 2
* ```
*
* @constant
* @type {number}
* @default 0.6931471805599453
*/
var LN2 = 6.93147180559945309417232121458176568075500134360255254120680009493393621969694715605863326996418687542001481021e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN2;

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-ln
* @type {number}
*
* @example
* var FLOAT64_MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
* // returns 709.782712893384
*/


// MAIN //

/**
* The natural logarithm of the maximum double-precision floating-point number is given by
*
* ``` tex
* \ln \left( 2^{1023} (2 - 2^{-52}) \right)
* ```
*
* @constant
* @type {number}
* @default 709.782712893384
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_LN = 709.782712893384;


// EXPORTS //

module.exports = FLOAT64_MAX_LN;

},{}],184:[function(require,module,exports){
'use strict';

/**
* Maximum double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max
* @type {number}
*
* @example
* var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
* // returns 1.7976931348623157e+308
*/


// MAIN //

/**
* The maximum double-precision floating-point number is given by
*
* ``` tex
* 2^{1023} (2 - 2^{-52})
* ```
*
* @constant
* @type {number}
* @default 1.7976931348623157e+308
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX = 1.7976931348623157e+308;


// EXPORTS //

module.exports = FLOAT64_MAX;

},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-min-ln
* @type {number}
*
* @example
* var FLOAT64_MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
* // returns -708.3964185322641
*/


// MAIN //

/**
* The natural logarithm of the smallest normalized double-precision floating-point number is given by
*
* ``` tex
* -\ln \left( 2^{1023-1} \right)
* ```
*
* @constant
* @type {number}
* @default -708.3964185322641
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_LN = -708.3964185322641;


// EXPORTS //

module.exports = FLOAT64_MIN_LN;

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
'use strict';

/**
* The mathematical constant `π`.
*
* @module @stdlib/math/constants/float64-pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/math/constants/float64-pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

},{}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
'use strict';

/**
* Square root of double-precision floating-point epsilon.
*
* @module @stdlib/math/constants/float64-sqrt-eps
* @type {number}
*
* @example
* var FLOAT64_SQRT_EPSILON = require( '@stdlib/math/constants/float64-sqrt-eps' );
* // returns 0.14901161193847656e-7
*/


// MAIN //

/**
* Square root of double-precision floating-point epsilon.
*
* ``` tex
* \sqrt{\frac{1}{2^{52}}}
* ```
*
* @constant
* @type {number}
* @default 0.14901161193847656e-7
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_SQRT_EPSILON = 0.1490116119384765625e-7;


// EXPORTS //

module.exports = FLOAT64_SQRT_EPSILON;

},{}],192:[function(require,module,exports){
'use strict';

/**
* Square root of the mathematical constant `π` times `2`.
*
* @module @stdlib/math/constants/float64-sqrt-two-pi
* @type {number}
*
* @example
* var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
* // returns 2.5066282746310007
*/


// MAIN //

/**
* Square root of the mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 2.5066282746310007
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var SQRT_TWO_PI = 2.506628274631000502415765284811045253e+00;


// EXPORTS //

module.exports = SQRT_TWO_PI;

},{}],193:[function(require,module,exports){
'use strict';

/**
* Maximum signed 32-bit integer.
*
* @module @stdlib/math/constants/int32-max
* @type {integer32}
*
* @example
* var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
* // returns 2147483647
*/


// MAIN //

/**
* The maximum signed 32-bit integer is given by
*
* ``` tex
* 2^{31} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 01111111111111111111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 2147483647
*/
var INT32_MAX = 2147483647|0; // asm type annotation


// EXPORTS //

module.exports = INT32_MAX;

},{}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
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

},{"./define_read_only_property.js":194}],196:[function(require,module,exports){
'use strict';

// MODULES //

var evil = require( '@stdlib/utils/eval' );


// MAIN //

/**
* Tests for native `function*()` support.
*
* @returns {boolean} boolean indicating if an environment has native `function*()` support
*
* @example
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/
function hasGeneratorSupport() {
	var bool;
	try {
		evil( '"use strict"; (function* () {})' );
		bool = true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
} // end FUNCTION hasGeneratorSupport()


// EXPORTS //

module.exports = hasGeneratorSupport;

},{"@stdlib/utils/eval":198}],197:[function(require,module,exports){
'use strict';

/**
* Tests for native `function*()` support.
*
* @module @stdlib/utils/detect-generator-support
*
* @example
* var hasGeneratorSupport = require( '@stdlib/utils/detect-generator-support' );
*
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/

// MODULES //

var hasGeneratorSupport = require( './detect_generator_support.js' );


// EXPORTS //

module.exports = hasGeneratorSupport;

},{"./detect_generator_support.js":196}],198:[function(require,module,exports){
/* eslint-disable no-eval */
'use strict';

/**
* Alias for `eval` global.
*
* @module @stdlib/utils/eval
*
* @example
* var evil = require( '@stdlib/utils/@stdlib/utils/eval' );
*
* var v = evil( '5*4*3*2*1' );
* // returns 120
*/

// MODULES //

var evil = eval;


// EXPORTS //

module.exports = evil;

},{}],199:[function(require,module,exports){
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

},{}],200:[function(require,module,exports){

},{}],201:[function(require,module,exports){
arguments[4][200][0].apply(exports,arguments)
},{"dup":200}],202:[function(require,module,exports){
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

},{}],203:[function(require,module,exports){
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

},{"base64-js":199,"ieee754":222}],204:[function(require,module,exports){
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
},{"../../is-buffer/index.js":224}],205:[function(require,module,exports){
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

},{"./lib/is_arguments.js":206,"./lib/keys.js":207}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],208:[function(require,module,exports){
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

},{"foreach":218,"object-keys":227}],209:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],210:[function(require,module,exports){
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

},{"./helpers/isFinite":211,"./helpers/isNaN":212,"./helpers/mod":213,"./helpers/sign":214,"es-to-primitive/es5":215,"has":221,"is-callable":225}],211:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],212:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],213:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],214:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],215:[function(require,module,exports){
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

},{"./helpers/isPrimitive":216,"is-callable":225}],216:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],217:[function(require,module,exports){
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

},{}],218:[function(require,module,exports){

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


},{}],219:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

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

},{}],220:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":219}],221:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":220}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
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

},{}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){
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

},{"./isArguments":228}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
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
},{"_process":202}],230:[function(require,module,exports){
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
},{"_process":202}],231:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":232}],232:[function(require,module,exports){
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
},{"./_stream_readable":234,"./_stream_writable":236,"core-util-is":204,"inherits":223,"process-nextick-args":230}],233:[function(require,module,exports){
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
},{"./_stream_transform":235,"core-util-is":204,"inherits":223}],234:[function(require,module,exports){
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
},{"./_stream_duplex":232,"./internal/streams/BufferList":237,"./internal/streams/destroy":238,"./internal/streams/stream":239,"_process":202,"core-util-is":204,"events":217,"inherits":223,"isarray":240,"process-nextick-args":230,"safe-buffer":247,"string_decoder/":241,"util":200}],235:[function(require,module,exports){
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
},{"./_stream_duplex":232,"core-util-is":204,"inherits":223}],236:[function(require,module,exports){
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
},{"./_stream_duplex":232,"./internal/streams/destroy":238,"./internal/streams/stream":239,"_process":202,"core-util-is":204,"inherits":223,"process-nextick-args":230,"safe-buffer":247,"util-deprecate":259}],237:[function(require,module,exports){
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
},{"safe-buffer":247}],238:[function(require,module,exports){
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
},{"process-nextick-args":230}],239:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":217}],240:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],241:[function(require,module,exports){
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
},{"safe-buffer":247}],242:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":243}],243:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":232,"./lib/_stream_passthrough.js":233,"./lib/_stream_readable.js":234,"./lib/_stream_transform.js":235,"./lib/_stream_writable.js":236}],244:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":243}],245:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":236}],246:[function(require,module,exports){
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
},{"_process":202,"through":258}],247:[function(require,module,exports){
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

},{"buffer":203}],248:[function(require,module,exports){
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

},{"events":217,"inherits":223,"readable-stream/duplex.js":231,"readable-stream/passthrough.js":242,"readable-stream/readable.js":243,"readable-stream/transform.js":244,"readable-stream/writable.js":245}],249:[function(require,module,exports){
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

},{"es-abstract/es5":210,"function-bind":220}],250:[function(require,module,exports){
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

},{"./implementation":249,"./polyfill":251,"./shim":252,"define-properties":208,"function-bind":220}],251:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":249}],252:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":251,"define-properties":208}],253:[function(require,module,exports){
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
},{"./lib/default_stream":254,"./lib/results":256,"./lib/test":257,"_process":202,"defined":209,"through":258}],254:[function(require,module,exports){
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
},{"_process":202,"fs":201,"through":258}],255:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":202}],256:[function(require,module,exports){
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
},{"_process":202,"events":217,"function-bind":220,"has":221,"inherits":223,"object-inspect":226,"resumer":246,"through":258}],257:[function(require,module,exports){
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
},{"./next_tick":255,"deep-equal":205,"defined":209,"events":217,"has":221,"inherits":223,"path":229,"string.prototype.trim":250}],258:[function(require,module,exports){
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
},{"_process":202,"stream":248}],259:[function(require,module,exports){
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
},{}]},{},[29,30,31]);
