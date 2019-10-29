# cube

## 基础方法

```js
const cube = new mono.Cube(width, height, depth);
cube.setPosition(x, y, z);
cube.s({
  'm.type': 'phong',
  'front.m.color': style.borderColor,
  'right.m.color': style.borderColor,
  'back.m.color': style.borderColor,
  'left.m.color': style.borderColor,
  'bootom.m.color': style.borderColor,
  'top.m.texture.image': imgUrl,
  'm.side': mono.DoubleSide,
});
```

如果只采用一面贴图 用`m.color`，贴图面会与颜色混合。

## roundcube

```js
/**
 * 生成带圆弧的cube
 *
 * @export
 * @param {*} { width, height, depth, radius, color, objectId }
 * @returns
 */
export function roundcube({
  width, height = 10, depth, radius = 20, color = '#164478', objectId, opacity = 1,
}) {
  const centerNode = new mono.Cube({
    width,
    height,
    depth,
  });
  centerNode.s({
    'm.type': 'phong',
    'm.color': color,
  });

  const leftNode = new mono.Cube({
    width: radius,
    height,
    depth,
  });
  leftNode.s({
    'm.type': 'phong',
    'm.color': color,
  });
  leftNode.p(-width / 2 - radius / 2, 0, 0);


  const rightNode = new mono.Cube({
    width: radius,
    height,
    depth,
  });
  rightNode.s({
    'm.type': 'phong',
    'm.color': color,
  });
  rightNode.p(width / 2 + radius / 2, 0, 0);


  const topNode = new mono.Cube({
    width,
    height,
    depth: radius,
  });
  topNode.s({
    'm.type': 'phong',
    'm.color': color,
  });
  topNode.p(0, 0, -depth / 2 - radius / 2);


  const bottomNode = new mono.Cube({
    width,
    height,
    depth: radius,
  });
  bottomNode.s({
    'm.type': 'phong',
    'm.color': color,
  });
  bottomNode.p(0, 0, depth / 2 + radius / 2);

  const leftTopCylinder = new mono.Cylinder({
    radiusTop: radius,
    radiusBottom: radius,
    height,
    arcLength: Math.PI / 2, // 圆柱的圆弧所占长度
    arcStart: Math.PI, // 圆弧开始的角度
  });

  leftTopCylinder.s({
    'm.type': 'phong',
    'm.color': color,
  });
  leftTopCylinder.p(-width / 2, 0, -depth / 2);


  const rightTopCylinder = new mono.Cylinder({
    radiusTop: radius,
    radiusBottom: radius,
    height,
    arcLength: Math.PI / 2, // 圆柱的圆弧所占长度
    arcStart: Math.PI / 2, // 圆弧开始的角度
  });

  rightTopCylinder.s({
    'm.type': 'phong',
    'm.color': color,
  });
  rightTopCylinder.p(width / 2, 0, -depth / 2);


  const leftBottomCylinder = new mono.Cylinder({
    radiusTop: radius,
    radiusBottom: radius,
    height,
    arcLength: Math.PI / 2, // 圆柱的圆弧所占长度
    arcStart: Math.PI * 3 / 2, // 圆弧开始的角度
  });

  leftBottomCylinder.s({
    'm.type': 'phong',
    'm.color': color,
  });
  leftBottomCylinder.p(-width / 2, 0, depth / 2);


  const rightBottomCylinder = new mono.Cylinder({
    radiusTop: radius,
    radiusBottom: radius,
    height,
    arcLength: Math.PI / 2, // 圆柱的圆弧所占长度
    arcStart: 0, // 圆弧开始的角度
  });

  rightBottomCylinder.s({
    'm.type': 'phong',
    'm.color': color,
  });
  rightBottomCylinder.p(width / 2, 0, depth / 2);

  const combo = new mono.ComboNode([centerNode, leftNode, rightNode, topNode, bottomNode, leftTopCylinder, rightTopCylinder, leftBottomCylinder, rightBottomCylinder], ['+'], true, objectId);
  combo.width = width;
  combo.height = height;
  combo.depth = depth;
  combo.s({ 'm.opacity': opacity });
  return combo;
}
```