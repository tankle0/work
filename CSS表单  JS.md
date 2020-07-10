# Form表单

## `<form>`标签

表单标签的格式:

`<form action＝"url" method=get|post name="myform" ></form>`

- name：表单提交时的名称
- action：提交到的地址
- method：提交方式，默认为get

## 表单控件

每个表单元素都可以定义一个`name`属性，指定控件的名称。当提交信息时，会作为区分用户所填数据的标识发送给后台。

**单行文本输入框**

`<input type="text" name="user" value="请输入用户名" />`

// value属性: 输入框的值

**密码输入框**

`<input type="password" name="pwd" value="" />`
// value属性: 输入的密码

**单选按钮**

`<input type="radio" name="sex" value="0" checked/>`
`<input type="radio" name="sex" value="1"/>`

// 约定: 0代表男,1代表女
// 性别选择 name属性必须相同
// value属性 选中单选框的值
// checked 单选框是否被选中

**复选框**

`<input type="checkbox" name="like" checked value="0"/>`
`<input type="checkbox" name="like" value="1"/>`
`<input type="checkbox" name="like" value="2"/>`

// 约定: 0代表篮球,1代表足球,2代表排球      文字可能丢失
// value属性: 选中的复选框的值
// checked 是否被选中

<u>**与span标签嵌套使用**</u>



**文件上传**

`<input type="file" name="file"/>`

- form表单的method属性值要为post

- form要加enctype="multipart/form-data"属性，这个属性说明了我们的文件以二进制方式传输文件

  

**下拉框**

`<select name="city">
	<option value="1">北京</option>
	<option value="2">上海</option>
	<option value="3" selected>广州</option>	
</select>`

// value属性用来给<option>指定的那一个选项赋值   约定1是北京...
// selected 是否被选中    选中的被显示出来



**多行文本输入框**

`<textarea name="text" id="" cols="30" rows="10"></textarea>`

// rows:文字区块的宽度
// cols:文字区块的高



**提交按钮**
`<input type="submit" value="提交"/>`

**普通按钮**
`<input type="button"/>`

**重置按钮**
`<input type="reset" value="重置"/>`

> 对于以上按钮, value:指定按钮上显示的文字

**图片按钮**
`<input type="image" src="URL"/>`  src  路径



**`<label>`标签**

用户不用非得点击到按钮，而是点击文字即可选中       

`<label for="pwd">记住密码</label>
<input type="checkbox" name="pwd" id="pwd" />`       <u>**for   的标签名与  input   的 id名相同**</u>

`<form>
	<label for="male">Male</label>
	<input type="radio" name="sex" id="male" />
</form>`

// <u>**<label>标签一般和radio、checkbox类型一起使用。**</u>



# 表单补充属性

`get` 提交

- 	参数被放到地址提交，比如: /D:/abc?username=张三&pwd=123&sex=0&experience=0
    	不安全

- ​	地址栏拼接的参数长度有限，一般是<4k

​     ***一般用于获取数据***

`post` 提交

- 	地址栏不显示提交内容，再请求体显示
    	相对安全

- 提交的数据量没有上限

   ***一般用于提交保存数据***

**`disabled` 禁用**
**`readonly` 只读**
**`placeholder` 占位符提供可描述输入字段预期值的提示信息**
**`autofocus` 元素应该自动获得焦点**



# H5新增input类型

**电子邮件类型**
功能描述：输入E-mail地址的文本框
语法：`<input type="email"/>`
注意：输入的内容中必须包含"@"，"@"后面必须具有内容

**搜索类型**
功能描述：输入搜索关键字的文本框
语法：`<input type="search"/>`

**URL类型**
功能描述：输入WEB站点的文本框
语法：`<input type="url"/>`
注意：输入的内容中必须包含`"http://"`，后面必须有内容

**颜色类型**
功能描述：预定义的颜色拾取控件
语法：`<input type="color"/>`

**数字类型**
功能描述：只能接受数字
语法：`<input type="number"/>`
属性：min：当前域能接受的最小值; max：当前域能接受的最大值; step：决定了域所接受值递增或递减的步长，默认为1



# JavaScript

`<script>`

`</script>`

**书写位置  :**

内部位置  :  head   /   body 中(在所有标签后面)  ;

外部引入  :  `<script  src = '   '  >  `      `</script>`       也可在head    body   中进行引用  ;





页面显示信息:  

`alert('hello');`   弹出提示内容   边解析边执行      **点击后,后面的语句才执行;**

