const fp = require('lodash/fp')

const { Maybe, Container } = require('./api/support.js')

let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = {
    id: 2,
    name: 'Albert'
}
let ex3 = (prop) => {
    return fp.flowRight(fp.first, item => item._value, safeProp(prop))
}
console.log(ex3('name')(user))