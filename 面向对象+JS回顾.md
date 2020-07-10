## 对象

JSON对象 : 是对象的字符串表示  用双引号包裹 key / value 值

```
			var obj = {
                name: "张三",
                ["age"]: "90",
                "flex": "男"
            }
            var newobj = JSON.stringify(obj);   // 对象转为JSON字符串
            console.log(newobj)   //{"name":"张三","age":"90","flex":"男"}
            var last = JSON.parse(newobj);  //JSON字符串转为对象
            console.log(last) //{name: "张三", age: "90", flex: "男"}
```

##### 判断属性是否在对象中

```
			function juge(obj ,old){
                // return !(obj.old === undefined);
                return typeof(obj.old) === "undefined";
            }
```

##### 删除对象中的属性

```
   方法1:	  var obj = {
                name: "张三",
                ["age"]: "90",
                "flex": "男"
            }
            //删除对象中的属性
            function dele(obj, key){
                var newObj = {};
                for(var i in obj){
                    if(i !== key){
                        newObj[i] = obj[i];
                    }
                }
                return newObj;
            }
            var ul = dele(obj,"age");
            console.log(ul)  ===> {name: "张三", flex: "男"}
            
   方法2: delete obj.name
```

### 克隆对象

##### 数组的克隆

浅克隆  指向同一个堆地址，改变一个值，另一个跟着改变

深克隆  不指向同一个堆地址，改变一个值，另一个不跟着改变

```
				var arr = [1,2,3,6,2,8,5];
				var arr1 = [];
			    for (var i = 0; i < arr.length; i++) {
			  		arr1.push(arr[i]);
			    }
			    
			    
            	var arr1 = arr.slice();
            	
            	
            	var arr1 = [].concat(arr);  //与空数组合并 也是克隆
            	
            	var arr3 = [...arr]  //es6 新增的复制属性
```

##### 对象的克隆

```
	方法1:	 var obj1 = {};
			   for( var i in obj ){
			  		obj1[i] = obj[i];
			   }
			   
	方法2:   	 var obj1 = JSON.parse(JSON.stringify(obj));  //先转为JSON字符串再转为对象  若里				  面有function  会丢失
			   
	方法3:      使用Object.assign 来拷贝对象
				Object.assign(dest[, src1, src2, src3...])
				参数 dest 和 src1, ..., srcN（可以有很多个）是对象。
				这个方法复制了 src1, ..., srcN 的所有对象到 dest。换句话说，从第二个参数开始，所有对象					的属性都复制给了第一个参数对象，然后返回 dest
				如果接收的对象已经有了同样属性名的属性，前面的会被覆盖
				
				var obj3 = {
                	name: "zhnagsi",
                	age: "25",
               		friends:{
                    name: "chenxiao"
                	}
           	    }

            	var obj4 = {friends:{name:"lisihuai"}};
            	var obj5 = Object.assign({},obj3);
            	var obj6 = Object.assign({},obj3,obj4);
            	console.log(obj5)  =====>  //跟obj3一样
            	console.log(obj6)  =====>  // obj3中的friends内容被替换成obj4中的内容
            	
    方法4:       //递归思想解决对象深复制
        		function clone(obj) {
            	if (obj === null) {
            	    return null;
            	}
            	var newobj = obj instanceof Array ? [] : {}; //判断obj的类型 数组还是对象
            	for (var i in obj) {
            	    if (typeof obj[i] === "object") { //判断每一个属性值是否是对象
            	        if(obj instanceof Array){
            	            newobj.push(clone(obj[i]));
            	        }else{
            	            newobj[i] = clone(obj[i]);
            	        }
            	    }else{  //如果属性值不是对象   直接添加
            	        if(obj instanceof Array){
            	            newobj.push(obj[i]);
            	        }else{
            	            newobj[i] = obj[i];
            	        }
            	    }
	
            	}
            	return newobj;
       			}        	
```

### 函数

##### 立即执行函数

```
			//立即执行函数

            //具名函数
            (function add(){
                console.log(a+b);
            })();

            (function add(){
                console.log(a+b);
            }());

            +function fn4(){   // -function 也行
                console.log(a+b);
            }();

            //匿名函数
           var fn =  (function(){
                console.log(a+b);
            }());

            var fn1 = (function(){
                console.log(a+b);
            })();

            var fn3 = function(){
                console.log(a+b);
            }();
```

##### 递归函数

```
			function jc (n) {
				if(n === 1){
					return 1;
				}
				return n * jc(n-1);
			}
			
			// 1 1 2 3
			function fb(n){
				if( n === 1 || n === 2){
					return 1;
				}
				return fb(n-1) + fb(n-2);
			}
```

函数的参数      :     实参      形参  ==>  给实参占位  

​			形参数 > 实参数  =>  多余的形参会是 undefined

​           形参数 < 实参数  =>  多余的实参会丢失，arguments  实参的集合  callee()相当于调用自身

​		   arguments.callee(5,8)    //不断调用自身

#### 上下文对象

"use strict";    严格模式

1.进入某个环境   先找变量声明和函数声明

2.顺序执行语句  为其赋值   先声明提升 后赋值

3.函数提升 先与变量提升

```
					  var foo = 9;
                      function bar (){
                          if(!foo){
                               var foo = 99;  //foo 声明提升 为undefined
                           }
                            alert(foo);   ==> 99
                       }
                       bar();
                       
                       
                    var a = 1;
                    function b(){
                        a = 10; //改的是a()的a值  与外面的a无关
                        return;
                        function a(){  //声明提升  

                        };
                    }
                    b();
                    alert(a);  ===>  1
                    
                    
                    function foo(){
                        console.log(a);  //函数a
                        var a = 20;
                        b();
                        function a(){};  //先提升
                        function b(){
                            var a = 10;
                        }
                    }
                    foo();
```

