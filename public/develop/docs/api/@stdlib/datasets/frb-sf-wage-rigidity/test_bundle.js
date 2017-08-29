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
* Test whether a value has in its prototype chain a specified constructor as a prototype property.
*
* @module @stdlib/assert/instance-of
*
* @example
* var instanceOf = require( '@stdlib/assert/instance-of' );
*
* var bool = instanceOf( [], Array );
* // returns true
*
* bool = instanceOf( {}, Object ); // exception
* // returns true
*
* bool = instanceOf( 'beep', String );
* // returns false
*
* bool = instanceOf( null, Object );
* // returns false
*
* bool = instanceOf( 5, Object );
* // returns false
*/

// MODULES //

var instanceOf = require( './instance_of.js' );


// EXPORTS //

module.exports = instanceOf;

},{"./instance_of.js":4}],4:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests whether a value has in its prototype chain a specified constructor as a prototype property.
*
* @param {*} value - value to test
* @param {Function} constructor - constructor to test against
* @throws {TypeError} constructor must be callable
* @returns {boolean} boolean indicating whether a value is an instance of a provided constructor
*
* @example
* var bool = instanceOf( [], Array );
* // returns true
*
* @example
* var bool = instanceOf( {}, Object ); // exception
* // returns true
*
* @example
* var bool = instanceOf( 'beep', String );
* // returns false
*
* @example
* var bool = instanceOf( null, Object );
* // returns false
*
* @example
* var bool = instanceOf( 5, Object );
* // returns false
*/
function instanceOf( value, constructor ) {
	// TODO: replace with `isCallable` check
	if ( typeof constructor !== 'function' ) {
		throw new TypeError( 'invalid input argument. `constructor` argument must be callable. Value: `'+constructor+'`.' );
	}
	return ( value instanceof constructor );
} // end FUNCTION instanceOf()


// EXPORTS //

module.exports = instanceOf;

},{}],5:[function(require,module,exports){
'use strict';

/**
* Test if a value is array-like.
*
* @module @stdlib/assert/is-array-like
*
* @example
* var isArrayLike = require( '@stdlib/assert/is-array-like' );
*
* var bool = isArrayLike( [] );
* // returns true
*
* bool = isArrayLike( { 'length': 10 } );
* // returns true
*
* bool = isArrayLike( 'beep' );
* // returns true
*/

// MODULES //

var isArrayLike = require( './is_array_like.js' );


// EXPORTS //

module.exports = isArrayLike;

},{"./is_array_like.js":6}],6:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


// MAIN //

/**
* Tests if a value is array-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is array-like
*
* @example
* var bool = isArrayLike( [] );
* // returns true
*
* @example
* var bool = isArrayLike( {'length':10} );
* // returns true
*/
function isArrayLike( value ) {
	return (
		value !== void 0 &&
		value !== null &&
		typeof value !== 'function' &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH
	);
} // end FUNCTION isArrayLike()


// EXPORTS //

module.exports = isArrayLike;

},{"@stdlib/math/base/assert/is-integer":62,"@stdlib/math/constants/uint32-max":70}],7:[function(require,module,exports){
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

},{"./is_array.js":8}],8:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":95}],9:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a Buffer instance.
*
* @module @stdlib/assert/is-buffer
*
* @example
* var isBuffer = require( '@stdlib/assert/is-buffer' );
*
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* v = isBuffer( {} );
* // returns false
*/

// MODULES //

var isBuffer = require( './is_buffer.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./is_buffer.js":10}],10:[function(require,module,exports){
'use strict';

// MODULES //

var isObjectLike = require( '@stdlib/assert/is-object-like' );


// MAIN //

/**
* Tests if a value is a Buffer instance.
*
* @param {*} value - value to validate
* @returns {boolean} boolean indicating if a value is a Buffer instance
*
* @example
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
*
* @example
* var v = isBuffer( {} );
* // returns false
*
* @example
* var v = isBuffer( [] );
* // returns false
*/
function isBuffer( value ) {
	return (
		isObjectLike( value ) &&
		(
			// eslint-disable-next-line no-underscore-dangle
			value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
			(
				value.constructor &&
				// WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
				typeof value.constructor.isBuffer === 'function' &&
				value.constructor.isBuffer( value )
			)
		)
	);
} // end FUNCTION isBuffer()


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":34}],11:[function(require,module,exports){
'use strict';

/**
* Test if a value is an `Error` object.
*
* @module @stdlib/assert/is-error
*
* @example
* var isError = require( '@stdlib/assert/is-error' );
*
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* bool = isError( {} );
* // returns false
*/

// MODULES //

var isError = require( './is_error.js' );


// EXPORTS //

module.exports = isError;

},{"./is_error.js":12}],12:[function(require,module,exports){
'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an `Error` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `Error` object
*
* @example
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* @example
* var bool = isError( {} );
* // returns false
*/
function isError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `Error` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof Error ) {
		return true;
	}
	// Walk the prototype tree until we find an object having the desired native class...
	while ( value ) {
		if ( nativeClass( value ) === '[object Error]' ) {
			return true;
		}
		value = getPrototypeOf( value );
	}
	return false;
} // end FUNCTION isError()


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":89,"@stdlib/utils/native-class":95}],13:[function(require,module,exports){
'use strict';

/**
* Test if a value is a function.
*
* @module @stdlib/assert/is-function
*
* @example
* var isFunction = require( '@stdlib/assert/is-function' );
*
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/

// MODULES //

var isFunction = require( './is_function.js' );


// EXPORTS //

module.exports = isFunction;

},{"./is_function.js":14}],14:[function(require,module,exports){
'use strict';

// MODULES //

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a function
*
* @example
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/
function isFunction( value ) {
	// Note: cannot use `typeof` directly, as various browser engines incorrectly return `'function'` when operating on non-function objects, such as regular expressions and NodeLists.
	return ( typeOf( value ) === 'function' );
} // end FUNCTION isFunction()


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":108}],15:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is an integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an integer
*
* @example
* var bool = isInteger( 5.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isInteger( -3.14 );
* // returns false
*
* @example
* var bool = isInteger( null );
* // returns false
*/
function isInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./object.js":18,"./primitive.js":19}],16:[function(require,module,exports){
'use strict';

/**
* Test if a value is an integer.
*
* @module @stdlib/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/assert/is-integer' );
*
* var bool = isInteger( 5.0 );
* // returns true
*
* bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isInteger( -3.14 );
* // returns false
*
* bool = isInteger( null );
* // returns false
*
* @example
* // Use interface to check for integer primitives...
* var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
*
* var bool = isInteger( -3.0 );
* // returns true
*
* bool = isInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for integer objects...
* var isInteger = require( '@stdlib/assert/is-integer' ).isObject;
*
* var bool = isInteger( 3.0 );
* // returns false
*
* bool = isInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInteger, 'isPrimitive', isPrimitive );
setReadOnly( isInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isInteger;

},{"./generic.js":15,"./object.js":18,"./primitive.js":19,"@stdlib/utils/define-read-only-property":82}],17:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var isInt = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a number primitive is an integer value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a number primitive is an integer value
*/
function isInteger( value ) {
	return (
		value < PINF &&
		value > NINF &&
		isInt( value )
	);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/assert/is-integer":62,"@stdlib/math/constants/float64-ninf":68,"@stdlib/math/constants/float64-pinf":69}],18:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number object having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having an integer value
*
* @example
* var bool = isInteger( 3.0 );
* // returns false
*
* @example
* var bool = isInteger( new Number( 3.0 ) );
* // returns true
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value.valueOf() )
	);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":17,"@stdlib/assert/is-number":29}],19:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number primitive having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having an integer value
*
* @example
* var bool = isInteger( -3.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( -3.0 ) );
* // returns false
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value )
	);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":17,"@stdlib/assert/is-number":29}],20:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( null );
* // returns false
*/
function isnan( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"./object.js":22,"./primitive.js":23}],21:[function(require,module,exports){
'use strict';

/**
* Test if a value is `NaN`.
*
* @module @stdlib/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( new Number( NaN ) );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( null );
* // returns false
*
* @example
* // Use interface to check for `NaN` primitives...
* var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns false
*
* @example
* // Use interface to check for `NaN` objects...
* var isnan = require( '@stdlib/assert/is-nan' ).isObject;
*
* var bool = isnan( NaN );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isnan = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isnan, 'isPrimitive', isPrimitive );
setReadOnly( isnan, 'isObject', isObject );


// EXPORTS //

module.exports = isnan;

},{"./generic.js":20,"./object.js":22,"./primitive.js":23,"@stdlib/utils/define-read-only-property":82}],22:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a number object having a value of `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a value of `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns true
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value.valueOf() )
	);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":29,"@stdlib/math/base/assert/is-nan":64}],23:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a `NaN` number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a `NaN` number primitive
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 3.14 );
* // returns false
*
* @example
* var bool = isnan( new Number( NaN ) );
* // returns false
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value )
	);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":29,"@stdlib/math/base/assert/is-nan":64}],24:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a nonnegative integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( null );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":26,"./primitive.js":27}],25:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a nonnegative integer.
*
* @module @stdlib/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* bool = isNonNegativeInteger( null );
* // returns false
*
* @example
* // Use interface to check for nonnegative integer primitives...
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for nonnegative integer objects...
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isObject;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNonNegativeInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./generic.js":24,"./object.js":26,"./primitive.js":27,"@stdlib/utils/define-read-only-property":82}],26:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() >= 0
	);
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":16}],27:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value >= 0
	);
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":16}],28:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a number
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* bool = isNumber( NaN );
* // returns true
*
* @example
* bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./object.js":30,"./primitive.js":31}],29:[function(require,module,exports){
'use strict';

/**
* Test if a value is a number.
*
* @module @stdlib/assert/is-number
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' );
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( null );
* // returns false
*
* @example
* // Use interface to check for number primitives...
* var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns false
*
* @example
* // Use interface to check for number objects...
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./generic.js":28,"./object.js":30,"./primitive.js":31,"@stdlib/utils/define-read-only-property":82}],30:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// MAIN //

/**
* Tests if a value is a number object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object
*
* @example
* var bool = isNumber( 3.14 );
* // returns false
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*/
function isNumber( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":33,"@stdlib/utils/detect-tostringtag-support":86,"@stdlib/utils/native-class":95}],31:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{}],32:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],33:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./tostring.js":32}],34:[function(require,module,exports){
'use strict';

/**
* Test if a value is object-like.
*
* @module @stdlib/assert/is-object-like
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' );
*
* var bool = isObjectLike( {} );
* // returns true
*
* bool = isObjectLike( [] );
* // returns true
*
* bool = isObjectLike( null );
* // returns false
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' ).isObjectLikeArray;
*
* var bool = isObjectLike( [ {}, [] ] );
* // returns true
*
* bool = isObjectLike( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './is_object_like.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./is_object_like.js":35,"@stdlib/assert/tools/array-function":48,"@stdlib/utils/define-read-only-property":82}],35:[function(require,module,exports){
'use strict';

/**
* Tests if a value is object-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is object-like
*
* @example
* var bool = isObjectLike( {} );
* // returns true
*
* @example
* var bool = isObjectLike( [] );
* // returns true
*
* @example
* var bool = isObjectLike( null );
* // returns false
*/
function isObjectLike( value ) {
	return (
		value !== null &&
		typeof value === 'object'
	);
} // end FUNCTION isObjectLike()


// EXPORTS //

module.exports = isObjectLike;

},{}],36:[function(require,module,exports){
'use strict';

/**
* Test if a value is an object.
*
* @module @stdlib/assert/is-object
*
* @example
* var isObject = require( '@stdlib/assert/is-object' );
*
* var bool = isObject( {} );
* // returns true
*
* bool = isObject( true );
* // returns false
*/

// MODULES //

var isObject = require( './is_object.js' );


// EXPORTS //

module.exports = isObject;

},{"./is_object.js":37}],37:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Tests if a value is an object; e.g., {}.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an object
*
* @example
* var bool = isObject( {} );
* // returns true
*
* @example
* var bool = isObject( null );
* // returns false
*/
function isObject( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		!isArray( value )
	);
} // end FUNCTION isObject()


// EXPORTS //

