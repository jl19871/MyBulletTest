/**
 * Created by JL on 2019/4/16.
 */

var GameLayer = (function (_super) {
    function GameLayer() {
        GameLayer.super(this);
        var self = this;
        Laya.timer.loop(1, this, this.updateByOneFrame);
        this.name = "GameLayer";
        this.init();

        this.width = 640;
        this.height = 1136;
    }
    Laya.class(GameLayer, "GameLayer", _super);
    var _proto = GameLayer.prototype;

    _proto.init = function () {
        this.firepath = "";
        bulletml.dsl();

        var enemy = createEnemy();
        enemy.x = 320;
        enemy.y = 400;
        enemy.zOrder = 100;
        this.addChild(enemy);

        var spr = new Laya.Image();
        spr.skin = "plane/f2.png";
        spr.anchorX = 0.5;
        spr.anchorY = 0.5;
        spr.x = 320;
        spr.y = 1000;
        spr.scale(0.2,0.2);
        this.addChild(spr);

        this.enemy = enemy;

        this.btn_fire.on(laya.events.Event.CLICK, this, this.fire);
        this.lst_bullet.vScrollBarSkin = "";
        this.lst_bullet.array = Laya.loader.getRes("res/bullets.json");
        if (this.lst_bullet.renderHandler == null) {
            this.lst_bullet.renderHandler = new Laya.Handler(this, this.onListRender);
        }
        if (this.lst_bullet.selectHandler == null) {
            this.lst_bullet.selectHandler = new Laya.Handler(this, this.onSelect);
        }
    }

    _proto.onListRender = function (item, index) {
        var lab_name = item.getChildByName("lab_name");
        lab_name.text = item.dataSource.name;
        lab_name.offAll();
        lab_name.on(laya.events.Event.CLICK, this, this.onSelect, [item.dataSource.name]);
    }

    _proto.onSelect = function(name)
    {
        this.firepath = "res/xml/" + name;
        Laya.loader.load(this.firepath, Laya.Handler.create(this, this.fire), null, Laya.Loader.TEXT);
    }

    _proto.createBG = function () {

    }

    _proto.updateByOneFrame = function (dt) {
        if(this.enemy)
        {
            this.enemy.update();
        }
    }
    
    _proto.addBullet = function () {
        
    }

    _proto.fire = function () {
        this.enemy.fire(this.firepath);
    }

    return GameLayer;
}(mainUI));