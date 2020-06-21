const fp = require('lodash/fp')

const { Maybe, Container } = require('./api/support.js')

let ex4 = (n) => {
    let f = fp.flowRight(parseInt, item => {
        let obj = Maybe.of(item)
        return obj.map(item => item)._value
    })
    return f(n)
}
console.log(ex4('12.65'))