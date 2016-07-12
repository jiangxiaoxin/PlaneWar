var Utils = (function () {
    function Utils() {
    }
    var d = __define,c=Utils,p=c.prototype;
    Utils.createBitmapByName = function (name) {
        var bitmap = new egret.Bitmap();
        var texture = RES.getRes(name);
        bitmap.texture = texture;
        return bitmap;
    };
    Utils.getTexureByName = function (name) {
        return RES.getRes(name);
    };
    Utils.removeFromParent = function (display) {
        if (display && display.parent) {
            display.parent.removeChild(display);
        }
    };
    return Utils;
}());
egret.registerClass(Utils,'Utils');
//# sourceMappingURL=Utils.js.map