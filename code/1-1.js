function fn (time, value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // console.log(value)
            resolve(value)
        }, time)
    })
}
let p = fn(10, 'hello')
p
.then((value) => {
    value += 'lagou'
    return fn(10, value)
})
.then((value) => {
    value += 'I ❤ U'
    return fn(10, value)
})
.then((value) => {
    console.log(value)
})