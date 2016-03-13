---
date:   2015-06-22 16:51:33 +0800
title: "[译]「React教程」(向导)复合组件"
status: invalid 
---

### 动机：关注分离

创建模块化的组件并重用其他拥有良好接口的模块能带来跟使用(或者说重用)functions&classes一样的好处。特别是可以将你在开发app的过程中将不同的关注分离开来(比如，数据/状态/UI等)，however you please simply by building new components.为你的项目创建一个组件仓库，为你的网站做出最合适的界面。

### (如何)复合的例子

让我们使用Facebook Graph API来创建一个简单的Avatar组件。
{% highlight javascript %}
var Avatar = React.createClass({
  render: function() {
    return (
      <div>
        <ProfilePic username={this.props.username} />
        <ProfileLink username={this.props.username} />
      </div>
    );
  }
});

var ProfilePic = React.createClass({
  render: function() {
    return (
      <img src={'https://graph.facebook.com/' + this.props.username + '/picture'} />
    );
  }
});

var ProfileLink = React.createClass({
  render: function() {
    return (
      <a href={'https://www.facebook.com/' + this.props.username}>
        {this.props.username}
      </a>
    );
  }
});

React.render(
  <Avatar username="pwh" />,
  document.getElementById('example')
);
{% endhighlight %}

### 所属关系

在上面的例子中，Avatar的实例拥有ProfilePic和ProfileLink。在React中，如果组件A是在组件B的```render()```方法中被创建的，那么B就拥有A。就像之前讨论的，你无法改变一个组件的```props```属性，它永远保持跟它的所有者设置的一致，这个关键的属性保证了UI上的可复合(或组合)。

> 组件props的唯一性保证了多个组件耦合时依然能相对独立，可操作。

这也是区别所属关系(owner-ownee)和父子关系(parent-child)的重要判别。所属关系在React中是非常具体的，父子关系就像DOM之间的父子节点一样。在上面的例子中，Avatar拥有实例div,ProfileLink和ProfilePic，而div是ProfileLink和ProfilePic的父节点，但div并不拥有他们。

在你创建了一个组件实例之后，你可以一个闭合标签内插入另外的组件或者一段javascript表达式，就像这样：

{% highlight html %}
<Parent><Child /></Parent>  
{% endhighlight %}

```Parent```可以通过```this.props.children```来访问```Child```，```this.props.children```是一个非透明的数据结构，你可以使用[React.Children.utilities]()来操作他。

### Child Reconciliation(子节点中和？)

**通常，子节点根据他们的生成顺序进行```中和```**，假定有两个渲染过程生成以下相应的结构：

> 如下边的例子，浏览器第一次渲染Card时创建p1,p2，紧接着又重新渲染(由于Render Pass2)Card，这个时候可以认为两个Card结构做了一次‘中和’，

{% highlight html %}
// Render Pass 1
<Card>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</Card>
// Render Pass 2
<Card>
  <p>Paragraph 2</p>
</Card> 
{% endhighlight %}

直观的来看，```<p>Paragraph 1</p>```被移除，换而言之，React改变了第一个```<p>```的内容而且销毁了第二个```<p>```节点，以此来达到(节点的)‘中和’。中和的结果取决于子节点的顺序。

### 子节点状态

对大多数组件来说，状态不是什么大问题。但是对于一些在渲染(Render)过程中通过```this.state```来维持状态的富状态组件来说，这将是个麻烦事。大多是情况是，隐藏一些元素而不是销毁它们来规避被中和

{% highlight html %}
// Render Pass 1
<Card>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</Card>
// Render Pass 2
<Card>
  <p style={{display: 'none'}}>Paragraph 1</p>
  <p>Paragraph 2</p>
</Card> 
{% endhighlight %}

### 动态子元素

当子元素被抛弃(比如搜索结果)或者新组件被添加到一个列表的前面(比如流[streams])等如此类似的情况时，事情会变得复杂。在这些情况中需要在渲染过程中维持每个子元素的特性和状态，而你可以为每个子元素绑定一个唯一的```key```。

{% highlight javascript %}
render: function() {
    var results = this.props.results;
    return (
      <ol>
        {results.map(function(result) {
          return <li key={result.id}>{result.text}</li>;
        })}
      </ol>
    );
  }
{% endhighlight %}

当在中和这些被绑定了```key```的元素时，React能够确认那些能被重新排序(而不是被破坏)或者被销毁(而不是重复使用)。```key```应该直接应用到组件的队列中，而不是队列中每个组件的HTML容器。

{% highlight javascript %}
// WRONG!
var ListItemWrapper = React.createClass({
  render: function() {
    return <li key={this.props.data.id}>{this.props.data.text}</li>;
  }
});
var MyComponent = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.results.map(function(result) {
          return <ListItemWrapper data={result}/>;
        })}
      </ul>
    );
  }
});

// Correct :)
var ListItemWrapper = React.createClass({
  render: function() {
    return <li>{this.props.data.text}</li>;
  }
});
var MyComponent = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.results.map(function(result) {
           return <ListItemWrapper key={result.id} data={result}/>;
        })}
      </ul>
    );
  }
});
{% endhighlight %}

你也可以通过传递一个```ReactFragment```对象来绑定节点的key，查看[Keyed Fragments]()。

### 数据流

在React中，数据从组件所有者到该组件通过```props```来传递数据。这是非常有效的单向数据绑定:所有者根据它自己的```props```和```state```计算所得的结果来绑定它所拥有的组件的```props```值。由于这是个递归过程，于是所有使用到的地方数据都会自动发生改变。

### 性能上的一点说明

你也许会想，如果一个所有者拥有大量元素的时候改变他们的数据会非常耗能，不过javascript本身是非常快的，而且```Render()```方法十分简单，对大多数应用来说，单向数据绑定这个过程非常快。此外，瓶颈一般来自于DOM节点的突变而非js代码的执行过程，React会通过```batching```和侦测变化来进行优化。然而，有些时候你可能想对性能有较为精细的掌控，重写使```shouldComponentUpdate()```返回false可以让React跳过对子树的操作。查看详情[the React reference docs]()。

> 如果```shouldComponentUpdate()```返回false，那么当数据发生改变的时候，UI上就不会同步改变，在使用时最好保证你清楚为什么使用，如果不是明显的性能问题不建议使用，毕竟javascript比起DOM实在是快多了。　

