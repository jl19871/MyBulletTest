(function () {
    // Config.showCanvasMark = true;
    window.isIPhoneX = false;
    window.IPhoneX_DeltaY = 130;
    //屏幕初始化
    Laya.init(640, 1136, Laya.WebGL);
    // Laya.alertGlobalError = true;
    if(window.isIPhoneX)
    {
        Laya.stage.scaleMode = "fixedauto";
        Laya.stage.y = window.IPhoneX_DeltaY;
    }
    else
    {
        Laya.stage.scaleMode = "showall";
    }
    Laya.stage.screenMode = "none";
    Laya.stage.alignH = "center";
    Laya.stage.alignV = "middle";
    Laya.stage.bgColor = "#232628";

    Laya.Stat.show(0,0);

    var a = new BulletObj();


    var assets = [];
    assets.push(
        {
            url: [
                "res/atlas/bullet.atlas",
                "res/atlas/plane.atlas"
            ], type: Laya.Loader.ATLAS
        },
        {
            url: [
                "res/bullets.json"
            ], type: Laya.Loader.JSON
        }
        // {
        //     url: [
        //         "res/xml/[daiouzyou]_hibati_2_2_b.xml",
        //         "res/xml/[Original]_btb_6.xml",
        //         "res/xml/[Original]_evil_eye.xml",
        //         "res/xml/[Original]_hirahira.xml",
        //         "res/xml/[xsoldier]_8_boss_main.xml",
        //         "res/xml/8way.xml"
        //     ], type: Laya.Loader.TEXT
        // }
    );

    Laya.loader.load(assets, Laya.Handler.create(null, onLoaded));

})();

function onLoaded() {
    Laya.stage.addChild(new GameLayer());
}
