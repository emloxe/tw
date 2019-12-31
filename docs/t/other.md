# other


## 巡航


## 根据client查询node

如果我们在node上设置
```js
node.setClient('id', id);
```
然后这样获取到
```js
const quickFinder = new mono.QuickFinder(this.getDataBox(), 'id', 'client');
const nodes = quickFinder.find(id).toArray();
```

通用方式
```js
/**
 * 通用 quickFinder
 * @param {mono.Network3D} network 拓扑图对象
 * @param {string} propertyType 索引的属性类型，'accessor' 'style' 'client'
 * @param {string} key 属性名
 * @param {*} value 属性值
 */
export const findNodesByQuickFinder = (network, propertyType, key, value) => {
  const box = network.getDataBox();

  const quickFinder = new mono.QuickFinder(box, key, propertyType);

  const nodes = quickFinder.find(value).toArray();

  quickFinder.dispose();

  return nodes;
};
```

