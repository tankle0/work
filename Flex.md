# calc函数

动态计算长度值  支持"+" "-" "*" "/"

+和 - 运算符前后必须有空格

```
width: calc(100% - 80px);  宽度100%  距离左右两端40px
width: calc(600px / 3 + 20px);  宽度220px
```

# Flex

#### display: flex  弹性盒

![image.png](https://upload-images.jianshu.io/upload_images/6784887-690af0aeebadfcc9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)

### flex 属性

##### 容器属性

+ **flex - direction** 主轴方向 row / row-reverse  水平/水平反转 column/column-reverse 竖直/竖直反转

  **改为垂直方向时 justify-content 控制垂直方向  align-items  控制水平方向**

+ **flex - wrap** 换行   wrap换行第一行在上方  nowrap 不换行   wrap-reverse 换行 第一行在下方

+ **flex-flow**  复合属性  包括flex-direction  flex-wrap   eg: flex-flow: column wrap

+ **justify-content**  主轴排列  flex-start(左对齐) / flex-end (右对齐)/ center (居中)/ space-around(元素两侧间距相等) / space-between(两端对齐) / space-evenly(均匀排列每个元素)

  ![image.png](https://upload-images.jianshu.io/upload_images/6784887-b751c63f5ed56e8c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

+ align - items  交叉轴排列  flex-start (顶部对齐)/ flex-end(底部对齐) / center(上下居中) / baseline(文字基线对齐) / stretch(元素无高度时是父类100%)

![image.png](https://upload-images.jianshu.io/upload_images/6784887-3e20a21fcf8cbb95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

+ align-content  多根轴线 的对齐方式   只有一个轴线不起作用

align-content:  flex-start / flex-end / center / space-around / space-between / space-evenly / stretch

![image.png](https://upload-images.jianshu.io/upload_images/6784887-a5306d77890864a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 弹性元素属性

**order:** 元素排列位置 默认为0   值越大 排列越靠后

**flex-grow:** 定义放大比例  若有剩余空间 将会进行放大 默认为0 不会放大 无多余宽度时也不会放大

**flex-shrink:**  定义缩放比例    默认为1  空间不足将会缩小 负值无效

**flex-basis:** 在分配多余空间之前，项目占据的主轴空间  默认值为 auto  可设置数值  即设置元素宽高

**flex :**  flex-grow  flex-shrink  flex-basis  的缩写  默认值 0  1  auto 

**快捷键**  **flex: auto**   ==>  flex: 1 1 auto  自动适应     **flex: none**  ===>  flex: 0 0 auto  元素原来尺寸

###### flex 为一个非负数时

```
.item {flex: 1;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

###### flex 为一个长度或百分比

```
.item-1 {flex: 0%;}
.item-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
.item-2 {flex: 24px;}
.item-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 24px;
}
```

###### flex 为两个非负数字

```
.item {flex: 2 3;}
.item {
    flex-grow: 2;
    flex-shrink: 3;
    flex-basis: 0%;
}
```

###### flex 为一个非负数字和一个长度或百分比

```
.item {flex: 200 300px;}
.item {
    flex-grow: 200;
    flex-shrink: 1;
    flex-basis: 300px;
}
```

### margin使用

**margin: auto**      水平竖直居中  父类需设置为  flex

**margin  实现space 类属性效果**

父类  display : flex   

子类   margin: 0 auto     **space-around**  效果

​          margin: 0 auto  第一个元素  margin-left: 0 ;  最后一个元素  margin-right: 0 ;  **space-between** 效果

​		  margin-left: auto;   最后一个元素  margin-right : auto;    **space-evenly**  效果

## 技巧

##### 1.新创建的元素添加类名

```
				var dEle = document.createElement("div");
				dEle.className = "draw";  //添加class类名
```

##### 2.删除元素自身

```
dEle.parentNode.removeChild(dEle); //  dEle..remove() 也可以使用 但IE不可用
```

##### 3.随机颜色

###### 1.hsl随机颜色

```
			var h = 0;  //hsl颜色   hsl(n,100%,80%)  n范围 0 - 360 后两个参数为饱和度 亮度
			setInterval(function () {
				if(h === 360){
					h = 0;
				}
				h ++;
			}, 10)  // 每隔10毫秒 改变颜色
			
			dEle.style.color = `hsl(${h}, 100%, 80%)`;  //改变颜色
```

###### 2.rgba随机颜色

```
			liEle.style.backgroundColor = `rgba(${ rNumber(0,255) }, ${ rNumber(0,255) }, 																${ rNumber(0,255) }, .7)`;
			
			//随机数函数
			function rNumber(n, m){
				// Math.round(Math.random() * (m-n)) + n;
				return Math.floor(Math.random() * (m-n+1)) + n;
			}   
			
			
```

