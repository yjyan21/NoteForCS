function fn() {
    return Promise.resolve(10)
}

fn().then(r => console.log(r))

async function fn2(){
    return 5
}
fn2().then((result)=> console.log(result))

function sum(a,b){
   return new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(a+b)
    },2000)
   }) 
}
async function fn3(){
    // sum(123,456)
    //     .then(r => sum(r, 8))
    //     .then(r => sum(r, 9))
    //     .then(r => console.log(r))
    try{
        let result = await sum(123,456)
        result = await sum(result, 8)
        result = await sum(result, 9)
        console.log(result)
    }catch(e){
        console.log('出错了')
    }
}
fn3()