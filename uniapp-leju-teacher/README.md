# 乐居uniapp版本
+  课程仓库地址:  
+  丁老师仓库: https://gitee.com/nevermo2013/uniapp-leju-teacher
+  接口host: www.bufantec.com 
+  接口: https://apizza.net/pro/#/project/ae18f90015244b1db0f1b94deb452e75/browse
+  后台:https://gitee.com/nevermo2013/leju-admin
# 基础准备
+ 物料准备
    - 乐居设计稿2倍图(750px)
    - 乐居的api
    - 造物(乐居旧版)设计稿
    - 微信小程序开发工具
    -   - 微信appid
    - hbuilderX  https://www.dcloud.io/hbuilderx.html  app开发版
    - https://www.dcloud.io/ 下载
	- 关于接口,除了h5版本,在小程序和app中一般不存在跨域的问题,因为他们不是通过浏览器发送的请求.
	
+ 混合开发
>使用web前端技术实现页面交互,使用ajax实现数据交互逻辑,使用android/iso打包.

    - 原生开发(比如王者荣耀) android/ios 
    - 原生开发语言 android(java/Kotlin) ios(object-c/swift)
    - angular.js  ionic  https://ionicframework.com 
    - reat.js  reactNative  https://reactnative.cn
    - vue.js  weex  https://weex.apache.org/zh/guide/introduction.html
    - apiCloud https://www.apicloud.com  
    - dcloud 5+runtime 封装了大量的原生app平台api(native.js)  不温不火  hbuilder可以直接把vue打包成app
    - uniapp https://uniapp.dcloud.io   同时编译多个平台 
    - 选择uniapp的主要原因: 1 vue.js  ;  2 实现更多的跨平台  ;  3  实现微信小程序同步开发 

+ uniapp官方demo
	- andriod/ios
	- 微信小程序
	- H5版本

# 快速开始
+ 安装工具的时候,需要选择"工作空间",不要放到桌面.
+ 第一次运行到"微信小程序",需要先配置小程序ide的相关路径，才能运行成功。
+ 修改小程序设置,添加可以通过命令调试,开启端口
+ 修改小程序设置,修改小程序基础版本库
+ 在项目的mainfast.json中配置微信小程序AppID , 登陆微信小程序后台,开发配置...

# vue开发注意事项
+ 生命周期函数
    - 应用生命周期  https://uniapp.dcloud.io/frame?id=%e5%ba%94%e7%94%a8%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f
    - 页面生命周期
        - onLoad   用于获取传递页面参数,和调用初始化api,类似于 vue中的created. 在uniapp中建议使用onLoad代替created.
        - onReady  类似与mounted.
+ style 支持的语法: 非H5端不支持 Vue官方文档：Class 与 Style 绑定 中的 classObject 和 styleObject 语法。
+ px的单位不会被编译.
+ 在H5平台 使用 v-for 循环整数时和其他平台存在差异，如 v-for="(item, index) in 10" 中，在H5平台 item 从 1 开始，其他平台 item 从 0 开始，可使用第二个参数 index 来保持一致。
+ 在非H5平台 循环对象时不支持第三个参数，如 v-for="(value, name, index) in object" 中，index 参数是不支持的。
+ 事件映射. 注意: click=> tap 
+ 为兼容各端，事件需使用 v-on 或 @ 的方式绑定，请勿使用小程序端的bind 和 catch 进行事件绑定。
+ App端（vue页面V3编译模式）和H5端支持v-html，其他端不支持v-html。富文本 https://ask.dcloud.net.cn/article/35772
+ 组建: created生命周期函数有效(遇到再说)
+ 不支持哦: Slot（scoped 暂时还没做支持）/动态组件/异步组件/keep-alive/transition
+ 命名限制 不要把组建命名为关键词,比如 span ... xxxSpan

# page.json
> 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等。
    
    + tabBar 用于配置底部tab入口,是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序.
        - icon 不要中文!!! 放到static文件夹下
# 小程序开发工具
+ 设置=> 安全设置=> 服务端口 开启
+ appId 可以通过hbuilderX配置
+ 右上角=> 详情=> 不校验合法域名√ 
+ 右上角=> 详情=> 基础调试库 => 选择使用率最高(最新的)版本

# 开发
+ 不支持axios
+ uni.request	
> post提交表单的三种形式: 1 二进制(上传) ; 2 x-www-form-urlencoded 默认表单形式(常用,默认) ; 3 json 字符串形式(新)
> 
	- post : header['content-type'] 为 application/json 的数据，会进行 JSON 序列化。
	- post: header['content-type'] 为 application/x-www-form-urlencoded 的数据，会将数据转换为 query string。
	- 还有二进制形式