module.exports = isObject;

},{"@stdlib/assert/is-array":7}],38:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only plain objects.
*
* @module @stdlib/assert/is-plain-object-array
*
* @example
* var isObjectArray = require( '@stdlib/assert/is-plain-object-array' );
*
* var bool = isObjectArray( [ {}, { 'beep': 'boop' } ] );
* // returns true
*
* bool = isObjectArray( [ {}, new Number(3.0) ] );
* // returns false
*
* bool = isObjectArray( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var arrayfun = require( '@stdlib/assert/tools/array-like-function' );
var isPlainObject = require( '@stdlib/assert/is-plain-object' );


// MAIN //

var isPlainObjectArray = arrayfun( isPlainObject );


// EXPORTS //

module.exports = isPlainObjectArray;

},{"@stdlib/assert/is-plain-object":39,"@stdlib/assert/tools/array-like-function":50}],39:[function(require,module,exports){
'use strict';

/**
* Test if a value is a plain object.
*
* @module @stdlib/assert/is-plain-object
*
* @example
* var isPlainObject = require( '@stdlib/assert/is-plain-object' );
*
* var bool = isPlainObject( {} );
* // returns true
*
* bool = isPlainObject( null );
* // returns false
*/

// MODULES //

var isPlainObject = require( './is_plain_object.js' );


// EXPORTS //

module.exports = isPlainObject;

},{"./is_plain_object.js":40}],40:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-object' );
var isFunction = require( '@stdlib/assert/is-function' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var objectPrototype = Object.prototype;


// FUNCTIONS //

/**
* Tests that an object only has own properties.
*
* @private
* @param {Object} obj - value to test
* @returns {boolean} boolean indicating if an object only has own properties
*/
function ownProps( obj ) {
	var key;

	// NOTE: possibility of perf boost if key enumeration order is known (see http://stackoverflow.com/questions/18531624/isplainobject-thing).
	for ( key in obj ) {
		if ( !hasOwnProp( obj, key ) ) {
			return false;
		}
	}
	return true;
} // end FUNCTION ownProps()


// MAIN //

/**
* Tests if a value is a plain object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a plain object
*
* @example
* var bool = isPlainObject( {} );
* // returns true
*
* @example
* var bool = isPlainObject( null );
* // returns false
*/
function isPlainObject( value ) {
	var proto;

	// Screen for obvious non-objects...
	if ( !isObject( value ) ) {
		return false;
	}
	// Objects with no prototype (e.g., `Object.create( null )`) are plain...
	proto = getPrototypeOf( value );
	if ( !proto ) {
		return true;
	}
	// Objects having a prototype are plain if and only if they are constructed with a global `Object` function and the prototype points to the prototype of a plain object...
	return (
		// Cannot have own `constructor` property:
		!hasOwnProp( value, 'constructor' ) &&

		// Prototype `constructor` property must be a function (see also https://bugs.jquery.com/ticket/9897 and http://stackoverflow.com/questions/18531624/isplainobject-thing):
		hasOwnProp( proto, 'constructor' ) &&
		isFunction( proto.constructor ) &&
		nativeClass( proto.constructor ) === '[object Function]' &&

		// Test for object-specific method:
		hasOwnProp( proto, 'isPrototypeOf' ) &&
		isFunction( proto.isPrototypeOf ) &&

		(
			// Test if the prototype matches the global `Object` prototype (same realm):
			proto === objectPrototype ||

			// Test that all properties are own properties (cross-realm; *most* likely a plain object):
			ownProps( value )
		)
	);
} // end FUNCTION isPlainObject()


// EXPORTS //

module.exports = isPlainObject;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":13,"@stdlib/assert/is-object":36,"@stdlib/utils/get-prototype-of":89,"@stdlib/utils/native-class":95}],41:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a string
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns true
*/
function isString( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./object.js":43,"./primitive.js":44}],42:[function(require,module,exports){
'use strict';

/**
* Test if a value is a string.
*
* @module @stdlib/assert/is-string
*
* @example
* var isString = require( '@stdlib/assert/is-string' );
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 5 );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isObject;
*
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 'beep' );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isString = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./generic.js":41,"./object.js":43,"./primitive.js":44,"@stdlib/utils/define-read-only-property":82}],43:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2valueof.js' );


// MAIN //

/**
* Tests if a value is a string object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string object
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns false
*/
function isString( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object String]' );
	}
	return false;
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":45,"@stdlib/utils/detect-tostringtag-support":86,"@stdlib/utils/native-class":95}],44:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' );
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{}],45:[function(require,module,exports){
'use strict';

// MODULES //

var valueOf = require( './valueof.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to extract a string value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a string can be extracted
*/
function test( value ) {
	try {
		valueOf.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./valueof.js":46}],46:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],47:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Returns a function which tests if every element in an array passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arrayfcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;
	/**
	* Tests if every element in an array passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArray( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	} // end FUNCTION every()
} // end FUNCTION arrayfcn()


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":7}],48:[function(require,module,exports){
'use strict';

/**
* Return a function which tests if every element in an array passes a test condition.
*
* @module @stdlib/assert/tools/array-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arrayfcn = require( '@stdlib/assert/tools/array-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":47}],49:[function(require,module,exports){
'use strict';

// MODULES //

var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Returns a function which tests if every element in an array-like object passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array-like object function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arraylikefcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arraylikefcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;
	/**
	* Tests if every element in an array-like object passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array-like object for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArrayLike( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	} // end FUNCTION every()
} // end FUNCTION arraylikefcn()


// EXPORTS //

module.exports = arraylikefcn;

},{"@stdlib/assert/is-array-like":5}],50:[function(require,module,exports){
'use strict';

/**
* Return a function which tests if every element in an array-like object passes a test condition.
*
* @module @stdlib/assert/tools/array-like-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arraylikefcn = require( '@stdlib/assert/tools/array-like-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arraylikefcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arraylikefcn = require( './arraylikefcn.js' );


// EXPORTS //

module.exports = arraylikefcn;

},{"./arraylikefcn.js":49}],51:[function(require,module,exports){
module.exports=[{"date":"01/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/1/1980","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/1/1980","all_workers":6.6051640043,"hourly_workers":7.1045695125,"non_hourly_workers":6.0894170021,"less_than_high_school":8.2848121697,"high_school":7.281848362,"some_college":5.5040371904,"college":5.0382060963,"construction":null,"finance":null,"manufacturing":null},{"date":"01/1/1981","all_workers":6.6133956828,"hourly_workers":7.1661873534,"non_hourly_workers":6.0443434409,"less_than_high_school":8.1660029649,"high_school":7.4460828679,"some_college":5.4878128959,"college":4.8829432012,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1981","all_workers":6.6983213317,"hourly_workers":7.3010694756,"non_hourly_workers":6.0813412079,"less_than_high_school":8.3833102331,"high_school":7.4245985834,"some_college":5.8163677583,"college":4.9026024063,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1981","all_workers":6.7864103977,"hourly_workers":7.4189910849,"non_hourly_workers":6.1422436597,"less_than_high_school":8.4621050714,"high_school":7.5215794584,"some_college":5.8352532713,"college":5.0952797566,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1981","all_workers":6.7462924754,"hourly_workers":7.38139413,"non_hourly_workers":6.0986112641,"less_than_high_school":8.2335435165,"high_school":7.4192563569,"some_college":5.7956101647,"college":5.3133191553,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1981","all_workers":6.8042135585,"hourly_workers":7.5058785398,"non_hourly_workers":6.1101393769,"less_than_high_school":8.3995595371,"high_school":7.3820496508,"some_college":5.8949528217,"college":5.3521177734,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1981","all_workers":6.7665064655,"hourly_workers":7.372852509,"non_hourly_workers":6.1753624408,"less_than_high_school":8.232407227,"high_school":7.4647686717,"some_college":5.6933705898,"college":5.3999027478,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1981","all_workers":6.7144888319,"hourly_workers":7.2509574444,"non_hourly_workers":6.188415615,"less_than_high_school":7.8156333052,"high_school":7.5058145206,"some_college":5.7005519391,"college":5.504374931,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1981","all_workers":6.7712377987,"hourly_workers":7.3276541565,"non_hourly_workers":6.2205703786,"less_than_high_school":8.0756629205,"high_school":7.5319628053,"some_college":5.8069874977,"college":5.3892069066,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1981","all_workers":6.834380846,"hourly_workers":7.2901534095,"non_hourly_workers":6.3829693198,"less_than_high_school":7.7629538667,"high_school":7.7159701462,"some_college":5.6064683016,"college":5.7345428244,"construction":null,"finance":null,"manufacturing":null},{"date":"10/1/1981","all_workers":6.7197482603,"hourly_workers":7.2949711584,"non_hourly_workers":6.129639712,"less_than_high_school":7.8835592916,"high_school":7.5984970382,"some_college":5.3644686148,"college":5.5539963357,"construction":null,"finance":null,"manufacturing":null},{"date":"11/1/1981","all_workers":6.8095445279,"hourly_workers":7.2896898945,"non_hourly_workers":6.3232345938,"less_than_high_school":7.8209559437,"high_school":7.6031873127,"some_college":5.6951264319,"college":5.7152220752,"construction":null,"finance":null,"manufacturing":null},{"date":"12/1/1981","all_workers":6.8536732812,"hourly_workers":7.336819217,"non_hourly_workers":6.3624844656,"less_than_high_school":7.9154695513,"high_school":7.6101013168,"some_college":5.8238285443,"college":5.7830817521,"construction":null,"finance":null,"manufacturing":null},{"date":"01/1/1982","all_workers":7.0708930223,"hourly_workers":7.5652111665,"non_hourly_workers":6.5607356133,"less_than_high_school":8.0589045028,"high_school":7.8957623857,"some_college":6.0391689237,"college":5.9179872108,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1982","all_workers":7.2237516191,"hourly_workers":7.6948400985,"non_hourly_workers":6.7357792854,"less_than_high_school":8.0465508614,"high_school":8.2566079702,"some_college":5.9511592269,"college":5.9965998585,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1982","all_workers":7.2073612832,"hourly_workers":7.5929552405,"non_hourly_workers":6.7971065615,"less_than_high_school":8.0882355507,"high_school":8.2790659798,"some_college":5.8291346512,"college":5.9273870128,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1982","all_workers":7.4477078865,"hourly_workers":7.8904447477,"non_hourly_workers":6.9771710524,"less_than_high_school":8.7692595288,"high_school":8.596601758,"some_college":5.8289944811,"college":6.0208246857,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1982","all_workers":7.5247541054,"hourly_workers":7.8781403729,"non_hourly_workers":7.1183275163,"less_than_high_school":8.9459884437,"high_school":8.7044786997,"some_college":5.7315353981,"college":6.1764300534,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1982","all_workers":7.5892524989,"hourly_workers":8.143638464,"non_hourly_workers":6.94948471,"less_than_high_school":9.1763554092,"high_school":8.635573311,"some_college":6.1263355961,"college":6.0295682924,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1982","all_workers":7.7772552141,"hourly_workers":8.467181654,"non_hourly_workers":6.9605676722,"less_than_high_school":9.8827243066,"high_school":8.6842234579,"some_college":6.5019931588,"college":5.8770657418,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1982","all_workers":7.968119413,"hourly_workers":8.7969529325,"non_hourly_workers":6.9629742293,"less_than_high_school":10.188810285,"high_school":8.8698238778,"some_college":6.858449196,"college":5.8432604778,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1982","all_workers":8.2066007444,"hourly_workers":9.1871724787,"non_hourly_workers":7.0218062116,"less_than_high_school":10.6114196854,"high_school":8.9954956462,"some_college":7.3583639114,"college":5.985412267,"construction":null,"finance":null,"manufacturing":null},{"date":"10/1/1982","all_workers":8.3389596528,"hourly_workers":9.3612560928,"non_hourly_workers":7.1024496644,"less_than_high_school":10.7135546073,"high_school":9.15455153,"some_college":7.4520732459,"college":6.0927684303,"construction":null,"finance":null,"manufacturing":null},{"date":"11/1/1982","all_workers":8.4992501267,"hourly_workers":9.776521369,"non_hourly_workers":6.9862888755,"less_than_high_school":11.0762077322,"high_school":9.36927983,"some_college":7.5232184249,"college":6.1062940795,"construction":null,"finance":null,"manufacturing":null},{"date":"12/1/1982","all_workers":8.4774330203,"hourly_workers":9.8346158714,"non_hourly_workers":6.8769075015,"less_than_high_school":11.1094948978,"high_school":9.3389198016,"some_college":7.5225912125,"college":6.0436227312,"construction":null,"finance":null,"manufacturing":null},{"date":"01/1/1983","all_workers":8.6462433716,"hourly_workers":10.026210536,"non_hourly_workers":7.0249381913,"less_than_high_school":11.6814705056,"high_school":9.1819013417,"some_college":7.8076268027,"college":6.2973927973,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1983","all_workers":8.8515827643,"hourly_workers":10.4507171304,"non_hourly_workers":6.9721236865,"less_than_high_school":12.5754162986,"high_school":9.3601239466,"some_college":7.9319564408,"college":6.1815860713,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1983","all_workers":9.1272277736,"hourly_workers":10.9767930802,"non_hourly_workers":6.9964687173,"less_than_high_school":12.964344689,"high_school":9.5623413027,"some_college":8.5719976431,"college":6.2609496502,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1983","all_workers":9.3404192122,"hourly_workers":11.2685919216,"non_hourly_workers":7.122879617,"less_than_high_school":13.1280394506,"high_school":9.7815548265,"some_college":9.041196826,"college":6.2739009054,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1983","all_workers":9.5676635765,"hourly_workers":11.6044137606,"non_hourly_workers":7.230102154,"less_than_high_school":13.2140129997,"high_school":10.1246512545,"some_college":9.2754756494,"college":6.417598266,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1983","all_workers":9.9382054575,"hourly_workers":12.0003692985,"non_hourly_workers":7.5665037834,"less_than_high_school":14.2878632233,"high_school":10.728976446,"some_college":9.0737373251,"college":6.4403347523,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1983","all_workers":10.1717211187,"hourly_workers":12.1822263017,"non_hourly_workers":7.8603895394,"less_than_high_school":14.2535249121,"high_school":11.2608177439,"some_college":8.9292532559,"college":6.7474098338,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1983","all_workers":10.3504454563,"hourly_workers":12.3423000343,"non_hourly_workers":8.0433972612,"less_than_high_school":14.1719409259,"high_school":11.4700108203,"some_college":9.1024792286,"college":7.0621499064,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1983","all_workers":10.3690875051,"hourly_workers":12.3505530044,"non_hourly_workers":8.0192210769,"less_than_high_school":14.222705314,"high_school":11.4444271084,"some_college":9.3432039734,"college":6.7068409166,"construction":null,"finance":null,"manufacturing":null},{"date":"10/1/1983","all_workers":10.6747733666,"hourly_workers":12.675745123,"non_hourly_workers":8.2574030222,"less_than_high_school":14.6837149038,"high_school":11.7993088094,"some_college":9.5531695608,"college":6.9337995567,"construction":null,"finance":null,"manufacturing":null},{"date":"11/1/1983","all_workers":10.7710825462,"hourly_workers":12.6944898099,"non_hourly_workers":8.402334956,"less_than_high_school":14.9818309171,"high_school":11.8453645605,"some_college":9.6258240563,"college":7.0391877435,"construction":null,"finance":null,"manufacturing":null},{"date":"12/1/1983","all_workers":10.8995756999,"hourly_workers":12.8682381368,"non_hourly_workers":8.462928472,"less_than_high_school":14.8844383059,"high_school":12.1945789731,"some_college":9.6894971359,"college":7.0704772408,"construction":16.6367712057,"finance":8.0002140675,"manufacturing":9.7111544871},{"date":"01/1/1984","all_workers":11.0251062614,"hourly_workers":13.1180449313,"non_hourly_workers":8.4270202001,"less_than_high_school":15.288981853,"high_school":12.3721637024,"some_college":9.683449795,"college":7.1559469386,"construction":17.6930537105,"finance":7.9538619561,"manufacturing":9.7671202956},{"date":"02/1/1984","all_workers":11.0184390507,"hourly_workers":13.0435879214,"non_hourly_workers":8.4922516987,"less_than_high_school":14.8893447502,"high_school":12.4487687225,"some_college":9.9979667742,"college":7.0012057957,"construction":16.9423657091,"finance":8.2010495379,"manufacturing":9.7121466287},{"date":"03/1/1984","all_workers":11.0043617035,"hourly_workers":12.9689226283,"non_hourly_workers":8.4974828672,"less_than_high_school":14.8791136373,"high_school":12.4703241956,"some_college":9.7780251772,"college":7.116078169,"construction":16.7884211503,"finance":8.0483303036,"manufacturing":9.4287399253},{"date":"04/1/1984","all_workers":10.9822209966,"hourly_workers":12.9847588229,"non_hourly_workers":8.4360651656,"less_than_high_school":14.7948085853,"high_school":12.2250574533,"some_college":9.9112403325,"college":7.3668504587,"construction":15.7692931448,"finance":8.5061284776,"manufacturing":9.8460484591},{"date":"05/1/1984","all_workers":11.035970028,"hourly_workers":13.1514754031,"non_hourly_workers":8.3274012534,"less_than_high_school":14.9146600305,"high_school":12.2407316746,"some_college":10.1854787056,"college":7.2814875378,"construction":16.4509142796,"finance":8.3977115481,"manufacturing":9.6704012217},{"date":"06/1/1984","all_workers":10.9009618929,"hourly_workers":12.9762221905,"non_hourly_workers":8.2153487488,"less_than_high_school":14.2343355362,"high_school":12.0607496958,"some_college":10.3837804348,"college":7.2655839612,"construction":16.2321494237,"finance":7.8304486403,"manufacturing":9.3591902713},{"date":"07/1/1984","all_workers":10.9262882608,"hourly_workers":13.100634788,"non_hourly_workers":8.1351611514,"less_than_high_school":14.5788018482,"high_school":11.814333908,"some_college":10.4725029539,"college":7.4735452401,"construction":16.1088373248,"finance":7.5261252988,"manufacturing":9.541071024},{"date":"08/1/1984","all_workers":10.891844203,"hourly_workers":13.084173184,"non_hourly_workers":8.0800013034,"less_than_high_school":15.0238890021,"high_school":11.7244357415,"some_college":10.4671314609,"college":7.2363365379,"construction":15.4025485246,"finance":8.1809364111,"manufacturing":10.1183593057},{"date":"09/1/1984","all_workers":10.950509104,"hourly_workers":13.2952028846,"non_hourly_workers":7.9588008441,"less_than_high_school":15.1859779255,"high_school":12.0118114962,"some_college":10.2422391027,"college":7.254893108,"construction":15.625924896,"finance":8.2311737021,"manufacturing":10.5311702214},{"date":"10/1/1984","all_workers":10.7786233395,"hourly_workers":13.067871241,"non_hourly_workers":7.8890920709,"less_than_high_school":15.2890565873,"high_school":11.7180238363,"some_college":10.0340501937,"college":7.2241881652,"construction":15.5469333037,"finance":7.7642756401,"manufacturing":10.8692567777},{"date":"11/1/1984","all_workers":10.7990895549,"hourly_workers":13.1645510182,"non_hourly_workers":7.8147073584,"less_than_high_school":15.0176699057,"high_school":11.7066993188,"some_college":10.1986224357,"college":7.1696936069,"construction":15.5269141674,"finance":7.5360523509,"manufacturing":10.8981896563},{"date":"12/1/1984","all_workers":10.9972219093,"hourly_workers":13.4482165949,"non_hourly_workers":7.8746511729,"less_than_high_school":15.4475344223,"high_school":11.690626259,"some_college":10.5758658203,"college":7.2160182542,"construction":15.4981658063,"finance":7.2149294444,"manufacturing":11.1285858599},{"date":"01/1/1985","all_workers":10.972967492,"hourly_workers":13.4797456823,"non_hourly_workers":7.77232338,"less_than_high_school":15.2631030325,"high_school":11.7447580763,"some_college":10.4632196242,"college":7.2960104637,"construction":14.7411464536,"finance":7.2013381732,"manufacturing":11.3238358538},{"date":"02/1/1985","all_workers":11.3176773818,"hourly_workers":13.8251927286,"non_hourly_workers":8.0838147406,"less_than_high_school":15.8994208794,"high_school":11.9674190429,"some_college":10.4885897382,"college":7.8958623647,"construction":14.6353730388,"finance":7.1534112379,"manufacturing":11.5764126129},{"date":"03/1/1985","all_workers":11.3536993845,"hourly_workers":13.7866766092,"non_hourly_workers":8.2148929591,"less_than_high_school":15.3252155307,"high_school":12.1705369046,"some_college":10.4638587094,"college":8.0523738299,"construction":14.5366811309,"finance":7.5047634611,"manufacturing":11.9850869209},{"date":"04/1/1985","all_workers":11.4314360079,"hourly_workers":14.0505438967,"non_hourly_workers":8.0702437347,"less_than_high_school":15.454854092,"high_school":12.5882422542,"some_college":10.136979812,"college":7.8675895488,"construction":15.5062981329,"finance":7.0073639819,"manufacturing":11.8382780603},{"date":"05/1/1985","all_workers":11.327165817,"hourly_workers":13.80517486,"non_hourly_workers":8.1539301044,"less_than_high_school":15.405816924,"high_school":12.3413904152,"some_college":10.1760075324,"college":7.7813921865,"construction":14.88669927,"finance":7.6055422613,"manufacturing":12.0350341066},{"date":"06/1/1985","all_workers":11.4085312238,"hourly_workers":13.9030761578,"non_hourly_workers":8.2292368286,"less_than_high_school":15.4654566019,"high_school":12.5360638828,"some_college":10.1802553556,"college":7.7963447478,"construction":14.4675947209,"finance":9.0836905636,"manufacturing":12.5225722484},{"date":"07/1/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/1/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/1/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/1/1985","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/1/1986","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/1/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1987","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1987","all_workers":11.9283851594,"hourly_workers":14.9782471395,"non_hourly_workers":7.7211839299,"less_than_high_school":16.8069942208,"high_school":12.8244798861,"some_college":12.129849779,"college":7.4930467375,"construction":17.7663163805,"finance":8.5857444649,"manufacturing":13.7109129272},{"date":"10/1/1987","all_workers":11.8917151084,"hourly_workers":14.9838536253,"non_hourly_workers":7.6470880074,"less_than_high_school":16.6696304213,"high_school":12.923127195,"some_college":12.0153750798,"college":7.3174708599,"construction":17.8319311629,"finance":8.5007725441,"manufacturing":13.158607499},{"date":"11/1/1987","all_workers":11.9987394983,"hourly_workers":15.2127044914,"non_hourly_workers":7.5676249557,"less_than_high_school":16.4729153105,"high_school":13.1965073814,"some_college":12.1839944779,"college":7.1806143008,"construction":18.7443345172,"finance":8.2819091354,"manufacturing":13.4077806812},{"date":"12/1/1987","all_workers":12.1605130812,"hourly_workers":15.4387339217,"non_hourly_workers":7.5814328116,"less_than_high_school":16.0054507673,"high_school":13.4648431879,"some_college":12.4764399187,"college":7.3175881341,"construction":19.1507702907,"finance":8.8652886673,"manufacturing":13.3640635211},{"date":"01/1/1988","all_workers":12.2581603271,"hourly_workers":15.5595344313,"non_hourly_workers":7.6392641352,"less_than_high_school":16.2195644638,"high_school":13.5825178598,"some_college":12.4879107486,"college":7.3597469433,"construction":20.3046620077,"finance":8.6679651669,"manufacturing":13.3106964009},{"date":"02/1/1988","all_workers":12.3285342187,"hourly_workers":15.5948665639,"non_hourly_workers":7.8075805774,"less_than_high_school":16.3757020753,"high_school":13.6651647532,"some_college":12.4642402852,"college":7.6141417649,"construction":18.8589826576,"finance":8.7286469811,"manufacturing":13.4490373283},{"date":"03/1/1988","all_workers":12.3168410976,"hourly_workers":15.4928040174,"non_hourly_workers":7.9031098986,"less_than_high_school":16.6212574109,"high_school":13.633077593,"some_college":12.4443488279,"college":7.5859115627,"construction":18.8732037245,"finance":8.4651784742,"manufacturing":12.8199979133},{"date":"04/1/1988","all_workers":12.2047508213,"hourly_workers":15.3758035474,"non_hourly_workers":7.8042868704,"less_than_high_school":16.8019339097,"high_school":13.5573642299,"some_college":11.9138470347,"college":7.7115776907,"construction":20.143490489,"finance":8.342523697,"manufacturing":12.3642413399},{"date":"05/1/1988","all_workers":12.3711126643,"hourly_workers":15.4051046995,"non_hourly_workers":8.1120974981,"less_than_high_school":16.9049834653,"high_school":13.5671598701,"some_college":11.8851627994,"college":8.4031265925,"construction":20.1927735177,"finance":8.4273082832,"manufacturing":12.2807693015},{"date":"06/1/1988","all_workers":12.1207930423,"hourly_workers":15.1645487563,"non_hourly_workers":7.8410975747,"less_than_high_school":16.9350299868,"high_school":13.3472236119,"some_college":11.4685748261,"college":8.073305034,"construction":19.3309882372,"finance":8.3531016338,"manufacturing":11.9398304903},{"date":"07/1/1988","all_workers":11.8960771443,"hourly_workers":14.7192140176,"non_hourly_workers":7.9184020233,"less_than_high_school":16.0527753448,"high_school":13.1296044942,"some_college":11.1572931706,"college":8.2817813745,"construction":18.5980211603,"finance":8.2993789906,"manufacturing":11.3294196668},{"date":"08/1/1988","all_workers":11.8526971706,"hourly_workers":14.5916715982,"non_hourly_workers":7.9883929241,"less_than_high_school":16.0684469814,"high_school":13.0918514291,"some_college":11.113232313,"college":8.1076891418,"construction":19.0756478609,"finance":8.7331153144,"manufacturing":11.2334920376},{"date":"09/1/1988","all_workers":11.9921959719,"hourly_workers":14.8441544397,"non_hourly_workers":7.9652056063,"less_than_high_school":15.9411798929,"high_school":13.4938434437,"some_college":11.1860462553,"college":8.1094754604,"construction":19.2426010462,"finance":9.7401417351,"manufacturing":11.2089852038},{"date":"10/1/1988","all_workers":11.9700349967,"hourly_workers":14.714424847,"non_hourly_workers":8.0821213121,"less_than_high_school":16.1966662561,"high_school":13.4130061016,"some_college":11.150624823,"college":8.0494515118,"construction":18.4746029446,"finance":9.7915020918,"manufacturing":11.8667240649},{"date":"11/1/1988","all_workers":11.8369343114,"hourly_workers":14.5525136445,"non_hourly_workers":8.0092058961,"less_than_high_school":16.2236443383,"high_school":13.4196124707,"some_college":10.6926016905,"college":8.048636464,"construction":18.1474942694,"finance":9.5909867883,"manufacturing":11.9868643057},{"date":"12/1/1988","all_workers":11.8274651312,"hourly_workers":14.5752503062,"non_hourly_workers":7.9955255057,"less_than_high_school":16.6052156538,"high_school":13.5782401101,"some_college":10.3818272782,"college":8.0583706551,"construction":18.3292872159,"finance":8.9093537519,"manufacturing":12.2537852645},{"date":"01/1/1989","all_workers":11.6311953789,"hourly_workers":14.347497695,"non_hourly_workers":7.8217764323,"less_than_high_school":16.7729680768,"high_school":13.2032211673,"some_college":10.3314324759,"college":7.8215611614,"construction":18.0366822106,"finance":8.917113056,"manufacturing":11.846487341},{"date":"02/1/1989","all_workers":11.5285598767,"hourly_workers":14.1631188578,"non_hourly_workers":7.7877111412,"less_than_high_school":16.9738826049,"high_school":12.8476523848,"some_college":10.2621806877,"college":7.7274996839,"construction":17.9453742052,"finance":9.1114789313,"manufacturing":11.6330743685},{"date":"03/1/1989","all_workers":11.6825413045,"hourly_workers":14.4915674415,"non_hourly_workers":7.6978725343,"less_than_high_school":17.0460030184,"high_school":13.0122467913,"some_college":10.4399848603,"college":7.7844799191,"construction":19.6491242866,"finance":9.241496366,"manufacturing":12.0518986224},{"date":"04/1/1989","all_workers":11.6273512772,"hourly_workers":14.4981934346,"non_hourly_workers":7.5909865891,"less_than_high_school":16.2890261977,"high_school":12.8874731566,"some_college":10.8803195934,"college":7.7450172324,"construction":18.3036156324,"finance":9.7589528001,"manufacturing":12.0867306988},{"date":"05/1/1989","all_workers":11.3800291122,"hourly_workers":14.3515456929,"non_hourly_workers":7.2172784451,"less_than_high_school":16.2083852218,"high_school":12.8033072141,"some_college":10.7195521448,"college":6.9325787527,"construction":17.4467284196,"finance":9.7960895239,"manufacturing":12.0749793725},{"date":"06/1/1989","all_workers":11.4355723762,"hourly_workers":14.3039429555,"non_hourly_workers":7.4489685374,"less_than_high_school":15.8794843184,"high_school":12.8708517148,"some_college":10.7961418297,"college":7.211202476,"construction":17.0956247771,"finance":9.9505915382,"manufacturing":12.4393520252},{"date":"07/1/1989","all_workers":11.2509213357,"hourly_workers":14.2217651614,"non_hourly_workers":7.127170558,"less_than_high_school":15.988823247,"high_school":12.7099933595,"some_college":10.4786393659,"college":6.9334409121,"construction":17.65235875,"finance":9.4073106978,"manufacturing":12.402449844},{"date":"08/1/1989","all_workers":11.0870616546,"hourly_workers":13.9851584606,"non_hourly_workers":7.0743024803,"less_than_high_school":15.7441484844,"high_school":12.484881891,"some_college":10.3627152054,"college":6.9316692121,"construction":17.1515550326,"finance":8.9979929808,"manufacturing":12.1326288069},{"date":"09/1/1989","all_workers":10.819101163,"hourly_workers":13.6769108411,"non_hourly_workers":6.8901512974,"less_than_high_school":15.6001348269,"high_school":11.96736495,"some_college":10.206225778,"college":6.8697018564,"construction":17.3526294186,"finance":8.1727337574,"manufacturing":11.8651678383},{"date":"10/1/1989","all_workers":10.5598529104,"hourly_workers":13.3785542638,"non_hourly_workers":6.6784946349,"less_than_high_school":15.0778422806,"high_school":11.8009185436,"some_college":9.6440498508,"college":6.912413526,"construction":17.4440425059,"finance":7.6846339017,"manufacturing":11.526059362},{"date":"11/1/1989","all_workers":10.5023528063,"hourly_workers":13.3044463288,"non_hourly_workers":6.6308450415,"less_than_high_school":15.0091278928,"high_school":11.8112597913,"some_college":9.4261765035,"college":6.9135787124,"construction":17.1650022438,"finance":8.099003195,"manufacturing":11.5883917411},{"date":"12/1/1989","all_workers":10.3213004195,"hourly_workers":13.1075248802,"non_hourly_workers":6.4407175532,"less_than_high_school":14.9956589641,"high_school":11.3515624837,"some_college":9.5393964678,"college":6.6316744219,"construction":17.4380450432,"finance":7.7385386615,"manufacturing":11.2451716626},{"date":"01/1/1990","all_workers":10.3852785873,"hourly_workers":13.2291042507,"non_hourly_workers":6.4647737928,"less_than_high_school":15.0047464481,"high_school":11.684100759,"some_college":9.363712335,"college":6.7593598208,"construction":16.780586619,"finance":8.2419200967,"manufacturing":11.5333326287},{"date":"02/1/1990","all_workers":10.2516490315,"hourly_workers":13.1692873879,"non_hourly_workers":6.2783708702,"less_than_high_school":14.1998610488,"high_school":11.7264852675,"some_college":9.4232201119,"college":6.6180958813,"construction":17.2271406884,"finance":8.1910885234,"manufacturing":11.26841107},{"date":"03/1/1990","all_workers":10.1166933384,"hourly_workers":12.9948415757,"non_hourly_workers":6.2362931867,"less_than_high_school":14.0373820441,"high_school":11.6752041921,"some_college":9.3784886313,"college":6.3752456357,"construction":15.2268723977,"finance":8.4241715098,"manufacturing":10.9151231831},{"date":"04/1/1990","all_workers":10.0397305628,"hourly_workers":12.7951844343,"non_hourly_workers":6.3130721709,"less_than_high_school":14.195605341,"high_school":11.532603278,"some_college":9.1439883068,"college":6.3162490347,"construction":14.7945619927,"finance":7.8323777058,"manufacturing":10.9413286814},{"date":"05/1/1990","all_workers":9.9537686735,"hourly_workers":12.5596765557,"non_hourly_workers":6.442904994,"less_than_high_school":13.7722778941,"high_school":11.3767089134,"some_college":8.8629959097,"college":6.6625098186,"construction":14.5876034016,"finance":7.1493502673,"manufacturing":10.7455063026},{"date":"06/1/1990","all_workers":9.6980834271,"hourly_workers":12.3744284277,"non_hourly_workers":6.1246560257,"less_than_high_school":13.6035147418,"high_school":11.1507285851,"some_college":8.6191385457,"college":6.4572623641,"construction":15.0432571173,"finance":6.5358475078,"manufacturing":10.2837974149},{"date":"07/1/1990","all_workers":9.672247129,"hourly_workers":12.2347151892,"non_hourly_workers":6.2811931459,"less_than_high_school":13.1613461142,"high_school":11.000209124,"some_college":8.8313389956,"college":6.6239313445,"construction":14.1435683412,"finance":6.9375920434,"manufacturing":10.2884253},{"date":"08/1/1990","all_workers":9.6744333608,"hourly_workers":12.3401008987,"non_hourly_workers":6.1453524195,"less_than_high_school":12.9206580832,"high_school":11.0521035066,"some_college":8.7679280408,"college":6.7130379983,"construction":14.6712280394,"finance":7.3173309784,"manufacturing":9.863159981},{"date":"09/1/1990","all_workers":9.6941811405,"hourly_workers":12.3227990021,"non_hourly_workers":6.2262904228,"less_than_high_school":13.1601909861,"high_school":11.0676303289,"some_college":8.7745916337,"college":6.6581930041,"construction":14.1546803519,"finance":7.7044050617,"manufacturing":9.7773017502},{"date":"10/1/1990","all_workers":9.7667577154,"hourly_workers":12.4331933733,"non_hourly_workers":6.2734385368,"less_than_high_school":13.5986032186,"high_school":10.856874672,"some_college":8.9906827128,"college":6.8135455255,"construction":14.3503207943,"finance":7.8183435928,"manufacturing":9.6122426213},{"date":"11/1/1990","all_workers":9.7041338011,"hourly_workers":12.2980132037,"non_hourly_workers":6.338757557,"less_than_high_school":13.2335488932,"high_school":10.7178669243,"some_college":9.1278532342,"college":6.8264022591,"construction":14.0790732578,"finance":7.7894081218,"manufacturing":9.4119668097},{"date":"12/1/1990","all_workers":9.535516467,"hourly_workers":12.0614838655,"non_hourly_workers":6.3275389877,"less_than_high_school":13.0000298982,"high_school":10.5580013605,"some_college":8.7870684666,"college":6.9081052619,"construction":13.1419054699,"finance":8.1814994109,"manufacturing":9.3351918945},{"date":"01/1/1991","all_workers":9.3957614279,"hourly_workers":11.7830338048,"non_hourly_workers":6.3903228259,"less_than_high_school":12.3858565793,"high_school":10.1271596707,"some_college":9.1627776899,"college":6.7407868358,"construction":12.5759821819,"finance":8.1746047346,"manufacturing":9.1126896922},{"date":"02/1/1991","all_workers":9.2747023654,"hourly_workers":11.6490719645,"non_hourly_workers":6.267380196,"less_than_high_school":12.3309123305,"high_school":9.8715161719,"some_college":9.0575340453,"college":6.7463844274,"construction":12.4037120203,"finance":7.733409854,"manufacturing":9.0727777887},{"date":"03/1/1991","all_workers":9.1985780282,"hourly_workers":11.5480785955,"non_hourly_workers":6.2396169332,"less_than_high_school":12.0837244692,"high_school":9.8126108123,"some_college":8.8863672086,"college":6.8514648594,"construction":12.7974369681,"finance":7.6310412068,"manufacturing":9.0059702887},{"date":"04/1/1991","all_workers":9.136452341,"hourly_workers":11.5780813952,"non_hourly_workers":6.0564122357,"less_than_high_school":12.0722546573,"high_school":10.0139634981,"some_college":8.744625413,"college":6.6021397656,"construction":12.9250549818,"finance":7.7051510936,"manufacturing":8.4381465056},{"date":"05/1/1991","all_workers":9.0760257051,"hourly_workers":11.5778224032,"non_hourly_workers":5.9273714279,"less_than_high_school":12.596168716,"high_school":9.7468424131,"some_college":9.0193401439,"college":6.4172569761,"construction":13.2179390629,"finance":8.6756472996,"manufacturing":8.2939963811},{"date":"06/1/1991","all_workers":9.2146989374,"hourly_workers":11.7318146814,"non_hourly_workers":6.0235356233,"less_than_high_school":12.5670129199,"high_school":9.8619024034,"some_college":9.3020280198,"college":6.3840751693,"construction":13.5348095652,"finance":8.6638502596,"manufacturing":8.3271392937},{"date":"07/1/1991","all_workers":9.2804511528,"hourly_workers":11.9299998327,"non_hourly_workers":5.9062281364,"less_than_high_school":13.1076158082,"high_school":10.0532464305,"some_college":9.1819770973,"college":6.2856530271,"construction":14.5198875173,"finance":8.7262766278,"manufacturing":8.3194720615},{"date":"08/1/1991","all_workers":9.2920878395,"hourly_workers":11.902030344,"non_hourly_workers":6.012489081,"less_than_high_school":13.1730361241,"high_school":9.9872166847,"some_college":9.2605373083,"college":6.2548718278,"construction":13.9853727976,"finance":8.8848093036,"manufacturing":8.7250803656},{"date":"09/1/1991","all_workers":9.3042039903,"hourly_workers":11.8582458793,"non_hourly_workers":6.102927229,"less_than_high_school":13.0645974149,"high_school":10.0111218307,"some_college":9.329151204,"college":6.216177097,"construction":14.00208651,"finance":8.4970868846,"manufacturing":9.0944558697},{"date":"10/1/1991","all_workers":9.3937777605,"hourly_workers":11.9945390244,"non_hourly_workers":6.1170361567,"less_than_high_school":13.3477226579,"high_school":10.2687958688,"some_college":9.2761570812,"college":6.1925924657,"construction":14.3307166552,"finance":8.7191903781,"manufacturing":9.118071819},{"date":"11/1/1991","all_workers":9.397759024,"hourly_workers":11.9046505588,"non_hourly_workers":6.214461082,"less_than_high_school":13.6871138563,"high_school":10.1132077333,"some_college":9.3466196922,"college":6.1028480955,"construction":14.8463407061,"finance":8.3990657958,"manufacturing":9.0077477846},{"date":"12/1/1991","all_workers":9.4891118911,"hourly_workers":12.0069987668,"non_hourly_workers":6.2778551363,"less_than_high_school":13.5154573047,"high_school":10.2491516439,"some_college":9.2653199488,"college":6.3369946849,"construction":14.3019254492,"finance":8.2781406512,"manufacturing":9.2019059303},{"date":"01/1/1992","all_workers":9.6263934389,"hourly_workers":12.0852731123,"non_hourly_workers":6.4842023945,"less_than_high_school":13.9867888473,"high_school":10.3199205185,"some_college":9.383943398,"college":6.4468205941,"construction":14.8187406254,"finance":8.2973818844,"manufacturing":9.3136907848},{"date":"02/1/1992","all_workers":9.8473150676,"hourly_workers":12.4338207735,"non_hourly_workers":6.5580583197,"less_than_high_school":14.4204158832,"high_school":10.6208847171,"some_college":9.4406017111,"college":6.6186946751,"construction":15.4612527053,"finance":8.1261491879,"manufacturing":9.6105333282},{"date":"03/1/1992","all_workers":9.9424084644,"hourly_workers":12.5793996996,"non_hourly_workers":6.5977296398,"less_than_high_school":14.7448857383,"high_school":10.6254624334,"some_college":9.7036396795,"college":6.5957815477,"construction":15.4846595771,"finance":8.230390792,"manufacturing":9.9104088827},{"date":"04/1/1992","all_workers":10.0130320447,"hourly_workers":12.6699200848,"non_hourly_workers":6.6645344278,"less_than_high_school":14.5838001073,"high_school":10.3397678993,"some_college":10.1203331519,"college":6.9066343849,"construction":15.5244332035,"finance":8.3433148398,"manufacturing":10.2681751096},{"date":"05/1/1992","all_workers":10.2183447123,"hourly_workers":12.8449319282,"non_hourly_workers":6.8807154824,"less_than_high_school":14.2899528743,"high_school":10.7592361306,"some_college":10.1712442281,"college":7.0409707708,"construction":16.4263691015,"finance":8.0818175088,"manufacturing":10.1590631475},{"date":"06/1/1992","all_workers":10.3040605585,"hourly_workers":12.9949743975,"non_hourly_workers":6.9282527588,"less_than_high_school":14.5707603196,"high_school":10.8522380589,"some_college":10.1184607663,"college":7.1861935508,"construction":15.8362431955,"finance":8.3769409187,"manufacturing":10.2176982893},{"date":"07/1/1992","all_workers":10.3743303651,"hourly_workers":13.1148498682,"non_hourly_workers":6.9169883359,"less_than_high_school":14.6477850892,"high_school":10.9405446948,"some_college":10.1539093404,"college":7.1876405438,"construction":14.7907036457,"finance":8.0677349952,"manufacturing":10.1514684591},{"date":"08/1/1992","all_workers":10.382995358,"hourly_workers":13.1940301814,"non_hourly_workers":6.8104696348,"less_than_high_school":14.9215783739,"high_school":10.97178636,"some_college":10.077043403,"college":7.1277838474,"construction":14.9910420756,"finance":7.7757341453,"manufacturing":9.8748450138},{"date":"09/1/1992","all_workers":10.4526706211,"hourly_workers":13.3109445993,"non_hourly_workers":6.8268734395,"less_than_high_school":15.3909739972,"high_school":11.0505153225,"some_college":9.8666741969,"college":7.3106819006,"construction":15.2097186839,"finance":7.7446797963,"manufacturing":9.6152952101},{"date":"10/1/1992","all_workers":10.4030458816,"hourly_workers":13.2363820046,"non_hourly_workers":6.8062736546,"less_than_high_school":14.6920669753,"high_school":11.2195994026,"some_college":9.8106839454,"college":7.2364564163,"construction":15.6804451484,"finance":7.479324299,"manufacturing":9.6356255975},{"date":"11/1/1992","all_workers":10.5390904621,"hourly_workers":13.5735062594,"non_hourly_workers":6.6848134844,"less_than_high_school":15.1944272265,"high_school":11.315662143,"some_college":10.0414049962,"college":7.3276811732,"construction":16.4743997826,"finance":7.5472021441,"manufacturing":9.637318659},{"date":"12/1/1992","all_workers":10.4227979973,"hourly_workers":13.4310802093,"non_hourly_workers":6.5951727074,"less_than_high_school":15.3120050549,"high_school":11.0218575577,"some_college":10.2927489205,"college":7.0984067275,"construction":16.7374680518,"finance":7.5006455178,"manufacturing":9.5700283825},{"date":"01/1/1993","all_workers":10.4159509324,"hourly_workers":13.4966293206,"non_hourly_workers":6.4720119309,"less_than_high_school":14.7614160526,"high_school":11.2515549482,"some_college":10.0595431716,"college":7.1691554133,"construction":16.4245190868,"finance":7.2136723572,"manufacturing":9.6827026998},{"date":"02/1/1993","all_workers":10.3614691861,"hourly_workers":13.3857542586,"non_hourly_workers":6.4949446371,"less_than_high_school":14.8228687172,"high_school":11.2186285044,"some_college":9.9845787086,"college":7.0858381688,"construction":16.1551589523,"finance":7.4309287011,"manufacturing":9.4417093786},{"date":"03/1/1993","all_workers":10.3470611477,"hourly_workers":13.3729764675,"non_hourly_workers":6.4575245036,"less_than_high_school":14.5215920779,"high_school":11.2105368701,"some_college":10.1638027637,"college":7.0042232723,"construction":16.7670127026,"finance":7.5879984213,"manufacturing":9.2726726713},{"date":"04/1/1993","all_workers":10.3756149315,"hourly_workers":13.3730713002,"non_hourly_workers":6.5092373727,"less_than_high_school":14.7969032604,"high_school":11.4570215973,"some_college":9.943011343,"college":6.8423704933,"construction":16.9306260964,"finance":7.3488416386,"manufacturing":9.6748392721},{"date":"05/1/1993","all_workers":10.273620693,"hourly_workers":13.3439327267,"non_hourly_workers":6.3355253961,"less_than_high_school":15.3975254431,"high_school":11.3193343731,"some_college":9.803962538,"college":6.5858594082,"construction":16.2021340083,"finance":7.1077116991,"manufacturing":9.8074749666},{"date":"06/1/1993","all_workers":10.2848891899,"hourly_workers":13.2771453898,"non_hourly_workers":6.3915250956,"less_than_high_school":15.6888386135,"high_school":11.1870785306,"some_college":9.9269950632,"college":6.5968554861,"construction":16.1028746515,"finance":6.9659828267,"manufacturing":9.5733416511},{"date":"07/1/1993","all_workers":10.2803519157,"hourly_workers":13.2079490578,"non_hourly_workers":6.4837165,"less_than_high_school":15.8602794679,"high_school":11.1591698058,"some_college":10.0583102274,"college":6.4376748407,"construction":16.9867671845,"finance":7.2846297556,"manufacturing":9.8268162324},{"date":"08/1/1993","all_workers":10.2916347769,"hourly_workers":13.1566155177,"non_hourly_workers":6.5923552767,"less_than_high_school":15.9462954686,"high_school":11.1979726623,"some_college":10.2168100795,"college":6.3154735767,"construction":16.4717174177,"finance":7.1738529463,"manufacturing":10.0696307261},{"date":"09/1/1993","all_workers":10.2724991725,"hourly_workers":13.1220999564,"non_hourly_workers":6.5638816938,"less_than_high_school":15.7975293338,"high_school":11.1367975058,"some_college":10.3080870093,"college":6.3303189691,"construction":16.2605350509,"finance":7.190996157,"manufacturing":10.1146133198},{"date":"10/1/1993","all_workers":10.3694953455,"hourly_workers":13.2423940842,"non_hourly_workers":6.6185485397,"less_than_high_school":15.9166503214,"high_school":10.9734333465,"some_college":10.6008981579,"college":6.54273382,"construction":15.5475554178,"finance":7.3244077874,"manufacturing":10.6497801729},{"date":"11/1/1993","all_workers":10.3384304723,"hourly_workers":13.1897335767,"non_hourly_workers":6.6221988257,"less_than_high_school":15.3632299516,"high_school":11.142919384,"some_college":10.3312471191,"college":6.6230747216,"construction":14.7575401278,"finance":7.4827524315,"manufacturing":11.1057265629},{"date":"12/1/1993","all_workers":10.4768676873,"hourly_workers":13.405170046,"non_hourly_workers":6.6664828583,"less_than_high_school":15.1244375283,"high_school":11.4300170295,"some_college":10.5146441759,"college":6.5922649394,"construction":15.0225408448,"finance":7.7148568211,"manufacturing":10.9487180662},{"date":"01/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/1/1994","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/1/1995","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"09/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"10/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"11/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"12/1/1996","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"01/1/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"02/1/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"03/1/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"04/1/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"05/1/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"06/1/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"07/1/1997","all_workers":null,"hourly_workers":null,"non_hourly_workers":null,"less_than_high_school":null,"high_school":null,"some_college":null,"college":null,"construction":null,"finance":null,"manufacturing":null},{"date":"08/1/1997","all_workers":11.2226239938,"hourly_workers":14.8480876257,"non_hourly_workers":6.3303910062,"less_than_high_school":18.2821814942,"high_school":12.3925064784,"some_college":11.5759243276,"college":7.4374243356,"construction":15.8485183342,"finance":10.3835113403,"manufacturing":10.5743490593},{"date":"09/1/1997","all_workers":11.0200947821,"hourly_workers":14.5234154335,"non_hourly_workers":6.2785349869,"less_than_high_school":18.3714846124,"high_school":12.2046052167,"some_college":11.3459296256,"college":7.1812724818,"construction":16.3075363692,"finance":10.582886247,"manufacturing":10.4752399517},{"date":"10/1/1997","all_workers":11.1403695073,"hourly_workers":14.6116706526,"non_hourly_workers":6.4357518169,"less_than_high_school":17.3781607756,"high_school":12.2108304881,"some_college":11.7803380269,"college":7.4065337666,"construction":16.4360124592,"finance":10.5403356562,"manufacturing":10.6053641283},{"date":"11/1/1997","all_workers":11.0644115571,"hourly_workers":14.2686871805,"non_hourly_workers":6.7129543242,"less_than_high_school":17.3520624991,"high_school":12.0191449454,"some_college":11.5834635858,"college":7.5064325623,"construction":16.3248176235,"finance":10.2857432131,"manufacturing":10.8813639297},{"date":"12/1/1997","all_workers":11.0809570448,"hourly_workers":14.384926274,"non_hourly_workers":6.6726276498,"less_than_high_school":16.6963212747,"high_school":12.1046565837,"some_college":11.6139250524,"college":7.6656731472,"construction":16.5417820482,"finance":10.4518379436,"manufacturing":10.9233136512},{"date":"01/1/1998","all_workers":11.0870896023,"hourly_workers":14.5580537354,"non_hourly_workers":6.4327046869,"less_than_high_school":16.5610354746,"high_school":12.4266836321,"some_college":11.4750664814,"college":7.5069833754,"construction":17.8135828319,"finance":10.3492977611,"manufacturing":11.0905948138},{"date":"02/1/1998","all_workers":10.8155501056,"hourly_workers":14.3496901394,"non_hourly_workers":6.1336559181,"less_than_high_school":15.7309048371,"high_school":12.4624181741,"some_college":11.1422484295,"college":7.2074501046,"construction":18.2529649914,"finance":10.0735472246,"manufacturing":10.4741781359},{"date":"03/1/1998","all_workers":10.9064471422,"hourly_workers":14.5251561312,"non_hourly_workers":6.148632541,"less_than_high_school":15.5522636436,"high_school":12.4977509234,"some_college":11.2180840481,"college":7.4047212795,"construction":17.8805149603,"finance":10.1176576474,"manufacturing":10.5023543595},{"date":"04/1/1998","all_workers":10.6229940556,"hourly_workers":14.188931105,"non_hourly_workers":5.9684440875,"less_than_high_school":14.9610578827,"high_school":12.0705102924,"some_college":11.0564504397,"college":7.2731765479,"construction":17.264379529,"finance":8.8382420437,"manufacturing":9.992697133},{"date":"05/1/1998","all_workers":10.472154083,"hourly_workers":13.9986620067,"non_hourly_workers":5.8597624057,"less_than_high_school":14.9238801095,"high_school":11.734986275,"some_college":11.2820387424,"college":6.9691712778,"construction":16.7777280503,"finance":8.5398598455,"manufacturing":10.2061457367},{"date":"06/1/1998","all_workers":10.4987218933,"hourly_workers":14.2236316823,"non_hourly_workers":5.6161798165,"less_than_high_school":15.1146190191,"high_school":12.1269801867,"some_college":11.1857603391,"college":6.6880193695,"construction":16.2972654715,"finance":9.0689918307,"manufacturing":10.2191011017},{"date":"07/1/1998","all_workers":10.4278095293,"hourly_workers":14.0846161224,"non_hourly_workers":5.493800469,"less_than_high_school":14.8682538972,"high_school":12.1241185922,"some_college":11.1141938923,"college":6.5086731087,"construction":16.8069173354,"finance":8.9272131057,"manufacturing":10.2732488545},{"date":"08/1/1998","all_workers":10.3071575299,"hourly_workers":13.943610501,"non_hourly_workers":5.409867802,"less_than_high_school":13.6162807649,"high_school":12.2349258525,"some_college":11.0611718485,"college":6.5094512913,"construction":15.1710085183,"finance":8.3245047783,"manufacturing":10.4964769081},{"date":"09/1/1998","all_workers":10.573995204,"hourly_workers":14.3032604202,"non_hourly_workers":5.5524781322,"less_than_high_school":13.9293853311,"high_school":12.5201322678,"some_college":11.2007251507,"college":6.8322821201,"construction":14.6427955159,"finance":9.2008142075,"manufacturing":10.7732575648},{"date":"10/1/1998","all_workers":10.4267472879,"hourly_workers":14.1075534428,"non_hourly_workers":5.5052342228,"less_than_high_school":14.3740194651,"high_school":12.4733735757,"some_college":10.70523627,"college":6.7212918114,"construction":14.3967726596,"finance":9.1908258994,"manufacturing":10.7854993658},{"date":"11/1/1998","all_workers":10.4775778692,"hourly_workers":14.250747476,"non_hourly_workers":5.4633821599,"less_than_high_school":14.0222302048,"high_school":12.5070334821,"some_college":10.843185605,"college":6.8127157229,"construction":13.8661516526,"finance":8.9504313712,"manufacturing":10.8231999817},{"date":"12/1/1998","all_workers":10.4479648864,"hourly_workers":14.1798979491,"non_hourly_workers":5.4577901608,"less_than_high_school":14.3957832332,"high_school":12.3724202999,"some_college":10.8235246537,"college":6.7664226343,"construction":13.4488763047,"finance":8.4076464628,"manufacturing":10.3544693241},{"date":"01/1/1999","all_workers":10.2679350868,"hourly_workers":13.8628351749,"non_hourly_workers":5.4812567036,"less_than_high_school":14.3030044339,"high_school":12.0885806439,"some_college":10.7840717504,"college":6.5313165017,"construction":11.8797575265,"finance":8.4824906182,"manufacturing":9.9874608163},{"date":"02/1/1999","all_workers":10.2954383051,"hourly_workers":13.8260843796,"non_hourly_workers":5.56974908,"less_than_high_school":14.7562603061,"high_school":11.9550717473,"some_college":10.5808240883,"college":6.7671718914,"construction":11.7069363606,"finance":8.1824945526,"manufacturing":10.3036700447},{"date":"03/1/1999","all_workers":10.2391248675,"hourly_workers":13.7271323504,"non_hourly_workers":5.5432555168,"less_than_high_school":14.3683256937,"high_school":12.066194268,"some_college":10.5510901768,"college":6.6645924067,"construction":11.9556339256,"finance":7.9696016876,"manufacturing":10.2646280106},{"date":"04/1/1999","all_workers":10.4397681083,"hourly_workers":14.0867402108,"non_hourly_workers":5.5638095547,"less_than_high_school":14.5583161124,"high_school":12.3427427734,"some_college":10.6723473306,"college":6.902280028,"construction":12.5959140781,"finance":8.5652492961,"manufacturing":10.6552065115},{"date":"05/1/1999","all_workers":10.5798214232,"hourly_workers":14.1712053326,"non_hourly_workers":5.8062527976,"less_than_high_school":14.8483815934,"high_school":12.7066927536,"some_college":10.7082885097,"college":6.8479229303,"construction":13.6050419506,"finance":8.3605253085,"manufacturing":10.3011940186},{"date":"06/1/1999","all_workers":10.3504149368,"hourly_workers":13.7966656906,"non_hourly_workers":5.7422197853,"less_than_high_school":14.3791956911,"high_school":12.1182694153,"some_college":10.3790519663,"college":7.1442605586,"construction":12.9721128229,"finance":7.7787895549,"manufacturing":9.8456922859},{"date":"07/1/1999","all_workers":10.4437705746,"hourly_workers":13.9329630567,"non_hourly_workers":5.8943226473,"less_than_high_school":14.6850514492,"high_school":12.298875801,"some_college":10.582005579,"college":7.0215494109,"construction":12.6651775674,"finance":7.7658635528,"manufacturing":10.3267496117},{"date":"08/1/1999","all_workers":10.410806221,"hourly_workers":13.969669061,"non_hourly_workers":5.8088583686,"less_than_high_school":15.1504739594,"high_school":12.3765139262,"some_college":10.2737111254,"college":6.993615435,"construction":12.6462818181,"finance":7.7458661912,"manufacturing":10.244859407},{"date":"09/1/1999","all_workers":10.3515892148,"hourly_workers":13.8558000836,"non_hourly_workers":5.8301994695,"less_than_high_school":15.050225437,"high_school":12.2729407116,"some_college":10.2156928972,"college":7.0731295651,"construction":13.0012899459,"finance":6.9257732101,"manufacturing":9.8163242006},{"date":"10/1/1999","all_workers":10.4673635826,"hourly_workers":14.1029036215,"non_hourly_workers":5.7902543197,"less_than_high_school":15.1634309553,"high_school":12.4487485713,"some_college":10.4573042118,"college":7.0228709547,"construction":13.0710533353,"finance":7.2158494014,"manufacturing":10.1447241011},{"date":"11/1/1999","all_workers":10.306227801,"hourly_workers":14.0005081345,"non_hourly_workers":5.6149041107,"less_than_high_school":14.9473629152,"high_school":12.3694693158,"some_college":10.2985100672,"college":6.8421420861,"construction":12.6958028257,"finance":7.032167215,"manufacturing":10.3542740758},{"date":"12/1/1999","all_workers":10.3545782426,"hourly_workers":14.0444245184,"non_hourly_workers":5.7196384731,"less_than_high_school":15.1234306968,"high_school":12.6974867808,"some_college":10.0630567481,"college":6.9100690045,"construction":13.4138452459,"finance":7.2888142911,"manufacturing":10.8040022195},{"date":"01/1/2000","all_workers":10.6051763411,"hourly_workers":14.4228737233,"non_hourly_workers":5.7826149442,"less_than_high_school":16.1966508913,"high_school":12.7245213192,"some_college":10.1555683287,"college":7.3657279162,"construction":14.1030473058,"finance":7.2459231966,"manufacturing":10.800506387},{"date":"02/1/2000","all_workers":10.68094088,"hourly_workers":14.5376205824,"non_hourly_workers":5.8189967029,"less_than_high_school":16.4022069133,"high_school":12.7976183358,"some_college":10.4061625872,"college":7.2704161312,"construction":14.1659257559,"finance":7.7962881038,"manufacturing":10.6740356342},{"date":"03/1/2000","all_workers":10.7673052869,"hourly_workers":14.6385134451,"non_hourly_workers":5.9362504164,"less_than_high_school":16.2648875962,"high_school":12.8696860772,"some_college":10.4693458515,"college":7.4697347865,"construction":14.6055835308,"finance":8.3743255527,"manufacturing":10.6280329633},{"date":"04/1/2000","all_workers":10.6187303164,"hourly_workers":14.2974505526,"non_hourly_workers":5.9998226058,"less_than_high_school":16.5815892068,"high_school":12.7613882657,"some_college":10.307674718,"college":7.1443143871,"construction":13.9467921578,"finance":8.8583963107,"manufacturing":10.3358071008},{"date":"05/1/2000","all_workers":10.7634566502,"hourly_workers":14.5667859311,"non_hourly_workers":5.9603184543,"less_than_high_school":17.2191712708,"high_school":12.5985595334,"some_college":10.4377603078,"college":7.4573595071,"construction":13.5713238107,"finance":9.4828722988,"manufacturing":10.7313270668},{"date":"06/1/2000","all_workers":11.1601653749,"hourly_workers":15.0240350753,"non_hourly_workers":6.3386791307,"less_than_high_school":18.0667541102,"high_school":13.3028943226,"some_college":11.1269743014,"college":7.2627639961,"construction":14.5819435771,"finance":9.4535926558,"manufacturing":11.2199410476},{"date":"07/1/2000","all_workers":10.9918080704,"hourly_workers":14.8801504165,"non_hourly_workers":6.1341143088,"less_than_high_school":17.8372454931,"high_school":13.2776334394,"some_college":10.7327327627,"college":7.1848928261,"construction":13.7899189778,"finance":9.4257796167,"manufacturing":10.7816254286},{"date":"08/1/2000","all_workers":11.2094225765,"hourly_workers":15.1189488927,"non_hourly_workers":6.2947706517,"less_than_high_school":17.0870037786,"high_school":13.5387802427,"some_college":11.0990844664,"college":7.5376335777,"construction":15.4109734701,"finance":9.1814370286,"manufacturing":11.0618386448},{"date":"09/1/2000","all_workers":11.1328308471,"hourly_workers":15.1390243655,"non_hourly_workers":6.1885362006,"less_than_high_school":17.155323575,"high_school":13.4656950024,"some_college":11.1722688436,"college":7.2985137346,"construction":16.105574374,"finance":9.3108306426,"manufacturing":10.9598429394},{"date":"10/1/2000","all_workers":11.2345276532,"hourly_workers":15.1672406288,"non_hourly_workers":6.3361496371,"less_than_high_school":17.571527192,"high_school":13.5058208857,"some_college":10.9482049611,"college":7.681345964,"construction":16.4966452473,"finance":9.4997624823,"manufacturing":11.0283226526},{"date":"11/1/2000","all_workers":11.2450170822,"hourly_workers":15.0021843168,"non_hourly_workers":6.5589721518,"less_than_high_school":18.5243006488,"high_school":13.1424923828,"some_college":10.8203613098,"college":7.9565835893,"construction":16.7927182066,"finance":9.5556126538,"manufacturing":10.8438665982},{"date":"12/1/2000","all_workers":11.3128685738,"hourly_workers":14.9581712002,"non_hourly_workers":6.7498301807,"less_than_high_school":18.5086706292,"high_school":12.809497558,"some_college":11.2346624099,"college":8.0945892316,"construction":15.6464216618,"finance":9.9566648391,"manufacturing":10.8867119291},{"date":"01/1/2001","all_workers":11.4370220885,"hourly_workers":14.9534012942,"non_hourly_workers":7.0204238486,"less_than_high_school":18.1454153086,"high_school":12.8883716644,"some_college":11.5029646847,"college":8.2159121898,"construction":15.8632616604,"finance":10.4742947213,"manufacturing":11.1379093627},{"date":"02/1/2001","all_workers":11.337831125,"hourly_workers":14.877697213,"non_hourly_workers":6.8954477184,"less_than_high_school":17.8177922065,"high_school":12.8573041261,"some_college":11.3361029564,"college":8.1736969818,"construction":15.7967385416,"finance":10.0816023734,"manufacturing":10.8777658721},{"date":"03/1/2001","all_workers":11.4556187621,"hourly_workers":15.0187279672,"non_hourly_workers":6.9739282065,"less_than_high_school":18.227949069,"high_school":13.0274468217,"some_college":11.5276262685,"college":8.1342146487,"construction":16.6319405283,"finance":9.7376103653,"manufacturing":11.4343032571},{"date":"04/1/2001","all_workers":11.4728078728,"hourly_workers":14.970093567,"non_hourly_workers":7.1046019913,"less_than_high_school":18.4925809342,"high_school":12.7391353646,"some_college":11.7000362595,"college":8.2862717137,"construction":17.6835238715,"finance":8.9694974759,"manufacturing":11.8675186563},{"date":"05/1/2001","all_workers":11.3737273711,"hourly_workers":14.7872141944,"non_hourly_workers":7.11689288,"less_than_high_school":17.4905093112,"high_school":13.1064362075,"some_college":11.4454938817,"college":8.2092700774,"construction":16.7744075195,"finance":8.9597754004,"manufacturing":11.8650714446},{"date":"06/1/2001","all_workers":11.2306895364,"hourly_workers":14.7561937997,"non_hourly_workers":6.7563725577,"less_than_high_school":17.2228478249,"high_school":13.0297821677,"some_college":11.1031221361,"college":8.11641881,"construction":16.1181495374,"finance":8.8844186264,"manufacturing":12.0262065427},{"date":"07/1/2001","all_workers":11.3013870624,"hourly_workers":14.6595919386,"non_hourly_workers":7.0697730445,"less_than_high_school":17.1206080153,"high_school":13.0061374161,"some_college":11.3042205626,"college":8.2628876282,"construction":16.8007185367,"finance":8.9240208694,"manufacturing":12.1763066496},{"date":"08/1/2001","all_workers":11.0839206791,"hourly_workers":14.2786776674,"non_hourly_workers":7.0850441851,"less_than_high_school":17.421942159,"high_school":12.7780161162,"some_college":10.9331048872,"college":8.0513472818,"construction":15.8261439284,"finance":9.6699422919,"manufacturing":12.104121428},{"date":"09/1/2001","all_workers":11.2506258271,"hourly_workers":14.3243888754,"non_hourly_workers":7.3994593539,"less_than_high_school":17.5273618041,"high_school":12.7611341728,"some_college":11.0382751991,"college":8.4128566874,"construction":14.8842762628,"finance":9.2839535159,"manufacturing":12.7769561365},{"date":"10/1/2001","all_workers":11.1692161955,"hourly_workers":14.3242136565,"non_hourly_workers":7.2796289665,"less_than_high_school":17.4193446252,"high_school":12.6645278222,"some_college":11.1862888203,"college":8.1390500798,"construction":14.2437522258,"finance":8.5403315137,"manufacturing":12.7767968634},{"date":"11/1/2001","all_workers":11.297282968,"hourly_workers":14.5721345975,"non_hourly_workers":7.2461841126,"less_than_high_school":16.8156475021,"high_school":13.3180653897,"some_college":11.1333250901,"college":8.0976816964,"construction":14.5096890381,"finance":8.9598116662,"manufacturing":12.7099556921},{"date":"12/1/2001","all_workers":11.4029700958,"hourly_workers":14.7534494093,"non_hourly_workers":7.2423334867,"less_than_high_school":16.9351051462,"high_school":13.8084370094,"some_college":10.925063613,"college":8.1200623932,"construction":15.7728338169,"finance":8.5141277496,"manufacturing":13.1854972385},{"date":"01/1/2002","all_workers":11.2399813499,"hourly_workers":14.7373133575,"non_hourly_workers":6.9964402455,"less_than_high_school":16.0430902504,"high_school":14.1641241889,"some_college":10.6674849659,"college":7.7630774554,"construction":14.9025622566,"finance":8.2937338446,"manufacturing":13.717260665},{"date":"02/1/2002","all_workers":11.5134295744,"hourly_workers":15.010158743,"non_hourly_workers":7.2204549583,"less_than_high_school":16.7840250943,"high_school":14.7099378595,"some_college":10.7333009871,"college":7.8857256375,"construction":15.4561992612,"finance":9.4653512509,"manufacturing":14.333527043},{"date":"03/1/2002","all_workers":11.4712870755,"hourly_workers":14.9092013299,"non_hourly_workers":7.2572592174,"less_than_high_school":17.1706490985,"high_school":14.3545841817,"some_college":10.7739897677,"college":7.8889372363,"construction":14.2746771817,"finance":9.4001742362,"manufacturing":14.0520909451},{"date":"04/1/2002","all_workers":11.6960495002,"hourly_workers":15.2135539208,"non_hourly_workers":7.3831659208,"less_than_high_school":17.0812357233,"high_school":14.8835915222,"some_college":10.7096464892,"college":8.1519454834,"construction":13.9463215224,"finance":9.4879875117,"manufacturing":14.0645684343},{"date":"05/1/2002","all_workers":11.6753006979,"hourly_workers":15.1950579208,"non_hourly_workers":7.3785029195,"less_than_high_school":17.3385560972,"high_school":14.5251458962,"some_college":10.999536176,"college":8.068645627,"construction":14.1505568048,"finance":9.4090153139,"manufacturing":14.2449879323},{"date":"06/1/2002","all_workers":11.6730046764,"hourly_workers":15.0384443227,"non_hourly_workers":7.648790973,"less_than_high_school":16.8090841184,"high_school":14.42498358,"some_college":11.3833831522,"college":8.0013317005,"construction":14.3795962133,"finance":9.9557322254,"manufacturing":14.2597841642},{"date":"07/1/2002","all_workers":11.6942717625,"hourly_workers":15.2149024534,"non_hourly_workers":7.4373850813,"less_than_high_school":17.0206473124,"high_school":14.3408370127,"some_college":11.2311065139,"college":8.2507007888,"construction":14.2802340846,"finance":10.0149692283,"manufacturing":14.3458549654},{"date":"08/1/2002","all_workers":11.8979510837,"hourly_workers":15.5987315295,"non_hourly_workers":7.4143818226,"less_than_high_school":17.892217072,"high_school":14.2818637586,"some_college":11.6896966455,"college":8.2922260371,"construction":14.5258860621,"finance":9.5690967474,"manufacturing":14.6358131266},{"date":"09/1/2002","all_workers":11.9748066952,"hourly_workers":15.8694851996,"non_hourly_workers":7.2185724372,"less_than_high_school":18.3003008735,"high_school":14.5383233931,"some_college":11.7435326624,"college":8.2327590988,"construction":15.4203023978,"finance":10.4289725598,"manufacturing":14.7318580185},{"date":"10/1/2002","all_workers":12.0230559816,"hourly_workers":15.8701764439,"non_hourly_workers":7.2954531923,"less_than_high_school":17.9615610311,"high_school":14.9436685772,"some_college":11.5287156963,"college":8.3704726052,"construction":15.790870264,"finance":10.7462555735,"manufacturing":14.3912513602},{"date":"11/1/2002","all_workers":12.139505765,"hourly_workers":16.1683942134,"non_hourly_workers":7.2124201768,"less_than_high_school":17.868551879,"high_school":15.4483052608,"some_college":11.999548734,"college":7.9791039152,"construction":15.5393137425,"finance":10.3088562085,"manufacturing":14.5576323843},{"date":"12/1/2002","all_workers":12.0697421279,"hourly_workers":16.1178941825,"non_hourly_workers":7.0996457322,"less_than_high_school":17.5317871521,"high_school":15.3647678961,"some_college":12.1474156897,"college":7.773705843,"construction":15.4818904716,"finance":10.1380122276,"manufacturing":14.1229112861},{"date":"01/1/2003","all_workers":12.3257166863,"hourly_workers":16.3079772161,"non_hourly_workers":7.3611145941,"less_than_high_school":18.2303105655,"high_school":15.4682664626,"some_college":12.2744126024,"college":8.1332247426,"construction":16.6164722401,"finance":10.0757839865,"manufacturing":14.0262969934},{"date":"02/1/2003","all_workers":12.1919035523,"hourly_workers":16.1283639262,"non_hourly_workers":7.3097968114,"less_than_high_school":18.1578832527,"high_school":15.109535429,"some_college":12.0288259747,"college":8.2848115827,"construction":15.9027670153,"finance":9.8550052529,"manufacturing":13.7972515306},{"date":"03/1/2003","all_workers":12.2930044097,"hourly_workers":16.3652927679,"non_hourly_workers":7.2315382908,"less_than_high_school":18.7052019193,"high_school":15.391198816,"some_college":11.9944977664,"college":8.1926847444,"construction":16.9334348026,"finance":9.9998842494,"manufacturing":14.3961338895},{"date":"04/1/2003","all_workers":12.2332332235,"hourly_workers":16.4037051808,"non_hourly_workers":6.985678271,"less_than_high_school":18.6798848227,"high_school":15.3308693024,"some_college":12.2336660272,"college":7.7892274614,"construction":16.2410521519,"finance":10.1137854381,"manufacturing":14.4346350096},{"date":"05/1/2003","all_workers":12.2149996008,"hourly_workers":16.3031796982,"non_hourly_workers":7.0250415136,"less_than_high_school":18.9898143545,"high_school":15.3277867002,"some_college":12.0931524171,"college":7.8092553136,"construction":17.2591275808,"finance":9.8400058999,"manufacturing":13.950541314},{"date":"06/1/2003","all_workers":12.4071064595,"hourly_workers":16.446949878,"non_hourly_workers":7.2583155633,"less_than_high_school":19.9717351182,"high_school":15.5236710737,"some_college":11.6969563924,"college":8.2983491457,"construction":17.3556336026,"finance":9.1888704011,"manufacturing":13.9438223734},{"date":"07/1/2003","all_workers":12.6397282198,"hourly_workers":16.7610376423,"non_hourly_workers":7.3918197042,"less_than_high_school":19.9833333399,"high_school":15.8347472814,"some_college":12.2899615223,"college":8.2094657815,"construction":18.5553753233,"finance":9.8107056208,"manufacturing":13.8763909554},{"date":"08/1/2003","all_workers":12.6731404035,"hourly_workers":16.9351596667,"non_hourly_workers":7.3305145964,"less_than_high_school":20.0438959003,"high_school":16.0116346464,"some_college":12.0572809985,"college":8.4156335559,"construction":19.2693432255,"finance":9.8997816485,"manufacturing":13.9763787058},{"date":"09/1/2003","all_workers":12.8294239238,"hourly_workers":16.9719192607,"non_hourly_workers":7.550339107,"less_than_high_school":20.2123021156,"high_school":15.8709900398,"some_college":12.1876540824,"college":8.7885212761,"construction":18.8529170026,"finance":9.3827924313,"manufacturing":14.0285791882},{"date":"10/1/2003","all_workers":12.9136579033,"hourly_workers":17.0819167769,"non_hourly_workers":7.5477752048,"less_than_high_school":19.318778366,"high_school":16.0763698954,"some_college":12.4278826954,"college":8.7507735749,"construction":19.6840688917,"finance":9.5780577231,"manufacturing":14.7070200499},{"date":"11/1/2003","all_workers":12.817558796,"hourly_workers":16.7615273588,"non_hourly_workers":7.6786689573,"less_than_high_school":19.7846669355,"high_school":15.2543161633,"some_college":12.3902803981,"college":9.0464790651,"construction":21.360942788,"finance":9.6265142413,"manufacturing":14.633077571},{"date":"12/1/2003","all_workers":13.0153144525,"hourly_workers":17.0152902907,"non_hourly_workers":7.8007289741,"less_than_high_school":20.4448375282,"high_school":15.2681446918,"some_college":12.557863847,"college":9.3663972878,"construction":21.6728138024,"finance":10.0803131899,"manufacturing":15.3799991249},{"date":"01/1/2004","all_workers":12.8318844118,"hourly_workers":16.7577282684,"non_hourly_workers":7.6939587867,"less_than_high_school":20.7301851317,"high_school":14.9124249196,"some_college":12.4443523282,"college":9.1978734947,"construction":21.5092582086,"finance":10.0276102524,"manufacturing":14.9921183009},{"date":"02/1/2004","all_workers":13.0054119321,"hourly_workers":17.0878955829,"non_hourly_workers":7.6644934887,"less_than_high_school":19.9781315125,"high_school":15.209671437,"some_college":12.9747951813,"college":9.157948132,"construction":21.9403090547,"finance":9.5826290553,"manufacturing":15.3221193272},{"date":"03/1/2004","all_workers":12.993827681,"hourly_workers":17.166680798,"non_hourly_workers":7.5796288138,"less_than_high_school":19.1875736389,"high_school":15.1301564893,"some_college":13.182466504,"college":9.3208228919,"construction":21.9145502492,"finance":9.8604217904,"manufacturing":14.723674811},{"date":"04/1/2004","all_workers":13.114412982,"hourly_workers":17.4146936919,"non_hourly_workers":7.5491124211,"less_than_high_school":19.4151743717,"high_school":15.0925129602,"some_college":13.2553653286,"college":9.6021616216,"construction":23.0546489415,"finance":10.2363060779,"manufacturing":14.7658644207},{"date":"05/1/2004","all_workers":13.3990232829,"hourly_workers":17.8488004496,"non_hourly_workers":7.7104943392,"less_than_high_school":19.6322252067,"high_school":15.4035851993,"some_college":13.523581779,"college":9.8514857446,"construction":21.6402209508,"finance":10.1779303516,"manufacturing":15.7557986323},{"date":"06/1/2004","all_workers":13.506374953,"hourly_workers":18.1050754101,"non_hourly_workers":7.6490644395,"less_than_high_school":20.2008817336,"high_school":15.1225124576,"some_college":13.7924194297,"college":10.0516142966,"construction":22.1764523631,"finance":11.420074999,"manufacturing":15.905792195},{"date":"07/1/2004","all_workers":13.4595701132,"hourly_workers":18.0439158382,"non_hourly_workers":7.6239548445,"less_than_high_school":19.8160767972,"high_school":15.0966031222,"some_college":13.7200724823,"college":10.0390875415,"construction":21.1598098455,"finance":10.9163840173,"manufacturing":16.171160982},{"date":"08/1/2004","all_workers":13.5093923024,"hourly_workers":17.9694502171,"non_hourly_workers":7.7265715722,"less_than_high_school":19.4986662415,"high_school":15.3709778654,"some_college":13.7474105475,"college":9.9736095654,"construction":20.6380236329,"finance":10.5190261151,"manufacturing":15.5674139922},{"date":"09/1/2004","all_workers":13.076509861,"hourly_workers":17.4912687554,"non_hourly_workers":7.4424089692,"less_than_high_school":18.6177176409,"high_school":15.1374017081,"some_college":13.6649428642,"college":9.1897760101,"construction":20.4816432428,"finance":10.7250956725,"manufacturing":15.0367447768},{"date":"10/1/2004","all_workers":13.117979404,"hourly_workers":17.5450001485,"non_hourly_workers":7.3948009119,"less_than_high_school":19.7170385955,"high_school":14.8056767009,"some_college":13.8540612383,"college":9.1862673263,"construction":19.6155182955,"finance":11.3515234676,"manufacturing":14.7379251512},{"date":"11/1/2004","all_workers":13.1586008914,"hourly_workers":17.7083702606,"non_hourly_workers":7.2994140184,"less_than_high_school":19.9612360241,"high_school":14.8941800976,"some_college":13.7716480694,"college":9.2702918722,"construction":18.22193069,"finance":11.7137848618,"manufacturing":15.0158314574},{"date":"12/1/2004","all_workers":13.1403094361,"hourly_workers":17.67221906,"non_hourly_workers":7.3052629696,"less_than_high_school":19.7992841668,"high_school":14.8865736898,"some_college":13.9303034356,"college":9.1066181187,"construction":16.986587654,"finance":11.7010735893,"manufacturing":14.5458291126},{"date":"01/1/2005","all_workers":13.136990749,"hourly_workers":17.7578423913,"non_hourly_workers":7.2482180059,"less_than_high_school":19.5610162142,"high_school":14.883496615,"some_college":13.9616073501,"college":9.1471548756,"construction":16.8885792332,"finance":11.9983906971,"manufacturing":14.6178647145},{"date":"02/1/2005","all_workers":13.1484623191,"hourly_workers":17.6224580295,"non_hourly_workers":7.5099722466,"less_than_high_school":20.0029554318,"high_school":14.3686675059,"some_college":13.9402411163,"college":9.5059860191,"construction":17.2985070885,"finance":11.6475932142,"manufacturing":14.198936152},{"date":"03/1/2005","all_workers":13.1685832111,"hourly_workers":17.5144606702,"non_hourly_workers":7.6350294691,"less_than_high_school":20.2537500974,"high_school":14.7357071487,"some_college":13.6897536438,"college":9.4071031854,"construction":16.5713973722,"finance":10.834076644,"manufacturing":14.4810462466},{"date":"04/1/2005","all_workers":12.991187623,"hourly_workers":17.2649229684,"non_hourly_workers":7.6305176166,"less_than_high_school":19.9360147566,"high_school":15.0044569378,"some_college":13.3144856108,"college":9.2046305475,"construction":15.9077186676,"finance":10.7980251797,"manufacturing":14.5325042681},{"date":"05/1/2005","all_workers":12.9274578455,"hourly_workers":17.2042282523,"non_hourly_workers":7.5714340376,"less_than_high_school":19.0547074917,"high_school":15.0072917737,"some_college":13.3269310519,"college":9.2694656848,"construction":17.1729537116,"finance":11.1766530871,"manufacturing":13.8510713432},{"date":"06/1/2005","all_workers":12.6706327021,"hourly_workers":16.8975607065,"non_hourly_workers":7.3884889572,"less_than_high_school":18.4156839203,"high_school":14.9425665359,"some_college":12.9369434066,"college":9.0891952281,"construction":16.9625021366,"finance":9.9320198277,"manufacturing":13.5098291818},{"date":"07/1/2005","all_workers":12.5141807238,"hourly_workers":16.4829754349,"non_hourly_workers":7.5705378329,"less_than_high_school":18.4640786325,"high_school":14.7682494871,"some_college":12.5268378496,"college":9.1688936543,"construction":16.3657864261,"finance":9.6274241053,"manufacturing":13.0432881612},{"date":"08/1/2005","all_workers":12.3610551779,"hourly_workers":16.245610073,"non_hourly_workers":7.5444102795,"less_than_high_school":18.577607853,"high_school":14.5364417052,"some_college":12.4632137767,"college":8.8908415722,"construction":16.2274447022,"finance":9.7472311879,"manufacturing":13.1539223101},{"date":"09/1/2005","all_workers":12.7080220473,"hourly_workers":16.6964374639,"non_hourly_workers":7.6501745999,"less_than_high_school":19.3452685483,"high_school":14.5938209539,"some_college":12.6653708914,"college":9.4961454658,"construction":16.5302692504,"finance":10.1304165035,"manufacturing":12.9090357655},{"date":"10/1/2005","all_workers":12.6572435856,"hourly_workers":16.6603255916,"non_hourly_workers":7.7373716124,"less_than_high_school":18.8420232363,"high_school":14.5369000444,"some_college":12.9142976525,"college":9.4165614986,"construction":17.0181445085,"finance":9.1124199526,"manufacturing":12.8133643249},{"date":"11/1/2005","all_workers":12.701504771,"hourly_workers":16.7581871016,"non_hourly_workers":7.6725265595,"less_than_high_school":18.6409708374,"high_school":14.6559010855,"some_college":13.0585929114,"college":9.2806721071,"construction":17.148578066,"finance":8.7644115493,"manufacturing":12.7042086675},{"date":"12/1/2005","all_workers":12.6731847674,"hourly_workers":16.7238884703,"non_hourly_workers":7.6258391647,"less_than_high_school":18.7984552187,"high_school":14.6338799683,"some_college":12.6256932301,"college":9.6001451997,"construction":17.925634608,"finance":8.92044153,"manufacturing":12.6448333068},{"date":"01/1/2006","all_workers":12.7159712022,"hourly_workers":16.7325835773,"non_hourly_workers":7.7092075837,"less_than_high_school":19.0800626279,"high_school":14.7644448855,"some_college":12.4035204833,"college":9.7646209365,"construction":17.961030963,"finance":8.3648961098,"manufacturing":12.7923531365},{"date":"02/1/2006","all_workers":12.542052072,"hourly_workers":16.5555354812,"non_hourly_workers":7.5128546167,"less_than_high_school":19.0501658851,"high_school":14.9227748227,"some_college":12.0986225777,"college":9.4464263383,"construction":17.3824286132,"finance":8.7523442077,"manufacturing":12.6649397703},{"date":"03/1/2006","all_workers":12.4541169011,"hourly_workers":16.3352987613,"non_hourly_workers":7.6167091627,"less_than_high_school":18.0908095609,"high_school":14.5517062893,"some_college":12.0606242912,"college":9.7301301154,"construction":17.2996843508,"finance":8.7553010276,"manufacturing":12.7459926721},{"date":"04/1/2006","all_workers":12.5530639738,"hourly_workers":16.5668668945,"non_hourly_workers":7.5900313582,"less_than_high_school":18.6078369557,"high_school":14.4594216724,"some_college":12.2943149373,"college":9.7168091867,"construction":16.6881549066,"finance":9.2000314024,"manufacturing":12.3908170209},{"date":"05/1/2006","all_workers":12.261772504,"hourly_workers":16.0872648064,"non_hourly_workers":7.5328426514,"less_than_high_school":18.6787378505,"high_school":14.3039517824,"some_college":11.7906697598,"college":9.4114586814,"construction":15.4938937356,"finance":9.0081029963,"manufacturing":12.393607208},{"date":"06/1/2006","all_workers":12.384367769,"hourly_workers":16.2168837231,"non_hourly_workers":7.5810583962,"less_than_high_school":18.0609452689,"high_school":14.5157636897,"some_college":12.0758197429,"college":9.4766501065,"construction":14.5448161435,"finance":9.1776904761,"manufacturing":12.7080919781},{"date":"07/1/2006","all_workers":12.4861622879,"hourly_workers":16.4671721899,"non_hourly_workers":7.5026226633,"less_than_high_school":18.7011563818,"high_school":14.2989086143,"some_college":12.3628534588,"college":9.5489271982,"construction":15.2814306735,"finance":8.8757343747,"manufacturing":13.2324009517},{"date":"08/1/2006","all_workers":12.4949304594,"hourly_workers":16.499268732,"non_hourly_workers":7.4422601341,"less_than_high_school":18.9286253075,"high_school":14.3227913094,"some_college":12.0778073217,"college":9.7425719043,"construction":15.0339474761,"finance":8.6430062641,"manufacturing":13.4327559521},{"date":"09/1/2006","all_workers":12.2801664248,"hourly_workers":16.255364194,"non_hourly_workers":7.3798616182,"less_than_high_school":18.5658478864,"high_school":14.1660130714,"some_college":12.1444755207,"college":9.2946954479,"construction":14.7344186458,"finance":8.3376935991,"manufacturing":14.1891349201},{"date":"10/1/2006","all_workers":12.2568673261,"hourly_workers":16.2924408545,"non_hourly_workers":7.2493337813,"less_than_high_school":18.9547336292,"high_school":14.1928843178,"some_college":11.8081366487,"college":9.3526827346,"construction":14.0208252179,"finance":8.9755513155,"manufacturing":14.3844978385},{"date":"11/1/2006","all_workers":12.0866124251,"hourly_workers":15.9864749895,"non_hourly_workers":7.3393911279,"less_than_high_school":18.6878638489,"high_school":14.0634664728,"some_college":11.5366715766,"college":9.351213482,"construction":13.8233796382,"finance":9.7047133778,"manufacturing":14.2451228999},{"date":"12/1/2006","all_workers":11.8661997701,"hourly_workers":15.7464904815,"non_hourly_workers":7.2279005046,"less_than_high_school":18.5370366619,"high_school":13.6322457354,"some_college":11.5808994399,"college":9.0365799705,"construction":13.9221497459,"finance":9.2108760266,"manufacturing":14.1390591755},{"date":"01/1/2007","all_workers":11.6615319769,"hourly_workers":15.4301539227,"non_hourly_workers":7.1428724923,"less_than_high_school":17.3809344836,"high_school":13.2683619732,"some_college":11.793148305,"college":8.831364631,"construction":12.6793793619,"finance":9.7588018844,"manufacturing":13.6798744561},{"date":"02/1/2007","all_workers":11.6308659001,"hourly_workers":15.37816533,"non_hourly_workers":7.1367330843,"less_than_high_school":16.7542792869,"high_school":13.2414512441,"some_college":11.9464648136,"college":8.7717675667,"construction":12.5694326609,"finance":9.7994400066,"manufacturing":13.7948376973},{"date":"03/1/2007","all_workers":11.487180184,"hourly_workers":15.1885792445,"non_hourly_workers":7.0528915229,"less_than_high_school":17.1872934254,"high_school":13.0584254567,"some_college":11.8219086155,"college":8.5327651318,"construction":12.2301514787,"finance":11.2794226208,"manufacturing":12.8950836292},{"date":"04/1/2007","all_workers":11.36799223,"hourly_workers":14.9441081213,"non_hourly_workers":6.9727095795,"less_than_high_school":17.3899036339,"high_school":12.6521743643,"some_college":11.6251658374,"college":8.5559385387,"construction":13.473962339,"finance":10.494307594,"manufacturing":12.9641023826},{"date":"05/1/2007","all_workers":11.4718395439,"hourly_workers":15.1611879566,"non_hourly_workers":6.9426374046,"less_than_high_school":18.2462759277,"high_school":12.3675751805,"some_college":11.8879908826,"college":8.6423959048,"construction":14.191144853,"finance":10.8305441199,"manufacturing":13.0183250744},{"date":"06/1/2007","all_workers":11.4029249967,"hourly_workers":15.1312945973,"non_hourly_workers":6.8455681599,"less_than_high_school":18.6550110157,"high_school":12.6181482155,"some_college":11.8626426087,"college":8.1951244573,"construction":13.8192560319,"finance":11.0021895469,"manufacturing":13.0149323724},{"date":"07/1/2007","all_workers":11.1531368799,"hourly_workers":14.8400860441,"non_hourly_workers":6.6629867869,"less_than_high_school":17.4546638414,"high_school":12.6000130806,"some_college":11.7749447535,"college":7.8830667617,"construction":14.1517690821,"finance":11.2223727084,"manufacturing":12.0655478868},{"date":"08/1/2007","all_workers":11.0328797323,"hourly_workers":14.5654795535,"non_hourly_workers":6.78985861,"less_than_high_school":17.2223227349,"high_school":12.1973425702,"some_college":11.8784183378,"college":7.9229890458,"construction":14.1902673019,"finance":11.9906193996,"manufacturing":11.3348720331},{"date":"09/1/2007","all_workers":11.130495077,"hourly_workers":14.6481473652,"non_hourly_workers":6.8615684178,"less_than_high_school":16.9122062619,"high_school":12.5229978504,"some_college":11.4370503575,"college":8.4122390234,"construction":14.2071436281,"finance":12.8526578826,"manufacturing":10.6912353327},{"date":"10/1/2007","all_workers":10.9751302598,"hourly_workers":14.4453098124,"non_hourly_workers":6.8370793591,"less_than_high_school":16.1210246932,"high_school":12.3340742096,"some_college":11.4170039593,"college":8.3507690922,"construction":14.7238374356,"finance":12.5052702605,"manufacturing":10.4087314594},{"date":"11/1/2007","all_workers":10.8987380849,"hourly_workers":14.3886271398,"non_hourly_workers":6.7184066789,"less_than_high_school":15.3994814075,"high_school":12.1870948171,"some_college":11.5323322919,"college":8.3175112786,"construction":13.8982270327,"finance":12.0768734356,"manufacturing":10.004734857},{"date":"12/1/2007","all_workers":10.9999156513,"hourly_workers":14.5978825562,"non_hourly_workers":6.680609167,"less_than_high_school":15.4080858924,"high_school":12.4503079504,"some_college":11.7612469992,"college":8.2217115109,"construction":13.6388304483,"finance":12.0520305316,"manufacturing":10.1634588097},{"date":"01/1/2008","all_workers":11.1648596412,"hourly_workers":14.9529065676,"non_hourly_workers":6.6495641561,"less_than_high_school":16.2243630885,"high_school":12.4095237205,"some_college":11.7817502205,"college":8.5109569539,"construction":13.9751663404,"finance":12.0290736272,"manufacturing":10.3946118665},{"date":"02/1/2008","all_workers":11.1373116915,"hourly_workers":15.0739960765,"non_hourly_workers":6.4957233362,"less_than_high_school":17.5580132135,"high_school":12.4683211643,"some_college":11.5913577622,"college":8.3042089268,"construction":13.9574797259,"finance":11.697585703,"manufacturing":10.3804581813},{"date":"03/1/2008","all_workers":11.0585321098,"hourly_workers":15.0214599975,"non_hourly_workers":6.3803480189,"less_than_high_school":17.4612464379,"high_school":12.5135658962,"some_college":11.4727847995,"college":8.1767852023,"construction":14.1253226346,"finance":10.7770417452,"manufacturing":10.7410038314},{"date":"04/1/2008","all_workers":11.0586362577,"hourly_workers":15.1371481533,"non_hourly_workers":6.3127358419,"less_than_high_school":16.4643817583,"high_school":12.6670867399,"some_college":11.7455842026,"college":8.1384483732,"construction":13.6966970591,"finance":10.4847448503,"manufacturing":10.6611325244},{"date":"05/1/2008","all_workers":11.072728164,"hourly_workers":15.2550125622,"non_hourly_workers":6.2285682528,"less_than_high_school":16.2929177224,"high_school":12.775000755,"some_college":11.8761405183,"college":8.0837256439,"construction":14.0010096592,"finance":10.32497181,"manufacturing":11.0339235188},{"date":"06/1/2008","all_workers":10.9414250121,"hourly_workers":15.1024615894,"non_hourly_workers":6.1730387918,"less_than_high_school":16.2315997028,"high_school":12.3273820091,"some_college":11.598461676,"college":8.2887336917,"construction":14.199173416,"finance":10.4737456978,"manufacturing":10.5700030452},{"date":"07/1/2008","all_workers":11.1592025873,"hourly_workers":15.3219866014,"non_hourly_workers":6.3030545397,"less_than_high_school":17.1766536397,"high_school":12.3070761142,"some_college":11.6573627253,"college":8.6206450217,"construction":14.03863471,"finance":10.5855232639,"manufacturing":11.5477013701},{"date":"08/1/2008","all_workers":11.360760182,"hourly_workers":15.467121072,"non_hourly_workers":6.5806072668,"less_than_high_school":16.6711822369,"high_school":12.7499071643,"some_college":11.8700276687,"college":8.7571251703,"construction":14.2700243569,"finance":10.4647383761,"manufacturing":11.7796359618},{"date":"09/1/2008","all_workers":11.3226378364,"hourly_workers":15.4941685236,"non_hourly_workers":6.5183688715,"less_than_high_school":16.9892696245,"high_school":12.8851131026,"some_college":12.0785118424,"college":8.3685949755,"construction":14.1800131538,"finance":9.4944456361,"manufacturing":11.9632223777},{"date":"10/1/2008","all_workers":11.3595845673,"hourly_workers":15.3715330879,"non_hourly_workers":6.6662931852,"less_than_high_school":17.366955206,"high_school":12.8592403261,"some_college":12.1184613769,"college":8.3781929213,"construction":13.8081341749,"finance":9.4635449824,"manufacturing":11.989347784},{"date":"11/1/2008","all_workers":11.5693411481,"hourly_workers":15.6783483003,"non_hourly_workers":6.782813139,"less_than_high_school":17.6339162027,"high_school":13.3783651307,"some_college":12.2792905969,"college":8.4464231871,"construction":15.0916516854,"finance":9.7027403921,"manufacturing":12.7441213508},{"date":"12/1/2008","all_workers":11.5976025019,"hourly_workers":15.4986677314,"non_hourly_workers":7.0342467385,"less_than_high_school":18.7265480542,"high_school":13.50567096,"some_college":11.8930584103,"college":8.4979408437,"construction":16.2928605378,"finance":9.5717269568,"manufacturing":12.5199051617},{"date":"01/1/2009","all_workers":11.6084393312,"hourly_workers":15.4055031076,"non_hourly_workers":7.1593917647,"less_than_high_school":18.2613279365,"high_school":13.9276243424,"some_college":11.8871570276,"college":8.3112456731,"construction":16.9732730972,"finance":9.2709293996,"manufacturing":13.1357865712},{"date":"02/1/2009","all_workers":11.5745425169,"hourly_workers":15.3256429469,"non_hourly_workers":7.1277757847,"less_than_high_school":17.6936966882,"high_school":13.7879485459,"some_college":11.9742419652,"college":8.3594493622,"construction":17.0101451463,"finance":9.1056824065,"manufacturing":12.9505895141},{"date":"03/1/2009","all_workers":11.9411445932,"hourly_workers":16.0307797626,"non_hourly_workers":7.0997545439,"less_than_high_school":18.525852645,"high_school":13.9579527407,"some_college":12.5589868196,"college":8.6192585609,"construction":17.8254259273,"finance":8.6541143739,"manufacturing":13.4831964502},{"date":"04/1/2009","all_workers":12.2428982455,"hourly_workers":16.0929956894,"non_hourly_workers":7.653148658,"less_than_high_school":18.5785630996,"high_school":14.3680521614,"some_college":12.6444103048,"college":9.0736748646,"construction":17.681127424,"finance":9.4233577116,"manufacturing":14.0486774583},{"date":"05/1/2009","all_workers":12.4481350787,"hourly_workers":16.1483416678,"non_hourly_workers":8.0411155703,"less_than_high_school":18.3790570592,"high_school":14.8452081372,"some_college":12.6292482483,"college":9.3935066317,"construction":18.1780095963,"finance":9.7117866717,"manufacturing":13.9456214666},{"date":"06/1/2009","all_workers":12.7164448547,"hourly_workers":16.3879306754,"non_hourly_workers":8.334899749,"less_than_high_school":18.5797936727,"high_school":15.1711150778,"some_college":13.0349416837,"college":9.5697888392,"construction":19.3945345136,"finance":10.0780635218,"manufacturing":14.8445126807},{"date":"07/1/2009","all_workers":12.7478706648,"hourly_workers":16.5636198815,"non_hourly_workers":8.2920318661,"less_than_high_school":18.0872465347,"high_school":15.4144968842,"some_college":13.1764507829,"college":9.4788421589,"construction":19.3169116328,"finance":10.0527269886,"manufacturing":14.317358457},{"date":"08/1/2009","all_workers":12.9676313064,"hourly_workers":17.0521037447,"non_hourly_workers":8.1157127916,"less_than_high_school":18.2259315449,"high_school":15.7872004898,"some_college":13.5531587452,"college":9.4678236085,"construction":19.431468816,"finance":10.5323975886,"manufacturing":15.2096250089},{"date":"09/1/2009","all_workers":13.1570165885,"hourly_workers":17.2062923797,"non_hourly_workers":8.2776776161,"less_than_high_school":17.9303516809,"high_school":15.8307433555,"some_college":13.6635178068,"college":9.872915697,"construction":20.1893050325,"finance":11.4422649294,"manufacturing":15.1349332742},{"date":"10/1/2009","all_workers":13.4872840168,"hourly_workers":17.6041962301,"non_hourly_workers":8.559141655,"less_than_high_school":18.4471138694,"high_school":16.178768771,"some_college":14.0494437613,"college":10.0858016106,"construction":20.4177147243,"finance":11.7605455946,"manufacturing":15.4570015936},{"date":"11/1/2009","all_workers":13.6556445972,"hourly_workers":17.8502650839,"non_hourly_workers":8.6631405076,"less_than_high_school":19.3155124638,"high_school":16.0784753742,"some_college":14.0875443314,"college":10.4255895009,"construction":19.8285842276,"finance":12.1172261553,"manufacturing":15.4181877803},{"date":"12/1/2009","all_workers":14.0229850251,"hourly_workers":18.2671984988,"non_hourly_workers":8.9753144668,"less_than_high_school":18.479210905,"high_school":16.5772045401,"some_college":14.6817827858,"college":10.8190870561,"construction":20.1874549028,"finance":12.8358280813,"manufacturing":15.3094307787},{"date":"01/1/2010","all_workers":14.22392842,"hourly_workers":18.5360546446,"non_hourly_workers":9.056928404,"less_than_high_school":18.8525766009,"high_school":16.451671346,"some_college":15.1800800056,"college":11.0010899307,"construction":20.8638803144,"finance":13.0458876928,"manufacturing":14.44292375},{"date":"02/1/2010","all_workers":14.6078418351,"hourly_workers":18.9468795664,"non_hourly_workers":9.3759049792,"less_than_high_school":18.5305090079,"high_school":16.9201883296,"some_college":15.7600263996,"college":11.2787073453,"construction":21.0752520164,"finance":13.7565736721,"manufacturing":15.382317112},{"date":"03/1/2010","all_workers":14.8241348074,"hourly_workers":19.0566427462,"non_hourly_workers":9.7036880968,"less_than_high_school":18.0361160602,"high_school":17.1088581381,"some_college":15.9958315653,"college":11.594043763,"construction":21.3512052019,"finance":14.8615425928,"manufacturing":15.3400259574},{"date":"04/1/2010","all_workers":14.831055343,"hourly_workers":19.2315753463,"non_hourly_workers":9.5306705275,"less_than_high_school":18.7462353902,"high_school":16.9687923339,"some_college":15.9028754923,"college":11.6665891487,"construction":21.6538851892,"finance":14.2976238548,"manufacturing":15.1968676332},{"date":"05/1/2010","all_workers":15.0206946627,"hourly_workers":19.6197513096,"non_hourly_workers":9.4530382571,"less_than_high_school":18.8466789609,"high_school":17.1076725321,"some_college":16.2265210118,"college":11.7509847344,"construction":22.0077827224,"finance":15.0779260709,"manufacturing":15.1603677416},{"date":"06/1/2010","all_workers":15.2692370367,"hourly_workers":20.0193307097,"non_hourly_workers":9.5531261888,"less_than_high_school":19.2562104832,"high_school":17.3033282314,"some_college":16.7056494677,"college":11.808420894,"construction":21.4982757529,"finance":15.38364132,"manufacturing":15.250338804},{"date":"07/1/2010","all_workers":15.5908594453,"hourly_workers":20.4564814268,"non_hourly_workers":9.7295441102,"less_than_high_school":19.442711196,"high_school":17.4779810894,"some_college":17.13436504,"college":12.1998115428,"construction":21.0939269921,"finance":15.651625752,"manufacturing":15.8191201548},{"date":"08/1/2010","all_workers":15.6414327887,"hourly_workers":20.5110427493,"non_hourly_workers":9.7630235213,"less_than_high_school":19.9132595375,"high_school":17.3479952358,"some_college":17.1785853751,"college":12.2754785879,"construction":20.8738847768,"finance":15.3196528945,"manufacturing":15.6057531452},{"date":"09/1/2010","all_workers":15.7378938091,"hourly_workers":20.8057288729,"non_hourly_workers":9.7417833869,"less_than_high_school":20.7456154032,"high_school":17.7317840226,"some_college":17.3592463599,"college":11.9594030665,"construction":20.9407823688,"finance":14.6782253496,"manufacturing":16.0442603581},{"date":"10/1/2010","all_workers":15.8943939244,"hourly_workers":20.9349806093,"non_hourly_workers":9.9075252523,"less_than_high_school":20.2996563429,"high_school":18.2441955631,"some_college":17.208982296,"college":12.2393446133,"construction":21.4998240025,"finance":15.2524733783,"manufacturing":16.3354234904},{"date":"11/1/2010","all_workers":15.7947679601,"hourly_workers":20.6737973502,"non_hourly_workers":9.9584127948,"less_than_high_school":20.2666159287,"high_school":17.8304472751,"some_college":17.1563849032,"college":12.3373372275,"construction":21.3571884904,"finance":14.3517725308,"manufacturing":16.3726954809},{"date":"12/1/2010","all_workers":15.888241659,"hourly_workers":21.0093503455,"non_hourly_workers":9.7111113839,"less_than_high_school":20.4863466441,"high_school":17.912019006,"some_college":17.3931658576,"college":12.3020194135,"construction":20.9464662315,"finance":14.4506129066,"manufacturing":16.5957599073},{"date":"01/1/2011","all_workers":16.0374096435,"hourly_workers":21.134909532,"non_hourly_workers":9.8482143645,"less_than_high_school":21.1680963033,"high_school":18.3719391926,"some_college":17.4559720416,"college":12.2300403657,"construction":21.9786603995,"finance":14.9631859153,"manufacturing":16.8947929552},{"date":"02/1/2011","all_workers":16.0855735513,"hourly_workers":21.1540295041,"non_hourly_workers":9.922341268,"less_than_high_school":21.9019658523,"high_school":18.1434389209,"some_college":17.5437716268,"college":12.3378468527,"construction":21.7242850282,"finance":15.7593252177,"manufacturing":16.5377010601},{"date":"03/1/2011","all_workers":16.0669446974,"hourly_workers":21.1107250564,"non_hourly_workers":10.0068538341,"less_than_high_school":21.6838885124,"high_school":18.1787664494,"some_college":17.6355190851,"college":12.2984496578,"construction":21.8215971198,"finance":16.1669449591,"manufacturing":16.4768770838},{"date":"04/1/2011","all_workers":16.2544314895,"hourly_workers":21.4123679972,"non_hourly_workers":10.0749163926,"less_than_high_school":21.6440146713,"high_school":18.1742787881,"some_college":18.1694929688,"college":12.3802463298,"construction":21.7782640348,"finance":16.5152409791,"manufacturing":16.6327601175},{"date":"05/1/2011","all_workers":16.4484889525,"hourly_workers":21.6039219549,"non_hourly_workers":10.2414489681,"less_than_high_school":21.8440261888,"high_school":18.6797269808,"some_college":18.027329735,"college":12.5894790139,"construction":21.5197143174,"finance":15.5372602839,"manufacturing":16.4077300699},{"date":"06/1/2011","all_workers":16.2887708,"hourly_workers":21.2917600787,"non_hourly_workers":10.2339042387,"less_than_high_school":20.6786991691,"high_school":18.8962215028,"some_college":17.7062978864,"college":12.5538314549,"construction":21.5132352022,"finance":15.6449378458,"manufacturing":15.9266378457},{"date":"07/1/2011","all_workers":16.3911023405,"hourly_workers":21.2692161459,"non_hourly_workers":10.4484313112,"less_than_high_school":20.4589991055,"high_school":19.422951558,"some_college":17.9392963568,"college":12.267386642,"construction":22.0202367172,"finance":15.7252588819,"manufacturing":16.1929060251},{"date":"08/1/2011","all_workers":16.2676433192,"hourly_workers":21.0350703454,"non_hourly_workers":10.5601562809,"less_than_high_school":20.0632707516,"high_school":19.4778053516,"some_college":17.2733685986,"college":12.5371160332,"construction":21.9424297277,"finance":15.2440165938,"manufacturing":16.4507992758},{"date":"09/1/2011","all_workers":16.5561460846,"hourly_workers":21.3320861883,"non_hourly_workers":10.8062492564,"less_than_high_school":19.2329541005,"high_school":19.6374499461,"some_college":17.6050897387,"college":13.135555204,"construction":21.5599203997,"finance":14.8589132133,"manufacturing":16.8106094047},{"date":"10/1/2011","all_workers":16.324847882,"hourly_workers":21.1379134877,"non_hourly_workers":10.5602906193,"less_than_high_school":19.9887993114,"high_school":19.0526044332,"some_college":17.5095622423,"college":12.8585175341,"construction":20.8233328062,"finance":13.9863481068,"manufacturing":17.2335446025},{"date":"11/1/2011","all_workers":16.219087202,"hourly_workers":21.1497570691,"non_hourly_workers":10.3353643882,"less_than_high_school":19.2012429676,"high_school":19.4771925895,"some_college":17.3615992214,"college":12.5212378437,"construction":21.1061250808,"finance":14.2006109226,"manufacturing":16.3946198775},{"date":"12/1/2011","all_workers":16.0213677597,"hourly_workers":20.7615343995,"non_hourly_workers":10.4229975825,"less_than_high_school":18.4205837243,"high_school":19.2128230105,"some_college":16.9399621109,"college":12.6439748459,"construction":21.6720780629,"finance":14.1177334794,"manufacturing":17.015578236},{"date":"01/1/2012","all_workers":15.9142815713,"hourly_workers":20.5585931091,"non_hourly_workers":10.4580924313,"less_than_high_school":17.3272908443,"high_school":18.662695827,"some_college":16.7618901631,"college":13.0540151372,"construction":20.4039428637,"finance":13.5213075879,"manufacturing":16.8449137224},{"date":"02/1/2012","all_workers":16.0550855573,"hourly_workers":20.7449893136,"non_hourly_workers":10.6501099418,"less_than_high_school":18.0587647402,"high_school":19.1559119022,"some_college":16.5794932355,"college":13.2255547539,"construction":21.4233564278,"finance":13.2302198714,"manufacturing":16.5425681878},{"date":"03/1/2012","all_workers":15.9196847565,"hourly_workers":20.4152721465,"non_hourly_workers":10.6565303167,"less_than_high_school":18.238128827,"high_school":18.9284429023,"some_college":16.2550074366,"college":13.2141452935,"construction":21.1450797131,"finance":12.338847176,"manufacturing":16.3747204011},{"date":"04/1/2012","all_workers":15.875575952,"hourly_workers":20.0965846827,"non_hourly_workers":10.936397957,"less_than_high_school":18.5886771668,"high_school":19.0802246009,"some_college":15.747799915,"college":13.3499814338,"construction":21.4564284658,"finance":11.9301865806,"manufacturing":15.6373961223},{"date":"05/1/2012","all_workers":15.7361245738,"hourly_workers":19.8433815897,"non_hourly_workers":10.9446935886,"less_than_high_school":19.6810566027,"high_school":18.3678440772,"some_college":15.7635505617,"college":13.3413857706,"construction":21.2338537152,"finance":12.1087030007,"manufacturing":15.8533440683},{"date":"06/1/2012","all_workers":16.0065230102,"hourly_workers":20.1689347207,"non_hourly_workers":11.1240690936,"less_than_high_school":20.2051127115,"high_school":18.4578985357,"some_college":16.2403793347,"college":13.4809080981,"construction":22.2197602782,"finance":12.7442694557,"manufacturing":15.7394485775},{"date":"07/1/2012","all_workers":15.9416347755,"hourly_workers":20.0487174202,"non_hourly_workers":11.1313652985,"less_than_high_school":21.5798911022,"high_school":17.9465378711,"some_college":15.599455632,"college":13.9645950136,"construction":23.232786318,"finance":13.5561276177,"manufacturing":15.8085367881},{"date":"08/1/2012","all_workers":16.0928382897,"hourly_workers":20.3275588467,"non_hourly_workers":11.0630906509,"less_than_high_school":21.3173482663,"high_school":17.7739929069,"some_college":16.5482283029,"college":13.8018834715,"construction":23.5731625069,"finance":14.5459431311,"manufacturing":15.1920429638},{"date":"09/1/2012","all_workers":15.7455467694,"hourly_workers":19.8322315854,"non_hourly_workers":10.8496281404,"less_than_high_school":20.5362788576,"high_school":17.3320500159,"some_college":16.6067843709,"college":13.244826303,"construction":23.9277271891,"finance":15.3972892058,"manufacturing":14.5148548895},{"date":"10/1/2012","all_workers":15.9307204148,"hourly_workers":20.2545379144,"non_hourly_workers":10.6876430595,"less_than_high_school":20.3418399581,"high_school":17.6230790782,"some_college":16.7571365279,"college":13.4252199381,"construction":24.4221660979,"finance":16.2009848108,"manufacturing":13.6872910697},{"date":"11/1/2012","all_workers":15.9751850885,"hourly_workers":20.2563258299,"non_hourly_workers":10.7400883368,"less_than_high_school":20.3678897705,"high_school":17.6956161547,"some_college":16.8993755858,"college":13.3495569051,"construction":23.5586206452,"finance":16.1306587485,"manufacturing":14.4146691718},{"date":"12/1/2012","all_workers":15.8588628217,"hourly_workers":20.2511378985,"non_hourly_workers":10.4390695569,"less_than_high_school":20.2989618367,"high_school":17.6874377213,"some_college":16.9085689012,"college":13.0364291186,"construction":23.0007885444,"finance":16.2282155405,"manufacturing":13.6181490864},{"date":"01/1/2013","all_workers":15.6846654757,"hourly_workers":20.1331727936,"non_hourly_workers":10.218770674,"less_than_high_school":20.6927260622,"high_school":18.0139100998,"some_college":16.6759738627,"college":12.4857273052,"construction":22.2847232645,"finance":15.7488337122,"manufacturing":14.34523633},{"date":"02/1/2013","all_workers":15.5959888202,"hourly_workers":20.1308727005,"non_hourly_workers":9.9538616326,"less_than_high_school":19.9129935117,"high_school":18.1024236404,"some_college":16.7023360405,"college":12.1889516313,"construction":23.0943923915,"finance":14.6341335717,"manufacturing":14.5724815447},{"date":"03/1/2013","all_workers":15.7893435914,"hourly_workers":20.5879719777,"non_hourly_workers":9.8907589854,"less_than_high_school":19.5187522994,"high_school":18.5631937674,"some_college":16.8717761742,"college":12.3216279778,"construction":22.6695965008,"finance":14.4831565307,"manufacturing":14.5918673951},{"date":"04/1/2013","all_workers":15.8025750673,"hourly_workers":20.7947862407,"non_hourly_workers":9.6768579415,"less_than_high_school":19.700441794,"high_school":18.4137090953,"some_college":17.1835004792,"college":12.1583913688,"construction":22.1066821996,"finance":15.3519199205,"manufacturing":15.1401418737},{"date":"05/1/2013","all_workers":15.8714121766,"hourly_workers":21.0217792885,"non_hourly_workers":9.5875700624,"less_than_high_school":19.7125747213,"high_school":18.7921380777,"some_college":17.2762956448,"college":12.0251531952,"construction":21.8210195268,"finance":16.0097032404,"manufacturing":15.4414886166},{"date":"06/1/2013","all_workers":15.7817451443,"hourly_workers":21.0668342562,"non_hourly_workers":9.3424281664,"less_than_high_school":21.1572938612,"high_school":18.8503374297,"some_college":16.9030390229,"college":11.8436242279,"construction":21.2128117866,"finance":14.4145291455,"manufacturing":15.4052994596},{"date":"07/1/2013","all_workers":15.6594968602,"hourly_workers":20.9879452447,"non_hourly_workers":9.2013498125,"less_than_high_school":19.2748954177,"high_school":19.0063529133,"some_college":17.0165334745,"college":11.6219093545,"construction":19.9547566947,"finance":13.1133564114,"manufacturing":15.0877258323},{"date":"08/1/2013","all_workers":15.5274928192,"hourly_workers":20.8691692919,"non_hourly_workers":9.0284795581,"less_than_high_school":19.4263499589,"high_school":19.2945581775,"some_college":16.3478845916,"college":11.5947483711,"construction":20.4682814533,"finance":12.3803008344,"manufacturing":14.874639686},{"date":"09/1/2013","all_workers":15.5389480509,"hourly_workers":20.8687260525,"non_hourly_workers":9.142167322,"less_than_high_school":20.6899197787,"high_school":19.4841248517,"some_college":15.6763094064,"college":11.8011406903,"construction":20.1252935436,"finance":11.5721539011,"manufacturing":14.4620731811},{"date":"10/1/2013","all_workers":15.3515764355,"hourly_workers":20.4430368588,"non_hourly_workers":9.2892417621,"less_than_high_school":20.8555576898,"high_school":19.3532628137,"some_college":15.3790765984,"college":11.6559748791,"construction":19.0260081235,"finance":11.0856260181,"manufacturing":14.4211028453},{"date":"11/1/2013","all_workers":15.4934914167,"hourly_workers":20.679168327,"non_hourly_workers":9.3609088855,"less_than_high_school":21.1231735047,"high_school":19.2887097493,"some_college":15.4550116649,"college":11.9890659451,"construction":19.4477949842,"finance":11.8727590785,"manufacturing":13.9210411271},{"date":"12/1/2013","all_workers":15.5965589706,"hourly_workers":20.8064772995,"non_hourly_workers":9.4361107378,"less_than_high_school":21.9381079144,"high_school":19.2132846756,"some_college":15.5521553475,"college":12.0679732059,"construction":18.5052094365,"finance":11.7606307669,"manufacturing":14.4383757225},{"date":"01/1/2014","all_workers":15.8849416991,"hourly_workers":21.1211881259,"non_hourly_workers":9.7221063973,"less_than_high_school":21.5369380509,"high_school":19.1916198658,"some_college":15.9251695788,"college":12.6025197788,"construction":19.1943706301,"finance":12.2613280204,"manufacturing":14.1269328751},{"date":"02/1/2014","all_workers":15.8211974364,"hourly_workers":20.8670123082,"non_hourly_workers":9.9082161918,"less_than_high_school":22.2175212472,"high_school":18.9152190911,"some_college":15.7445456081,"college":12.6677172222,"construction":17.1448106703,"finance":13.2790748119,"manufacturing":14.4976423633},{"date":"03/1/2014","all_workers":15.6029999683,"hourly_workers":20.6658593877,"non_hourly_workers":9.6804346706,"less_than_high_school":22.9319847721,"high_school":18.5262359859,"some_college":15.4374567241,"college":12.4767002982,"construction":17.7236112224,"finance":13.6762665189,"manufacturing":14.7687143592},{"date":"04/1/2014","all_workers":15.5767160799,"hourly_workers":20.571660343,"non_hourly_workers":9.788615667,"less_than_high_school":22.7839317281,"high_school":18.6453668515,"some_college":15.2930834159,"college":12.4985198937,"construction":17.9396571589,"finance":13.8341343876,"manufacturing":14.3340108794},{"date":"05/1/2014","all_workers":15.3238588077,"hourly_workers":20.1301547933,"non_hourly_workers":9.729734926,"less_than_high_school":22.0490047157,"high_school":18.1241077835,"some_college":15.1317784221,"college":12.3698027263,"construction":17.7614780971,"finance":13.590796425,"manufacturing":13.6891225403},{"date":"06/1/2014","all_workers":15.3722664037,"hourly_workers":20.2309305809,"non_hourly_workers":9.7860967075,"less_than_high_school":20.6642502179,"high_school":18.0658485203,"some_college":15.2899177241,"college":12.65397072,"construction":18.5052398235,"finance":14.113301636,"manufacturing":14.0929981596},{"date":"07/1/2014","all_workers":15.4443943083,"hourly_workers":20.3582333501,"non_hourly_workers":9.8155777852,"less_than_high_school":22.1821957094,"high_school":18.3641664239,"some_college":15.2376308023,"college":12.5550546845,"construction":19.5905898829,"finance":14.9018968368,"manufacturing":13.9451512068},{"date":"08/1/2014","all_workers":15.4593673336,"hourly_workers":20.2591147413,"non_hourly_workers":10.0391617876,"less_than_high_school":22.3641554572,"high_school":18.1485258875,"some_college":15.4322640665,"college":12.5410558122,"construction":18.2527127819,"finance":14.4821784304,"manufacturing":13.9526303066},{"date":"09/1/2014","all_workers":15.4907350192,"hourly_workers":20.1213774691,"non_hourly_workers":10.1531761562,"less_than_high_school":22.8564436485,"high_school":17.6970293397,"some_college":15.797492316,"college":12.6083407383,"construction":18.5462934962,"finance":14.111949245,"manufacturing":14.5719821192},{"date":"10/1/2014","all_workers":15.5634260608,"hourly_workers":20.1268721137,"non_hourly_workers":10.2594092491,"less_than_high_school":22.5470987418,"high_school":17.3047740186,"some_college":15.8345006511,"college":13.0883929976,"construction":18.8575461735,"finance":14.2887288422,"manufacturing":14.6919733017},{"date":"11/1/2014","all_workers":15.4437498758,"hourly_workers":19.8315137519,"non_hourly_workers":10.2979996207,"less_than_high_school":22.6452339173,"high_school":17.6192378699,"some_college":15.6759082214,"college":12.6859350656,"construction":19.1062030507,"finance":13.4560653104,"manufacturing":15.2480840948},{"date":"12/1/2014","all_workers":15.3924056037,"hourly_workers":19.7853152598,"non_hourly_workers":10.3577290651,"less_than_high_school":22.5674995405,"high_school":17.5009172051,"some_college":15.5368796508,"college":12.8029207326,"construction":19.8727742313,"finance":13.8966996879,"manufacturing":14.8818109417},{"date":"01/1/2015","all_workers":15.434294672,"hourly_workers":19.7199575643,"non_hourly_workers":10.5186040914,"less_than_high_school":23.4923226302,"high_school":17.6200506009,"some_college":15.4319473652,"college":12.7478717654,"construction":20.1490819053,"finance":13.6243876133,"manufacturing":14.3326837846},{"date":"02/1/2015","all_workers":15.2493010038,"hourly_workers":19.7612015464,"non_hourly_workers":10.1770537167,"less_than_high_school":23.5292839772,"high_school":17.1449060704,"some_college":15.1854938686,"college":12.8180502702,"construction":20.7863864983,"finance":13.3716729792,"manufacturing":13.5725652808},{"date":"03/1/2015","all_workers":15.3526376424,"hourly_workers":19.6534488682,"non_hourly_workers":10.506575338,"less_than_high_school":24.0466606988,"high_school":17.2342095519,"some_college":15.5709787242,"college":12.6709924051,"construction":20.8831661555,"finance":13.4448869805,"manufacturing":14.4351264773},{"date":"04/1/2015","all_workers":15.0908862923,"hourly_workers":19.1882460788,"non_hourly_workers":10.4326782341,"less_than_high_school":23.744829097,"high_school":16.6754693819,"some_college":15.3567080654,"college":12.576224847,"construction":19.8709759643,"finance":12.6298961904,"manufacturing":15.1462582919},{"date":"05/1/2015","all_workers":15.3671876483,"hourly_workers":19.6612869817,"non_hourly_workers":10.5944312794,"less_than_high_school":22.6519147956,"high_school":17.4504466263,"some_college":15.9305164519,"college":12.6771045375,"construction":20.0259735369,"finance":12.1553693181,"manufacturing":15.9068439281},{"date":"06/1/2015","all_workers":15.3810500138,"hourly_workers":19.4008013675,"non_hourly_workers":10.9558427888,"less_than_high_school":22.3546511557,"high_school":17.1992000014,"some_college":16.2329352721,"college":12.740876371,"construction":19.085700172,"finance":12.2910076839,"manufacturing":15.6504764113},{"date":"07/1/2015","all_workers":15.0977356034,"hourly_workers":19.1208805889,"non_hourly_workers":10.7284612648,"less_than_high_school":20.8685536853,"high_school":16.6526155363,"some_college":16.1536314889,"college":12.6081070351,"construction":17.4937030021,"finance":11.8805696854,"manufacturing":15.192259654},{"date":"08/1/2015","all_workers":15.0077443467,"hourly_workers":19.1268838476,"non_hourly_workers":10.5795164312,"less_than_high_school":19.5985663392,"high_school":16.2343984211,"some_college":16.3453348524,"college":12.7299067892,"construction":18.4700841247,"finance":12.8159450885,"manufacturing":15.3194075661},{"date":"09/1/2015","all_workers":15.116359224,"hourly_workers":19.4645127878,"non_hourly_workers":10.4904260789,"less_than_high_school":19.5973020282,"high_school":16.3778674388,"some_college":16.3747669254,"college":12.8827909644,"construction":18.7124266191,"finance":13.3090225186,"manufacturing":15.2027086846},{"date":"10/1/2015","all_workers":15.1720906191,"hourly_workers":19.8297096306,"non_hourly_workers":10.2722508845,"less_than_high_school":20.2145894864,"high_school":17.0963100325,"some_college":16.5172255168,"college":12.3965289254,"construction":19.495596928,"finance":13.6361073637,"manufacturing":15.6312849695},{"date":"11/1/2015","all_workers":15.2206855285,"hourly_workers":19.8356755276,"non_hourly_workers":10.4123747097,"less_than_high_school":20.1395529468,"high_school":16.9902577247,"some_college":16.2459190566,"college":12.798665376,"construction":18.8984194331,"finance":13.7655373991,"manufacturing":15.450201576},{"date":"12/1/2015","all_workers":15.3183429881,"hourly_workers":19.7953072513,"non_hourly_workers":10.5847220036,"less_than_high_school":20.1485274105,"high_school":17.4779298741,"some_college":16.1743579318,"college":12.842889973,"construction":17.7327787063,"finance":14.3437932132,"manufacturing":16.0320710283},{"date":"01/1/2016","all_workers":15.0656604397,"hourly_workers":19.7265033443,"non_hourly_workers":10.0789116263,"less_than_high_school":19.3803747726,"high_school":17.5197334494,"some_college":16.0789447033,"college":12.4515650006,"construction":18.1253688834,"finance":14.7216603232,"manufacturing":16.8251128451},{"date":"02/1/2016","all_workers":15.0883617509,"hourly_workers":19.5715223074,"non_hourly_workers":10.199412786,"less_than_high_school":18.5526582082,"high_school":17.7996717426,"some_college":16.2720693304,"college":12.2835324835,"construction":17.9203758473,"finance":13.8024733875,"manufacturing":16.8283828103},{"date":"03/1/2016","all_workers":14.8821865052,"hourly_workers":19.5478946673,"non_hourly_workers":9.7955810878,"less_than_high_school":17.2426734216,"high_school":17.845473977,"some_college":15.8455392493,"college":12.2870240894,"construction":17.8052333245,"finance":13.4071367698,"manufacturing":16.1505694464},{"date":"04/1/2016","all_workers":14.8467762741,"hourly_workers":19.6885130587,"non_hourly_workers":9.5622609978,"less_than_high_school":17.181332995,"high_school":17.7083491413,"some_college":15.6563693312,"college":12.3646063068,"construction":18.2867980489,"finance":13.7175388462,"manufacturing":16.2400496888},{"date":"05/1/2016","all_workers":14.5484253883,"hourly_workers":19.1722561804,"non_hourly_workers":9.4180975124,"less_than_high_school":17.6351229166,"high_school":17.1359500445,"some_college":15.2265694802,"college":12.1417341974,"construction":17.5511059593,"finance":13.7751684862,"manufacturing":15.8617681459},{"date":"06/1/2016","all_workers":14.109813273,"hourly_workers":18.7454832847,"non_hourly_workers":8.9592008458,"less_than_high_school":18.1472422171,"high_school":16.7524833601,"some_college":14.3928624811,"college":11.8213237052,"construction":17.7149282853,"finance":12.977996262,"manufacturing":15.8821979319},{"date":"07/1/2016","all_workers":14.2793423954,"hourly_workers":18.9009320877,"non_hourly_workers":9.1005132345,"less_than_high_school":18.8268684992,"high_school":16.5648993217,"some_college":14.5292753999,"college":12.1665165127,"construction":18.1033451191,"finance":12.5398764503,"manufacturing":16.2734635865},{"date":"08/1/2016","all_workers":14.1804989357,"hourly_workers":18.8833134754,"non_hourly_workers":8.8652440202,"less_than_high_school":20.2201164515,"high_school":16.6012586122,"some_college":14.3596245433,"college":11.776228534,"construction":17.2582638792,"finance":11.5483364303,"manufacturing":16.3962007883},{"date":"09/1/2016","all_workers":13.8072849683,"hourly_workers":18.1599056607,"non_hourly_workers":8.8734195333,"less_than_high_school":19.4361918791,"high_school":16.3106966984,"some_college":13.9893534262,"college":11.3872188522,"construction":16.5217719595,"finance":11.1276422276,"manufacturing":16.4015886828},{"date":"10/1/2016","all_workers":13.6582582096,"hourly_workers":17.7703936631,"non_hourly_workers":8.984500232,"less_than_high_school":18.5561796815,"high_school":15.6612689156,"some_college":14.0742504439,"college":11.4623306985,"construction":15.5682787384,"finance":10.9565919187,"manufacturing":15.9403825975},{"date":"11/1/2016","all_workers":13.7707402558,"hourly_workers":18.1551654218,"non_hourly_workers":8.7389833677,"less_than_high_school":18.7756159478,"high_school":15.6180386507,"some_college":14.596863504,"college":11.3677236747,"construction":16.9707803195,"finance":11.760586393,"manufacturing":15.7013381045},{"date":"12/1/2016","all_workers":13.7282754318,"hourly_workers":18.2029888346,"non_hourly_workers":8.6865577653,"less_than_high_school":18.2136985253,"high_school":14.9335601571,"some_college":15.1488746083,"college":11.3606184864,"construction":17.7097892654,"finance":10.8333604541,"manufacturing":15.7270826617},{"date":"01/1/2017","all_workers":13.7724069885,"hourly_workers":18.14864849,"non_hourly_workers":8.8308922829,"less_than_high_school":18.4721432053,"high_school":15.0075595937,"some_college":15.0848203981,"college":11.3916296614,"construction":16.6407906705,"finance":11.1587799482,"manufacturing":15.2565877286},{"date":"02/1/2017","all_workers":13.7253923547,"hourly_workers":18.1911679575,"non_hourly_workers":8.6832869564,"less_than_high_school":18.2873710128,"high_school":15.1441966237,"some_college":15.0533593607,"college":11.3069676023,"construction":17.1681271953,"finance":11.9459941296,"manufacturing":15.5455211421},{"date":"03/1/2017","all_workers":13.7976611323,"hourly_workers":18.0984990196,"non_hourly_workers":8.9388256579,"less_than_high_school":19.6609803726,"high_school":14.850475159,"some_college":15.1136716303,"college":11.3909344047,"construction":16.9810805105,"finance":11.7409957904,"manufacturing":15.6220749386}]

},{}],52:[function(require,module,exports){
'use strict';

// MODULES //

var copy = require( '@stdlib/utils/copy' );
var data = require( './../data/data.json' );


// MAIN //

/**
* Returns wage rates of U.S. workers that have not changed jobs within the year.
*
* @returns {ObjectArray} data
*
* @example
* var data = wages();
* // returns [{...},{...},...]
*/
function wages() {
	return copy( data );
} // end FUNCTION wages()


// EXPORTS //

module.exports = wages;

},{"./../data/data.json":51,"@stdlib/utils/copy":79}],53:[function(require,module,exports){
(function (__dirname){
'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var readJSON = require( '@stdlib/fs/read-json' ).sync;


// VARIABLES //

var fpath = resolve( __dirname, '..', 'data', 'data.json' );
var opts = {
	'encoding': 'utf8'
};


// MAIN //

/**
* Returns wage rates of U.S. workers that have not changed jobs within the year.
*
* ## Notes
*
* * This function synchronously reads data from disk for each invocation. Such behavior is intentional and so is the avoidance of `require`. We assume that invocations are infrequent, and we want to avoid the `require` cache. This means that we allow data to be garbage collected and a user is responsible for explicitly caching data.
*
*
* @throws {Error} unable to read data
* @returns {ObjectArray} data
*
* @example
* var data = wages();
* // returns [{...},{...},...]
*/
function wages() {
	var data = readJSON( fpath, opts );
	if ( data instanceof Error ) {
		throw data;
	}
	return data;
} // end FUNCTION wages()


// EXPORTS //

module.exports = wages;

}).call(this,"/lib/node_modules/@stdlib/datasets/frb-sf-wage-rigidity/lib")
},{"@stdlib/fs/read-json":60,"path":145}],54:[function(require,module,exports){
(function (__filename){
/* proxyquireify injected requires to make browserify include dependencies in the bundle */ /* istanbul ignore next */; (function __makeBrowserifyIncludeModule__() { require('./../lib');});'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require('proxyquireify')(require);
var isObjectArray = require( '@stdlib/assert/is-plain-object-array' );
var wages = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof wages, 'function', 'main export is a function' );
	t.end();
});

tape( 'main export is a function (browser)', function test( t ) {
	var wages = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': true
	});
	t.strictEqual( typeof wages, 'function', 'main export is a function' );
	t.end();
});

tape( 'main export is a function (non-browser)', function test( t ) {
	var wages = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': false
	});
	t.strictEqual( typeof wages, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an array of objects', function test( t ) {
	var data = wages();
	t.equal( isObjectArray( data ), true, 'returns an array of objects' );
	t.end();
});

tape( 'the function returns an array of objects (browser)', function test( t ) {
	var wages;
	var data;

	wages = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': true
	});

	data = wages();
	t.equal( isObjectArray( data ), true, 'returns an array of objects' );
	t.end();
});

