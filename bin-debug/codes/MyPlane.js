var MyPlane = (function (_super) {
    __extends(MyPlane, _super);
    function MyPlane() {
        _super.call(this, 'playerFrame1_png');
        this.life = 10;
        /**
         * 飞机的攻击速度。每500ms攻击一次
         */
        this.attackSpeed = 500;
        this.bulletSpeed = 6;
        this.bulletName = 'b1_png';
        this.bulletTexture = RES.getRes(this.bulletName);
        this.bulletWidth = this.bulletTexture.textureWidth;
        this.bulletHeight = this.bulletTexture.textureHeight;
        this.touchEnabled = true;
    }
    var d = __define,c=MyPlane,p=c.prototype;
    p.start = function () {
        this.bullets = [];
        this.timer = new egret.Timer(this.attackSpeed);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
    };
    p.onTimer = function (e) {
        var bullet = new MyBullet();
        this.bullets.push(bullet);
        var parent = this.parent;
        parent.addChild(bullet);
        //子弹的位置在我的飞机的头部地方发射
        bullet.x = this.x + (this.planeBitmap.width - bullet.width >> 1);
        bullet.y = this.y - bullet.height;
        var effect = RES.getRes("shootmp3_mp3");
        effect.play(0, 1);
    };
    //就相当于MOUSE_DOWN事件
    p.touchBegin = function (e) {
        if (!this.offsetPoint) {
            this.offsetPoint = new egret.Point();
        }
        this.offsetPoint.x = e.stageX - this.x;
        this.offsetPoint.y = e.stageY - this.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    //就相当于MOUSE_UP事件
    p.touchEnd = function (e) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    p.touchMove = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            this.x = e.stageX - this.offsetPoint.x;
            this.y = e.stageY - this.offsetPoint.y;
        }
    };
    p.removeStage = function (e) {
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    p.underAttack = function (damage) {
        if (damage === void 0) { damage = 1; }
        this.life -= damage;
        if (this.life <= 0) {
            this.dispatchEvent(new egret.Event(MyPlane.MY_PLANE_DEAD));
        }
    };
    MyPlane.MY_PLANE_DEAD = "MY_PLANE_DEAD";
    return MyPlane;
}(Plane));
egret.registerClass(MyPlane,'MyPlane');
//# sourceMappingURL=MyPlane.js.map