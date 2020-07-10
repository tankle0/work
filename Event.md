## 事件对象 Event

事件触发会生成事件对象 event  event对象是跟事件对象相关的数据集合

### 事件对象常用的属性

event .type 事件类型

event .target  触发事件的目标元素   (真正原因)

event . currentTarget 绑定事件的目标元素  相当于绑定的事件处理函数中的 `this`

event . pageX/Y  触发事件时鼠标距离页面的左/上边距

event . offsetX/Y  触发事件时鼠标距离触发事件的元素的内填充边（padding edge）在 X/Y 轴方向上的偏移量。

鼠标相对于绑定事件的元素的位置  =  event.pageX/Y  -  绑定事件元素.offsetLeft/offsetTop

### 元素拖拽  鼠标跟随案例

鼠标居中 需减去自身高度/宽度的一半

元素拖拽 需绑定两个事件   

1.要拖拽的元素绑定  onmousedown

2.移动时  在内部 给  window / 拖拽的元素  绑定移动事件  onmousemove

```
		//鼠标跟随
		var boxEl = document.querySelector(".box");
		addEventListener("mousemove", function () {
            // 盒子的左/上边距等于鼠标的位置  鼠标居中需减去盒子自身宽度/高度的一半
            boxEl.style.left = event.pageX - boxEl.offsetWidth/2 + "px";
            boxEl.style.top = event.pageY - boxEl.offsetHeight/2 + "px";
        })
```

```
		//元素拖拽
		//第一种
		var boxEl = document.querySelector(".box");
        boxEl.addEventListener("mousedown",function(){
            // 鼠标按下时获取盒子与页面的距离
            var startLe = boxEl.offsetLeft;
            var startTo = boxEl.offsetTop;
            // 鼠标按下时获取鼠标与页面的距离
            var mouseX = event.pageX;
            var mouseY = event.pageY;
            window.onmousemove = function(){
                // 移动后鼠标相对原来的位置
                var targetX = event.pageX - mouseX + startLe;
                var targetY = event.pageY - mouseY + startTo;
                boxEl.style.left = targetX + "px";
                boxEl.style.top = targetY + "px";
            }

        
			//第二种
            // 获取鼠标与元素之间的距离
            var relX = event.pageX - boxEl.offsetLeft;
            var relY = event.pageY - boxEl.offsetTop;
            window.onmousemove = function(){
                var targetX = event.pageX - relX;
                var targetY = event.pageY - relY;
                boxEl.style.left = targetX + "px";
                boxEl.style.top = targetY + "px";
            }
        })

        boxEl.onmouseup = function(){
            // 鼠标离开时解绑事件
            window.onmousemove = null;
        }
```



### 限定边界的移动

在元素拖拽的基础上进行判断

**1.给出限定条件**

**父元素没有定位时**

最小距离X =  父元素.offsetLeft

最小距离Y = 父元素.offsetTop

最大距离X = 父元素.offsetWidth - 拖拽元素.offsetWidth + 最小距离X

最大距离Y = 父元素.offsetHeight - 拖拽元素.offsetHeight + 最小距离Y

**父元素有定位时**

最小距离X =  0

最小距离Y = 0

最大距离X = 父元素.offsetWidth - 拖拽元素.offsetWidth 

最大距离Y = 父元素.offsetHeight - 拖拽元素.offsetHeight 

**2.鼠标按下时获取鼠标与元素之间的距离**

mouseX = event.offsetX

mouseY = event.offsetY

**3.内部移动时 找终点位置**

**父元素无定位时**

targetX = event.pageX - mouseX

targetY = event.pageY - mouseY

**父元素有定位时**

targetX = event.pageX - mouseX - 父元素.offsetLeft

targetY = event.pageY - mouseY - 父元素.offsetTop

**4.进行判断**

<= 最小距离X      targetX = 最小距离X

`>=最大距离X    targetX = 最大距离X

< =最小距离Y     targetY = 最小距离Y

`>=最大距离Y    targetY = 最大距离Y

**5.赋值给拖拽元素  进行移动    (加单位)**

拖拽元素.style.left = targetX + "px"

**6.鼠标松开 绑定事件  onmouseup** 

window.onmousemove = null

