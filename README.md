一、谈谈你是如何理解JS异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务?

异步编程：同步代码执行完成拿到结果，才会执行后面的代码，后面的代码要等待前面同步代码执行完成；而异步编程中后面的代码不需要等待异步代码执行完成并拿到结果，提高了效率。

事件循环，消息队列：JS有一个主线程栈，所有同步代码都按顺序在这里一个接一个地执行，过程中遇到的异步任务，如果满足异步条件就将它的回调函数放在消息队列中，同步任务执行完就会从消息队列中按顺序取回调函数执行。

异步任务又分为宏任务和微任务，过程中遇到的若是宏任务，待满足条件后将回调函数放进宏任务队列；若是微任务，待满足条件后将回调函数放微任务队列。同步任务执行完就会将微任务队列中的所有微任务依次执行，过程中遇到的宏任务微任务依旧放进对应的队列中，再从宏任务队列中取出一个宏任务的回调函数执行，过程中遇到的宏任务微任务依旧放进对应的队列中，再将微任务队列中的所有微任务依次执行......一直循环到两个队列为空。

宏任务：比如 setTimeout() 

微任务：比如 Promise , async/await , process.nexttick()
