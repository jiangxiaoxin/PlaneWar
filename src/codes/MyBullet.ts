class MyBullet extends egret.Sprite{
    
    public speed:number = 6;
    public damage:number = 1;//打一次扣一点血
    public constructor(){
        super();
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes('b1_png');
        this.addChild(bitmap);
        
    }

    public updatePosition():void{
        this.y -= this.speed;
    }
}