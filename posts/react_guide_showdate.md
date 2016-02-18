<!--begin
"title":"[译]「React教程」在程序界面中显示数据",
"subtitle":"前端开发最基础的工作就是在程序界面中显示(底层)数据，React使这一工作变得非常容易而且当(底层)数据发生变化时可以随时跟新程序界面。",
"bgphoto":"#00d8ff",
"publishtime":"2015/05/17",
"category":"",
"preview":""
end-->

>   原文：http://facebook.github.io/react/docs/displaying-data.html

前端开发最基础的工作就是在程序界面中显示(底层)数据，React使这一工作变得非常容易而且当(底层)数据发生变化时可以随时跟新程序界面。

#### 让我们从第一个例子开始
这是一个非常简单的例子。创建一个hello-react.html文件。
``` html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello React</title>
    <script src="https://fb.me/react-0.13.3.js"></script>
    <script src="https://fb.me/JSXTransformer-0.13.3.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/jsx">
        var HelloWorld = React.createClass({
          render: function() {
            return (
              <p>
                Hello, <input type="text" placeholder="Your name here" />!
                It is {this.props.date.toTimeString()}
              </p>
            );
          }
        });

        setInterval(function() {
          React.render(
            <HelloWorld date={new Date()} />,
            document.getElementById('example')
          );
        }, 500);
    </script>
  </body>
</html>
```
#### Reactive Updates(灵活跟新？)
在浏览器中打开hello-react.html，在text框中随便输入写内容，你会发现当时间走动时并不影响你的输入——时间(的跟新)完全是由React自动管理的。对此，我们的解决办法是(React)不会(直接)操作DOM，除非需要操作，**它(Reacat)使用了一个快速的、内部模拟的DOM来计算DOM的变化并执行跟新**。用来对组件(var HelloWord)进行的设定(比如传入date="new Date()")的，我们叫它```props```——“properties”的简写，在JSX语法中它(props)作为属性进行传递。你可以认为它是组件内部的一个不变属性，也就是说，在组件内部 **无法被重写**。
#### 你可以认为组件就是一个方法
React组件非常的简单，你可以认为它就是一个聚集了props、state(等下我们会讨论)和render(HTML)
的方法，这样是不是就容易理解了呢。
>   React组件对DOM的渲染必须从一个根节点开始，如果你需要渲染一个DOM数，那么该DOM数必须要包裹在一个根节点内。

#### JSX语法
我们坚信，比起使用“模板”或“展示逻辑”，组件化才是提高耦合性的正确做法。我们认为DOM(树)应该和产生它的代码紧密在一起。而且，展示逻辑通常都是非常复杂的，使用模板会变的更加笨重。最终我们发现，直接使用js这种可编程的代码来生产和组织DOM(树)才能让UI界面更具有展现力。

为了让编码便于理解，我们添加了一种非常简单的、可选的类HTML语法来创建React节点树。JSX使你可以使用HTML语法来创建js对象，下面的代码展示了用纯js代码创建一个a连接
```js
React.createElement('a', {href: 'https://facebook.github.io/react/'}, 'Hello!')
```
它会被解析成```<a href="https://facebook.github.io/react/">Hello!</a>```  
我们会发现这样使我们创建一个React(组件)应用更加容易，设计人员(HTML编写)也更好理解，但是每个人的编码习惯不一样，所以JSX并不是我们必须指定的。 

JSX非常的小，查看[JSX in depth](#jsxindepth)了解更多，或者使用我们的[live JSX compiler](http://facebook.github.io/react/jsx-compiler.html)进行在线尝试。

JSX跟HTML非常像，但他们却也有不同，查阅[JSX Gotchas](#jsxgotchas)了解它们关键的区别。

开始尝试JSX最简单的方法就是使用```JSXTransformer.js```，但我们并不希望你在生产环境中使用，不过你可以使用[react-tools ](https://www.npmjs.com/package/react-tools)来进行与编译。

#### 使用非JSX语法
JSX完全是自选的，你完全可以使用纯js语法```React.createElement```来创建element，参数包含tag名或组件名、属性对象以及一些子参变量(比如子节点名称、文本等)
```js
var child1 = React.createElement('li', null, 'First Text Content');
var child2 = React.createElement('li', null, 'Second Text Content');
var root = React.createElement('ul', { className: 'my-list' }, child1, child2);
React.render(root, document.getElementById('example')); 
```
为了方便，你也可以使用short-hand工厂，创建一个自定义element
```js
var Factory = React.createFactory(ComponentClass);
...
var root = Factory({ custom: 'prop' });
React.render(root, document.getElementById('example'));
```
React已经内建了一些工厂来实现常见的HTML标签
```js
var root = React.DOM.ul({ className: 'my-list' },
             React.DOM.li(null, 'Text Content')
           );
```

#### 深入JSX

#### 为什么使用JSX
#### HTML tags vs React 组件
React既可以渲染HTMLtags(string)，也可以渲染组件(classes)。  
在JSX中使用小写的tags名称来渲染HTML
```js
var myDivElement = <div className="foo" />;
React.render(myDivElement, document.getElementById('example'));
```
我们创建一个以大写开头的局部变量来渲染React组件
```js
var MyComponent = React.createClass({/*...*/});
var myElement = <MyComponent someProperty={true} />;
React.render(myElement, document.getElementById('example'));
```
React使用(首)字母大小写来区别THMLtags跟React组件

### JSX传播属性
待续...
### JSX陷阱
待续...