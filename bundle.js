(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// BASE TYPES //

var BTYPES = {
	'int8': Int8Array,
	'uint8': Uint8Array,
	'uint8_clamped': Uint8ClampedArray,
	'int16': Int16Array,
	'uint16': Uint16Array,
	'int32': Int32Array,
	'uint32': Uint32Array,
	'float32': Float32Array,
	'float64': Float64Array
};


// EXPORTS //

module.exports = BTYPES;

},{}],2:[function(require,module,exports){
'use strict';

// MATRIX //

/**
* FUNCTION: Matrix( data, shape, dtype )
*	Matrix constructor.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data - input typed array
* @param {String} dtype - matrix data type
* @param {Number[]} shape - matrix dimensions/shape
* @param {Number} offset - matrix offset
* @param {Number[]} strides - matrix strides
* @returns {Matrix} Matrix instance
*/
function Matrix( data, dtype, shape, offset, strides ) {
	if ( !( this instanceof Matrix ) ) {
		return new Matrix( data, dtype, shape, offset, strides );
	}
	// Underlying data type:
	Object.defineProperty( this, 'dtype', {
		'value': dtype,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix dimensions:
	Object.defineProperty( this, 'shape', {
		'value': shape,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix strides:
	Object.defineProperty( this, 'strides', {
		'value': strides,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix offset:
	Object.defineProperty( this, 'offset', {
		'value': offset,
		'configurable': false,
		'enumerable': true,
		'writable': true
	});

	// Number of matrix dimensions:
	Object.defineProperty( this, 'ndims', {
		'value': shape.length,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix length:
	Object.defineProperty( this, 'length', {
		'value': data.length,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Number of bytes used by the matrix elements:
	Object.defineProperty( this, 'nbytes', {
		'value': data.byteLength,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	// Matrix data store:
	Object.defineProperty( this, 'data', {
		'value': data,
		'configurable': false,
		'enumerable': true,
		'writable': false
	});

	return this;
} // end FUNCTION Matrix()


// METHODS //

Matrix.prototype.set = require( './set.js' );
Matrix.prototype.iset = require( './iset.js' );
Matrix.prototype.mset = require( './mset.js' );
Matrix.prototype.sset = require( './sset.js' );

Matrix.prototype.get = require( './get.js' );
Matrix.prototype.iget = require( './iget.js' );
Matrix.prototype.mget = require( './mget.js' );
Matrix.prototype.sget = require( './sget.js' );

Matrix.prototype.toString = require( './toString.js' );


// EXPORTS //

module.exports = Matrix;

},{"./get.js":5,"./iget.js":7,"./iset.js":10,"./mget.js":14,"./mset.js":16,"./set.js":24,"./sget.js":26,"./sset.js":28,"./toString.js":30}],3:[function(require,module,exports){
'use strict';

// MATRIX //

/**
* FUNCTION: Matrix( data, shape, dtype )
*	Matrix constructor.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} data - input typed array
* @param {String} dtype - matrix data type
* @param {Number[]} shape - matrix dimensions/shape
* @param {Number} offset - matrix offset
* @param {Number[]} strides - matrix strides
* @returns {Matrix} Matrix instance
*/
function Matrix( data, dtype, shape, offset, strides ) {
	if ( !( this instanceof Matrix ) ) {
		return new Matrix( data, dtype, shape, offset, strides );
	}
	this.dtype = dtype;
	this.shape = shape;
	this.strides = strides;
	this.offset = offset;
	this.ndims = shape.length;
	this.length = data.length;
	this.nbytes = data.byteLength;
	this.data = data;
	return this;
} // end FUNCTION Matrix()


// METHODS //

Matrix.prototype.set = require( './set.raw.js' );
Matrix.prototype.iset = require( './iset.raw.js' );
Matrix.prototype.mset = require( './mset.raw.js' );
Matrix.prototype.sset = require( './sset.raw.js' );

Matrix.prototype.get = require( './get.raw.js' );
Matrix.prototype.iget = require( './iget.raw.js' );
Matrix.prototype.mget = require( './mget.raw.js' );
Matrix.prototype.sget = require( './sget.raw.js' );

Matrix.prototype.toString = require( './toString.js' );


// EXPORTS //

module.exports = Matrix;

},{"./get.raw.js":6,"./iget.raw.js":8,"./iset.raw.js":11,"./mget.raw.js":15,"./mset.raw.js":17,"./set.raw.js":25,"./sget.raw.js":27,"./sset.raw.js":29,"./toString.js":30}],4:[function(require,module,exports){
'use strict';

// DATA TYPES //

var DTYPES = [
	'int8',
	'uint8',
	'uint8_clamped',
	'int16',
	'uint16',
	'int32',
	'uint32',
	'float32',
	'float64'
];


// EXPORTS //

module.exports = DTYPES;

},{}],5:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// GET //

/**
* FUNCTION: get( i, j )
*	Returns a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @returns {Number|Undefined} matrix element
*/
function get( i, j ) {
	/*jshint validthis:true */
	if ( !isNonNegativeInteger( i ) || !isNonNegativeInteger( j ) ) {
		throw new TypeError( 'get()::invalid input argument. Indices must be nonnegative integers. Values: `[' + i + ','+ j + ']`.' );
	}
	return this.data[ this.offset + i*this.strides[0] + j*this.strides[1] ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{"validate.io-nonnegative-integer":47}],6:[function(require,module,exports){
'use strict';

/**
* FUNCTION: get( i, j )
*	Returns a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @returns {Number|Undefined} matrix element
*/
function get( i, j ) {
	/*jshint validthis:true */
	return this.data[ this.offset + i*this.strides[0] + j*this.strides[1] ];
} // end FUNCTION get()


// EXPORTS //

module.exports = get;

},{}],7:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' );


// IGET //

/**
* FUNCTION: iget( idx )
*	Returns a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @returns {Number|Undefined} matrix element
*/
function iget( idx ) {
	/*jshint validthis:true */
	var r, j;
	if ( !isInteger( idx ) ) {
		throw new TypeError( 'iget()::invalid input argument. Must provide a integer. Value: `' + idx + '`.' );
	}
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	return this.data[ this.offset + r + j*this.strides[1] ];
} // end FUNCTION iget()


// EXPORTS //

module.exports = iget;

},{"validate.io-integer-primitive":45}],8:[function(require,module,exports){
'use strict';

/**
* FUNCTION: iget( idx )
*	Returns a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @returns {Number|Undefined} matrix element
*/
function iget( idx ) {
	/*jshint validthis:true */
	var r, j;
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	return this.data[ this.offset + r + j*this.strides[1] ];
} // end FUNCTION iget()


// EXPORTS //

module.exports = iget;

},{}],9:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = require( './matrix.js' );
module.exports.raw = require( './matrix.raw.js' );

},{"./matrix.js":12,"./matrix.raw.js":13}],10:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' ),
	isNumber = require( 'validate.io-number-primitive' );


// ISET //

/**
* FUNCTION: iset( idx, value )
*	Sets a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function iset( idx, v ) {
	/* jshint validthis: true */
	var r, j;
	if ( !isInteger( idx ) ) {
		throw new TypeError( 'iset()::invalid input argument. An index must be an integer. Value: `' + idx + '`.' );
	}
	if ( !isNumber( v ) ) {
		throw new TypeError( 'iset()::invalid input argument. An input value must be a number primitive. Value: `' + v + '`.' );
	}
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return this;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	this.data[ this.offset + r + j*this.strides[1] ] = v;
	return this;
} // end FUNCTION iset()


// EXPORTS //

module.exports = iset;

},{"validate.io-integer-primitive":45,"validate.io-number-primitive":50}],11:[function(require,module,exports){
'use strict';

/**
* FUNCTION: iset( idx, value )
*	Sets a matrix element located at a specified index.
*
* @param {Number} idx - linear index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function iset( idx, v ) {
	/* jshint validthis: true */
	var r, j;
	if ( idx < 0 ) {
		idx += this.length;
		if ( idx < 0 ) {
			return this;
		}
	}
	j = idx % this.strides[ 0 ];
	r = idx - j;
	if ( this.strides[ 0 ] < 0 ) {
		r = -r;
	}
	this.data[ this.offset + r + j*this.strides[1] ] = v;
	return this;
} // end FUNCTION iset()


// EXPORTS //

module.exports = iset;

},{}],12:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' ),
	contains = require( 'validate.io-contains' ),
	isArray = require( 'validate.io-array' ),
	cast = require( 'compute-cast-arrays' ),
	getType = require( 'compute-dtype' ),
	Matrix = require( './ctor.js' );


// VARIABLES //

var BTYPES = require( './btypes.js' ),
	DTYPES = require( './dtypes.js' );


// CREATE MATRIX //

/**
* FUNCTION: matrix( [data,] shape[, dtype] )
*	Returns a Matrix instance.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} [data] - input typed array
* @param {Number[]} shape - matrix dimensions/shape
* @param {String} [dtype="float64"] - matrix data type
* @returns {Matrix} Matrix instance
*/
function matrix() {
	var dtype,
		ndims,
		shape,
		data,
		vFLG,
		len,
		dt,
		i;

	// Parse the input arguments (polymorphic interface)...
	if ( arguments.length === 1 ) {
		shape = arguments[ 0 ];
		vFLG = 2; // arg #s
	}
	else if ( arguments.length === 2 ) {
		if ( isString( arguments[ 1 ] ) ) {
			shape = arguments[ 0 ];
			dtype = arguments[ 1 ];
			vFLG = 23; // arg #s
		} else {
			data = arguments[ 0 ];
			shape = arguments[ 1 ];
			vFLG = 12; // arg #s
		}
	}
	else {
		data = arguments[ 0 ];
		shape = arguments[ 1 ];
		dtype = arguments[ 2 ];
		vFLG = 123; // arg #s
	}

	// Input argument validation...
	if ( !isNonNegativeIntegerArray( shape ) ) {
		throw new TypeError( 'matrix()::invalid input argument. A matrix shape must be an array of nonnegative integers. Value: `' + shape + '`.' );
	}
	ndims = shape.length;
	if ( ndims !== 2 ) {
		throw new Error( 'matrix()::invalid input argument. Shape must be a 2-element array. Value: `' + shape + '`.' );
	}
	// If a `dtype` has been provided, validate...
	if ( vFLG === 123 || vFLG === 23 ) {
		if ( !contains( DTYPES, dtype ) ) {
			throw new TypeError( 'matrix()::invalid input argument. Unrecognized/unsupported data type. Value: `' + dtype + '`.' );
		}
	} else {
		dtype = 'float64';
	}
	len = 1;
	for ( i = 0; i < ndims; i++ ) {
		len *= shape[ i ];
	}
	// If a `data` argument has been provided, validate...
	if ( vFLG === 123 || vFLG === 12 ) {
		dt = getType( data );
		if ( !contains( DTYPES, dt ) && !isArray( data ) ) {
			throw new TypeError( 'matrix()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
		}
		if ( len !== data.length ) {
			throw new Error( 'matrix()::invalid input argument. Matrix shape does not match the input data length.' );
		}
		// Only cast if either 1) both a `data` and `dtype` argument have been provided and they do not agree or 2) when provided a plain Array...
		if ( ( vFLG === 123 && dt !== dtype ) || dt === 'generic' ) {
			data = cast( data, dtype );
		}
	} else {
		// Initialize a zero-filled typed array:
		data = new BTYPES[ dtype ]( len );
	}
	// Return a new Matrix instance:
	return new Matrix( data, dtype, shape, 0, [shape[1],1] );
} // end FUNCTION matrix()


// EXPORTS //

module.exports = matrix;

},{"./btypes.js":1,"./ctor.js":2,"./dtypes.js":4,"compute-cast-arrays":31,"compute-dtype":36,"validate.io-array":41,"validate.io-contains":42,"validate.io-nonnegative-integer-array":46,"validate.io-string-primitive":51}],13:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	contains = require( 'validate.io-contains' ),
	getType = require( 'compute-dtype' ),
	Matrix = require( './ctor.raw.js' );


// VARIABLES //

var BTYPES = require( './btypes.js' ),
	DTYPES = require( './dtypes.js' );


// CREATE MATRIX //

/**
* FUNCTION: matrix( [data,] shape[, dtype] )
*	Returns a Matrix instance.
*
* @constructor
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} [data] - input typed array
* @param {Number[]} shape - matrix dimensions/shape
* @param {String} [dtype="float64"] - matrix data type
* @returns {Matrix} Matrix instance
*/
function matrix() {
	var dtype,
		ndims,
		shape,
		data,
		len,
		i;

	if ( arguments.length === 1 ) {
		shape = arguments[ 0 ];
	}
	else if ( arguments.length === 2 ) {
		if ( isString( arguments[ 1 ] ) ) {
			shape = arguments[ 0 ];
			dtype = arguments[ 1 ];
		} else {
			data = arguments[ 0 ];
			shape = arguments[ 1 ];
		}
	}
	else {
		data = arguments[ 0 ];
		shape = arguments[ 1 ];
		dtype = arguments[ 2 ];
	}
	ndims = shape.length;
	if ( ndims !== 2 ) {
		throw new Error( 'matrix()::invalid input argument. Shape must be a 2-element array. Value: `' + shape + '`.' );
	}
	len = 1;
	for ( i = 0; i < ndims; i++ ) {
		len *= shape[ i ];
	}
	if ( data ) {
		if ( !dtype ) {
			dtype = getType( data );
			if ( !contains( DTYPES, dtype ) ) {
				throw new TypeError( 'matrix()::invalid input argument. Input data must be a valid type. Consult the documentation for a list of valid data types. Value: `' + data + '`.' );
			}
		}
		if ( len !== data.length ) {
			throw new Error( 'matrix()::invalid input argument. Matrix shape does not match the input data length.' );
		}
	} else {
		// Initialize a zero-filled typed array...
		if ( !dtype ) {
			dtype = 'float64';
		}
		data = new BTYPES[ dtype ]( len );
	}
	// Return a new Matrix instance:
	return new Matrix( data, dtype, shape, 0, [shape[1],1] );
} // end FUNCTION matrix()


// EXPORTS //

module.exports = matrix;

},{"./btypes.js":1,"./ctor.raw.js":3,"./dtypes.js":4,"compute-dtype":36,"validate.io-contains":42,"validate.io-string-primitive":51}],14:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


// MGET //

/**
* FUNCTION: mget( i[, j] )
*	Returns multiple matrix elements. If provided a single argument, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @returns {Matrix} a new Matrix instance
*/
function mget( rows, cols ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		out,
		sgn,
		d,
		s0, s1, s2, s3,
		o,
		r, dr,
		i, j, m, n;

	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	o = this.offset;

	if ( arguments.length < 2 ) {
		if ( !isNonNegativeIntegerArray( rows ) ) {
			throw new TypeError( 'mget()::invalid input argument. Linear indices must be specified as a nonnegative integer array. Value: `' + rows + '`.' );
		}
		// Filter the input indices to ensure within bounds...
		i = [];
		for ( n = 0; n < rows.length; n++ ) {
			if ( rows[ n ] < this.length ) {
				i.push( rows[ n ] );
			}
		}
		m = i.length;

		// Create a row vector (matrix):
		d = new BTYPES[ this.dtype ]( m );
		out = new this.constructor( d, this.dtype, [1,m], 0, [m,1] );

		sgn = ( s0 < 0 ) ? -1 : 1;
		for ( n = 0; n < m; n++ ) {
			j = i[ n ] % s0;
			r = sgn * ( i[n] - j );
			d[ n ] = this.data[ o + r + j*s1 ];
		}
	} else {
		nRows = this.shape[ 0 ];
		if ( rows === null ) {
			i = new Array( nRows );
			for ( n = 0; n < nRows; n++ ) {
				i[ n ] = n;
			}
		}
		else if ( isNonNegativeIntegerArray( rows ) ) {
			i = [];
			for ( n = 0; n < rows.length; n++ ) {
				if ( rows[ n ] < nRows ) {
					i.push( rows[ n ] );
				}
			}
		}
		else {
			throw new TypeError( 'mget()::invalid input argument. Row indices must be specified as a nonnegative integer array. Value: `' + rows + '`.' );
		}

		nCols = this.shape[ 1 ];
		if ( cols === null ) {
			j = new Array( nCols );
			for ( n = 0; n < nCols; n++ ) {
				j[ n ] = n;
			}
		}
		else if ( isNonNegativeIntegerArray( cols ) ) {
			j = [];
			for ( n = 0; n < cols.length; n++ ) {
				if ( cols[ n ] < nCols ) {
					j.push( cols[ n ] );
				}
			}
		}
		else {
			throw new TypeError( 'mget()::invalid input argument. Column indices must be specified as a nonnegative integer array. Value: `' + cols + '`.' );
		}
		nRows = i.length;
		nCols = j.length;

		d = new BTYPES[ this.dtype ]( nRows*nCols );
		out = new this.constructor( d, this.dtype, [nRows,nCols], 0, [nCols,1]);

		s2 = out.strides[ 0 ];
		s3 = out.strides[ 1 ];
		for ( m = 0; m < nRows; m++ ) {
			r = o + i[m]*s0;
			dr = m * s2;
			for ( n = 0; n < nCols; n++ ) {
				d[ dr + n*s3 ] = this.data[ r + j[n]*s1 ];
			}
		}
	}
	return out;
} // end FUNCTION mget()


// EXPORTS //

module.exports = mget;

},{"./btypes.js":1,"validate.io-nonnegative-integer-array":46}],15:[function(require,module,exports){
'use strict';

// VARIABLES //

var BTYPES = require( './btypes.js' );


// MGET //

/**
* FUNCTION: mget( i[, j] )
*	Returns multiple matrix elements. If provided a single argument, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @returns {Matrix} a new Matrix instance
*/
function mget( rows, cols ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		out,
		sgn,
		d,
		s0, s1, s2, s3,
		o,
		r, dr,
		i, j, m, n;

	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	o = this.offset;

	if ( arguments.length < 2 ) {
		i = rows;
		m = i.length;

		// Create a row vector (matrix):
		d = new BTYPES[ this.dtype ]( m );
		out = new this.constructor( d, this.dtype, [1,m], 0, [m,1] );

		sgn = ( s0 < 0 ) ? -1 : 1;
		for ( n = 0; n < m; n++ ) {
			j = i[ n ] % s0;
			r = sgn * ( i[n] - j );
			d[ n ] = this.data[ o + r + j*s1 ];
		}
	} else {
		if ( rows === null ) {
			nRows = this.shape[ 0 ];
			i = new Array( nRows );
			for ( n = 0; n < nRows; n++ ) {
				i[ n ] = n;
			}
		} else {
			nRows = rows.length;
			i = rows;
		}

		if ( cols === null ) {
			nCols = this.shape[ 1 ];
			j = new Array( nCols );
			for ( n = 0; n < nCols; n++ ) {
				j[ n ] = n;
			}
		} else {
			nCols = cols.length;
			j = cols;
		}

		d = new BTYPES[ this.dtype ]( nRows*nCols );
		out = new this.constructor( d, this.dtype, [nRows,nCols], 0, [nCols,1] );

		s2 = out.strides[ 0 ];
		s3 = out.strides[ 1 ];
		for ( m = 0; m < nRows; m++ ) {
			r = o + i[m]*s0;
			dr = m * s2;
			for ( n = 0; n < nCols; n++ ) {
				d[ dr + n*s3 ] = this.data[ r + j[n]*s1 ];
			}
		}
	}
	return out;
} // end FUNCTION mget()


// EXPORTS //

module.exports = mget;

},{"./btypes.js":1}],16:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNonNegativeIntegerArray = require( 'validate.io-nonnegative-integer-array' );


// FUNCTIONS //

var mset1 = require( './mset1.js' ),
	mset2 = require( './mset2.js' ),
	mset3 = require( './mset3.js' ),
	mset4 = require( './mset4.js' ),
	mset5 = require( './mset5.js' ),
	mset6 = require( './mset6.js' );

/**
* FUNCTION: getIndices( idx, len )
*	Validates and returns an array of indices.
*
* @private
* @param {Number[]|Null} idx - indices
* @param {Number} len - max index
* @returns {Number[]} indices
*/
function getIndices( idx, len ) {
	var out,
		i;
	if ( idx === null ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = i;
		}
	}
	else if ( isNonNegativeIntegerArray( idx ) ) {
		out = [];
		for ( i = 0; i < idx.length; i++ ) {
			if ( idx[ i ] < len ) {
				out.push( idx[ i ] );
			}
		}
	}
	else {
		throw new TypeError( 'mset()::invalid input argument. Row and column indices must be arrays of nonnegative integers. Value: `' + idx + '`.' );
	}
	return out;
} // end FUNCTION getIndices()


// MSET //

