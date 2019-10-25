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
  scale = [0, 0, 0],
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