---
date:   2015-06-30 16:51:33 +0800
title: "[译]「React教程」(向导)组件的重用"
status: invalid 
---

### Prop验证

随着你的程序(网站)不断壮大，所有的组件都应该被正确使用。你可以指定```propTypes```。```React.PropTypes```可以导出你所接收的数据的验证结果，如果有未通过验证的，你可以在console中看到提示。为了提高性能，```propTypes```只在开发环境中被检测，以下是一个不同的验证的例子。

{% highlight javascript linenos %}
React.createClass({
  propTypes: {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    optionalArray: React.PropTypes.array,
    optionalBool: React.PropTypes.bool,
    optionalFunc: React.PropTypes.func,
    optionalNumber: React.PropTypes.number,
    optionalObject: React.PropTypes.object,
    optionalString: React.PropTypes.string,

    // Anything that can be rendered: numbers, strings, elements or an array
    // containing these types.
    optionalNode: React.PropTypes.node,

    // A React element.
    optionalElement: React.PropTypes.element,

    // You can also declare that a prop is an instance of a class. This uses
    // JS's instanceof operator.
    optionalMessage: React.PropTypes.instanceOf(Message),

    // You can ensure that your prop is limited to specific values by treating
    // it as an enum.
    optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

    // An object that could be one of many types
    optionalUnion: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.instanceOf(Message)
    ]),

    // An array of a certain type
    optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

    // An object with property values of a certain type
    optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

    // An object taking on a particular shape
    optionalObjectWithShape: React.PropTypes.shape({
      color: React.PropTypes.string,
      fontSize: React.PropTypes.number
    }),

    // You can chain any of the above with `isRequired` to make sure a warning
    // is shown if the prop isn't provided.
    requiredFunc: React.PropTypes.func.isRequired,

    // A value of any data type
    requiredAny: React.PropTypes.any.isRequired,

    // You can also specify a custom validator. It should return an Error
    // object if the validation fails. Don't `console.warn` or throw, as this
    // won't work inside `oneOfType`.
    customProp: function(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
  },
  /* ... */
});
{% endhighlight %}

### 默认的Prop值

你可以很明确的指定```Prop```的值

{% highlight javascript linenos %}
var ComponentWithDefaultProps = React.createClass({
  getDefaultProps: function() {
    return {
      value: 'default value'
    };
  }
  /* ... */
});
{% endhighlight %}

```getDefaultProps()```的结果将会被缓存起来，如果父组件没有规定相应的值，那么```this.props.value```将会将把它作为默认值。This allows you to safely just use your props without having to write repetitive and fragile code to handle that yourself.

### 传递Prop：创建一个快捷方式

一种常见的组件类型是扩展的一个简单的HTML树。通常你想传递给你的组件任何HTML属性复制到底层HTML原素，你可以使用JSX语法来实现。

{% highlight javascript linenos %}
var CheckLink = React.createClass({
  render: function() {
    // This takes any props passed to CheckLink and copies them to <a>
    return <a {...this.props}>{'√ '}{this.props.children}</a>;
  }
});

React.render(
  <CheckLink href="/checked.html">
    Click here!
  </CheckLink>,
  document.getElementById('example')
);
{% endhighlight %}

### 单个子元素

使用```React.PropTypes.element```来绑定时只能有一个原素被传递给一个组件。

{% highlight javascript linenos %}
var MyComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  render: function() {
    return (
      <div>
        {this.props.children} // This must be exactly one element or it will throw.
      </div>
    );
  }
});
{% endhighlight %}

### 混合(Mixins)

在React中重用代码最好的方式就是创建组件，有时候看起来非常不一样的组件也可能用到相同的方法(代码)。也就是所谓的[cross-cutting concerns](https://en.wikipedia.org/wiki/Cross-cutting_concern)，React使用```Mixins```来解决这个问题。

一个常见的情形就是一个组件需要在一定的时间间隔内更新自己，使用```setInterval()```就可以实现，但重要的是当你不再需要做更新的时候就需要取消这段间隔来释放占用的内存。React提供了[生命周期(lifecycle methods)]()方法来让你掌控组件的创建和销毁
让我们举个例子来说明。

{% highlight javascript linenos %}
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var TickTock = React.createClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

React.render(
  <TickTock />,
  document.getElementById('example')
);
{% endhighlight %}

Mixins的一个非常不错的特性是当一个组件使用多个Mixins而且其中一些拥有相同的生命周期管理方法(比如组件销毁时清除)，所有的Mixins都能保证被调用。Methods defined on mixins run in the order mixins were listed, followed by a method call on the component.

### ES6类

我们可以把组件定义为一个普通的js类，也可以使用ES6的语法。

{% highlight javascript linenos %}
class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}
React.render(<HelloMessage name="Sebastian" />, mountNode);
{% endhighlight %}

这个API类似于没有```getInitialState```方法的```React.createClass```.在构造器中定义你自己的```state ```方法来替代单独写一个```getInitialState```方法。比起在类体中定义，另外一个不同的地方就是```propTypes ```和```defaultProps```在构造器```constructor()```中被当作属性定义。

{% highlight javascript linenos %}
export class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
Counter.propTypes = { initialCount: React.PropTypes.number };
Counter.defaultProps = { initialCount: 0 };
{% endhighlight %}

这里的方法遵循跟regular ES6的类一样的语义，也就是说实例中无法绑定```this```，你使用```.bind(this)```或者[箭头方法(array function)]()```=>```。不幸的是ES6不支持Mixins， we're working on making it easier to support such use cases without resorting to mixins.