/**
* FUNCTION: mset( i[, j], value[, thisArg] )
*	Sets multiple matrix elements. If provided a single array, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @returns {Matrix} Matrix instance
*/
function mset() {
	/*jshint validthis:true */
	var nargs = arguments.length,
		args,
		rows,
		cols,
		i;

	args = new Array( nargs );
	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = arguments[ i ];
	}

	// 2 input arguments...
	if ( nargs < 3 ) {
		if ( !isNonNegativeIntegerArray( args[ 0 ] ) ) {
			throw new TypeError( 'mset()::invalid input argument. First argument must be an array of nonnegative integers. Value: `' + args[ 0 ] + '`.' );
		}
		// indices, clbk
		if ( isFunction( args[ 1 ] ) ) {
			mset2( this, args[ 0 ], args[ 1 ] );
		}
		// indices, number
		else if ( isNumber( args[ 1 ] ) ) {
			mset1( this, args[ 0 ], args[ 1 ] );
		}
		// indices, matrix
		else {
			// NOTE: no validation for Matrix instance.
			mset3( this, args[ 0 ], args[ 1 ] );
		}
	}
	// 3 input arguments...
	else if ( nargs === 3 ) {
		// indices, clbk, context
		if ( isFunction( args[ 1 ] ) ) {
			if ( !isNonNegativeIntegerArray( args[ 0 ] ) ) {
				throw new TypeError( 'mset()::invalid input argument. First argument must be an array of nonnegative integers. Value: `' + args[ 0 ] + '`.' );
			}
			mset2( this, args[ 0 ], args[ 1 ], args[ 2 ] );
		}
		// rows, cols, function
		else if ( isFunction( args[ 2 ] ) ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset4( this, rows, cols, args[ 2 ], this );
		}
		// rows, cols, number
		else if ( isNumber( args[ 2 ] ) ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset5( this, rows, cols, args[ 2 ] );
		}
		// rows, cols, matrix
		else {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );

			// NOTE: no validation for Matrix instance.
			mset6( this, rows, cols, args[ 2 ] );
		}
	}
	// 4 input arguments...
	else {
		// rows, cols, function, context
		if ( !isFunction( args[ 2 ] ) ) {
			throw new TypeError( 'mset()::invalid input argument. Callback argument must be a function. Value: `' + args[ 2 ] + '`.' );
		}
		rows = getIndices( args[ 0 ], this.shape[ 0 ] );
		cols = getIndices( args[ 1 ], this.shape[ 1 ] );
		mset4( this, rows, cols, args[ 2 ], args[ 3 ] );
	}
	return this;
} // end FUNCTION mset()


// EXPORTS //

module.exports = mset;

},{"./mset1.js":18,"./mset2.js":19,"./mset3.js":20,"./mset4.js":21,"./mset5.js":22,"./mset6.js":23,"validate.io-function":44,"validate.io-nonnegative-integer-array":46,"validate.io-number-primitive":50}],17:[function(require,module,exports){
'use strict';

// FUNCTIONS //

var mset1 = require( './mset1.js' ),
	mset2 = require( './mset2.js' ),
	mset3 = require( './mset3.js' ),
	mset4 = require( './mset4.js' ),
	mset5 = require( './mset5.js' ),
	mset6 = require( './mset6.js' );

/**
* FUNCTION: getIndices( idx, len )
*	Returns an array of indices.
*
* @private
* @param {Number[]|Null} idx - indices
* @param {Number} len - max index
* @returns {Number[]} indices
*/
function getIndices( idx, len ) {
	var out,
		i;
	if ( idx === null ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = i;
		}
	} else {
		out = idx;
	}
	return out;
} // end FUNCTION getIndices()


// MSET //

/**
* FUNCTION: mset( i[, j], value[, thisArg] )
*	Sets multiple matrix elements. If provided a single array, `i` is treated as an array of linear indices.
*
* @param {Number[]|Null} i - linear/row indices
* @param {Number[]|Null} [j] - column indices
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @returns {Matrix} Matrix instance
*/
function mset() {
	/*jshint validthis:true */
	var nargs = arguments.length,
		args,
		rows,
		cols,
		i;

	args = new Array( nargs );
	for ( i = 0; i < nargs; i++ ) {
		args[ i ] = arguments[ i ];
	}

	// 2 input arguments...
	if ( nargs < 3 ) {
		// indices, clbk
		if ( typeof args[ 1 ] === 'function' ) {
			mset2( this, args[ 0 ], args[ 1 ] );
		}
		// indices, number
		else if ( typeof args[ 1 ] === 'number' ) {
			mset1( this, args[ 0 ], args[ 1 ] );
		}
		// indices, matrix
		else {
			mset3( this, args[ 0 ], args[ 1 ] );
		}
	}
	// 3 input arguments...
	else if ( nargs === 3 ) {
		// indices, clbk, context
		if ( typeof args[ 1 ] === 'function' ) {
			mset2( this, args[ 0 ], args[ 1 ], args[ 2 ] );
		}
		// rows, cols, function
		else if ( typeof args[ 2 ] === 'function' ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset4( this, rows, cols, args[ 2 ], this );
		}
		// rows, cols, number
		else if ( typeof args[ 2 ] === 'number' ) {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset5( this, rows, cols, args[ 2 ] );
		}
		// rows, cols, matrix
		else {
			rows = getIndices( args[ 0 ], this.shape[ 0 ] );
			cols = getIndices( args[ 1 ], this.shape[ 1 ] );
			mset6( this, rows, cols, args[ 2 ] );
		}
	}
	// 4 input arguments...
	else {
		rows = getIndices( args[ 0 ], this.shape[ 0 ] );
		cols = getIndices( args[ 1 ], this.shape[ 1 ] );
		mset4( this, rows, cols, args[ 2 ], args[ 3 ] );
	}
	return this;
} // end FUNCTION mset()


// EXPORTS //

module.exports = mset;

},{"./mset1.js":18,"./mset2.js":19,"./mset3.js":20,"./mset4.js":21,"./mset5.js":22,"./mset6.js":23}],18:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset1( mat, idx, v )
*	Sets multiple matrix elements to a numeric value `v`.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Number} v - numeric value
*/
function mset1( mat, idx, v ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		len = idx.length,
		o = mat.offset,
		sgn,
		r, j, n;

	sgn = ( s0 < 0 ) ? -1 : 1;
	for ( n = 0; n < len; n++ ) {
		j = idx[ n ] % s0;
		r = sgn * ( idx[n] - j );
		mat.data[ o + r + j*s1 ] = v;
	}
} // end FUNCTION mset1()


// EXPORTS //

module.exports = mset1;

},{}],19:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset2( mat, idx, clbk, ctx )
*	Sets multiple matrix elements using a callback function.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Function} clbk - callback function
* @param {Object} ctx - `this` context when invoking the provided callback
*/
function mset2( mat, idx, clbk, ctx ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		len = idx.length,
		o = mat.offset,
		sgn,
		r, c,
		i, k, n;

	sgn = ( s0 < 0 ) ? -1 : 1;
	for ( n = 0; n < len; n++ ) {
		// Get the column number:
		c = idx[ n ] % s0;

		// Determine the row offset:
		i = sgn * ( idx[n] - c );

		// Get the row number:
		r = i / s0;

		// Calculate the index:
		k = o + i + c*s1;

		// Set the value:
		mat.data[ k ] = clbk.call( ctx, mat.data[ k ], r, c, k );
	}
} // end FUNCTION mset2()


// EXPORTS //

module.exports = mset2;

},{}],20:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset3( mat, idx, m )
*	Sets multiple matrix elements using elements from another matrix.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} idx - linear indices
* @param {Matrix} m - Matrix instance
*/
function mset3( mat, idx, m ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		s2 = m.strides[ 0 ],
		s3 = m.strides[ 1 ],
		len = idx.length,
		o0 = mat.offset,
		o1 = m.offset,
		sgn0, sgn1,
		r0, r1,
		j0, j1,
		n;

	if ( m.length !== len ) {
		throw new Error( 'mset()::invalid input argument. Number of indices does not match the number of elements in the value matrix.' );
	}
	sgn0 = ( s0 < 0 ) ? -1 : 1;
	sgn1 = ( s2 < 0 ) ? -1 : 1;
	for ( n = 0; n < len; n++ ) {
		// Get the column number and row offset for the first matrix:
		j0 = idx[ n ] % s0;
		r0 = sgn0 * ( idx[n] - j0 );

		// Get the column number and row offset for the value matrix:
		j1 = n % s2;
		r1 = sgn1 * ( n - j1 );

		mat.data[ o0 + r0 + j0*s1 ] = m.data[ o1 + r1 + j1*s3  ];
	}
} // end FUNCTION mset3()


// EXPORTS //

module.exports = mset3;

},{}],21:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset4( mat, rows, cols, clbk, ctx )
*	Sets multiple matrix elements using a callback function.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Function} clbk - callback function
* @param {Object} ctx - `this` context when invoking the provided callback
*/
function mset4( mat, rows, cols, clbk, ctx ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		nRows = rows.length,
		nCols = cols.length,
		o = mat.offset,
		r,
		i, j, k;

	for ( i = 0; i < nRows; i++ ) {
		r = o + rows[i]*s0;
		for ( j = 0; j < nCols; j++ ) {
			k = r + cols[j]*s1;
			mat.data[ k ] = clbk.call( ctx, mat.data[ k ], rows[ i ], cols[ j ], k );
		}
	}
} // end FUNCTION mset4()


// EXPORTS //

module.exports = mset4;

},{}],22:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset5( mat, rows, cols, v )
*	Sets multiple matrix elements to a numeric value `v`.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Number} v - numeric value
*/
function mset5( mat, rows, cols, v ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		nRows = rows.length,
		nCols = cols.length,
		o = mat.offset,
		r,
		i, j;

	for ( i = 0; i < nRows; i++ ) {
		r = o + rows[i]*s0;
		for ( j = 0; j < nCols; j++ ) {
			mat.data[ r + cols[j]*s1 ] = v;
		}
	}
} // end FUNCTION mset5()


// EXPORTS //

module.exports = mset5;

},{}],23:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mset6( mat, rows, cols, m )
*	Sets multiple matrix elements using elements from another matrix.
*
* @private
* @param {Matrix} mat - Matrix instance
* @param {Number[]} rows - row indices
* @param {Number[]} cols - column indices
* @param {Matrix} m - Matrix instance
*/
function mset6( mat, rows, cols, m ) {
	var s0 = mat.strides[ 0 ],
		s1 = mat.strides[ 1 ],
		s2 = m.strides[ 0 ],
		s3 = m.strides[ 1 ],
		nRows = rows.length,
		nCols = cols.length,
		o0 = mat.offset,
		o1 = m.offset,
		r0, r1,
		i, j;

	if ( m.shape[ 0 ] !== nRows || m.shape[ 1 ] !== nCols ) {
		throw new Error( 'mset()::invalid input argument. The dimensions given by the row and column indices do not match the value matrix dimensions.' );
	}
	for ( i = 0; i < nRows; i++ ) {
		r0 = o0 + rows[i]*s0;
		r1 = o1 + i*s2;
		for ( j = 0; j < nCols; j++ ) {
			mat.data[ r0 + cols[j]*s1 ] = m.data[ r1 + j*s3 ];
		}
	}
} // end FUNCTION mset6()


// EXPORTS //

module.exports = mset6;

},{}],24:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' ),
	isNumber = require( 'validate.io-number-primitive' );


// SET //

/**
* FUNCTION: set( i, j, value )
*	Sets a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function set( i, j, v ) {
	/* jshint validthis: true */
	if ( !isNonNegativeInteger( i ) || !isNonNegativeInteger( j ) ) {
		throw new TypeError( 'set()::invalid input argument. Row and column indices must be nonnegative integers. Values: `[' + i + ',' + j + ']`.' );
	}
	if ( !isNumber( v ) ) {
		throw new TypeError( 'set()::invalid input argument. An input value must be a number primitive. Value: `' + v + '`.' );
	}
	i = this.offset + i*this.strides[0] + j*this.strides[1];
	if ( i >= 0 ) {
		this.data[ i ] = v;
	}
	return this;
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{"validate.io-nonnegative-integer":47,"validate.io-number-primitive":50}],25:[function(require,module,exports){
'use strict';

/**
* FUNCTION: set( i, j, value )
*	Sets a matrix element based on the provided row and column indices.
*
* @param {Number} i - row index
* @param {Number} j - column index
* @param {Number} value - value to set
* @returns {Matrix} Matrix instance
*/
function set( i, j, v ) {
	/* jshint validthis: true */
	i = this.offset + i*this.strides[0] + j*this.strides[1];
	if ( i >= 0 ) {
		this.data[ i ] = v;
	}
	return this;
} // end FUNCTION set()


// EXPORTS //

module.exports = set;

},{}],26:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	ispace = require( 'compute-indexspace' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


// SUBSEQUENCE GET //

/**
* FUNCTION: sget( subsequence )
*	Returns matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @returns {Matrix} Matrix instance
*/
function sget( seq ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		rows,
		cols,
		seqs,
		mat,
		len,
		s0, s1,
		o,
		d,
		r, dr,
		i, j;

	if ( !isString( seq ) ) {
		throw new TypeError( 'sget()::invalid input argument. Must provide a string primitive. Value: `' + seq + '`.' );
	}
	seqs = seq.split( ',' );
	if ( seqs.length !== 2 ) {
		throw new Error( 'sget()::invalid input argument. Subsequence string must specify row and column subsequences. Value: `' + seq + '`.' );
	}
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;
	len = nRows * nCols;

	d = new BTYPES[ this.dtype ]( len );
	mat = new this.constructor( d, this.dtype, [nRows,nCols], 0, [nCols,1] );

	if ( len ) {
		s0 = this.strides[ 0 ];
		s1 = this.strides[ 1 ];
		o = this.offset;
		for ( i = 0; i < nRows; i++ ) {
			r = o + rows[i]*s0;
			dr = i * nCols;
			for ( j = 0; j < nCols; j++ ) {
				d[ dr + j ] = this.data[ r + cols[j]*s1 ];
			}
		}
	}
	return mat;
} // end FUNCTION sget()


// EXPORTS //

module.exports = sget;

},{"./btypes.js":1,"compute-indexspace":39,"validate.io-string-primitive":51}],27:[function(require,module,exports){
'use strict';

// MODULES //

var ispace = require( 'compute-indexspace' );


// VARIABLES //

var BTYPES = require( './btypes.js' );


// SUBSEQUENCE GET //

/**
* FUNCTION: sget( subsequence )
*	Returns matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @returns {Matrix} Matrix instance
*/
function sget( seq ) {
	/*jshint validthis:true */
	var nRows,
		nCols,
		rows,
		cols,
		seqs,
		mat,
		len,
		s0, s1,
		o,
		d,
		r, dr,
		i, j;

	seqs = seq.split( ',' );
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;
	len = nRows * nCols;

	d = new BTYPES[ this.dtype ]( len );
	mat = new this.constructor( d, this.dtype, [nRows,nCols], 0, [nCols,1] );

	if ( len ) {
		s0 = this.strides[ 0 ];
		s1 = this.strides[ 1 ];
		o = this.offset;
		for ( i = 0; i < nRows; i++ ) {
			r = o + rows[i]*s0;
			dr = i * nCols;
			for ( j = 0; j < nCols; j++ ) {
				d[ dr + j ] = this.data[ r + cols[j]*s1 ];
			}
		}
	}
	return mat;
} // end FUNCTION sget()


// EXPORTS //

module.exports = sget;

},{"./btypes.js":1,"compute-indexspace":39}],28:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isFunction = require( 'validate.io-function' ),
	ispace = require( 'compute-indexspace' );


// SUBSEQUENCE SET //

/**
* FUNCTION: sset( subsequence, value[, thisArg] )
*	Sets matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @param {Object} [thisArg] - `this` context when executing a callback
* @returns {Matrix} Matrix instance
*/
function sset( seq, val, thisArg ) {
	/* jshint validthis: true */
	var nRows,
		nCols,
		clbk,
		rows,
		cols,
		seqs,
		mat,
		ctx,
		s0, s1, s2, s3,
		o0, o1,
		r0, r1,
		i, j, k;

	if ( !isString( seq ) ) {
		throw new TypeError( 'sset()::invalid input argument. Must provide a string primitive. Value: `' + seq + '`.' );
	}
	seqs = seq.split( ',' );
	if ( seqs.length !== 2 ) {
		throw new Error( 'sset()::invalid input argument. Subsequence string must specify row and column subsequences. Value: `' + seq + '`.' );
	}
	if ( isFunction( val ) ) {
		clbk = val;
	}
	else if ( !isNumber( val ) ) {
		mat = val;
	}
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;

	if ( !( nRows && nCols ) ) {
		return this;
	}
	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	o0 = this.offset;

	// Callback...
	if ( clbk ) {
		if ( arguments.length > 2 ) {
			ctx = thisArg;
		} else {
			ctx = this;
		}
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				k = r0 + cols[j]*s1;
				this.data[ k ] = clbk.call( ctx, this.data[ k ], rows[i], cols[j], k );
			}
		}
	}
	// Input matrix...
	else if ( mat ) {
		if ( nRows !== mat.shape[ 0 ] ) {
			throw new Error( 'sset()::invalid input arguments. Row subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		if ( nCols !== mat.shape[ 1 ] ) {
			throw new Error( 'sset()::invalid input arguments. Column subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		s2 = mat.strides[ 0 ];
		s3 = mat.strides[ 1 ];
		o1 = mat.offset;
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			r1 = o1 + i*s2;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = mat.data[ r1 + j*s3 ];
			}
		}
	}
	// Single numeric value...
	else {
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = val;
			}
		}
	}
	return this;
} // end FUNCTION sset()


// EXPORTS //

module.exports = sset;

},{"compute-indexspace":39,"validate.io-function":44,"validate.io-number-primitive":50,"validate.io-string-primitive":51}],29:[function(require,module,exports){
'use strict';

// MODULES //

var ispace = require( 'compute-indexspace' );


// SUBSEQUENCE SET //

/**
* FUNCTION: sset( subsequence, value[, thisArg] )
*	Sets matrix elements according to a specified subsequence.
*
* @param {String} subsequence - subsequence string
* @param {Number|Matrix|Function} value - either a single numeric value, a matrix containing the values to set, or a function which returns a numeric value
* @param {Object} [thisArg] - `this` context when executing a callback
* @returns {Matrix} Matrix instance
*/
function sset( seq, val, thisArg ) {
	/* jshint validthis: true */
	var nRows,
		nCols,
		clbk,
		rows,
		cols,
		seqs,
		mat,
		ctx,
		s0, s1, s2, s3,
		o0, o1,
		r0, r1,
		i, j, k;

	seqs = seq.split( ',' );
	if ( typeof val === 'function' ) {
		clbk = val;
	}
	else if ( typeof val !== 'number' ) {
		mat = val;
	}
	rows = ispace( seqs[ 0 ], this.shape[ 0 ] );
	cols = ispace( seqs[ 1 ], this.shape[ 1 ] );

	nRows = rows.length;
	nCols = cols.length;

	if ( !( nRows && nCols ) ) {
		return this;
	}
	s0 = this.strides[ 0 ];
	s1 = this.strides[ 1 ];
	o0 = this.offset;

	// Callback...
	if ( clbk ) {
		if ( arguments.length > 2 ) {
			ctx = thisArg;
		} else {
			ctx = this;
		}
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				k = r0 + cols[j]*s1;
				this.data[ k ] = clbk.call( ctx, this.data[ k ], rows[i], cols[j], k );
			}
		}
	}
	// Input matrix...
	else if ( mat ) {
		if ( nRows !== mat.shape[ 0 ] ) {
			throw new Error( 'sset()::invalid input arguments. Row subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		if ( nCols !== mat.shape[ 1 ] ) {
			throw new Error( 'sset()::invalid input arguments. Column subsequence does not match input matrix dimensions. Expected a [' + nRows + ',' + nCols + '] matrix and instead received a [' + mat.shape.join( ',' ) + '] matrix.' );
		}
		s2 = mat.strides[ 0 ];
		s3 = mat.strides[ 1 ];
		o1 = mat.offset;
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			r1 = o1 + i*s2;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = mat.data[ r1 + j*s3 ];
			}
		}
	}
	// Single numeric value...
	else {
		for ( i = 0; i < nRows; i++ ) {
			r0 = o0 + rows[i]*s0;
			for ( j = 0; j < nCols; j++ ) {
				this.data[ r0 + cols[j]*s1 ] = val;
			}
		}
	}
	return this;
} // end FUNCTION sset()


// EXPORTS //

