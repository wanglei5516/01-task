const fp = require('lodash/fp')
const cars = require('./api/car.js')

console.log('cars:', cars)

let _underscore = fp.replace(/\W+/g, '_') 
// <--无须改动，并在sanitizeNames中使用它

function sanitizeNames (cars) {
    return fp.map(fp.flowRight(_underscore, fp.toLower, (item) => {
        return item.name
    }), cars)
}
console.log(sanitizeNames(cars))