+ 跨平台 条件编译
	+ [条件编译:https://uniapp.dcloud.io/platform](https://uniapp.dcloud.io/platform) 
	+ 需求: 在所有的一级导航,全部去掉


+ 跳转
	- navigator  传参必须使 ? key=v  
	- 在新页面需要在onLoad中获取参数
	
+ vuex的集成
	- vuex的分模块功能写法和vue项目时一模一样的
	- 需要在main.js中将vuex对象手动添加到vue的原型对象中

+ 登陆相关
	- 小程序/iosapp 审核 ,不能进入应用就弹出来强制登陆,人工审核必须有"游客"模式.
	- 因为uniapp没有导航守卫,在需要判断的页面进行判断跳转,但是登陆比较特殊,应该用重定向跳转登录页避免返回.
	
+ 订单相关
	- [uniapp订单模板参考](https://ext.dcloud.net.cn/plugin?id=267)

+ 地址选择
	- 注意onLoad/onShow在第一次进入页面都会触发,但返回只会触发onShow
	- 如果选择地址退回上一级,可能onLoad不会触发,需要在onShow中重新赋值

+ 首页相关
	- 品类推荐 暂时使用前台  发现=>系列列表(新):/api/leju/front/find/seriesAll
	- 特色优选 使用首页相关 => 推荐热销 
	- 特色优选的数据需要在后台录入,通过 后台=> 商品管理=> 更新字段 添加ishot即可

+ 发现
	- 文章管理的分类 和分类管理是一样的 
	- 好物推荐 需要用系列api处理 两层嵌套 注意: 系列的背景图是昨天手动添加的  以后新增的系列 可以通过api添加
	- 好物推荐 需要两层嵌套swiper实现

# 兼容处理
+ 如果遇到无法兼容的问题 特殊针对性的处理
+ 条件编译 https://uniapp.dcloud.io/platform


# 打包
+ 小程序 
	- 小程序编辑器的版本库
	- 不能是demo多次提交审核.
	- 必须有游客模式.

+ h5
	- manifest.json
	- 命名空间
	- 路由模式

+ android
	- 可以直接通过usb链接到手机,预览效果
	- 前提: 手机开启调试模式 不同的机型开启方式可能有差异. 
	- 问题: 可能存在部分手机连不上. 一部分是电脑杀毒软件的问题,另一方面是android手机差异化太大.推荐小米手机.
	- 也可以直接云打包xx.apk
	- manifest.json替换图标

# 问题
+ vue原生的web应用(电影/乐居移动端) 和 赵老师/张老师小程序(乐居) 和 uniapp开发的乐居移动端有什么区别?
	- vue是基本能力
	- 原生小程序是加分项
	- uniapp 前瞻性和补充性


# 完善

+ 用户登陆成功,应该先获取用户所有的地址列表,并把默认预存到localstorage(清空之前的地址)
+ 关于购物车存留:可以在ls中设计特定的数据格式,比如username: [....],在用户登陆的时候,验证username的购物车是否存在 
	- 下版本考虑购物车添加后台api
+ 关于前台退单显示, 返回数据 和订单列表数据格式不一定一致,需要我们自行通过计算属性处理
+ 订单明细 需要依赖多个接口 才能展示需要数据
   - 可以参考老师的页面实际api
   - 订单基本信息没有专门做api,可以通过上一级的"订单列表api"加orderId查询当前订单基本功能.

# 关于首页沉浸式体验
> 由于uniapp默认为沉浸式体验的实现,如果去掉默认导航头,会导致内容覆盖手机头部状态栏. 这里给出解决方案.

+ uniapp默认为沉浸式体验 无法取消 参考: https://ask.dcloud.net.cn/question/69469
+ 如果取消原生导航头(),需要自己实现沉浸式造成的内容遮挡头部状态栏的问题 参考: https://ask.dcloud.net.cn/article/34921
	- 取消原生导航头: 当设置 "navigationStyle":"custom" 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。 参考: https://uniapp.dcloud.io/frame?id=css%e5%8f%98%e9%87%8f
	- 填充状态栏高度,可以通过uniapp自定义的变量来设置:  var(--status-bar-height) 的 view 放在页面顶部，避免页面内容出现在状态栏。 
+ 不同平台,h5/app/微信小程序 可以根据测试,配合 条件编译来实现各自的需求. 参考: https://uniapp.dcloud.io/platform?id=pagesjson-%e7%9a%84%e6%9d%a1%e4%bb%b6%e7%bc%96%e8%af%91

## 相关代码

+ page.json页面

```shell
	// pages.json  设置app去掉默认导航栏
	{
		"path": "pages/home/index",
		"style": {
			// #ifdef APP-PLUS
			"navigationStyle":"custom",
			// #endif
			"h5": {
				"titleNView": false
			},
			"enablePullDownRefresh": true
		}
	
	},

```

+ home页面

```shell

	添加占位空间的样式,参考官网
	
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #354E44;
	}
	
	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #354E44;
		top: 0;
		z-index: 999;
	}


```