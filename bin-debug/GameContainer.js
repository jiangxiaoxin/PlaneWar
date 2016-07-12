var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.touchEnabled = true;
    }
    var d = __define,c=GameContainer,p=c.prototype;
    /**
     * 主容器添加到舞台，初始化游戏
     */
    p.addToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        //添加滚动舞台
        this.scrollStage = new StageScroll();
        this.addChild(this.scrollStage);
        this.scrollStage.start();
        //添加背景音乐，背景音乐一直存在，从一开始就播放
        this.bgMusic = RES.getRes("music_mp3");
        this.bgMusic.play();
        this.gameLoop = new GameLoop(this);
        //游戏开始的按钮层
        this.startLayer = new StartLayer(this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(this.startLayer);
        this.startLayer.addEventListener(StartLayer.START, this.startBtnTap, this);
    };
    p.startBtnTap = function () {
        console.log('start btn tap');
        this.removeChild(this.startLayer);
        //开始 
        this.gameLoop.start();
    };
    return GameContainer;
}(egret.DisplayObjectContainer));
egret.registerClass(GameContainer,'GameContainer');
//# sourceMappingURL=GameContainer.js.map