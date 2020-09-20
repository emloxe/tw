# 关于贴图清晰度
为了让整体效果更佳清晰，在设置贴图的时候传入图片如果宽高都为2的幂更佳。


## mono自带的方法

```js
const cube = new mono.Cube(width, height, depth);
const canvas = mono.Utils.createTextImage(text, {
  font: '200px Arial',
  color: 'white',
  background: style.bgColor,
  textAlign: 'center',
  powerOfTwo: true,
  ratio: width / depth,
});
const repeat = new mono.Vec2(canvas.drawRect.width / canvas.width, canvas.drawRect.height / canvas.height);
cube.s({
  'top.m.texture.image': canvas,
  'top.m.texture.repeat': repeat,
  'top.m.texture.anisotropy': 16,
});
```

## 传入宽高，生成字体大小自适应的的图片

```js
function createCanvas({
  width = 512,
  height = 256,
  text = '',
  borderWidth = 4,
  borderColor = '#04d8ff',
  bgColor = '#0b1a31',
  fontSize = 25,
  fontColor = '#01dbff',
}) {
  width = mono.Utils.nextPowerOfTwo(width) * 2;
  height = mono.Utils.nextPowerOfTwo(height) * 2;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // 背景
  ctx.fillStyle = bgColor;
  ctx.rect(0, 0, width, height);
  ctx.fill();
  // 边框
  if (borderWidth) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth * 2;
    ctx.rect(0, 0, width, height);
    ctx.stroke();
  }
  // 文字
  if (text) {
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = fontColor;
    const font = `${fontSize}px Arial`;
    ctx.font = font;
    // const {height: txtw} = mono.Utils.getMaxTextSize(text, font);
    const txtw = ctx.measureText(text).width;
    if (txtw > width - borderWidth * 2) {
      ctx.translate(width / 2, height / 2);
      ctx.scale((width - borderWidth * 2) / txtw, (width - borderWidth * 2) / txtw);
      ctx.fillText(text, 0, 0);
    } else {
      ctx.fillText(text, width / 2, height / 2);
    }
  }
  return canvas;
}
```

## 传入文字和字体，生成宽度自适应的图片

```js
function createCanvas({
  text = '',
  borderWidth = 0,
  borderColor = '#04d8ff',
  bgColor = '#0b1a31',
  fontSize = 100,
  fontColor = '#01dbff',
}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  let { width, height } = mono.Utils.getTextSize(`${fontSize}px Arial`, text);
  width = mono.Utils.nextPowerOfTwo(width + borderWidth * 2);
  height = mono.Utils.nextPowerOfTwo(height + borderWidth * 2);

  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  // 背景
  ctx.fillStyle = bgColor;
  ctx.rect(0, 0, width, height);
  ctx.fill();
  // 边框
  if (borderWidth) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth * 2;
    ctx.rect(0, 0, width, height);
    ctx.stroke();
  }

  // 文字
  if (text) {
    ctx.font = `${fontSize}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = fontColor;
    ctx.fillText(text, width / 2, height / 2);
  }

  return { canvas, w: width / 2, h: height / 2 };
}
```