```
		//限定边界的移动
		var boxEl = document.querySelector(".box");
        var conte = document.querySelector(".content");
        // 父类没有定位时
        // var minX = conte.offsetLeft;
        // var minY = conte.offsetTop;
        // var maxX = conte.offsetWidth + minX - boxEl.offsetWidth;
        // var maxY = conte.offsetHeight + minY - boxEl.offsetHeight;

        //父类有定位时
        var minX = 0;
        var minY = 0;
        var maxX = conte.offsetWidth - boxEl.offsetWidth;
        var maxY = conte.offsetHeight - boxEl.offsetHeight;

        boxEl.onmousedown = function(){
            // console.log(0)
            // 获取鼠标与元素之间的距离
            // 父类没有定位时
            // var mouseX = event.pageX - boxEl.offsetLeft;
            // var mouseY = event.pageY - boxEl.offsetTop;

            // 父类有定位时
            // var mouseX = event.pageX - conte.offsetLeft;
            // var mouseY = event.pageY - conte.offsetTop;
            var mouseX = event.offsetX;
            var mouseY = event.offsetY;
            

            window.onmousemove = function(){
                // console.log(0)
                // 父类没有定位时
                // var targetX = event.pageX - mouseX ;
                // var targetY = event.pageY - mouseY ;

                // 父类有定位时
                var targetX = event.pageX - mouseX - conte.offsetLeft;
                var targetY = event.pageY - mouseY - conte.offsetTop;

                // 判断X Y方向的最小值和最大值
                if(targetX <= minX){
                    targetX = minX;
                }else if(targetX >= maxX){
                    targetX = maxX;
                }
                if(targetY <= minY){
                    targetY = minY;
                }else if(targetY >= maxY){
                    targetY = maxY;
                }

                boxEl.style.left = targetX + "px";
                boxEl.style.top = targetY + "px";
                
            }
        }
        
		//鼠标松开
        boxEl.onmouseup = function(){
            window.onmousemove = null;
        }
```



### 放大镜案例

放大后的图片需与原图片保持同步运动    图片放大的比例  与 遮罩层大小及 移动路程  保持一致



### 阻止冒泡/阻止事件默认行为

阻止冒泡

event.stopPropagation(  )

兼容写法

`event.stopPropagation?event.stopPropagation():event.cancelBubble = true`

阻止默认行为

event.preventDefault( )

兼容写法

`event.preventDefault?event.preventDefault():event.returnValue = false`

### 事件委托

通过监听 **父元素**，给不同的子元素绑定事件，减少监听次数，从而提升速度
由于事件的冒泡机制,可以使用事件委托的方式给元素添加事件,多用于 ul 监听事件更改 li 的情景

```
        var lis = document.querySelectorAll("li");  //获取的不是动态更新的
        var lis = document.getElementsByTagName("li")  //最新生成的 li 也可获取到
        //点击时添加 li 里面数字跟着增加
        bn.onclick = function(){
            var lie = document.createElement("li");
            lie.innerText = `li-${lis.length + 1}`;  //字符串拼接 可用反选号 `
            ulEl.appendChild(lie);
        }
```

### closest

`Element.closest()` 方法用来获取：匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。如果匹配不到，则返回 `null`。 换句话说，方法 closest 在元素中检查每个父类。如果与选择器匹配，则停止搜索并返回祖先。IE不支持此方法

```
			ulEl.onclick = function(){
            // 点击的是哪个 li   closest()  获取的是符合条件的父类或者自己  此处指li
            var tar = event.target.closest("li");
            // 判断元素的标签名是否是li  判断标签名时必须用大写   
            if(tar && tar.tagName === "LI"){
                tar.style.backgroundColor = "red";
            }
```



### 技巧

**1.  ~  : 取反后 - 1       ~~ +整数   为自身      ~~1.9 ==> 1   ~~1.2 ==> 1    ~~-1.2 ==> -1    ~~-1.9 ==> -1**

**2**.  可在行内设置  data-xx  属性   通过   dataset.xx  获取设置的  data  属性值  

**3. ** 拼接字符串

```
lie.innerText = `li-${lis.length + 1}`;  //字符串拼接 可用反选号 ` ${ } ` 
lie.innerText = "li-"+(lis.length + 1) +""   //或者使用 " ++ "
```

**4.**   判断元素的标签名

​     判断元素的标签名是否是li    判断标签名时必须用大写   
​            if(tar && tar.tagName === "LI")

