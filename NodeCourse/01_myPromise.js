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
	#callback

    constructor(executor){
      executor(this.#resolve.bind(this),this.#reject.bind(this))
    }
		#resolve(value){
			if(this.#state !== PROMISE_STATE.PENDING) return
			this.#result = value
			this.#state = PROMISE_STATE.FULLFILLED //数据填充成功

			//当resolve执行时，说明数据已经进来了，需要调用then的回调函数
			this.#callback && this.#callback(this.#result)
		}

		#reject(){}

		then(onFullfilled,onRejected){
			if(this.#state === PROMISE_STATE.PENDING){
				this.#callback = onFullfilled
			}
			if(this.#state === PROMISE_STATE.FULLFILLED){
				onFullfilled(this.#result)
			}
		}
}

const mp = new myPromise((resolve,reject)=>{
    //setTimeout(()=>{
			resolve('sunwukong')
		//})
})
//console.log(mp)
mp.then((result)=>{
	console.log(result)
})