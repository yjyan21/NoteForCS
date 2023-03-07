function sum(a,b){
    return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(a+b)
			},1000)
		})
}

// sum(123,456).then((result)=>{
//     console.log(result)
// },(reason)=>{
//     console.log(reason)
// })

sum(123,456)
	.then((result)=>{return  result + 7})
	.then(result => result + 8)
	.then(result=>console.log(result))