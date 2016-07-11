/**
 * Plane是所有飞机的父类，功能就是创建个显示对象，无其他功能
 */
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane(name) {
        _super.call(this);
        this._textureName = name;
        this.planeBitmap = Utils.createBitmapByName(name);
        this.addChild(this.planeBitmap);
    }
    var d = __define,c=Plane,p=c.prototype;
    return Plane;
}(egret.Sprite));
egret.registerClass(Plane,'Plane');
//# sourceMappingURL=Plane.js.map