# BOM

## window.open( )   打开窗口  /  window.close( ) 关闭窗口

```
	<!-- 框架标签， 常用来在页面内嵌套页面 -->
<iframe src="https://www.baidu.com" frameborder="0" width="300" height="300" name="ifr"></iframe>
window.open(URL, windowName, windowFeatures )
	1.URL 网址
	2.windowName  窗口名 可以是iframe 的name名字 可以是a标签的target属性(_self / _blank / _parent /_top)也可以是自定义名字  该属性搭配第三个属性使用
	3.windowFeatures  窗口特点  可写"top = 200,left = 100,width = 100" 不带单位
	
	eg: var go = window.open("https://ww.daidu.com", "_self", "top = 100,left = 100")
	
	关闭窗口
	go.close( )
	
```

**`resizeBy(w, h)`：根据指定的像素来调整窗口的大小。**

​		第一个参数是必需的，指定窗口宽度增加的像素数。第二个参数可选，指定窗口高度增加的像素数。两个参数可为正数，也可为负数

**`resizeTo(w, h)`：用于把窗口大小调整为指定的宽度和高度。**

　　该方法两个参数都是必需的，用来指定设置窗口的宽度和高度，以像素计。

**`moveBy(xnum, ynum)`：可相对窗口的当前坐标把它移动指定的像素。**

　　该方法有两个参数，第一个参数指定要把窗口右移的像素数，第二个参数指定要把窗口下移的像素数。

**`moveTo(x, y)`：可把窗口的左上角移动到一个指定的坐标。**

　　该方法有两个参数，第一个参数指定窗口新位置的 x 坐标，第二个参数指定窗口新位置的 y 坐标。

#### 网址的组成

https/http  协议

www  服务器名

baidu.com  域名

port  端口(位置: 网址最后添加" :80/:443 " )      https  端口:  :443       http端口:   :80     端口可省略不写

服务器名   域名  端口 需保持一致   即同源

## history

浏览器当前页面的访问记录

history.go(num)  num为正值时前进到后面num个页面   num 为负值时  后退 num个页面

history.back( )   后退页面    history.forward( ) 前进页面

history.go(0)	 刷新页面

## location

保存当前窗口正在打开的URL的对象，既是 `window` 对象的属性，也是 `document` 对象的属性（`window.location` === `document.location`）

search  "?q=javascript"  返回URL的查询字符串。这个字符串以问号开头  

可在行内加" ? id = xx"  可搜索到包含id名的标签  再分割为数组使用

location.search  查询到的字符串    

var nam = location.search.split("=")[1]  查询到的字符串用 " = "  分割  取等号后面的内容  

```
	eg:	第一个页面内容:
		<a href="login.html?id=23">跳转到大白菜</a>   跳转到第二个页面搜索里面内容
		<a href="login.html?id=24">跳转到茄子</a>
		<a href="login.html?id=25">跳转到黄瓜</a>
		<a href="login.html?id=26">跳转到萝卜</a>
		<a href="login.html?id=27">跳转到西红柿</a>
	
		第二个页面内容:
			// 获取到商品id
			var id = location.search.split("=")[1];
			setTimeout(function(){
				var str = "";
				switch(id){
					case "23":
						str = "大白菜";
						break;
					case "24":
						str = "茄子"
						break;
					case "25":	
						str = "黄瓜"
						break;
					case "26":	
						str = "萝卜"
						break;
					default:
						str = "西红柿"
						break;
						
				}
				document.body.innerHTML = str;
			}, 2000)

```

## navigator

包含有关访问者浏览器的信息

可区分手机端还是pc端  判断浏览器

