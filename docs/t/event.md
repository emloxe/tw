# 事件

## 点击

获取当前点击的element
```js
network.getRootView().addEventListener('click', (e) => {
  const elements = network.getElementsByMouseEvent(e);

  // 鼠标点击的第一个元素的世界坐标
  console.log(elements[0].element.point);
});
```