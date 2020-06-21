const fp = require('lodash/fp')
const cars = require('./api/car.js')

console.log('cars:', cars)

let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
} //<-无须改动

let averageDollarValue = function () {
    return fp.flowRight(_average, fp.map(car => car.dollar_value))
}

console.log(averageDollarValue()(cars))