module.exports = sset;

},{"compute-indexspace":39}],30:[function(require,module,exports){
'use strict';

/**
* FUNCTION: toString()
*	Returns a string representation of Matrix elements. Rows are delineated by semicolons. Column values are comma-delimited.
*
* @returns {String} string representation
*/
function toString() {
	/* jshint validthis: true */
	var nRows = this.shape[ 0 ],
		nCols = this.shape[ 1 ],
		s0 = this.strides[ 0 ],
		s1 = this.strides[ 1 ],
		m = nRows - 1,
		n = nCols - 1,
		str = '',
		o,
		i, j;

	for ( i = 0; i < nRows; i++ ) {
		o = this.offset + i*s0;
		for ( j = 0; j < nCols; j++ ) {
			str += this.data[ o + j*s1 ];
			if ( j < n ) {
				str += ',';
			}
		}
		if ( i < m ) {
			str += ';';
		}
	}
	return str;
} // end FUNCTION toString()


// EXPORTS //

module.exports = toString;

},{}],31:[function(require,module,exports){
'use strict';

// MODULES //

var arrayLike = require( 'validate.io-array-like' ),
	typeName = require( 'type-name' );


// VARIABLES //

var DTYPES = require( 'compute-array-dtype/lib/dtypes' ),
	CTORS = require( 'compute-array-constructors/lib/ctors' );


// CAST //

/**
* FUNCTION: cast( x, type )
*	Casts an input array or array-like object to a specified type.
*
* @param {Object|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} x - value to cast
* @param {String|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} type - type to which to cast or a value from which the desired type should be inferred
* @returns {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} casted value
*/
function cast( x, type ) {
	/* jshint newcap:false */
	var ctor,
		len,
		d,
		i;

	if ( !arrayLike( x ) ) {
		throw new TypeError( 'cast()::invalid input argument. First argument must be an array-like object. Value: `' + x + '`.' );
	}
	if ( typeof type === 'string' ) {
		ctor = CTORS[ type ];
	} else {
		ctor = CTORS[ DTYPES[ typeName( type ) ] ];
	}
	if ( ctor === void 0 ) {
		throw new Error( 'cast()::invalid input argument. Unrecognized/unsupported type to which to cast. Value: `' + type + '`.' );
	}
	len = x.length;
	d = new ctor( len );
	for ( i = 0; i < len; i++ ) {
		d[ i ] = x[ i ];
	}
	return d;
} // end FUNCTION cast()


// EXPORTS //

module.exports = cast;

},{"compute-array-constructors/lib/ctors":32,"compute-array-dtype/lib/dtypes":33,"type-name":40,"validate.io-array-like":34}],32:[function(require,module,exports){
'use strict';

var CTORS = {
	'int8': Int8Array,
	'uint8': Uint8Array,
	'uint8_clamped': Uint8ClampedArray,
	'int16': Int16Array,
	'uint16': Uint16Array,
	'int32': Int32Array,
	'uint32': Uint32Array,
	'float32': Float32Array,
	'float64': Float64Array,
	'generic': Array
};


// EXPORTS //

module.exports = CTORS;

},{}],33:[function(require,module,exports){
'use strict';

var DTYPES = {
	'Int8Array': 'int8',
	'Uint8Array': 'uint8',
	'Uint8ClampedArray': 'uint8_clamped',
	'Int16Array': 'int16',
	'Uint16Array': 'uint16',
	'Int32Array': 'int32',
	'Uint32Array': 'uint32',
	'Float32Array': 'float32',
	'Float64Array': 'float64',
	'Array': 'generic'
};


// EXPORTS //

module.exports = DTYPES;

},{}],34:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' );


// CONSTANTS //

var MAX = require( 'compute-const-max-safe-integer' );


// IS ARRAY-LIKE //

/**
* FUNCTION: isArrayLike( value )
*	Validates if a value is array-like.
*
* @param {*} value - value to validate
* @param {Boolean} boolean indicating if a value is array-like
*/
function isArrayLike( value ) {
	return value !== void 0 && value !== null && typeof value !== 'function' && isInteger( value.length ) && value.length >= 0 && value.length <= MAX;
} // end FUNCTION isArrayLike()


// EXPORTS //

module.exports = isArrayLike;

},{"compute-const-max-safe-integer":35,"validate.io-integer-primitive":45}],35:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = 9007199254740991; // Math.pow( 2, 53 ) - 1

},{}],36:[function(require,module,exports){
'use strict';

// MODULES //

var typeName = require( 'type-name' ),
	getType = require( 'compute-array-dtype' );


// DTYPE //

/**
* FUNCTION: dtype( value )
*	Determines the data type of an input value.
*
* @param {*} value - input value
* @returns {String} data type
*/
function dtype( value ) {
	var type,
		dt;
	if ( value === null ) {
		return 'null';
	}
	// Check for base types:
	type = typeof value;
	switch ( type ) {
		case 'undefined':
		case 'boolean':
		case 'number':
		case 'string':
		case 'function':
		case 'symbol':
			return type;
	}
	// Resort to slower look-up:
	type = typeName( value );

	// Is value a known array type?
	dt = getType( type );
	if ( dt ) {
		return dt;
	}
	// Is value a buffer object?
	if ( type === 'Buffer' || type === 'ArrayBuffer' ) {
		return 'binary';
	}
	// Assume the value is a generic object (Object|Class instance) which could contain any or multiple data types...
	return 'generic';
} // end FUNCTION dtype()


// EXPORTS //

module.exports = dtype;

},{"compute-array-dtype":38,"type-name":40}],37:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],38:[function(require,module,exports){
'use strict';

// DTYPES //

var DTYPES = require( './dtypes.js' );


// GET DTYPE //

/**
* FUNCTION: getType( name )
*	Returns an array data type corresponding to an array constructor name.
*
* @param {String} name - constructor name
* @returns {String|Null} array data type or null
*/
function getType( name ) {
	return DTYPES[ name ] || null;
} // end FUNCTION getType()


// EXPORTS //

module.exports = getType;

},{"./dtypes.js":37}],39:[function(require,module,exports){
/**
*
*	COMPUTE: indexspace
*
*
*	DESCRIPTION:
*		- Generates a linearly spaced index array from a subsequence string.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// VARIABLES //

var re = /^(?:(?:-(?=\d+))?\d*|end(?:-\d+|\/\d+)?):(?:(?:-(?=\d+))?\d*|end(?:-\d+|\/\d+)?)(?:\:(?=-?\d*)(?:-?\d+)?)?$/;

/**
*	^(...)
*	=> require that the string begin with either a digit (+ or -), an `end` keyword, or a colon
*
*	(?:(?:-(?=\d+))?\d*|end(?:-?\d+|/\\d+)?)
*	=> match but do not capture
*		(?:-(?=\d+))?
*		=> match but do not capture a minus sign but only if followed by one or more digits
*		\d*
*		=> 0 or more digits
*		|
*		=> OR
*		end(?:-\d+|/\d+)?
*		=> the word `end` exactly, which may be followed by either a minus sign and 1 or more digits or a division sign and 1 or more digits
*
*	:
*	=> match a colon exactly
*
*	(?:(?:-(?=\d+))?\d*|end(?:-\d+|/\\d+)?)
*	=> same as above
*
*	(?:\:(?=-?\d*)(?:-?\d+)?)?
*	=> match but do not capture
*		\:(?=-?\d*)
*		=> a colon but only if followed by either a possible minus sign and 0 or more digits
*		(?:-?\d+)?
*		=> match but do not capture a possible minus sign and 1 or more digits
*
*	$
*	=> require that the string end with either a digit, `end` keyword, or a colon.
*
*
* Examples:
*	-	:
*	-	::
*	-	4:
*	-	:4
*	-	::-1
*	-	3::-1
*	-	:10:2
*	-	1:3:1
*	-	9:1:-3
*	-	1:-1
*	-	:-1
*	-	-5:
*	-	1:-5:2
*	-	-9:10:1
*	-	-9:-4:2
*	-	-4:-9:-2
*	-	1:end:2
*	-	:end/2
*	-	end/2:end:5
*/

var reEnd = /^end/,
	reMatch = /(-|\/)(?=\d+)(\d+)?$/;


// INDEXSPACE

/**
* FUNCTION: indexspace( str, len )
*	Generates a linearly spaced index array from a subsequence string.
*
* @param {String} str - subsequence string
* @param {Number} len - reference array length
* @returns {Number[]} array of indices
*/
function indexspace( str, len ) {
	var x1,
		x2,
		tmp,
		inc,
		arr;
	if ( !isString( str ) || !re.test( str ) ) {
		throw new Error( 'indexspace()::invalid input argument. Invalid subsequence syntax. Please consult documentation. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'indexspace()::invalid input argument. Reference array length must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( !len ) {
		return [];
	}
	str = str.split( ':' );
	x1 = str[ 0 ];
	x2 = str[ 1 ];

	if ( str.length === 2 ) {
		inc = 1;
	} else {
		inc = parseInt( str[ 2 ], 10 );
	}
	// Handle zero increment...
	if ( inc === 0 ) {
		throw new Error( 'indexspace()::invalid syntax. Increment must be an integer not equal to 0. Value: `' + inc + '`.' );
	}

	// START //

	// Handle use of 'end' keyword...
	if ( reEnd.test( x1 ) ) {
		tmp = x1.match( reMatch );
		if ( tmp ) {
			if ( tmp[ 1 ] === '-' ) {
				x1 = len - 1 - parseInt( tmp[ 2 ], 10 );
				if ( x1 < 0 ) {
					// WARNING: forgive the user for exceeding the range bounds...
					x1 = 0;
				}
			} else {
				x1 = (len-1) / parseInt( tmp[ 2 ], 10 );
				x1 = Math.ceil( x1 );
			}
		} else {
			x1 = len - 1;
		}
	} else {
		x1 = parseInt( x1, 10 );

		// Handle empty index...
		if ( x1 !== x1 ) {
			// :-?\d*:-?\d+
			if ( inc < 0 ) {
				// Max index:
				x1 = len - 1;
			} else {
				// Min index:
				x1 = 0;
			}
		}
		// Handle negative index...
		else if ( x1 < 0 ) {
			x1 = len + x1; // len-x1
			if ( x1 < 0 ) {
				// WARNING: forgive the user for exceeding index bounds...
				x1 = 0;
			}
		}
		// Handle exceeding bounds...
		else if ( x1 >= len ) {
			return [];
		}
	}

	// END //

	// NOTE: here, we determine an inclusive `end` value; i.e., the last acceptable index value.

	// Handle use of 'end' keyword...
	if ( reEnd.test( x2 ) ) {
		tmp = x2.match( reMatch );
		if ( tmp ) {
			if ( tmp[ 1 ] === '-' ) {
				x2 = len - 1 - parseInt( tmp[ 2 ], 10 );
				if ( x2 < 0 ) {
					// WARNING: forgive the user for exceeding the range bounds...
					x2 = 0;
				}
			} else {
				x2 = (len-1) / parseInt( tmp[ 2 ], 10 );
				x2 = Math.ceil( x2 ) - 1;
			}
		} else {
			x2 = len - 1;
		}
	} else {
		x2 = parseInt( x2, 10 );

		// Handle empty index...
		if ( x2 !== x2 ) {
			// -?\d*::-?\d+
			if ( inc < 0 ) {
				// Min index:
				x2 = 0;
			} else {
				// Max index:
				x2 = len - 1;
			}
		}
		// Handle negative index...
		else if ( x2 < 0 ) {
			x2 = len + x2; // len-x2
			if ( x2 < 0 ) {
				// WARNING: forgive the user for exceeding index bounds...
				x2 = 0;
			}
			if ( inc > 0 ) {
				x2 = x2 - 1;
			}
		}
		// Handle positive index...
		else {
			if ( inc < 0 ) {
				x2 = x2 + 1;
			}
			else if ( x2 >= len ) {
				x2 = len - 1;
			}
			else {
				x2 = x2 - 1;
			}
		}
	}

	// INDICES //

	arr = [];
	if ( inc < 0 ) {
		if ( x2 > x1 ) {
			return arr;
		}
		while ( x1 >= x2 ) {
			arr.push( x1 );
			x1 += inc;
		}
	} else {
		if ( x1 > x2 ) {
			return arr;
		}
		while ( x1 <= x2 ) {
			arr.push( x1 );
			x1 += inc;
		}
	}
	return arr;
} // end FUNCTION indexspace()


// EXPORTS //

module.exports = indexspace;

},{"validate.io-nonnegative-integer":47,"validate.io-string-primitive":51}],40:[function(require,module,exports){
/**
 * type-name - Just a reasonable typeof
 * 
 * https://github.com/twada/type-name
 *
 * Copyright (c) 2014 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
'use strict';

var toStr = Object.prototype.toString;

function funcName (f) {
    return f.name ? f.name : /^\s*function\s*([^\(]*)/im.exec(f.toString())[1];
}

function ctorName (obj) {
    var strName = toStr.call(obj).slice(8, -1);
    if (strName === 'Object' && obj.constructor) {
        return funcName(obj.constructor);
    }
    return strName;
}

function typeName (val) {
    var type;
    if (val === null) {
        return 'null';
    }
    type = typeof(val);
    if (type === 'object') {
        return ctorName(val);
    }
    return type;
}

module.exports = typeName;

},{}],41:[function(require,module,exports){
'use strict';

/**
* FUNCTION: isArray( value )
*	Validates if a value is an array.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is an array
*/
function isArray( value ) {
	return Object.prototype.toString.call( value ) === '[object Array]';
} // end FUNCTION isArray()

// EXPORTS //

module.exports = Array.isArray || isArray;

},{}],42:[function(require,module,exports){
/**
*
*	VALIDATE: contains
*
*
*	DESCRIPTION:
*		- Validates if an array contains an input value.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isnan = require( 'validate.io-nan-primitive' );


// CONTAINS //

/**
* FUNCTION: contains( arr, value )
*	Validates if an array contains an input value.
*
* @param {Array} arr - search array
* @param {*} value - search value
* @returns {Boolean} boolean indicating if an array contains an input value
*/
function contains( arr, value ) {
	var len, i;
	if ( !isArray( arr ) ) {
		throw new TypeError( 'contains()::invalid input argument. First argument must be an array. Value: `' + arr + '`.' );
	}
	len = arr.length;
	if ( isnan( value ) ) {
		for ( i = 0; i < len; i++ ) {
			if ( isnan( arr[ i ] ) ) {
				return true;
			}
		}
		return false;
	}
	for ( i = 0; i < len; i++ ) {
		if ( arr[ i ] === value ) {
			return true;
		}
	}
	return false;
} // end FUNCTION contains()


// EXPORTS //

module.exports = contains;

},{"validate.io-array":41,"validate.io-nan-primitive":43}],43:[function(require,module,exports){
/**
*
*	VALIDATE: nan-primitive
*
*
*	DESCRIPTION:
*		- Validates if a value is a NaN primitive.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

/**
* FUNCTION: nan( value )
*	Validates if a value is a NaN primitive.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether the value is a NaN primitive
*/
function nan( value ) {
	return typeof value === 'number' && value !== value;
} // end FUNCTION nan()


// EXPORTS //

module.exports = nan;

},{}],44:[function(require,module,exports){
/**
*
*	VALIDATE: function
*
*
*	DESCRIPTION:
*		- Validates if a value is a function.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isFunction( value )
*	Validates if a value is a function.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is a function
*/
function isFunction( value ) {
	return ( typeof value === 'function' );
} // end FUNCTION isFunction()


// EXPORTS //

module.exports = isFunction;

},{}],45:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// IS INTEGER //

/**
* FUNCTION: isInteger( value )
*	Validates if a value is a number primitive, excluding `NaN`, and an integer.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a integer primitive
*/
function isInteger( value ) {
	return isNumber( value ) && value%1 === 0;
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"validate.io-number-primitive":50}],46:[function(require,module,exports){
/**
*
*	VALIDATE: nonnegative-integer-array
*
*
*	DESCRIPTION:
*		- Validates if a value is a nonnegative integer array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// IS NONNEGATIVE INTEGER ARRAY //

/**
* FUNCTION: isNonNegativeIntegerArray( value )
*	Validates if a value is a nonnegative integer array.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a nonnegative integer array
*/
function isNonNegativeIntegerArray( value ) {
	var len;
	if ( !isArray( value ) ) {
		return false;
	}
	len = value.length;
	if ( !len ) {
		return false;
	}
	for ( var i = 0; i < len; i++ ) {
		if ( !isNonNegativeInteger( value[i] ) ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isNonNegativeIntegerArray()


// EXPORTS //

module.exports = isNonNegativeIntegerArray;

},{"validate.io-array":41,"validate.io-nonnegative-integer":47}],47:[function(require,module,exports){
/**
*
*	VALIDATE: nonnegative-integer
*
*
*	DESCRIPTION:
*		- Validates if a value is a nonnegative integer.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// IS NONNEGATIVE INTEGER //

/**
* FUNCTION: isNonNegativeInteger( value )
*	Validates if a value is a nonnegative integer.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a nonnegative integer
*/
function isNonNegativeInteger( value ) {
	return isInteger( value ) && value >= 0;
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"validate.io-integer":48}],48:[function(require,module,exports){
/**
*
*	VALIDATE: integer
*
*
*	DESCRIPTION:
*		- Validates if a value is an integer.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isNumber = require( 'validate.io-number' );


// ISINTEGER //

/**
* FUNCTION: isInteger( value )
*	Validates if a value is an integer.
*
* @param {Number} value - value to be validated
* @returns {Boolean} boolean indicating whether value is an integer
*/
function isInteger( value ) {
	return isNumber( value ) && value%1 === 0;
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"validate.io-number":49}],49:[function(require,module,exports){
/**
*
*	VALIDATE: number
*
*
*	DESCRIPTION:
*		- Validates if a value is a number.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isNumber( value )
*	Validates if a value is a number.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is a number
*/
function isNumber( value ) {
	return ( typeof value === 'number' || Object.prototype.toString.call( value ) === '[object Number]' ) && value.valueOf() === value.valueOf();
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{}],50:[function(require,module,exports){
/**
*
*	VALIDATE: number-primitive
*
*
*	DESCRIPTION:
*		- Validates if a value is a number primitive.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

/**
* FUNCTION: isNumber( value )
*	Validates if a value is a number primitive, excluding `NaN`.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a number primitive
*/
function isNumber( value ) {
	return (typeof value === 'number') && (value === value);
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{}],51:[function(require,module,exports){
/**
*
*	VALIDATE: string-primitive
*
*
*	DESCRIPTION:
*		- Validates if a value is a string primitive.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

/**
* FUNCTION: isString( value )
*	Validates if a value is a string primitive.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a string primitive
*/
function isString( value ) {
	return typeof value === 'string';
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{}],52:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' );


// VARIABLES //

var MAXLENGTH = Math.pow( 2, 32 ) - 1;


// INCRSPACE //

/**
* FUNCTION: incrspace( start, stop[, increment] )
*	Generates a linearly spaced numeric array using a provided increment.
*
* @param {Number} start - first array value
* @param {Number} stop - array element bound
* @param {Number} [increment] - increment
* @returns {Array} linearly spaced numeric array
*/
function incrspace( x1, x2, increment ) {
	var arr,
		len,
		inc,
		i;
	if ( !isNumber( x1 ) ) {
		throw new TypeError( 'incrspace()::invalid input argument. Start must be numeric. Value: `' + x1 + '`.' );
	}
	if ( !isNumber( x2 ) ) {
		throw new TypeError( 'incrspace()::invalid input argument. Stop must be numeric. Value: `' + x2 + '`.' );
	}
	if ( arguments.length < 3 ) {
		inc = 1;
	} else {
		inc = increment;
		if ( !isNumber( inc ) ) {
			throw new TypeError( 'incrspace()::invalid input argument. Increment must be numeric. Value: `' + inc + '`.' );
		}
	}
	len = Math.ceil( ( x2-x1 ) / inc );

	if ( len > MAXLENGTH ) {
		throw new RangeError( 'incrspace()::invalid input arguments. Generated array exceeds maximum array length.' );
	}
	if ( len <= 1 ) {
		return [ x1 ];
	}
	if ( len > 64000 ) {
		// Ensure fast elements...
		arr = [];
		arr.push( x1 );
		for ( i = 1; i < len; i++ ) {
			arr.push( x1 + inc*i );
		}
	} else {
		arr = new Array( len );
		arr[ 0 ] = x1;
		for ( i = 1; i < len; i++ ) {
			arr[ i ] = x1 + inc*i;
		}
	}
	return arr;
} // end FUNCTION incrspace()


// EXPORTS //

module.exports = incrspace;

},{"validate.io-number-primitive":53}],53:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],54:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"dup":39,"validate.io-nonnegative-integer":55,"validate.io-string-primitive":58}],55:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47,"validate.io-integer":56}],56:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":57}],57:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],58:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],59:[function(require,module,exports){
/**
*
*	COMPUTE: linspace
*
*
*	DESCRIPTION:
*		- Generates a linearly spaced numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// LINSPACE //

/**
* FUNCTION: linspace( start, stop[, length] )
*	Generates a linearly spaced numeric array.
*
* @param {Number} start - first array value
* @param {Number} stop - last array value
* @param {Number} [length] - length of output array
* @returns {Array} linearly spaced numeric array
*/
function linspace( x1, x2, len ) {
	var arr,
		end,
		tmp,
		d;

	if ( typeof x1 !== 'number' || x1 !== x1 ) {
		throw new TypeError( 'linspace()::invalid input argument. Start must be numeric.' );
	}
	if ( typeof x2 !== 'number' || x2 !== x2 ) {
		throw new TypeError( 'linspace()::invalid input argument. Stop must be numeric.' );
	}
	if ( arguments.length < 3 ) {
		len = 100;
	} else {
		if ( !isInteger( len ) || len < 0 ) {
			throw new TypeError( 'linspace()::invalid input argument. Length must be a positive integer.' );
		}
		if ( len === 0 ) {
			return [];
		}
	}
	// Calculate the increment:
	end = len - 1;
	d = ( x2-x1 ) / end;

	// Build the output array...
	arr = new Array( len );
	tmp = x1;
	arr[ 0 ] = tmp;
	for ( var i = 1; i < end; i++ ) {
		tmp += d;
		arr[ i ] = tmp;
	}
	arr[ end ] = x2;
	return arr;
} // end FUNCTION linspace()


// EXPORTS //

module.exports = linspace;

},{"validate.io-integer":60}],60:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":61}],61:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],62:[function(require,module,exports){
/**
*
*	COMPUTE: logspace
*
*
*	DESCRIPTION:
*		- Generates a logarithmically spaced numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// LOGSPACE //

/**
* FUNCTION: logspace( a, b[, length] )
*	Generates a logarithmically spaced numeric array.
*
* @param {Number} a - exponent of start value
* @param {Number} b - exponent of end value
* @param {Number} [length] - length of output array (default: 10)
* @returns {Array} logarithmically spaced numeric array
*/
function logspace( a, b, len ) {
	var arr,
		end,
		tmp,
		d;

	if ( typeof a !== 'number' || a !== a ) {
		throw new TypeError( 'logspace()::invalid input argument. Exponent of start value must be numeric.' );
	}
	if ( typeof b !== 'number' || b !== b ) {
		throw new TypeError( 'logspace()::invalid input argument. Exponent of stop value must be numeric.' );
	}
	if ( arguments.length < 3 ) {
		len = 10;
	} else {
		if ( !isInteger( len ) || len < 0 ) {
			throw new TypeError( 'logspace()::invalid input argument. Length must be a positive integer.' );
		}
		if ( len === 0 ) {
			return [];
		}
	}
	// Calculate the increment:
	end = len - 1;
	d = ( b-a ) / end;

	// Build the output array...
	arr = new Array( len );
	tmp = a;
	arr[ 0 ] = Math.pow( 10, tmp );
	for ( var i = 1; i < end; i++ ) {
		tmp += d;
		arr[ i ] = Math.pow( 10, tmp );
	}
	arr[ end ] = Math.pow( 10, b );
	return arr;
} // end FUNCTION logspace()


// EXPORTS //

module.exports = logspace;

},{"validate.io-integer":63}],63:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":64}],64:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],65:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// CDF //

/**
* FUNCTION: cdf( out, arr, mu, sigma, accessor )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cdf( y, x, mu, sigma, clbk ) {
	var len = x.length,
		fcn,
		v, i;

	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = fcn( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"./partial.js":71}],66:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// CDF //

/**
* FUNCTION: cdf( out, arr, mu, sigma )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cdf( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			y[ i ] = fcn( x[ i ] );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"./partial.js":71}],67:[function(require,module,exports){
'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	partial = require( './partial.js' );


// CDF //

/**
* FUNCTION: cdf( arr, mu, sigma, path[, sep] )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` for each array element and sets the input array.
*
* @param {Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function cdf( x, mu, sigma, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		fcn,
		v, i;
	if ( arguments.length > 4 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		fcn = partial( mu, sigma );
		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[i], fcn( v ) );
			} else {
				dset( x[i], NaN );
			}
		}
	}
	return x;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"./partial.js":71,"utils-deep-get":123,"utils-deep-set":129}],68:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var cdf1 = require( './number.js' ),
	cdf2 = require( './array.js' ),
	cdf3 = require( './accessor.js' ),
	cdf4 = require( './deepset.js' ),
	cdf5 = require( './matrix.js' ),
	cdf6 = require( './typedarray.js' );


// CDF //

/**
* FUNCTION: cdf( x[, opts] )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Number} [opts.mu=0] - mean
* @param {Number} [opts.sigma=1] - standard deviation
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} evaluated CDF
*/
function cdf( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	opts.mu = typeof opts.mu !== 'undefined' ? opts.mu : 0;
	opts.sigma = typeof opts.sigma !== 'undefined' ? opts.sigma : 1;

	if ( isNumber( x ) ) {
		return cdf1( x, opts.mu, opts.sigma );
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'cdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		return cdf5( out, x, opts.mu, opts.sigma );
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'cdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( x.length );
		}
		return cdf6( out, x, opts.mu, opts.sigma );
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return cdf4( x, opts.mu, opts.sigma, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'cdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return cdf3( out, x, opts.mu, opts.sigma, opts.accessor );
		}
		return cdf2( out, x, opts.mu, opts.sigma );
	}
	return NaN;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"./accessor.js":65,"./array.js":66,"./deepset.js":67,"./matrix.js":69,"./number.js":70,"./typedarray.js":72,"./validate.js":73,"compute-array-constructors":75,"dstructs-matrix":85,"validate.io-array-like":132,"validate.io-matrix-like":137,"validate.io-number-primitive":143,"validate.io-typed-array-like":147}],69:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// CDF //

