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
const pointLight = new mono.PointLight(0xffffff, 1.5);
pointLight.setPosition(1000, 1000, 1000);
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