`prompt('请输入内容');`   弹出输入框  ;

`console.log('  b  ');`   控制台中显示   b  变量的信息;    **用于代码调试;**



**变量  :**   储存数据的容器,用来表示数据;   **变量需先声明后使用;**

**字面量 :**  数字    字符串(实在的数值);     **数字或其他内容加   "   "  表示字符串**



**var    关键词   声明变量**

#### 变量命名规则 

1. 字母  数字   下划线_     $   ;
2. 严格区分大小写  ,大小写为两个变量  ;
3. 不能以数字开头  ;
4. 不能使用  JS  中的关键字 保留字  (  var   this   ....)   ;
5. 驼峰命名   :      firstName    第二个单词首字母大写   ;
6. 语义化   见名知意  ;



**console.log( ' a ')**  打印的是字母  a   ;

**console.log(  a  )**  打印的是变量  a  代表的数  ;



#### JS 数据类型

##### 基本数据类型

1. 数字  数字类型   number   类型
2. 字符串   ' 你好 '   string  类型 
3. 布尔值   只有true 和  false  判断程序走向  
4. undefined    var  a ;   只声明变量  没有赋值  初始值是  undefined  
5. null   空对象   

##### 引用数据类型

数组 :  [  ]  空数组   数组元素需用逗号隔开    表示一类数据的集合  

对象 :  把实际的事物抽象成对象   object       数组也属于对象 (object)

函数 :  封装好的一段功能代码  function say (  ) {  }



typeof  运算符      用来检测数据类型

typeof  +  变量名     console.log( typeof  a )  打印 a 变量的数据类型

`typeof Infinity`的返回结果是 number  

`typeof NaN`的返回结果是 number



**字符串类型**

*<u>字符串需用引号引起来  单双引号都可以  但不能混用</u>*

*<u>引号不能嵌套  单双引号可以嵌套</u>* 

转义字符   \ 