/**
* FUNCTION: cdf( out, matrix, mu, sigma )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Matrix} output matrix
*/
function cdf( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'cdf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"./partial.js":71}],70:[function(require,module,exports){
'use strict';

// MODULES //

var erf = require( 'compute-erf/lib/number.js' );


// FUNCTIONS //

var sqrt = Math.sqrt;


// CDF //

/**
* FUNCTION: cdf( x, mu, sigma )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number} evaluated CDF
*/
function cdf( x, mu, sigma ) {
	if( sigma === 0 ) {
		return (x < mu) ? 0 : 1;
	}
	var A = 1 / 2,
		B = sigma * sqrt( 2 ),
		C = x - mu;
	return A * ( 1 + erf( C / B ) );
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"compute-erf/lib/number.js":76}],71:[function(require,module,exports){
'use strict';

// MODULES //

var erf = require( 'compute-erf/lib/number.js' );


// FUNCTIONS //

var sqrt = Math.sqrt;


// PARTIAL //

/**
* FUNCTION: partial( mu, sigma )
*	Partially applies mean `mu` and standard deviation `sigma` and returns a function for evaluating the cumulative distribution function (CDF) for a Normal distribution.
*
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Function} CDF
*/
function partial( mu, sigma ) {
	var A = 1 / 2,
		B = sigma * sqrt( 2 );
	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function (CDF) for a Normal distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	if( sigma === 0 ) {
		return function cdf( x ) {
			return (x < mu) ? 0 : 1;
		};
	}
	return function cdf( x ) {
		var C = x - mu;
		return A * ( 1 + erf( C / B ) );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;

},{"compute-erf/lib/number.js":76}],72:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// CDF //

/**
* FUNCTION: cdf( out, arr, mu, sigma )
*	Evaluates the cumulative distribution function (CDF) for a Normal distribution with mean `mu` and standard deviation `sigma` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cdf( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial ( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		y[ i ] = fcn( x[ i ] );
	}
	return y;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"./partial.js":71}],73:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNonNegative = require( 'validate.io-nonnegative' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.mu=0] - mean
* @param {Number} [options.sigma=1] - standard deviation
* @param {Boolean} [options.copy] - boolean indicating if the function should return a new data structure
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {String} [options.sep] - deep get/set key path separator
* @param {String} [options.path] - deep get/set key path
* @param {String} [options.dtype] - output data type
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'cdf()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'mu' ) ) {
		opts.mu = options.mu;
		if ( !isNumber( opts.mu ) ) {
			return new TypeError( 'cdf()::invalid option. `mu` parameter must be a number primitive. Option: `' + opts.mu + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sigma' ) ) {
		opts.sigma = options.sigma;
		if ( !isNonNegative( opts.sigma ) ) {
			return new TypeError( 'cdf()::invalid option. `sigma` parameter must be a non-negative number. Option: `' + opts.sigma + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'cdf()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'cdf()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'path' ) ) {
		opts.path = options.path;
		if ( !isString( opts.path ) ) {
			return new TypeError( 'cdf()::invalid option. Key path option must be a string primitive. Option: `' + opts.path + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'cdf()::invalid option. Separator option must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'cdf()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-boolean-primitive":135,"validate.io-function":136,"validate.io-nonnegative":141,"validate.io-number-primitive":143,"validate.io-object":144,"validate.io-string-primitive":146}],74:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],75:[function(require,module,exports){
'use strict';

// CTORS //

var CTORS = require( './ctors.js' );


// GET CTOR //

/**
* FUNCTION: getCtor( dtype )
*	Returns an array constructor corresponding to an input data type.
*
* @param {String} dtype - data type
* @returns {Function|Null} array constructor or null
*/
function getCtor( dtype ) {
	return CTORS[ dtype ] || null;
} // end FUNCTION getCtor()


// EXPORTS //

module.exports = getCtor;

},{"./ctors.js":74}],76:[function(require,module,exports){
'use strict';

/**
* NOTE: the following copyright and license, as well as the long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c?revision=268523&view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/**
* ===========================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc business.
* Permission to use, copy, modify, and distribute this software is freely granted, provided that this notice is preserved.
* ===========================
*/

/**
* double erf(double x)
*                               x
*                      2       |\
*       erf(x) = -----------   | exp(-t*t)dt
*                   sqrt(pi)  \|
*                              0
*
*		erfc(x) =  1-erf(x)
*   Note that
*		erf(-x) = -erf(x)
*		erfc(-x) = 2 - erfc(x)
*
* Method:
*	1. For |x| in [0, 0.84375)
*       erf(x)  = x + x*R(x^2)
*       erfc(x) = 1 - erf(x)           if x in [-.84375,0.25]
*               = 0.5 + ((0.5-x)-x*R)  if x in [0.25,0.84375]
*       where R = P/Q where P is an odd poly of degree 8 and Q is an odd poly of degree 10.
*                                  -57.90
*           | R - (erf(x)-x)/x | <= 2
*
*
*       Remark. The formula is derived by noting
*           erf(x) = (2/sqrt(pi))*(x - x^3/3 + x^5/10 - x^7/42 + ....)
*       and that
*           2/sqrt(pi) = 1.128379167095512573896158903121545171688
*       is close to one. The interval is chosen because the fix point of erf(x) is near 0.6174 (i.e., erf(x)=x when x is near 0.6174), and by some experiment, 0.84375 is chosen to guarantee the error is less than one ulp for erf.
*
*   2. For |x| in [0.84375,1.25), let s = |x| - 1, and c = 0.84506291151 rounded to single (24 bits)
*       erf(x)  = sign(x) * (c + P1(s)/Q1(s))
*       erfc(x) = (1-c) - P1(s)/Q1(s) if x > 0
*           1+(c+P1(s)/Q1(s))         if x < 0
*           |P1/Q1 - (erf(|x|)-c)| <= 2**-59.06
*   Remark: here we use the taylor series expansion at x=1.
*       erf(1+s) = erf(1) + s*Poly(s)
*                = 0.845.. + P1(s)/Q1(s)
*   That is, we use rational approximation to approximate
*       erf(1+s) - (c = (single)0.84506291151)
*   Note that |P1/Q1|< 0.078 for x in [0.84375,1.25] where
*       P1(s) = degree 6 poly in s
*       Q1(s) = degree 6 poly in s
*
*   3. For x in [1.25,1/0.35(~2.857143)),
*       erfc(x) = (1/x)*exp(-x*x-0.5625+R1/S1)
*       erf(x)  = 1 - erfc(x)
*   where
*       R1(z) = degree 7 poly in z, (z=1/x^2)
*       S1(z) = degree 8 poly in z
*
*   4. For x in [1/0.35,28]
*       erfc(x) = (1/x)*exp(-x*x-0.5625+R2/S2)       if x > 0
*               = 2.0 - (1/x)*exp(-x*x-0.5625+R2/S2) if -6 < x < 0
*               = 2.0 - tiny                         if x <= -6
*       erf(x)  = sign(x)*(1.0 - erfc(x))            if x < 6, else
*       erf(x)  = sign(x)*(1.0 - tiny)
*   where
*       R2(z) = degree 6 poly in z, (z=1/x^2)
*       S2(z) = degree 7 poly in z
*
*   Note1:
*       To compute exp(-x*x-0.5625+R/S), let s be a single precision number and s := x; then
*           -x*x = -s*s + (s-x)*(s+x)
*           exp(-x*x-0.5626+R/S) = exp(-s*s-0.5625)*exp((s-x)*(s+x)+R/S);
*   Note2:
*       Here 4 and 5 make use of the asymptotic series
*                   exp(-x*x)
*       erfc(x) ~  ----------- * ( 1 + Poly(1/x^2) )
*                   x*sqrt(pi)
*       We use rational approximation to approximate
*           g(s) = f(1/x^2) = log(erfc(x)*x) - x*x + 0.5625
*       Here is the error bound for R1/S1 and R2/S2
*           |R1/S1 - f(x)| < 2**(-62.57)
*           |R2/S2 - f(x)| < 2**(-61.52)
*
*   5. For inf > x >= 28
*       erf(x)  = sign(x) * (1 - tiny)   (raise inexact)
*       erfc(x) = tiny*tiny              (raise underflow) if x > 0
*               = 2 - tiny               if x<0
*
*   6. Special cases:
*       erf(0)  = 0, erf(inf)  = 1, erf(-inf) = -1,
*       erfc(0) = 1, erfc(inf) = 0, erfc(-inf) = 2,
*       erfc/erf(NaN) is NaN
*/

// CONSTANTS //

var INF = Number.POSITIVE_INFINITY,
	NINF = Number.NEGATIVE_INFINITY,

	TINY = 1e-300,
	SMALL = 1.0 / (1 << 28 ), /* 2**-28; equiv is Math.pow( 2, -28 ) */
	ERX = 8.45062911510467529297e-1, /* 0x3FEB0AC1, 0x60000000 */

	// Coefficients for approximation to erf on [0, 0.84375)
	EFX = 1.28379167095512586316e-1, /* 0x3FC06EBA, 0x8214DB69 */
	EFX8 = 1.02703333676410069053, /* 0x3FF06EBA, 0x8214DB69 */
	PP0 = 1.28379167095512558561e-1, /* 0x3FC06EBA, 0x8214DB68 */
	PP1 = -3.25042107247001499370e-1, /* 0xBFD4CD7D, 0x691CB913 */
	PP2 = -2.84817495755985104766e-2, /* 0xBF9D2A51, 0xDBD7194F */
	PP3 = -5.77027029648944159157e-3, /* 0xBF77A291, 0x236668E4 */
	PP4 = -2.37630166566501626084e-5, /* 0xBEF8EAD6, 0x120016AC */
	QQ1 = 3.97917223959155352819e-1, /* 0x3FD97779, 0xCDDADC09 */
	QQ2 = 6.50222499887672944485e-2, /* 0x3FB0A54C, 0x5536CEBA */
	QQ3 = 5.08130628187576562776e-3, /* 0x3F74D022, 0xC4D36B0F */
	QQ4 = 1.32494738004321644526e-4, /* 0x3F215DC9, 0x221C1A10 */
	QQ5 = -3.96022827877536812320e-6, /* 0xBED09C43, 0x42A26120 */

	// Coefficients for approximation to erf on [0.84375, 1.25)
	PA0 = -2.36211856075265944077e-3, /* 0xBF6359B8, 0xBEF77538 */
	PA1 = 4.14856118683748331666e-1, /* 0x3FDA8D00, 0xAD92B34D */
	PA2 = -3.72207876035701323847e-1, /* 0xBFD7D240, 0xFBB8C3F1 */
	PA3 = 3.18346619901161753674e-1, /* 0x3FD45FCA, 0x805120E4 */
	PA4 = -1.10894694282396677476e-1, /* 0xBFBC6398, 0x3D3E28EC */
	PA5 = 3.54783043256182359371e-2, /* 0x3FA22A36, 0x599795EB */
	PA6 = -2.16637559486879084300e-3, /* 0xBF61BF38, 0x0A96073F */
	QA1 = 1.06420880400844228286e-1, /* 0x3FBB3E66, 0x18EEE323 */
	QA2 = 5.40397917702171048937e-1, /* 0x3FE14AF0, 0x92EB6F33 */
	QA3 = 7.18286544141962662868e-2, /* 0x3FB2635C, 0xD99FE9A7 */
	QA4 = 1.26171219808761642112e-1, /* 0x3FC02660, 0xE763351F */
	QA5 = 1.36370839120290507362e-2, /* 0x3F8BEDC2, 0x6B51DD1C */
	QA6 = 1.19844998467991074170e-2, /* 0x3F888B54, 0x5735151D */

	// Coefficients for approximation to erfc on [1.25, 1/0.35)
	RA0 = -9.86494403484714822705e-3, /* 0xBF843412, 0x600D6435 */
	RA1 = -6.93858572707181764372e-1, /* 0xBFE63416, 0xE4BA7360 */
	RA2 = -1.05586262253232909814e1, /* 0xC0251E04, 0x41B0E726 */
	RA3 = -6.23753324503260060396e1, /* 0xC04F300A, 0xE4CBA38D */
	RA4 = -1.62396669462573470355e2, /* 0xC0644CB1, 0x84282266 */
	RA5 = -1.84605092906711035994e2, /* 0xC067135C, 0xEBCCABB2 */
	RA6 = -8.12874355063065934246e1, /* 0xC0545265, 0x57E4D2F2 */
	RA7 = -9.81432934416914548592, /* 0xC023A0EF, 0xC69AC25C */
	SA1 = 1.96512716674392571292e1, /* 0x4033A6B9, 0xBD707687 */
	SA2 = 1.37657754143519042600e2, /* 0x4061350C, 0x526AE721 */
	SA3 = 4.34565877475229228821e2, /* 0x407B290D, 0xD58A1A71 */
	SA4 = 6.45387271733267880336e2, /* 0x40842B19, 0x21EC2868 */
	SA5 = 4.29008140027567833386e2, /* 0x407AD021, 0x57700314 */
	SA6 = 1.08635005541779435134e2, /* 0x405B28A3, 0xEE48AE2C */
	SA7 = 6.57024977031928170135, /* 0x401A47EF, 0x8E484A93 */
	SA8 = -6.04244152148580987438e-2, /* 0xBFAEEFF2, 0xEE749A62 */

	// Coefficients for approximation to erfc on [1/0.35, 28]
	RB0 = -9.86494292470009928597e-3, /* 0xBF843412, 0x39E86F4A */
	RB1 = -7.99283237680523006574e-1, /* 0xBFE993BA, 0x70C285DE */
	RB2 = -1.77579549177547519889e1, /* 0xC031C209, 0x555F995A */
	RB3 = -1.60636384855821916062e2, /* 0xC064145D, 0x43C5ED98 */
	RB4 = -6.37566443368389627722e2, /* 0xC083EC88, 0x1375F228 */
	RB5 = -1.02509513161107724954e3, /* 0xC0900461, 0x6A2E5992 */
	RB6 = -4.83519191608651397019e2, /* 0xC07E384E, 0x9BDC383F */
	SB1 = 3.03380607434824582924e1, /* 0x403E568B, 0x261D5190 */
	SB2 = 3.25792512996573918826e2, /* 0x40745CAE, 0x221B9F0A */
	SB3 = 1.53672958608443695994e3, /* 0x409802EB, 0x189D5118 */
	SB4 = 3.19985821950859553908e3, /* 0x40A8FFB7, 0x688C246A */
	SB5 = 2.55305040643316442583e3, /* 0x40A3F219, 0xCEDF3BE6 */
	SB6 = 4.74528541206955367215e2, /* 0x407DA874, 0xE79FE763 */
	SB7 = -2.24409524465858183362e1; /* 0xC03670E2, 0x42712D62 */


// VARIABLES //

var EXP = Math.exp;


// ERF //

/**
* FUNCTION: erf( x )
*	Evaluates the error function for an input value.
*
* @param {Number} x - input value
* @returns {Number} evaluated error function
*/
function erf( x ) {
	var sign = false,
		tmp,
		z, r, s, y, p, q;

	// [1] Special cases...

	// NaN:
	if ( x !== x ) {
		return NaN;
	}
	// Positive infinity:
	if ( x === INF ) {
		return 1;
	}
	// Negative infinity:
	if ( x === NINF ) {
		return -1;
	}

	// [2] Get the sign:
	if ( x < 0 ) {
		x = -x;
		sign = true;
	}

	// [3] |x| < 0.84375
	if ( x < 0.84375 ) {
		if ( x < SMALL ) {
			if ( x < TINY ) {
				// Avoid underflow:
				tmp = 0.125 * (8.0*x + EFX8*x );
			} else {
				tmp = x + EFX*x;
			}
		} else {
			z = x * x;
			// Horner's method: http://en.wikipedia.org/wiki/Horner's_method
			r = PP0 + z*(PP1+z*(PP2+z*(PP3+z*PP4)));
			s = 1.0 + z*(QQ1+z*(QQ2+z*(QQ3+z*(QQ4+z*QQ5))));
			y = r / s;
			tmp = x + x*y;
		}
		if ( sign ) {
			return -tmp;
		}
		return tmp;
	}

	// [4] 0.84375 <= |x| < 1.25
	if ( x < 1.25 ) {
		s = x - 1;
		p = PA0 + s*(PA1+s*(PA2+s*(PA3+s*(PA4+s*(PA5+s*PA6)))));
		q = 1 + s*(QA1+s*(QA2+s*(QA3+s*(QA4+s*(QA5+s*QA6)))));
		if ( sign ) {
			return -ERX - p/q;
		}
		return ERX + p/q;
	}

	// [5] INF > |x| >=6
	if ( x >= 6 ) {
		if ( sign ) {
			return TINY - 1;
		}
		return 1 - TINY;
	}

	s = 1 / (x*x);

	// [6] |x| < 1 / 0.35 ~2.857143
	if ( x < 1/0.35 ) {
		r = RA0 + s*(RA1+s*(RA2+s*(RA3+s*(RA4+s*(RA5+s*(RA6+s*RA7))))));
		s = 1 + s*(SA1+s*(SA2+s*(SA3+s*(SA4+s*(SA5+s*(SA6+s*(SA7+s*SA8)))))));
	} else { // [7] |x| >= 1/0.35 ~2.857143
		r = RB0 + s*(RB1+s*(RB2+s*(RB3+s*(RB4+s*(RB5+s*RB6)))));
		s = 1 + s*(SB1+s*(SB2+s*(SB3+s*(SB4+s*(SB5+s*(SB6+s*SB7))))));
	}
	z = x & 0xffffffff00000000; // pseudo-single (20-bit) precision x;
	r = EXP( -z*z - 0.5625 ) * EXP( (z-x)*(z+x) + r/s );
	if ( sign ) {
		return r/x - 1;
	}
	return 1 - r/x;
} // end FUNCTION erf()


// EXPORTS //

module.exports = erf;

},{}],77:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],78:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"./get.js":81,"./iget.js":83,"./iset.js":86,"./mget.js":90,"./mset.js":92,"./set.js":100,"./sget.js":102,"./sset.js":104,"./toString.js":106,"dup":2}],79:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./get.raw.js":82,"./iget.raw.js":84,"./iset.raw.js":87,"./mget.raw.js":91,"./mset.raw.js":93,"./set.raw.js":101,"./sget.raw.js":103,"./sset.raw.js":105,"./toString.js":106,"dup":3}],80:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],81:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"validate.io-nonnegative-integer":138}],82:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],83:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7,"validate.io-integer-primitive":118}],84:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],85:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./matrix.js":88,"./matrix.raw.js":89,"dup":9}],86:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10,"validate.io-integer-primitive":118,"validate.io-number-primitive":143}],87:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],88:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./btypes.js":77,"./ctor.js":78,"./dtypes.js":80,"compute-cast-arrays":107,"compute-dtype":110,"dup":12,"validate.io-array":115,"validate.io-contains":116,"validate.io-nonnegative-integer-array":119,"validate.io-string-primitive":146}],89:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./btypes.js":77,"./ctor.raw.js":79,"./dtypes.js":80,"compute-dtype":110,"dup":13,"validate.io-contains":116,"validate.io-string-primitive":146}],90:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./btypes.js":77,"dup":14,"validate.io-nonnegative-integer-array":119}],91:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./btypes.js":77,"dup":15}],92:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./mset1.js":94,"./mset2.js":95,"./mset3.js":96,"./mset4.js":97,"./mset5.js":98,"./mset6.js":99,"dup":16,"validate.io-function":136,"validate.io-nonnegative-integer-array":119,"validate.io-number-primitive":143}],93:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./mset1.js":94,"./mset2.js":95,"./mset3.js":96,"./mset4.js":97,"./mset5.js":98,"./mset6.js":99,"dup":17}],94:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],95:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],96:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],97:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],98:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],99:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],100:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24,"validate.io-nonnegative-integer":138,"validate.io-number-primitive":143}],101:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],102:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./btypes.js":77,"compute-indexspace":114,"dup":26,"validate.io-string-primitive":146}],103:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./btypes.js":77,"compute-indexspace":114,"dup":27}],104:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"compute-indexspace":114,"dup":28,"validate.io-function":136,"validate.io-number-primitive":143,"validate.io-string-primitive":146}],105:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"compute-indexspace":114,"dup":29}],106:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],107:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"compute-array-constructors/lib/ctors":74,"compute-array-dtype/lib/dtypes":108,"dup":31,"type-name":109,"validate.io-array-like":132}],108:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],109:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],110:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"compute-array-dtype":112,"dup":36,"type-name":113}],111:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],112:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./dtypes.js":111,"dup":38}],113:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],114:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"dup":39,"validate.io-nonnegative-integer":138,"validate.io-string-primitive":146}],115:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],116:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42,"validate.io-array":115,"validate.io-nan-primitive":117}],117:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],118:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":143}],119:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46,"validate.io-array":115,"validate.io-nonnegative-integer":138}],120:[function(require,module,exports){
'use strict';

/**
* FUNCTION: deepGet( obj, props )
*	Deep get a nested property.
*
* @param {Object|Array} obj - input object
* @param {Array} props - list of properties defining a key path
* @returns {*} nested property value
*/
function deepGet( obj, props ) {
	var len = props.length,
		v = obj,
		i;

	for ( i = 0; i < len; i++ ) {
		if ( typeof v === 'object' && v !== null && v.hasOwnProperty( props[i] ) ) {
			v = v[ props[i] ];
		} else {
			return;
		}
	}
	return v;
} // end FUNCTION deepGet()


// EXPORTS //

module.exports = deepGet;

},{}],121:[function(require,module,exports){
'use strict';

/**
* FUNCTION: defaults()
*	Returns default options.
*
* @returns {Object} default options
*/
function defaults() {
	return {
		'sep': '.'
	};
} // end FUNCTION defaults()


// EXPORTS //

module.exports = defaults;

},{}],122:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dget = require( './deepget.js' );


