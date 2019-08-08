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
const clearBackground = (network) => {
  // code goes here
  if (isNetwork3d(network)) {
    network.setClearColor(0, 0, 0);
    network.setClearAlpha(0);
  }
};
clearBackground(network);
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
camera.look(0, 0, 0);
```

## 天空盒



## 其他

// 开启坐标系
```js
network.setShowAxis(true);
```
