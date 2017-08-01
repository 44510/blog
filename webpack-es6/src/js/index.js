// index.js


// 测试import与moudle
import {log} from './common/common.js'


log('test', '123');

// 测试async.await
var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};

var start = async function () {
    console.log('start');
    await sleep(3000);
    console.log('end');
};

start();



// 测试class
class Person {
	constructor(name, age){
		this.name = name;
		this.age = age;		
	}
	sayName (){
		console.log(this.name);
	}
}

let lilei = new Person('lilei', '20');

lilei.sayName();