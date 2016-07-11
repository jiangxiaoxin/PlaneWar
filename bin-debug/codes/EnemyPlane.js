var EnemyPlane = (function (_super) {
    __extends(EnemyPlane, _super);
    function EnemyPlane(maingame) {
        _super.call(this, 'p1_png');
        this.enemySpeed = 3;
        this.maingame = maingame;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    var d = __define,c=EnemyPlane,p=c.prototype;
    p.addToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    p.onFrame = function (e) {
        this.y += this.enemySpeed;
        if (this.y > this.stage.stageHeight) {
            var index = this.maingame.enemys.indexOf(this);
            this.maingame.enemys.splice(index, 1);
            this.disappear();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        }
    };
    p.disappear = function () {
        this.parent.removeChild(this);
    };
    p.remove = function (e) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    return EnemyPlane;
}(Plane));
egret.registerClass(EnemyPlane,'EnemyPlane');
//# sourceMappingURL=EnemyPlane.js.map