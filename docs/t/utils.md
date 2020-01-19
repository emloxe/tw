# uitls

```js
/**
 * 调整3d拓扑图的可视窗口的宽高
 * @name adjustBounds3d
 * @function
 * @param {mono.Network3D} network 3d 拓扑图对象
 */
export const adjustBounds3d = (network) => {
  const view = network.getRootView();
  const { clientHeight: height, clientWidth: width } = view.parentNode;
  network.adjustBounds(width, height, 0, 0);
};
```