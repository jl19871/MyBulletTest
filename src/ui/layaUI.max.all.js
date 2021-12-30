var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var mainUI=(function(_super){
		function mainUI(){
			
		    this.lst_bullet=null;
		    this.btn_fire=null;

			mainUI.__super.call(this);
		}

		CLASS$(mainUI,'ui.mainUI',_super);
		var __proto__=mainUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(mainUI.uiView);

		}

		mainUI.uiView={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"List","props":{"y":0,"x":0,"width":640,"var":"lst_bullet","spaceY":2,"height":120},"child":[{"type":"Box","props":{"width":640,"name":"render","height":50},"child":[{"type":"Rect","props":{"width":640,"lineWidth":1,"height":50,"fillColor":"#a4a4a4"}},{"type":"Text","props":{"y":25,"x":320,"wordWrap":true,"width":640,"valign":"middle","text":"name","pivotY":25,"pivotX":320,"overflow":"scroll","name":"lab_name","height":50,"fontSize":30,"font":"Arial","color":"#ffe000","align":"center"}}]}]},{"type":"Button","props":{"y":168,"x":2,"width":64,"var":"btn_fire","stateNum":1,"skin":"bullet/6.png","label":"重新发射","height":64}}]};
		return mainUI;
	})(View);