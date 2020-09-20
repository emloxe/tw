# gltf

```js
mono.GLTFLoader.load(
  url, name,
  (node) => {
    node.type = 'gltf';
    box.addByDescendant(node);
  },
  { bufferNode: true },
);
```