// FACTORY //

/**
* FUNCTION: factory( path[, opts] )
*	Creates a reusable deep get factory.
*
* @param {String|Array} path - key path
* @param {Object} [opts] - function options
* @param {String} [opts.sep='.'] - key path separator
* @returns {Function} deep get factory
*/
function factory( path, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepGet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	/**
	* FUNCTION: deepGet( obj )
	*	Deep get a nested property.
	*
	* @param {Object|Array} obj - input object
	* @returns {*} nested property value
	*/
	return function deepGet( obj ) {
		if ( typeof obj !== 'object' || obj === null ) {
			return;
		}
		return dget( obj, props );
	};
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./deepget.js":120,"./defaults.js":121,"./validate.js":124,"validate.io-array":125,"validate.io-string-primitive":146}],123:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dget = require( './deepget.js' );


// DEEP GET //

/**
* FUNCTION: deepGet( obj, path[, opts] )
*	Deep get a nested property.
*
* @param {Object|Array} obj - input object
* @param {String|Array} path - key path
* @param {Object} [opts] - function options
* @param {String} [opts.sep='.'] - key path separator
* @returns {*} nested property value
*/
function deepGet( obj, path, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( typeof obj !== 'object' || obj === null ) {
		return;
	}
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepGet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	return dget( obj, props );
} // end FUNCTION deepGet()


// EXPORTS //

module.exports = deepGet;
module.exports.factory = require( './factory.js' );

},{"./deepget.js":120,"./defaults.js":121,"./factory.js":122,"./validate.js":124,"validate.io-array":125,"validate.io-string-primitive":146}],124:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isObject = require( 'validate.io-object' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for function options
* @param {Object} options - function options
* @param {String} [options.sep] - key path separator
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'deepGet()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'deepGet()::invalid option. Key path separator must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-object":144,"validate.io-string-primitive":146}],125:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],126:[function(require,module,exports){
'use strict';

/**
* FUNCTION: deepSet( obj, props, create, value )
*	Deep sets a nested property.
*
* @param {Object|Array} obj - input object
* @param {Array} props - list of properties defining a key path
* @param {Boolean} create - boolean indicating whether to create a path if the key path does not already exist
* @param {*} value - value to set
* @returns {Boolean} boolean indicating if the property was successfully set
*/
function deepSet( obj, props, create, val ) {
	var len = props.length,
		bool = false,
		v = obj,
		p,
		i;

	for ( i = 0; i < len; i++ ) {
		p = props[ i ];
		if ( typeof v === 'object' && v !== null ) {
			if ( !v.hasOwnProperty( p ) ) {
				if ( create ) {
					v[ p ] = {};
				} else {
					break;
				}
			}
			if ( i === len-1 ) {
				if ( typeof val === 'function' ) {
					v[ p ] = val( v[ p ] );
				} else {
					v[ p ] = val;
				}
				bool = true;
			} else {
				v = v[ p ];
			}
		} else {
			break;
		}
	}
	return bool;
} // end FUNCTION deepSet()


// EXPORTS //

module.exports = deepSet;

},{}],127:[function(require,module,exports){
'use strict';

/**
* FUNCTION: defaults()
*	Returns default options.
*
* @returns {Object} default options
*/
function defaults() {
	return {
		'create': false,
		'sep': '.'
	};
} // end FUNCTION defaults()


// EXPORTS //

module.exports = defaults;

},{}],128:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dset = require( './deepset.js' );


// FACTORY //

/**
* FUNCTION: factory( path[, opts] )
*	Creates a reusable deep set factory.
*
* @param {String|Array} path - key path
* @param {Object} [opts] - function options
* @param {Boolean} [opts.create=false] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [opts.sep='.'] - key path separator
* @returns {Function} deep set factory
*/
function factory( path, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepSet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	/**
	* FUNCTION: deepSet( obj, value )
	*	Deep sets a nested property.
	*
	* @param {Object|Array} obj - input object
	* @param {*} value - value to set
	* @returns {Boolean} boolean indicating if the property was successfully set
	*/
	return function deepSet( obj, value ) {
		if ( typeof obj !== 'object' || obj === null ) {
			return false;
		}
		return dset( obj, props, opts.create, value );
	};
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./deepset.js":126,"./defaults.js":127,"./validate.js":130,"validate.io-array":131,"validate.io-string-primitive":146}],129:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dset = require( './deepset.js' );


// DEEP SET //

/**
* FUNCTION: deepSet( obj, path, value[, opts] )
*	Deep sets a nested property.
*
* @param {Object|Array} obj - input object
* @param {String|Array} path - key path
* @param {*} value - value to set
* @param {Object} [opts] - function options
* @param {Boolean} [opts.create=false] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [opts.sep='.'] - key path separator
* @returns {Boolean} boolean indicating if the property was successfully set
*/
function deepSet( obj, path, value, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( typeof obj !== 'object' || obj === null ) {
		return false;
	}
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepSet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 3 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	return dset( obj, props, opts.create, value );
} // end FUNCTION deepSet()


// EXPORTS //

module.exports = deepSet;
module.exports.factory = require( './factory.js' );

},{"./deepset.js":126,"./defaults.js":127,"./factory.js":128,"./validate.js":130,"validate.io-array":131,"validate.io-string-primitive":146}],130:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for function options
* @param {Object} options - function options
* @param {Boolean} [options.create] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [options.sep] - key path separator
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'deepSet()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'create' ) ) {
		opts.create = options.create;
		if ( !isBoolean( opts.create ) ) {
			return new TypeError( 'deepSet()::invalid option. Create option must be a boolean primitive. Option: `' + opts.create + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'deepSet()::invalid option. Key path separator must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-boolean-primitive":135,"validate.io-object":144,"validate.io-string-primitive":146}],131:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],132:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"compute-const-max-safe-integer":133,"dup":34,"validate.io-integer-primitive":134}],133:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],134:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":143}],135:[function(require,module,exports){
/**
*
*	VALIDATE: boolean-primitive
*
*
*	DESCRIPTION:
*		- Validates if a value is a boolean primitive.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

/**
* FUNCTION: isBoolean( value )
*	Validates if a value is a boolean primitive.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a boolean primitive
*/
function isBoolean( value ) {
	return value === true || value === false;
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{}],136:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],137:[function(require,module,exports){
'use strict';

/**
* FUNCTION: matrixLike( value )
*	Validates if a value is matrix-like.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is matrix-like
*/
function matrixLike( v ) {
	return v !== null &&
		typeof v === 'object' &&
		typeof v.data === 'object' &&
		typeof v.shape === 'object' &&
		typeof v.offset === 'number' &&
		typeof v.strides === 'object' &&
		typeof v.dtype === 'string' &&
		typeof v.length === 'number';
} // end FUNCTION matrixLike()


// EXPORTS //

module.exports = matrixLike;

},{}],138:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47,"validate.io-integer":139}],139:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":140}],140:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],141:[function(require,module,exports){
/**
*
*	VALIDATE: nonnegative
*
*
*	DESCRIPTION:
*		- Validates if a value is a nonnegative number.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isNumber = require( 'validate.io-number' );


// IS NONNEGATIVE //

/**
* FUNCTION: isNonNegative( value )
*	Validates if a value is a nonnegative number.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a nonnegative number
*/
function isNonNegative( value ) {
	return isNumber( value ) && value >= 0;
} // end FUNCTION isNonNegative()


// EXPORTS //

module.exports = isNonNegative;

},{"validate.io-number":142}],142:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],143:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],144:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );


// ISOBJECT //

/**
* FUNCTION: isObject( value )
*	Validates if a value is a object; e.g., {}.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is a object
*/
function isObject( value ) {
	return ( typeof value === 'object' && value !== null && !isArray( value ) );
} // end FUNCTION isObject()


// EXPORTS //

module.exports = isObject;

},{"validate.io-array":145}],145:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],146:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],147:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer-primitive' );


// CONSTANTS //

var MAX = require( 'compute-const-max-safe-integer' );


// IS TYPED-ARRAY-LIKE //

/**
* FUNCTION: isTypedArrayLike( value )
*	Validates if a value is typed-array-like.
*
* @param {*} value - value to validate
* @param {Boolean} boolean indicating if a value is typed-array-like
*/
function isTypedArrayLike( value ) {
	return value !== null &&
		typeof value === 'object' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX &&
		typeof value.BYTES_PER_ELEMENT === 'number' &&
		typeof value.byteOffset === 'number' &&
		typeof value.byteLength === 'number';
} // end FUNCTION isTypedArrayLike()


// EXPORTS //

module.exports = isTypedArrayLike;

},{"compute-const-max-safe-integer":148,"validate.io-integer-primitive":149}],148:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],149:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":143}],150:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, arr, mu, sigma, accessor )
*	Evaluates the probability density function (PDF) for a Normal distribution with mean  `mu` and standard deviation `sigma` using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} mu - mean 
* @param {Number} sigma - standard deviation
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function pdf( y, x, mu, sigma, clbk ) {
	var len = x.length,
		fcn,
		v, i;

	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = fcn( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"./partial.js":156}],151:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, arr, mu, sigma )
*	Evaluates the probability density function (PDF) for a Normal distribution with mean  `mu` and standard deviation `sigma` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} mu - mean 
* @param {Number} sigma - standard deviation
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function pdf( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			y[ i ] = fcn( x[ i ] );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"./partial.js":156}],152:[function(require,module,exports){
'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( arr, mu, sigma, path[, sep] )
*	Evaluates the probability density function (PDF) for a Normal distribution with mean  `mu` and standard deviation `sigma` for each array element and sets the input array.
*
* @param {Array} arr - input array
* @param {Number} mu - mean 
* @param {Number} sigma - standard deviation
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function pdf( x, mu, sigma, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		fcn,
		v, i;
	if ( arguments.length > 4 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		fcn = partial( mu, sigma );
		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[i], fcn( v ) );
			} else {
				dset( x[i], NaN );
			}
		}
	}
	return x;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"./partial.js":156,"utils-deep-get":207,"utils-deep-set":213}],153:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var pdf1 = require( './number.js' ),
	pdf2 = require( './array.js' ),
	pdf3 = require( './accessor.js' ),
	pdf4 = require( './deepset.js' ),
	pdf5 = require( './matrix.js' ),
	pdf6 = require( './typedarray.js' );


// PDF //

/**
* FUNCTION: pdf( x[, opts] )
*	Evaluates the probability density function (PDF) for a Normal distribution.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Number} [opts.mu=0] - mean 
* @param {Number} [opts.sigma=1] - standard deviation
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} evaluated PDF
*/
function pdf( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	opts.mu = typeof opts.mu !== 'undefined' ? opts.mu : 0;
	opts.sigma = typeof opts.sigma !== 'undefined' ? opts.sigma : 1;

	if ( isNumber( x ) ) {
		return pdf1( x, opts.mu, opts.sigma );
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'pdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		return pdf5( out, x, opts.mu, opts.sigma );
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'pdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( x.length );
		}
		return pdf6( out, x, opts.mu, opts.sigma );
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return pdf4( x, opts.mu, opts.sigma, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'pdf()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return pdf3( out, x, opts.mu, opts.sigma, opts.accessor );
		}
		return pdf2( out, x, opts.mu, opts.sigma );
	}
	return NaN;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"./accessor.js":150,"./array.js":151,"./deepset.js":152,"./matrix.js":154,"./number.js":155,"./typedarray.js":157,"./validate.js":158,"compute-array-constructors":160,"dstructs-matrix":169,"validate.io-array-like":216,"validate.io-matrix-like":221,"validate.io-number-primitive":227,"validate.io-typed-array-like":231}],154:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, matrix, mu, sigma )
