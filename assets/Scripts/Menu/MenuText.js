cc.Class({
  extends: cc.Component,

  properties: {
    splashDuration: 2,
    splashDownBound: 80,
    splashUpBound: 255,
  },

  start() {
    cc.tween(this.node)
      .repeatForever(
        cc.tween()
          .to(this.splashDuration/2, { opacity: this.splashDownBound }) // 从当前透明度渐变到透明
          .to(this.splashDuration/2, { opacity: this.splashUpBound }) // 再次渐变到不透明
      )
      .start();
  },
});
