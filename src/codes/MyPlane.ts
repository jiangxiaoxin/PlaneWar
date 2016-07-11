class MyPlane extends Plane {


    private bulletName: string;
    private bulletTexture: egret.Texture;
    private bullets: egret.Bitmap[];

    private timer:egret.Timer;
    /**
     * 飞机的攻击速度。每500ms攻击一次
     */
    private attackSpeed:number = 500;
    private bulletSpeed:number = 6;
    private bulletWidth:number;
    private bulletHeight:number;

    private mainGame:GameContainer;


    public constructor(mainGame:GameContainer) {
        super('playerFrame1_png');
        this.mainGame = mainGame;
        this.bulletName = 'b1_png';
        this.bulletTexture = RES.getRes(this.bulletName);
        this.bulletWidth = this.bulletTexture.textureWidth;
        this.bulletHeight = this.bulletTexture.textureHeight;
        // this.touchEnabled = true;
    }

    public start(): void {
        this.bullets = [];
        this.timer = new egret.Timer(this.attackSpeed);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.timer.start();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.mainGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
    }

    private onTouchBegin(e:egret.TouchEvent):void{
        this.mainGame.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.mainGame.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
    }


    private touchMove(e:egret.TouchEvent):void{
         if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            var tx: number = e.localX;
            var ty: number = e.localY;
           
            this.x = tx-this.width/2;
            this.y = ty-this.height/2;
            
        }
    }

    public stop(): void {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.timer = null;
        var count = this.bullets.length;
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                var bullet = this.bullets[i];
                bullet.parent.removeChild(bullet);
            }
        }
        this.bullets = null;
    }

    //跟enemy做判断
    private onFrame(e: egret.Event): void {
       
    }

    private onTimer(e:egret.TimerEvent):void{
       

        var bullet = new MyBullet(this.mainGame);
        this.mainGame.addChild(bullet);
        bullet.x = this.x + (this.planeBitmap.width - bullet.width >> 1);
        bullet.y = this.y - bullet.height;
    }





}