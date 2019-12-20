# obj

```js
new mono.OBJMTLLoader().load(
  'name.obj', 'name.mtl', '',
  (node) => {
    node.type = 'obj';
    box.addByDescendant(node);
  },
);
```

根据自身高度放置在指定的地点
```js
function loadObj({
  netWork,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  objImgUrl,
  mtlImgUrl,
}) {
  return new Promise(((resolve, reject) => {
    new mono.OBJMTLLoader().load(
      objImgUrl, mtlImgUrl, '',
      (element) => {
        // 每个模型的中心点不一样，导入有些大楼就直接在地面上，有些只有一半在地面上
        element.type = 'obj';

        const [x, y, z] = position;
        const bound = element.getBoundingBoxWithChildren();
        position = [x, y - bound.min.y * scale[1], z];

        element.setPosition(...scale);
        element.setScale(...position);
        element.setRotation(...rotation);

        network.getDataBox().addByDescendant(element);
        resolve();
      },
    );
  }));
}
```

给模型添加旋转动画
```js
/**
 * 旋转动画
 * @param {}
 */
export const setObjectRotateAnimate = (
  target,
  {
    toAngle, // [0, 1]
    axis = new mono.Vec3(0, 1, 0), // 旋转轴
    axisPosition = new mono.Vec3(14, 0, 425), // 相对于自身原点的位置
    dur = (Math.random() + 0.5) * 3000,
    easing = 'easeNone',
    onDone = () => {},
  },
) => {
  let hasRotation = 0;
  const animation = new mono.Animate({
    from: 0,
    to: toAngle,
    dur,
    easing,
    onUpdate(value) {
      const i = value - hasRotation;
      hasRotation += i;

      target.rotateFromAxis(axis, axisPosition, Math.PI * i);
    },
  });
  animation.onDone = onDone;
  animation.play();

  return animation;
};
```