- `\"` 表示 `"`
- `\'` 表示 `'`
- `\n` 表示换行
- `\r` 表示回车
- `\t` 表示制表符
- `\b` 表示空格
- `\\` 表示`\`



**数字类型**

整数  小数    无穷大  infinity    负无穷大   -infinity

特殊数字   NaN     typeof  NaN    ===>  number     **NaN  与任何值都不相等  包括NaN 本身**

isNaN(  )  用来判断括号里面的结果是不是NaN  是 返回true   不是返回  false





#### 数据类型转换

**隐式转换规则**

**其他数据类型转字符串**

 **string  类型**       变量  +  "  "      var  a =11;  console.log(a+'al'); ===> 11al     string  类型   console.log(string(undefined));  ==> 字符串undefined

**tostring  类型**      undefined  null  无此类型

 **其他数据类型转Number** 

字符串转数学

- 1.字符串中是纯数字，直接转换为数字
- 2.字符串中有非数字的，转换为 NaN
- 3.字符串是一个空串或者是一个全是空格的字符串，转换为 0。



布尔值转数字 

- true 转成 1
- false 转成 0

null  转换为数字  0      undefined  转换为数字   为NaN

**pareInt(  )   字符串转为整数**   **将字符串中的有效的整数内容转为数字**

 1.<u>只保留字符串最开头的数字  后面补上数字的内容自动消失</u>     <u>从第一个非空白字符（空格、换行、tab）开始转换，直到遇到一个非数字字符为止</u>

2.带有截断小数的功能：**取整，不四舍五入**

```javascript
var a = parseInt(5.8) + parseInt(4.7);
console.log(a); //9
```

```javascript
var a = parseInt(5.8 + 4.7);
console.log(a); //10
```

3.非 String类型使用 parseInt()或 parseFloat()，它会先将其转换为 String然后再操作



**pareFloat(  ) 字符串转为浮点数(小数)   获取字符串的小数部分**



**其他数据类型转Boolean** 

- 数字 --> 布尔。除了0和NaN，其余的都是true。
- 字符串 ---> 布尔。除了空串，其余的都是true。
- null和undefined都会转换为false。
- 对象也会转换为true。





## 算数运算符



加   +        减    -         乘   *       除     /          取余  %    100%15  取余数  10  

**有NaN  参与的运算都为  NaN**  

+左右有字符串会进行拼接 ,  无字符串会进行运算      b   =  b  +  1  ====>   b  +=  1    ===>  b++

加其他不是1的数  不能简写   可写成   b  +=  5

**++   在后   先赋值   后++**   

var  d =30;

var sum=d++;

console.log(d); ===>  d=31

console.log(sum); ===> sum=30

​     

**++  在前  先++   后赋值**

var  d =30;

var sum=++d;

console.log(d); ===>  d=31

console.log(sum); ===> sum=31



## 比较运算符



 <           >           >=           <=          ==            !=

**比较运算结果只有两种  true   flase**

**非数字比较时,先转换成数字再进行比较**

如果比较的两侧都是字符串,不会转换为数字进行比较,比较的是Unicode  编码    

console.log('53'>'123')   ===>  true   undefined==null    ==> true

console.log(null==0)   ===>  flase  特例    

===   严格相等     不会进行隐式转换     "6" ==6     true         "6"===6   flase 





## 逻辑运算符



&&  与   两个都为真    结果为真      **属于短路   与      如果第一个值为flase  不会看第二个**

||  或   一个为真    结果为真

|   非   取反



**与运算符遇到假就停    或运算符遇到真就停 **



非布尔值的与或运算  :  先转换为布尔值  再运算  返回结果是原值

console.log(5&&6);   ===>   true&&true  ===>   6;

console.log(0&&6);   ===>   flase&&true  ===>   0;



## Math对象

**绝对值  Math.abs(  )**  console.log(Math.abs(-5))   ===>   5

**向上取整  Math.ceil(  )    (天花板函数)  取大值**    console.log(Math.ceil(2.3))   ===>   3

**向下取整Math.floor(  )    (地板函数)  取小值**   console.log(Math.floor(2.9))   ===>   2

**取大值 Math.max(  )**   console.log(Math.max(1,3))   ===>   3

**取小值 Math.min(  )**   console.log(Math.min(1,3))   ===>   1

**次方Math.pow(  )**  console.log(Math.pow(3,5))   ===>   3 的 5 次方

**开方Math.sqrt(  )**   console.log(Math.sqrt(3,2))   ===>   对3 开方

**四舍五入Math.round(  )**   console.log(Math.round(2.3))  ===>  2        -2.3 ===>  -2    2.9 ===>  3   -2.9  ===>  -3

**正数四舍五入  负数五舍六入**  -2.5 ===>  -2    2.5 ===>   3

**随机数 Math.random(  )**  生成[0,1)  之间的随机数    Math.floor(Math.random()*100)     [0,99]  范围的整数

**随机范围内的整数**     **Math.floor(Math.random( )*个数) + 最小值**     

[5,10]  内的整数  Math.floor(Math.random( )*6 + 5





## Date对象

var <u>nowDate</u> = new Date( );生成的对象中取当前的时间信息

年  var year= <u>nowDate</u>.getFullYear( )

月  var month= <u>nowDate</u>.getMonth( ) + 1     [0,11]

日  ......    <u>nowDate</u>.getDate( )

小时    ........  <u>nowDate</u>.getHours( )

分钟     .......  <u>nowDate</u>.getMinutes( )

秒  .......   <u>nowDate</u>.getSeconds( )

毫秒  .......   <u>nowDate</u>.getMilliSeconds( )



时间戳    get Time( )

**拼接字符串**     2019 年 3 月 23 日    21时 43 分 40 秒

var str = year+'年'+month+'月'+day+'日'+.......

var str = 2019 年 3 月 23 日    21时 43 分 40 秒    (将里面的数字替换成  '+year+'    '+month+' ...)



## 条件判断语句

选择结构  if语句    switch语句

**if(  )  具有隐式转换的功能    如果不是布尔值  会转换成布尔值**       **跳楼现象 :   多分支语句, 满足一个,后面不执行**

条件分支语句   if() {}   else{}

多分支语句  if(条件1) {}           else if(条件2 ) {}          else{} 

​                                                    1不满足  2满足          都不满足



三元运算符   if(){}else{}  的简写

条件表达式? 代码1:代码2;       num>=20? 5.9:6;



switch语句   条件分支语句    适用于数值少的    需挨个列出来     遇到break 就结束

switch( ){

case      ;

break;

}





#### for循环

先执行代码   后++ (执行步长)

1-100之间所有整数  

for(var i=1;i<=100;i++)

{console.log(i);}



#### while 循环 

1-100之间所有整数  

var i=1; 

while(i<=100){

console.log(i); 

 i++;

}



#### do...while  循环

1-100之间所有整数  

var i=1; 

do{

console.log(i); 

i++;

}while(i<=100)

第一个条件不符合  do   while 会执行一次     **先执行后判断**



break  可以退出switch语句  也可以退出循环

continue  可以退出循环    退出当次循环  符合就不再执行下面代码       代码优化

1-100被7被3整除的1个数 

for(var i = 1;i<=100;i++){

if(i%7===0&&i%3===0){

console.log(i);

break;}

}



**for循环嵌套    内层循环执行完毕 外层开始循环     (外层一次  内层一遍)**

 

## 数组



[  ]里面可以有多个元素,需用逗号隔开

数组里面套数组  为二维数组

创建数组:

1. new Arrway(  )       var arr= new Arrway( 5 )   数组有5个元素  每个元素都是空的

2. 字面量直接创建   var arr = [2,3,4,]     var  new Arrway = (2,3,4)



length  数组的元素个数

**数组中的元素都有对应的编号  从0开始   称为索引  通过索引可对元素位置进行修改**

var arr = [2,3,4,]    arr[2] = 89   ===>   arr[2,3,89]

**若往数组中添加的元素编号造成原数组成非连续数组,则会用empty填充**

**从数组中删除最后一个元素  arr.length = arr.length-1**



通过for循环遍历数组元素

for(i = 0;i<=arr.length-1或者i<arr.length;i++)



### 数组的基本方法



**push(  )   在数组最后一位添加一个或多个元素  执行完功能后会返回一个值  需用变量接收**  **返回的是新数组的长度**

arr.push(  )   ===>    var result = arr.push(  )

**unshift(  )  在数组最前面添加元素**    **返回的是新数组的长度**

arr.unshift(  )   ===>  var result = arr.unshift(  )

**pop (  )   删除最后一个元素   返回结果为被删除的元素**

**shift(  )   删除最前面一个元素   返回结果为被删除的元素**

**concat(  )  连接两个或多个数组 (逗号隔开)  需用一个新数组接收结果 **    **不改变原数组**

var nameArr1 = [1,2,3];

var nameArr2 = [4,5,6];

var newArr = nameArr1.concat(nameArr2);

**join(  ) 将数组转换为字符串   返回值为转换后的字符串       不改变原数组**   **不指定连接符 默认逗号隔开** 

**与to String(  ) 效果一致**

**split(  )  把字符变为数组    返回值是数组的最大长度**    **不改变原数组**    split(' ; ',2)





### 冒泡排序

两个元素交换位置 需新增一个变量保存其中一个元素

var temp= arr[i];

arr[i] = arr[i+1];

arr[i+1]=temp;



for(var i = 1;i<=arr.length-1;i++){

   	 for(var j=0;j<arr.length-i;j++){

​      				if(arr[i]>arr[i+1]){

​						var temp= arr[i];

​						arr[i] = arr[i+1];

​						arr[i+1]=temp;

​					}

​		}

}



## 函数

封装了常用的功能代码  便于重复使用

function say(  ){

}   具名函数   say 为函数名

function(  ){

}  匿名函数   需用变量接收    var  lest = function(  ){   }

调用函数    say(  )       lest (  )

立即执行函数 ( 自执行函数 )  创建函数时 就会执行一遍   

(function(  ){   }) (  )



函数的参数   

**实参**  实际带入进去的参数

**形参**  给实参占位

**形参比实参个数多   多余的形参不会被赋值   undefined**

**形参比实参个数少  多余的实参不会赋值  不参与运算**



#### 函数的返回值    

函数里面声明的变量在函数外部无法使用   

函数的执行结果若需要在外部使用,需用return把结果丢出    外部需要变量接收

return 后面的代码无法执行   一般把return写在最后    **一个函数只能存在一个return**

function  foo(  ){

}

console.log(foo)     打印函数本身

console.log(foo( ))  打印的是返回值     undefined

**作用域**     函数的作用范围(全局作用域  函数作用域)

全局变量   页面任何位置都能使用   

 局部变量   只能在函数内部使用



**作用域的上下级关系**   在函数作用域中操作变量时,会先在自身作用域中寻找,有就直接使用(就近原则)  没有则向上一级作用域中寻找,直到找到全局作用域,若还是没有,报错

**两个函数中有相同变量 互不影响**

**变量的声明和提升**   使用var 关键词声明变量 会在所有代码执行前被声明 但不会被赋值

**function 声明的具名函数会被提升  匿名函数不会被提升 不能在声明前调用**