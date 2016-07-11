

class Button extends egret.Sprite{
    public constructor(resName:string){
        super();
        this.resName = resName;
        var bitmap = new egret.Bitmap();
        var texture = RES.getRes(resName);
        bitmap.texture = texture;
        this.addChild(bitmap);
        
    }


    private resName:string;
}