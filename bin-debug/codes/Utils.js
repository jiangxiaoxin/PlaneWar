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
    return Utils;
}());
egret.registerClass(Utils,'Utils');
//# sourceMappingURL=Utils.js.map