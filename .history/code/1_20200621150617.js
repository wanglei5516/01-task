let p = new Promise((resolve, reject) => {
    try{
        let count = 0
        setTimeout(() => {
            count ++
            resolve('hello')
        }, 10)
    }catch {
        reject(new Error('error'))
    }
    
})
p
  .then((value) => {
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
    if (count === 3) return value
  })