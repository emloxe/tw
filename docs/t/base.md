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

const directionalLight = new mono.DirectionalLight(0xaaaaaa, 0.5);
directionalLight.setDirection(new mono.Vec3(1, 1, 1));
box.add(directionalLight);

let pointLight = new mono.PointLight(0xFFFFFF, 0.1);
pointLight.setPosition(3000, 3000, 3000);
box.add(pointLight);

pointLight = new mono.PointLight(0xFFFFFF, 0.7);
pointLight.setPosition(0, 3000, 3000);
box.add(pointLight);

pointLight = new mono.PointLight(0xFFFFFF, 0.4);
pointLight.setPosition(-3000, 3000, -3000);
box.add(pointLight);

box.add(new mono.AmbientLight(0x222222));
```

## 镜头

```js
const camera = network.getCamera();
camera.setPosition(100, 0, 0);
camera.lookAt(0, 0, 0);
camera.setNear(20);
```

## 交互限制
```js
const defaultInteraction = network.getDefaultInteraction();
defaultInteraction.maxDistance = 6000;
defaultInteraction.minDistance = 200;
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


## 其他

// 开启坐标系
```js
network.setShowAxis(true);
```
