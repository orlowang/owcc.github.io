---
date:   2015-01-21 16:51:33 +0800
title: "XHProf调试工具的安装使用"
---

#### Mac下的安装步骤

##### 安装环境

- homebrew
- autoconf

##### 安装

- 在`/usr/local/Library/Formula/`下新建xhprof.rb文件，写入以下内容。

{% highlight ruby lineno %}
require 'formula'

class Xhprof <Formula
  url 'http://pecl.php.net/get/xhprof-0.9.2.tgz'
  homepage 'http://mirror.facebook.net/facebook/xhprof/doc.html'
  md5 'ae40b153d157e6369a32e2c1a59a61ec'

  depends_on 'pcre'

  def install
    Dir.chdir "xhprof-#{version}/extension" do
      system "phpize"
      system "./configure", "--prefix=#{prefix}"
      system "make"
      prefix.install %w(modules/xhprof.so)
    end
    Dir.chdir "xhprof-#{version}" do 
      prefix.install %w(xhprof_html xhprof_lib)
    end
  end

  def caveats; <<-EOS.undent
    To finish installing XHProf:
     * Add the following lines to php.ini:
        [xhprof]
        extension="#{prefix}/xhprof.so"
     * Restart your webserver
    EOS
  end
end
{% endhighlight %}


- 执行`brew install xhprof`

> *如果出现如下错误  
Error: Failure while executing: /usr/bin/curl -f#LA Homebrew\ 0.8\ (Ruby\ 1.8.7-249;\ Mac\ OS\ X\ 10.7.3) ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.12.tar.bz2 -o /Users/swentel/Library/Caches/Homebrew/pcre-8.12.tar.bz2  
就去下载最新的[「pcre」](https://github.com/mxcl/homebrew/blob/master/Library/Formula/pcre.rb)，替换掉`/usr/local/Library/Formula/`中的`pcre.rb`。

- 复制xhprof.so到你php的extensions目录`cp /usr/local/Cellar/xhprof/0.9.2/xhprof.so /path/to/extensions`

- 在你的php.ini中添加如下内容

> [xhprof]
extension=xhprof.so  
;This is the directory that XHProf stores it's profile runs in.  
xhprof.output_dir=/tmp  

Done.











