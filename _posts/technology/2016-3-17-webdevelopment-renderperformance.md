---
title: "Web开发之渲染性能"
draft: true
changeable: true
---

>本文中的大部分内容可以在文中提供的链接中找到，本文只是做一个资源的整理。

### 渲染流水线

我们通常使用javascript来实现一些视觉变换效果，这个过程可以归纳为这样一条流水线，包含五个关键步骤：

{% include image.html src="frame-full.jpg" %}

>如今大多数设备屏幕刷新率都是**60次/秒(60fps)**，理论上说，每一帧都要经过以上流水线渲染出来，也就是说，每一帧要在16毫秒(1秒/60=16.66毫秒)内完成，但实际上，在渲染某一帧画面的同时，浏览器还有一些额外的工作要做（比如渲染队列的管理，渲染线程与其他线程之间的切换等等）。因此单纯的渲染工作，一般需要控制在10毫秒之内完成，才能达到流畅的视觉效果。如果超过了这个时间限度，页面的渲染就会出现卡顿效果，也就是常说的jank。

如果你修改了一个DOM元素的**layout**属性(如宽度、高度或位置)，会激发页面的`reflow`完成重新布局，会完整的经历以上流水线；如果你修改了仅是**paint only**，比如背景图、字体颜色或阴影，那么会跳过布局过程。

{% include image.html src="frame-no-layout.jpg" %}

如果你修改一个非样式且非绘制的CSS属性，那么浏览器会在完成样式计算之后，跳过布局和绘制的过程，直接做渲染层合并。

{% include image.html src="frame-no-layout-paint.jpg" %}

第三种方式在性能上是最理想的，对于动画和滚动这种负荷很重的渲染，我们要争取使用第三种渲染流程。为了达到理想的渲染流水线，你需要对元素谨慎使用会被修改的样式属性，只能使用那些仅触发渲染层合并的属性。目前，只有两个属性是满足这个条件的：`transforms`和`opacity`：

- 改变位置 - transform: translate(npx, npx);  
- 改变缩放 - transform: scale(n);  
- 角度旋转 - transform: rotate(ndeg);  
- 角度倾斜 - transform: skew(X/Y)(ndeg);  
- 矩阵变换 - transform: matrix(3d)(...);  
- 透明度 - opacity:   0...1;

应用了`transforms/opacity`属性的元素必须**独占一个渲染层**。为了对这个元素创建一个自有的渲染层，你必须提升该元素。下面让我看看如何把一个元素提升到单独的渲染层中。

{% highlight css linenos %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

对于旧版本或不支持will-change属性的浏览器：

{% highlight css linenos %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

使用这个CSS属性能提前告知浏览器：这个元素将会执行动画效果。从而浏览器可以提前做一些准备，比如为这个元素创建一个新的渲染层。

这看上去非常诱人，以致于你准备对页面中所有元素都这么处理：

{% highlight css linenos %}
* {
  will-change: transform;
  transform: translateZ(0);
}
{% endhighlight %}

上面这段代码意味着你想对页面中每个元素都创建一个自有的渲染层。问题是，创建一个新的渲染层并不是免费的，它得消耗额外的内存和管理资源。实际上，在内存资源有限的设备上，由于过多的渲染层来带的开销而对页面渲染性能产生的影响，甚至远远超过了它在性能改善上带来的好处。由于每个渲染层的纹理都需要上传到GPU处理，因此我们还需要考虑CPU和GPU之间的带宽问题、以及有多大内存供GPU处理这些纹理的问题。

简而言之，**当且仅当需要的时候才为元素创建渲染层**。



























