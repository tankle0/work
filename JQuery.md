## JQuery

对常用的dom 和bom 的操作方法进行的封装

**使用之前必须先引入    可引入本地文件   也可使用cdn引用网络资源**

JQuery  中所有的css选择器都可使用

JQuery  获取事件源是JQ对象 (类数组)形式

**JQ对象和dom对象可进行转换**

jq对象转为原生dom    $box[0] / $box.get(0)

原生dom转为jq对象  $(dom对象) 

jq绑定事件    $(box).click(function( ) {  }  )    **没有  on**



##### window.onload  **页面加载完成时**        只能使用一次    多次使用只能生效最后一个



#### **jq中的筛选选择器** 

:eq(index)  匹配索引为 index 的元素     $('li:eq(4)')  匹配第三个 li

:gt(index)  匹配索引比 index 大的元素

:lt(index)  匹配索引比 index 小 的元素

:odd( )  匹配索引为 奇数 的元素

:empty(  )  匹配文本为空 的元素

:contains(index)  匹配内容为 index 的元素



#### **jq中的样式修改**   

$('.box').css('color','red' ) 设置颜色     

$('.box').css('color')   获取属性值  获取的是最终样式

**修改多个样式 用对象形式    **

**$('.box').css({ })   **  

$('.box').css({

​      'color':'orange',

​      'font-size':'40px',

​      backgroundColor:'gray',

​      height:'50px'

​    })

**属性名可加引号   加引号需用连字符  不加使用驼峰命名**



.attr('src','images/01.jpg');    修改属性值  第二个参数不写 获取属性值

.removeAttr('alt')   删除属性



#### 类名操作

addClass( )  添加类名  一个或多个

removeClass(  ) 删除类名   一个或多个

toggleClass(  ) 添加类名  一个或多个

hasClass(  ) 判断是否存在类名



#### 内容操作

$('p').text('     '); 获取内容   写参数  为修改文本内容

$('.box').html(  )   获取结构   写参数 为增加标签

表单操作   $('input[type="text"]').val('   ');  获取表单内容

选择框选中   $('input[type="checkbox"]').prop('checked',true);



#### 关系查找

.next( )  获取下一个兄弟

.nextAll(  )  获取下面所有的兄弟

.nextUntil(  )  截止到  元素

获取下一个   

.prev( )  

.prevAll(  )  

.prevUntil(  )

父节点

.parent(  )  

.parents(  )  

 .parentsUntil(  )  

子节点

.children( )  所有子节点

.children().eq(3)  第三个子节点

.find( )   符合条件的后代节点

#### 案例  突出显示

图片列表可以动态生成 

声明一个数组  包含所有图片   

创建函数   利用for循环 动态添加列表 图片  拼接字符串

mouseenter/mouseleave   只会触发一次

mouseover/mouseout   会触发多次,在子元素内部来回进入时也会触发

**$(this).index(   )   可在for循环中直接获取到当前元素的下标**



#### JQ动画

.show(200,  function( ) {  } )    第一个参数为时间   第二个参数为回调函数   指定动画结束时的动作

.hide(   )

......



##### 自定义动画

.animate( )

$('.box').animate({

​        'margin-left':'800px',

​        'width':100,

​        height:100

​      },1000,'linear',function(){console.log(1);});

1000  为动画时长   linear 为运动函数(轨迹)   包括 linear  和 swing  最后一个参数为回调函数  可不写

**多个标签属性参与动画时  需用对象{}形式  属性名可加引号   不加 则用驼峰命名 **   **和数值相关的属性都可参与动画**

**设置多个动画  需等第一个执行完 下一个才会执行**

.stop( true, true  )  第一个参数代表停止所有动画  默认false   最后一个参数 是否将停止的动画,停在当前动画的最后一个状态 ,默认false



#### JQ节点操作

创建节点

插入节点  .append( )   .appendTo( )  被插入到

.prepend(  )    在前面插入节点

.after( )  .before(  )   在前面或后面添加兄弟元素

删除节点  

.empty(  )    .html( '  ' )    清空内部  

.remove (  )  会把自己也删除

复制点 

.clone(  )



#### BOM相关

.width()     .height()     获取/设置元素的 宽  高

.offset(  )    获取或设置元素相对于文档的位置

.offset ({ left:10 , top:10}  ) 设置多个 写成对象形式

.position(  )   获取相对于其最近的具有定位的父元素的位置    不 能设置

.scrollTop(  )   获取或者设置元素垂直方向滚动的位置(网页卷进去的高度)

.animate ( {  scrollTop:0   }  ,400)   回到顶部



#### on方式绑定事件

on方式可同时绑定多个事件

$('.box').on('click','.in',function(){  })    只有  in  能触发函数

移除事件

.off(  )  移除所有事件

.off( 'click' ) 只移除点击事件



#### 事件委托

对于动态追加的元素  没有绑定事件  可以使用事件委托  给父元素 添加点击事件



#### 事件对象

$('.box').click(function (event) {  }   event  为事件对象  包含了 事件触发时 浏览器提的信息和方法

event.stopPropagation(    )   阻止事件冒泡

event..preventDefault(  ) 阻止默认行为



#### 链式编程

多个样式串联写在一起  .css(  ).css(  )

.end(  )  结束当前链最近的操作  返回之前的状态



#### 隐式迭代

JQ中自动进行循环  即为隐式迭代



#### each( )

JQ中的手动循环

$('li').each(function(idx,item){   }    item 当前遍历 的元素   idx  当前遍历元素的下标



#### 表格案例

动态生成表格   声明数组存储表格信息  for循环  拼接字符串添加表格 

绑定事件可在行内直接绑定  onclick="cancel()"     下面新创建函数  function cancel( ) {  }

点击保存时  需要判定是编辑还是新增   需要声明变量进行控制

全局声明的变量  在函数中赋值    在另外一个函数中也能使用这个值



#### 手风琴案例

元素宽度变化时  先变窄再变宽  防止宽度不够

回调函数中this指向会变   需声明变量保存this

声明全局变量保存鼠标进入的元素   鼠标离开时使用

定时器的使用  鼠标进去时先清除  在设置