tape( 'the function returns an array of objects (non-browser)', function test( t ) {
	var wages;
	var data;

	wages = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': false
	});

	data = wages();
	t.equal( isObjectArray( data ), true, 'returns an array of objects' );
	t.end();
});

tape( 'the function returns a copy', function test( t ) {
	var d1;
	var d2;
	var v;

	d1 = wages();
	d2 = wages();

	t.notEqual( d1, d2, 'different references' );

	v = d2[ 5 ];
	d1[ 5 ] = 'beep';

	t.equal( d1[ 5 ], 'beep', 'expected element' );
	t.notEqual( d1[ 5 ], d2[ 5 ], 'no shared state' );
	t.equal( d2[ 5 ], v, 'expected element' );

	t.end();
});

tape( 'the function returns a copy (browser)', function test( t ) {
	var wages;
	var d1;
	var d2;
	var v;

	wages = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': true
	});

	d1 = wages();
	d2 = wages();

	t.notEqual( d1, d2, 'different references' );

	v = d2[ 5 ];
	d1[ 5 ] = 'beep';

	t.equal( d1[ 5 ], 'beep', 'expected element' );
	t.notEqual( d1[ 5 ], d2[ 5 ], 'no shared state' );
	t.equal( d2[ 5 ], v, 'expected element' );

	t.end();
});

