/*
 *   Given a numerator and denominator, return a ratio string
 */
Math.ratio = function(numerator, denominator) {
  var result = Math.floor(100 * numerator / denominator) / 100;

  // check for special cases
  if (result === Number.POSITIVE_INFINITY || result === Number.NEGATIVE_INFINITY) result = -2;
  else if (isNaN(result)) result = -1;

  return result;
};

/**
 * Round a string of a number to a specified number of decimal places
 */
export function toTruncFixed(number, place) {
  var ret = Math.floor(number * Math.pow (10, place)) / Math.pow(10, place);
  return ret.toFixed(place);
}

export function toStringWithCommas(number) {
  return number.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
};

export function findByProperty(arr, key, value) {
  return arr[arr.findIndex(o => o[key] === value)]
}

