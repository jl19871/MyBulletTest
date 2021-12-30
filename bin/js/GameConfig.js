/**
 * Created by JL on 2018/9/13.
 */
var GameConfig = {
    // 发布
    // isUseMerge: true,
    // isTest: false,
    isUseMerge: false,       // 是否使用合并json文件
    isTest: true,            // 是否为测试模式

    isUseAccount: true,     // 是否使用账号登录
    isTestFight: false,      // 显示预设战斗脚本

    gameVersion: "1",   // 游戏版本号
    resVersion: "1",      // 资源版本号


    UPDATE_SEND_CMD_TIME: 30,

    isCanPay: true,          // 是否可以支付
    isCanShare: true,        // 是否可以分享
};

function gameLog(str)
{
    if(GameConfig.isTest)
    {
        console.log(str);
    }
}

(function () {
    if(typeof window.resVersion === 'undefined')
    {

    }
    else
    {
        var curVersion = Number(GameConfig.resVersion);
        var newVersion = Number(window.resVersion);
        if(curVersion < newVersion)
        {
            GameConfig.resVersion = window.resVersion;
        }
    }
})();

function changeDialogSetting() {
    // 具体的其他配置见UIConfig
    UIConfig.popupBgAlpha = 0;

    var manager = Dialog.manager;

    // 复写
    manager.popupEffect = function (dialog) {
        if (dialog.imgbg) {
            dialog.imgbg.scale(25, 25);
        }

        if(gameLayer)
        {
            var index = arrayUtil.indexOfObject(DoNotHideUI, dialog.name);
            if(index === -1)
            {
                gameLayer.centerUI.visible = false;
                gameLayer.fightLayer.visible = false;
            }
        }

        dialog.scale(1, 1);
        if(window.isIPhoneX)
        {
            dialog.y -= window.IPhoneX_DeltaY;
            // dialog.x=Math.round(((Laya.stage.designWidth-dialog.width)>> 1)+dialog.pivotX);
            // dialog.y=Math.round(((Laya.stage.designHeight-dialog.height)>> 1)+dialog.pivotY);
        }
        Laya.Tween.from(dialog, {
            // x: Laya.stage.designWidth / 2,
            // y: Laya.stage.designHeight / 2,
            x: Laya.stage.width / 2,
            y: Laya.stage.height / 2,
            scaleX: 0.05,
            scaleY: 0.05
        }, 300, Laya.Ease.backOut, Laya.Handler.create(this, this.doOpen, [dialog]));
    }

    manager.closeEffect = function (dialog, type) {
        if (dialog.imgbg) {
            dialog.imgbg.visible = false;
        }
        console.log("numchildren = " + Dialog.manager.numChildren);
        if(gameLayer && Dialog.manager.numChildren <= 2) // 遮罩层
        {
            gameLayer.centerUI.visible = true;
            gameLayer.fightLayer.visible = true;
        }
        Laya.Tween.to(dialog, {
            // x: Laya.stage.designWidth / 2,
            // y: Laya.stage.designHeight / 2,
            x: Laya.stage.width / 2,
            y: Laya.stage.height / 2,
            scaleX: 0,
            scaleY: 0
        }, 200, Laya.Ease.strongOut, Laya.Handler.create(this, this.doClose, [dialog, type]));

    }

    manager.popupEffectHandler = new Laya.Handler(manager, manager.popupEffect);
    manager.closeEffectHandler = new Laya.Handler(manager, manager.closeEffect);

    manager.doOpen = function (dialog) {
        if (dialog.imgbg) {
            dialog.imgbg.scale(1.5, 1.5);
        }

        dialog.onOpened();
    }

    manager.doClose = function (dialog, type) {

        dialog.removeSelf();
        dialog.isModal && this._checkMask();
        dialog.closeHandler && dialog.closeHandler.runWith(type);
        dialog.onClosed(type);

        if(gameLayer && Dialog.manager.numChildren === 0)
        {
            gameLayer.centerUI.visible = true;
            gameLayer.fightLayer.visible = true;
        }

        if (newTaskLay != null) {
            newTaskLay.CheckGuide();
        }

        setTimeout(function () {
            if (gameLayer && Dialog.manager.numChildren === 0) {
                gameLayer.centerUI.CheckFunctionShow();

                gameLayer.centerUI.visible = true;
                gameLayer.fightLayer.visible = true;
            }

        }, 400);

    }

}

function checkArena(x,y) {
    if(x < -100 || x > 740 || y < -100 || y > 1300)
    {
        return true;
    }
    return false;
}