tape( 'the function returns a copy (non-browser)', function test( t ) {
	var wages;
	var d1;
	var d2;
	var v;

	wages = proxyquire( './../lib', {
		'@stdlib/assert/is-browser': false
	});

	d1 = wages();
	d2 = wages();

	t.notEqual( d1, d2, 'different references' );

	v = d2[ 5 ];
	d1[ 5 ] = 'beep';

	t.equal( d1[ 5 ], 'beep', 'expected element' );
	t.notEqual( d1[ 5 ], d2[ 5 ], 'no shared state' );
	t.equal( d2[ 5 ], v, 'expected element' );

	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/datasets/frb-sf-wage-rigidity/test/test.js")
},{"./../lib":52,"@stdlib/assert/is-plain-object-array":38,"proxyquireify":147,"tape":174}],55:[function(require,module,exports){
(function (__filename){
/* proxyquireify injected requires to make browserify include dependencies in the bundle */ /* istanbul ignore next */; (function __makeBrowserifyIncludeModule__() { require('./../lib/wages.js');});'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require('proxyquireify')(require);
var names = require( './../lib/wages.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof names, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if unable to load data', function test( t ) {
	var names = proxyquire( './../lib/wages.js', {
		'@stdlib/fs/read-json': {
			'sync': readJSON
		}
	});
	t.throws( names, Error, 'throws an error' );
	t.end();

	function readJSON() {
		return new Error( 'unable to read data' );
	}
});

}).call(this,"/lib/node_modules/@stdlib/datasets/frb-sf-wage-rigidity/test/test.wages.js")
},{"./../lib/wages.js":53,"proxyquireify":147,"tape":174}],56:[function(require,module,exports){
'use strict';

// MODULES //

var fs = require( 'fs' );


// MAIN //

/**
* Asynchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @param {Function} clbk - callback to invoke after reading file contents
*
* @example
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*/
function readFile() {
	var args;
	var i;
	args = new Array( arguments.length );
	for ( i = 0; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	fs.readFile.apply( null, args );
} // end FUNCTION readFile()


// EXPORTS //

module.exports = readFile;

},{"fs":113}],57:[function(require,module,exports){
'use strict';

/**
* Read the entire contents of a file.
*
* @module @stdlib/fs/read-file
*
* @example
* var readFile = require( '@stdlib/fs/read-file' );
*
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*
* @example
* var readFileSync = require( '@stdlib/fs/read-file' ).sync;
*
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var readFile = require( './async.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( readFile, 'sync', sync );


// EXPORTS //

module.exports = readFile;

},{"./async.js":56,"./sync.js":58,"@stdlib/utils/define-read-only-property":82}],58:[function(require,module,exports){
/* eslint-disable no-sync */
'use strict';

// MODULES //

var fs = require( 'fs' );


// MAIN //

/**
* Synchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @returns {(Buffer|string|Error)} file contents or an error
*
* @example
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/
function readFileSync( file, options ) {
	var f;
	try {
		if ( arguments.length > 1 ) {
			f = fs.readFileSync( file, options );
		} else {
			f = fs.readFileSync( file );
		}
	} catch ( err ) {
		return err;
	}
	return f;
} // end FUNCTION readFileSync()


// EXPORTS //

module.exports = readFileSync;

},{"fs":113}],59:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isObject = require( '@stdlib/assert/is-plain-object' );
var isFunction = require( '@stdlib/assert/is-function' );
var readFile = require( '@stdlib/fs/read-file' );
var removeBOM = require( '@stdlib/string/remove-utf8-bom' );
var parseJSON = require( '@stdlib/utils/parse-json' );
var instanceOf = require( '@stdlib/assert/instance-of' );


// MAIN //

/**
* Asynchronously reads a file as JSON.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Options|string)} [options] - options
* @param {(string|null)} [options.encoding] - file encoding
* @param {string} [options.flag] - file status flag
* @param {Function} [options.reviver] - JSON reviver
* @param {Callback} clbk - callback
* @throws {TypeError} options argument must be either a string or an object
* @throws {TypeError} callback argument must be a function
*
* @example
* var resolve = require( 'path' ).resolve;
*
* readJSON( resolve( __dirname, '..', 'package.json' ), onJSON );
*
* function onJSON( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.dir( data );
* }
*/
function readJSON( file, options, clbk ) {
	var opts;
	var done;
	if ( arguments.length < 3 ) {
		opts = {};
		done = options;
	} else {
		if ( isString( options ) ) {
			opts = {
				'encoding': options
			};
		} else {
			if ( !isObject( options ) ) {
				throw new TypeError( 'invalid input argument. Options argument must be either a string or an object. Value: `' + options + '`.' );
			}
			opts = options;
		}
		done = clbk;
	}
	if ( !isFunction( done ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + done + '`.' );
	}
	readFile( file, opts, onRead );

	/**
	* Callback invoked upon reading a file.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {(Buffer|string)} file - file contents
	* @returns {void}
	*/
	function onRead( error, file ) {
		if ( error ) {
			return done( error );
		}
		file = file.toString();
		if ( opts.encoding === 'utf8' ) {
			file = removeBOM( file );
		}
		if ( opts.reviver ) {
			file = parseJSON( file, opts.reviver );
		} else {
			file = parseJSON( file );
		}
		if ( instanceOf( file, Error ) ) {
			return done( file );
		}
		done( null, file );
	} // end FUNCTION onRead()
} // end FUNCTION readJSON()


// EXPORTS //

module.exports = readJSON;

},{"@stdlib/assert/instance-of":3,"@stdlib/assert/is-function":13,"@stdlib/assert/is-plain-object":39,"@stdlib/assert/is-string":42,"@stdlib/fs/read-file":57,"@stdlib/string/remove-utf8-bom":73,"@stdlib/utils/parse-json":100}],60:[function(require,module,exports){
'use strict';

/**
* Read a file as JSON.
*
* @module @stdlib/fs/read-json
*
* @example
* var resolve = require( 'path' ).resolve;
* var readJSON = require( '@stdlib/fs/read-json' );
*
* function onJSON( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.dir( data );
* }
*
* readJSON( resolve( __dirname, '..', 'package.json' ), onJSON );
*
* @example
* var resolve = require( 'path' ).resolve;
* var instanceOf = require( '@stdlib/assert/instance-of' );
* var readJSON = require( '@stdlib/fs/read-json' );
*
* var out = readJSON.sync( resolve( __dirname, '..', 'package.json' ) );
* if ( instanceOf( out, Error ) ) {
*     throw out;
* }
* console.dir( out );
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var readJSON = require( './async.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( readJSON, 'sync', sync );


// EXPORTS //

module.exports = readJSON;

},{"./async.js":59,"./sync.js":61,"@stdlib/utils/define-read-only-property":82}],61:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isObject = require( '@stdlib/assert/is-plain-object' );
var readFile = require( '@stdlib/fs/read-file' ).sync;
var removeBOM = require( '@stdlib/string/remove-utf8-bom' );
var parseJSON = require( '@stdlib/utils/parse-json' );
var instanceOf = require( '@stdlib/assert/instance-of' );


// MAIN //

/**
* Synchronously reads a file as JSON.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Options|string)} [options] - options
* @param {(string|null)} [options.encoding] - file encoding
* @param {string} [options.flag] - file status flag
* @param {Function} [options.reviver] - JSON reviver
* @throws {TypeError} options argument must be either a string or an object
* @returns {(JSON|Error)} JSON or an error
*
* @example
* var resolve = require( 'path' ).resolve;
* var instanceOf = require( '@stdlib/assert/instance-of' );
*
* var out = readJSONSync( resolve( __dirname, '..', 'package.json' ) );
* if ( instanceOf( out, Error ) ) {
*     throw out;
* }
* console.dir( out );
*/
function readJSONSync( file, options ) {
	var opts;
	var f;
	if ( arguments.length > 1 ) {
		if ( isString( options ) ) {
			opts = {
				'encoding': options
			};
		} else {
			if ( !isObject( options ) ) {
				throw new TypeError( 'invalid input argument. Options argument must be either a string or an object. Value: `' + options + '`.' );
			}
			opts = options;
		}
	} else {
		opts = {};
	}
	f = readFile( file, opts );
	if ( instanceOf( f, Error ) ) {
		return f;
	}
	f = f.toString();
	if ( opts.encoding === 'utf8' ) {
		f = removeBOM( f );
	}
	if ( opts.reviver ) {
		return parseJSON( f, opts.reviver );
	}
	return parseJSON( f );
} // end FUNCTION readJSONSync()


// EXPORTS //

module.exports = readJSONSync;

},{"@stdlib/assert/instance-of":3,"@stdlib/assert/is-plain-object":39,"@stdlib/assert/is-string":42,"@stdlib/fs/read-file":57,"@stdlib/string/remove-utf8-bom":73,"@stdlib/utils/parse-json":100}],62:[function(require,module,exports){
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

},{"./is_integer.js":63}],63:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":67}],64:[function(require,module,exports){
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

},{"./is_nan.js":65}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{}],67:[function(require,module,exports){
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

},{"./floor.js":66}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/math/constants/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/math/constants/uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* The maximum unsigned 32-bit integer is given by
*
* ``` tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 11111111111111111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var UINT32_MAX = 4294967295;


// EXPORTS //

module.exports = UINT32_MAX;

},{}],71:[function(require,module,exports){
'use strict';

/**
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
* @type {RegExp}
*
* @example
* var RE_FUNCTION_NAME = require( '@stdlib/utils/regexp/function-name' );
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/


// MAIN //

/**
* Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* Regular expression: `/^\s*function\s*([^(]*)/i`
*
* * `/^\s*`
*   - Match zero or more spaces at beginning
* * `function`
*   - Match the word `function`
* * `\s*`
*   - Match zero or more spaces after the word `function`
* * `()`
*   - Capture
* * `[^(]*`
*   - Match anything except a left parenthesis `(` zero or more times
* * `/i`
*   - ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = /^\s*function\s*([^(]*)/i;


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{}],72:[function(require,module,exports){
'use strict';

/**
* Regular expression to parse a regular expression string.
*
* @module @stdlib/regexp/regexp
* @type {RegExp}
*
* @example
* var RE_REGEXP = require( '@stdlib/regexp/regexp' );
*
* var bool = RE_REGEXP.test( '/^beep$/' );
* // returns true
*
* bool = RE_REGEXP.test( '' );
* // returns false
*
* @example
* var RE_REGEXP = require( '@stdlib/regexp/regexp' );
*
* var parts = RE_REGEXP.exec( '/^.*$/ig' );
* // returns [ '/^.*$/ig', '^.*$', 'ig', 'index': 0, 'input': '/^.*$/ig' ]
*/


// MAIN //

/**
* Matches parts of a regular expression string.
*
* Regular expression: `/^\/((?:\\\/|[^\/])+)\/([imgy]*)$/`
*
* * `/^\/`
*   - match a string that begins with a `/`
* * `()`
*   - capture
* * `(?:)+`
*   - capture, but do not remember, a group of characters which occur one or more times
* * `\\\/`
*   - match the literal `\/`
* * `|`
*   - OR
* * `[^\/]`
*   - anything which is not the literal `\/`
* * `\/`
*   - match the literal `/`
* * `([imgy]*)`
*   - capture any characters matching `imgy` occurring zero or more times
* * `$/`
*   - string end
*
*
* @constant
* @type {RegExp}
* @default /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/
*/
var RE_REGEXP = /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/; // eslint-disable-line no-useless-escape


// EXPORTS //

module.exports = RE_REGEXP;

},{}],73:[function(require,module,exports){
'use strict';

/**
* Remove a UTF-8 byte order mark (BOM) from the beginning of a string.
*
* @module @stdlib/string/remove-utf8-bom
*
* @example
* var removeUTF8BOM = require( '@stdlib/string/remove-utf8-bom' );
*
* var str = removeUTF8BOM( '\ufeffbeep' );
* // returns 'beep'
*/

// MODULES //

var removeUTF8BOM = require( './remove_utf_8_bom.js' );


// EXPORTS //

module.exports = removeUTF8BOM;

},{"./remove_utf_8_bom.js":74}],74:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

// '\ufeff' => 1111111011111111 => 0xFEFF => 65279
var BOM = 65279;


// MAIN //

/**
* Removes a UTF-8 byte order mark (BOM) from the beginning of a string.
*
* ## Notes
*
* * A UTF-8 byte order mark ([BOM][1]) is the byte sequence `0xEF,0xBB,0xBF`.
*
* * To convert a UTF-8 encoded `Buffer` to a `string`, the `Buffer` must be converted to [UTF-16][2]. The BOM thus gets converted to the single 16-bit code point `'\ufeff'` (UTF-16 BOM).
*
* [1]: https://en.wikipedia.org/wiki/Byte_order_mark#UTF-8
* [2]: http://es5.github.io/#x4.3.16
*
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} string with BOM removed
*
* @example
* var str = removeUTF8BOM( '\ufeffbeep' );
* // returns 'beep'
*/
function removeUTF8BOM( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	if ( str.charCodeAt( 0 ) === BOM ) {
		return str.slice( 1 );
	}
	return str;
} // end FUNCTION removeUTF8BOM()


// EXPORTS //

module.exports = removeUTF8BOM;

},{"@stdlib/assert/is-string":42}],75:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var RE = require( '@stdlib/regexp/function-name' );
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Determines the name of a value's constructor.
*
* @param {*} v - input value
* @returns {string} name of a value's constructor
*
* @example
* var v = constructorName( 'a' );
* // returns 'String'
* @example
* var v = constructorName( 5 );
* // returns 'Number'
* @example
* var v = constructorName( null );
* // returns 'Null'
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
* @example
* var v = constructorName( function noop(){} );
* // returns 'Function'
*/
function constructorName( v ) {
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		return RE.exec( ctor.toString() )[ 1 ];
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
} // end FUNCTION constructorName()


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":9,"@stdlib/regexp/function-name":71,"@stdlib/utils/native-class":95}],76:[function(require,module,exports){
'use strict';

/**
* Determines the name of a value's constructor.
*
* @module @stdlib/utils/constructor-name
*
* @example
* var constructorName = require( '@stdlib/utils/constructor-name' );
*
* var v = constructorName( 'a' );
* // returns 'String'
*
* v = constructorName( {} );
* // returns 'Object'
*
* v = constructorName( true );
* // returns 'Boolean'
*/

// MODULES //

var constructorName = require( './constructor_name.js' );


// EXPORTS //

module.exports = constructorName;

},{"./constructor_name.js":75}],77:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var deepCopy = require( './deep_copy.js' );


// MAIN //

/**
* Copies or deep clones a value to an arbitrary depth.
*
* @param {*} value - value to copy
* @param {NonNegativeInteger} [level=+infinity] - copy depth
* @returns {*} value copy
*
* @example
* var out = copy( 'beep' );
* // returns 'beep'
*
* @example
* var value = [
*     {
*         'a': 1,
*         'b': true,
*         'c': [ 1, 2, 3 ]
*     }
* ];
* var out = copy( value );
* // returns [ { 'a': 1, 'b': true, 'c': [ 1, 2, 3 ] } ]
*
* var bool = ( value[0].c === out[0].c );
* // returns false
*/
function copy( value, level ) {
	var out;
	if ( arguments.length > 1 ) {
		if ( !isNonNegativeInteger( level ) ) {
			throw new TypeError( 'invalid input argument. `level` must be a nonnegative integer. Value: `' + level + '`.' );
		}
		if ( level === 0 ) {
			return value;
		}
	} else {
		level = PINF;
	}
	out = ( isArray(value) ) ? [] : {};
	return deepCopy( value, out, [value], [out], level );
} // end FUNCTION copy()


// EXPORTS //

module.exports = copy;

},{"./deep_copy.js":78,"@stdlib/assert/is-array":7,"@stdlib/assert/is-nonnegative-integer":25,"@stdlib/math/constants/float64-pinf":69}],78:[function(require,module,exports){
(function (Buffer){
'use strict';

// MODULES //

var objectKeys = require( 'object-keys' ).shim();
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isArray = require( '@stdlib/assert/is-array' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var isError = require( '@stdlib/assert/is-error' );
var typeOf = require( '@stdlib/utils/type-of' );
var regexp = require( '@stdlib/utils/regexp-from-string' );
var indexOf = require( '@stdlib/utils/index-of' );
var typedArrays = require( './typed_arrays.js' );


// FUNCTIONS //

/**
* Clones a class instance.
*
* #### Notes
*
* * This should __only__ be used for simple cases. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This approach should be considered __fragile__.
* * The function is greedy, disregarding the notion of a `level`. Instead, the function deep copies all properties, as we assume the concept of `level` applies only to the class instance reference but not to its internal state. This prevents, in theory, two instances from sharing state.
*
*
* @private
* @param {Object} val - class instance
* @returns {Object} new instance
*/
function cloneInstance( val ) {
	var cache = [];
	var refs = [];
	var names;
	var name;
	var desc;
	var tmp;
	var ref;
	var i;

	ref = Object.create( Object.getPrototypeOf( val ) );
	cache.push( val );
	refs.push( ref );

	names = Object.getOwnPropertyNames( val );
	for ( i = 0; i < names.length; i++ ) {
		name = names[ i ];
		desc = Object.getOwnPropertyDescriptor( val, name );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( val[name] ) ) ? [] : {};
			desc.value = deepCopy( val[name], tmp, cache, refs, -1 );
		}
		Object.defineProperty( ref, name, desc );
	}
	if ( !Object.isExtensible( val ) ) {
		Object.preventExtensions( ref );
	}
	if ( Object.isSealed( val ) ) {
		Object.seal( ref );
	}
	if ( Object.isFrozen( val ) ) {
		Object.freeze( ref );
	}
	return ref;
} // end FUNCTION cloneInstance()

/**
* Copies an error object.
*
* @private
* @param {(Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|EvalError)} error - error to copy
* @returns {(Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|EvalError)} error copy
*
* @example
* var err1 = new TypeError( 'beep' );
*
* var err2 = copyError( err1 );
* // returns <TypeError>
*/
function copyError( error ) {
	/* jshint newcap:false */ // TODO: eslint
	var cache = [];
	var refs = [];
	var keys;
	var desc;
	var tmp;
	var key;
	var err;
	var i;

	// Create a new error...
	err = new error.constructor( error.message );

	cache.push( error );
	refs.push( err );

	// If a `stack` property is present, copy it over...
	if ( error.stack ) {
		err.stack = error.stack;
	}
	// Node.js specific (system errors)...
	if ( error.code ) {
		err.code = error.code;
	}
	if ( error.errno ) {
		err.errno = error.errno;
	}
	if ( error.syscall ) {
		err.syscall = error.syscall;
	}
	// Any enumerable properties...
	keys = objectKeys( error );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		desc = Object.getOwnPropertyDescriptor( error, key );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( error[ key ] ) ) ? [] : {};
			desc.value = deepCopy( error[ key ], tmp, cache, refs, -1 );
		}
		Object.defineProperty( err, key, desc );
	}
	return err;
} // end FUNCTION copyError()


// MAIN //

/**
* Recursively performs a deep copy of an input object.
*
* @private
* @param {*} val - value to copy
* @param {(Array|Object)} copy - copy
* @param {Array} cache - an array of visited objects
* @param {Array} refs - an array of object references
* @param {NonNegativeInteger} level - copy depth
* @returns {*} deep copy
*/
function deepCopy( val, copy, cache, refs, level ) {
	var parent;
	var keys;
	var name;
	var desc;
	var ctor;
	var key;
	var ref;
	var x;
	var i;
	var j;

	level -= 1;

	// Primitives and functions...
	if (
		typeof val !== 'object' ||
		val === null
	) {
		return val;
	}
	if ( isBuffer( val ) ) {
		return new Buffer( val );
	}
	if ( isError( val ) ) {
		return copyError( val );
	}
	// Objects...
	name = typeOf( val );

	if ( name === 'date' ) {
		return new Date( +val );
	}
	if ( name === 'regexp' ) {
		return regexp( val.toString() );
	}
	if ( name === 'set' ) {
		return new Set( val );
	}
	if ( name === 'map' ) {
		return new Map( val );
	}
	if (
		name === 'string' ||
		name === 'boolean' ||
		name === 'number'
	) {
		// If provided an `Object`, return an equivalent primitive!
		return val.valueOf();
	}
	ctor = typedArrays[ name ];
	if ( ctor ) {
		return ctor( val );
	}
	// Class instances...
	if (
		name !== 'array' &&
		name !== 'object'
	) {
		// Cloning requires ES5 or higher...
		if ( typeof Object.freeze === 'function' ) {
			return cloneInstance( val );
		}
		return {};
	}
	// Arrays and plain objects...
	keys = objectKeys( val );
	if ( level > 0 ) {
		parent = name;
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			x = val[ key ];

			// Primitive, Buffer, special class instance...
			name = typeOf( x );
			if (
				typeof x !== 'object' ||
				x === null ||
				(
					name !== 'array' &&
					name !== 'object'
				) ||
				isBuffer( x )
			) {
				if ( parent === 'object' ) {
					desc = Object.getOwnPropertyDescriptor( val, key );
					if ( hasOwnProp( desc, 'value' ) ) {
						desc.value = deepCopy( x );
					}
					Object.defineProperty( copy, key, desc );
				} else {
					copy[ key ] = deepCopy( x );
				}
				continue;
			}
			// Circular reference...
			i = indexOf( cache, x );
			if ( i !== -1 ) {
				copy[ key ] = refs[ i ];
				continue;
			}
			// Plain array or object...
			ref = ( isArray(x) ) ? [] : {};
			cache.push( x );
			refs.push( ref );
			if ( parent === 'array' ) {
				copy[ key ] = deepCopy( x, ref, cache, refs, level );
			} else {
				desc = Object.getOwnPropertyDescriptor( val, key );
				if ( hasOwnProp( desc, 'value' ) ) {
					desc.value = deepCopy( x, ref, cache, refs, level );
				}
				Object.defineProperty( copy, key, desc );
			}
		}
	} else if ( name === 'array' ) {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			copy[ key ] = val[ key ];
		}
	} else {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			desc = Object.getOwnPropertyDescriptor( val, key );
			Object.defineProperty( copy, key, desc );
		}
	}
	if ( !Object.isExtensible( val ) ) {
		Object.preventExtensions( copy );
	}
	if ( Object.isSealed( val ) ) {
		Object.seal( copy );
	}
	if ( Object.isFrozen( val ) ) {
		Object.freeze( copy );
	}
	return copy;
} // end FUNCTION deepCopy()


// EXPORTS //

module.exports = deepCopy;

}).call(this,require("buffer").Buffer)
},{"./typed_arrays.js":80,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-array":7,"@stdlib/assert/is-buffer":9,"@stdlib/assert/is-error":11,"@stdlib/utils/index-of":93,"@stdlib/utils/regexp-from-string":103,"@stdlib/utils/type-of":108,"buffer":115,"object-keys":143}],79:[function(require,module,exports){
'use strict';

/**
* Copy or deep clone a value to an arbitrary depth.
*
* @module @stdlib/utils/copy
*
* @example
* var copy = require( '@stdlib/utils/copy' );
*
* var out = copy( 'beep' );
* // returns 'beep'
*
* @example
* var copy = require( '@stdlib/utils/copy' );
*
* var value = [
*     {
*         'a': 1,
*         'b': true,
*         'c': [ 1, 2, 3 ]
*     }
* ];
* var out = copy( value );
* // returns [ {'a': 1, 'b': true, 'c': [ 1, 2, 3 ] } ]
*
* var bool = ( value[0].c === out[0].c );
* // returns false
*/

// MODULES //

var copy = require( './copy.js' );


// EXPORTS //

module.exports = copy;

},{"./copy.js":77}],80:[function(require,module,exports){
/* eslint-disable no-new-func */
'use strict';

// MAIN //

var ctors = [
	'Int8Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Int16Array',
	'Uint16Array',
	'Int32Array',
	'Uint32Array',
	'Float32Array',
	'Float64Array'
];

/**
* Create functions for copying typed arrays.
*
* @private
* @returns {Object} typed array functions
*/
function createTypedArrayFcns() {
	var typedArrays = {};
	var ctor;
	var i;
	for ( i = 0; i < ctors.length; i++ ) {
		ctor = ctors[ i ];
		typedArrays[ ctor.toLowerCase() ] = new Function( 'arr', 'return new '+ctor+'( arr );' );
	}
	return typedArrays;
} // end FUNCTION createTypedArrayFcns()


// EXPORTS //

module.exports = createTypedArrayFcns();

},{}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{"./define_read_only_property.js":81}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{"./detect_symbol_support.js":83}],85:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":84}],86:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":85}],87:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = require( './native.js' );
} else {
	getProto = require( './polyfill.js' );
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":90,"./polyfill.js":91,"@stdlib/assert/is-function":13}],88:[function(require,module,exports){
'use strict';

// MODULES //

var getProto = require( './detect.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @param {*} value - input value
* @returns {(Object|null)} prototype
*
* @example
* var proto = getPrototypeOf( {} );
* // returns {}
*/
function getPrototypeOf( value ) {
	if (
		value === null ||
		value === void 0
	) {
		return null;
	}
	// In order to ensure consistent ES5/ES6 behavior, cast input value to an object (strings, numbers, booleans); ES5 `Object.getPrototypeOf` throws when provided primitives and ES6 `Object.getPrototypeOf` casts:
	value = Object( value );

	return getProto( value );
} // end FUNCTION getPrototypeOf()


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":87}],89:[function(require,module,exports){
'use strict';

/**
* Return the prototype of a provided object.
*
* @module @stdlib/utils/get-prototype-of
*
* @example
* var getPrototype = require( '@stdlib/utils/get-prototype-of' );
*
* var proto = getPrototype( {} );
* // returns {}
*/

// MODULES //

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":88}],90:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],91:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var getProto = require( './proto.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @private
* @param {Object} obj - input object
* @returns {(Object|null)} prototype
*/
function getPrototypeOf( obj ) {
	var proto = getProto( obj );
	if ( proto || proto === null ) {
		return proto;
	}
	if ( nativeClass( obj.constructor ) === '[object Function]' ) {
		// May break if the constructor has been tampered with...
		return obj.constructor.prototype;
	}
	if ( obj instanceof Object ) {
		return Object.prototype;
	}
	// Return `null` for objects created via `Object.create( null )`. Also return `null` for cross-realm objects on browsers that lack `__proto__` support, such as IE < 11.
	return null;
} // end FUNCTION getPrototypeOf()


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":92,"@stdlib/utils/native-class":95}],92:[function(require,module,exports){
'use strict';

/**
* Returns the value of the `__proto__` property.
*
* @private
* @param {Object} obj - input object
* @returns {*} value of `__proto__` property
*/
function getProto( obj ) {
	// eslint-disable-next-line no-proto
	return obj.__proto__;
} // end FUNCTION getProto()


// EXPORTS //

module.exports = getProto;

},{}],93:[function(require,module,exports){
'use strict';

/**
* Return the first index at which a given element can be found.
*
* @module @stdlib/utils/index-of
*
* @example
* var indexOf = require( '@stdlib/utils/index-of' );
*
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* arr = [ 4, 3, 2, 1 ];
* idx = indexOf( arr, 5 );
* // returns -1
*
* // Using a `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, 3 );
* // returns 5
*
* // `fromIndex` which exceeds `array` length:
* arr = [ 1, 2, 3, 4, 2, 5 ];
* idx = indexOf( arr, 2, 10 );
* // returns -1
*
* // Negative `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* // Negative `fromIndex` exceeding input `array` length:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, -10 );
* // returns 1
*
* // Array-like objects:
* var str = 'bebop';
* idx = indexOf( str, 'o' );
* // returns 3
*/

// MODULES //

var indexOf = require( './index_of.js' );


// EXPORTS //

module.exports = indexOf;

},{"./index_of.js":94}],94:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/assert/is-nan' );
var isArrayLike = require( '@stdlib/assert/is-array-like' );
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Returns the first index at which a given element can be found.
*
* @param {ArrayLike} arr - array-like object
* @param {*} searchElement - element to find
* @param {integer} [fromIndex] - starting index (if negative, the start index is determined relative to last element)
* @throws {TypeError} must provide an array-like object
* @throws {TypeError} `fromIndex` must be an integer
* @returns {integer} index or -1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 5 );
* // returns -1
*
* @example
* // Using a `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, 3 );
* // returns 5
*
* @example
* // `fromIndex` which exceeds `array` length:
* var arr = [ 1, 2, 3, 4, 2, 5 ];
* var idx = indexOf( arr, 2, 10 );
* // returns -1
*
* @example
* // Negative `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* var idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* @example
* // Negative `fromIndex` exceeding input `array` length:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, -10 );
* // returns 1
*
* @example
* // Array-like objects:
* var str = 'bebop';
* var idx = indexOf( str, 'o' );
* // returns 3
*/
function indexOf( arr, searchElement, fromIndex ) {
	var len;
	var i;
	if ( !isArrayLike( arr ) ) {
		throw new TypeError( 'invalid input argument. First argument must be an array-like object. Value: `' + arr + '`.' );
	}
	len = arr.length;
	if ( len === 0 ) {
		return -1;
	}
	if ( arguments.length === 3 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( 'invalid input argument. `fromIndex` must be an integer. Value: `' + fromIndex + '`.' );
		}
		if ( fromIndex >= 0 ) {
			if ( fromIndex >= len ) {
				return -1;
			}
			i = fromIndex;
		} else {
			i = len + fromIndex;
			if ( i < 0 ) {
				i = 0;
			}
		}
	} else {
		i = 0;
	}
	// Check for `NaN`...
	if ( isnan( searchElement ) ) {
		for ( ; i < len; i++ ) {
			if ( isnan( arr[i] ) ) {
				return i;
			}
		}
	} else {
		for ( ; i < len; i++ ) {
			if ( arr[ i ] === searchElement ) {
				return i;
			}
		}
	}
	return -1;
} // end FUNCTION indexOf()


