"use strict";

const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. 
 *  if the conversion isn't successful, throw a BadRequestError and will
 *  be handled in your route
*/

function convertStrNums(queryInput) {
  let nums = []

  for (let input of queryInput) {
    //debugger;
    if (isNaN(Number(input))) {
      throw new BadRequestError(`${input} is not a number`);
    } else {
      nums.push(Number(input));
    }
  }

  return nums;
}


module.exports = { convertStrNums };