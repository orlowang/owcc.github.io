<!--begin
"title":"Nginx在Lunix下的编译和部署",
"subtitle":"Nginx在Lunix下的编译和部署",
"bgphoto":"#a07",
"publishtime":"2015/12/31",
"category":"coding",
"preview":""
end-->

### Nginx在Lunix下的编译和部署

> 环境：  
>   Docker-centos-7.1  
>   nginx-last

#### nginx源码编译

> 依赖：  
>   pcre-last  
>   zlib-last

##### 1) configure参数说明

+ --prefix=path   ——  根目录(默认*/usr/local/nginx*)
+ --conf-path=path —— 配置文件目录(默认***prefix**/conf/nginx.conf*)
+ --pid-path=path ——  nginx.pid目录(默认***prefix**/logs/nginx.pid*)
+ --error-log-path=path   ——  错误日志目录(默认***prefix**/logs/error.log*)
+ --http-log-path=path    ——  访问日志目录(默认***prefix**/logs/access.log*)
+ --user=name   ——  nginx进程用户(默认**nobody**)
+ --group=name  ——  nginx进程用户用户组
+ --with-http_ssl_module    
+ --with-pcre-jit   启用PCRE的实时编译(just-in-time compilation)
+ --with-pcre=path  正则引擎PCRE，**指向PCRE源码路径**
+ --with-zlib=path  压缩函数库zlib，**指向zlib源码路径**

**实例代码**
``` bash
./configure
    --conf-path=/etc/nginx.conf
    --pid-path=/usr/local/nginx/nginx.pid
    --with-http_ssl_module
    --with-pcre=../pcre-4.4
    --with-zlib=../zlib-1.1.3
```

#### nginx部署

##### 1) 部署原则——不破坏lunix文件规则

+  config文件放置于/etc/nginx文件夹下
+  

##### 2) 安装实例脚本

``` bash
curl -o pcre-8.38.zip ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.38.zip
curl -o zlib-1.2.8.tar.xz http://zlib.net/zlib-1.2.8.tar.xz

```
