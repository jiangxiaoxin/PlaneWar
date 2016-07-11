
/**
 * Plane是所有飞机的父类，功能就是创建个显示对象，无其他功能
 */
class Plane extends egret.Sprite{

    private _textureName:string;
    private _texture:egret.Texture;
    protected planeBitmap:egret.Bitmap;
    public constructor(name:string){
        super();

        this._textureName = name;
        this.planeBitmap = Utils.createBitmapByName(name);
        this.addChild(this.planeBitmap);
    }
}