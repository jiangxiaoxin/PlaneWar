class MyPlane extends Plane {


    public static MY_PLANE_DEAD = "MY_PLANE_DEAD";

    private bulletName: string;
    private bulletTexture: egret.Texture;
    public bullets: MyBullet[];
    private life:number = 10;
    private timer:egret.Timer;
    /**
     * 飞机的攻击速度。每500ms攻击一次
     */
    private attackSpeed:number = 500;
    private bulletSpeed:number = 6;
    private bulletWidth:number;
    private bulletHeight:number;

    private factory:SimpleFactory;

   
    public constructor() {
        super('playerFrame1_png');
        
        this.bulletName = 'b1_png';
        this.bulletTexture = RES.getRes(this.bulletName);
        this.bulletWidth = this.bulletTexture.textureWidth;
        this.bulletHeight = this.bulletTexture.textureHeight;
        this.touchEnabled = true;

        this.factory = SimpleFactory.getInstance();
        
    }

    public start(): void {
        this.bullets = [];
        this.timer = new egret.Timer(this.attackSpeed);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.timer.start();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
    }


    private onTimer(e:egret.TimerEvent):void{
        // var bullet = new MyBullet();
        var bullet = this.factory.getClassInstance(MyBullet);
        this.bullets.push(bullet);
        var parent:egret.DisplayObjectContainer = this.parent;
        parent.addChild(bullet);
        //子弹的位置在我的飞机的头部地方发射
        bullet.x = this.x + (this.planeBitmap.width - bullet.width >> 1);
        bullet.y = this.y - bullet.height;

        var effect:egret.Sound = RES.getRes("shootmp3_mp3");
        effect.play(0,1);
    }

    private offsetPoint:egret.Point;
    //就相当于MOUSE_DOWN事件
    private touchBegin(e:egret.TouchEvent):void{
        if (!this.offsetPoint) {
            this.offsetPoint = new egret.Point();
        }
        this.offsetPoint.x = e.stageX - this.x;
        this.offsetPoint.y = e.stageY - this.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
    }
     //就相当于MOUSE_UP事件
    private touchEnd(e:egret.TouchEvent):void{
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);

    }

    private touchMove(e:egret.TouchEvent):void{
         if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            this.x = e.stageX - this.offsetPoint.x;
            this.y = e.stageY - this.offsetPoint.y;
        }
    }


    private removeStage(e:egret.Event):void{
        this.timer.stop();
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
    }

    public underAttack(damage:number=1):void{
        this.life -= damage;
        if(this.life<=0){
            this.dispatchEvent(new egret.Event(MyPlane.MY_PLANE_DEAD));
        }

    }
}