*	Evaluates the probability density function (PDF) for a Normal distribution with mean  `mu` and standard deviation `sigma` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} mu - mean 
* @param {Number} sigma - standard deviation
* @returns {Matrix} output matrix
*/
function pdf( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'pdf()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"./partial.js":156}],155:[function(require,module,exports){
'use strict';

// FUNCTIONS //

var exp = Math.exp,
	pow = Math.pow,
	sqrt = Math.sqrt;


// VARIABLES //

var PI = Math.PI;


// PDF //

/**
* FUNCTION: pdf( x, mu, sigma )
*	Evaluates the probability density function (PDF) for a Normal distribution with mean  `mu` and standard deviation `sigma` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number} evaluated PDF
*/
function pdf( x, mu, sigma ) {
	if ( sigma === 0 ) {
		return x === mu ? Number.POSITIVE_INFINITY : 0;
	}
	var s2 = pow( sigma, 2 ),
		A = 1 / ( sqrt( 2 * s2 * PI ) ),
		B = -1 / ( 2 * s2 );
	return A * exp( B * pow( x - mu, 2 ) );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{}],156:[function(require,module,exports){
'use strict';

// FUNCTIONS //

var exp = Math.exp,
	pow = Math.pow,
	sqrt = Math.sqrt;


// VARIABLES //

var PI = Math.PI;


// PARTIAL //

/**
* FUNCTION: partial( mu, sigma )
*	Partially applies mean  `mu` and standard deviation `sigma` and returns a function for evaluating the probability density function (PDF) for a Normal distribution.
*
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Function} PDF
*/
function partial( mu, sigma ) {
	var s2 = pow( sigma, 2 ),
		A = 1 / ( sqrt( 2 * s2 * PI ) ),
		B = -1 / ( 2 * s2 );
	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability density function (PDF) for a Normal distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	if ( sigma === 0 ) {
		return function pdf( x ) {
			return x === mu ? Number.POSITIVE_INFINITY : 0;
		};
	}
	return function pdf( x ) {
		return A * exp( B * pow( x - mu, 2 ) );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;

},{}],157:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// PDF //

/**
* FUNCTION: pdf( out, arr, mu, sigma )
*	Evaluates the probability density function (PDF) for a Normal distribution with mean  `mu` and standard deviation `sigma` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number} mu - mean 
* @param {Number} sigma - standard deviation
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function pdf( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial ( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		y[ i ] = fcn( x[ i ] );
	}
	return y;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"./partial.js":156}],158:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNonNegative = require( 'validate.io-nonnegative' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.mu=0] - mean 
* @param {Number} [options.sigma=1] - standard deviation
* @param {Boolean} [options.copy] - boolean indicating if the function should return a new data structure
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {String} [options.sep] - deep get/set key path separator
* @param {String} [options.path] - deep get/set key path
* @param {String} [options.dtype] - output data type
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'pdf()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'mu' ) ) {
		opts.mu = options.mu;
		if ( !isNumber( opts.mu ) ) {
			return new TypeError( 'pdf()::invalid option. `mu` parameter must be a number primitive. Option: `' + opts.mu + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sigma' ) ) {
		opts.sigma = options.sigma;
		if ( !isNonNegative( opts.sigma ) ) {
			return new TypeError( 'pdf()::invalid option. `sigma` parameter must be a non-negative number. Option: `' + opts.sigma + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'pdf()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'pdf()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'path' ) ) {
		opts.path = options.path;
		if ( !isString( opts.path ) ) {
			return new TypeError( 'pdf()::invalid option. Key path option must be a string primitive. Option: `' + opts.path + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'pdf()::invalid option. Separator option must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'pdf()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-boolean-primitive":219,"validate.io-function":220,"validate.io-nonnegative":225,"validate.io-number-primitive":227,"validate.io-object":228,"validate.io-string-primitive":230}],159:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],160:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./ctors.js":159,"dup":75}],161:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],162:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"./get.js":165,"./iget.js":167,"./iset.js":170,"./mget.js":174,"./mset.js":176,"./set.js":184,"./sget.js":186,"./sset.js":188,"./toString.js":190,"dup":2}],163:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./get.raw.js":166,"./iget.raw.js":168,"./iset.raw.js":171,"./mget.raw.js":175,"./mset.raw.js":177,"./set.raw.js":185,"./sget.raw.js":187,"./sset.raw.js":189,"./toString.js":190,"dup":3}],164:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],165:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"validate.io-nonnegative-integer":222}],166:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],167:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7,"validate.io-integer-primitive":202}],168:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],169:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./matrix.js":172,"./matrix.raw.js":173,"dup":9}],170:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10,"validate.io-integer-primitive":202,"validate.io-number-primitive":227}],171:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],172:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./btypes.js":161,"./ctor.js":162,"./dtypes.js":164,"compute-cast-arrays":191,"compute-dtype":194,"dup":12,"validate.io-array":199,"validate.io-contains":200,"validate.io-nonnegative-integer-array":203,"validate.io-string-primitive":230}],173:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./btypes.js":161,"./ctor.raw.js":163,"./dtypes.js":164,"compute-dtype":194,"dup":13,"validate.io-contains":200,"validate.io-string-primitive":230}],174:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./btypes.js":161,"dup":14,"validate.io-nonnegative-integer-array":203}],175:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./btypes.js":161,"dup":15}],176:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./mset1.js":178,"./mset2.js":179,"./mset3.js":180,"./mset4.js":181,"./mset5.js":182,"./mset6.js":183,"dup":16,"validate.io-function":220,"validate.io-nonnegative-integer-array":203,"validate.io-number-primitive":227}],177:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./mset1.js":178,"./mset2.js":179,"./mset3.js":180,"./mset4.js":181,"./mset5.js":182,"./mset6.js":183,"dup":17}],178:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],179:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],180:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],181:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],182:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],183:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],184:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24,"validate.io-nonnegative-integer":222,"validate.io-number-primitive":227}],185:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],186:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./btypes.js":161,"compute-indexspace":198,"dup":26,"validate.io-string-primitive":230}],187:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./btypes.js":161,"compute-indexspace":198,"dup":27}],188:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"compute-indexspace":198,"dup":28,"validate.io-function":220,"validate.io-number-primitive":227,"validate.io-string-primitive":230}],189:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"compute-indexspace":198,"dup":29}],190:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],191:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"compute-array-constructors/lib/ctors":159,"compute-array-dtype/lib/dtypes":192,"dup":31,"type-name":193,"validate.io-array-like":216}],192:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],193:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],194:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"compute-array-dtype":196,"dup":36,"type-name":197}],195:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],196:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./dtypes.js":195,"dup":38}],197:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],198:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"dup":39,"validate.io-nonnegative-integer":222,"validate.io-string-primitive":230}],199:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],200:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42,"validate.io-array":199,"validate.io-nan-primitive":201}],201:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],202:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":227}],203:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46,"validate.io-array":199,"validate.io-nonnegative-integer":222}],204:[function(require,module,exports){
arguments[4][120][0].apply(exports,arguments)
},{"dup":120}],205:[function(require,module,exports){
arguments[4][121][0].apply(exports,arguments)
},{"dup":121}],206:[function(require,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"./deepget.js":204,"./defaults.js":205,"./validate.js":208,"dup":122,"validate.io-array":209,"validate.io-string-primitive":230}],207:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"./deepget.js":204,"./defaults.js":205,"./factory.js":206,"./validate.js":208,"dup":123,"validate.io-array":209,"validate.io-string-primitive":230}],208:[function(require,module,exports){
arguments[4][124][0].apply(exports,arguments)
},{"dup":124,"validate.io-object":228,"validate.io-string-primitive":230}],209:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],210:[function(require,module,exports){
arguments[4][126][0].apply(exports,arguments)
},{"dup":126}],211:[function(require,module,exports){
arguments[4][127][0].apply(exports,arguments)
},{"dup":127}],212:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"./deepset.js":210,"./defaults.js":211,"./validate.js":214,"dup":128,"validate.io-array":215,"validate.io-string-primitive":230}],213:[function(require,module,exports){
arguments[4][129][0].apply(exports,arguments)
},{"./deepset.js":210,"./defaults.js":211,"./factory.js":212,"./validate.js":214,"dup":129,"validate.io-array":215,"validate.io-string-primitive":230}],214:[function(require,module,exports){
arguments[4][130][0].apply(exports,arguments)
},{"dup":130,"validate.io-boolean-primitive":219,"validate.io-object":228,"validate.io-string-primitive":230}],215:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],216:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"compute-const-max-safe-integer":217,"dup":34,"validate.io-integer-primitive":218}],217:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],218:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":227}],219:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],220:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],221:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"dup":137}],222:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47,"validate.io-integer":223}],223:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":224}],224:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],225:[function(require,module,exports){
arguments[4][141][0].apply(exports,arguments)
},{"dup":141,"validate.io-number":226}],226:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],227:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],228:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"dup":144,"validate.io-array":229}],229:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],230:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],231:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"compute-const-max-safe-integer":232,"dup":147,"validate.io-integer-primitive":233}],232:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],233:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":227}],234:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// QUANTILE //

/**
* FUNCTION: quantile( out, arr, mu, sigma, accessor )
*	Evaluates the quantile function for a Normal distribution with mean `mu` and standard deviation `sigma` using an accessor function.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function quantile( y, x, mu, sigma, clbk ) {
	var len = x.length,
		fcn,
		v, i;

	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = fcn( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"./partial.js":240}],235:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// QUANTILE //

/**
* FUNCTION: quantile( out, arr, mu, sigma )
*	Evaluates the quantile function for a Normal distribution with mean `mu` and standard deviation `sigma` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function quantile( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			y[ i ] = fcn( x[ i ] );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"./partial.js":240}],236:[function(require,module,exports){
'use strict';

// MODULES //

var deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory,
	partial = require( './partial.js' );


// QUANTILE //

/**
* FUNCTION: quantile( arr, mu, sigma, path[, sep] )
*	Evaluates the quantile function for a Normal distribution with mean `mu` and standard deviation `sigma` for each array element and sets the input array.
*
* @param {Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function quantile( x, mu, sigma, path, sep ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		fcn,
		v, i;
	if ( arguments.length > 4 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		fcn = partial( mu, sigma );
		for ( i = 0; i < len; i++ ) {
			v = dget( x[ i ] );
			if ( typeof v === 'number' ) {
				dset( x[i], fcn( v ) );
			} else {
				dset( x[i], NaN );
			}
		}
	}
	return x;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"./partial.js":240,"utils-deep-get":296,"utils-deep-set":302}],237:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var quantile1 = require( './number.js' ),
	quantile2 = require( './array.js' ),
	quantile3 = require( './accessor.js' ),
	quantile4 = require( './deepset.js' ),
	quantile5 = require( './matrix.js' ),
	quantile6 = require( './typedarray.js' );


// PDF //

/**
* FUNCTION: quantile( p[, opts] )
*	Evaluates the quantile function for a Normal distribution.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} p - input value
* @param {Object} [opts] - function options
* @param {Number} [opts.mu=0] - mean
* @param {Number} [opts.sigma=1] - standard deviation
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} quantile function value(s)
*/
function quantile( p, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	opts.mu = typeof opts.mu !== 'undefined' ? opts.mu : 0;
	opts.sigma = typeof opts.sigma !== 'undefined' ? opts.sigma : 1;

	if ( isNumber( p ) ) {
		return quantile1( p, opts.mu, opts.sigma );
	}
	if ( isMatrixLike( p ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'quantile()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( p.length );
			out = matrix( d, p.shape, dt );
		} else {
			out = p;
		}
		return quantile5( out, p, opts.mu, opts.sigma );
	}
	if ( isTypedArrayLike( p ) ) {
		if ( opts.copy === false ) {
			out = p;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'quantile()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( p.length );
		}
		return quantile6( out, p, opts.mu, opts.sigma );
	}
	if ( isArrayLike( p ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return quantile4( p, opts.mu, opts.sigma, opts.path, opts.sep );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = p;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'quantile()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + opts.dtype + '`.' );
			}
			out = new ctor( p.length );
		}
		else {
			out = new Array( p.length );
		}
		if ( opts.accessor ) {
			return quantile3( out, p, opts.mu, opts.sigma, opts.accessor );
		}
		return quantile2( out, p, opts.mu, opts.sigma );
	}
	return NaN;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"./accessor.js":234,"./array.js":235,"./deepset.js":236,"./matrix.js":238,"./number.js":239,"./typedarray.js":241,"./validate.js":242,"compute-array-constructors":244,"dstructs-matrix":258,"validate.io-array-like":305,"validate.io-matrix-like":310,"validate.io-number-primitive":316,"validate.io-typed-array-like":320}],238:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// QUANTILE //

/**
* FUNCTION: quantile( out, matrix, mu, sigma )
*	Evaluates the quantile function for a Normal distribution with mean `mu` and standard deviation `sigma` for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} arr - input matrix
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Matrix} output matrix
*/
function quantile( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;
	if ( y.length !== len ) {
		throw new Error( 'quantile()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	fcn = partial( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = fcn( x.data[ i ] );
	}
	return y;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"./partial.js":240}],239:[function(require,module,exports){
'use strict';

// MODULES //

var erfinv = require( 'compute-erfinv/lib/number.js' );


// FUNCTIONS //

var sqrt = Math.sqrt;


// QUANTILE //

/**
* FUNCTION: quantile( p, mu, sigma )
*	Evaluates the quantile function for a Normal distribution with mean `mu` and standard deviation `sigma` at a probability `p`.
*
* @param {Number} p - input value
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number} evaluated quantile function
*/
function quantile( p, mu, sigma ) {
	if ( p !== p || p < 0 || p > 1 ) {
		return NaN;
	}
	if ( sigma === 0 ) {
		return mu;
	}

	var A = mu,
		B = sigma * sqrt( 2 );

	return A + B * erfinv( 2 * p - 1 );
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"compute-erfinv/lib/number.js":245}],240:[function(require,module,exports){
'use strict';

// MODULES //

var erfinv = require( 'compute-erfinv/lib/number.js' );


// FUNCTIONS //

var sqrt = Math.sqrt;


// PARTIAL //

/**
* FUNCTION: partial( mu, sigma )
*	Partially applies mean `mu` and standard deviation `sigma` and returns a function for evaluating the quantile function for a Normal distribution.
*
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Function} quantile function
*/
function partial( mu, sigma ) {
	var A = mu,
		B = sigma * sqrt( 2 );
	/**
	* FUNCTION: quantile( p )
	*	Evaluates the quantile function for a Normal distribution.
	*
	* @private
	* @param {Number} p - input value
	* @returns {Number} evaluated quantile function
	*/
	if ( sigma === 0 ) {
		return function quantile( p ) {
			if ( p !== p || p < 0 || p > 1 ) {
				return NaN;
			}
			return mu;
		};
	}
	return function quantile( p ) {
		if ( p !== p || p < 0 || p > 1 ) {
			return NaN;
		}
		return A + B * erfinv( 2 * p - 1 );
	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;

},{"compute-erfinv/lib/number.js":245}],241:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// QUANTILE //

/**
* FUNCTION: quantile( out, arr, mu, sigma )
*	Evaluates the quantile function for a Normal distribution with mean `mu` and standard deviation `sigma` for each array element.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number} mu - mean
* @param {Number} sigma - standard deviation
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function quantile( y, x, mu, sigma ) {
	var len = x.length,
		fcn,
		i;

	fcn = partial ( mu, sigma );
	for ( i = 0; i < len; i++ ) {
		y[ i ] = fcn( x[ i ] );
	}
	return y;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"./partial.js":240}],242:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isNonNegative = require( 'validate.io-nonnegative' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.mu=0] - mean
* @param {Number} [options.sigma=1] - standard deviation
* @param {Boolean} [options.copy] - boolean indicating if the function should return a new data structure
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {String} [options.sep] - deep get/set key path separator
* @param {String} [options.path] - deep get/set key path
* @param {String} [options.dtype] - output data type
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'quantile()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'mu' ) ) {
		opts.mu = options.mu;
		if ( !isNumber( opts.mu ) ) {
			return new TypeError( 'quantile()::invalid option. `mu` parameter must be a number primitive. Option: `' + opts.mu + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sigma' ) ) {
		opts.sigma = options.sigma;
		if ( !isNonNegative( opts.sigma ) ) {
			return new TypeError( 'quantile()::invalid option. `sigma` parameter must be a non-negative number. Option: `' + opts.sigma + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'quantile()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'quantile()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'path' ) ) {
		opts.path = options.path;
		if ( !isString( opts.path ) ) {
			return new TypeError( 'quantile()::invalid option. Key path option must be a string primitive. Option: `' + opts.path + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'quantile()::invalid option. Separator option must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'quantile()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-boolean-primitive":308,"validate.io-function":309,"validate.io-nonnegative":314,"validate.io-number-primitive":316,"validate.io-object":317,"validate.io-string-primitive":319}],243:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],244:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./ctors.js":243,"dup":75}],245:[function(require,module,exports){
'use strict';

/**
* erfinv( x )
*
* Method:
*	1. For `|x| <= 0.5`, evaluate inverse erf using the rational approximation:
*
*		`erfinv = x(x+10)(Y+R(x))`
*
*	where `Y` is a constant and `R(x)` is optimized for a low absolute error compared to `|Y|`. Max error `~2e-18`.
*
*	2. For `0.5 > 1-|x| >= 0`, evaluate inverse erf using the rational approximation:
*
*		`erfinv = sqrt(-2*log(1-x)) / (Y + R(1-x))`
*
*	where `Y `is a constant, and R(q) is optimised for a low absolute error compared to `Y`. Max error `~7e-17`.
*
*	3. For `1-|x| < 0.25`, we have a series of rational approximations all of the general form:
*
*		`p = sqrt(-log(1-x))`
*
*	Then the result is given by:
*
*		`erfinv = p(Y+R(p-B))`
*
*	where `Y` is a constant, `B` is the lowest value of `p` for which the approximation is valid, and `R(x-B)` is optimized for a low absolute error compared to `Y`.
*
*	Note that almost all code will really go through the first or maybe second approximation.  After that we are dealing with very small input values.
*
*	If `p < 3`, max error `~1e-20`.
*	If `p < 6`, max error `~8e-21`.
*	If `p < 18`, max error `~1e-19`.
*	If `p < 44`, max error `~6e-20`.
*	If `p >= 44`, max error `~1e-20`.
*/

// MODULES //

var polyval = require( 'compute-polynomial' ),
	reverse = require( 'compute-reverse' );


// CONSTANTS //

var // Coefficients for erfinv on [0, 0.5]:
	Y1 = 8.91314744949340820313e-2,
	P1 = [
		-5.08781949658280665617e-4,
		-8.36874819741736770379e-3,
		3.34806625409744615033e-2,
		-1.26926147662974029034e-2,
		-3.65637971411762664006e-2,
		2.19878681111168899165e-2,
		8.22687874676915743155e-3,
		-5.38772965071242932965e-3
	],
	Q1 = [
		1,
		-9.70005043303290640362e-1,
		-1.56574558234175846809,
		1.56221558398423026363,
		6.62328840472002992063e-1,
		-7.1228902341542847553e-1,
		-5.27396382340099713954e-2,
		7.95283687341571680018e-2,
		-2.33393759374190016776e-3,
		8.86216390456424707504e-4
	],

	// Coefficients for erfinv for 0.5 > 1-x >= 0:
	Y2 = 2.249481201171875,
	P2 = [
		-2.02433508355938759655e-1,
		1.05264680699391713268e-1,
		8.37050328343119927838,
		1.76447298408374015486e1,
		-1.88510648058714251895e1,
		-4.46382324441786960818e1,
		1.7445385985570866523e1,
		2.11294655448340526258e1,
		-3.67192254707729348546
	],
	Q2 = [
		1,
		6.24264124854247537712,
		3.9713437953343869095,
		-2.86608180499800029974e1,
		-2.01432634680485188801e1,
		4.85609213108739935468e1,
		1.08268667355460159008e1,
		2.26436933413139721736e1,
		1.72114765761200282724
	],

	// Coefficients for erfinv for sqrt( -log(1-x) ):
	Y3 = 8.07220458984375e-1,
	P3 = [
		-1.31102781679951906451e-1,
		-1.63794047193317060787e-1,
		1.17030156341995252019e-1,
		3.87079738972604337464e-1,
		3.37785538912035898924e-1,
		1.42869534408157156766e-1,
		2.90157910005329060432e-2,
		2.14558995388805277169e-3,
		-6.79465575181126350155e-7,
		2.85225331782217055858e-8,
		-6.81149956853776992068e-10
	],
	Q3 = [
		1,
		3.46625407242567245975,
		5.38168345707006855425,
		4.77846592945843778382,
		2.59301921623620271374,
		8.48854343457902036425e-1,
		1.52264338295331783612e-1,
		1.105924229346489121e-2
	],

	Y4 = 9.3995571136474609375e-1,
	P4 = [
		-3.50353787183177984712e-2,
		-2.22426529213447927281e-3,
		1.85573306514231072324e-2,
		9.50804701325919603619e-3,
		1.87123492819559223345e-3,
		1.57544617424960554631e-4,
		4.60469890584317994083e-6,
		-2.30404776911882601748e-10,
		2.66339227425782031962e-12
	],
	Q4 = [
		1,
		1.3653349817554063097,
		7.62059164553623404043e-1,
		2.20091105764131249824e-1,
		3.41589143670947727934e-2,
		2.63861676657015992959e-3,
		7.64675292302794483503e-5
	],

	Y5 = 9.8362827301025390625e-1,
	P5 = [
		-1.67431005076633737133e-2,
		-1.12951438745580278863e-3,
        1.05628862152492910091e-3,
        2.09386317487588078668e-4,
        1.49624783758342370182e-5,
        4.49696789927706453732e-7,
        4.62596163522878599135e-9,
        -2.81128735628831791805e-14,
        9.9055709973310326855e-17
	],
	Q5 = [
		1,
		5.91429344886417493481e-1,
        1.38151865749083321638e-1,
        1.60746087093676504695e-2,
        9.64011807005165528527e-4,
        2.75335474764726041141e-5,
        2.82243172016108031869e-7
	];

reverse( P1 );
reverse( Q1 );
reverse( P2 );
reverse( Q2 );
reverse( P3 );
reverse( Q3 );
reverse( P4 );
reverse( Q4 );
reverse( P5 );
reverse( Q5 );


// FUNCTIONS //

/**
* FUNCTION: calc( x, v, P, Q, Y, sign )
*	Calculates a rational approximation.
*
* @private
* @param {Number} x
* @param {Number} v
* @param {Array} P - array of polynomial coefficients
* @param {Array} Q - array of polynomial coefficients
* @param {Number} Y
* @param {Boolean} sign - indicates if positive or negative
* @returns {Number} rational approximation
*/
function calc( x, v, P, Q, Y, sign ) {
	var val, s, r;
	s = x - v;
	r = polyval( P, s ) / polyval( Q, s );
	val = Y*x + r*x;
	return ( sign ) ? -val : val;
} // end FUNCTION calc()


// ERFINV //

/**
* FUNCTION: erfinv( x )
*	Evaluates the inverse error function for an input value.
*
* @private
* @param {Number} x - input value
* @returns {Number} evaluated inverse error function
*/
function erfinv( x ) {
	var sign = false,
		val,
		q, g, r;

	// [1] Special cases...

	// NaN:
	if ( x !== x ) {
		return NaN;
	}
	// x not on the interval: [-1,1]
	if ( x < -1 || x > 1 ) {
		throw new RangeError( 'erfinv()::invalid input argument. Value must be on the interval [-1,1]. Value: `' + x + '`.' );
	}
	if ( x === 1 ) {
		return Number.POSITIVE_INFINITY;
	}
	if ( x === -1 ) {
		return Number.NEGATIVE_INFINITY;
	}
	if ( x === 0 ) {
		return 0;
	}
	// [2] Get the sign and make use of `erf` reflection formula: `erf(-z) = -erf(z)`...
	if ( x < 0 ) {
		x = -x;
		sign = true;
	}
	q = 1 - x;

	// [3] |x| <= 0.5
	if ( x <= 0.5 ) {
		g = x * (x+10);
		r = polyval( P1, x ) / polyval( Q1, x );
		val = g*Y1 + g*r;
		return ( sign ) ? -val : val;
	}
	// [4] 1-|x| >= 0.25
	if ( q >= 0.25 ) {
		g = Math.sqrt( -2 * Math.log( q ) );
		q = q - 0.25;
		r = polyval( P2, q ) / polyval( Q2, q );
		val = g / (Y2+r);
		return ( sign ) ? -val : val;
	}
	q = Math.sqrt( -Math.log( q ) );

	// [5] q < 3
	if ( q < 3 ) {
		return calc( q, 1.125, P3, Q3, Y3, sign );
	}
	// [6] q < 6
	if ( q < 6 ) {
		return calc( q, 3, P4, Q4, Y4, sign );
	}
	// Note that the smallest number in JavaScript is 5e-324. Math.sqrt( -Math.log( 5e-324 ) ) ~27.2844
	return calc( q, 6, P5, Q5, Y5, sign );

	// Note that, in the boost library, they are able to go to much smaller values, as 128 bit long doubles support ~1e-5000; something which JavaScript does not natively support.
} // end FUNCTION erfinv()


// EXPORTS //

module.exports = erfinv;

},{"compute-polynomial":246,"compute-reverse":248}],246:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArray = require( 'validate.io-array' ),
	isNumberArray = require( 'validate.io-number-primitive-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// POLYVAL //

/**
* FUNCTION: polyval( coef, x )
*	Evaluates a polynomial.
*
* @private
* @param {Number[]} coef - array of coefficients sorted in descending degree
* @param {Number} x - value at which to evaluate the polynomial
* @return {Number} evaluated polynomial
*/
function polyval( c, x ) {
	var len = c.length,
		p = 0,
		i = 0;
	for ( ; i < len; i++ ) {
		p = p*x + c[ i ];
	}
	return p;
} // end FUNCTION polyval()


// EVALUATE //

/**
* FUNCTION: evaluate( coef, x[, options] )
*	Evaluates a polynomial.
*
* @param {Number[]} coef - array of coefficients sorted in descending degree
* @param {Array|Number[]|Number} x - value(s) at which to evaluate the polynomial
* @param {Object} [options] - function options
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array
* @param {Function} [options.accessor] - accessor function for accessing array values
* @returns {Number|Number[]} evaluated polynomial
*/
function evaluate( c, x, opts ) {
	var copy = true,
		clbk,
		len,
		arr,
		v, i;
	if ( !isNumberArray( c ) ) {
		throw new TypeError( 'polynomial()::invalid input argument. Coefficients must be provided as an array of number primitives. Value: `' + c + '`.' );
	}
	if ( isNumber( x ) ) {
		return polyval( c, x );
	}
	if ( !isArray( x ) ) {
		throw new TypeError( 'polynomial()::invalid input argument. Second argument must be either a single number primitive or an array of values. Value: `' + x + '`.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'polynomial()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'polynomial()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'polynomial()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}
	}
	len = x.length;
	if ( copy ) {
		arr = new Array( len );
	} else {
		arr = x;
	}
	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			v = clbk( x[ i ], i );
			if ( !isNumber( v ) ) {
				throw new TypeError( 'polynomial()::invalid input argument. Accessed array values must be number primitives. Value: `' + v + '`.' );
			}
			arr[ i ] = polyval( c, v );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			v = x[ i ];
			if ( !isNumber( v ) ) {
				throw new TypeError( 'polynomial()::invalid input argument. Array values must be number primitives. Value: `' + v + '`.' );
			}
			arr[ i ] = polyval( c, v );
		}
	}
	return arr;
} // end FUNCTION evaluate()


// EXPORTS //

module.exports = evaluate;

},{"validate.io-array":249,"validate.io-boolean-primitive":308,"validate.io-function":309,"validate.io-number-primitive":316,"validate.io-number-primitive-array":247,"validate.io-object":317}],247:[function(require,module,exports){
/**
*
*	VALIDATE: number-primitive-array
*
*
*	DESCRIPTION:
*		- Validates if a value is an array of primitive numbers.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );


// IS NUMBER ARRAY //

/**
* FUNCTION: isNumberArray( value )
*	Validates if a value is an array of number primitives, excluding NaN.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is an array of number primitives
*/
function isNumberArray( value ) {
	var len, v;
	if ( !isArray( value ) ) {
		return false;
	}
	len = value.length;
	if ( !len ) {
		return false;
	}
	for ( var i = 0; i < len; i++ ) {
		v = value[ i ];
		if ( typeof v !== 'number' || v !== v ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isNumberArray()


// EXPORTS //

module.exports = isNumberArray;

},{"validate.io-array":249}],248:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' );


// REVERSE //

/**
* FUNCTION: reverse( arr[, options] )
*	Reverses an `array`.
*
* @param {Array} arr - input array
* @param {Object} [options] - function options
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array
* @returns {Array} reversed array
*/
function reverse( arr, opts ) {
	var copy,
		half,
		len,
		tmp,
		out,
		N,
		i, j;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'reverse()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'reverse()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'reverse()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
			}
		}
	}
	len = arr.length;
	N = len - 1;
	if ( copy ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = arr[ N-i ];
		}
		return out;
	}
	half = Math.floor( len / 2 );
	for ( i = 0; i < half; i++ ) {
		tmp = arr[ i ];
		j = N - i;
		arr[ i ] = arr[ j ];
		arr[ j ] = tmp;
	}
	return arr;
} // end FUNCTION reverse()


// EXPORTS //

module.exports = reverse;

},{"validate.io-array":249,"validate.io-boolean-primitive":308,"validate.io-object":317}],249:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],250:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],251:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"./get.js":254,"./iget.js":256,"./iset.js":259,"./mget.js":263,"./mset.js":265,"./set.js":273,"./sget.js":275,"./sset.js":277,"./toString.js":279,"dup":2}],252:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./get.raw.js":255,"./iget.raw.js":257,"./iset.raw.js":260,"./mget.raw.js":264,"./mset.raw.js":266,"./set.raw.js":274,"./sget.raw.js":276,"./sset.raw.js":278,"./toString.js":279,"dup":3}],253:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],254:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"validate.io-nonnegative-integer":311}],255:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],256:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7,"validate.io-integer-primitive":291}],257:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],258:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./matrix.js":261,"./matrix.raw.js":262,"dup":9}],259:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10,"validate.io-integer-primitive":291,"validate.io-number-primitive":316}],260:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],261:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./btypes.js":250,"./ctor.js":251,"./dtypes.js":253,"compute-cast-arrays":280,"compute-dtype":283,"dup":12,"validate.io-array":288,"validate.io-contains":289,"validate.io-nonnegative-integer-array":292,"validate.io-string-primitive":319}],262:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./btypes.js":250,"./ctor.raw.js":252,"./dtypes.js":253,"compute-dtype":283,"dup":13,"validate.io-contains":289,"validate.io-string-primitive":319}],263:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./btypes.js":250,"dup":14,"validate.io-nonnegative-integer-array":292}],264:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./btypes.js":250,"dup":15}],265:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./mset1.js":267,"./mset2.js":268,"./mset3.js":269,"./mset4.js":270,"./mset5.js":271,"./mset6.js":272,"dup":16,"validate.io-function":309,"validate.io-nonnegative-integer-array":292,"validate.io-number-primitive":316}],266:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./mset1.js":267,"./mset2.js":268,"./mset3.js":269,"./mset4.js":270,"./mset5.js":271,"./mset6.js":272,"dup":17}],267:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],268:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],269:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],270:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],271:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],272:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],273:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24,"validate.io-nonnegative-integer":311,"validate.io-number-primitive":316}],274:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],275:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./btypes.js":250,"compute-indexspace":287,"dup":26,"validate.io-string-primitive":319}],276:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./btypes.js":250,"compute-indexspace":287,"dup":27}],277:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"compute-indexspace":287,"dup":28,"validate.io-function":309,"validate.io-number-primitive":316,"validate.io-string-primitive":319}],278:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"compute-indexspace":287,"dup":29}],279:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],280:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"compute-array-constructors/lib/ctors":243,"compute-array-dtype/lib/dtypes":281,"dup":31,"type-name":282,"validate.io-array-like":305}],281:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],282:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],283:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"compute-array-dtype":285,"dup":36,"type-name":286}],284:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],285:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./dtypes.js":284,"dup":38}],286:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],287:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"dup":39,"validate.io-nonnegative-integer":311,"validate.io-string-primitive":319}],288:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],289:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42,"validate.io-array":288,"validate.io-nan-primitive":290}],290:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],291:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":316}],292:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46,"validate.io-array":288,"validate.io-nonnegative-integer":311}],293:[function(require,module,exports){
arguments[4][120][0].apply(exports,arguments)
},{"dup":120}],294:[function(require,module,exports){
arguments[4][121][0].apply(exports,arguments)
},{"dup":121}],295:[function(require,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"./deepget.js":293,"./defaults.js":294,"./validate.js":297,"dup":122,"validate.io-array":298,"validate.io-string-primitive":319}],296:[function(require,module,exports){
arguments[4][123][0].apply(exports,arguments)
},{"./deepget.js":293,"./defaults.js":294,"./factory.js":295,"./validate.js":297,"dup":123,"validate.io-array":298,"validate.io-string-primitive":319}],297:[function(require,module,exports){
arguments[4][124][0].apply(exports,arguments)
},{"dup":124,"validate.io-object":317,"validate.io-string-primitive":319}],298:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],299:[function(require,module,exports){
arguments[4][126][0].apply(exports,arguments)
},{"dup":126}],300:[function(require,module,exports){
arguments[4][127][0].apply(exports,arguments)
},{"dup":127}],301:[function(require,module,exports){
arguments[4][128][0].apply(exports,arguments)
},{"./deepset.js":299,"./defaults.js":300,"./validate.js":303,"dup":128,"validate.io-array":304,"validate.io-string-primitive":319}],302:[function(require,module,exports){
arguments[4][129][0].apply(exports,arguments)
},{"./deepset.js":299,"./defaults.js":300,"./factory.js":301,"./validate.js":303,"dup":129,"validate.io-array":304,"validate.io-string-primitive":319}],303:[function(require,module,exports){
arguments[4][130][0].apply(exports,arguments)
},{"dup":130,"validate.io-boolean-primitive":308,"validate.io-object":317,"validate.io-string-primitive":319}],304:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],305:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"compute-const-max-safe-integer":306,"dup":34,"validate.io-integer-primitive":307}],306:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],307:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":316}],308:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],309:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],310:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"dup":137}],311:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47,"validate.io-integer":312}],312:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":313}],313:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],314:[function(require,module,exports){
arguments[4][141][0].apply(exports,arguments)
},{"dup":141,"validate.io-number":315}],315:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],316:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],317:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"dup":144,"validate.io-array":318}],318:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],319:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],320:[function(require,module,exports){
arguments[4][147][0].apply(exports,arguments)
},{"compute-const-max-safe-integer":321,"dup":147,"validate.io-integer-primitive":322}],321:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],322:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":316}],323:[function(require,module,exports){
(function (global){
global.rNorm = require( 'distributions-normal-random' );
global.pdfNorm = require( 'distributions-normal-pdf' );
global.qNorm = require( 'distributions-normal-quantile' );
global.cdfNorm = require( 'distributions-normal-cdf' );
global.mean = require( 'compute-mean' );
global.matrix = require( 'dstructs-matrix' );
global.linspace = require( 'compute-linspace' );
global.incrspace = require( 'compute-incrspace' );
global.logspace = require( 'compute-logspace' );
global.indexspace = require( 'compute-indexspace' );

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"compute-incrspace":52,"compute-indexspace":54,"compute-linspace":59,"compute-logspace":62,"compute-mean":326,"distributions-normal-cdf":68,"distributions-normal-pdf":153,"distributions-normal-quantile":237,"distributions-normal-random":387,"dstructs-matrix":9}],324:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mean( arr, clbk )
*	Computes the arithmetic mean of an array using an accessor function.
*
* @param {Array} arr - input array
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} arithmetic mean or null
*/
function mean( arr, clbk ) {
	var len = arr.length,
		delta,
		mu,
		i;

	if ( !len ) {
		return null;
	}
	mu = 0;
	for ( i = 0; i < len; i++ ) {
		delta = clbk( arr[ i ], i ) - mu;
		mu += delta / (i+1);
	}
	return mu;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;

},{}],325:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mean( arr )
*	Computes the arithmetic mean of a numeric array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number|Null} arithmetic mean or null
*/
function mean( arr ) {
	var len = arr.length,
		delta,
		mu,
		i;

	if ( !len ) {
		return null;
	}
	mu = 0;
	for ( i = 0; i < len; i++ ) {
		delta = arr[ i ] - mu;
		mu += delta / (i+1);
	}
	return mu;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;

},{}],326:[function(require,module,exports){
'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ).raw,
	validate = require( './validate.js' );


// FUNCTIONS //

var mean1 = require( './array.js' ),
	mean2 = require( './accessor.js' ),
	mean3 = require( './matrix.js' );


// MEAN //

/**
* FUNCTION: mean( x[, opts] )
*	Computes the arithmetic mean.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {Number} [opts.dim=2] - dimension along which to compute the arithmetic mean.
* @param {String} [opts.dtype="float64"] - output data type
* @returns {Number|Matrix|Null} mean value(s) or null
*/
function mean( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		shape,
		ctor,
		err,
		len,
		dim,
		dt,
		d,
		m;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		dt = opts.dtype || 'float64';
		dim = opts.dim;

		// Determine if provided a vector...
		if ( x.shape[ 0 ] === 1 || x.shape[ 1 ] === 1 ) {
			// Treat as an array-like object:
			return mean1( x.data );
		}
		if ( dim > 2 ) {
			throw new RangeError( 'mean()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}
		if ( dim === void 0 || dim === 2 ) {
			len = x.shape[ 0 ];
			shape = [ len, 1 ];
		} else {
			len = x.shape[ 1 ];
			shape = [ 1, len ];
		}
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'mean()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix and calculate the means:
		d = new ctor( len );
		m = matrix( d, shape, dt );
		return mean3( m, x, dim );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.accessor ) {
			return mean2( x, opts.accessor );
		}
		return mean1( x );
	}
	throw new TypeError( 'mean()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;

},{"./accessor.js":324,"./array.js":325,"./matrix.js":327,"./validate.js":328,"compute-array-constructors":330,"dstructs-matrix":339,"validate.io-array-like":457,"validate.io-matrix-like":461}],327:[function(require,module,exports){
'use strict';

/**
* FUNCTION: mean( out, mat[, dim] )
*	Computes the arithmetic mean along a matrix dimension.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Number} [dim=2] - matrix dimension along which to compute an arithmetic mean. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} arithmetic means or null
*/
function mean( out, mat, dim ) {
	var delta,
		mu,
		M, N,
		s0, s1,
		o,
		i, j, k;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {
		k = o + i*s0;
		mu = 0;
		for ( j = 0; j < N; j++ ) {
			delta = mat.data[ k + j*s1 ] - mu;
			mu += delta / (j+1);
		}
		out.data[ i ] = mu;
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;

},{}],328:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Number} [options.dim] - dimension
* @param {String} [options.dtype] - output data type
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'mean()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'mean()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dim' ) ) {
		opts.dim = options.dim;
		if ( !isPositiveInteger( opts.dim ) ) {
			return new TypeError( 'mean()::invalid option. Dimension option must be a positive integer. Option: `' + opts.dim + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'mean()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-function":377,"validate.io-object":378,"validate.io-positive-integer":380,"validate.io-string-primitive":383}],329:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],330:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./ctors.js":329,"dup":75}],331:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],332:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"./get.js":335,"./iget.js":337,"./iset.js":340,"./mget.js":344,"./mset.js":346,"./set.js":354,"./sget.js":356,"./sset.js":358,"./toString.js":360,"dup":2}],333:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./get.raw.js":336,"./iget.raw.js":338,"./iset.raw.js":341,"./mget.raw.js":345,"./mset.raw.js":347,"./set.raw.js":355,"./sget.raw.js":357,"./sset.raw.js":359,"./toString.js":360,"dup":3}],334:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],335:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"validate.io-nonnegative-integer":374}],336:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],337:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7,"validate.io-integer-primitive":372}],338:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],339:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./matrix.js":342,"./matrix.raw.js":343,"dup":9}],340:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10,"validate.io-integer-primitive":372,"validate.io-number-primitive":462}],341:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],342:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./btypes.js":331,"./ctor.js":332,"./dtypes.js":334,"compute-cast-arrays":361,"compute-dtype":364,"dup":12,"validate.io-array":369,"validate.io-contains":370,"validate.io-nonnegative-integer-array":373,"validate.io-string-primitive":383}],343:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./btypes.js":331,"./ctor.raw.js":333,"./dtypes.js":334,"compute-dtype":364,"dup":13,"validate.io-contains":370,"validate.io-string-primitive":383}],344:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./btypes.js":331,"dup":14,"validate.io-nonnegative-integer-array":373}],345:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./btypes.js":331,"dup":15}],346:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./mset1.js":348,"./mset2.js":349,"./mset3.js":350,"./mset4.js":351,"./mset5.js":352,"./mset6.js":353,"dup":16,"validate.io-function":377,"validate.io-nonnegative-integer-array":373,"validate.io-number-primitive":462}],347:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./mset1.js":348,"./mset2.js":349,"./mset3.js":350,"./mset4.js":351,"./mset5.js":352,"./mset6.js":353,"dup":17}],348:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],349:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],350:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],351:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],352:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],353:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],354:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24,"validate.io-nonnegative-integer":374,"validate.io-number-primitive":462}],355:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],356:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./btypes.js":331,"compute-indexspace":368,"dup":26,"validate.io-string-primitive":383}],357:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./btypes.js":331,"compute-indexspace":368,"dup":27}],358:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"compute-indexspace":368,"dup":28,"validate.io-function":377,"validate.io-number-primitive":462,"validate.io-string-primitive":383}],359:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"compute-indexspace":368,"dup":29}],360:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],361:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"compute-array-constructors/lib/ctors":329,"compute-array-dtype/lib/dtypes":362,"dup":31,"type-name":363,"validate.io-array-like":457}],362:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],363:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],364:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"compute-array-dtype":366,"dup":36,"type-name":367}],365:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],366:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./dtypes.js":365,"dup":38}],367:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],368:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"dup":39,"validate.io-nonnegative-integer":374,"validate.io-string-primitive":383}],369:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],370:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42,"validate.io-array":369,"validate.io-nan-primitive":371}],371:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],372:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":462}],373:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46,"validate.io-array":369,"validate.io-nonnegative-integer":374}],374:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47,"validate.io-integer":375}],375:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":376}],376:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],377:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],378:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"dup":144,"validate.io-array":379}],379:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],380:[function(require,module,exports){
/**
*
*	VALIDATE: positive-integer
*
*
*	DESCRIPTION:
*		- Validates if a value is a positive integer.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// IS POSITIVE INTEGER //

/**
* FUNCTION: isPositiveInteger( value )
*	Validates if a value is a positive integer.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a positive integer
*/
function isPositiveInteger( value ) {
	return isInteger( value ) && value > 0;
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"validate.io-integer":381}],381:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":382}],382:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],383:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],384:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len, mu, sigma[, rand] )
*	Creates an array of normally distributed random numbers.
*
* @param {Number} len - array length
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number[]} array filled with normal random numbers
*/
function random( len, mu, sigma, rand ) {
	var out,
		draw,
		i;

	draw = partial( mu, sigma, rand );
	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = draw();
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( draw() );
		}
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;

},{"./partial.js":390}],385:[function(require,module,exports){
'use strict';

// MODULES //

var partial = require( './partial.js' ),
	recurse = require( './recurse.js' );


// RANDOM //

/**
* FUNCTION: random( dims, mu, sigma[, rand] )
*	Creates a multidimensional array of normally distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Array} multidimensional array filled with normal random numbers
*/
function random( dims, mu, sigma, rand ) {
	var draw = partial( mu, sigma, rand );
	return recurse( dims, 0, draw );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;

},{"./partial.js":390,"./recurse.js":391}],386:[function(require,module,exports){
'use strict';

// FUNCTIONS //

var ln = Math.log;


// NORMAL TAIL //

/**
* FUNCTION dRanNormalTail( dMin, iNegative, rand )
*	Transform the tail of the normal distribution to
*	the unit interval and then use rejection technique
*	to generate standar normal variable.
*	Reference:
*		Marsaclia, G. (1964). Generating a Variable from the Tail
*		of the Normal Distribution. Technometrics, 6(1),
*		101–102. doi:10.1080/00401706.1964.10490150
*
* @param {Number} dMin - start value of the right tail
* @param {Boolean} iNegative - boolean indicating which side to evaluate
* @returns {Number} standard normal variable
*/
function dRanNormalTail( dMin, iNegative, rand ) {
	var x, y;
	do {
		x = ln( rand() ) / dMin;
		y = ln( rand() );
	} while ( -2 * y < x * x );
	return iNegative ? x - dMin : dMin - x;
} // end FUNCTION dRanNormalTail()


// EXPORTS //

module.exports = dRanNormalTail;

},{}],387:[function(require,module,exports){
'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	lcg = require( 'compute-lcg' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var array = require( './array.js' ),
	typedarray = require( './typedarray.js' ),
	arrayarray = require( './arrayarray.js' ),
	matrix = require( './matrix.js' ),
	number = require( './number.js' );


// UNIFORM GENERATOR //

var RAND = lcg();


// NORMAL RANDOM VARIATES //

/**
* FUNCTION: random( [dims][, opts] )
*	Creates a matrix or array filled with normal random numbers.
*
* @param {Number|Number[]} [dims] - dimensions
* @param {Object} [opts] - function options
* @param {Number} [opts.mu=0] - mean parameter
* @param {Number} [opts.sigma=1] - standard deviation
* @param {String} [opts.dtype="generic"] - output data type
* @param {Number} [opts.seed] - integer-valued seed
* @returns {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} random numbers
*/
function random( dims, options ) {
	var opts = {},
		isArray,
		ndims,
		err,
		len,
		mu,
		sigma,
		rand,
		dt;

	if ( arguments.length > 0 ) {
		isArray = isPositiveIntegerArray( dims );
		if ( !isArray && !isPositiveInteger( dims ) ) {
			throw new TypeError( 'random()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
		}
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}

	if ( opts.seed ) {
		rand = lcg( opts.seed );
	} else {
		rand = RAND;
	}
	dt = opts.dtype || 'generic';

	mu = typeof opts.mu !== 'undefined' ? opts.mu : 0;
	sigma = typeof opts.sigma !== 'undefined' ? opts.sigma : 1;

	if ( arguments.length === 0 ) {
		return number( mu, sigma, rand );
	}
	if ( isArray ) {
		ndims = dims.length;
		if ( ndims < 2 ) {
			len = dims[ 0 ];
		}
	} else {
		ndims = 1;
		len = dims;
	}
	// 1-dimensional data structures...
	if ( ndims === 1 ) {
		if ( len === 1 ) {
			return number( mu, sigma, rand );
		}
		if ( dt === 'generic' ) {
			return array( len, mu, sigma, rand );
		}
		return typedarray( len, dt, mu, sigma, rand );
	}
	// Multidimensional data structures...
	if ( dt !== 'generic' ) {
		if ( ndims === 2 ) {
			return matrix( dims, dt, mu, sigma, rand );
		}
		// TODO: dstructs-ndarray support goes here. Until then, fall through to plain arrays...
	}
	return arrayarray( dims, mu, sigma, rand );
} // end FUNCTION random()


// EXPORTS //

module.exports = random;

Object.defineProperty( module.exports, 'seed', {
	set: function ( newVal ) {
		if ( !isPositiveInteger( newVal ) ) {
			throw new TypeError( 'random()::invalid value. Seed property must be a positive integer. Option: `' + newVal + '`.' );
		}
		RAND = lcg( newVal );
	}
});

},{"./array.js":384,"./arrayarray.js":385,"./matrix.js":388,"./number.js":389,"./typedarray.js":392,"./validate.js":393,"compute-lcg":396,"validate.io-positive-integer":453,"validate.io-positive-integer-array":451}],388:[function(require,module,exports){
'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' ),
	partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( dims, dt, mu, sigma[, rand] )
*	Creates a matrix of normally distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Matrix} matrix filled with normal random numbers
*/
function random( dims, dt, mu, sigma, rand ) {
	var out,
		draw,
		i;

	draw = partial( mu, sigma, rand );
	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = draw();
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;

},{"./partial.js":390,"dstructs-matrix":405}],389:[function(require,module,exports){
'use strict';

// MODULES //

var dRanNormalTail = require( './dRanNormalTail.js' );


// FUNCTIONS //

var abs = Math.abs,
	exp = Math.exp,
	log = Math.log,
	pow = Math.pow,
	sqrt = Math.sqrt;


// CONSTANTS //

var TWO_P_32 = pow( 2, 32);


// GENERATE NORMAL RANDOM NUMBERS //

/**
* FUNCTION random( mu, sigma[, rand] )
*	Generates a random draw from a normal distribution
*	with parameters `mu` and `sigma`. Implementation
*	of the "Improved Ziggurat Method" by J. Doornik.
*	Reference:
*		Doornik, J. a. (2005).
*		An Improved Ziggurat Method to Generate Normal Random Samples.
*
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Number} random draw from the specified distribution
*/
function random( mu, sigma, rand ) {

	if ( !rand ) {
		rand = Math.random;
	}

	var ZIGNOR_C = 128,/* number of blocks */
 		ZIGNOR_R = 3.442619855899, /* start of the right tail *
		/* (R * phi(R) + Pr(X>=R)) * sqrt(2\pi) */
		ZIGNOR_V = 9.91256303526217e-3,
		/* s_adZigX holds coordinates, such that each rectangle has
			same area; s_adZigR holds s_adZigX[i + 1] / s_adZigX[i] */
		s_adZigX = new Array( ZIGNOR_C + 1 ),
		s_adZigR = new Array( ZIGNOR_C ),
		i, f;

	f = exp( -0.5 * ZIGNOR_R * ZIGNOR_R );
	s_adZigX[0] = ZIGNOR_V / f; /* [0] is bottom block: V / f(R) */
	s_adZigX[1] = ZIGNOR_R;
	s_adZigX[ZIGNOR_C] = 0;
	for ( i = 2; i < ZIGNOR_C; i++ ) {
		s_adZigX[i] = sqrt( -2 * log( ZIGNOR_V / s_adZigX[i - 1] + f ) );
		f = exp( -0.5 * s_adZigX[i] * s_adZigX[i] );
	}
	for ( i = 0; i < ZIGNOR_C; i++ ) {
		s_adZigR[i] = s_adZigX[i + 1] / s_adZigX[i];
	}
	var x, u, f0, f1;
	for (;;) {
		u = 2 * rand() - 1;
		i = TWO_P_32 * rand() & 0x7F;
		/* first try the rectangular boxes */
		if ( abs(u) < s_adZigR[i] ) {
			return mu + sigma * u * s_adZigX[i];
		}
		/* bottom box: sample from the tail */
		if ( i === 0 ) {
			return mu + sigma * dRanNormalTail( ZIGNOR_R, u < 0, rand );
		}
		/* is this a sample from the wedges? */
		x = u * s_adZigX[i];
		f0 = exp( -0.5 * ( s_adZigX[i] * s_adZigX[i] - x * x ) );
		f1 = exp( -0.5 * ( s_adZigX[i+1] * s_adZigX[i+1] - x * x ) );
		if ( f1 + rand() * (f0 - f1) < 1.0 ) {
			return mu + sigma * x;
		}
	}
} // end FUNCTION random()


// EXPORTS //

module.exports = random;

},{"./dRanNormalTail.js":386}],390:[function(require,module,exports){
'use strict';

// MODULES //

var dRanNormalTail = require( './dRanNormalTail.js' );


// FUNCTIONS  //

var abs = Math.abs,
	exp = Math.exp,
	log = Math.log,
	pow = Math.pow,
	sqrt = Math.sqrt;


// PARTIAL //

/**
* FUNCTION: partial( mu, sigma[, rand] )
*	Partially applies `mu` and `sigma` and returns a function
*	to generate random variables from the normal distribution. Implementation
*	of the "Improved Ziggurat Method" by J. Doornik.
*	Reference:
*		Doornik, J. a. (2005).
*		An Improved Ziggurat Method to Generate Normal Random Samples.
*
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Function} function which generates random draws from the specified distribution
*/
function partial( mu, sigma, rand ) {
	var random,
		ZIGNOR_C = 128,/* number of blocks */
		ZIGNOR_R = 3.442619855899, /* start of the right tail *
		/* (R * phi(R) + Pr(X>=R)) * sqrt(2\pi) */
		ZIGNOR_V = 9.91256303526217e-3,
		/* s_adZigX holds coordinates, such that each rectangle has
			same area; s_adZigR holds s_adZigX[i + 1] / s_adZigX[i] */
		s_adZigX = new Array( ZIGNOR_C + 1 ),
		s_adZigR = new Array( ZIGNOR_C ),
		i, f,
		TWO_P_32 = pow( 2, 32 );

	if ( rand ) {
		random = rand;
	} else {
		random = Math.random;
	}

	f = exp( -0.5 * ZIGNOR_R * ZIGNOR_R );
	s_adZigX[0] = ZIGNOR_V / f; /* [0] is bottom block: V / f(R) */
	s_adZigX[1] = ZIGNOR_R;
	s_adZigX[ZIGNOR_C] = 0;
	for ( i = 2; i < ZIGNOR_C; i++ ) {
		s_adZigX[i] = sqrt( -2 * log( ZIGNOR_V / s_adZigX[i - 1] + f ) );
		f = exp( -0.5 * s_adZigX[i] * s_adZigX[i] );
	}
	for ( i = 0; i < ZIGNOR_C; i++ ) {
		s_adZigR[i] = s_adZigX[i + 1] / s_adZigX[i];
	}

	/**
	* FUNCTION: draw( x )
	*	Generates a random draw for a normal distribution with parameters `mu` and `sigma`.
	*
	* @private
	* @returns {Number} random draw from the specified distribution
	*/
	return function draw() {
		var x, u, f0, f1;
		for (;;) {
			u = 2 * random() - 1;
			i = TWO_P_32 * random() & 0x7F;
			/* first try the rectangular boxes */
			if ( abs(u) < s_adZigR[i] ) {
				return mu + sigma * u * s_adZigX[i];
			}
			/* bottom box: sample from the tail */
			if ( i === 0 ) {
				return mu + sigma * dRanNormalTail( ZIGNOR_R, u < 0, rand );
			}
			/* is this a sample from the wedges? */
			x = u * s_adZigX[i];
			f0 = exp( -0.5 * ( s_adZigX[i] * s_adZigX[i] - x * x ) );
			f1 = exp( -0.5 * ( s_adZigX[i+1] * s_adZigX[i+1] - x * x ) );
			if ( f1 + random() * (f0 - f1) < 1.0 ) {
				return mu + sigma * x;
			}
		}
	}; // end FUNCTION draw()
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;

},{"./dRanNormalTail.js":386}],391:[function(require,module,exports){
'use strict';

/**
* FUNCTION: recurse( dims, d, draw )
*	Recursively create a multidimensional array of normally distributed random numbers.
*
* @param {Number[]} dims - dimensions
* @param {Number} d - current recursion depth
* @param {Function} draw - function to generate normal random numbers with given `mu` and `sigma`
* @returns {Array} output array
*/
function recurse( dims, d, draw ) {
	var out = [],
		len,
		i;

	len = dims[ d ];
	d += 1;
	if ( d < dims.length ) {
		for ( i = 0; i < len; i++ ) {
			out.push( recurse( dims, d, draw ) );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out.push( draw() );
		}
	}
	return out;
} // end FUNCTION recurse()


// EXPORTS //

module.exports = recurse;

},{}],392:[function(require,module,exports){
'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' ),
	partial = require( './partial.js' );


// RANDOM //

/**
* FUNCTION: random( len, dt, mu, sigma[, rand] )
*	Creates a typed array of normally distributed random numbers.
*
* @param {Number} len - array length
* @param {String} dt - data type
* @param {Number} mu - mean parameter
* @param {Number} sigma - standard deviation
* @param {Function} [rand=Math.random] - random number generator
* @returns {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} typed array filled with normal random numbers
*/
function random( len, dt, mu, sigma, rand ) {
	/* jshint newcap:false */
	var ctor,
		out,
		draw,
		i;

	draw = partial( mu, sigma, rand );
	ctor = ctors( dt );
	if ( ctor === null ) {
		throw new Error( 'random()::invalid value. Data type does not have a corresponding array constructor. Value: `' + dt + '`.' );
	}
	out = new ctor( len );
	for ( i = 0; i < len; i++ ) {
		out[ i ] = draw();
	}
	return out;
} // end FUNCTION random()


// EXPORTS //

module.exports = random;

},{"./partial.js":390,"compute-array-constructors":395}],393:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isNonNegative = require( 'validate.io-nonnegative' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Number} [options.mu] - mean parameter
* @param {Number} [options.sigma] - standard deviation
* @param {String} [options.dtype] - output data type
* @param {Number} [options.seed] - integer-valued seed
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'random()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'mu' ) ) {
		opts.mu = options.mu;
		if ( !isNumber( opts.mu ) ) {
			return new TypeError( 'random()::invalid option. `mu` parameter must be a number primitive. Option: `' + opts.mu + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sigma' ) ) {
		opts.sigma = options.sigma;
		if ( !isNonNegative( opts.sigma ) ) {
			return new TypeError( 'random()::invalid option. `sigma` parameter must be a non-negative number. Option: `' + opts.sigma + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'random()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'seed' ) ) {
		opts.seed = options.seed;
		if ( !isPositiveInteger( opts.seed ) ) {
			return new TypeError( 'random()::invalid option. Seed option must be a positive integer. Option: `' + opts.seed + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"validate.io-nonnegative":447,"validate.io-number-primitive":462,"validate.io-object":449,"validate.io-positive-integer":453,"validate.io-string-primitive":456}],394:[function(require,module,exports){
arguments[4][32][0].apply(exports,arguments)
},{"dup":32}],395:[function(require,module,exports){
arguments[4][75][0].apply(exports,arguments)
},{"./ctors.js":394,"dup":75}],396:[function(require,module,exports){
/**
*
*	COMPUTE: lcg
*
*
*	DESCRIPTION:
*		- A linear congruential pseudorandom number generator (lcg).
*
*
*	NOTES:
*		[1] Based on W. Press, et al., Numerical Recipes in C (2d ed. 1992)
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. rgizz.
*
*
*	AUTHOR:
*		rgizz. gztown2216@yahoo.com. 2014.
*
*/

'use strict';

// VARIABLES //

var MASK = 123459876,
	M = 2147483647,
	A = 16807;


// LCG //

/**
* FUNCTION: lcg( [seed] )
*	Returns a linear congruential pseudorandom number generator. If not provided a seed, a seed is generated based on the current time.
*
* @param {Number} [seed] - random number generator seed
* @returns {Function} generator
*/
function lcg( val ) {
	var seed;
	if ( arguments.length ) {
		if ( typeof val !== 'number' || val !== val || val % 1 !== 0 || val < 1 ) {
			throw new TypeError( 'lcg()::invalid input argument. Seed must be a positive integer.' );
		}
		seed = val;
	} else {
		seed = Date.now() % 100000000;
	}
	/**
	* FUNCTION: lcg( [N] )
	*	Linear congruential pseudorandom number generator.
	*
	* @param {Number} [N] - number of pseudorandom numbers to return
	* @returns {Number|Array} pseudorandom floating-point number(s) between 0 and 1
	*/
	return function lcg( N ) {
		var arr,
			rand;
		if ( !arguments.length ) {
			seed = seed ^ MASK;
			seed = ( A * seed ) % M;
			rand = seed / M;
			seed = seed ^ MASK;
			return rand;
		}
		if ( typeof N !== 'number' || N !== N || N%1 !== 0 || N < 1 ) {
			throw new TypeError( 'lcg()::invalid input argument. Array length must be a positive integer.' );
		}
		arr = new Array( N );
		for ( var i = 0; i < N; i++ ) {
			seed = seed ^ MASK;
			seed = ( A * seed ) % M;
			arr[ i ] = seed / M;
			seed = seed ^ MASK;
		}
		return arr;
	};
} // end FUNCTION lcg()


// EXPORTS //

module.exports = lcg;



},{}],397:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],398:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"./get.js":401,"./iget.js":403,"./iset.js":406,"./mget.js":410,"./mset.js":412,"./set.js":420,"./sget.js":422,"./sset.js":424,"./toString.js":426,"dup":2}],399:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./get.raw.js":402,"./iget.raw.js":404,"./iset.raw.js":407,"./mget.raw.js":411,"./mset.raw.js":413,"./set.raw.js":421,"./sget.raw.js":423,"./sset.raw.js":425,"./toString.js":426,"dup":3}],400:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],401:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5,"validate.io-nonnegative-integer":443}],402:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],403:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7,"validate.io-integer-primitive":441}],404:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],405:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./matrix.js":408,"./matrix.raw.js":409,"dup":9}],406:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"dup":10,"validate.io-integer-primitive":441,"validate.io-number-primitive":446}],407:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11}],408:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./btypes.js":397,"./ctor.js":398,"./dtypes.js":400,"compute-cast-arrays":427,"compute-dtype":432,"dup":12,"validate.io-array":437,"validate.io-contains":438,"validate.io-nonnegative-integer-array":442,"validate.io-string-primitive":456}],409:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./btypes.js":397,"./ctor.raw.js":399,"./dtypes.js":400,"compute-dtype":432,"dup":13,"validate.io-contains":438,"validate.io-string-primitive":456}],410:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./btypes.js":397,"dup":14,"validate.io-nonnegative-integer-array":442}],411:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"./btypes.js":397,"dup":15}],412:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./mset1.js":414,"./mset2.js":415,"./mset3.js":416,"./mset4.js":417,"./mset5.js":418,"./mset6.js":419,"dup":16,"validate.io-function":440,"validate.io-nonnegative-integer-array":442,"validate.io-number-primitive":446}],413:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"./mset1.js":414,"./mset2.js":415,"./mset3.js":416,"./mset4.js":417,"./mset5.js":418,"./mset6.js":419,"dup":17}],414:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18}],415:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"dup":19}],416:[function(require,module,exports){
arguments[4][20][0].apply(exports,arguments)
},{"dup":20}],417:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],418:[function(require,module,exports){
arguments[4][22][0].apply(exports,arguments)
},{"dup":22}],419:[function(require,module,exports){
arguments[4][23][0].apply(exports,arguments)
},{"dup":23}],420:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"dup":24,"validate.io-nonnegative-integer":443,"validate.io-number-primitive":446}],421:[function(require,module,exports){
arguments[4][25][0].apply(exports,arguments)
},{"dup":25}],422:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"./btypes.js":397,"compute-indexspace":436,"dup":26,"validate.io-string-primitive":456}],423:[function(require,module,exports){
arguments[4][27][0].apply(exports,arguments)
},{"./btypes.js":397,"compute-indexspace":436,"dup":27}],424:[function(require,module,exports){
arguments[4][28][0].apply(exports,arguments)
},{"compute-indexspace":436,"dup":28,"validate.io-function":440,"validate.io-number-primitive":446,"validate.io-string-primitive":456}],425:[function(require,module,exports){
arguments[4][29][0].apply(exports,arguments)
},{"compute-indexspace":436,"dup":29}],426:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"dup":30}],427:[function(require,module,exports){
arguments[4][31][0].apply(exports,arguments)
},{"compute-array-constructors/lib/ctors":394,"compute-array-dtype/lib/dtypes":428,"dup":31,"type-name":429,"validate.io-array-like":430}],428:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],429:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],430:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"compute-const-max-safe-integer":431,"dup":34,"validate.io-integer-primitive":441}],431:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],432:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"compute-array-dtype":434,"dup":36,"type-name":435}],433:[function(require,module,exports){
arguments[4][33][0].apply(exports,arguments)
},{"dup":33}],434:[function(require,module,exports){
arguments[4][38][0].apply(exports,arguments)
},{"./dtypes.js":433,"dup":38}],435:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40}],436:[function(require,module,exports){
arguments[4][39][0].apply(exports,arguments)
},{"dup":39,"validate.io-nonnegative-integer":443,"validate.io-string-primitive":456}],437:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],438:[function(require,module,exports){
arguments[4][42][0].apply(exports,arguments)
},{"dup":42,"validate.io-array":437,"validate.io-nan-primitive":439}],439:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],440:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44}],441:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":446}],442:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46,"validate.io-array":437,"validate.io-nonnegative-integer":443}],443:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47,"validate.io-integer":444}],444:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":445}],445:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],446:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],447:[function(require,module,exports){
arguments[4][141][0].apply(exports,arguments)
},{"dup":141,"validate.io-number":448}],448:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],449:[function(require,module,exports){
arguments[4][144][0].apply(exports,arguments)
},{"dup":144,"validate.io-array":450}],450:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],451:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' );


