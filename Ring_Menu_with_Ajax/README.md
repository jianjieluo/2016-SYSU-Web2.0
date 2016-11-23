# Homework 10 Asynchronous JavaScript
-----
## 运行的方法
```
node server.js
```
然后在浏览器里面进行相应的请求来获得界面
http://localhost:3000/S1/index.html
http://localhost:3000/S2/index.html
http://localhost:3000/S3/index.html
http://localhost:3000/S4/index.html
------
## 关于一些说明
1. 本周没有时间很好完成S5
1. 这次的运用上了老师之前直播打码的一些分治的思想，觉得思路的确是清晰了很多了。
2. 主要运用jquery的ajax请求
3. 在S2~S4里面主要运用一个数组来存储click的顺序，在S4里为了方便打乱数组使用了lodash
4. 请不要在正在请求数据的时候将鼠标取消hover图标，可能会出现一些小bug，原因大概是初始化的问题，因为我的初始化是在hover的有无来进行改变的，如果出现了小bug，请将鼠标移开一小会，再次hover即可
5. 注释只有一点，感觉写得函数名都比较有语义，所以相信ta可以看懂
6. 关于环形菜单，初次打开hover时可能会出现抽搐的情况，请在chrome里面打开，然后打开develop tool后，再进行测试即可，我将尽力在周三23：00前fix这个bug。Ta在批改的时候可以看一下我的github，可能会已经fixed

----
## github 地址
https://github.com/longjj/Web2.0_Course_Homework
S5的时间不够用了，先做好S1～S4， 然后，如果有时间我会做S5的，
而且有bug的反馈的时候如果改正了我会及时在上面更改的，如果TA有空不妨去看看~
