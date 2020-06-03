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


## 根据自身高度放置在指定的地点
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

## 给模型添加旋转动画
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

## 创建连续的模型

使用
```js
loadContinuityModelByParams({
  obj: './static/model/weilan/weilan.obj',
  mtl: './static/model/weilan/weilan.mtl',
  objImgUrl: '',
  range: [{x: 100, y: 0}, {x: 300, y: 100}],
  rotationY: Math.PI * 0.05,
  y: 1,
});
```

代码
```js
/**
 * 创建连续的模型
 * @param {String} params.obj 模型obj地址
 * @param {String} params.mtl 模型mtl地址
 * @param {String} params.objImgUrl 图片地址
 * @param {*} params.range 创建的范围
 * @param {*} params.rotationY 初始旋转角度
 * @param {*} params.y 高度
 */
function loadContinuityModelByParams(params) {
  const { obj, mtl, objImgUrl, scale = 1, range, y = 0, rotationY } = params;
  getModelFromPool(obj, mtl, objImgUrl).then((node) => {
    node.setScale(scale, scale, scale);
    node.setRotationY(rotationY);
    const size = mono.Utils.getBoundingBox(node);
    const nodeWidth = size.max.x - size.min.x;
    const allLen = Math.pow(Math.pow(range[0].x - range[1].x, 2)
     + Math.pow(range[0].y - range[1].y, 2), 0.5);
    const nodeNum = Math.ceil(allLen / nodeWidth);
    const newNodeWidth = allLen / nodeNum;
    const newScale = newNodeWidth / nodeWidth;
    const radian = getRadian(range[0], range[1]);
    let start = newNodeWidth / 2;
    while (start < allLen) {
      const cloneNode = node.clonePrefab();
      cloneNode.setScale(scale * newScale, scale, scale);
      cloneNode.setRotationY(rotationY - radian);
      cloneNode.setPosition(
        range[0].x + start * Math.cos(radian),
        -size.min.y + y,
        range[0].y + start * Math.sin(radian),
      );
      start += newNodeWidth;
      this.addNode(cloneNode); // 此处添加到network
    }
  });
}

/**
 * 根据向量来确定旋转角度
 * @param {Object} point1 起始点 如{x: 0, y: 0}
 * @param {Object} point2 终点 如{x: 1, y: 1}
 * @returns 返回旋转的弧度值
 */
function getRadian(point1, point2) {
  const [vx, vy] = [point2.x - point1.x, point2.y - point1.y];
  let radian = 0;

  if (vx !== 0) {
    radian = Math.atan(vy / vx);

    if (vx < 0) {
      radian += Math.PI;
    } else if (vy < 0 && vx > 0) {
      radian += 2 * Math.PI;
    }
  } else if (vy >= 0) {
    radian = Math.PI / 2;
  } else {
    radian = (Math.PI * 3) / 2;
  }

  return radian;
}
```


创建交错的模型，如围栏
使用
```js
loadInterlaceContinuityModelByParams({
  obj2: {
    obj: './static/model/weilan/weilan2.obj',
    mtl: './static/model/weilan/weilan.mtl',
    objImgUrl: '',
    rotationY: 0,
    scale,
    y: 1,
  },
  obj1: {
    obj: './static/model/weilangeqiang/weilangeqiang2.obj',
    mtl: './static/model/weilangeqiang/weilangeqiang.mtl',
    objImgUrl: '',
    rotationY: 0,
    scale,
    y: 1,
  },
  range: line,
});
```

```js
/**
 * 创建交错连续的模型
 * @param {Object} params.obj1 模型1
 * @param {String} params.obj1 模型1
 * @param {String} params.obj1 模型1
 * @param {String} params.obj1.rotationY 模型1初始旋转角度
 * @param {String} params.obj1 模型1
 * @param {String} params.obj2 模型mtl地址
 * @param {*} params.range 创建的范围
 */
loadInterlaceContinuityModelByParams(params) {
  const { obj1, obj2, range } = params;
  Promise.all([
    getModelFromPool(obj1.obj, obj1.mtl, obj1.objImgUrl),
    getModelFromPool(obj2.obj, obj2.mtl, obj2.objImgUrl),
  ]).then(([node1, node2]) => {
    node1.s({
      'm.side': mono.DoubleSide,
    });

    node2.s({
      'm.side': mono.DoubleSide,
    });

    const { scale: scale1 = 1, y: y1 = 0, rotationY: rotationY1 } = obj1;
    const { scale: scale2 = 1, y: y2 = 0, rotationY: rotationY2 } = obj2;
    node1.setScale(scale1, scale1, scale1);
    node1.setRotationY(rotationY1);
    const size1 = mono.Utils.getBoundingBox(node1);
    const node1Width = size1.max.x - size1.min.x;
    node2.setScale(scale2, scale2, scale2);
    node2.setRotationY(rotationY2);
    const size2 = mono.Utils.getBoundingBox(node2);
    const node2Width = size2.max.x - size2.min.x;

    const allLen = Math.pow(Math.pow(range[0].x - range[1].x, 2)
     + Math.pow(range[0].y - range[1].y, 2), 0.5);
    const nodeNum = Math.ceil((allLen - node1Width) / (node1Width + node2Width));
    const newNode2Width = (allLen - node1Width * (nodeNum + 1)) / nodeNum;
    const newNode2Scale = newNode2Width / node2Width;
    const radian = getRadian(range[0], range[1]);
    let start = 0;
    let index = 0;
    while (index < nodeNum) {
      const cloneNode1 = node1.clonePrefab();
      cloneNode1.setScale(scale1, scale1, scale1);
      cloneNode1.setRotationY(rotationY1 - radian);
      cloneNode1.setPosition(
        range[0].x + (start + node1Width / 2) * Math.cos(radian),
        -size1.min.y + y1,
        range[0].y + (start + node1Width / 2) * Math.sin(radian),
      );

      const cloneNode2 = node2.clonePrefab();
      cloneNode2.setScale(scale2 * newNode2Scale, scale2, scale2);
      cloneNode2.setRotationY(rotationY2 - radian);
      cloneNode2.setPosition(
        range[0].x + (start + node1Width + newNode2Width / 2) * Math.cos(radian),
        -size2.min.y + y2,
        range[0].y + (start + node1Width + newNode2Width / 2) * Math.sin(radian),
      );

      start += node1Width + newNode2Width;
      index++;
      this.addNode(cloneNode1);
      this.addNode(cloneNode2);
    }

    const cloneNode1 = node1.clonePrefab();
    cloneNode1.setScale(scale1 + 0.01, scale1, scale1);
    cloneNode1.setRotationY(rotationY1 - radian);
    cloneNode1.setPosition(
      range[0].x + (start + node1Width / 2) * Math.cos(radian),
      -size1.min.y + y1,
      range[0].y + (start + node1Width / 2) * Math.sin(radian) ,
    );
    this.addNode(cloneNode1);
  });
}
```