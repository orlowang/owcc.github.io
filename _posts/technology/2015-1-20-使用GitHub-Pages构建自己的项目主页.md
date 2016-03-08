---
title: 使用GitHub Pages构建自己的项目主页
date:   2015-01-20 16:51:33 +0800
---

> *why？随着开源领域的蓬勃发展，技术共享、协作工作越来越成为当下推崇的工作模式，这样的模式确实也提高了软件开发的效率。GitHub在这中间有着绝对耀眼的地位，而作为一名开发者，在GitHub中分享越多，就受到越为肯定的认可。GitHub Pages提供了一个免费的300M的空间供大家使用，可以作为项目展示，亦或技术论剑的不错选择，实际上很少有人能真正利用起来。*

### 创建自己GitHub Page

> *开始之前确保你已经有一个GitHub帐号*

GitHub提供了官方的创建教程[「GitHub Pages」](https://pages.github.com)，以下为我翻译整理的。

创建一个repository(项目)，名称为username.github.io，username为你自己的账户名称或者你自己的组织名称(```如果系统匹配不到你的username就不会有效，所以确保你的username存在并拼写正确```)。github会自动为你生成一个简单的页面。此时，你访问http://username.github.io就能看到你的页面，到此为止你的页面已经创建成功，很简单。

---

### 编写自己的网站代码

1. git获取username.github.io ```git clone https://github.com/username/username .github.io```
2. 进入本地目录 ```cd username.github.io```
3. 修改自己的网站代码
4. 提交修改 ```$ git add --all``` ```$ git commit -m "Initial commit"``` ```$ git push```
5. 完成

> *由于都是静态页面，所以每次发布文章时，添加要发布的文章页然后push到仓库中就可以了。*

---

### 使用Jekyll编写blog

> *jekyll是一个简单的免费的Blog生成工具，类似WordPress。但是和WordPress又有很大的不同，原因是jekyll只是一个生成静态网页的工具，不需要数据库支持。但是可以配合第三方服务,例如discuz。最关键的是jekyll可以免费部署在Github上，而且可以绑定自己的域名。「```来自百度百科```」*

Jekyll的[「官方网站」](http://jekyllrb.com)

##### 本地安装Jekyll (不推荐在windows下安装，如果需要，参考[「Jekyll on Windows」](http://jekyll-windows.juthilo.com/))

**安装环境**

- Ruby (including development headers)
- RubyGems
- Linux, Unix, or Mac OS X
- NodeJS, or another JavaScript runtime (for CoffeeScript support).

**安装Jekyll**

- 安装Ruby(Ruby版本在1.9.3 ~ 2.0.0)
- 安装bundle ```gem install bundler```
- 在项目(username.github.io)根目录下创建一个名称为GemFile的文件(```没有后缀```)，写入  
> source 'https://rubygems.org'  
  gem 'github-pages' 

  执行命令 ```bundle install``` 等待安装结束即可完成。

> *如果你跳过第2步没有安装bundle，那么进行第3步的时候直接执行命令```gem install github-pages```*  
如果gem安装过程中遇到错误，说明gem源被墙了，可以替换为淘宝镜像，代码如下：  
$ gem sources --remove https://rubygems.org/  
$ gem sources -a https://ruby.taobao.org/  
$ gem sources -l  
如果bundle install半天没响应或者遇到同样的错误时，修改GemFile资源文件为```source 'https://ruby.taobao.org'```

*如果不使用github-page可以安装原版jekyll ```$ gem install jekyll``` 等待安装结束即可完成。*  

> **安装开发版Jekyll**   
$ git clone git://github.com/jekyll/jekyll.git  
$ cd jekyll  
$ script/bootstrap  
$ bundle exec rake build  
$ ls pkg/*.gem | head -n 1 | xargs gem install -l  

**启动Jekyll**

启动 ```bundle exec jekyll serve``` 此时访问[http://localhost:4000](http://localhost:4000)就可以看到你的网站。  
jekyll服务会自动侦测你对文件的修改，修改保存后刷新页面即可看到最新效果。

> *如果你没有安装github-pages，而是使用原生的Jekyll，启动、发布方式可能有所改变，参照[「Jekyll的基本使用」](http://jekyllrb.com/docs/usage/)。*

如果本地修改(发布)审核完成之后，推到远程仓库(```git push```)即可使线上生效。

我会在下一节讲解[「使用Jekyll编写github-page」](http://tech.yaozong.wang/2015/01/21/使用jekyll编写github-page详解.html)





