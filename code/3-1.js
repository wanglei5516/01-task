const fp = require('lodash/fp')

const { Maybe, Container } = require('./api/support.js')

let maybe = Maybe.of([5, 6, 1])
let ex1 = (maybe, params) => {
    return fp.flowRight(item => {
        return maybe._value = item
    }, fp.map(item => fp.add(item, params))
    )
}
console.log(ex1(maybe, 1)(maybe._value))

