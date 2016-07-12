class Utils {
    public static createBitmapByName(name: string): egret.Bitmap {
        var bitmap: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        bitmap.texture = texture;
        return bitmap;
    }

    public static getTexureByName(name: string):egret.Texture{
        return RES.getRes(name);
    }

    public static removeFromParent(display:egret.DisplayObject):void{
        if (display && display.parent) {
            display.parent.removeChild(display);
        }
    }
}