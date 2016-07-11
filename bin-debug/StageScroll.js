/**
 * StageScroll extends egret.dis
 */
var StageScroll = (function (_super) {
    __extends(StageScroll, _super);
    function StageScroll() {
        _super.call(this);
        this.stageScrollSpeed = 1.5;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    var d = __define,c=StageScroll,p=c.prototype;
    p.addToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.createGameScene();
    };
    p.start = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    p.stop = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    p.onFrame = function (e) {
        for (var i = 0; i < this.scrollImageCount; i++) {
            var image = this.scrollImageArr[i];
            image.y += this.stageScrollSpeed;
            if (image.y >= this.stageH) {
                image.y = this.scrollImageArr[0].y - this.scrollImageHeight;
                this.scrollImageArr.pop();
                this.scrollImageArr.unshift(image);
            }
        }
    };
    p.createGameScene = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.scrollImageTexture = RES.getRes('stage01_jpg');
        this.scrollImageWidth = this.scrollImageTexture.textureWidth;
        this.scrollImageHeight = this.scrollImageTexture.textureHeight;
        this.scrollImageCount = Math.ceil(this.stageH / this.scrollImageHeight) + 1;
        this.scrollImageArr = [];
        for (var i = 0; i < this.scrollImageCount; i++) {
            var image = new egret.Bitmap(this.scrollImageTexture);
            image.y = -(this.scrollImageHeight * this.scrollImageCount - this.stageH) + this.scrollImageHeight * i;
            this.scrollImageArr.push(image);
            this.addChild(image);
        }
    };
    return StageScroll;
}(egret.DisplayObjectContainer));
egret.registerClass(StageScroll,'StageScroll');
//# sourceMappingURL=StageScroll.js.map