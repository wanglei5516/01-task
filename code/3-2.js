const fp = require('lodash/fp')

const { Maybe, Container } = require('./api/support.js')

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])

let ex2 = (container) => {
    let f = fp.flowRight(fp.first, obj => obj._value)
    return f(container)
}

console.log(ex2(xs))
