# client 

#### box.clientWidth / clientHeight

包括   clientWidth  / clientHeight  检测盒子大小 :   自身大小(width/height)  + padding    内容超出不计算;

#### document.documentElement.clientWidth / clientHeight

获取的是浏览器可视区域大小   不包含滚动条大小(滚动条宽度 17)

#### window.innerWidth / innerHeight

获取的是浏览器可视区域的大小   包含滚动条大小

#### window.screen.width / height

获取的是屏幕的大小  (1366 *768 )  屏幕分辨率

#### window.screen.availWidth / availHeight

获取的是屏幕可占用的大小

#### box.clientTop / clientLeft

获取的是内容区域到盒子上左边框的距离 ( 就是  border 的数值 )     内容区域  ( 内容大小 + padding )        

## eg : 任意元素到body 的距离

```
		<div class="container">  //container无定位
            <div class="box">  //box有定位
                <div class="inner"></div>
            </div>
        </div>
        <script type="text/javascript">
            var inner = document.querySelector(".inner");
            var box = document.querySelector(".box");
      //inner距离body 的边距 = 自己距离box的左边距 + box的内容到边框距离(border大小) + box到页面距离
            innerLeft = inner.offsetLeft + inner.offsetParent.clientLeft + inner.offsetParent.offsetLeft;
            console.log(innerLeft)
            console.log(inner.offsetLeft)
            console.log(get(inner));
            console.log(get(box))


            //封装函数  找规律
            function get(ele){
                if(ele === document.body){
                    return {
                        t:0, // 到body 时 上左边距为 0 
                        l:0
                    }
                }
                return {         //(函数传入参数,获得对象里的属性值 不断带入进去循环 直到等于 body)
                t:ele.offsetTop + ele.offsetParent.clientTop + get(ele.offsetParent).t,  				
                l:ele.offsetLeft + ele.offsetParent.clientLeft + get(ele.offsetParent).l,
                    }
            }
```

### window.getComputedStyle(element ,[pseudoElt]).styleName

获取元素内联/ 外联样式

window.getComputedStyle(     )  .styleName

第一个参数   元素名称     第二个参数   伪元素名  有的话用引号添加 "after"  没有写 null  

window.getComputedStyle( box,null ).width  

.box::after{

content: "1545";

}

window.getComputedStyle(box,"after").content    获取伪元素内的内容

#### eg: 获取任意元素的内联/ 外联样式

```
			function common(ele,styleName){
                if(ele.currentStyle){
                    return ele.currentStyle[styleName];  
                    //获取的对象属性名是一个变量或者字符串的时候需要使用[]来获取，不能用 .
                }else{
                    return getComputedStyle(ele,null)[styleName];
                }
            }
            
             console.log(common(boxEl,"width"))  //调用函数时 样式名需加引号
             console.log(common(boxEl,"background-color"))  //连字符或者驼峰命名都可以
```

#### eg: 单一元素的任意属性动画

```
			// 参考缓动动画 改变多个属性  多个属性不能同时生效  因为timer 只有一个 所有需要点击多次
			function slow(ele,target,styleName){
                if(parseInt(window.getComputedStyle(ele,null)[styleName]) === target){
                    return;
                }
                if(ele.timer){
                    clearInterval(ele.timer);
                }
                //透明度 需放大
                if(styleName === "opacity"){
                    target*= 100;
                }else if(styleName === "zindex"){
                    ele.style.zindex = target;    //层级没有动画  直接到达目标值
                    return;
                }
                ele.timer = setInterval(function(){
                    var start;
                    //透明度放大
                    if(styleName === "opacity"){
                        start = window.getComputedStyle(ele,null)[styleName]*100;
                    }else{   
                   	  // window.getComputedStyle( )  得到的是有单位的数值  需用parseInt转为数字
                        start = parseInt(window.getComputedStyle(ele,null)[styleName]);
                    }
        
                    var step = (target - start)/10;
                    if(Math.abs(step) < 1){
                        step = step > 0 ? 1 : Math.floor(step);
                    }

                    if(styleName === "opacity"){
                        ele.style[styleName] = (start + step)/100; //还原放大之前的数值
                    }else{
                        ele.style[styleName] = start + step + "px";
                    }
                    if(start + step === target){
                        clearInterval(ele.timer);
                        ele.timer = null;
                    }
                },1000/60)
            }
```

#### eg: 单一元素的多属性动画

```
 			//改变多个属性  同时生效   利用给每个要修改的styleName 添加 timer 来实现
            function slow(ele,target,styleName){
                if(parseInt(window.getComputedStyle(ele,null)[styleName]) === target){
                    return;
                }
                if(ele[styleName + 'timer']){
                    clearInterval(ele.timer);
                }
                //透明度 需放大  层级没有动画
                if(styleName === "opacity"){
                    target*= 100;
                }else if(styleName === "zindex"){
                    ele.style.zindex = target;
                    return;
                }
                ele[styleName + 'timer'] = setInterval(function(){
                    var start;
                    //透明度放大
                    if(styleName === "opacity"){
                        start = window.getComputedStyle(ele,null)[styleName]*100;
                    }else{
                        start = parseInt(window.getComputedStyle(ele,null)[styleName]);
                    }
        
                    var step = (target - start)/10;
                    if(Math.abs(step) < 1){
                        step = step > 0 ? 1 : Math.floor(step);
                    }

                    if(styleName === "opacity"){
                        ele.style[styleName] = (start + step)/100;
                    }else{
                        ele.style[styleName] = start + step + "px";
                    }
                    if(start + step === target){
                        clearInterval(ele[styleName + 'timer']);
                        ele[styleName + 'timer'] = null;
                    }
                },1000/60)
            }
            
            
            
        //多属性动画  使用对象形式
        function slow(ele, objStyle) {
            ele.timer = setInterval(function () {
                var start;
                var target;
                var flag = true;
                //遍历对象
                for (var i in objStyle) {
                	// i ==> key   属性名
					// styleObj[i] ==> value   属性终点值
                    //透明度放大  起始和终点值都要放大
                    if (i === "opacity") {
                        start = window.getComputedStyle(ele, null)[i] * 100;
                        target = objStyle[i] * 100;
                    } else {
                        start = parseInt(window.getComputedStyle(ele, null)[i]);
                        target = objStyle[i]; //其他情况使用原数值
                    }

                    var step = (target - start) / 10;
                    if (Math.abs(step) < 1) {
                        step = step > 0 ? 1 : Math.floor(step);
                    }

                    if (i === "opacity") {
                        ele.style[i] = (start + step) / 100;
                    } else {
                        ele.style[i] = start + step + "px";
                    }
                    if (start + step !== target) {
                        flag = false;   //如果有一个属性的值没有到达目标值  就不能停止
                    }
                }
                if(flag){
                    //循环结束后进行判断 flag = true 都到达目标值 清除定时器
                    clearInterval(ele.timer);
                    ele.timer = null;
                }

            }, 1000 / 60)
        }
        
        
        //调用时  使用对象形式
        slow(boxEl,{
                    width: 400,  //不能加单位  "400px"  也不行
                    height: 400,
                    opacity: 1,
                    left: 50,
                    top: 40
                })
            }
```

