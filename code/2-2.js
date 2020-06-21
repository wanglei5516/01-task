const fp = require('lodash/fp')
const cars = require('./api/car.js')

console.log('cars:', cars)

let isFirstName = () => {
    let ff = fp.flowRight(fp.prop('name'), fp.first)
    return ff
}

console.log(isFirstName()(cars))