const fp = require('lodash/fp')
const cars = require('./api/car.js')

console.log('cars:', cars)

let isLastInStock = () => {
    // //获取最后一条数据
    // let last_car = fp.last(cars)
    // //获取最后一条数据的 in_stock 属性值
    // return fp.prop('in_stock', last_car)
    let ff = fp.flowRight(fp.prop('in_stock'), fp.last)
    return ff
}

console.log(isLastInStock()(cars))

