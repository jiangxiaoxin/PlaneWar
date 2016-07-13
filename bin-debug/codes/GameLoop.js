var GameLoop = (function () {
    function GameLoop(maingame) {
        this.isPlaying = false;
        this.maingame = maingame;
        this.gameLayer = new egret.DisplayObjectContainer();
        // this.gameLayer.cacheAsBitmap = true;
        this.myLayer = new egret.DisplayObjectContainer();
        this.enemyLayer = new egret.DisplayObjectContainer();
        // this.enemyLayer.cacheAsBitmap = true;
        this.gameLayer.addChild(this.enemyLayer);
        this.gameLayer.addChild(this.myLayer);
        this.stageHeight = this.maingame.stage.stageHeight;
    }
    var d = __define,c=GameLoop,p=c.prototype;
    p.start = function () {
        this.factory = SimpleFactory.getInstance();
        this.factory.bindClass(MyBullet);
        this.factory.bindClass(EnemyPlane);
        this.maingame.addChild(this.gameLayer);
        this.initMyPlane();
        this.initEnemy();
        this.maingame.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.isPlaying = true;
    };
    p.initMyPlane = function () {
        this.myPlane = new MyPlane();
        this.myPlane.addEventListener(MyPlane.MY_PLANE_DEAD, this.myPlaneDead, this);
        this.myLayer.addChild(this.myPlane);
        this.myPlane.x = this.maingame.stage.stageWidth - this.myPlane.width >> 1;
        this.myPlane.y = this.maingame.stage.stageHeight - this.myPlane.height >> 1;
        this.myPlane.start();
    };
    p.initEnemy = function () {
        this.enemys = [];
        this.enemeyTimer = new egret.Timer(1500); //1.5s
        this.enemeyTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.enemeyTimer.start();
    };
    p.myPlaneDead = function (e) {
        this.isPlaying = false;
        Utils.removeFromParent(this.myLayer);
        Utils.removeFromParent(this.enemyLayer);
        this.maingame.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.enemeyTimer.stop();
        this.enemeyTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.myPlane.removeEventListener(MyPlane.MY_PLANE_DEAD, this.myPlaneDead, this);
    };
    p.onTimer = function (e) {
        // var enemy = new EnemyPlane();
        var enemy = this.factory.getClassInstance(EnemyPlane);
        this.enemyLayer.addChild(enemy);
        enemy.x = Math.random() * (this.maingame.stage.stageWidth - enemy.width);
        enemy.y = -enemy.height;
        this.enemys.push(enemy);
    };
    // 总循环
    //更新我的子弹和敌人的位置
    //我的子弹跟敌人碰撞
    //我的飞机跟敌人碰撞
    p.onFrame = function (e) {
        //test
        // var dict:Object = this.factory.clsDict;
        // var arr = dict[<any>MyBullet];
        // console.log(`MyBullet:${arr.length}`);
        // arr = dict[<any>(EnemyPlane)];
        // console.log(`EnemyPlane:${arr.length}`);
        var bullets = this.myPlane.bullets;
        for (var i = 0; i < bullets.length; i++) {
            var _bullet = bullets[i];
            _bullet.updatePosition();
            if (_bullet.y + _bullet.height < 0) {
                Utils.removeFromParent(_bullet);
                bullets.splice(i, 1);
                this.factory.saveClassInstance(MyBullet, _bullet);
                i--;
            }
        }
        for (var j = 0; j < this.enemys.length; j++) {
            var _enemy = this.enemys[j];
            _enemy.updatePositin();
            if (_enemy.y + _enemy.height >= this.stageHeight) {
                Utils.removeFromParent(_enemy);
                this.enemys.splice(j, 1);
                this.factory.saveClassInstance(EnemyPlane, _enemy);
                j--;
            }
        }
        var myPlaneRetangle = new egret.Rectangle(this.myPlane.x, this.myPlane.y, this.myPlane.width, this.myPlane.height);
        var enemyRectangle = new egret.Rectangle();
        var bulletRectangle = new egret.Rectangle();
        for (var k = 0; k < this.enemys.length; k++) {
            var enemy = this.enemys[k];
            enemyRectangle.x = enemy.x;
            enemyRectangle.y = enemy.y;
            enemyRectangle.width = enemy.width;
            enemyRectangle.height = enemy.height;
            if (myPlaneRetangle.intersects(enemyRectangle)) {
                this.myPlane.underAttack();
                this.enemys.splice(k, 1);
                Utils.removeFromParent(enemy);
                this.factory.saveClassInstance(EnemyPlane, enemy);
                var sound = RES.getRes("explosion_wav");
                sound.play(0, 1);
                k--;
                continue;
            }
            // var count1 = this.myPlane.bullets.length;
            // var count2 = this.enemys.length;
            // var count3 = count1 * count2;
            // console.log(`hittest bullets:${count1}`);
            // console.log(`hittest enemys:${count2}`);
            // console.log(`at most:${count3}`);
            //这里是两种不同的碰撞方式，一个是典型的矩形碰撞，一个是精确的像素碰撞
            //得到的结论就是：千万不要使用精确的像素碰撞，在性能上简直就是地狱，才10次就已经撑不住了。
            //对于这么个小demo，基本是满帧的，但是开启像素碰撞之后，直接卡出翔，帧频掉了一半，只有30多。
            //矩形可以保持满帧
            for (var m = 0; m < this.myPlane.bullets.length; m++) {
                var bullet = this.myPlane.bullets[m];
                // var bulletx = bullet.x + (bullet.width >> 1);
                // var bullety = bullet.y + 1;
                // if (enemy.hitTestPoint(bulletx, bullety, true)) {
                bulletRectangle.x = bullet.x;
                bulletRectangle.y = bullet.y;
                bulletRectangle.width = bullet.width;
                bulletRectangle.height = bullet.height;
                if (enemyRectangle.intersects(bulletRectangle)) {
                    this.myPlane.bullets.splice(m, 1);
                    Utils.removeFromParent(bullet);
                    this.factory.saveClassInstance(MyBullet, bullet);
                    m--;
                    this.enemys.splice(k, 1);
                    Utils.removeFromParent(enemy);
                    this.factory.saveClassInstance(EnemyPlane, enemy);
                    var _sound = RES.getRes("explosion_wav");
                    _sound.play(0, 1);
                    k--;
                    break;
                }
            }
        }
    };
    return GameLoop;
}());
egret.registerClass(GameLoop,'GameLoop');
//# sourceMappingURL=GameLoop.js.map