// EXPORTS //

module.exports = indexOf;

},{"@stdlib/assert/is-array-like":5,"@stdlib/assert/is-integer":16,"@stdlib/assert/is-nan":21}],95:[function(require,module,exports){
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

},{"./native_class.js":96,"./polyfill.js":97,"@stdlib/utils/detect-tostringtag-support":86}],96:[function(require,module,exports){
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

},{"./tostring.js":98}],97:[function(require,module,exports){
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

},{"./tostring.js":98,"./tostringtag.js":99,"@stdlib/assert/has-own-property":2}],98:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],99:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],100:[function(require,module,exports){
'use strict';

/**
* Parse a string as JSON.
*
* @module @stdlib/utils/parse-json
*
* @example
* var parseJSON = require( '@stdlib/utils/parse-json' );
*
* var obj = parseJSON( '{"beep":"boop"}' );
* // returns {'beep':'boop'}
*/

// MODULES //

var parseJSON = require( './parse_json.js' );


// EXPORTS //

module.exports = parseJSON;

},{"./parse_json.js":101}],101:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

/**
* Attempts to parse a string as JSON.
*
* @param {string} str - string to parse
* @param {Function} reviver - transformation function
* @throws {TypeError} first argument must be a string
* @throws {TypeError} reviver must be a function
* @returns {(*|Error)} parsed value or parse error
*
* @example
* var obj = parseJSON( '{"beep":"boop"}' );
* // returns {'beep':'boop'}
*/
function parseJSON( str, reviver ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isFunction( reviver ) ) {
			throw new TypeError( 'invalid input argument. Reviver argument must be a function. Value: `' + reviver + '`.' );
		}
	}
	try {
		return JSON.parse( str, reviver );
	} catch ( error ) {
		return error;
	}
} // end FUNCTION parseJSON()


