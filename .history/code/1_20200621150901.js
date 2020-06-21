let count = 0
let p = new Promise((resolve, reject) => {
    try{
        setTimeout(() => {
            count ++
            resolve('hello')
        }, 10)
    }catch {
        reject(new Error('error'))
    }
    
})
p.then((value) => {
    setTimeout((value) => {
        count ++
        value += 'lagou'
    }, 10)
    if (count === 2) return value
  })
  .then((value) => {
    setTimeout((value) => {
        count ++
        value += 'I ❤ U'
    }, 10)
    if (count === 3) {
        console.log(value)
        return value
    }
  })
  console.log(123)