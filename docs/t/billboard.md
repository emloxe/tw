# billboard

## 基础方法

```js
const billboard = new mono.Billboard();
billboard.setScale(30, 30, 1);
billboard.setPosition(0, 0, 0);

this.drawWaveImage();
billboard.s({
  'm.texture.image': this._canvas,
  'm.transparent': true,
  'm.depthTest': false,
  'm.alignment': mono.BillboardAlignment.center,
});
billboard.setSelectable(false);
box.add(billboard);
```


## 动态更新内容

动态更新内容，就是将传入的canvas，进行重新绘制，绘制完成后设置`billboard.invalidateTexture();`

```js

const billboard = new mono.Billboard();
billboard.s({'m.texture.image': canvas});

new mono.Animate({
  from: 0,
  to: 1,
  dur: 3000 - this._power,
  reverse: false,
  repeat: Number.POSITIVE_INFINITY,
  easing: 'easeNone',
  onUpdate(value) {
    drawCanvas(canvas, value); // canvas绘制函数
    billboard.invalidateTexture();
  },
}).play();
```

## 不随着镜头缩放

```js
const billboard = new mono.Billboard();
billboard.setScale(30, 30, 1);
billboard.setPosition(0, 0, 0);

this.drawWaveImage();
billboard.s({
  'm.texture.image': this._canvas,
  'm.transparent': true,
  'm.fixedSize': 300, // 添加
  'm.depthTest': true,
  'm.alignment': mono.BillboardAlignment.center,
});
billboard.setSelectable(false);
billboard.setSizeFixed(true); // 添加
box.add(billboard);
```



