# Homework 9 signup

> 首先，先要感叹一下，我终于做完啦！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！


-----
## 运行的方法
```
cd js/
node signin.js
```
------
## 关于一些说明
1. 在client里面进行信息的格式检查，在服务端里面进行数据重复的检查，个人觉得虽然需要等待服务器响应，但是还是不应该把用户数据返回在client里面进行比较的= =
2. 可能写的不够程序员，因为和有些同学交流的时候他们都用了什么路由器之类的很强的东西。我主要是参考了两篇博客进行学习的，在这里贴出我的学习思路的来源
    + http://www.robsearles.com/2010/05/nodejs-tutorial-part-2-routing/ 主要参考路由
    + http://blog.frankgrimm.net/2010/11/howto-access-http-message-body-post-data-in-node-js/ 主要参考怎么get到form的内容
3. 推掉重写了4次，感觉思路已经开始比较清晰了，觉得TA可以看得懂,`通过注释和console.log的内容`
4. 对于异步的读取文件非常迷，坑了我很久，还是不是很懂，所以在这里大多数使用的是同步的函数
5. 用户数据存储在一个json文件中

----
## github 地址
https://github.com/longjj/Web2.0_Course_Homework
有bug的反馈的时候如果改正了我会及时在上面更改的，如果TA有空不妨去看看~
