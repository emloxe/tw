
## 修复

```js
mono.Terrain.prototype.setHeightMap= function(heightMap){
  this.heightMap = heightMap;
  if ( typeof this.heightMap === 'string') {
    this.image = new Image();
    this.image.src = this.heightMap;
  } else if (TGL.html.isCanvas(this.heightMap)) {
    this.canvas = this.heightMap;
  } else if (TGL.html.isImage(this.heightMap)) {
    this.image = this.heightMap;
  }

  if (this.image) {
    var scope = this;
    if(this.image.width){
              var canvas = document.createElement('canvas');
      canvas.width = scope.image.width;
      canvas.height = scope.image.height;
      var g = canvas.getContext('2d');
      g.drawImage(scope.image, 0, 0);
      scope.canvas = canvas;
      scope.computed = false;
      scope.computeNodeData();
      scope.firePropertyChange('width', 0, 1);
    }else{
      this.image.onload = function(e) {
      var canvas = document.createElement('canvas');
      canvas.width = scope.image.width;
      canvas.height = scope.image.height;
      var g = canvas.getContext('2d');
      g.drawImage(scope.image, 0, 0);
      scope.canvas = canvas;
      scope.computed = false;
      scope.computeNodeData();
      scope.firePropertyChange('width', 0, 1);
      };
    }
    
  } else {
    this.computed = false;
    this.computeNodeData();
    this.firePropertyChange('width', 0, 1);
  }
}
```