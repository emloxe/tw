# 线条

## 流动线

形式一
```js
const link = new mono.PathLink(fromNode, toNode);
const plength = link.getPath().getLength();
link.s({
  'm.texture.image': '/static/images/flow.jpg',
  'm.texture.repeat': new mono.Vec2(plength / 60, 1),
});
this.animate = new twaver.Animate({
  from: 1,
  to: 0,
  type: 'number',
  delay: 10,
  dur: 1500,
  easing: 'easeNone',
  reverse: false,
  repeat: Number.MAX_VALUE,
  onUpdate(value) {
    const offset = new mono.Vec2(value, 0);
    link.s({
      'm.texture.offset': offset,
    });
  },
});
```

形式二
用animation动画，from为0，to 为1，update的时候，value 就是0-1的一个小数，然后getPointAt(value)可以获取当前的坐标
流动的物体.setPosition()
```js
const link = new mono.PathLink(fromNode, toNode);
const plength = link.getPath().getLength();
link.s({
  'm.texture.image': '/static/images/point.jpg',
  'm.texture.repeat': new mono.Vec2(plength / 60, 1),
});
this.animate = new twaver.Animate({
  from: 1,
  to: 0,
  type: 'number',
  delay: 10,
  dur: 1500,
  easing: 'easeNone',
  reverse: false,
  repeat: Number.MAX_VALUE,
  onUpdate(value) {
    const offset = new mono.Vec2(value, 0);
    link.s({
      'm.texture.offset': offset,
    });
  },
});
```