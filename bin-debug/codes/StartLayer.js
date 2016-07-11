var StartLayer = (function (_super) {
    __extends(StartLayer, _super);
    function StartLayer(width, height) {
        _super.call(this);
        this.stageWidth = width;
        this.stageHeight = height;
        this.startBtn = new Button("bntstart_png");
        this.addChild(this.startBtn); //开始按钮居中显示
        this.startBtn.x = this.stageWidth - this.startBtn.width >> 1;
        this.startBtn.y = this.stageHeight - this.startBtn.height >> 1;
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStart, this);
    }
    var d = __define,c=StartLayer,p=c.prototype;
    p.touchStart = function (e) {
        this.dispatchEvent(new egret.Event(StartLayer.START));
    };
    StartLayer.START = "start_btn";
    return StartLayer;
}(egret.DisplayObjectContainer));
egret.registerClass(StartLayer,'StartLayer');
//# sourceMappingURL=StartLayer.js.map