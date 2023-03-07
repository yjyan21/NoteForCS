const PROMISE_STATE = {
	PENDING:0,
	FULLFILLED:1,
	REJECTED:2
}
class myPromise {
	//创建一个变量来存储Promise的结果
	#result
	//创建一个变量来记录Promise的状态
	#state = PROMISE_STATE.PENDING
	//创建一个变量来存储回调函数
    //由于回调函数可能有多个，我们使用数组来存储回调函数
	//#callback
    #callbacks = []

    constructor(executor){
      executor(this.#resolve.bind(this),this.#reject.bind(this))
    }
		#resolve(value){
			if(this.#state !== PROMISE_STATE.PENDING) return
			this.#result = value
			this.#state = PROMISE_STATE.FULLFILLED //数据填充成功

			//当resolve执行时，说明数据已经进来了，需要调用then的回调函数
			queueMicrotask(()=>{
                //this.#callback && this.#callback(this.#result)
								this.#callbacks.forEach(cb => {
									cb()
								})
            })
		}

		#reject(){}

		then(onFullfilled,onRejected){
			if(this.#state === PROMISE_STATE.PENDING){
				//this.#callback = onFullfilled
                this.#callbacks.push(()=>{
                    onFullfilled(this.#result)
                })
			}else if(this.#state === PROMISE_STATE.FULLFILLED){
				//onFullfilled(this.#result)
                //then的回调函数应该放到微任务队列执行，而不是直接调用；
                queueMicrotask(()=>{
                    onFullfilled(this.#result)
                })
			}
		}
}

const mp = new myPromise((resolve,reject)=>{
    setTimeout(()=>{
			resolve('sunwukong')
		},1000)
})
//console.log(mp)
// mp.then((result)=>{
// 	console.log(result)
// })
mp.then(result=> console.log("第一次读取，",result))
mp.then(result=> console.log("第二次读取，",result))
mp.then(result=> console.log("第三次读取，",result))