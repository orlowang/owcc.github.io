---
date:   2015-05-18 16:51:33 +0800
title: "[译]「React教程」(向导)动态交互性UI"
---

现在你已经明白了如何[在程序界面中显示数据](#)，接下来我们看看如何使界面变得可交互。

下面是一个简单的例子

{% highlight javascript %}
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});
```

React.render(
  <LikeButton />,
  document.getElementById('example')
);
{% endhighlight %}

#####事件处理和合成事件
React中的事件传递非常简单，只需要驼峰命名其事件名称，就像常规的HTML事件(比如点击事件onClick)。React通过事件合成系统可以确保IE8及以上浏览器能正常运行。也就是说，不管你使用何种浏览器，React事件处理都能按W3C规则进行冒泡和捕捉。React事件在手机和平板电脑上的支持也很简单，只需要执行```React.initializeTouchEvents(true)```来使用触摸事件。

#####深入了解：自动绑定和事件委派

**```自动绑定：```**在js中当创建一个回调函数时，我们经常需要明确绑定一个方法到其自身的实例上，比如this。React中的每个事件都自动绑定了其组件的实例，React caches the bound method such that it's extremely CPU and memory efficient.同事减少了代码量。  

**```事件委派：```**React本身并不会附加事件到DOM节点上，当React启动时，它会启动一个单线程的事件监听器来监听所有的上层事件，当组件挂载(或卸载)时，相应的事件处理就会被添加(或移除)到一个内部映射中，当某个事件被激活，React就会通过这个映射来调度该事件，如果映射中没有事件，就不进行操作，更多详情[How JavaScript Event Delegation Works](http://davidwalsh.name/event-delegate)。

#####组件仅仅是一个状态机

React认为UI就是一些简单的状态的集合，把UI当成各种状态的集合并分别渲染，这样就使UI的连贯操作非常容易。你只需要跟新你的组件状态，React会以最高效的方式为你基于你的变化而跟新渲染你的UI界面。

#####State如何工作？

通常通过调用```setState(data, callback)```，来通知React数据的改变，该方法会将```data```合并到```this.state```并且重绘组件，当重绘完成，开始执行回调方法(如果```callback```存在)。大多数时间你并不需要提够回调方法，因为React总是能及时的跟新到最新的状态。

#####哪些组件应该有状态(State)

大多数组件应该会有一些从```props```而来的数据(```data```)，并且渲染它。然而，有时候你需要回应一些用户输入(如input)、服务器请求或the passage of time，此刻你应该使用```state```。**让你的组件尽可能少的使用状态**By doing this you'll isolate the state to its most logical place，减少冗余，并且保证良好的可读性。**最常见的做法是创建一些仅仅渲染数据(```data```)的无状态组件，然后在他们之上有一些富状态组件，通过```props```将状态传递这些子节点**富状态组件管理所有的交互逻辑，而无状态组件负责数据渲染。

>   [释]：(待补充...)

#####

**State应该包含组件的处理事件可能触发的界面变化的数据**，事实上，这些数据应该很小而且是JSON格式的。在创建富状态组件时，应该存储可能的最小单元的状态到```this.state```



