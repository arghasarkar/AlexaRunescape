"use strict";

const moment = require("moment");

exports.getAraxxorPath = function() {
    const CURRENT_PATH_SPEECH_PREFIX = "The current paths for Araxxor are ";
    const CURRENT_PATH_SPEECH_POSTFIX = ".";

    const DAYS_UNTIL_NEXT_ROTATION_PREFIX = "The next rotation is in ";
    const DAYS_UNTIL_NEXT_ROTATION_POSTFIX = " days.";

    let speech = CURRENT_PATH_SPEECH_PREFIX +  getCurrentRotationStr() + CURRENT_PATH_SPEECH_POSTFIX;
    speech += " " + DAYS_UNTIL_NEXT_ROTATION_PREFIX + getDaysUntilNextRotationStr() + DAYS_UNTIL_NEXT_ROTATION_POSTFIX;

    return speech;
};

// The combination of paths available in textual format
const PATH_COMBINATIONS = [
    "path one and path two",
    "path two and path three",
    "path one and path three"
];

const START_DATE = "04/02/2017 00:00:00";
const START_YEAR = 2017;
// Month is 0 indexed (0-11).
const START_MONTH = 1;
const START_DAY = 4;
const START_MOMENT = moment([START_YEAR, START_MONTH, START_DAY]);

const ROTATION_INTERVAL_IN_DAYS = 4;
const ROTATION_RESET_IN_DAYS = 12;

function getCurrentRotationStr() {
    moment.locale("en");
    let now = moment();
    // Working out the difference in days since the SEEDED start
    let differenceInDays = (now.diff(START_MOMENT, 'days'));

    let pathDays = differenceInDays % ROTATION_RESET_IN_DAYS;
    let currentRotationPathNum = Math.floor(pathDays / ROTATION_INTERVAL_IN_DAYS);

    return PATH_COMBINATIONS[currentRotationPathNum];
}

function getDaysUntilNextRotationStr() {
    moment.locale("en");

    let now = moment();
    // Working out the difference in days since the SEEDED start
    let differenceInDays = (now.diff(START_MOMENT, 'days'));
    let pathDays = ROTATION_INTERVAL_IN_DAYS - (differenceInDays % ROTATION_INTERVAL_IN_DAYS);

    return pathDays;
}