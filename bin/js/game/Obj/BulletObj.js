/**
 * Created by JL on 2019/4/1.
 */

var BulletObj = (function (_super) {
    function BulletObj() {
        BulletObj.super(this);
        bulletml.Bullet.call(this);
    }
    Laya.class(BulletObj, "BulletObj", Laya.Image);
    var _proto = BulletObj.prototype;

    _proto.init = function (runner) {

        this.anchorX = 0.5;
        this.anchorY = 0.5;

        this.skin = "bullet/1.png";
        this.runner = runner;

        this.x = this.runner.x;
        this.y = this.runner.y;

        this.runner.onVanish = function() {
            this.onComplete();
        }.bind(this);
        Laya.timer.loop(1, this, this.update);
    }

    _proto.update = function () {
        if(this.runner)
        {
            this.x = this.runner.x;
            this.y = this.runner.y;
            this.runner.update();
        }

        if(checkArena(this.x, this.y))
        {
            this.onComplete();
        }
    }

    _proto.onComplete = function () {
        Laya.timer.clearAll(this);
        //回收到对象池
        Laya.Pool.recover("BulletObj", this);
        Laya.Tween.clearAll(this);
        this.runner = null;
        this.removeSelf();
    }

    return BulletObj;
}(Laya.Image));

var createBullet = function (runner) {
    var bullet = Laya.Pool.getItemByClass("BulletObj", BulletObj);
    bullet.init(runner);
    bullet.zOrder = 1000;
    return bullet;
}