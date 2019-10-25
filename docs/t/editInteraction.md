# 编辑

```js
const editInteraction = new mono.EditInteraction(network);
network.setInteractions([...network.getInteractions(), editInteraction]);
```

关于具有父子层级的对象，操作时有些子元素不想具备单独移动的功能，可以这样设置
`child.editTransformToParent = true;`

network上修改这个方法
```js
network.getFirstEditElement = (elements) => {
  if (elements == null) {
    return null;
  }
  let i = 0;
  let result;
  while (i < elements.length) {
    const element = elements[i];
    if (element.element.isSelectable()) {
      result = element.element;
      while (result.editTransformToParent) {
        result = result.getParent();
      }
      break;
    }
    i += 1;
  }
  return result;
};
```

obj导入可以用以下方法把每个对象绑成一个编辑对象
```js
function editTransformToParent(element) {
  element.getChildren().forEach((child) => {
    child.editTransformToParent = true;
    editTransformToParent(child);
  });
}
```