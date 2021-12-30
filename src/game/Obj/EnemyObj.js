/*
 * @Author: JL
 * @Date: 2020-04-01 17:00:07
 */
/**
 * Created by JL on 2019/4/25.
 */


var EnemyObj = (function (_super) {
    function EnemyObj() {
        EnemyObj.super(this);
    }
    Laya.class(EnemyObj, "EnemyObj", Laya.Image);
    var _proto = EnemyObj.prototype;

    _proto.init = function () {
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.skin = "plane/f1.png";
        // this.fire();
    }

    _proto.fire = function (path) {
        if(path == undefined || path == "")
        {
            return;
        }
        // var str = Laya.loader.getRes("res/xml/[daiouzyou]_hibati_2_2_b.xml");
        // var str = Laya.loader.getRes("res/xml/[Original]_evil_eye.xml");
        // var str = Laya.loader.getRes("res/xml/[Original]_hirahira.xml");
        var str = Laya.loader.getRes(path);
        var danmaku0 = bulletml.buildXML(str);

        var danmakuConfig = {
            target: {x: 320, y: 1000},
            createNewBullet: function (runner) {
                var bullet = createBullet(runner);
                this.parent.addChild(bullet);
            }.bind(this),
            speedRate: 5
        };

        this.danmakuRunner = danmaku0.createRunner(danmakuConfig);
        this.danmakuRunner.x = this.x;
        this.danmakuRunner.y = this.y;
    }

    _proto.startDanmaku = function ( root, config)  {

    }

    _proto.update = function (dt) {
        if( this.danmakuRunner)
        {
            this.danmakuRunner.x = this.x;
            this.danmakuRunner.y = this.y;
            this.danmakuRunner.update();
            if(checkArena(this.x, this.y))
            {
                // this.onComplete();
            }
        }

    }

    _proto.onComplete = function () {
        //回收到对象池
        Laya.Pool.recover("EnemyObj", this);
        Laya.Tween.clearAll(this);
        this.runner = null;
        this.removeSelf();
    }

    return EnemyObj;
}(Laya.Image));

var createEnemy = function () {
    var enemy = Laya.Pool.getItemByClass("EnemyObj", EnemyObj);
    enemy.init();
    enemy.zOrder = 1000;
    return enemy;
}