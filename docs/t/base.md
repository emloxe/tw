# base

## init

```html
<canvas id="monoCanvas" />
<script type="text/javascript">
const box = new mono.DataBox();
const network = new mono.Network3D(box, null, monoCanvas);
</script>
```

## 调整宽高
```js
mono.Utils.autoAdjustNetworkBounds(
  network,
  document.documentElement,
  "clientWidth",
  "clientHeight"
);
```

## 清除背景

```js
network.setClearColor(0, 0, 0);
network.setClearAlpha(0);
```

## 光源
```js
const box = network.getDataBox();
const directionalLight = new mono.DirectionalLight(0x333333, 0.3);
directionalLight.setDirection(new mono.Vec3(0, 1, 1));
box.add(directionalLight);
let pointLight = new mono.PointLight(0xaaaaaa, 0.3);
pointLight.setPosition(2000, 2000, 2000);
box.add(pointLight);
pointLight = new mono.PointLight(0xaaaaaa, 0.3);
pointLight.setPosition(-2000, 2000, 2000);
box.add(pointLight);
pointLight = new mono.PointLight(0xaaaaaa, 0.3);
pointLight.setPosition(2000, 2000, -2000);
box.add(pointLight);
pointLight = new mono.PointLight(0xaaaaaa, 0.3);
pointLight.setPosition(-2000, 2000, -2000);
box.add(pointLight);
box.add(new mono.AmbientLight(0x888888));
```

## 镜头

```js
const camera = network.getCamera();
camera.setPosition(100, 0, 0);
camera.lookAt(0, 0, 0);
camera.setNear(20);
```

## 交互限制
最大距离和最小距离
```js
const defaultInteraction = network.getDefaultInteraction();
defaultInteraction.maxDistance = 6000;
defaultInteraction.minDistance = 200;
```

禁止鼠标右键拖拽
```js
network.getDefaultInteraction().noPan = true;
```
镜头视角
```js
network.getDefaultInteraction().yLowerLimitAngle = Math.PI / 100
```
## 天空盒
天空盒是采用make导入模型
```js
const skyBox = make.Default.load([
  {
    id: 'twaver.scene.skybox',
    radius,
    image: 'skybox_sixblue.jpg',
    floorImage: '6.png',
    client: {
      bid: ''
    },
    position: [0, 0, 0],
    rotation: [0, 0, 0]
  }
])[0];
box.add(skyBox);
```

## 取消选中的绿色边框效果
```js
network.setRenderSelectFunction(() => false);
```

## 其他

// 开启坐标系
```js
network.setShowAxis(true);
```
