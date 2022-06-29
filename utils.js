const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  let nums = []
  // debugger;
  for (let num of strNums) {
    if (Number(num) === NaN) {
      throw new BadRequestError("Not a number");
    }
    else {
      nums.push(Number(num));
    }
  } 

  return nums;
}


module.exports = { convertStrNums };