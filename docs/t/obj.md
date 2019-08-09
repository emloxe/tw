# obj

```js
new mono.OBJMTLLoader().load(
  'name.obj', 'name.mtl', '',
  (node) => {
    node._type = 'obj';
    box.addByDescendant(node);
  },
);
```