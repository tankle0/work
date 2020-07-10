# Vue

## 插件

- #### Mock.js

 生成随机数据  ===>   

1. **引入**
2. **创建Mock实例**    `var Random = Mock.Random;`

- **随机大小/颜色/内容的图片**    

  `var img = Random.image('200x100', '#02adea', 'Hello');`   随机大小  随机颜色  随机文字

  `var img1 = Random.dataImage('200x100');`    随机大小

- **随机标题**

  `var title = Random.ctitle();`   中文标题      

  `var title = Random.title();`     英文标题

- **随机内容**

  `var info = Random.cparagraph();`   中文内容      

  `var info = Random.paragraph();`     英文内容

- **随机ID**

  `var id = Random.guid();`  随机ID

## 插槽

写在组件中的内容不会展示在页面中,可通过  **插槽 slot** 来渲染   **<slot></slot> 标签不会展示在页面中**

插槽中的内容为**后备内容**    若组件标签内**无内容会展示插槽中的内容**(后备内容)   **有则替换**掉后备内容

`<com>123456</com>`         组件中内容不会展示

```
 		<com>
 		day day up   //该内容通过slot展示  无内容会展示插槽内容<slot> never give up </slot>
 		</com>
 		
 		Vue.component("com",{
            template:"<div><p>这是p标签</p><slot></slot></div>"  
            注意:template模板中只能有一个根元素  调换插槽位置可变换展示顺序																		
        })
        var vm = new Vue({
            el: '#app',
            
            data: {
               
            },
            
        });
```

### 具名插槽

定义名称的插槽     可把数据塞入到指定的插槽内

`<template v-slot:default>`  默认无名称的插槽  可省略 v-slot

```
		<com>
            <template v-slot:names>
                张三
            </template>
            <template v-slot:age>
                40
            </template>
            <template v-slot:default>  默认无名称的插槽  与  <template> 男 </template> 一致
                男
            </template>
             
        </com>
   
    
    <template id="temp">
        <div>
            <p>名称:<slot name="names"></slot></p>
            <p>年龄:<slot name="age"></slot></p>
            <p>性别:<slot></slot></p>
        </div>
    </template>
```

**在插槽内可直接获取到父类中的数据**       一种新的父子组件传值的方式

```
		<com>
            <template>
                男{{ area }}  ===>  郑州
            </template>
        </com>
        
        <template id="temp">
        	<div>
            	<p>名称:<slot name="names"></slot></p>
            	<p>年龄:<slot name="age"></slot></p>
            	<p>性别:<slot></slot></p>  ====>   性别:男 郑州
        	</div>
    	</template>
        
        Vue.component("com",{
            template:"#temp",
            data(){
                return {
                    area:"湖南"
                }
            }
        })
        var vm = new Vue({
            el: '#app',
            
            data: {
               area:"郑州"
            },
            
        });
```

**获取所在组件中的数据**

```
		<com>
           <template v-slot="slotProps">   //注意与具名插槽中的写法 (v-slot:)
               {{ slotProps.childarea }}   //slotProps/childarea  为自定义属性
           </template>
        </com>
        
		<template id="temp">
        	<div>
            	<p>性别:<slot :childarea="area"></slot></p>  //绑定属性进行传递数据
        	</div>
    	</template>
    	
		Vue.component("com",{
            template:"#temp",
            data(){
                return {
                    area:"湖南"
                }
            }
        })
```

### 组件名 ref

通过ref命名组件    可在父类中通过 `this.$refs.名称`  获取到该组件内的所有方法和属性

可给任意标签添加ref名  同样通过 `this.$refs.名称`   可获取到

```
	<div id="app" v-cloak>
		<com ref="com1">
           
        </com>
        <input type="text" ref="ipt">  //可给输入框添加ref名
        <button @click="getInfo">按钮</button>
    </div>
    
    Vue.component("com",{
            template:"#temp",
            data(){
                return {
                    area:"湖南",
                    num:2
                }
            },
            created () {
                
            },
            methods:{
                add(){
                  this.num++;
                }
            }
        })
    var vm = new Vue({
            el: '#app',
            data () {
                return {
                    num:1
                }
            },
            methods: {
                getInfo(){
                   console.log(this.$refs.com1.area); 
                   console.log(this.$refs.ipt.value);  //获取到输入框中的内容
                   this.$refs.com1.add();   //获取到组件中方法,组件中num自增
                }
            }
        });
```

### mixins 混入

是一种分发 Vue 组件中可复用功能的非常灵活的方式。**混入对象可以包含任意组件选项。**

**混入对象的属性或方法会优先执行**

