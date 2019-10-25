# cube

## 基础方法

```js
const cube = new mono.Cube(width, height, depth);
cube.setPosition(x, y, z);
cube.s({
  'm.type': 'phong',
  'front.m.color': style.borderColor,
  'right.m.color': style.borderColor,
  'back.m.color': style.borderColor,
  'left.m.color': style.borderColor,
  'bootom.m.color': style.borderColor,
  'top.m.texture.image': imgUrl,
  'm.side': mono.DoubleSide,
});
```

如果只采用一面贴图 用`m.color`，贴图面会与颜色混合。