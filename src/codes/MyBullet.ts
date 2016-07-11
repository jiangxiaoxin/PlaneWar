class MyBullet extends egret.Sprite{
    private mainGame:GameContainer;
    private speed:number = 6;
    public constructor(mainGame:GameContainer){
        super();
        this.mainGame = mainGame;
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes('b1_png');
        this.addChild(bitmap);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onStage,this);
    }

    private onStage(e:egret.Event):void{
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onStage,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);

    }

    private onFrame(e:egret.Event):void{

        this.y -= this.speed;
        if (this.y+this.height<=0) {
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
            this.parent.removeChild(this);
        }


        var enemys = this.mainGame.enemys;
       
        for(var i=0;i<enemys.length;i++){
            var enemy = enemys[i];
            var x = this.x + this.width/2;
            var y = this.y;
            var hit = enemy.hitTestPoint(x,y,true);   //以子弹的弹头位置进行像素级的碰撞
            if (hit) {
                this.removeEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);    //子弹和敌机消失
                if (this && this.parent) {
                    this.parent.removeChild(this);
                }
                
                enemy.parent.removeChild(enemy);
                enemys.splice(i,1);
                i--;
            }
        }
    }
}