```
		var obj = {
            data () {
                return {
                    area:"郑州"
                }
            },
            created(){
                console.log("我是混入的生命周期钩子")
            }
        }
        
        
        Vue.component("com",{
            mixins: [obj],   //组件中也可使用  同时执行打印
            template:"#temp",
            data(){
                return {
                   
                }
            },
            
        })
        
        var vm = new Vue({
            mixins:[obj],  //父类中使用
            el: '#app',
            data () {
                return {
                    area:"北京"
                }
            },
            created () {
                console.log(this.area)  //先打印  我是混入的生命周期钩子   后打印 北京
            },
            
        });
```

### filter 过滤器

对需要的数据进行**过滤/修改**

```
 	<div id="app" v-cloak>
        美元<input type="text" v-model="iptVal">
        <p>人民币{{ iptVal | toRMB | Max}}</p>  //可多个串联使用
    </div>
    
    var vm = new Vue({
            el: '#app',
            data () {
                return {
                    iptVal:""
                }
            },
            filters: {
                toRMB(val){
                    console.log(val);  //获取到的是输入框的数据
                    return val*7.1111;  //对输入框数据修改
                },
                Max(val){
                    console.log(val,"max"); //上一次修改后的数据
                    return val*2;  //再进行修改
                }
            }
     });
```

### 过渡动画

将要参与动画的元素写入  `<transition></transition>`

transition  mode属性  in-out 先显示后消失           **out-in**  先消失后显示  ==>常用

同时 style样式中定义进入动画状态  结束动画状态

```
.v-enter{属性}进入的开始动画  .v-enter-to{属性}进入的结束动画  .v-enter-active{transition:all 1s ease-in}
.v-leave{属性}离开的开始动画  .v-leaver-to{属性}离开的结束动画  .v-leave-active{transition:all 1s ease-in}
```

```
	<div id="app" v-cloak>
        <!-- mode out-in  in-out -->
        <transition mode="out-in">
            <p v-if="isShow">这是p标签</p>
            <h2 v-else>这是h2标签</h2>
        </transition>
       <button @click="isShow = !isShow">按钮</button>
    </div>
```

#### 搭配animate.css使用

引入animate.css   需使用  **enter-active-class**   绑定 animate动画属性名

```
<div id="app" v-cloak>
        <!-- mode out-in  in-out -->
        <transition enter-active-class="flipInX  animated" leave-active-																		class="fadeOutRight animated">
            <p v-if="isShow">这是p标签</p>
        </transition>
       <button @click="isShow = !isShow">按钮</button>
 </div>
```

### 自定义class

使用自定义class       style 样式中修改为与自定义class名一致

```
.leftRight-enter{属性}进入的开始动画  .leftRight-enter-to{属性}进入的结束动画  .leftRight-enter-active{transition:all 1s ease-in}
.leftRight-leave{属性}离开的开始动画  .leftRight-leaver-to{属性}离开的结束动画  .leftRight-leave-active{transition:all 1s ease-in}
```



```
 		<transition mode="out-in">
            <p v-if="isShow1">这是p标签</p>
        </transition>
        <transition name="leftRight">
            <h2 v-if="isShow2">这是h2标签</h2>
        </transition>
```

### transition-group  动画组

给多个元素添加动画时使用

transition-group  在页面中会显示为其他标签   可通过   **tag=""  更改为需要的标签名**

```
<div id="app" v-cloak>
            <transition-group tag="ul" enter-active-class="zoomIn animated" leave-active-class="fadeOut animated">
                <li v-for="(item,index) in list" :key="item.id">{{ item.num }}</li>
            </transition-group>
       <button @click="add">随机添加</button>
       <button @click="remove">随机删除</button>
 </div>
```

### **数组随机删除/添加一个元素**

```
		var Random = Mock.Random
        var vm = new Vue({
            el: '#app',
            methods: {
                add(){  //随机添加元素
                    var ran = parseInt(Math.random()*10);
                    var result = Math.floor((this.list.length + 1)*Math.random());
                    var obj = {
                        num:result,
                        id:Random.guid()
                    }
                    this.list.splice(result,0,obj)  //三个参数为替换添加元素
                },
                remove(){//随机删除元素
                    var result = Math.floor((this.list.length)*Math.random());
                    console.log(result)
                    this.list.splice(result,1)
                }
            },
            created () {
                console.log(Random.guid())
            },
            data () {
                return {
                   list:[
                       {
                           num:1,
                           id:Random.guid()
                       },
                       {
                           num:2,
                           id:Random.guid()
                       },
                       {
                           num:3,
                           id:Random.guid()
                       },
                   ]
                }
            },
		});
```

