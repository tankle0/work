# DOM操作

**DOM:** 文档对象模型  用来操作网页上元素的API(盒子移动, 轮播,变色等)

**DOM树中  一切都是节点  :**

**元素节点:  HTML 标签         主要的DOM操作**  

**文本节点:** 标签中的文字  

**属性节点:** 标签的属性 



#### **DOM操作的三要素:**

**事件源:** 引发后续事件的HTML标签

**事件:** 处理事件源(HTML标签)的一系列  "动作"

**事件处理程序:** 对标签和样式的操作  以达到想要的效果 



**常用的事件:** 

点击事件  onclick

双击事件 ondbclick

鼠标按下 onmousedown

鼠标移动 onmousemove

鼠标抬起 onmouseup

鼠标进入 onmouseenter

鼠标离开 onmouseleave

...........



**DOM操作步骤:**

1.获取事件源

2.事件源绑定事件

3.写处理程序



#### **获取事件源** 

**通过 id 获取    获取的是单个标签( Id是唯一的)**

document.getElementById('  ');

**通过标签名获取  获取的是 '标签数组'** 

document.getElementsByTagName('   ');    **使用时需在最后添加[0]      取数组中第一个;**

===> document.getElementsByTagName('   ')[0];  

**通过class名获取  获取的是 '标签数组'**

document.getElementsByClassName('   '); **使用时需在最后添加[0]      取数组中第一个;**

===> document.getElementsByClassName('   ')[0];  



**通过标签名和class名获取的事件源为数组   可以使用for循环进行遍历**



#### 绑定事件方式  

**绑定匿名函数**

box.onclick = function( ) {   }

**行内绑定    可以传参数**

< p  class="p1" onclick = "foo( )" >           < /p >

var p1 = ......

function foo ( ) { 

​    p1.style.backgroundColor = " red "    **属性值必须用引号**      **属性名不能用连字符  使用驼峰命名规则**

 }



#### 兄弟节点

获取下一个兄弟节点 ( 包括空格 注释 )  nextSibling    ==>   p. nextSibling

获取下一个兄弟元素节点 ( 标签 )   nextElementSibling   ===>  p.nextElementSibling

获取上一个兄弟节点  previousSibling   

获取上一个兄弟元素节点  previousElementSibling  



**在IE6,7,8浏览器中  节点和元素节点统称为元素节点     可用下面方法避免**

**p.nextElementSibling || p.nextSibling**



#### 父子关系

获取父节点    p.parentNode

获取第一个子元素   p.firstElementChild || p.firstChild

获取最后一个子元素  p.lastElementChild || p.lastChild

获取所有子元素     ul.children ( 常用 )        元素的子元素节点的集合

ul.childNodes     元素的子节点的集合（元素节点、所有属性、文本节点）







**节点类型  nodeType**

nodeType = 1    元素

nodeType = 3    文本

nodeType = 8    注释

**封装函数   获取元素的所有子元素节点**      

先获取所有子元素   声明空数组 

 if ( children[i].nodeType  ===1 )  往空数组里添加



**获取自己后面所有兄弟元素** 

利用 lock = true   

先for循环遍历  

 if ( 等于自己   children ( 所有的子元素)  == el (标签名) )   lock = false  

 if (判断lock)  往空数组添加 





## DOM节点操作

**创建节点**    document.creatElement( ' p ' )

**插入节点**    appendChild( p1 )   插入到最后一个元素      

 insertBefore(  p1, 参考的子节点  )

**多次对同一个元素插入, 只会生效最后一次**

**删除节点**    用到父节点            父节点.removeChild( 子节点 )      

不知道父节点的      pEl.parentNode.removeChild( pEl )

**克隆节点**    复制的节点.cloneNode(  )   带参数 true  复制节点本身 也复制其他子节点

不带参数/带参数false  只复制节点本身



#### 节点的属性操作

box.getAttribute( " class ")       获取box的class属性

box.setAttribute(  "   title  " , "  hello  " )  设置box的title值为 hello

box.removeAttribute( " class" )    删除box的class属性



**增加类名**  

box.classList.add( "active")  box增加active类名

box.classList.remove("active")  box删除active类名

box.classList.toggle("active")  切换active类名   有则删除   无则添加

box.classList.contains( "active" )  检测有无active类名



**获取文本内容**

box.innerText;  获取 box里面的文字内容

box.innerHTML;  获取box里面的HTML结构

box.innerText = "  内容 "   设置box里面的内容



**表单内容操作** 



失去焦点  input.onblur      多选框默认选中  checkbox.checked = true   下拉选择框   box.selected = true

获取焦点 input.onfocus 

onchange  用户改变内容时



**获取DOM元素的新方法**

document.querySelector( ' .box ' )     有多个相同类名的元素,只能获取第一个    **css中的选择器都可以用**

document.querySelectorAll( '.box' )       获取全部类名为box的元素



**自定义属性** 

data-info = "  xxx  "    

获取自定义属性   Node.dataset[ 'info' ]

 data-inset-box = " xxx "    获取时需用驼峰命名   Node.dataset[ 'insetBox' ]



**arguments 对象**  函数的实参对象   保存了传进来的实参信息   只能在函数内部使用  

callee属性  保存了函数本身 

length属性  保存了实参的长度

window.onload  页面加载完成时     当script写在head里面时,可以使用

window.onload = function (  ) {   }



## 事件监听器

**addEventListener  事件监听器**  可以绑定多个事件

box.addEventListener( 'click' ,function( ) {    } ,true/false)

如果存在包含关系 父类也会触发事件   true  代表捕获   false 代表冒泡   默认是false

removeEventListener  移除事件   移除的函数为外部函数 

box.removeEventListener( 'click',foo ) 

function foo(   ){    }



**定时器**

**setTimeout (  )  延迟执行**   

setTimeout ( function (  ) {   } ,5000 )  5000为时间   单位: 毫秒  

**setInterval (   )  循环执行**

setInterval ( function (  )  {   },5000 )   每隔5秒执行一次函数

**clearInterval** ( 定时器名称  )  移除循坏定时器 

**clearTimeout** ( 定时器名称 )  移除延迟定时器



### 立即执行函数

for循环时  解决如何获取当前点击元素的下标

list[ i ] .onclick = ( function ( n ) {  return function (  ) {   } ; } ) ( i ) ;

也可  **增加属性保留 i 的值**  

list[ i ] .index = i ;

list[ i ].onclick = function ( ) { **xx =  this.index**   }



#### 补充  

获取元素的样式  ( 行内样式和样式表共同作用后的结果 )

window.getComputedStyle( box,null ) .getPropertyValue ( ' width/height' )   无需使用驼峰命名

