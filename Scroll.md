## scroll家族

### scrollWidth    scrollHeight

检测盒子的大小  box.scrollWidth / scrollHeight  = 元素宽度/高度  +  padding

内容超出     box.scrollWidth / scrollHeight = 显示超出内容的大小  +  padding

如果元素内容超出盒子  盒子存在padding

1. 盒子有overflow : auto/hidden/scroll    盒子宽度  = 内容宽度 + 左padding   盒子高度 = 内容高度 + 上下padding
2. 盒子没有overflow: auto/hidden/scroll  盒子宽度= 内容宽度 + 左padding   盒子高度 = 内容高度 + 上padding

### scrollTop   scrollLeft

目标元素存在滚动条   scrollTop   scrollLeft  可以 **获取和设置** 元素卷入页面的尺寸  **赋值时不加单位**

#### 浏览器兼容

没有doctype 声明的页面可以使用 **document.body.scrollTop** 获取

有doctype 声明的页面使用 **document.documentElement.scrollTop**  获取

**window.pageYOffset/pageXOffset**  页面卷入的高度/宽度

#### 兼容写法

```
var top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset

var left = document.documentElement.scrollLeft || document.body.scrollLeft ||window.pageXOffset
```



### onscroll事件

元素的滚动条滚动时触发的事件  **元素有滚动条才可使用**

box.onscroll = function( ){  }

#### window 滚动方法

window.scroll(x , y )    window.scrollTo( x , y  )

window滚动条滚动到设定的 x  y 的位置  不会叠加

window.scrollBy( x , y  )  

window 滚动条 从当前位置再滚动到  x  y 位置   会叠加



#### 网页顺滑滚动  smooth

```
window.scroll({

		top:  xx, //没有单位

		left: xx,

		behavior: "smooth"/ "instant" /"auto"   默认 auto

})
```



### 函数防抖  节流

**指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。即一段时间内多次触发同一事件，只执行最后一次，或者只是在开始时执行一次，中间不执行。**

#### 防抖  debounce

**非立即执行:**

```
 //等待时间   一段时间内多次触发同一事件，只执行最后一次，
 function debounce(fun, wait) {  //fun  为函数  wait 等待时间
       var timer;
       return function () {  //使用在鼠标移动或滚动的场景  box.onmousemove/window.onscroll
             if (timer) {
                 clearTimeout(timer);
             }
             timer = setTimeout(function () {
                 fun();
             }, wait)
       }
 }
 
 //box.onmousemove / window.onscroll 后面配合函数使用  所以 函数内部需要  return 出一个函数 给box.onmousemove / window.onscroll 使用
 
 eg:
 var count = 0;
 box.onmousemove = debounce(function(){
 		//里面写函数内执行的内容
 		boxEl.innerText = ++count;  //box 里面的数累加
 },1000/60)
```

**立即执行:**

```
// 进去立即执行  在开始时执行一次，中间等待时间不执行
function debounceNow(fun, wait) {
            return function () {
                if (!fun.timer) {
                    fun();
                } else {
                    clearTimeout(fun.timer);  //在wait时间段内还存在定时器
                }
                fun.timer = setTimeout(function () {
                    fun.timer = null;
                }, wait)
            }

        }
```

**区别**：

非立即执行的意思是触发事件后函数不会立即执行，而是在 n 秒之后执行，如果在 n 秒内又触发了事件，则会重新计算函数的执行时间。

立即执行的意思是触发时间后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。



### 函数节流 throttle

规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

**时间戳:**

```
  // 开始进去不执行  不触发就不执行  触发后立即执行
        function throttle(fun,wait){
            // 获取现在的时间
            var start = Date.now();
            return function(){
                // 判断点击时与设置时的时间差是否大于定时器的时间(上一次函数执行的时间)
                if(Date.now() - start > wait){
                    fun();
                    start = Date.now();

                }
            }
        }
```

**定时器:**

```
// 定时器版  开始进去就延迟执行 不触发就不执行 再触发时还是延迟执行
        function throttleTi(fun,wait){
            return function(){
                if(!fun.timer){
                    fun.timer = setTimeout(function(){
                        fun();
                        fun.timer = null;
                    },wait)
                }
            }
        }
```

时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。



### 技巧

**可直接在标签内添加 hidden 属性 默认隐藏**

```
<div class="box" hidden>返回顶部</div>  
修改 hidden  属性使用  box.hidden = false/true
```

**获取  标签有  section名   且与事件触发(点击)元素相同的class属性名的其他元素**

```
 var targetEl = document.querySelector(".section." + event.target.className);
```

**鼠标滚动的缓动动画**

```
		// 缓动动画
        function slow(target){
            // 判断是否在终点
            if(window.pageYOffset === target){
                return;
            }
            // 防止定时器冲突
            if(window.timer){
                clearInterval(window.timer);
            }
            // 设置定时器
            window.timer = setInterval(function(){
                var start = Math.ceil(window.pageYOffset);
                var step = (target-start)/10;
                if(Math.abs(step)<1){
                    step = step > 0 ? 1 : Math.floor(step);
                }
                document.documentElement.scrollTop = start + step;
                if(start + step === target){
                    clearInterval(window.timer);
                    window.timer = null;
                }

            },1000/60)
        }
        
        	// 原生方式
            window.scroll({
                 top:targetEl.offsetTop (滚动的终点),
                 behavior: "smooth",
            })
```

### window.pageYOffset;

**获取的不是整数 需要取整   Math.ceil( window.pageYOffset )**

