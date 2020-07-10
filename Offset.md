# offset

### offsetWidth offsetHight  

**盒子的宽度和高度 ==>  width/hight(内容区) + padding + border**

### offsetTop / offsetLeft   

盒子距离最近的具有定位的父元素从border开始的距离  若父元素没有定位 从body算起

**offsetTop / offsetLeft   只能获取  不能设置  获取的是 *没有单位*  的  *整数*  数值**

### xx.style.width/hight  

只能获取行内样式  如果盒子有高度 行内样式没有设置  也是获取不到   

**xx.style.width/hight   可以获取 也可以赋值修改  获取的是舍入之后的 *带有单位* 的  *一位小数*  数值**

**xx.style.width/hight赋值时需要加引号带单位**

### offsetParent

 获取最近的具有定位的父亲

### 匀速 缓动动画

盒子的初始位置 + 步长{ 缓动动画的步长:  [终点位置 - 当前位置)/10]     匀速动画的步长:   为具体数值   }       封装函数    传入参数 (盒子类名,终点值 ,步长(匀速动画时需要  缓动动画不需要传入)

1.判断是否在终点  在终点就不运动

2.清除原来的定时器

3.添加定时器 为保证多个盒子运动 可直接给盒子添加定时器属性 (可不用在全局声明 ) 

4.获取盒子的初始位置

5.设置步长

6.进行运动

7.将要到终点时进行判断  如果终点值 -- 当前位置 < 步长 时  直接给当前位置赋值为终点值(匀速动画)   缓动动画 (开始位置 + 步长  = 终点  清除定时器)

8.清除定时器  还原定时器的初始值 timer = null

```
		// 匀速动画
        function average(el,target,step){
            // 判断是否在终点
            if(el.offsetLeft === target){
                return;
            }
            // 防止定时器叠加
            if(el.timer){
                clearInterval(el.timer)
            }
            el.timer = setInterval(function(){
                // 获取起点
                var start = el.offsetLeft;
                // 设置步长
                step = target > start ? Math.abs(step) : -Math.abs(step);
                // 移动
                el.style.left = start + step +"px";
                // 停止条件
                if(Math.abs(target - el.offsetLeft)< Math.abs(step)){
                //将要到达终点时   直接到达终点(有可能步长不是1 造成结束时可能未到终点 这样就要判断)
                    el.style.left = target + "px";
                    clearInterval(el.timer);
                    el.timer = null;
                }

            },1000/60)
        }
        
        
         // 缓动动画
        function slow(el, target) {
            // 判断是否在终点
            if (el.offsetLeft === target) {
                return;
            }
            if (el.timer) {
                clearInterval(el.timer);
            }
            el.timer = setInterval(function () {
                var start = el.offsetLeft;
                // 步长公式   逐渐变慢 取到的是(-1,1)
                var step = (target - start) / 10;
                // 进行判断  
                if (Math.abs(step) < 1) {
                    // 再次判断是返回之前位置  还是到达后面位置
                    step = step > 0 ? 1 : Math.floor(step);
                }

                // 变化
                el.style.left = start + step + "px";
                if (start + step === target) {
                    clearInterval(el.timer);
                    el.timer = null;
                }
            }, 1000 / 60)
        }
```



### 轮播

将所有的图片放在一个大盒子  对大盒子进行位置移动  最后一张图片后添加第一张图片 到达最后一张时 改变大盒子位置为第二张图片的位置

点击下一张

1.获取一张图片的宽度  即盒子每次移动的距离

2.声明计数器  保存点击的次数 (第几张图片)

3.进行判断  到达最后一张时  改变盒子位置为原始位置 0px 计数器增加

4.没有到达最后一张,直接改变盒子距离为   一张盒子的宽度的负值 x 计数器   (图片要向左移动 为负值)

5.使用缓动动画封装的函数  传入参数 终点值为 一张盒子的宽度的负值 x 计数器   (图片要向左移动 为负值)

```
		// 获取一张图片的宽度
		var len = ulEle.firstElementChild.offsetWidth; 
		//声明计数器
        var count = 0;   //如果是将最后一张图片放在前面，count起始值是 1
        // 上一页点击
        btn[0].onclick = function () {
            if (count === 0) {
                // 到达第一张时  直接定位到最后一张图片 count改成最后一张
                count = ulEle.children.length - 1;
                ulEle.style.left = -len * count + "px";
            };
            count--;
            // 小圆点  删除所有的active,给自己添加
            change(count);

            // 图片缓慢变化
            slow(ulEle, -len * count);
        }
        // 下一页点击
        btn[1].onclick = function () {
            if (count === ulEle.children.length - 1) {
            //到达最后一张时  直接定位到第一张图片位置  count 改为第一张
                ulEle.style.left = "0px";
                count = 0;
            }
            count++;
            // 小圆点
            change(count%4);   //对4取余   1 2 3 时为 1 2 3 等于4 时为0 可不用判断等于0 时
            //图片缓慢变化
            slow(ulEle, -len * count);
        }

        // 点击小圆点  for循环给每个小圆点绑定点击事件
        for(var i = 0;i< dotel.length;i++){
            // 保存i 的值
            dotel[i].item = i;
            dotel[i].onclick = function(){
                // 同步全局的count
                count = this.item;
                //图片变化
                slow(ulEle,-len*count);
                // 小圆点改变
                change(count);
            }
        }

        autoPlay(); //自动播放
        // 鼠标进入停止
        boxEl.onmouseenter = function(){
            clearInterval(autoPlay.timer);
            // console.log(0)
        }
        // 鼠标离开开始
        boxEl.onmouseleave = function(){
            autoPlay();
        }


        // 自动播放  设置定时器  每隔一段时间触发按钮的点击事件
        function autoPlay(){
            autoPlay.timer = setInterval(function(){
                btn[1].click();
            },2000)
        }
        
        // 小圆点样式    删除active  给自己添加
        // function del(obj, fan) {
        //     // 循环删除所有的active
        //     for (var i = 0; i < obj.length; i++) {
        //         obj[i].classList.remove("active");
        //     }
        //     // 等于最后一张时,给第一张添加active
        //     if (fan === obj.length) {
        //         obj[fan - obj.length].classList.add("active");
        //     } else {
        //         obj[fan].classList.add("active");
        //     }
        // }


        // 小圆点样式;
        // 1.精准找到有 active 的元素  给当前元素添加
        // 2.排他思想 
        function change(i) {
            document.querySelector(".active").classList.remove("active");
            dotel[i].classList.add("active");
        }


        // 图片移动
        function slow(el, target) {
            // 判断是否在终点
            if (el.offsetLeft === target) {
                return;
            }
            if (el.timer) {
                clearInterval(el.timer);
            }
            el.timer = setInterval(function () {
                var start = el.offsetLeft;
                // 步长公式   逐渐变慢 取到的是(-1,1)
                var step = (target - start) / 10;
                // 进行判断  
                if (Math.abs(step) < 1) {
                    // 再次判断是返回之前位置  还是到达后面位置
                    step = step > 0 ? 1 : Math.floor(step);
                }
                // 变化
                el.style.left = start + step + "px";
                if (Math.abs(target - el.offsetLeft) < Math.abs(step)) {
                    el.style.left = target + "px";
                    clearInterval(el.timer);
                    el.timer = null;
                }
            }, 1000 / 60)
        }
```



### 技巧

for循环里面要用 i 的值  

1. var  改为  let  

2. 使用立即执行函数

   ```
   		for (var i = 0; i < lis.length; i++) {
               
               // 1. 自执行函数传参
               // 2.  n 是用来 接收  i的 形参
               // 3. 把函数执行的结果(返回值) 赋给  onclick (接收的是函数)
               // 4. 相当于  把  给 onclick  绑定的是 内部  return 出去的  function
               
               lis[i].onclick = (function(n){
                   // 隐式声明
                   // var n;
                   // n = i(传进来的 i)
                   return function(){
                       console.log(n);
                       // 打印 n ,执行时 找n?
                   }
               })(i);
               
           }
   ```

   

3. 给当前遍历的 i  元素 添加index 属性 保留 i 的值  arr[i].index = i

   ```
   	 	   for (var i = 0; i < lis.length; i++) {
                  // 第一种方式
                  lis[i].index = i;
                  lis[i].onclick = function () {
                      // console.log(i); // 点击时 for 循环结束 ,i 已经变成了5
                    // 但是有时候 我需要 拿到 当时的 那个 i 值 (也就是当前圆点的 索引)
                    // 标签内部绑定 ,直接将索引 传进去
          			 // 把索引 存进 每个标签的  自定义属性里边
                      console.log(this.index); //  使用 this.index 拿当前的 i 值
                  }
              }
   ```

   