// EXPORTS //

module.exports = parseJSON;

},{"@stdlib/assert/is-function":13,"@stdlib/assert/is-string":42}],102:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var RE = require( '@stdlib/regexp/regexp' );


// MAIN //

/**
* Parses a regular expression string and returns a new regular expression.
*
* @param {string} str - regular expression string
* @returns {(RegExp|null)} regular expression or null
*
* @example
* var re = reFromString( '/beep/' )
* // returns /beep/
*/
function reFromString( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a regular expression string. Value: `' + str + '`.' );
	}
	// Capture the regular expression pattern and any flags:
	str = RE.exec( str );

	// Create a new regular expression:
	return ( str ) ? new RegExp( str[1], str[2] ) : null;
} // end FUNCTION reFromString()


// EXPORTS //

module.exports = reFromString;

},{"@stdlib/assert/is-string":42,"@stdlib/regexp/regexp":72}],103:[function(require,module,exports){
'use strict';

/**
* Create a regular expression from a regular expression string.
*
* @module @stdlib/utils/regexp-from-string
*
* @example
* var reFromString = require( '@stdlib/utils/regexp-from-string' );
*
* var re = reFromString( '/beep/' );
* // returns /beep/
*/

// MODULES //

var reFromString = require( './from_string.js' );


// EXPORTS //

module.exports = reFromString;

},{"./from_string.js":102}],104:[function(require,module,exports){
'use strict';

// MODULES //

var RE = require( './fixtures/re.js' );
var nodeList = require( './fixtures/nodelist.js' );
var typedarray = require( './fixtures/typedarray.js' );


// MAIN //

/**
* Checks whether a polyfill is needed when using the `typeof` operator.
*
* @private
* @returns {boolean} boolean indicating whether a polyfill is needed
*/
function check() {
	if (
		// Chrome 1-12 returns 'function' for regular expression instances (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):
		typeof RE === 'function' ||
		// Safari 8 returns 'object' for typed array and weak map constructors (underscore #1929):
		typeof typedarray === 'object' ||
		// PhantomJS 1.9 returns 'function' for `NodeList` instances (underscore #2236):
		typeof nodeList === 'function'
	) {
		return true;
	}
	return false;
} // end FUNCTION check()


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":105,"./fixtures/re.js":106,"./fixtures/typedarray.js":107}],105:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":171}],106:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],107:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],108:[function(require,module,exports){
'use strict';

/**
* Determine a value's type.
*
* @module @stdlib/utils/type-of
*
* @example
* var typeOf = require( '@stdlib/utils/type-of' );
*
* var str = typeOf( 'a' );
* // returns 'string'
*
* str = typeOf( 5 );
* // returns 'number'
*/

// MODULES //

var usePolyfill = require( './check.js' );
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// EXPORTS //

module.exports = ( usePolyfill() ) ? polyfill : typeOf;

},{"./check.js":104,"./polyfill.js":109,"./typeof.js":110}],109:[function(require,module,exports){
'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	return ctorName( v ).toLowerCase();
} // end FUNCTION typeOf()


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":76}],110:[function(require,module,exports){
'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ``` text
* typeof null => 'object'
* typeof undefined => 'undefined'
* typeof 'a' => 'string'
* typeof 5 => 'number'
* typeof NaN => 'number'
* typeof true => 'boolean'
* typeof false => 'boolean'
* typeof {} => 'object'
* typeof [] => 'object'
* typeof function foo(){} => 'function'
* typeof function* foo(){} => 'object'
* typeof Symbol() => 'symbol'
* ```
*
*/


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	var type;

	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if ( v === null ) {
		return 'null';
	}
	type = typeof v;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if ( type === 'object' ) {
		return ctorName( v ).toLowerCase();
	}
	return type;
} // end FUNCTION typeOf()


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":76}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){

},{}],113:[function(require,module,exports){
arguments[4][112][0].apply(exports,arguments)
},{"dup":112}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{"base64-js":111,"ieee754":135}],116:[function(require,module,exports){
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
},{"../../is-buffer/index.js":137}],117:[function(require,module,exports){
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

},{"./lib/is_arguments.js":118,"./lib/keys.js":119}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],120:[function(require,module,exports){
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

},{"foreach":131,"object-keys":143}],121:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],122:[function(require,module,exports){
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

},{"./helpers/isFinite":123,"./helpers/isNaN":124,"./helpers/mod":125,"./helpers/sign":126,"es-to-primitive/es5":127,"has":134,"is-callable":138}],123:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],124:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],125:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],126:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],127:[function(require,module,exports){
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

},{"./helpers/isPrimitive":128,"is-callable":138}],128:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
'use strict'

var mergeDescriptors = require('merge-descriptors')
var isObject = require('is-object')
var hasOwnProperty = Object.prototype.hasOwnProperty

function fill (destination, source, merge) {
  if (destination && (isObject(source) || isFunction(source))) {
    merge(destination, source, false)
    if (isFunction(destination) && isFunction(source) && source.prototype) {
      merge(destination.prototype, source.prototype, false)
    }
  }
  return destination
}

exports = module.exports = function fillKeys (destination, source) {
  return fill(destination, source, mergeDescriptors)
}

exports.es3 = function fillKeysEs3 (destination, source) {
  return fill(destination, source, es3Merge)
}

function es3Merge (destination, source) {
  for (var key in source) {
    if (!hasOwnProperty.call(destination, key)) {
      destination[key] = source[key]
    }
  }
  return destination
}

function isFunction (value) {
  return typeof value === 'function'
}

},{"is-object":139,"merge-descriptors":140}],131:[function(require,module,exports){

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


},{}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":132}],134:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":133}],135:[function(require,module,exports){
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

},{}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],140:[function(require,module,exports){
/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = merge

/**
 * Module variables.
 * @private
 */

var hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */

function merge(dest, src, redefine) {
  if (!dest) {
    throw new TypeError('argument dest is required')
  }

  if (!src) {
    throw new TypeError('argument src is required')
  }

  if (redefine === undefined) {
    // Default to true
    redefine = true
  }

  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
    if (!redefine && hasOwnProperty.call(dest, name)) {
      // Skip desriptor
      return
    }

    // Copy descriptor
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    Object.defineProperty(dest, name, descriptor)
  })

  return dest
}

},{}],141:[function(require,module,exports){
'use strict'

module.exports = function createNotFoundError (path) {
  var err = new Error('Cannot find module \'' + path + '\'')
  err.code = 'MODULE_NOT_FOUND'
  return err
}

},{}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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

},{"./isArguments":144}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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
},{"_process":114}],146:[function(require,module,exports){
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
},{"_process":114}],147:[function(require,module,exports){
'use strict';

var fillMissingKeys = require('fill-keys');
var moduleNotFoundError = require('module-not-found-error');

function ProxyquireifyError(msg) {
  this.name = 'ProxyquireifyError';
  Error.captureStackTrace(this, ProxyquireifyError);
  this.message = msg || 'An error occurred inside proxyquireify.';
}

function validateArguments(request, stubs) {
  var msg = (function getMessage() {
    if (!request)
      return 'Missing argument: "request". Need it to resolve desired module.';

    if (!stubs)
      return 'Missing argument: "stubs". If no stubbing is needed, use regular require instead.';

    if (typeof request != 'string')
      return 'Invalid argument: "request". Needs to be a requirable string that is the module to load.';

    if (typeof stubs != 'object')
      return 'Invalid argument: "stubs". Needs to be an object containing overrides e.g., {"path": { extname: function () { ... } } }.';
  })();

  if (msg) throw new ProxyquireifyError(msg);
}

var stubs;

function stub(stubs_) {
  stubs = stubs_;
  // This cache is used by the prelude as an alternative to the regular cache.
  // It is not read or written here, except to set it to an empty object when
  // adding stubs and to reset it to null when clearing stubs.
  module.exports._cache = {};
}

function reset() {
  stubs = undefined;
  module.exports._cache = null;
}

var proxyquire = module.exports = function (require_) {
  if (typeof require_ != 'function')
    throw new ProxyquireifyError(
        'It seems like you didn\'t initialize proxyquireify with the require in your test.\n'
      + 'Make sure to correct this, i.e.: "var proxyquire = require(\'proxyquireify\')(require);"'
    );

  reset();

  return function(request, stubs) {

    validateArguments(request, stubs);

    // set the stubs and require dependency
    // when stub require is invoked by the module under test it will find the stubs here
    stub(stubs);
    var dep = require_(request);
    reset();

    return dep;
  };
};

// Start with the default cache
proxyquire._cache = null;

proxyquire._proxy = function (require_, request) {
  function original() {
    return require_(request);
  }

  if (!stubs || !stubs.hasOwnProperty(request)) return original();

  var stub = stubs[request];

  if (stub === null) throw moduleNotFoundError(request)

  var stubWideNoCallThru = Boolean(stubs['@noCallThru']) && (stub == null || stub['@noCallThru'] !== false);
  var noCallThru = stubWideNoCallThru || (stub != null && Boolean(stub['@noCallThru']));
  return noCallThru ? stub : fillMissingKeys(stub, original());
};

if (require.cache) {
  // only used during build, so prevent browserify from including it
  var replacePreludePath = './lib/replace-prelude';
  var replacePrelude = require(replacePreludePath);
  proxyquire.browserify = replacePrelude.browserify;
  proxyquire.plugin = replacePrelude.plugin;
}

},{"fill-keys":130,"module-not-found-error":141}],148:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":149}],149:[function(require,module,exports){
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
},{"./_stream_readable":151,"./_stream_writable":153,"core-util-is":116,"inherits":136,"process-nextick-args":146}],150:[function(require,module,exports){
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
},{"./_stream_transform":152,"core-util-is":116,"inherits":136}],151:[function(require,module,exports){
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
},{"./_stream_duplex":149,"./internal/streams/BufferList":154,"./internal/streams/destroy":155,"./internal/streams/stream":156,"_process":114,"core-util-is":116,"events":129,"inherits":136,"isarray":157,"process-nextick-args":146,"safe-buffer":164,"string_decoder/":158,"util":112}],152:[function(require,module,exports){
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
},{"./_stream_duplex":149,"core-util-is":116,"inherits":136}],153:[function(require,module,exports){
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
},{"./_stream_duplex":149,"./internal/streams/destroy":155,"./internal/streams/stream":156,"_process":114,"core-util-is":116,"inherits":136,"process-nextick-args":146,"safe-buffer":164,"util-deprecate":180}],154:[function(require,module,exports){
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
},{"safe-buffer":164}],155:[function(require,module,exports){
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
},{"process-nextick-args":146}],156:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":129}],157:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],158:[function(require,module,exports){
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
},{"safe-buffer":164}],159:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":160}],160:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":149,"./lib/_stream_passthrough.js":150,"./lib/_stream_readable.js":151,"./lib/_stream_transform.js":152,"./lib/_stream_writable.js":153}],161:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":160}],162:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":153}],163:[function(require,module,exports){
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
},{"_process":114,"through":179}],164:[function(require,module,exports){
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

},{"buffer":115}],165:[function(require,module,exports){
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

},{"events":129,"inherits":136,"readable-stream/duplex.js":148,"readable-stream/passthrough.js":159,"readable-stream/readable.js":160,"readable-stream/transform.js":161,"readable-stream/writable.js":162}],166:[function(require,module,exports){
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

},{"es-abstract/es5":122,"function-bind":133}],167:[function(require,module,exports){
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

},{"./implementation":166,"./polyfill":168,"./shim":169,"define-properties":120,"function-bind":133}],168:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":166}],169:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":168,"define-properties":120}],170:[function(require,module,exports){
(function (global){
/* globals self, window, global */
/* eslint no-negated-condition: 0, no-new-func: 0 */

'use strict';

if (typeof self !== 'undefined') {
	module.exports = self;
} else if (typeof window !== 'undefined') {
	module.exports = window;
} else if (typeof global !== 'undefined') {
	module.exports = global;
} else {
	module.exports = Function('return this')();
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],171:[function(require,module,exports){
'use strict';

var defineProperties = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var polyfill = getPolyfill();

var getGlobal = function () { return polyfill; };

defineProperties(getGlobal, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = getGlobal;

},{"./implementation":170,"./polyfill":172,"./shim":173,"define-properties":120}],172:[function(require,module,exports){
(function (global){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (typeof global !== 'object' || !global || global.Math !== Math || global.Array !== Array) {
		return implementation;
	}
	return global;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./implementation":170}],173:[function(require,module,exports){
(function (global){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimGlobal() {
	var polyfill = getPolyfill();
	if (define.supportsDescriptors) {
		var descriptor = Object.getOwnPropertyDescriptor(polyfill, 'global');
		if (!descriptor || (descriptor.configurable && (descriptor.enumerable || descriptor.writable || global !== polyfill))) {
			Object.defineProperty(polyfill, 'global', {
				configurable: true,
				enumerable: false,
				value: polyfill,
				writable: false
			});
		}
	} else if (typeof global !== 'object' || global !== polyfill) {
		polyfill.global = polyfill;
	}
	return polyfill;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polyfill":172,"define-properties":120}],174:[function(require,module,exports){
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
},{"./lib/default_stream":175,"./lib/results":177,"./lib/test":178,"_process":114,"defined":121,"through":179}],175:[function(require,module,exports){
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
},{"_process":114,"fs":113,"through":179}],176:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":114}],177:[function(require,module,exports){
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
},{"_process":114,"events":129,"function-bind":133,"has":134,"inherits":136,"object-inspect":142,"resumer":163,"through":179}],178:[function(require,module,exports){
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
},{"./next_tick":176,"deep-equal":117,"defined":121,"events":129,"has":134,"inherits":136,"path":145,"string.prototype.trim":167}],179:[function(require,module,exports){
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
},{"_process":114,"stream":165}],180:[function(require,module,exports){
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
},{}]},{},[54,55]);
