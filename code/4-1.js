const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {

    //参数是一个立即执行的函数，有两个参数
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            //执行过程中有异常，则调用reject更改状态
            this.reject(e);
        }
    }

    // 初始状态 
    status = PENDING;
    // 初始值
    value = undefined;
    // 初始原因
    reason = undefined;
    // 成功回调
    successCallback = [];
    // 失败回调
    failCallback = [];

    //将状态改为成功，有一个参数
    resolve = value => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 保存成功之后的值
        this.value = value;
        // 将已有的 所有成功回调 全部调用
        while (this.successCallback.length) this.successCallback.shift()()
    }

    //将状态改为失败，有一个参数
    reject = reason => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 保存失败后的原因
        this.reason = reason;
        // 将已有的 所有失败回调 全部调用
        while (this.failCallback.length) this.failCallback.shift()()
    }

    then(successCallback, failCallback) {
        // 参数可选
        successCallback = successCallback instanceof Function ? successCallback : value => value;
        // 参数可选
        failCallback = failCallback instanceof Function ? failCallback : reason => {
            throw reason
        };
        let promsie2 = new MyPromise((resolve, reject) => {
            // 判断状态
            if (this.status === FULFILLED) {
                //代码异步，因为用到promsie2，若同步则取不到promsie2值
                setTimeout(() => {
                    try {
                        let x = successCallback(this.value);
                        //返回值x和调用值promsie2不能相等
                        resolvePromise(promsie2, x, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                //代码异步，因为用到promsie2，若同步则取不到promsie2值
                setTimeout(() => {
                    try {
                        let x = failCallback(this.reason);
                        //返回值x和调用值promsie2不能相等
                        resolvePromise(promsie2, x, resolve, reject)
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            } else {
                // 等待
                // 将成功回调和失败回调存储起来
                this.successCallback.push(() => {
                    //代码异步，因为用到promsie2，若同步则取不到promsie2值
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value);
                            resolvePromise(promsie2, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason);
                            resolvePromise(promsie2, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
            }
        });
        //promise2生成完毕，返回
        return promsie2;
    }
    
    //catch就是then(undefined, function)
    catch (failCallback) {
        return this.then(undefined, failCallback)
    }

    //不管resolve,reject都会执行callback
    finally(callback) {
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => value);
        }, reason => {
            return MyPromise.resolve(callback()).then(() => {
                throw reason
            })
        })
    } 

    //静态方法，并行执行
    static all(array) {
        let result = [];
        let index = 0;
        //返回promise对象
        return new MyPromise((resolve, reject) => {
            function addData(key, value) {
                result[key] = value;
                index++;
                //解决异步问题
                if (index === array.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                if (current instanceof MyPromise) {
                    // promise 对象,then方法异步
                    current.then(value => addData(i, value), reason => reject(reason))
                } else {
                    // 普通值，直接算成功
                    addData(i, array[i]);
                }
            }
        })
    }

    //静态方法，并行执行
    static race(array) {
        // let result = [];
        // let index = 0;
        //返回promise对象
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                if (current instanceof MyPromise) {
                    // promise 对象,then方法异步，只要改变状态就返回
                    current.then(value => resolve(value), reason => reject(reason))
                } else {
                    // 普通值，转成Promise,改变状态返回
                    resolve(current)
                }
            }
        })
    }

    static resolve(value) {
        if (value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value));
    }

    static reject(reason) {
        if (reason instanceof MyPromise) return reason;
        return new MyPromise((undefined, reason) => reject(reason));
    }
}

function resolvePromise(promsie2, x, resolve, reject) {
    // 如果相等 抛出异常 
    if (promsie2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) {
        // promise 对象 查看promsie对象返回的结果 
        x.then(resolve, reject);
    } else {
        // 普通值 直接调用resolve 
        resolve(x);
    }
}

module.exports = MyPromise;