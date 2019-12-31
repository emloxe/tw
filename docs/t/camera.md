# 镜头

镜头飞向一个实体

局限性：如果需要聚焦的模型是一整obj导入模型的一部分，`mono.Utils.getBoundingBox(element, true);`始终获取到是全部模型的大小，所以镜头飞向的实际是整个模型。
```js
/**
 * 相机动画
 * @param {mono.Camera} camera 相机
 * @param {mono.DefaultInteraction} interaction 交互对象
 * @param {mono.Vec3} posPoint 目标相机位置
 * @param {mono.Vec3} newPoint 目标相机看向位置
 * @param {function} onDone 执行动画完毕的回调
 */
export const animateCamera = (camera, interaction, posPoint, lookPoint, onDone) => {
  // 停掉所有的动画
  mono.Utils.stopAllAnimates(true);

  const cameraTarget = camera.getTarget();
  const cameraPosition = camera.getPosition();

  const animation = new mono.Animate({
    from: 0,
    to: 1,
    dur: (Math.random() + 0.5) * 3000,
    easing: 'easeBoth',
    onUpdate(value) {
      const target = calculVec3ByProportion(cameraTarget, lookPoint, value);
      camera.lookAt(target);
      interaction.target = target;

      const position = calculVec3ByProportion(cameraPosition, posPoint, value);
      camera.setPosition(position);
    },
  });
  animation.onDone = onDone;
  animation.play();
};

/**
 * 聚焦到目标元素的方法
 */
export const focusTargetFunc = (network, element, cb) => {
  const camera = network.getCamera();
  const interaction = network.getDefaultInteraction();

  const size = mono.Utils.getBoundingBox(element, true);
  const distance = Math.max(size.max.x - size.min.x, size.max.y - size.min.y) * 1.5;

  const posPoint = element.frontWorldPosition(distance);
  const lookPoint = element.getWorldPosition();
  const onDone = () => {
    // eslint-disable-next-line no-unused-expressions
    cb && cb();
  };

  animateCamera(camera, interaction, posPoint, lookPoint, onDone);
};
```

# 调整 3d 镜头
```js
/**
 * 调整 3d 镜头
 * @name setCamera
 * @function
 * @param {mono.Network3D} network 3d 拓扑图对象
 * @param {Object} options 选择项
 * @param {array} options.pos 位置坐标
 * @param {array} options.rot 旋转
 * @param {array} options.tar 目标点位置
 */
export const adjustCamera = (network, options) => {
  const camera = network.getCamera();

  Object.keys(options).forEach((key) => {
    const value = options[key];

    switch (key) {
      case 'pos':
        camera.setPosition(new mono.Vec3(...value));
        break;
      case 'rot':
        camera.setRotation(new mono.Vec3(...value));
        break;
      case 'tar':
        camera.look(new mono.Vec3(...value));
        break;

      default:
        break;
    }
  });
};
```