"use strict";

/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { findMean, findMedian, findMode } = require("./stats");
const { convertStrNums } = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  try {
    const queryInput = req.query.nums.split(",");
  } catch {
    throw new BadRequestError(MISSING);
  }
  
  const nums = convertStrNums(queryInput);
  const mean = findMean(nums);

  return res.json({ operation: "mean", result: mean });
})

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  try {
    const queryInput = req.query.nums.split(",");
  } catch {
    throw new BadRequestError(MISSING);
  }

  const nums = convertStrNums(queryInput);
  const median = findMedian(nums);

  return res.json({ operation: "median", result: median });
})

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  try {
    const queryInput = req.query.nums.split(",");
  } catch {
    throw new BadRequestError(MISSING);
  }

  const nums = convertStrNums(queryInput);
  const mode = findMode(nums);

  return res.json({ operation: "mode", result: mode });
})

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;