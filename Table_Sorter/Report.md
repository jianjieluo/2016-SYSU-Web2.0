# week10 作业完成情况

## 1. 代码优化重构

###1. 优化地鼠游戏
    1. 代码行数的变化
        + 优化前： 80行
        + 优化后： 107行
        + 说明： 虽然行数增加了，但是代码的可读性提高了，真的提高了很多。
            + 之前写的时候思路不清晰，使用了面向过程的编程方式，然后自己也给了很多全局变量，在开发的过程中不断为了实现功能乱补东西，导致现在看起来自己以前的代码也看不太懂了= =
            + 重构的时候学习了一下老师的使用面向对象的方法编程，这个时候的思路就比较清晰了，主要是在js里面按照需求构造自己想要用到的类，然后通过函数addmole和添加事件处理器来把html和js里面的逻辑相互联系起来。这样一个很大的优点是在调试的时候思路非常清晰。
            + 所以， **非常希望ta不要因为行数没有减少而扣分！（祈求脸）**
    2. toolkits 的使用心得
        1. 主要是使用了jquery，而lodash在这里用的比较少。
        2. 使用jquery可以简化我们js的书写，但是初次使用的话，我还是对很多接口不太熟练，然后ta们可以发现我用的接口的类型都比较单一。。。说明还有待学习。
        3. 主要是jquery的类好像是在获得的东西的基础上在包上一层数组的，然后jquery的方法是要jquery对象的方法的，这个还是坑了我一段时间，概念没有转换过来。
        4. 思路还是没有太转换过来，个人感觉一些代码风格和优化还没有做到最好

###2. 优化拼图游戏
    1. 代码函数的变化
        + 优化前： 180行
        + 优化后： 147行
        + 说明： 主要是我把图片的位置用一个数组存起来了优化代码风格后占用了挺多行数，但是主要行数还是减少了，以我原来的移动思路，加上王青老师上课时演示的面向对象的编程方法来优化代码。但是重构之后缺少了之前代码自己扩展的一个更换背景图片的功能，调试了挺久还没有发现主要问题，估计是初始化的问题，接下来有时间就再解决，老师的基本要求重构实现了
    2. toolkits 的使用心得：
        1. 主要现在还是很大程度上限制于是在代码写得短的应用，还没有很好地开发出相应的接口。
        2. jquery其实是优化js操作dom这个过程的，然而我重构的重点是由面向过程的思路转向面向对象的思路，所以，，，，，嗯，重构后可读性和结构都有很大的提升，juqery的应用情况和第一个游戏的优化的收获差不多
        3. lodash在这里用了_.random(),其实也只是为了写少一点代码（尴尬脸）

##2. table sorter
    **不得不说思维不能够太过于僵化=_=**
    ### 收获
        1. 这个题目我一开始也是用面向对象的编程方法，结果写得异常复杂，而且最后还是会出现各种莫名奇妙的bug。。。。。。。。。。。。。。。。
        2. 其实这个里面的需要处理的对象不多，只有一个，就是th被点击的时候需要写一个事件，在我写不下去的时候互评了一下其他同学的作业，发现有一位14级的师兄写的打码非常简洁，用的是面向过程的编程方式，结果= =，感慨万千。。。。。。
        3. 接下来我弄明白了师兄那份代码的思路后把自己的推掉重写了一遍（我不知道这样有没有抄袭（有点害怕，不过我没有照着抄），但是这个思路的确是太妙。。）其中发现我一开始写的代码很复杂的很大原因是因为我对一些对象的接口和属性非常地不熟悉，所以写了很多无用的代码= =
        4. 最大的收获是，**以需求来定数据结构的设计和编程的方式**，比如拼图的重构，对象很多很细，所以面向对象，table sorter对象事件只有一个，实在是没有必要写一个宏大的构造子= =

##3. 神秘代码
    测试成功网站：
    1. 中山大学选课平台，请进入我的选课结果：http://uems.sysu.edu.cn/elect


以下代码使用atom-minify插件压缩，在我原来的sorter上做了微调,没有压缩的版本请看该目录下的sort.js

```js
var jquery=document.createElement("script");jquery.src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";document.getElementsByTagName("head")[0].appendChild(jquery);
var mysort=function(){var a=$(this);changeState(a);var d=a.parent().parent().parent().find("tbody"),b=d.find("tr"),e=b.index();b.sort(function(b,c){var d=b.children,f=c.children;if("up"==a.attr("class"))return $(d[e]).text()>$(f[e]).text();if("down"==a.attr("class"))return $(d[e]).text()<$(f[e]).text()});d.empty();for(var c=0;c<b.length;++c)b[c].className=c%2?"alternate":"",d.append(b[c])},changeState=function(a){"unclicked"==a.attr("class")||"down"==a.attr("class")?($(".down").attr("class","unclicked"),
$(".up").attr("class","unclicked"),a.attr("class","up")):($(".down").attr("class","unclicked"),$(".up").attr("class","unclicked"),a.attr("class","down"))};$("th").addClass("unclicked");$("table th").click(mysort);
```
