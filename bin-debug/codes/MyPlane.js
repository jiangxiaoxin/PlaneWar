var MyPlane = (function (_super) {
    __extends(MyPlane, _super);
    function MyPlane(mainGame) {
        _super.call(this, 'playerFrame1_png');
        /**
         * 飞机的攻击速度。每500ms攻击一次
         */
        this.attackSpeed = 500;
        this.bulletSpeed = 6;
        this.mainGame = mainGame;
        this.bulletName = 'b1_png';
        this.bulletTexture = RES.getRes(this.bulletName);
        this.bulletWidth = this.bulletTexture.textureWidth;
        this.bulletHeight = this.bulletTexture.textureHeight;
        // this.touchEnabled = true;
    }
    var d = __define,c=MyPlane,p=c.prototype;
    p.start = function () {
        this.bullets = [];
        this.timer = new egret.Timer(this.attackSpeed);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.mainGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
        this.mainGame.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.mainGame.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    p.touchMove = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            var tx = e.localX;
            var ty = e.localY;
            this.x = tx - this.width / 2;
            this.y = ty - this.height / 2;
        }
    };
    p.stop = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer = null;
        var count = this.bullets.length;
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                var bullet = this.bullets[i];
                bullet.parent.removeChild(bullet);
            }
        }
        this.bullets = null;
    };
    //跟enemy做判断
    p.onFrame = function (e) {
    };
    p.onTimer = function (e) {
        var bullet = new MyBullet(this.mainGame);
        this.mainGame.addChild(bullet);
        bullet.x = this.x + (this.planeBitmap.width - bullet.width >> 1);
        bullet.y = this.y - bullet.height;
    };
    return MyPlane;
}(Plane));
egret.registerClass(MyPlane,'MyPlane');
//# sourceMappingURL=MyPlane.js.map