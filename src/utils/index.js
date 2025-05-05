import config from '../config/config'

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

//pagination helper function
const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: tutorials } = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);

	return { totalItems, tutorials, totalPages, currentPage };
};

/**
 * calculate discount between price and sold price
 * @param {*} p 
 * @param {*} sp 
 * @returns 
 */
const CalculatePriceDiscount = (p, sp) => {
	let d = ((p - sp) / p) * 100
	if (d > 0) {
		return parseInt(d.toString())
	}
	return 0
}

// __ check nested key, if found then return value otherwise return undefined
export const __ = (obj, ...args) => {
	return args.reduce((obj, level) => obj && obj[level], obj);
};

export const ShortNumber = (number) => {
	if (isNaN(number)) return null; // will only work value is a number
	if (number === null) return null;
	if (number === 0) return null;
	let abs = Math.abs(number);
	const rounder = Math.pow(10, 1);
	const isNegative = number < 0; // will also work for Negative numbers
	let key = '';

	const powers = [
		{ key: 'Q', value: Math.pow(10, 15) },
		{ key: 'T', value: Math.pow(10, 12) },
		{ key: 'B', value: Math.pow(10, 9) },
		{ key: 'M', value: Math.pow(10, 6) },
		{ key: 'K', value: 1000 }
	];

	for (let i = 0; i < powers.length; i++) {
		let reduced = abs / powers[i].value;
		reduced = Math.round(reduced * rounder) / rounder;
		if (reduced >= 1) {
			abs = reduced;
			key = powers[i].key;
			break;
		}
	}
	return (isNegative ? '-' : '') + abs + key;
}

/**
 * Handle number between 0-1cr
 * @param {*} amt 
 */
export const ShortAmt = (amt) => {
	let formatAmt = amt
	let postfix = ''
	if(amt > 10000000){
		formatAmt = (amt/10000000).toFixed(2)
		postfix = 'C'
	} else if (amt > 100000){
		formatAmt = (amt/100000).toFixed(2)
		postfix = 'L'
	} else if (amt > 1000){
		formatAmt = (amt/1000).toFixed(2)
		postfix = 'K'
	} else {
		formatAmt = amt	
	}
	return new Intl.NumberFormat().format(formatAmt) + postfix
}

const WithMediaHost = (path) => {
	if(path && path.indexOf('http') > -1){
		return path
	}
	return `${config.media_host}${path}`
}

module.exports = {
	__,
	pick,
	ShortNumber,
	ShortAmt,
	getPagingData,
	WithMediaHost,
	CalculatePriceDiscount
}