// IS POSITIVE INTEGER ARRAY //

/**
* FUNCTION: isPositiveIntegerArray( value )
*	Validates if a value is a positive integer array.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating if a value is a positive integer array
*/
function isPositiveIntegerArray( value ) {
	var len, i;
	if ( !isArray( value ) ) {
		return false;
	}
	len = value.length;
	if ( !len ) {
		return false;
	}
	for ( i = 0; i < len; i++ ) {
		if ( !isPositiveInteger( value[i] ) ) {
			return false;
		}
	}
	return true;
} // end FUNCTION isPositiveIntegerArray()


// EXPORTS //

module.exports = isPositiveIntegerArray;

},{"validate.io-array":452,"validate.io-positive-integer":453}],452:[function(require,module,exports){
arguments[4][41][0].apply(exports,arguments)
},{"dup":41}],453:[function(require,module,exports){
arguments[4][380][0].apply(exports,arguments)
},{"dup":380,"validate.io-integer":454}],454:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"validate.io-number":455}],455:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],456:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],457:[function(require,module,exports){
arguments[4][34][0].apply(exports,arguments)
},{"compute-const-max-safe-integer":458,"dup":34,"validate.io-integer-primitive":459}],458:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],459:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45,"validate.io-number-primitive":460}],460:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],461:[function(require,module,exports){
arguments[4][137][0].apply(exports,arguments)
},{"dup":137}],462:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}]},{},[323]);
