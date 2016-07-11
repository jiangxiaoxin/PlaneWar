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
        this.scrollStage = new StageScroll();
        this.addChild(this.scrollStage);
        this.scrollStage.start();
        this.bgMusic = RES.getRes("music_mp3");
        this.bgMusic.play();
        this.startLayer = new StartLayer(this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(this.startLayer);
        this.startLayer.addEventListener(StartLayer.START, this.startBtnTap, this);
    };
    p.startBtnTap = function () {
        console.log('start btn tap');
        this.removeChild(this.startLayer);
        //开始 
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.initMyPlane();
        this.initEnemy();
    };
    p.onFrame = function (e) {
        console.log(this.enemys.length);
    };
    p.initMyPlane = function () {
        this.myPlane = new MyPlane(this);
        this.addChild(this.myPlane);
        this.myPlane.x = this.stage.stageWidth - this.myPlane.width >> 1;
        this.myPlane.y = this.stage.stageHeight - this.myPlane.height >> 1;
        this.myPlane.start();
    };
    p.initEnemy = function () {
        this.enemys = [];
        this.enemeyTimer = new egret.Timer(1500); //1.5s
        this.enemeyTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.enemeyTimer.start();
    };
    p.onTimer = function (e) {
        var enemy = new EnemyPlane(this);
        this.addChild(enemy);
        enemy.x = Math.random() * (this.stage.stageWidth - enemy.width);
        enemy.y = -enemy.height;
        this.enemys.push(enemy);
    };
    return GameContainer;
}(egret.DisplayObjectContainer));
egret.registerClass(GameContainer,'GameContainer');
//# sourceMappingURL=GameContainer.js.map